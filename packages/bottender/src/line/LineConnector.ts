import crypto from 'crypto';
import { EventEmitter } from 'events';

import invariant from 'invariant';
import warning from 'warning';
import { LineClient } from 'messaging-api-line';

import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';

import LineContext from './LineContext';
import LineEvent, { LineRawEvent } from './LineEvent';

export type LineRequestBody = {
  destination: string;
  events: LineRawEvent[];
};

type LineRequestContext = RequestContext<
  LineRequestBody,
  { 'x-line-signature'?: string }
>;

type CommonConnectorOptions = {
  getConfig?: GetConfigFunction;
  getSessionKeyPrefix?: GetSessionKeyPrefixFunction;
  shouldBatch?: boolean;
  sendMethod?: string;
  skipLegacyProfile?: boolean;
};

type Credential = { accessToken: string; channelSecret: string };

type GetConfigFunction = ({
  params,
}: {
  params: Record<string, string>;
}) => Credential | Promise<Credential>;

export type GetSessionKeyPrefixFunction = (
  event: LineEvent,
  requestContext?: RequestContext
) => string;

type CredentialOptions =
  | Credential
  | {
      getConfig: GetConfigFunction;
    };

type ConnectorOptionsWithoutClient = CredentialOptions & {
  origin?: string;
} & CommonConnectorOptions;

type ConnectorOptionsWithClient = {
  client: LineClient;
  channelSecret: string;
} & CommonConnectorOptions;

export type LineConnectorOptions =
  | ConnectorOptionsWithoutClient
  | ConnectorOptionsWithClient;

