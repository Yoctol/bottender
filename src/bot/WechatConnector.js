/* @flow */
import { WechatClient } from 'messaging-api-wechat';

import WechatContext from '../context/WechatContext';
import WechatEvent, { type WechatRawEvent } from '../context/WechatEvent';
import { type Session } from '../session/Session';

import { type Connector } from './Connector';

export type WechatRequestBody = WechatRawEvent;

type ConstructorOptions = {|
  client?: WechatClient,
  origin?: string,
|};

export default class WechatConnector implements Connector<WechatRequestBody> {
  _client: WechatClient;

  _verifyToken: ?string;

  constructor({ client, verifyToken, origin }: ConstructorOptions) {
    this._client =
      client ||
      WechatClient.connect({
        origin,
      });

    this._verifyToken = verifyToken;
  }

  _getRawEventFromRequest(body: WechatRequestBody): WechatRawEvent {
    return body.xml;
  }

  get platform(): string {
    return 'wechat';
  }

  get client(): WechatClient {
    return this._client;
  }

  get verifyToken(): ?string {
    return this._verifyToken;
  }

  getUniqueSessionKey(body: WechatRequestBody): string {
    return body.openid;
  }

  async updateSession(
    session: Session,
    body: WechatRequestBody
  ): Promise<void> {
    console.log('updateSession', { body });
    if (!session.user) {
      session.user = {
        id: body.openid,
        _updatedAt: new Date().toISOString(),
      };
    }

    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  }

  mapRequestToEvents(body: WechatRequestBody): Array<WechatEvent> {
    const rawEvent = this._getRawEventFromRequest(body);

    console.log('mapRequestToEvents', { rawEvent });

    return [new WechatEvent(rawEvent)];
  }

  createContext(params: {
    event: WechatEvent,
    session: ?Session,
    initialState: ?Object,
    requestContext: ?Object,
  }): WechatContext {
    return new WechatContext({
      ...params,
      client: this._client,
    });
  }
}
