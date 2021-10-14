import { Event } from '@bottender/core';
import { TelegramTypes } from 'messaging-api-telegram';

import { TelegramRawEvent } from './TelegramTypes';

export default class TelegramEvent implements Event<TelegramRawEvent> {
  _rawEvent: TelegramRawEvent;

  _timestamp: number;

  constructor(rawEvent: TelegramRawEvent) {
    this._rawEvent = rawEvent;
    this._timestamp = Date.now();
  }

  /**
   * Underlying raw event from Telegram.
   *
   */
  get rawEvent(): TelegramRawEvent {
    return this._rawEvent;
  }

  /**
   * The timestamp when the event was sent
   *
   */
  get timestamp(): number | undefined {
    return 'message' in this.rawEvent && this.rawEvent.message
      ? this.rawEvent.message.date * 1000
      : this._timestamp;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage(): boolean {
    return !!this._rawEvent.message;
  }

  /**
   * The message object from Telegram raw event.
   *
   */
  get message(): TelegramTypes.Message | undefined {
    return this._rawEvent.message;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return this.isMessage && typeof (this.message as any).text === 'string';
  }

  /**
   * The text string from Telegram raw event.
   *
   */
  get text(): string | undefined {
    if (this.isText) {
      return (this.message as any).text;
    }
  }

  /**
   * Determine if the event which include reply to message.
   *
   */
  get isReplyToMessage(): boolean {
    if (!this.isMessage) return false;

    const message: TelegramTypes.Message = this.message as any;

    return (
      !!message.replyToMessage && typeof message.replyToMessage === 'object'
    );
  }

  /**
   * The Message object from Telegram raw event which includes replyToMessage.
   *
   */
  get replyToMessage(): TelegramTypes.Message | undefined {
    if (this.isReplyToMessage) {
      return (this.message as any).replyToMessage;
    }
  }

  /**
   * Determine if the event is a message event which includes audio.
   *
   */
  get isAudio(): boolean {
    if (!this.isMessage) return false;

    const message: TelegramTypes.Message = this.message as any;

    return !!message.audio && typeof message.audio === 'object';
  }

  /**
   * The audio object from Telegram raw event.
   *
   */
  get audio(): TelegramTypes.Audio | undefined {
    if (this.isAudio) {
      return (this.message as any).audio;
    }
  }

  /**
   * Determine if the event is a message event which includes document.
   *
   */
  get isDocument(): boolean {
    if (!this.isMessage) return false;

    const message: TelegramTypes.Message = this.message as any;

    return !!message.document && typeof message.document === 'object';
  }

  /**
   * The document object from Telegram raw event.
   *
   */
  get document(): TelegramTypes.Document | undefined {
    if (this.isDocument) {
      return (this.message as any).document;
    }
  }

  /**
   * Determine if the event is a message event which includes game.
   *
   */
  get isGame(): boolean {
    if (!this.isMessage) return false;

    const message: TelegramTypes.Message = this.message as any;

    return !!message.game && typeof message.game === 'object';
  }

  /**
   * The game object from Telegram raw event.
   *
   */
  get game(): TelegramTypes.Game | undefined {
    if (this.isGame) {
      return (this.message as any).game;
    }
  }

  /**
   * Determine if the event is a message event which includes photo.
   *
   */
  get isPhoto(): boolean {
    if (!this.isMessage) return false;

    const message: TelegramTypes.Message = this.message as any;

    return !!message.photo && message.photo.length > 0;
  }

  /**
   * The photo object from Telegram raw event.
   *
   */
  get photo(): TelegramTypes.PhotoSize | undefined {
    if (this.isPhoto) {
      return (this.message as any).photo;
    }
  }

  /**
   * Determine if the event is a message event which includes sticker.
   *
   */
  get isSticker(): boolean {
    if (!this.isMessage) return false;

    const message: TelegramTypes.Message = this.message as any;

    return !!message.sticker && typeof message.sticker === 'object';
  }

  /**
   * The sticker object from Telegram raw event.
   *
   */
  get sticker(): TelegramTypes.Sticker | undefined {
    if (this.isSticker) {
      return (this.message as any).sticker;
    }
  }

  /**
   * Determine if the event is a message event which includes video.
   *
   */
  get isVideo(): boolean {
    if (!this.isMessage) return false;

    const message: TelegramTypes.Message = this.message as any;
    return !!message.video && typeof message.video === 'object';
  }

  /**
   * The video object from Telegram raw event.
   *
   */
  get video(): TelegramTypes.Video | undefined {
    if (this.isVideo) {
      return (this.message as any).video;
    }
  }

  /**
   * Determine if the event is a message event which includes voice.
   *
   */
  get isVoice(): boolean {
    if (!this.isMessage) return false;

    const message: TelegramTypes.Message = this.message as any;

    return !!message.voice && typeof message.voice === 'object';
  }

  /**
   * The voice object from Telegram raw event.
   *
   */
  get voice(): TelegramTypes.Voice | undefined {
    if (this.isVoice) {
      return (this.message as any).voice;
    }
  }

  /**
   * Determine if the event is a message event which includes video note.
   *
   */
  get isVideoNote(): boolean {
    if (!this.isMessage) return false;

    const message: TelegramTypes.Message = this.message as any;

    return !!message.videoNote && typeof message.videoNote === 'object';
  }

  /**
   * The video note object from Telegram raw event.
   *
   */
  get videoNote(): TelegramTypes.VideoNote | undefined {
    if (this.isVideoNote) {
      return (this.message as any).videoNote;
    }
  }

  /**
   * Determine if the event is a message event which includes contact.
   *
   */
  get isContact(): boolean {
    if (!this.isMessage) return false;

    const message: TelegramTypes.Message = this.message as any;

    return !!message.contact && typeof message.contact === 'object';
  }

  /**
   * The contact object from Telegram raw event.
   *
   */
  get contact(): TelegramTypes.Contact | undefined {
    if (this.isContact) {
      return (this.message as any).contact;
    }
  }

  /**
   * Determine if the event is a message event which includes location.
   *
   */
  get isLocation(): boolean {
    if (!this.isMessage) return false;

    const message: TelegramTypes.Message = this.message as any;

    return !!message.location && typeof message.location === 'object';
  }

  /**
   * The location object from Telegram raw event.
   *
   */
  get location(): TelegramTypes.Location | undefined {
    if (this.isLocation) {
      return (this.message as any).location;
    }
  }

  /**
   * Determine if the event is a message event which includes venue.
   *
   */
  get isVenue(): boolean {
    if (!this.isMessage) return false;

    const message: TelegramTypes.Message = this.message as any;

    return !!message.venue && typeof message.venue === 'object';
  }

  /**
   * The venue object from Telegram raw event.
   *
   */
  get venue(): TelegramTypes.Venue | undefined {
    if (this.isVenue) {
      return (this.message as any).venue;
    }
  }

  /**
   * Determine if the event is an edited message event.
   *
   */
  get isEditedMessage(): boolean {
    return !!this.editedMessage && typeof this.editedMessage === 'object';
  }

  /**
   * The edited message from Telegram raw event.
   *
   */
  get editedMessage(): TelegramTypes.Message | undefined {
    return this._rawEvent.editedMessage;
  }

  /**
   * Determine if the event is a channel post event.
   *
   */
  get isChannelPost(): boolean {
    return !!this.channelPost && typeof this.channelPost === 'object';
  }

  /**
   * The channel post from Telegram raw event.
   *
   */
  get channelPost(): TelegramTypes.Message | undefined {
    return this._rawEvent.channelPost;
  }

  /**
   * Determine if the event is an edited channel post event.
   *
   */
  get isEditedChannelPost(): boolean {
    return (
      !!this.editedChannelPost && typeof this.editedChannelPost === 'object'
    );
  }

  /**
   * The edited channel post from Telegram raw event.
   *
   */
  get editedChannelPost(): TelegramTypes.Message | undefined {
    return this._rawEvent.editedChannelPost;
  }

  /**
   * Determine if the event is an inline query event.
   *
   */
  get isInlineQuery(): boolean {
    return !!this.inlineQuery && typeof this.inlineQuery === 'object';
  }

  /**
   * The inline query from Telegram raw event.
   *
   */
  get inlineQuery(): TelegramTypes.InlineQuery | undefined {
    return this._rawEvent.inlineQuery;
  }

  /**
   * Determine if the event is a chosen inline result event.
   *
   */
  get isChosenInlineResult(): boolean {
    return (
      !!this.chosenInlineResult && typeof this.chosenInlineResult === 'object'
    );
  }

  /**
   * The chosen inline result from Telegram raw event.
   *
   */
  get chosenInlineResult(): TelegramTypes.ChosenInlineResult | undefined {
    return this._rawEvent.chosenInlineResult;
  }

  /**
   * Determine if the event is a callback query event.
   *
   */
  get isCallbackQuery(): boolean {
    return !!this.callbackQuery && typeof this.callbackQuery === 'object';
  }

  /**
   * The callback query from Telegram raw event.
   *
   */
  get callbackQuery(): TelegramTypes.CallbackQuery | undefined {
    return this._rawEvent.callbackQuery;
  }

  /**
   * Determine if the event is a callback query event.
   *
   */
  get isPayload(): boolean {
    return this.isCallbackQuery;
  }

  /**
   * The payload string from Telegram raw event.
   *
   */
  get payload(): string | undefined {
    if (this.isPayload) {
      return (this.callbackQuery as any).data;
    }
  }

  /**
   * Determine if the event is a shipping query event.
   *
   */
  get isShippingQuery(): boolean {
    return !!this.shippingQuery && typeof this.shippingQuery === 'object';
  }

  /**
   * The shipping query from Telegram raw event.
   *
   */
  get shippingQuery(): TelegramTypes.ShippingQuery | undefined {
    return this._rawEvent.shippingQuery;
  }

  /**
   * Determine if the event is a pre checkout query event.
   *
   */
  get isPreCheckoutQuery(): boolean {
    return !!this.preCheckoutQuery && typeof this.preCheckoutQuery === 'object';
  }

  /**
   * The pre checkout query from Telegram raw event.
   *
   */
  get preCheckoutQuery(): TelegramTypes.PreCheckoutQuery | undefined {
    return this._rawEvent.preCheckoutQuery;
  }

  /**
   * Determine if the event is a poll event.
   *
   */
  get isPoll(): boolean {
    return !!this.poll && typeof this.poll === 'object';
  }

  /**
   * The poll from Telegram raw event.
   *
   */
  get poll(): TelegramTypes.Poll | undefined {
    return this._rawEvent.poll;
  }

  /**
   * Determine if the event is a pollAnswer event.
   *
   */
  get isPollAnswer(): boolean {
    return !!this.pollAnswer && typeof this.pollAnswer === 'object';
  }

  /**
   * The poll from Telegram raw event.
   *
   */
  get pollAnswer(): TelegramTypes.PollAnswer | undefined {
    return this._rawEvent.pollAnswer;
  }
}
