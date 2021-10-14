import { EventEmitter } from 'events';

import invariant from 'invariant';
import { Connector, Session } from '@bottender/core';
import { JsonObject } from 'type-fest';
import { TelegramClient } from 'messaging-api-telegram';

import TelegramContext from './TelegramContext';
import TelegramEvent from './TelegramEvent';
import {
  TelegramRawEvent,
  TelegramRequestBody,
  TelegramRequestContext,
} from './TelegramTypes';

type ConnectorOptionsWithoutClient = {
  accessToken: string;
  origin?: string;
};

type ConnectorOptionsWithClient = {
  client: TelegramClient;
};

export type TelegramConnectorOptions =
  | ConnectorOptionsWithoutClient
  | ConnectorOptionsWithClient;

export default class TelegramConnector
  implements Connector<TelegramRequestBody, TelegramClient>
{
  _client: TelegramClient;

  constructor(options: TelegramConnectorOptions) {
    if ('client' in options) {
      this._client = options.client;
    } else {
      const { accessToken, origin } = options;

      invariant(
        options.accessToken,
        'Telegram access token is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.'
      );

      this._client = new TelegramClient({
        accessToken,
        origin,
      });
    }
  }

  _getRawEventFromRequest(body: TelegramRequestBody): TelegramRawEvent {
    return body;
  }

  get platform(): 'telegram' {
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
    let channel;
    if (body.channelPost) {
      channel = body.channelPost.chat;
    } else if (body.editedChannelPost) {
      channel = body.editedChannelPost.chat;
    }

    if (channel) {
      session.channel = {
        id: channel.id,
      };

      session.channel._updatedAt = new Date().toISOString();
      Object.freeze(session.channel);
    }
    Object.defineProperty(session, 'channel', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.channel,
    });

    let group;
    if (body.message && body.message.chat.type === 'group') {
      group = body.message.chat;
    } else if (body.editedMessage && body.editedMessage.chat.type === 'group') {
      group = body.editedMessage.chat;
    } else if (
      body.callbackQuery &&
      body.callbackQuery.message &&
      body.callbackQuery.message.chat.type === 'group'
    ) {
      group = body.callbackQuery.message.chat;
    }
    if (group) {
      session.group = {
        id: group.id,
      };

      session.group._updatedAt = new Date().toISOString();
      Object.freeze(session.group);
    }
    Object.defineProperty(session, 'group', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.group,
    });

    let user;
    if (body.message) {
      user = body.message.from;
    } else if (body.editedMessage) {
      user = body.editedMessage.from;
    } else if (body.inlineQuery) {
      user = body.inlineQuery.from;
    } else if (body.chosenInlineResult) {
      user = body.chosenInlineResult.from;
    } else if (body.callbackQuery) {
      user = body.callbackQuery.from;
    } else if (body.shippingQuery) {
      user = body.shippingQuery.from;
    } else if (body.preCheckoutQuery) {
      user = body.preCheckoutQuery.from;
    }

    if (user) {
      session.user = {
        id: user.id,
      };

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
    session: Session<{ user: { id: number } }> | null;
    initialState?: JsonObject | null;
    requestContext?: TelegramRequestContext;
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