export default class LineConnector
  implements Connector<LineRequestBody, LineClient> {
  _client: LineClient | undefined;

  _channelSecret: string | undefined;

  _origin: string | undefined;

  _skipLegacyProfile: boolean;

  _getConfig: GetConfigFunction | undefined;

  _getSessionKeyPrefix: GetSessionKeyPrefixFunction | undefined;

  _shouldBatch: boolean;

  /**
   * @deprecated
   */
  _sendMethod: string;

  constructor(options: LineConnectorOptions) {
    const {
      getConfig,
      shouldBatch,
      sendMethod,
      skipLegacyProfile,
      getSessionKeyPrefix,
    } = options;
    if ('client' in options) {
      this._client = options.client;

      this._channelSecret = options.channelSecret;
    } else {
      const { origin } = options;
      if ('getConfig' in options) {
        this._getConfig = getConfig;
      } else {
        const { accessToken, channelSecret } = options;
        invariant(
          accessToken,
          'LINE access token is required. Please make sure you have filled it correctly in your `bottender.config.js` or `.env` file.'
        );
        invariant(
          channelSecret,
          'LINE channel secret is required. Please make sure you have filled it correctly in your `bottender.config.js` or the `.env` file.'
        );

        this._client = new LineClient({
          accessToken,
          channelSecret,
          origin,
        });

        this._channelSecret = channelSecret;
      }

      this._origin = origin;
    }

    this._shouldBatch = typeof shouldBatch === 'boolean' ? shouldBatch : true;
    warning(
      !sendMethod || sendMethod === 'reply' || sendMethod === 'push',
      'sendMethod should be one of `reply` or `push`'
    );

    if (sendMethod) {
      warning(
        false,
        '`sendMethod` is deprecated. The value will always be `reply` in v2.'
      );
      this._sendMethod = sendMethod;
    } else {
      this._sendMethod = 'reply';
    }

    this._getSessionKeyPrefix = getSessionKeyPrefix;

    this._skipLegacyProfile =
      typeof skipLegacyProfile === 'boolean' ? skipLegacyProfile : true;
  }

  _isWebhookVerifyEvent(event: LineRawEvent): boolean {
    return (
      'replyToken' in event &&
      (event.replyToken === '00000000000000000000000000000000' ||
        event.replyToken === 'ffffffffffffffffffffffffffffffff')
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

  get platform(): 'line' {
    return 'line';
  }

  get client(): LineClient | undefined {
    return this._client;
  }

  getUniqueSessionKey(
    bodyOrEvent: LineRequestBody | LineEvent,
    requestContext?: RequestContext
  ): string {
    const rawEvent =
      bodyOrEvent instanceof LineEvent
        ? bodyOrEvent.rawEvent
        : bodyOrEvent.events[0];

    let prefix = '';
    if (this._getSessionKeyPrefix) {
      const event =
        bodyOrEvent instanceof LineEvent
          ? bodyOrEvent
          : new LineEvent(rawEvent, { destination: bodyOrEvent.destination });

      prefix = this._getSessionKeyPrefix(event, requestContext);
    }

    const { source } = rawEvent;

    if (source.type === 'user') {
      return `${prefix}${source.userId}`;
    }
    if (source.type === 'group') {
      return `${prefix}${source.groupId}`;
    }
    if (source.type === 'room') {
      return `${prefix}${source.roomId}`;
    }
    throw new TypeError(
      'LineConnector: sender type should be one of user, group, room.'
    );
  }

  async updateSession(
    session: Session,
    bodyOrEvent: LineRequestBody | LineEvent
  ): Promise<void> {
    const rawEvent =
      bodyOrEvent instanceof LineEvent
        ? bodyOrEvent.rawEvent
        : bodyOrEvent.events[0];

    const { source } = rawEvent;

    if (!session.type) {
      session.type = source.type;
    }

    if (source.type === 'group') {
      let user = null;

      if (source.userId) {
        user =
          this._skipLegacyProfile || !this._client
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
        if (this._client) {
          memberIds = await this._client.getAllGroupMemberIds(source.groupId);
        }
      } catch (err) {
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
        user =
          this._skipLegacyProfile || !this._client
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
        if (this._client) {
          memberIds = await this._client.getAllRoomMemberIds(source.roomId);
        }
      } catch (err) {
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
        const user =
          this._skipLegacyProfile || !this._client
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
    requestContext?: LineRequestContext;
    emitter?: EventEmitter | null;
  }): Promise<LineContext> {
    const { requestContext } = params;

    let client: LineClient;
    if (this._getConfig) {
      invariant(
        requestContext,
        'getConfig: `requestContext` is required to execute the function.'
      );

      const config = await this._getConfig({
        params: requestContext.params,
      });

      invariant(
        config.accessToken,
        'getConfig: `accessToken` is missing in the resolved value.'
      );

      invariant(
        config.channelSecret,
        'getConfig: `accessToken` is missing in the resolved value.'
      );

      client = new LineClient({
        accessToken: config.accessToken,
        channelSecret: config.channelSecret,
        origin: this._origin,
      });
    } else {
      client = this._client as LineClient;
    }

    return new LineContext({
      ...params,
      client,
      shouldBatch: this._shouldBatch,
      sendMethod: this._sendMethod,
    });
  }

  verifySignature(
    rawBody: string,
    signature: string,
    { channelSecret }: { channelSecret: string }
  ): boolean {
    const hashBufferFromBody = crypto
      .createHmac('sha256', channelSecret)
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

  async preprocess({
    method,
    headers,
    rawBody,
    body,
    params,
  }: LineRequestContext) {
    if (method.toLowerCase() !== 'post') {
      return {
        shouldNext: true,
      };
    }

    let channelSecret: string;
    if (this._getConfig) {
      const config = await this._getConfig({ params });

      invariant(
        config.channelSecret,
        'getConfig: `accessToken` is missing in the resolved value.'
      );

      channelSecret = config.channelSecret;
    } else {
      channelSecret = this._channelSecret as string;
    }

    if (
      !headers['x-line-signature'] ||
      !this.verifySignature(rawBody, headers['x-line-signature'], {
        channelSecret,
      })
    ) {
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

    if (this.isWebhookVerifyRequest(body)) {
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
