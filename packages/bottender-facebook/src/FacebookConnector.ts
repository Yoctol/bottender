import { EventEmitter } from 'events';

import warning from 'warning';
import { BatchConfig } from 'messenger-batch';
import {
  Connector,
  FacebookBaseConnector,
  MessengerConnector,
  MessengerContext,
  MessengerEvent,
  RequestContext,
} from 'bottender';

import FacebookClient from './FacebookClient';
import FacebookContext from './FacebookContext';
import FacebookEvent from './FacebookEvent';
import InstagramContext from './InstagramContext';
import InstagramEvent from './InstagramEvent';

type FacebookRequestBody = Record<string, any>;

// TODO: use exported type
type Session = Record<string, any>;

type ConstructorOptions = {
  appId: string;
  appSecret: string;
  accessToken?: string;
  client?: FacebookClient;
  mapPageToAccessToken?: (pageId: string) => Promise<string>;
  verifyToken?: string;
  batchConfig?: BatchConfig;
  origin?: string;
  skipAppSecretProof?: boolean;
  skipProfile?: boolean;
};

export default class FacebookConnector
  extends FacebookBaseConnector<FacebookRequestBody, FacebookClient>
  implements Connector<FacebookRequestBody, FacebookClient> {
  _mapPageToAccessToken: ((pageId: string) => Promise<string>) | null = null;

  _messengerConnector: MessengerConnector;

  public constructor(options: ConstructorOptions) {
    super({
      ...options,
      ClientClass: FacebookClient,
    });

    const { mapPageToAccessToken } = options;

    this._mapPageToAccessToken = mapPageToAccessToken ?? null;
    this._messengerConnector = new MessengerConnector({
      ...options,
      ClientClass: FacebookClient,
      mapPageToAccessToken,
    });
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): 'facebook' {
    return 'facebook';
  }

  getUniqueSessionKey(
    event: FacebookEvent | MessengerEvent | InstagramEvent
  ): string | null {
    if (event instanceof MessengerEvent) {
      return this._messengerConnector.getUniqueSessionKey(event);
    }

    // TODO: How to determine session key in facebook feed events and instagram
    return null;
  }

  public async updateSession(
    session: Session,
    event: FacebookEvent | MessengerEvent
  ): Promise<void> {
    if (!session.user) {
      session.page = {
        id: event.pageId,
        _updatedAt: new Date().toISOString(),
      };

      session.user = {
        _updatedAt: new Date().toISOString(),
        id: this.getUniqueSessionKey(event),
      };
    }

    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });

    Object.freeze(session.page);
    Object.defineProperty(session, 'page', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.page,
    });
  }

  public mapRequestToEvents(
    body: FacebookRequestBody
  ): (FacebookEvent | MessengerEvent | InstagramEvent)[] {
    if (body.object === 'instagram') {
      return body.entry
        .map((rawEvent: any) => {
          const businessAccountId = rawEvent.id;
          if (rawEvent.changes) {
            return new InstagramEvent(rawEvent.changes[0], {
              businessAccountId,
            });
          }

          return null;
        })
        .filter((event: any) => event !== null);
    }

    if (body.object === 'page') {
      return body.entry
        .map((rawEvent: any) => {
          const pageId = rawEvent.id;
          if (rawEvent.messaging) {
            return new MessengerEvent(rawEvent.messaging[0], {
              pageId,
              isStandby: false,
            });
          }

          if (rawEvent.standby) {
            return new MessengerEvent(rawEvent.standby[0], {
              pageId,
              isStandby: true,
            });
          }

          if (rawEvent.changes) {
            return new FacebookEvent(rawEvent.changes[0], { pageId });
          }

          return null;
        })
        .filter((event: any) => event !== null);
    }

    return [];
  }

  public async createContext(params: {
    event: FacebookEvent | MessengerEvent | InstagramEvent;
    session?: Session;
    initialState?: Record<string, any>;
    requestContext?: RequestContext;
    emitter?: EventEmitter;
  }): Promise<FacebookContext | MessengerContext | InstagramContext> {
    let customAccessToken;

    if (this._mapPageToAccessToken) {
      const { pageId } = params.event;

      if (!pageId) {
        warning(false, 'Could not find pageId from request body.');
      } else {
        customAccessToken = await this._mapPageToAccessToken(pageId);
      }
    }

    if (params.event instanceof FacebookEvent) {
      return new FacebookContext({
        ...params,
        event: params.event,
        client: this._client,
        customAccessToken,
        batchQueue: this._batchQueue,
        appId: this._appId,
      });
    }
    if (params.event instanceof InstagramEvent) {
      return new InstagramContext({
        ...params,
        event: params.event,
        client: this._client,
        customAccessToken,
        batchQueue: this._batchQueue,
        appId: this._appId,
      });
    }
    return new MessengerContext({
      ...params,
      event: params.event,
      client: this._client,
      customAccessToken,
      batchQueue: this._batchQueue,
      appId: this._appId,
    });
  }
}
