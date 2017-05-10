/* eslint-disable class-methods-use-this */
import LINEBotAPIClient from '../api/LINEBotAPIClient';
import LINEContext from '../session/LINEContext';

import Connecter from './Connector';

export default class LINEConnector extends Connecter {
  constructor({ accessToken, channelSecret }) {
    super();
    this._lineAPIClient = LINEBotAPIClient.factory(accessToken, channelSecret);
  }

  get platform(): string {
    return 'line';
  }

  getSenderIdFromRequest(request) {
    const rawEvent = request.body.events[0];
    return rawEvent.source.userId; // FIXME: group, room?
  }

  async getUserProfile(senderId) {
    const { data } = await this._lineAPIClient.getUserProfile(senderId);
    return data;
  }

  async handleRequest({ request, sessionData, db }) {
    const createLINEContext = rawEvent =>
      new LINEContext({
        lineAPIClient: this._lineAPIClient,
        rawEvent,
        data: sessionData,
        db,
      });

    const promises = [];
    request.body.events.forEach(event => {
      const context = createLINEContext(event);
      promises.push(this._handler(context));
    });

    await Promise.all(promises);
  }
}
