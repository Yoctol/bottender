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

  // Send API
  async sendMessage(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendMessage: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendMessage(chatId, ...args);
  }

  async sendPhoto(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendPhoto: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendPhoto(chatId, ...args);
  }

  async sendAudio(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendAudio: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendAudio(chatId, ...args);
  }

  async sendDocument(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendDocument: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendDocument(chatId, ...args);
  }

  async sendSticker(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendSticker: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendSticker(chatId, ...args);
  }

  async sendVideo(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendVideo: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendVideo(chatId, ...args);
  }

  async sendVoice(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendVoice: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendVoice(chatId, ...args);
  }

  async sendVideoNote(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendVideoNote: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendVideoNote(chatId, ...args);
  }

  async sendMediaGroup(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendMediaGroup: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendMediaGroup(chatId, ...args);
  }

  async sendLocation(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendLocation: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendLocation(chatId, ...args);
  }

  async sendVenue(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendVenue: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendVenue(chatId, ...args);
  }

  async sendContact(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendContact: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendContact(chatId, ...args);
  }

  async sendChatAction(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendChatAction: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendChatAction(chatId, ...args);
  }

  // Group API
  async kickChatMember(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'kickChatMember: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.kickChatMember(chatId, ...args);
  }

  async unbanChatMember(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'unbanChatMember: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.unbanChatMember(chatId, ...args);
  }

  async restrictChatMember(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'restrictChatMember: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.restrictChatMember(chatId, ...args);
  }

  async promoteChatMember(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'promoteChatMember: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.promoteChatMember(chatId, ...args);
  }

  async exportChatInviteLink(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'exportChatInviteLink: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.exportChatInviteLink(chatId, ...args);
  }

  // TODO: implement setChatPhoto

  async deleteChatPhoto(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'deleteChatPhoto: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.deleteChatPhoto(chatId, ...args);
  }

  async setChatTitle(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'setChatTitle: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.setChatTitle(chatId, ...args);
  }

  async setChatDescription(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'setChatDescription: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.setChatDescription(chatId, ...args);
  }

  async setChatStickerSet(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'setChatStickerSet: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.setChatStickerSet(chatId, ...args);
  }

  async deleteChatStickerSet(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'deleteChatStickerSet: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.deleteChatStickerSet(chatId, ...args);
  }

  async pinChatMessage(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'pinChatMessage: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.pinChatMessage(chatId, ...args);
  }

  async unpinChatMessage(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'unpinChatMessage: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.unpinChatMessage(chatId, ...args);
  }

  async leaveChat(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'leaveChat: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.leaveChat(chatId, ...args);
  }

  // Payments API
  async sendInvoice(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendInvoice: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendInvoice(chatId, ...args);
  }

  // Game API
  async sendGame(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'sendGame: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.sendGame(chatId, ...args);
  }

  async setGameScore(...args: any[]) {
    if (!this._session) {
      warning(
        false,
        'setGameScore: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const chatId = this._getChatId();

    return this._client.setGameScore(chatId, ...args);
  }
}

export default TelegramContext;
