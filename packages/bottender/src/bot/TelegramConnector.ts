import EventEmitter from 'events';

import { TelegramClient } from 'messaging-api-telegram';

import Session from '../session/Session';
import TelegramContext from '../context/TelegramContext';
import TelegramEvent, { TelegramRawEvent } from '../context/TelegramEvent';

import { Connector } from './Connector';

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
    if (body.edited_message) {
      return `${body.edited_message.chat.id}`;
    }
    if (body.channel_post) {
      return `${body.channel_post.chat.id}`;
    }
    if (body.edited_channel_post) {
      return `${body.edited_channel_post.chat.id}`;
    }
    if (body.inline_query) {
      return `${body.inline_query.from.id}`;
    }
    if (body.chosen_inline_result) {
      return `${body.chosen_inline_result.from.id}`;
    }
    if (body.callback_query) {
      if (body.callback_query.message) {
        return `${body.callback_query.message.chat.id}`;
      }
      return `${body.callback_query.from.id}`;
    }
    if (body.shipping_query) {
      return `${body.shipping_query.from.id}`;
    }
    if (body.pre_checkout_query) {
      return `${body.pre_checkout_query.from.id}`;
    }
    return '';
  }

  async updateSession(
    session: Session,
    body: TelegramRequestBody
  ): Promise<void> {
    if (body.channel_post) {
      session.channel = body.channel_post.chat;
    } else if (body.edited_channel_post) {
      session.channel = body.edited_channel_post.chat;
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
    } else if (
      body.edited_message &&
      body.edited_message.chat.type === 'group'
    ) {
      session.group = body.edited_message.chat;
    } else if (
      body.callback_query &&
      body.callback_query.message &&
      body.callback_query.message.chat.type === 'group'
    ) {
      session.group = body.callback_query.message.chat;
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
    } else if (body.edited_message) {
      session.user = body.edited_message.from;
    } else if (body.inline_query) {
      session.user = body.inline_query.from;
    } else if (body.chosen_inline_result) {
      session.user = body.chosen_inline_result.from;
    } else if (body.callback_query) {
      session.user = body.callback_query.from;
    } else if (body.shipping_query) {
      session.user = body.shipping_query.from;
    } else if (body.pre_checkout_query) {
      session.user = body.pre_checkout_query.from;
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

  mapRequestToEvents(body: TelegramRequestBody): Array<TelegramEvent> {
    const rawEvent = this._getRawEventFromRequest(body);
    return [new TelegramEvent(rawEvent)];
  }

  createContext(params: {
    event: TelegramEvent;
    session: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: Record<string, any> | null;
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
