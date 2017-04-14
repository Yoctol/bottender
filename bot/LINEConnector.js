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
    // message, follow, unfollow, join, leave, postback, beacon
    const promises = [];
    request.body.events
      .filter(event => ['message'].includes(event.type))
      .forEach(event => {
        const context = createLINEContext(event);
        promises.push(Promise.resolve(this._handler(context)));
      });

    request.body.events
      .filter(event => ['postback'].includes(event.type))
      .forEach(event => {
        event.postback.payload = event.postback.data; // FIXME
        const context = createLINEContext(event);
        promises.push(Promise.resolve(this._handler(context)));
      });

    await Promise.all(promises);
  }
}
