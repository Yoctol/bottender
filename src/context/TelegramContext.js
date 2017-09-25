/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { TelegramClient } from 'messaging-api-telegram';

import type { TelegramSession } from '../bot/TelegramConnector';

import Context from './Context';
import TelegramEvent from './TelegramEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: TelegramClient,
  event: TelegramEvent,
  session: ?TelegramSession,
|};

class TelegramContext extends Context implements PlatformContext {
  _client: TelegramClient;
  _event: TelegramEvent;
  _session: ?TelegramSession;

  constructor({ client, event, session }: Options) {
    super({ client, event, session });
    this.setMessageDelay(1000);
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'telegram';
  }

  /**
   * Delay and show indicators for milliseconds.
   *
   */
  async typing(milliseconds: number): Promise<void> {
    if (milliseconds > 0) {
      await sleep(milliseconds);
    }
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
    const session = this._session;
    await this.typing(this._messageDelay);
    return this._client.sendMessage(session.user.id, text);
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
    const session = this._session;
    await this.typing(delay);
    return this._client.sendMessage(session.user.id, text);
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
