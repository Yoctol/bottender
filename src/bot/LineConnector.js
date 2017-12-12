/* @flow */

import crypto from 'crypto';

import { LineClient } from 'messaging-api-line';

import LineContext from '../context/LineContext';
import LineEvent, { type LineRawEvent } from '../context/LineEvent';
import type { Session } from '../session/Session';

import type { Connector } from './Connector';

type LineRequestBody = {
  events: Array<LineRawEvent>,
};

type ConstructorOptions = {|
  accessToken?: string,
  channelSecret?: string,
  client?: LineClient,
|};

export default class LineConnector implements Connector<LineRequestBody> {
  _client: LineClient;
  _channelSecret: string;

  constructor({ accessToken, channelSecret, client }: ConstructorOptions) {
    this._client = client || LineClient.connect(accessToken);
    this._channelSecret = channelSecret || '';
  }

  _isWebhookVerifyEvent(event: LineRawEvent): boolean {
    return (
      event.replyToken === '00000000000000000000000000000000' ||
      event.replyToken === 'ffffffffffffffffffffffffffffffff'
    );
  }

  _isWebhookVerifyRequest(body: LineRequestBody): boolean {
    return body.events.every(this._isWebhookVerifyEvent);
  }

  get platform(): string {
    return 'line';
  }

  get client(): LineClient {
    return this._client;
  }

  getUniqueSessionKey(body: LineRequestBody): string {
    if (this._isWebhookVerifyRequest(body)) {
      return '';
    }
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

  async updateSession(session: Session, body: LineRequestBody): Promise<void> {
    if (this._isWebhookVerifyRequest(body)) {
      return;
    }
    const { source } = body.events[0];

    if (!session.type) {
      session.type = source.type;
    }

    if (source.type === 'group') {
      const user = await this._client.getGroupMemberProfile(
        source.groupId,
        source.userId
      );

      session.user = {
        id: source.userId,
        _updatedAt: new Date().toISOString(),
        ...user,
      };

      let memberIds = [];

      try {
        memberIds = await this._client.getAllGroupMemberIds(source.groupId);
      } catch (e) {
        // FIXME: handle no memberIds
        // only LINE@ Approved accounts or official accounts can use this API
        // https://developers.line.me/en/docs/messaging-api/reference/#get-group-member-user-ids
      }

      session.group = {
        id: source.groupId,
        members: memberIds.map(id => ({ id })),
        _updatedAt: new Date().toISOString(),
      };
    } else if (source.type === 'room') {
      const user = await this._client.getRoomMemberProfile(
        source.roomId,
        source.userId
      );

      session.user = {
        id: source.userId,
        _updatedAt: new Date().toISOString(),
        ...user,
      };

      let memberIds = [];

      try {
        memberIds = await this._client.getAllRoomMemberIds(source.roomId);
      } catch (e) {
        // FIXME: handle no memberIds
        // only LINE@ Approved accounts or official accounts can use this API
        // https://developers.line.me/en/docs/messaging-api/reference/#get-room-member-user-ids
      }

      session.room = {
        id: source.roomId,
        members: memberIds.map(id => ({ id })),
        _updatedAt: new Date().toISOString(),
      };
    } else if (source.type === 'user') {
      if (!session.user) {
        const user = await this._client.getUserProfile(source.userId);
        session.user = {
          id: source.userId,
          _updatedAt: new Date().toISOString(),
          ...user,
        };
      }
    }

    if (session.group) {
      // TODO: remove later
      if (!session.group._updatedAt) {
        session.group._updatedAt = new Date().toISOString();
      }

      Object.freeze(session.group);
    }
    Object.defineProperty(session, 'group', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.group,
    });

    if (session.room) {
      // TODO: remove later
      if (!session.room._updatedAt) {
        session.room._updatedAt = new Date().toISOString();
      }

      Object.freeze(session.room);
    }
    Object.defineProperty(session, 'room', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.room,
    });

    if (session.user) {
      // TODO: remove later
      if (!session.user._updatedAt) {
        session.user._updatedAt = new Date().toISOString();
      }

      Object.freeze(session.user);
    }
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  }

  mapRequestToEvents(body: LineRequestBody): Array<LineEvent> {
    return body.events
      .filter(e => !this._isWebhookVerifyEvent(e))
      .map(e => new LineEvent(e));
  }

  createContext({
    event,
    session,
    initialState,
  }: {
    event: LineEvent,
    session: ?Session,
    initialState: Object,
  }): LineContext {
    return new LineContext({
      client: this._client,
      event,
      session,
      initialState,
    });
  }

  verifySignature(rawBody: string, signature: string): boolean {
    const hashBufferFromBody = crypto
      .createHmac('sha256', this._channelSecret)
      .update(rawBody, 'utf8')
      .digest();

    const bufferFromSignature = Buffer.from(signature, 'base64');

    // return early here if buffer lengths are not equal since timingSafeEqual
    // will throw if buffer lengths are not equal
    if (bufferFromSignature.length !== hashBufferFromBody.length) {
      return false;
    }

    // wait this PR to be merged
    // https://github.com/facebook/flow/pull/4974
    // $FlowExpectedError
    return crypto.timingSafeEqual(bufferFromSignature, hashBufferFromBody);
  }
}
