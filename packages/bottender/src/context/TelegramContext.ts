import sleep from 'delay';
import warning from 'warning';
import { TelegramClient, TelegramTypes } from 'messaging-api-telegram';

import Session from '../session/Session';

import Context from './Context';
import TelegramEvent from './TelegramEvent';
import { PlatformContext } from './PlatformContext';

class TelegramContext extends Context implements PlatformContext {
  _client: TelegramClient = this._client;

  _event: TelegramEvent = this._event;

  _session: Session | null = this._session;

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
      return (this._event.message as any).chat.id;
    }
    if (this._event.isEditedMessage) {
      return (this._event.editedMessage as any).chat.id;
    }
    if (this._event.isChannelPost) {
      return (this._event.channelPost as any).chat.id;
    }
    if (this._event.isEditedChannelPost) {
      return (this._event.editedChannelPost as any).chat.id;
    }
    if (this._event.isInlineQuery) {
      return (this._event.inlineQuery as any).from.id;
    }
    if (this._event.isChosenInlineResult) {
      return (this._event.chosenInlineResult as any).from.id;
    }
    if (
      this._event.isCallbackQuery &&
      (this._event.callbackQuery as any).message
    ) {
      return (this._event.callbackQuery as any).message.chat.id;
    }
    if (this._event.isShippingQuery) {
      return (this._event.shippingQuery as any).from.id;
    }
    if (this._event.isPreCheckoutQuery) {
      return (this._event.preCheckoutQuery as any).from.id;
    }
    if (this._session) {
      return this._session.user.id;
    }
    return null;
  }

  async answerShippingQuery(ok: boolean, options?: {}) {
    if (!this._event.isShippingQuery) {
      warning(
        false,
        'answerShippingQuery: should only be called to answer ShippingQuery event'
      );
      return;
    }

    this._isHandled = true;

    const shippingQueryId = (this._event.shippingQuery as any).id;

    return this._client.answerShippingQuery(shippingQueryId, ok, options);
  }

  async answerPreCheckoutQuery(ok: boolean, options?: {}) {
    if (!this._event.isPreCheckoutQuery) {
      warning(
        false,
        'answerPreCheckoutQuery: should only be called to answer PreCheckoutQuery event'
      );
      return;
    }

    this._isHandled = true;

    const preCheckoutQueryId = (this._event.preCheckoutQuery as any).id;

    return this._client.answerPreCheckoutQuery(preCheckoutQueryId, ok, options);
  }

  async answerInlineQuery(results: Record<string, any>[], options?: {}) {
    if (!this._event.isInlineQuery) {
      warning(
        false,
        'answerInlineQuery: should only be called to answer InlineQuery event'
      );
      return;
    }

    this._isHandled = true;

    const inlineQueryId = (this._event.inlineQuery as any).id;

    return this._client.answerInlineQuery(inlineQueryId, results, options);
  }

  async getUserProfilePhotos(options?: Record<string, any>) {
    if (!this._session) {
      warning(
        false,
        'getUserProfilePhotos: should not be called in context without session'
      );
      return null;
    }

    return this._client.getUserProfilePhotos(
      (this.session as any).user.id,
      options
    );
  }

  async getChat() {
    if (!this._session) {
      warning(
        false,
        'getChat: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    return this._client.getChat(chatId);
  }

  async getChatAdministrators() {
    if (!this._session) {
      warning(
        false,
        'getChatAdministrators: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    return this._client.getChatAdministrators(chatId);
  }

  async getChatMembersCount() {
    if (!this._session) {
      warning(
        false,
        'getChatMembersCount: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    return this._client.getChatMembersCount(chatId);
  }

  async getChatMember(userId: number) {
    if (!this._session) {
      warning(
        false,
        'getChatMember: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    return this._client.getChatMember(chatId, userId as any);
  }

  async getGameHighScores(options?: Record<string, any>) {
    if (!this._session) {
      warning(
        false,
        'getGameHighScores: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    return this._client.getGameHighScores(chatId, options);
  }

  async editMessageText(text: string, options?: Record<string, any>) {
    if (!this._session) {
      warning(
        false,
        'editMessageText: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.editMessageText(text, { chat_id: chatId, ...options });
  }

  async editMessageCaption(caption: string, options?: Record<string, any>) {
    if (!this._session) {
      warning(
        false,
        'editMessageCaption: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.editMessageCaption(caption, {
      chat_id: chatId,
      ...options,
    });
  }

  async editMessageReplyMarkup(
    replyMarkup: Record<string, any>,
    options?: Record<string, any>
  ) {
    if (!this._session) {
      warning(
        false,
        'editMessageReplyMarkup: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.editMessageReplyMarkup(replyMarkup, {
      chat_id: chatId,
      ...options,
    });
  }

  async deleteMessage(messageId: number) {
    if (!this._session) {
      warning(
        false,
        'deleteMessage: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.deleteMessage(chatId, messageId as any);
  }

  async editMessageLiveLocation(
    location: { latitude: number; longitude: number },
    options: { messageId: number } & {
      replyMarkup?: TelegramTypes.InlineKeyboardMarkup;
    }
  ) {
    if (!this._session) {
      warning(
        false,
        'editMessageLiveLocation: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.editMessageLiveLocation(location, {
      chatId,
      ...options,
    });
  }

  async stopMessageLiveLocation(
    options: { messageId: number } & {
      replyMarkup?: TelegramTypes.InlineKeyboardMarkup;
    }
  ) {
    if (!this._session) {
      warning(
        false,
        'stopMessageLiveLocation: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.stopMessageLiveLocation({
      chatId,
      ...options,
    });
  }

  async forwardMessageFrom(
    fromChatId: string,
    messageId: number,
    options?: Record<string, any>
  ) {
    if (!this._session) {
      warning(
        false,
        'forwardMessageFrom: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.forwardMessage(
      chatId,
      fromChatId,
      messageId as any,
      options
    );
  }

  async forwardMessageTo(
    toChatId: string,
    messageId: number,
    options?: Record<string, any>
  ) {
    if (!this._session) {
      warning(
        false,
        'forwardMessageTo: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.forwardMessage(
      toChatId,
      chatId,
      messageId as any,
      options
    );
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

  // Group API
  'kickChatMember',
  'unbanChatMember',
  'restrictChatMember',
  'promoteChatMember',
  'exportChatInviteLink',
  // TODO: implement setChatPhoto
  'deleteChatPhoto',
  'setChatTitle',
  'setChatDescription',
  'setChatStickerSet',
  'deleteChatStickerSet',
  'pinChatMessage',
  'unpinChatMessage',
  'leaveChat',

  // Payments API
  'sendInvoice',

  // Game API
  'sendGame',
  'setGameScore',
];

sendMethods.forEach(method => {
  Object.defineProperty(TelegramContext.prototype, `${method}`, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(...args: any[]) {
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
