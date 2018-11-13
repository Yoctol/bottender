/* @flow */

import crypto from 'crypto';

import warning from 'warning';
import { LineClient } from 'messaging-api-line';

import LineContext from '../context/LineContext';
import LineEvent, { type LineRawEvent } from '../context/LineEvent';
import { type Session } from '../session/Session';

import { type Connector } from './Connector';

type LineRequestBody = {
  destination: string,
  events: Array<LineRawEvent>,
};

type ConstructorOptions = {|
  accessToken?: string,
  channelSecret?: string,
  client?: LineClient,
  mapDestinationToAccessToken?: (destination: string) => Promise<string>,
  shouldBatch: ?boolean,
  sendMethod: ?string,
  origin?: string,
  skipProfile?: ?boolean,
|};

export default class LineConnector implements Connector<LineRequestBody> {
  _client: LineClient;

  _channelSecret: string;

  _skipProfile: boolean;

  _mapDestinationToAccessToken: ?(destination: string) => Promise<string>;

  _shouldBatch: ?boolean;

  _sendMethod: ?string;

  constructor({
    accessToken,
    channelSecret,
    client,
    mapDestinationToAccessToken,
    shouldBatch,
    sendMethod,
    origin,
    skipProfile,
  }: ConstructorOptions) {
    this._client =
      client ||
      LineClient.connect({
        accessToken,
        origin,
      });
    this._channelSecret = channelSecret || '';

    this._mapDestinationToAccessToken = mapDestinationToAccessToken;

    this._shouldBatch = shouldBatch || false;
    warning(
      !sendMethod || sendMethod === 'reply' || sendMethod === 'push',
      'sendMethod should be one of `reply` or `push`'
    );
    this._sendMethod = sendMethod || 'push';

    // FIXME: maybe set this default value as true
    this._skipProfile = typeof skipProfile === 'boolean' ? skipProfile : false;
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
    }
    if (source.type === 'group') {
      return source.groupId;
    }
    if (source.type === 'room') {
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
      let user = null;

      if (source.userId) {
        user = this._skipProfile
          ? {
              id: source.userId,
              _updatedAt: new Date().toISOString(),
            }
          : {
              id: source.userId,
              _updatedAt: new Date().toISOString(),
              ...(await this._client.getGroupMemberProfile(
                source.groupId,
                source.userId
              )),
            };
      }

      session.user = user;

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
      let user = null;

      if (source.userId) {
        user = this._skipProfile
          ? {
              id: source.userId,
              _updatedAt: new Date().toISOString(),
            }
          : {
              id: source.userId,
              _updatedAt: new Date().toISOString(),
              ...(await this._client.getRoomMemberProfile(
                source.roomId,
                source.userId
              )),
            };
      }

      session.user = user;

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
        const user = this._skipProfile
          ? {}
          : await this._client.getUserProfile(source.userId);

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
    const { destination } = body;

    return body.events
      .filter(event => !this._isWebhookVerifyEvent(event))
      .map(event => new LineEvent(event, { destination }));
  }

  async createContext(params: {
    event: LineEvent,
    session: ?Session,
    initialState: ?Object,
    requestContext: ?Object,
  }): Promise<LineContext> {
    let customAccessToken;
    if (this._mapDestinationToAccessToken) {
      const { destination } = params.event;

      if (!destination) {
        warning(false, 'Could not find destination from request body.');
      } else {
        customAccessToken = await this._mapDestinationToAccessToken(
          destination
        );
      }
    }

    return new LineContext({
      ...params,
      client: this._client,
      customAccessToken,
      shouldBatch: this._shouldBatch,
      sendMethod: this._sendMethod,
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

    return crypto.timingSafeEqual(bufferFromSignature, hashBufferFromBody);
  }
}
