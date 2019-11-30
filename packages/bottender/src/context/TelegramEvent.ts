import { Event } from './Event';

type TelegramUser = {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
};

type Photo = {
  fileId: string;
  width: number;
  height: number;
}[];

type Audio = {
  fileId: string;
  width: number;
  height: number;
};

type Document = {
  fileId: string;
};

type Sticker = {
  fileId: string;
  width: number;
  height: number;
};

type Video = {
  fileId: string;
  width: number;
  height: number;
  duration: number;
};

type Voice = {
  fileId: string;
  duration: number;
};

type VideoNote = {
  fileId: string;
  length: number;
  duration: number;
};

type Contact = {
  phoneNumber: string;
  firstName: string;
};

type Location = {
  longitude: number;
  latitude: number;
};

type Venue = {
  location: Location;
  title: string;
  address: string;
};

type File = {
  fileId: string;
};

type Game = {
  title: string;
  description: string;
  photo: {
    fileId: string;
    width: number;
    height: number;
  }[];
};

type Message = {
  messageId: number;
  from: TelegramUser;
  chat: {
    id: number;
    firstName: string;
    lastName: string;
    type: 'private' | 'group';
  };
  date: number;
  text: string;
  entities: {
    type: 'bot_command';
    offset: number;
    length: number;
  }[];
  replyToMessage?: Message;
  photo?: Photo;
  game?: Game;
  audio?: Audio;
  document?: Document;
  sticker?: Sticker;
  video?: Video;
  voice?: Voice;
  videoNote?: VideoNote;
  contact?: Contact;
  location?: Location;
  venue?: Venue;
  file?: File;
};

type InlineQuery = {
  id: string;
  from: TelegramUser;
  location?: Location;
  query: string;
  offset: string;
};

type ChosenInlineResult = {
  resultId: string;
  from: TelegramUser;
  location?: Location;
  inlineMessageId?: string;
  query: string;
};

type CallbackQuery = {
  from: TelegramUser;
  message: Message;
  chatInstance: string;
  data: string;
};

type ShippingAddress = {
  countryCode: string;
  state: string;
  city: string;
  streetLine1: string;
  streetLine2: string;
  postCode: string;
};

type ShippingQuery = {
  id: string;
  from: TelegramUser;
  invoicePayload: string;
  shippingAddress: ShippingAddress;
};

type OrderInfo = {
  name?: string;
  phoneNumber?: string;
  email?: string;
  shippingAddress?: ShippingAddress;
};

type PreCheckoutQuery = {
  id: string;
  from: TelegramUser;
  currency: string;
  totalAmount: number;
  invoicePayload: string;
  shippingOptionId?: string;
  orderInfo?: OrderInfo;
};

export type TelegramRawEvent = {
  updateId: number;
  message?: Message;
  editedMessage?: Message;
  channelPost?: Message;
  editedChannelPost?: Message;
  inlineQuery?: InlineQuery;
  chosenInlineResult?: ChosenInlineResult;
  callbackQuery?: CallbackQuery;
  shippingQuery?: ShippingQuery;
  preCheckoutQuery?: PreCheckoutQuery;
};

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
  get message(): Message | null {
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

    const message: Message = this.message as any;

    return (
      !!message.replyToMessage && typeof message.replyToMessage === 'object'
    );
  }

  /**
   * The Message object from Telegram raw event which includes replyToMessage.
   *
   */
  get replyToMessage(): Message | null {
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

    const message: Message = this.message as any;

    return !!message.audio && typeof message.audio === 'object';
  }

  /**
   * The audio object from Telegram raw event.
   *
   */
  get audio(): Audio | null {
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

    const message: Message = this.message as any;

    return !!message.document && typeof message.document === 'object';
  }

  /**
   * The document object from Telegram raw event.
   *
   */
  get document(): Document | null {
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

    const message: Message = this.message as any;

    return !!message.game && typeof message.game === 'object';
  }

  /**
   * The game object from Telegram raw event.
   *
   */
  get game(): Game | null {
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

    const message: Message = this.message as any;

    return !!message.photo && message.photo.length > 0;
  }

  /**
   * The photo object from Telegram raw event.
   *
   */
  get photo(): Photo | null {
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

    const message: Message = this.message as any;

    return !!message.sticker && typeof message.sticker === 'object';
  }

  /**
   * The sticker object from Telegram raw event.
   *
   */
  get sticker(): Sticker | null {
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

    const message: Message = this.message as any;
    return !!message.video && typeof message.video === 'object';
  }

  /**
   * The video object from Telegram raw event.
   *
   */
  get video(): Video | null {
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

    const message: Message = this.message as any;

    return !!message.voice && typeof message.voice === 'object';
  }

  /**
   * The voice object from Telegram raw event.
   *
   */
  get voice(): Voice | null {
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

    const message: Message = this.message as any;

    return !!message.videoNote && typeof message.videoNote === 'object';
  }

  /**
   * The video note object from Telegram raw event.
   *
   */
  get videoNote(): VideoNote | null {
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

    const message: Message = this.message as any;

    return !!message.contact && typeof message.contact === 'object';
  }

  /**
   * The contact object from Telegram raw event.
   *
   */
  get contact(): Contact | null {
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

    const message: Message = this.message as any;

    return !!message.location && typeof message.location === 'object';
  }

  /**
   * The location object from Telegram raw event.
   *
   */
  get location(): Location | null {
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

    const message: Message = this.message as any;

    return !!message.venue && typeof message.venue === 'object';
  }

  /**
   * The venue object from Telegram raw event.
   *
   */
  get venue(): Venue | null {
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
  get editedMessage(): Message | null {
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
  get channelPost(): Message | null {
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
  get editedChannelPost(): Message | null {
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
  get inlineQuery(): InlineQuery | null {
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
  get chosenInlineResult(): ChosenInlineResult | null {
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
  get callbackQuery(): CallbackQuery | null {
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
  get shippingQuery(): ShippingQuery | null {
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
  get preCheckoutQuery(): PreCheckoutQuery | null {
    return this._rawEvent.preCheckoutQuery || null;
  }
}
