import crypto from 'crypto';
import { EventEmitter } from 'events';

import invariant from 'ts-invariant';
import warning from 'warning';
import { Connector, RequestContext, Session } from '@bottender/core';
import { JsonObject } from 'type-fest';
import { SlackOAuthClient } from 'messaging-api-slack';
import { camelcaseKeysDeep } from 'messaging-api-common';

import SlackContext from './SlackContext';
import SlackEvent from './SlackEvent';
import {
  BlockActionEvent,
  CommandEvent,
  InteractiveMessageEvent,
  Message,
  SlackRawEvent,
  SlackRequestBody,
  UIEvent,
} from './SlackTypes';

type CommonConnectorOptions = {
  signingSecret?: string;
  includeBotMessages?: boolean;
};

type ConnectorOptionsWithoutClient = {
  accessToken: string;
  origin?: string;
} & CommonConnectorOptions;

type ConnectorOptionsWithClient = {
  client: SlackOAuthClient;
} & CommonConnectorOptions;

export type SlackConnectorOptions =
  | ConnectorOptionsWithoutClient
  | ConnectorOptionsWithClient;

export default class SlackConnector
  implements Connector<SlackRequestBody, SlackOAuthClient, SlackEvent>
{
  _client: SlackOAuthClient;

  _signingSecret: string;

  _includeBotMessages: boolean;

  constructor(options: SlackConnectorOptions) {
    const { includeBotMessages, signingSecret } = options;
    if ('client' in options) {
      this._client = options.client;
    } else {
      const { accessToken, origin } = options;

      invariant(
        accessToken,
        'Slack access token is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.'
      );

      this._client = new SlackOAuthClient({
        accessToken,
        origin,
      });
    }

    this._signingSecret = signingSecret ?? '';

    if (!this._signingSecret) {
      warning(
        false,
        '`signingSecret` is not set. Will bypass Slack event verification.\nPass in `signingSecret` to perform Slack event verification.'
      );
    }

    this._includeBotMessages = includeBotMessages ?? false;
  }

  _getRawEventFromRequest(body: SlackRequestBody): SlackRawEvent {
    if ('event' in body) {
      return body.event as Message;
    }

    if (body.payload && typeof body.payload === 'string') {
      const payload = camelcaseKeysDeep(JSON.parse(body.payload));

      if (payload.type === 'interactive_message') {
        return payload as InteractiveMessageEvent;
      }
      return payload as BlockActionEvent;
    }
    // for RTM WebSocket messages and Slash Command messages
    return body as any as Message;
  }

  _isBotEventRequest(body: SlackRequestBody): boolean {
    const rawEvent = this._getRawEventFromRequest(body);
    return !!(
      (rawEvent as Message).botId ||
      ('subtype' in rawEvent && rawEvent.subtype === 'bot_message')
    );
  }

  get platform(): 'slack' {
    return 'slack';
  }

  get client(): SlackOAuthClient {
    return this._client;
  }

  // FIXME: define types for every slack events
  _getChannelId(rawEvent: any): string | null {
    // For interactive_message format
    if (
      rawEvent.channel &&
      typeof rawEvent.channel === 'object' &&
      rawEvent.channel.id
    ) {
      return rawEvent.channel.id;
    }

    // For pin_added format
    if (rawEvent.channelId) {
      return rawEvent.channelId;
    }

    // For slack modal
    if (rawEvent.view && rawEvent.view.privateMetadata) {
      const channelId = JSON.parse(rawEvent.view.privateMetadata).channelId;
      if (channelId) {
        return channelId;
      }
    }

    // For reaction_added format
    if (
      rawEvent.item &&
      typeof rawEvent.item === 'object' &&
      typeof rawEvent.item.channel === 'string'
    ) {
      return rawEvent.item.channel;
    }

    return (
      (rawEvent as Message).channel ?? (rawEvent as CommandEvent).channelId
    );
  }

  _getUserId(rawEvent: SlackRawEvent): string | null {
    if (
      rawEvent.type === 'interactive_message' ||
      rawEvent.type === 'block_actions' ||
      rawEvent.type === 'view_submission' ||
      rawEvent.type === 'view_closed'
    ) {
      return (rawEvent as UIEvent).user.id;
    }
    return (
      (rawEvent as Message).user ||
      (rawEvent as CommandEvent).userId ||
      (rawEvent as UIEvent).user?.id
    );
  }

  getUniqueSessionKey(body: SlackRequestBody): string | null {
    const rawEvent = this._getRawEventFromRequest(body);
    return this._getChannelId(rawEvent) ?? this._getUserId(rawEvent);
  }

  async updateSession(
    session: Session<{
      user: {
        id: string;
        _updatedAt: string;
      };
      channel?: {
        id: string;
        _updatedAt: string;
      };
    }>,
    body: SlackRequestBody
  ): Promise<void> {
    if (this._isBotEventRequest(body)) {
      return;
    }

    const rawEvent = this._getRawEventFromRequest(body);
    const userId = this._getUserId(rawEvent);
    const channelId = this._getChannelId(rawEvent);

    if (
      typeof session.user === 'object' &&
      session.user &&
      session.user.id &&
      session.user.id === userId
    ) {
      return;
    }

    if (!userId) {
      return;
    }

    session.user = {
      id: userId,
      _updatedAt: new Date().toISOString(),
    };

    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });

    if (channelId) {
      session.channel = {
        id: channelId,
        _updatedAt: new Date().toISOString(),
      };

      Object.freeze(session.channel);
      Object.defineProperty(session, 'channel', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: session.channel,
      });
    }
  }

  mapRequestToEvents(body: SlackRequestBody): SlackEvent[] {
    const rawEvent = this._getRawEventFromRequest(body);

    if (!this._includeBotMessages && this._isBotEventRequest(body)) {
      return [];
    }

    return [new SlackEvent(rawEvent)];
  }

  createContext(params: {
    event: SlackEvent;
    session: Session | null;
    initialState?: JsonObject | null;
    requestContext?: RequestContext;
    emitter?: EventEmitter | null;
  }): SlackContext {
    return new SlackContext({
      ...params,
      client: this._client,
    });
  }

  verifySignatureBySigningSecret({
    rawBody,
    signature,
    timestamp,
  }: {
    rawBody: string;
    signature: string;
    timestamp: string;
  }): boolean {
    // ignore this request if the timestamp is 5 more minutes away from now
    const FIVE_MINUTES_IN_MILLISECONDS = 5 * 1000 * 60;

    if (
      Math.abs(Date.now() - Number(timestamp) * 1000) >
      FIVE_MINUTES_IN_MILLISECONDS
    ) {
      return false;
    }

    const SIGNATURE_VERSION = 'v0'; // currently it's always 'v0'
    const signatureBaseString = `${SIGNATURE_VERSION}:${timestamp}:${rawBody}`;

    const digest = crypto
      .createHmac('sha256', this._signingSecret)
      .update(signatureBaseString, 'utf8')
      .digest('hex');

    const calculatedSignature = `${SIGNATURE_VERSION}=${digest}`;

    return crypto.timingSafeEqual(
      Buffer.from(signature, 'utf8'),
      Buffer.from(calculatedSignature, 'utf8')
    );
  }

  preprocess({
    method,
    headers,
    body,
    rawBody,
  }: {
    method: string;
    headers: Record<string, string>;
    query: Record<string, string>;
    rawBody: string;
    body: Record<string, any>;
  }) {
    if (method.toLowerCase() !== 'post') {
      return {
        shouldNext: true,
      };
    }

    const timestamp = headers['x-slack-request-timestamp'];
    const signature = headers['x-slack-signature'];

    if (
      this._signingSecret &&
      !this.verifySignatureBySigningSecret({
        rawBody,
        timestamp,
        signature,
      })
    ) {
      const error = {
        message: 'Slack Signing Secret Validation Failed!',
        request: {
          body,
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

    if (body.type === 'url_verification') {
      return {
        shouldNext: false,
        response: {
          status: 200,
          body: body.challenge,
        },
      };
    }

    return {
      shouldNext: true,
    };
  }
}
