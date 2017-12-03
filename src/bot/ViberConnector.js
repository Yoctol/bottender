/* @flow */

import { ViberClient } from 'messaging-api-viber';

import ViberContext from '../context/ViberContext';
import ViberEvent, { type ViberRawEvent } from '../context/ViberEvent';
import type { Session } from '../session/Session';

import type { Connector } from './Connector';

export type ViberRequestBody = ViberRawEvent;

type ConstructorOptions = {|
  accessToken?: string,
  client?: ViberClient,
|};

export default class ViberConnector implements Connector<ViberRequestBody> {
  _client: ViberClient;

  constructor({ accessToken, client }: ConstructorOptions) {
    this._client = client || ViberClient.connect(accessToken);
  }

  _getRawEventFromRequest(body: ViberRequestBody): ViberRawEvent {
    return body;
  }

  get platform(): string {
    return 'viber';
  }

  get client(): ViberClient {
    return this._client;
  }

  getUniqueSessionKey(body: ViberRequestBody): string {
    // TODO
  }

  async updateSession(session: Session, body: ViberRequestBody): Promise<void> {
    if (!session.user) {
      // FIXME: refine user
      let user;

      // TODO

      session.user = user;
      session.user._updatedAt = new Date().toISOString();
    }

    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  }

  mapRequestToEvents(body: ViberRequestBody): Array<ViberEvent> {
    const rawEvent = this._getRawEventFromRequest(body);
    return [new ViberEvent(rawEvent)];
  }

  createContext({
    event,
    session,
    initialState,
  }: {
    event: ViberEvent,
    session: ?Session,
    initialState: Object,
  }): ViberContext {
    return new ViberContext({
      client: this._client,
      event,
      session,
      initialState,
    });
  }
}
