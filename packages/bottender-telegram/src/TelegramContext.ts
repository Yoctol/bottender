import warning from 'warning';
import { Context } from '@bottender/core';
import { TelegramClient } from 'messaging-api-telegram';

import TelegramEvent from './TelegramEvent';
import * as Type from './TelegramTypes';

class TelegramContext extends Context<
  TelegramClient,
  TelegramEvent,
  { user: { id: number } }
> {
  /**
   * The name of the platform.
   *
   */
  get platform(): 'telegram' {
    return 'telegram';
  }

  /**
   * Send text to the owner of then session.
   *
   */
  async sendText(
    text: string,
    options?: Type.SendMessageOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendText: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendMessage(chatId, text, options);
  }

  /**
   * Send text to the owner of then session.
   *
   */
  async sendMessage(
    text: string,
    options?: Type.SendMessageOption
  ): Promise<Type.Message | null> {
    return this.sendText(text, options);
  }

  _getChatId(): number | null {
    if (this.event.isMessage) {
      return (this.event.message as any).chat.id;
    }
    if (this.event.isEditedMessage) {
      return (this.event.editedMessage as any).chat.id;
    }
    if (this.event.isChannelPost) {
      return (this.event.channelPost as any).chat.id;
    }
    if (this.event.isEditedChannelPost) {
      return (this.event.editedChannelPost as any).chat.id;
    }
    if (this.event.isInlineQuery) {
      return (this.event.inlineQuery as any).from.id;
    }
    if (this.event.isChosenInlineResult) {
      return (this.event.chosenInlineResult as any).from.id;
    }
    if (
      this.event.isCallbackQuery &&
      (this.event.callbackQuery as any).message
    ) {
      return (this.event.callbackQuery as any).message.chat.id;
    }
    if (this.event.isShippingQuery) {
      return (this.event.shippingQuery as any).from.id;
    }
    if (this.event.isPreCheckoutQuery) {
      return (this.event.preCheckoutQuery as any).from.id;
    }
    if (this.session) {
      return this.session.user.id;
    }
    return null;
  }

  async answerShippingQuery(
    ok: boolean,
    options?: Type.AnswerShippingQueryOption
  ): Promise<boolean | null> {
    if (!this.event.isShippingQuery) {
      warning(
        false,
        'answerShippingQuery: should only be called to answer ShippingQuery event'
      );
      return null;
    }

    const shippingQueryId = (this.event.shippingQuery as any).id;

    return this.client.answerShippingQuery(shippingQueryId, ok, options);
  }

  async answerPreCheckoutQuery(
    ok: boolean,
    options?: Type.AnswerPreCheckoutQueryOption
  ): Promise<boolean | null> {
    if (!this.event.isPreCheckoutQuery) {
      warning(
        false,
        'answerPreCheckoutQuery: should only be called to answer PreCheckoutQuery event'
      );
      return null;
    }

    const preCheckoutQueryId = (this.event.preCheckoutQuery as any).id;

    return this.client.answerPreCheckoutQuery(preCheckoutQueryId, ok, options);
  }

  async answerInlineQuery(
    results: Type.InlineQueryResult[],
    options?: Type.AnswerInlineQueryOption
  ): Promise<boolean | null> {
    if (!this.event.isInlineQuery) {
      warning(
        false,
        'answerInlineQuery: should only be called to answer InlineQuery event'
      );
      return null;
    }

    const inlineQueryId = (this.event.inlineQuery as any).id;

    return this.client.answerInlineQuery(inlineQueryId, results, options);
  }

  async answerCallbackQuery(
    options: Type.AnswerCallbackQueryOption
  ): Promise<boolean | null> {
    if (!this.event.isCallbackQuery) {
      warning(
        false,
        'answerCallbackQuery: should only be called to answer CallbackQuery event'
      );
      return null;
    }

    const callbackQueryId = (this.event.callbackQuery as any).id;

    return this.client.answerCallbackQuery(callbackQueryId, options);
  }

  async getUserProfilePhotos(
    options?: Type.GetUserProfilePhotosOption
  ): Promise<Type.UserProfilePhotos | null> {
    if (!this.session) {
      warning(
        false,
        'getUserProfilePhotos: should not be called in context without session'
      );
      return null;
    }

    return this.client.getUserProfilePhotos(
      (this.session as any).user.id,
      options
    );
  }

  async getChat(): Promise<Type.Chat | null> {
    if (!this.session) {
      warning(
        false,
        'getChat: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(false, 'getChat: should not be called in context without chatId');
      return null;
    }

    return this.client.getChat(chatId);
  }

  async getChatAdministrators(): Promise<Type.ChatMember[] | null> {
    if (!this.session) {
      warning(
        false,
        'getChatAdministrators: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'getChatAdministrators: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.getChatAdministrators(chatId);
  }

  async getChatMembersCount(): Promise<number | null> {
    if (!this.session) {
      warning(
        false,
        'getChatMembersCount: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'getChatMembersCount: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.getChatMembersCount(chatId);
  }

  async getChatMember(userId: number): Promise<Type.ChatMember | null> {
    if (!this.session) {
      warning(
        false,
        'getChatMember: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'getChatMember: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.getChatMember(chatId, userId);
  }

  async getGameHighScores(
    options?: Type.GetGameHighScoresOption
  ): Promise<Type.GameHighScore[] | null> {
    if (!this.session) {
      warning(
        false,
        'getGameHighScores: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'getGameHighScores: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.getGameHighScores(chatId, options);
  }

  async editMessageText(
    messageId: number,
    text: string,
    options?: Type.EditMessageTextOption
  ): Promise<Type.Message | boolean | null> {
    if (!this.session) {
      warning(
        false,
        'editMessageText: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'editMessageText: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.editMessageText(text, {
      chatId,
      messageId,
      ...options,
    });
  }

  async editMessageCaption(
    messageId: number,
    caption: string,
    options?: Type.EditMessageCaptionOption
  ): Promise<Type.Message | boolean | null> {
    if (!this.session) {
      warning(
        false,
        'editMessageCaption: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'editMessageCaption: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.editMessageCaption(caption, {
      chatId,
      messageId,
      ...options,
    });
  }

  async editMessageMedia(
    messageId: number,
    media: Type.InputMedia,
    options?: Type.EditMessageMediaOption
  ): Promise<Type.Message | boolean | null> {
    if (!this.session) {
      warning(
        false,
        'editMessageMedia: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'editMessageMedia: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.editMessageMedia(media, {
      chatId,
      messageId,
      ...options,
    });
  }

  async editMessageReplyMarkup(
    messageId: number,
    replyMarkup: Type.InlineKeyboardMarkup,
    options?: Type.EditMessageReplyMarkupOption
  ): Promise<Type.Message | boolean | null> {
    if (!this.session) {
      warning(
        false,
        'editMessageReplyMarkup: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'editMessageReplyMarkup: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.editMessageReplyMarkup(replyMarkup, {
      chatId,
      messageId,
      ...options,
    });
  }

  async deleteMessage(messageId: number): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'deleteMessage: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'deleteMessage: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.deleteMessage(chatId, messageId);
  }

  async editMessageLiveLocation(
    messageId: number,
    location: Type.Location,
    options?: Type.EditMessageLiveLocationOption
  ): Promise<Type.Message | boolean | null> {
    if (!this.session) {
      warning(
        false,
        'editMessageLiveLocation: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'editMessageLiveLocation: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.editMessageLiveLocation(location, {
      chatId,
      messageId,
      ...options,
    });
  }

  async stopMessageLiveLocation(
    messageId: number,
    options?: Type.StopMessageLiveLocationOption
  ): Promise<Type.Message | boolean | null> {
    if (!this.session) {
      warning(
        false,
        'stopMessageLiveLocation: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'stopMessageLiveLocation: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.stopMessageLiveLocation({
      chatId,
      messageId,
      ...options,
    });
  }

  async forwardMessageFrom(
    fromChatId: string,
    messageId: number,
    options?: Type.ForwardMessageOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'forwardMessageFrom: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'forwardMessageFrom: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.forwardMessage(chatId, fromChatId, messageId, options);
  }

  async forwardMessageTo(
    toChatId: string,
    messageId: number,
    options?: Type.ForwardMessageOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'forwardMessageTo: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'forwardMessageTo: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.forwardMessage(toChatId, chatId, messageId, options);
  }

  // Send API
  async sendPhoto(
    photo: string,
    options?: Type.SendPhotoOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendPhoto: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendPhoto: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendPhoto(chatId, photo, options);
  }

  async sendAudio(
    audio: string,
    options?: Type.SendAudioOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendAudio: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendAudio: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendAudio(chatId, audio, options);
  }

  async sendDocument(
    document: string,
    options?: Type.SendDocumentOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendDocument: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendDocument: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendDocument(chatId, document, options);
  }

  async sendSticker(
    sticker: string,
    options?: Type.SendStickerOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendSticker: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendSticker: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendSticker(chatId, sticker, options);
  }

  async sendVideo(
    video: string,
    options?: Type.SendVideoOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendVideo: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendVideo: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendVideo(chatId, video, options);
  }

  async sendAnimation(
    animation: string,
    options?: Type.SendAnimationOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendAnimation: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendAnimation: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendAnimation(chatId, animation, options);
  }

  async sendVoice(
    voice: string,
    options?: Type.SendVoiceOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendVoice: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendVoice: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendVoice(chatId, voice, options);
  }

  async sendVideoNote(
    videoNote: string,
    options?: Type.SendVideoNoteOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendVideoNote: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendVideoNote: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendVideoNote(chatId, videoNote, options);
  }

  async sendMediaGroup(
    media: (Type.InputMediaPhoto | Type.InputMediaVideo)[],
    options?: Type.SendMediaGroupOption
  ): Promise<Type.Message[] | null> {
    if (!this.session) {
      warning(
        false,
        'sendMediaGroup: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendMediaGroup: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendMediaGroup(chatId, media, options);
  }

  async sendLocation(
    { latitude, longitude }: { latitude: number; longitude: number },
    options?: Type.SendLocationOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendLocation: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendLocation: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendLocation(chatId, { latitude, longitude }, options);
  }

  async sendVenue(
    venue: Type.Venue,
    options?: Type.SendVenueOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendVenue: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendVenue: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendVenue(chatId, venue, options);
  }

  async sendContact(
    requiredOptions: Type.SendContactRequiredOption,
    options?: Type.SendContactOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendContact: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendContact: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendContact(chatId, requiredOptions, options);
  }

  async sendPoll(
    question: string,
    options: string[],
    otherOptions?: Type.SendPollOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendPoll: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendPoll: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendPoll(chatId, question, options, otherOptions);
  }

  async sendChatAction(action: Type.ChatAction): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'sendChatAction: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendChatAction: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendChatAction(chatId, action);
  }

  // Group API
  async kickChatMember(
    userId: number,
    options?: Type.KickChatMemberOption
  ): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'kickChatMember: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'kickChatMember: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.kickChatMember(chatId, userId, options);
  }

  async unbanChatMember(userId: number): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'unbanChatMember: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'unbanChatMember: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.unbanChatMember(chatId, userId);
  }

  async restrictChatMember(
    userId: number,
    permissions: Type.ChatPermissions,
    options?: Type.RestrictChatMemberOption
  ): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'restrictChatMember: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'restrictChatMember: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.restrictChatMember(chatId, userId, permissions, options);
  }

  async promoteChatMember(
    userId: number,
    options?: Type.PromoteChatMemberOption
  ): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'promoteChatMember: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'promoteChatMember: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.promoteChatMember(chatId, userId, options);
  }

  async exportChatInviteLink(): Promise<string | null> {
    if (!this.session) {
      warning(
        false,
        'exportChatInviteLink: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'exportChatInviteLink: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.exportChatInviteLink(chatId);
  }

  // TODO: implement setChatPhoto

  async deleteChatPhoto(): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'deleteChatPhoto: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'deleteChatPhoto: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.deleteChatPhoto(chatId);
  }

  async setChatTitle(title: string): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'setChatTitle: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'setChatTitle: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.setChatTitle(chatId, title);
  }

  async setChatDescription(description: string): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'setChatDescription: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'setChatDescription: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.setChatDescription(chatId, description);
  }

  async setChatStickerSet(stickerSetName: string): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'setChatStickerSet: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'setChatStickerSet: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.setChatStickerSet(chatId, stickerSetName);
  }

  async deleteChatStickerSet(): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'deleteChatStickerSet: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'deleteChatStickerSet: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.deleteChatStickerSet(chatId);
  }

  async pinChatMessage(
    messageId: number,
    options?: Type.PinChatMessageOption
  ): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'pinChatMessage: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'pinChatMessage: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.pinChatMessage(chatId, messageId, options);
  }

  async unpinChatMessage(): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'unpinChatMessage: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'unpinChatMessage: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.unpinChatMessage(chatId);
  }

  async leaveChat(): Promise<boolean | null> {
    if (!this.session) {
      warning(
        false,
        'leaveChat: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'leaveChat: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.leaveChat(chatId);
  }

  // Payments API
  async sendInvoice(
    product: Type.Product,
    options?: Type.SendInvoiceOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendInvoice: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendInvoice: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendInvoice(chatId, product, options);
  }

  // Game API
  async sendGame(
    gameShortName: string,
    options?: Type.SendGameOption
  ): Promise<Type.Message | null> {
    if (!this.session) {
      warning(
        false,
        'sendGame: should not be called in context without session'
      );
      return null;
    }

    const chatId = this._getChatId();

    if (chatId === null) {
      warning(
        false,
        'sendGame: should not be called in context without chatId'
      );
      return null;
    }

    return this.client.sendGame(chatId, gameShortName, options);
  }

  async setGameScore(
    userId: number,
    score: number,
    options?: Type.SetGameScoreOption
  ): Promise<Type.Message | boolean | null> {
    if (!this.session) {
      warning(
        false,
        'setGameScore: should not be called in context without session'
      );
      return null;
    }

    return this.client.setGameScore(userId, score, options);
  }
}

export default TelegramContext;
