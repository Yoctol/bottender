import EventEmitter from 'events';
import crypto from 'crypto';

import pProps from 'p-props';
import warning from 'warning';
import { SlackOAuthClient } from 'messaging-api-slack';

import Session from '../session/Session';
import SlackContext from '../context/SlackContext';
import SlackEvent, {
  BlockActionEvent,
  EventAPITypes,
  InteractiveMessageEvent,
  Message,
  SlackRawEvent,
} from '../context/SlackEvent';

import { Connector } from './Connector';

// FIXME
export type SlackUser = {
  id: string;
};

type EventsAPIBody = {
  token: string;
  team_id: string;
  api_app_id: string;
  type: EventAPITypes;
  event: Message;
  authed_users: string[];
  event_id: string;
  event_time: number;
};

export type SlackRequestBody = EventsAPIBody | { payload: string };

type CommonConstructorOptions = {
  skipProfile?: boolean | null;
  verificationToken?: string;
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

  _skipProfile: boolean;

  constructor(options: ConstructorOptions) {
    const { verificationToken, skipProfile } = options;
    if ('client' in options) {
      this._client = options.client;
    } else {
      const { accessToken, origin } = options;
      this._client = SlackOAuthClient.connect({
        accessToken,
        origin,
      });
    }

    this._verificationToken = verificationToken || '';

    // FIXME: maybe set this default value as true
    this._skipProfile = typeof skipProfile === 'boolean' ? skipProfile : false;

    if (!this._verificationToken) {
      warning(
        false,
        '`verificationToken` is not set. Will bypass Slack event verification.\nPass in `verificationToken` to perform Slack event verification.'
      );
    }
  }

  _getRawEventFromRequest(body: SlackRequestBody): SlackRawEvent {
    if ('event' in body) {
      return body.event as Message;
    }

    if (body.payload && typeof body.payload === 'string') {
      const payload = JSON.parse(body.payload);
      if (payload.type === 'interactive_message') {
        return payload as InteractiveMessageEvent;
      }
      return payload as BlockActionEvent;
    }

    // for RTM WebSocket messages
    return (body as any) as Message;
  }

  _isBotEventRequest(body: SlackRequestBody): boolean {
    const rawEvent = this._getRawEventFromRequest(body);
    return !!(
      rawEvent.bot_id ||
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
    if (rawEvent.channel_id) {
      return rawEvent.channel_id;
    }

    // For reaction_added format
    if (
      rawEvent.item &&
      typeof rawEvent.item === 'object' &&
      typeof rawEvent.item.channel === 'string'
    ) {
      return rawEvent.item.channel;
    }

    return (rawEvent as Message).channel;
  }

  async updateSession(session: Session, body: SlackRequestBody): Promise<void> {
    if (this._isBotEventRequest(body)) {
      return;
    }

    const rawEvent = this._getRawEventFromRequest(body);
    let userFromBody;
    if (
      rawEvent.type === 'interactive_message' ||
      rawEvent.type === 'block_actions'
    ) {
      userFromBody = rawEvent.user.id;
    } else {
      userFromBody = (rawEvent as Message).user;
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

    if (this._skipProfile) {
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

    if (this._isBotEventRequest(body)) {
      return []; // FIXME
    }

    return [new SlackEvent(rawEvent)];
  }

  createContext(params: {
    event: SlackEvent;
    session: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: Record<string, any> | null;
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

  preprocess({
    method,
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

    const token =
      !body.token && body.payload && typeof body.payload === 'string'
        ? JSON.parse(body.payload).token
        : body.token;

    if (!this.verifySignature(token)) {
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
