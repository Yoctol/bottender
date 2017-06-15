/* eslint-disable class-methods-use-this */
import { LINEClient } from 'messaging-api-line';

import LINEContext from '../context/LINEContext';

import type { Connector } from './Connector';

export default class LINEConnector implements Connector {
  constructor({ accessToken, channelSecret }) {
    this._lineAPIClient = LINEClient.factory(accessToken, channelSecret);
  }

  get platform(): string {
    return 'line';
  }

  getSenderIdFromRequest(body) {
    const rawEvent = body.events[0];
    return rawEvent.source.userId; // FIXME: group, room?
  }

  async getUserProfile(senderId: string) {
    const { data } = await this._lineAPIClient.getUserProfile(senderId);
    return data;
  }

  async handleRequest({ body, session, handler }) {
    const createLINEContext = rawEvent =>
      new LINEContext({
        lineAPIClient: this._lineAPIClient,
        rawEvent,
        session,
      });

    const promises = [];
    body.events.forEach(event => {
      const context = createLINEContext(event);
      promises.push(handler(context));
    });

    await Promise.all(promises);
  }
}
