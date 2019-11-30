import EventEmitter from 'events';

import { TelegramClient } from 'messaging-api-telegram';

import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';

import TelegramContext from './TelegramContext';
import TelegramEvent, { TelegramRawEvent } from './TelegramEvent';

export type TelegramRequestBody = TelegramRawEvent;

type ConstructorOptionsWithoutClient = {
  accessToken: string;
  origin?: string;
};

type ConstructorOptionsWithClient = {
  client: TelegramClient;
};

type ConstructorOptions =
  | ConstructorOptionsWithoutClient
  | ConstructorOptionsWithClient;

export default class TelegramConnector
  implements Connector<TelegramRequestBody, TelegramClient> {
  _client: TelegramClient;

  constructor(options: ConstructorOptions) {
    if ('client' in options) {
      this._client = options.client;
    } else {
      const { accessToken, origin } = options;

      this._client = TelegramClient.connect({
        accessToken,
        origin,
      });
    }
  }

  _getRawEventFromRequest(body: TelegramRequestBody): TelegramRawEvent {
    return body;
  }

  get platform(): string {
    return 'telegram';
  }

  get client(): TelegramClient {
    return this._client;
  }

  getUniqueSessionKey(body: TelegramRequestBody): string {
    if (body.message) {
      return `${body.message.chat.id}`;
    }
    if (body.editedMessage) {
      return `${body.editedMessage.chat.id}`;
    }
    if (body.channelPost) {
      return `${body.channelPost.chat.id}`;
    }
    if (body.editedChannelPost) {
      return `${body.editedChannelPost.chat.id}`;
    }
    if (body.inlineQuery) {
      return `${body.inlineQuery.from.id}`;
    }
    if (body.chosenInlineResult) {
      return `${body.chosenInlineResult.from.id}`;
    }
    if (body.callbackQuery) {
      if (body.callbackQuery.message) {
        return `${body.callbackQuery.message.chat.id}`;
      }
      return `${body.callbackQuery.from.id}`;
    }
    if (body.shippingQuery) {
      return `${body.shippingQuery.from.id}`;
    }
    if (body.preCheckoutQuery) {
      return `${body.preCheckoutQuery.from.id}`;
    }
    return '';
  }

  async updateSession(
    session: Session,
    body: TelegramRequestBody
  ): Promise<void> {
    if (body.channelPost) {
      session.channel = body.channelPost.chat;
    } else if (body.editedChannelPost) {
      session.channel = body.editedChannelPost.chat;
    }
    if (session.channel) {
      session.channel._updatedAt = new Date().toISOString();
      Object.freeze(session.channel);
    }
    Object.defineProperty(session, 'channel', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.channel,
    });

    if (body.message && body.message.chat.type === 'group') {
      session.group = body.message.chat;
    } else if (body.editedMessage && body.editedMessage.chat.type === 'group') {
      session.group = body.editedMessage.chat;
    } else if (
      body.callbackQuery &&
      body.callbackQuery.message &&
      body.callbackQuery.message.chat.type === 'group'
    ) {
      session.group = body.callbackQuery.message.chat;
    }
    if (session.group) {
      session.group._updatedAt = new Date().toISOString();
      Object.freeze(session.group);
    }
    Object.defineProperty(session, 'group', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.group,
    });

    if (body.message) {
      session.user = body.message.from;
    } else if (body.editedMessage) {
      session.user = body.editedMessage.from;
    } else if (body.inlineQuery) {
      session.user = body.inlineQuery.from;
    } else if (body.chosenInlineResult) {
      session.user = body.chosenInlineResult.from;
    } else if (body.callbackQuery) {
      session.user = body.callbackQuery.from;
    } else if (body.shippingQuery) {
      session.user = body.shippingQuery.from;
    } else if (body.preCheckoutQuery) {
      session.user = body.preCheckoutQuery.from;
    }

    if (session.user) {
      session.user._updatedAt = new Date().toISOString();
      Object.freeze(session.user);
    }
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  }

  mapRequestToEvents(body: TelegramRequestBody): TelegramEvent[] {
    const rawEvent = this._getRawEventFromRequest(body);
    return [new TelegramEvent(rawEvent)];
  }

  createContext(params: {
    event: TelegramEvent;
    session: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: RequestContext;
    emitter?: EventEmitter | null;
  }): TelegramContext {
    return new TelegramContext({
      ...params,
      client: this._client,
    });
  }

  preprocess(): {
    shouldNext: true;
  } {
    return {
      shouldNext: true,
    };
  }
}
