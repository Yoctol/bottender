/* eslint-disable class-methods-use-this */
import { MessengerClient } from 'messaging-api-messenger';

import MessengerContext from '../context/MessengerContext';

import Connector from './Connector';

export default class MessengerConnector extends Connector {
  constructor(accessToken) {
    super();
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

  async getUserProfile(senderId) {
    const { data } = await this._graphAPIClient.getUserProfile(senderId);
    return data;
  }

  async handleRequest({ body, session }) {
    const rawEvent = this._getRawEventFromRequest(body);

    const context = new MessengerContext({
      graphAPIClient: this._graphAPIClient,
      rawEvent,
      session,
    });

    await this._handler(context);
  }
}
