import crypto from 'crypto';
import { EventEmitter } from 'events';

import invariant from 'invariant';
import pProps from 'p-props';
import warning from 'warning';
import { SlackOAuthClient } from 'messaging-api-slack';
import { camelcaseKeysDeep } from 'messaging-api-common';

import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';

import SlackContext from './SlackContext';
import SlackEvent, {
  BlockActionEvent,
  CommandEvent,
  EventTypes,
  InteractiveMessageEvent,
  Message,
  SlackRawEvent,
  UIEvent,
} from './SlackEvent';
// FIXME
export type SlackUser = {
  id: string;
};

type EventsAPIBody = {
  token: string;
  teamId: string;
  apiAppId: string;
  type: EventTypes;
  event: Message;
  authedUsers: string[];
  eventId: string;
  eventTime: number;
};

export type SlackRequestBody = EventsAPIBody | { payload: string };

type CommonConstructorOptions = {
  skipLegacyProfile?: boolean;
  verificationToken?: string;
  signingSecret?: string;
  includeBotMessages?: boolean;
};

type ConstructorOptionsWithoutClient = {
  accessToken: string;
  origin?: string;
} & CommonConstructorOptions;

type ConstructorOptionsWithClient = {
  client: SlackOAuthClient;
} & CommonConstructorOptions;

type ConstructorOptions =
  | ConstructorOptionsWithoutClient
  | ConstructorOptionsWithClient;

export default class SlackConnector
  implements Connector<SlackRequestBody, SlackOAuthClient> {
  _client: SlackOAuthClient;

  _verificationToken: string;

  _signingSecret: string;

  _skipLegacyProfile: boolean;

  _includeBotMessages: boolean;

  constructor(options: ConstructorOptions) {
    const {
      verificationToken,
      skipLegacyProfile,
      includeBotMessages,
      signingSecret,
    } = options;
    if ('client' in options) {
      this._client = options.client;
    } else {
      const { accessToken, origin } = options;

      invariant(
        accessToken,
        'Slack access token is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.'
      );

      this._client = SlackOAuthClient.connect({
        accessToken,
        origin,
      });
    }

    this._signingSecret = signingSecret || '';
    this._verificationToken = verificationToken || '';

    if (!this._signingSecret) {
      if (!this._verificationToken) {
        warning(
          false,
          'Both `signingSecret` and `verificationToken` is not set. Will bypass Slack event verification.\nPass in `signingSecret` to perform Slack event verification.'
        );
      } else {
        warning(
          false,
          "It's deprecated to use `verificationToken` here, use `signingSecret` instead."
        );
      }
    }

    this._skipLegacyProfile =
      typeof skipLegacyProfile === 'boolean' ? skipLegacyProfile : true;

    this._includeBotMessages = includeBotMessages || false;
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
    return (body as any) as Message;
  }

  _isBotEventRequest(body: SlackRequestBody): boolean {
    const rawEvent = this._getRawEventFromRequest(body);
    return !!(
      (rawEvent as Message).botId ||
      ('subtype' in rawEvent && rawEvent.subtype === 'bot_message')
    );
  }

  get platform(): string {
    return 'slack';
  }

  get client(): SlackOAuthClient {
    return this._client;
  }

  getUniqueSessionKey(body: SlackRequestBody): string {
    // FIXME: define types for every slack events
    const rawEvent = this._getRawEventFromRequest(body) as any;

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
      return JSON.parse(rawEvent.view.privateMetadata).channelId;
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
      (rawEvent as Message).channel || (rawEvent as CommandEvent).channelId
    );
  }

  async updateSession(session: Session, body: SlackRequestBody): Promise<void> {
    if (this._isBotEventRequest(body)) {
      return;
    }

    const rawEvent = this._getRawEventFromRequest(body);
    let userFromBody;
    if (
      rawEvent.type === 'interactive_message' ||
      rawEvent.type === 'block_actions' ||
      rawEvent.type === 'view_submission' ||
      rawEvent.type === 'view_closed'
    ) {
      userFromBody = (rawEvent as UIEvent).user.id;
    } else {
      userFromBody =
        (rawEvent as Message).user || (rawEvent as CommandEvent).userId;
    }

    if (
      typeof session.user === 'object' &&
      session.user &&
      session.user.id &&
      session.user.id === userFromBody
    ) {
      return;
    }
    const channelId = this.getUniqueSessionKey(body);
    const senderId = userFromBody;

    if (!senderId) {
      return;
    }

    if (this._skipLegacyProfile) {
      session.user = {
        id: senderId,
        _updatedAt: new Date().toISOString(),
      };

      session.channel = {
        id: channelId,
        _updatedAt: new Date().toISOString(),
      };

      Object.freeze(session.user);
      Object.defineProperty(session, 'user', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: session.user,
      });

      Object.freeze(session.channel);
      Object.defineProperty(session, 'channel', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: session.channel,
      });

      return;
    }

    const promises: Record<string, any> = {
      sender: this._client.getUserInfo(senderId),
    };

    // TODO: check join or leave events?
    if (
      !session.channel ||
      (session.channel.members &&
        Array.isArray(session.channel.members) &&
        session.channel.members.indexOf(senderId) < 0)
    ) {
      promises.channel = this._client.getConversationInfo(channelId);
      promises.channelMembers = this._client.getAllConversationMembers(
        channelId
      );
    }

    // TODO: how to know if user leave team?
    // TODO: team info shared by all channels?
    if (
      !session.team ||
      (session.team.members &&
        Array.isArray(session.team.members) &&
        session.team.members.indexOf(senderId) < 0)
    ) {
      promises.allUsers = this._client.getAllUserList();
    }

    const results = await pProps(promises);

    // FIXME: refine user
    session.user = {
      id: senderId,
      _updatedAt: new Date().toISOString(),
      ...results.sender,
    };
    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });

    if (promises.channel) {
      session.channel = {
        ...results.channel,
        members: results.channelMembers,
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

    if (promises.allUsers) {
      session.team = {
        members: results.allUsers,
        _updatedAt: new Date().toISOString(),
      };

      Object.freeze(session.team);
      Object.defineProperty(session, 'team', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: session.team,
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
    initialState?: Record<string, any> | null;
    requestContext?: RequestContext;
    emitter?: EventEmitter | null;
  }): SlackContext {
    return new SlackContext({
      ...params,
      client: this._client,
    });
  }

  verifySignature(tokenFromBody: string): boolean {
    const bufferFromBot = Buffer.from(this._verificationToken);
    const bufferFromBody = Buffer.from(tokenFromBody);

    // return early here if buffer lengths are not equal since timingSafeEqual
    // will throw if buffer lengths are not equal
    if (bufferFromBot.length !== bufferFromBody.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufferFromBot, bufferFromBody);
  }

  verifySignatureBySigningSecret({
    rawBody,
    signature,
    timestamp,
  }: {
    rawBody: string;
    signature: string;
    timestamp: number;
  }): boolean {
    // ignore this request if the timestamp is 5 more minutes away from now
    const FIVE_MINUTES_IN_MILLISECONDS = 5 * 1000 * 60;

    if (
      Math.abs(Date.now() - timestamp * 1000) > FIVE_MINUTES_IN_MILLISECONDS
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

    const token =
      !body.token && body.payload && typeof body.payload === 'string'
        ? JSON.parse(body.payload).token
        : body.token;

    if (this._verificationToken && !this.verifySignature(token)) {
      const error = {
        message: 'Slack Verification Token Validation Failed!',
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
