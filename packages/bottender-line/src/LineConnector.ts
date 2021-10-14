import crypto from 'crypto';
import { EventEmitter } from 'events';

import invariant from 'invariant';
import { Connector, RequestContext, Session } from '@bottender/core';
import { JsonObject } from 'type-fest';
import { LineClient } from 'messaging-api-line';

import LineContext from './LineContext';
import LineEvent from './LineEvent';
import { LineRawEvent, LineRequestBody, LineRequestContext } from './LineTypes';

type CommonConnectorOptions = {
  getConfig?: GetConfigFunction;
  getSessionKeyPrefix?: GetSessionKeyPrefixFunction;
  shouldBatch?: boolean;
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
  implements Connector<LineRequestBody, LineClient>
{
  _client: LineClient | undefined;

  _channelSecret: string | undefined;

  _origin: string | undefined;

  _getConfig: GetConfigFunction | undefined;

  _getSessionKeyPrefix: GetSessionKeyPrefixFunction | undefined;

  _shouldBatch: boolean;

  constructor(options: LineConnectorOptions) {
    const { getConfig, shouldBatch, getSessionKeyPrefix } = options;
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

    this._getSessionKeyPrefix = getSessionKeyPrefix;
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
      session.user = source.userId
        ? {
            id: source.userId,
            _updatedAt: new Date().toISOString(),
          }
        : null;

      session.group = {
        id: source.groupId,
        _updatedAt: new Date().toISOString(),
      };
    } else if (source.type === 'room') {
      session.user = source.userId
        ? {
            id: source.userId,
            _updatedAt: new Date().toISOString(),
          }
        : null;

      session.room = {
        id: source.roomId,
        _updatedAt: new Date().toISOString(),
      };
    } else if (source.type === 'user') {
      if (!session.user) {
        session.user = {
          id: source.userId,
          _updatedAt: new Date().toISOString(),
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
      .filter((event) => !this._isWebhookVerifyEvent(event))
      .map((event) => new LineEvent(event, { destination }));
  }

  async createContext(params: {
    event: LineEvent;
    session?: Session<
      | {
          type: 'user';
          user: { id: string };
        }
      | {
          type: 'group';
          user?: { id: string };
          group: { id: string };
        }
      | {
          type: 'room';
          user?: { id: string };
          room: { id: string };
        }
    > | null;
    initialState?: JsonObject | null;
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
