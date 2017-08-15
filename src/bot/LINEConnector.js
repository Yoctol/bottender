/*
  eslint-disable class-methods-use-this
  @flow
*/
import { LINEClient } from 'messaging-api-line';

import LINEContext from '../context/LINEContext';
import type { LINERawEvent } from '../context/LINEEvent';
import type { Session } from '../session/Session';

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
    this._client = LINEClient.connect(accessToken, channelSecret);
  }

  get platform(): string {
    return 'line';
  }

  getUniqueSessionIdFromRequest(body: LINERequestBody): string {
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

  shouldSessionUpdate(session: Session): boolean {
    if (!session.type) return true;

    if (session.type === 'user') {
      return !session.user;
    }

    return true;
  }

  async updateSession(session: Session, body: LINERequestBody): Promise<void> {
    const { source } = body.events[0];

    if (!session.type) {
      session.type = source.type;
    }

    if (source.type === 'group') {
      const memberIds = await this._client.getAllGroupMemberIds(source.groupId);
      session.group = {
        id: source.groupId,
        members: memberIds.map(id => ({ id })),
      };
    } else if (source.type === 'room') {
      const memberIds = await this._client.getAllRoomMemberIds(source.roomId);
      session.room = {
        id: source.roomId,
        members: memberIds.map(id => ({ id })),
      };
    }

    if (source.userId) {
      const user = await this._client.getUserProfile(source.userId);
      session.user = {
        id: source.userId,
        platform: 'line',
        ...user,
      };
    } else {
      session.user = null;
    }
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

  verifySignature(request: {
    rawBody: string,
    header: { 'x-line-signature': string },
  }): boolean {
    return this._client.isValidSignature(
      request.rawBody,
      request.header['x-line-signature']
    );
  }
}
