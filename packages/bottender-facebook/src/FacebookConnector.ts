import { EventEmitter } from 'events';

import warning from 'warning';
import { BatchConfig } from 'messenger-batch';
import {
  FacebookBaseConnector,
  MessengerContext,
  MessengerEvent,
  RequestContext,
} from 'bottender';

import FacebookClient from './FacebookClient';
import FacebookContext from './FacebookContext';
import FacebookEvent from './FacebookEvent';

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

export default class FacebookConnector extends FacebookBaseConnector<
  FacebookRequestBody,
  FacebookClient
> {
  _mapPageToAccessToken: ((pageId: string) => Promise<string>) | null = null;

  constructor(options: ConstructorOptions) {
    super({
      ...options,
      ClientClass: FacebookClient,
    });

    const { mapPageToAccessToken } = options;

    this._mapPageToAccessToken = mapPageToAccessToken ?? null;
  }

  mapRequestToEvents(
    body: FacebookRequestBody
  ): (FacebookEvent | MessengerEvent)[] {
    // TODO: handle instagram
    if (body.object !== 'page') {
      return [];
    }

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

  async createContext(params: {
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
