import { EventEmitter } from 'events';

import warning from 'warning';
import { MessengerConnector } from 'bottender';

import FacebookClient from './FacebookClient';
import FacebookContext from './FacebookContext';
import FacebookEvent from './FacebookEvent';

type ConstructorOptions = {
  accessToken?: string;
  appSecret?: string;
  client?: FacebookClient;
  mapPageToAccessToken?: (pageId: string) => Promise<string>;
  verifyToken?: string;
  batchConfig?: Record<string, any>;
  origin?: string;
  skipAppSecretProof?: boolean;
  skipProfile?: boolean;
};

export default class FacebookConnector extends MessengerConnector {
  _client: FacebookClient = this._client;

  _appSecret: string = this._appSecret;

  constructor({
    accessToken,
    appSecret,
    client,
    mapPageToAccessToken,
    verifyToken,
    batchConfig,
    origin,
    skipAppSecretProof,
    skipProfile,
  }: ConstructorOptions) {
    const _client =
      client ||
      FacebookClient.connect({
        accessToken: accessToken || '',
        appSecret,
        origin,
        skipAppSecretProof,
      });
    super({
      accessToken,
      appSecret,
      client: _client,
      mapPageToAccessToken,
      verifyToken,
      batchConfig,
      origin,
      skipAppSecretProof,
      skipProfile,
    });
  }

  mapRequestToEvents(body: Record<string, any>) {
    const rawEvents = this._getRawEventsFromRequest(body);
    const isStandby = this._isStandby(body);
    let pageIds = [];

    if (body.object === 'page' && body.entry) {
      pageIds = body.entry
        .map(ent => {
          if (ent.messaging || ent.standby || ent.changes) {
            return ent.id;
          }
          return null;
        })
        .filter(event => event != null);
    }

    return rawEvents.map(
      (event, index) =>
        new FacebookEvent(event, {
          isStandby,
          // pageId is from Facebook events (Page webhook),
          // _getPageIdFromRawEvent() is from Messenger events
          pageId: pageIds[index] || this._getPageIdFromRawEvent(event),
        })
    );
  }

  async createContext(params: {
    event: FacebookEvent;
    session?: Session;
    initialState?: Record<string, any>;
    requestContext?: RequestContext;
    emitter?: EventEmitter;
  }): Promise<FacebookContext> {
    let customAccessToken;

    if (this._mapPageToAccessToken) {
      const { pageId } = params.event;

      if (!pageId) {
        warning(false, 'Could not find pageId from request body.');
      } else {
        customAccessToken = await this._mapPageToAccessToken(pageId);
      }
    }
    return new FacebookContext({
      ...params,
      client: this._client,
      customAccessToken,
      batchQueue: this._batchQueue,
      appId: this._appId,
    });
  }
}
