import EventEmitter from 'events';
import crypto from 'crypto';

import warning from 'warning';
import { LineClient } from 'messaging-api-line';

import LineContext from '../context/LineContext';
import LineEvent, { LineRawEvent } from '../context/LineEvent';
import Session from '../session/Session';

import { Connector } from './Connector';

export type LineRequestBody = {
  destination: string;
  events: LineRawEvent[];
};

type CommonConstructorOptions = {
  mapDestinationToAccessToken?: (destination: string) => Promise<string>;
  shouldBatch?: boolean;
  sendMethod?: string;
  skipProfile?: boolean;
};

type ConstructorOptionsWithoutClient = {
  accessToken: string;
  channelSecret: string;
  origin?: string;
} & CommonConstructorOptions;

type ConstructorOptionsWithClient = {
  client: LineClient;
} & CommonConstructorOptions;

type ConstructorOptions =
  | ConstructorOptionsWithoutClient
  | ConstructorOptionsWithClient;

export default class LineConnector
  implements Connector<LineRequestBody, LineClient> {
  _client: LineClient;

  _channelSecret: string;

  _skipProfile: boolean;

  _mapDestinationToAccessToken:
    | ((destination: string) => Promise<string>)
    | null;

  _shouldBatch: boolean;

  _sendMethod: string;

  constructor(options: ConstructorOptions) {
    const {
      mapDestinationToAccessToken,
      shouldBatch,
      sendMethod,
      skipProfile,
    } = options;
    if ('client' in options) {
      this._client = options.client;

      this._channelSecret = '';
    } else {
      const { accessToken, channelSecret, origin } = options;

      this._client = LineClient.connect({
        accessToken,
        channelSecret,
        origin,
      });

      this._channelSecret = channelSecret;
    }

    this._mapDestinationToAccessToken = mapDestinationToAccessToken || null;

    this._shouldBatch = typeof shouldBatch === 'boolean' ? shouldBatch : true;
    warning(
      !sendMethod || sendMethod === 'reply' || sendMethod === 'push',
      'sendMethod should be one of `reply` or `push`'
    );
    this._sendMethod = sendMethod || 'reply';

    // FIXME: maybe set this default value as true
    this._skipProfile = typeof skipProfile === 'boolean' ? skipProfile : false;
  }

  _isWebhookVerifyEvent(event: LineRawEvent): boolean {
    return (
      (event as any).replyToken === '00000000000000000000000000000000' ||
      (event as any).replyToken === 'ffffffffffffffffffffffffffffffff'
    );
  }

  isWebhookVerifyRequest(body: LineRequestBody): boolean {
    return (
      body &&
      Array.isArray(body.events) &&
      body.events.length > 0 &&
      body.events.every(this._isWebhookVerifyEvent)
    );
  }

  get platform(): string {
    return 'line';
  }

  get client(): LineClient {
    return this._client;
  }

  getUniqueSessionKey(body: LineRequestBody): string {
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

      let memberIds: string[] = [];

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

      let memberIds: string[] = [];

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
      Object.freeze(session.group);
    }
    Object.defineProperty(session, 'group', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.group,
    });

    if (session.room) {
      Object.freeze(session.room);
    }
    Object.defineProperty(session, 'room', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.room,
    });

    if (session.user) {
      Object.freeze(session.user);
    }
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  }

  mapRequestToEvents(body: LineRequestBody): LineEvent[] {
    const { destination } = body;

    return body.events
      .filter(event => !this._isWebhookVerifyEvent(event))
      .map(event => new LineEvent(event, { destination }));
  }

  async createContext(params: {
    event: LineEvent;
    session?: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: Record<string, any> | null;
    emitter?: EventEmitter | null;
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

  preprocess({
    method,
    headers,
    rawBody,
    body,
  }: {
    method: string;
    headers: Record<string, any>;
    query: Record<string, any>;
    rawBody: string;
    body: Record<string, any>;
  }) {
    if (method.toLowerCase() !== 'post') {
      return {
        shouldNext: true,
      };
    }

    if (!this.verifySignature(rawBody, headers['x-line-signature'])) {
      const error = {
        message: 'LINE Signature Validation Failed!',
        request: {
          rawBody,
          headers: {
            'x-line-signature': headers['x-line-signature'],
          },
        },
      };

      return {
        shouldNext: false,
        response: {
          status: 400,
          body: { error },
        },
      };
    }

    if (this.isWebhookVerifyRequest(body as any)) {
      return {
        shouldNext: false,
        response: {
          status: 200,
          body: 'OK',
        },
      };
    }

    return {
      shouldNext: true,
    };
  }
}
