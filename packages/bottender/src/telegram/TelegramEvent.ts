import { TelegramTypes } from 'messaging-api-telegram';

import { Event } from '../context/Event';

import { TelegramRawEvent } from './TelegramTypes';

export default class TelegramEvent implements Event<TelegramRawEvent> {
  _rawEvent: TelegramRawEvent;

  constructor(rawEvent: TelegramRawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from Telegram.
   *
   */
  get rawEvent(): TelegramRawEvent {
    return this._rawEvent;
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
  get message(): TelegramTypes.Message | null {
    return this._rawEvent.message || null;
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
  get text(): string | null {
    if (this.isText) {
      return (this.message as any).text;
    }
    return null;
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
  get replyToMessage(): TelegramTypes.Message | null {
    if (this.isReplyToMessage) {
      return (this.message as any).replyToMessage;
    }
    return null;
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
  get audio(): TelegramTypes.Audio | null {
    if (this.isAudio) {
      return (this.message as any).audio;
    }
    return null;
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
  get document(): TelegramTypes.Document | null {
    if (this.isDocument) {
      return (this.message as any).document;
    }
    return null;
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
  get game(): TelegramTypes.Game | null {
    if (this.isGame) {
      return (this.message as any).game;
    }
    return null;
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
  get photo(): TelegramTypes.PhotoSize | null {
    if (this.isPhoto) {
      return (this.message as any).photo;
    }
    return null;
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
  get sticker(): TelegramTypes.Sticker | null {
    if (this.isSticker) {
      return (this.message as any).sticker;
    }
    return null;
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
  get video(): TelegramTypes.Video | null {
    if (this.isVideo) {
      return (this.message as any).video;
    }
    return null;
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
  get voice(): TelegramTypes.Voice | null {
    if (this.isVoice) {
      return (this.message as any).voice;
    }
    return null;
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
  get videoNote(): TelegramTypes.VideoNote | null {
    if (this.isVideoNote) {
      return (this.message as any).videoNote;
    }
    return null;
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
  get contact(): TelegramTypes.Contact | null {
    if (this.isContact) {
      return (this.message as any).contact;
    }
    return null;
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
  get location(): TelegramTypes.Location | null {
    if (this.isLocation) {
      return (this.message as any).location;
    }
    return null;
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
  get venue(): TelegramTypes.Venue | null {
    if (this.isVenue) {
      return (this.message as any).venue;
    }
    return null;
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
  get editedMessage(): TelegramTypes.Message | null {
    return this._rawEvent.editedMessage || null;
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
  get channelPost(): TelegramTypes.Message | null {
    return this._rawEvent.channelPost || null;
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
  get editedChannelPost(): TelegramTypes.Message | null {
    return this._rawEvent.editedChannelPost || null;
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
  get inlineQuery(): TelegramTypes.InlineQuery | null {
    return this._rawEvent.inlineQuery || null;
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
  get chosenInlineResult(): TelegramTypes.ChosenInlineResult | null {
    return this._rawEvent.chosenInlineResult || null;
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
  get callbackQuery(): TelegramTypes.CallbackQuery | null {
    return this._rawEvent.callbackQuery || null;
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
  get payload(): string | null {
    if (this.isPayload) {
      return (this.callbackQuery as any).data;
    }
    return null;
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
  get shippingQuery(): TelegramTypes.ShippingQuery | null {
    return this._rawEvent.shippingQuery || null;
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
  get preCheckoutQuery(): TelegramTypes.PreCheckoutQuery | null {
    return this._rawEvent.preCheckoutQuery || null;
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
  get poll(): TelegramTypes.Poll | null {
    return this._rawEvent.poll || null;
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
  get pollAnswer(): TelegramTypes.PollAnswer | null {
    return this._rawEvent.pollAnswer || null;
  }
}
