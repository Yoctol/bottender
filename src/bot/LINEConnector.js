/*
  eslint-disable class-methods-use-this
  @flow
*/
import { LINEClient } from 'messaging-api-line';

import LINEContext from '../context/LINEContext';
import type { LINERawEvent } from '../context/LINEEvent';

import type { FunctionalHandler } from './Bot';
import type { Connector, SessionWithUser } from './Connector';

type LINERequestBody = {
  events: Array<LINERawEvent>,
};

type LINEUser = {
  id: string,
};

export type LINESession = SessionWithUser<LINEUser>;

export default class LINEConnector
  implements Connector<LINERequestBody, LINEUser> {
  _client: LINEClient;

  constructor({
    accessToken,
    channelSecret,
  }: {
    accessToken: string,
    channelSecret: string,
  }) {
    this._client = LINEClient.factory(accessToken, channelSecret);
  }

  get platform(): string {
    return 'line';
  }

  getSenderIdFromRequest(body: LINERequestBody): string {
    const { source } = body.events[0];
    if (source.type === 'user') {
      return source.userId;
    } else if (source.type === 'group') {
      return source.groupId;
    } else if (source.type === 'room') {
      return source.roomId;
    }
    throw new TypeError(
      'LINEConnector: sender type should be one of user, group, room.'
    );
  }

  async getUserProfile(senderId: string): Promise<LINEUser> {
    const { data } = await this._client.getUserProfile(senderId);
    return data;
  }

  async handleRequest({
    body,
    session,
    handler,
  }: {
    body: LINERequestBody,
    session: LINESession,
    handler: FunctionalHandler,
  }): Promise<void> {
    const createLINEContext = rawEvent =>
      new LINEContext({
        client: this._client,
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
