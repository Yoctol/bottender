import { EventEmitter } from 'events';

import warning from 'warning';
import { BatchConfig } from 'facebook-batch';
import {
  Connector,
  FacebookBaseConnector,
  MessengerConnector,
  MessengerContext,
  MessengerEvent,
  MessengerTypes,
  RequestContext,
} from 'bottender';

import FacebookClient from './FacebookClient';
import FacebookContext from './FacebookContext';
import FacebookEvent from './FacebookEvent';
import { ChangesEntry, FacebookWebhookRequestBody } from './FacebookTypes';

// TODO: use exported type
type Session = Record<string, any>;

export type FacebookConnectorOptions = {
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
  extends FacebookBaseConnector<FacebookWebhookRequestBody, FacebookClient>
  implements Connector<FacebookWebhookRequestBody, FacebookClient>
{
  _mapPageToAccessToken: ((pageId: string) => Promise<string>) | null = null;

  _messengerConnector: MessengerConnector;

  public constructor(options: FacebookConnectorOptions) {
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

  getUniqueSessionKey(event: FacebookEvent | MessengerEvent): string | null {
    if (event instanceof MessengerEvent) {
      return this._messengerConnector.getUniqueSessionKey(event);
    }

    // TODO: How to determine session key in facebook feed events
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
    body: FacebookWebhookRequestBody
  ): (FacebookEvent | MessengerEvent)[] {
    // TODO: returns InstagramEvent (object === 'instagram')
    if (body.object !== 'page') {
      return [];
    }

    const bodyEntry: (MessengerTypes.MessagingEntry | ChangesEntry)[] =
      body.entry;

    return bodyEntry
      .map<FacebookEvent | MessengerEvent | null>((entry) => {
        const pageId = entry.id;
        const timestamp = entry.time;
        if ('messaging' in entry) {
          return new MessengerEvent(entry.messaging[0], {
            pageId,
            isStandby: false,
          });
        }

        if ('standby' in entry) {
          return new MessengerEvent(entry.standby[0], {
            pageId,
            isStandby: true,
          });
        }

        if ('changes' in entry) {
          return new FacebookEvent(entry.changes[0], { pageId, timestamp });
        }

        return null;
      })
      .filter(
        (event): event is FacebookEvent | MessengerEvent => event !== null
      );
  }

  public async createContext(params: {
    event: FacebookEvent | MessengerEvent;
    session?: Session;
    initialState?: Record<string, any>;
    requestContext?: RequestContext;
    emitter?: EventEmitter;
  }): Promise<FacebookContext | MessengerContext> {
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
