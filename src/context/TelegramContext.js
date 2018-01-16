/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { TelegramClient } from 'messaging-api-telegram';

import type { Session } from '../session/Session';

import Context from './Context';
import TelegramEvent from './TelegramEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: TelegramClient,
  event: TelegramEvent,
  session: ?Session,
  initialState: ?Object,
|};

class TelegramContext extends Context implements PlatformContext {
  _client: TelegramClient;
  _event: TelegramEvent;
  _session: ?Session;

  constructor({ client, event, session, initialState }: Options) {
    super({ client, event, session, initialState });
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
  async sendText(text: string, options?: {}): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendMessage(chatId, text, options);
  }

  _getChatId() {
    if (this._event.isMessage) {
      return (this._event.message: any).chat.id;
    }
    if (this._event.isEditedMessage) {
      return (this._event.editedMessage: any).chat.id;
    }
    if (this._event.isChannelPost) {
      return (this._event.channelPost: any).chat.id;
    }
    if (this._event.isEditedChannelPost) {
      return (this._event.editedChannelPost: any).chat.id;
    }
    if (this._event.isInlineQuery) {
      return (this._event.inlineQuery: any).from.id;
    }
    if (this._event.isChosenInlineResult) {
      return (this._event.chosenInlineResult: any).from.id;
    }
    if (
      this._event.isCallbackQuery &&
      (this._event.callbackQuery: any).message
    ) {
      return (this._event.callbackQuery: any).message.chat.id;
    }
    if (this._event.isShippingQuery) {
      return (this._event.shippingQuery: any).from.id;
    }
    if (this._event.isPreCheckoutQuery) {
      return (this._event.preCheckoutQuery: any).from.id;
    }
    if (this._session) {
      return this._session.user.id;
    }
    return null;
  }
}

const sendMethods = [
  // Send API
  'sendMessage',
  'sendPhoto',
  'sendAudio',
  'sendDocument',
  'sendSticker',
  'sendVideo',
  'sendVoice',
  'sendVideoNote',
  'sendMediaGroup',
  'sendLocation',
  'sendVenue',
  'sendContact',
  'sendChatAction',

  // Payments API
  'sendInvoice',

  // Game API
  'sendGame',
  'setGameScore',
  'getGameHighScores',
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

      this._isHandled = true;

      const chatId = this._getChatId();

      return this._client[method](chatId, ...args);
    },
  });
});

export default TelegramContext;
