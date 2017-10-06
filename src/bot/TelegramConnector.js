/*
  eslint-disable class-methods-use-this
  @flow
*/
import { TelegramClient } from 'messaging-api-telegram';

import TelegramContext from '../context/TelegramContext';
import TelegramEvent, { type TelegramRawEvent } from '../context/TelegramEvent';
import type { Session } from '../session/Session';

import type { Connector } from './Connector';

export type TelegramUser = {
  id: number,
  first_name: string,
  last_name?: string,
  username?: string,
  language_code?: string,
};

export type TelegramRequestBody = TelegramRawEvent;

type ConstructorOptions = {|
  accessToken?: string,
  client?: TelegramClient,
|};

export default class TelegramConnector
  implements Connector<TelegramRequestBody> {
  _client: TelegramClient;

  constructor({ accessToken, client }: ConstructorOptions) {
    this._client = client || TelegramClient.connect(accessToken);
  }

  _getRawEventFromRequest(body: TelegramRequestBody): TelegramRawEvent {
    return body;
  }

  get platform(): string {
    return 'telegram';
  }

  get client(): TelegramClient {
    return this._client;
  }

  getUniqueSessionKey(body: TelegramRequestBody): string {
    if (body.message !== undefined) {
      return `${body.message.from.id}`;
    } else if (body.callback_query !== undefined) {
      return `${body.callback_query.from.id}`;
    }
    return '';
  }

  async updateSession(
    session: Session,
    body: TelegramRequestBody
  ): Promise<void> {
    if (!session.user) {
      // FIXME: refine user
      let user;

      if (body.message !== undefined) {
        user = body.message.from;
      } else if (body.callback_query !== undefined) {
        user = body.callback_query.from;
      }
      session.user = user;
      session.user._updatedAt = new Date().toISOString();
    }

    // TODO: remove later
    if (!session.user._updatedAt) {
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

  mapRequestToEvents(body: TelegramRequestBody): Array<TelegramEvent> {
    const rawEvent = this._getRawEventFromRequest(body);
    return [new TelegramEvent(rawEvent)];
  }

  createContext({
    event,
    session,
  }: {
    event: TelegramEvent,
    session: ?Session,
  }): TelegramContext {
    return new TelegramContext({
      client: this._client,
      event,
      session,
    });
  }
}
