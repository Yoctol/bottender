/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { TelegramClient } from 'messaging-api-telegram';

import type { TelegramSession } from '../bot/TelegramConnector';

import type { Context } from './Context';
import TelegramEvent from './TelegramEvent';

type Options = {
  client: TelegramClient,
  event: TelegramEvent,
  session: ?TelegramSession,
};

class TelegramContext implements Context {
  _client: TelegramClient;
  _event: TelegramEvent;
  _session: ?TelegramSession;
  _messageDelay: number = 1000;

  constructor({ client, event, session }: Options) {
    this._client = client;
    this._event = event;
    this._session = session;
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'telegram';
  }

  /**
   * The event instance.
   *
   */
  get event(): TelegramEvent {
    return this._event;
  }

  /**
   * The session state of the context.
   *
   */
  get session(): ?TelegramSession {
    return this._session;
  }

  /**
   * Set delay before sending every messages.
   *
   */
  setMessageDelay(milliseconds: number): void {
    this._messageDelay = milliseconds;
  }

  /**
   * Delay and show indicators for milliseconds.
   *
   */
  async typing(milliseconds: number): Promise<void> {
    await sleep(milliseconds);
  }

  /**
   * Send text to the owner of then session.
   *
   */
  async sendText(text: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }
    await this.typing(this._messageDelay);
    return this._client.sendMessage(this._session.user.id, text);
  }

  async sendTextWithDelay(delay: number, text: string): Promise<any> {
    warning(false, `sendTextWithDelay is deprecated.`);

    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }
    await this.typing(delay);
    return this._client.sendMessage(this._session.user.id, text);
  }
}

const sendMethods = [
  'sendMessage',
  'sendPhoto',
  'sendAudio',
  'sendDocument',
  'sendSticker',
  'sendVideo',
  'sendVoice',
  // 'sendVideoNote',
  'sendLocation',
  'sendVenue',
  'sendContact',
  'sendChatAction',
];

sendMethods.forEach(method => {
  Object.defineProperty(TelegramContext.prototype, `${method}`, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(...args) {
      if (!this._session) {
        warning(
          false,
          `${method}: should not be called in context without session`
        );
        return;
      }
      await this.typing(this._messageDelay);
      return this._client[method](this._session.user.id, ...args);
    },
  });

  Object.defineProperty(TelegramContext.prototype, `${method}To`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(id, ...rest) {
      return this._client[method](id, ...rest);
    },
  });

  Object.defineProperty(TelegramContext.prototype, `${method}WithDelay`, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(delay, ...rest) {
      if (!this._session) {
        warning(
          false,
          `${method}WithDelay: should not be called in context without session`
        );
        return;
      }

      await this.typing(delay);
      return this._client[method](this._session.user.id, ...rest);
    },
  });
});

export default TelegramContext;
