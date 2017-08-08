/*
  eslint-disable class-methods-use-this
  @flow
*/
import { MessengerClient } from 'messaging-api-messenger';

import MessengerContext from '../context/MessengerContext';
import type { MessengerRawEvent } from '../context/MessengerEvent';
import type { Session } from '../session/Session';

import type { FunctionalHandler } from './Bot';
import type { Connector, SessionWithUser } from './Connector';

type MessengerRequestBody = {
  entry: Array<{
    messaging: Array<MessengerRawEvent>,
  }>,
};

type MessengerUser = {
  id: string,
};

export type MessengerSession = SessionWithUser<MessengerUser>;

export default class MessengerConnector
  implements Connector<MessengerRequestBody, MessengerUser> {
  _client: MessengerClient;

  constructor({ accessToken }: { accessToken: string }) {
    this._client = MessengerClient.connect(accessToken);
  }

  _getRawEventFromRequest(body: MessengerRequestBody) {
    return body.entry[0].messaging[0];
  }

  get platform(): string {
    return 'messenger';
  }

  getUniqueSessionIdFromRequest(body: MessengerRequestBody): string {
    const rawEvent = this._getRawEventFromRequest(body);
    if (rawEvent.message && rawEvent.message.is_echo) {
      return rawEvent.recipient.id;
    }
    return rawEvent.sender.id;
  }

  shouldSessionUpdate(session: Session): boolean {
    return !session.user;
  }

  async updateSession(
    session: Session,
    body: MessengerRequestBody
  ): Promise<void> {
    const senderId = this.getUniqueSessionIdFromRequest(body);
    const user = await this._client.getUserProfile(senderId);

    session.user = {
      id: senderId,
      ...user,
    };
  }

  async handleRequest({
    body,
    session,
    handler,
  }: {
    body: MessengerRequestBody,
    session: MessengerSession,
    handler: FunctionalHandler,
  }): Promise<void> {
    const rawEvent = this._getRawEventFromRequest(body);

    const context = new MessengerContext({
      client: this._client,
      rawEvent,
      session,
    });

    await handler(context);
  }
}
