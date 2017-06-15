/* eslint-disable class-methods-use-this */
import { MessengerClient } from 'messaging-api-messenger';

import MessengerContext from '../context/MessengerContext';

import type { Connector } from './Connector';

export default class MessengerConnector implements Connector {
  constructor(accessToken: string) {
    this._graphAPIClient = MessengerClient.factory(accessToken);
  }

  _getRawEventFromRequest(body) {
    return body.entry[0].messaging[0];
  }

  get platform(): string {
    return 'messenger';
  }

  getSenderIdFromRequest(body) {
    const rawEvent = this._getRawEventFromRequest(body);
    if (rawEvent.message && rawEvent.message.is_echo) {
      return rawEvent.recipient.id;
    }
    return rawEvent.sender.id;
  }

  async getUserProfile(senderId: string) {
    const { data } = await this._graphAPIClient.getUserProfile(senderId);
    return data;
  }

  async handleRequest({ body, session, handler }) {
    const rawEvent = this._getRawEventFromRequest(body);

    const context = new MessengerContext({
      graphAPIClient: this._graphAPIClient,
      rawEvent,
      session,
    });

    await handler(context);
  }
}
