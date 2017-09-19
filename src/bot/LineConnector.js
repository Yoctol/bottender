/*
  eslint-disable class-methods-use-this
  @flow
*/
import { LineClient } from 'messaging-api-line';

import LineContext from '../context/LineContext';
import LineEvent, { type LineRawEvent } from '../context/LineEvent';
import type { Session } from '../session/Session';

import type { Connector, SessionWithUser } from './Connector';

type LineRequestBody = {
  events: Array<LineRawEvent>,
};

type LineUser = {
  id: string,
};

export type LineSession = SessionWithUser<LineUser>;

export default class LineConnector
  implements Connector<LineRequestBody, LineUser> {
  _client: LineClient;

  constructor({
    accessToken,
    channelSecret,
  }: {|
    accessToken: string,
    channelSecret: string,
  |}) {
    this._client = LineClient.connect(accessToken, channelSecret);
  }

  get platform(): string {
    return 'line';
  }

  get client(): LineClient {
    return this._client;
  }

  getUniqueSessionIdFromRequest(body: LineRequestBody): string {
    const { source } = body.events[0];
    if (source.type === 'user') {
      return source.userId;
    } else if (source.type === 'group') {
      return source.groupId;
    } else if (source.type === 'room') {
      return source.roomId;
    }
    throw new TypeError(
      'LineConnector: sender type should be one of user, group, room.'
    );
  }

  // FIXME: handling different type session
  async updateSession(session: Session, body: LineRequestBody): Promise<void> {
    if (!session.type) {
      await this._updateSession(session, body);
      return;
    }

    if (session.type === 'user') {
      if (!session.user) {
        await this._updateSession(session, body);
      }
      return;
    }

    await this._updateSession(session, body);
  }

  mapRequestToEvents(body: LineRequestBody): Array<LineEvent> {
    return body.events.map(e => new LineEvent(e));
  }

  createContext({
    event,
    session,
  }: {
    event: LineEvent,
    session: ?LineSession,
  }): LineContext {
    return new LineContext({
      client: this._client,
      event,
      session,
    });
  }

  verifySignature(rawBody: string, signature: string): boolean {
    return this._client.isValidSignature(rawBody, signature);
  }

  async _updateSession(session: Session, body: LineRequestBody): Promise<void> {
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
}
