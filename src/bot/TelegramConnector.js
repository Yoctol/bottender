/*
  eslint-disable class-methods-use-this
  @flow
*/
import { TelegramClient } from 'messaging-api-telegram';

import TelegramContext from '../context/TelegramContext';
import type { TelegramRawEvent } from '../context/TelegramEvent';
import type { Session } from '../session/Session';

import type { FunctionalHandler } from './Bot';
import type { Connector, SessionWithUser } from './Connector';

export type TelegramUser = {
  id: number,
  first_name: string,
  last_name?: string,
  username?: string,
  language_code?: string,
};

export type TelegramRequestBody = TelegramRawEvent;

export type TelegramSession = SessionWithUser<TelegramUser>;

export default class TelegramConnector
  implements Connector<TelegramRequestBody, TelegramUser> {
  _client: TelegramClient;

  constructor({ accessToken }: { accessToken: string }) {
    this._client = TelegramClient.connect(accessToken);
  }

  _getRawEventFromRequest(body: TelegramRequestBody): TelegramRawEvent {
    return body;
  }

  get platform(): string {
    return 'telegram';
  }

  getUniqueSessionIdFromRequest(body: TelegramRequestBody): string {
    let id = '';

    if (body.message !== undefined) {
      id = body.message.from.id;
    } else if (body.callback_query !== undefined) {
      id = body.callback_query.from.id;
    }

    return `${id}`;
  }

  shouldSessionUpdate(session: Session): boolean {
    return !session.user;
  }

  async updateSession(
    session: Session,
    body: TelegramRequestBody
  ): Promise<void> {
    let user = {};

    if (body.message !== undefined) {
      user = body.message.from;
    } else if (body.callback_query !== undefined) {
      user = body.callback_query.from;
    }

    session.user = user;
  }

  async handleRequest({
    body,
    session,
    handler,
  }: {
    body: TelegramRequestBody,
    session: TelegramSession,
    handler: FunctionalHandler,
  }): Promise<void> {
    const rawEvent = this._getRawEventFromRequest(body);

    const context = new TelegramContext({
      client: this._client,
      rawEvent,
      session,
    });

    await handler(context);
  }
}
