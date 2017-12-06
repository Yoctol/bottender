/* @flow */

import { ViberClient } from 'messaging-api-viber';
import { addedDiff } from 'deep-object-diff';

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
    switch (body.event) {
      case 'subscribed':
      case 'conversation_started':
        return body.user.id;
      case 'unsubscribed':
      case 'delivered':
      case 'seen':
      case 'failed':
        return body.user_id;
      case 'message':
        return body.sender.id;
      default:
        return '';
    }
  }

  async updateSession(session: Session, body: ViberRequestBody): Promise<void> {
    let user;

    switch (body.event) {
      case 'subscribed':
      case 'conversation_started':
        user = body.user;
        break;
      case 'unsubscribed':
      case 'delivered':
      case 'seen':
      case 'failed':
        user = {
          id: body.user_id,
        };
        break;
      case 'message':
        user = body.sender;
        break;
      default:
        break;
    }

    if (Object.keys(addedDiff(session.user || {}, user)).length > 0) {
      session.user = {
        ...session.user,
        ...user,
      };
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
