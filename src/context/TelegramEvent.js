/* @flow */

import type { TelegramUser } from '../bot/TelegramConnector';

import type { Event } from './Event';

type Photo = Array<{
  file_id: string,
  width: number,
  height: number,
}>;

type Audio = {
  file_id: string,
  width: number,
  height: number,
};

type Document = {
  file_id: string,
};

type Sticker = {
  file_id: string,
  width: number,
  height: number,
};

type Video = {
  file_id: string,
  width: number,
  height: number,
  duration: number,
};

type Voice = {
  file_id: string,
  duration: number,
};

type VideoNote = {
  file_id: string,
  length: number,
  duration: number,
};

type Contact = {
  phone_number: string,
  first_name: string,
};

type Location = {|
  longitude: number,
  latitude: number,
|};

type Venue = {
  location: Location,
  title: string,
  address: string,
};

type File = {
  file_id: string,
};

type Game = {
  title: string,
  description: string,
  photo: Array<{
    file_id: string,
    width: number,
    height: number,
  }>,
};

type Message = {
  message_id: number,
  from: TelegramUser,
  chat: {
    id: number,
    first_name: string,
    last_name: string,
    type: 'private',
  },
  date: number,
  text: string,
  entities: Array<{
    type: 'bot_command',
    offset: number,
    length: number,
  }>,
  photo?: Photo,
  game?: Game,
  audio?: Audio,
  document?: Document,
  sticker?: Sticker,
  video?: Video,
  voice?: Voice,
  video_note?: VideoNote,
  contact?: Contact,
  location?: Location,
  venue?: Venue,
  file?: File,
};

type CallbackQuery = {
  from: TelegramUser,
  message: Message,
  chat_instance: string,
  data: string,
};

export type TelegramRawEvent = {
  update_id: number,
  message?: Message,
  callback_query?: CallbackQuery,
};

export default class TelegramEvent implements Event {
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
  get message(): ?Message {
    return this._rawEvent.message;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return this.isMessage && typeof (this.message: any).text === 'string';
  }

  /**
   * Determine if the event is a message event which includes audio.
   *
   */
  get isAudio(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.audio && typeof message.audio === 'object';
  }

  /**
   * The audio object from Telegram raw event.
   *
   */
  get audio(): ?Audio {
    if (this.isAudio) {
      return (this.message: any).audio;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes document.
   *
   */
  get isDocument(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.document && typeof message.document === 'object';
  }

  /**
   * The document object from Telegram raw event.
   *
   */
  get document(): ?Document {
    if (this.isDocument) {
      return (this.message: any).document;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes game.
   *
   */
  get isGame(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.game && typeof message.game === 'object';
  }

  /**
   * The game object from Telegram raw event.
   *
   */
  get game(): ?Game {
    if (this.isGame) {
      return (this.message: any).game;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes photo.
   *
   */
  get isPhoto(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.photo && message.photo.length > 0;
  }

  /**
   * The photo object from Telegram raw event.
   *
   */
  get photo(): ?Photo {
    if (this.isPhoto) {
      return (this.message: any).photo;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes sticker.
   *
   */
  get isSticker(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.sticker && typeof message.sticker === 'object';
  }

  /**
   * The sticker object from Telegram raw event.
   *
   */
  get sticker(): ?Sticker {
    if (this.isSticker) {
      return (this.message: any).sticker;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes video.
   *
   */
  get isVideo(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);
    return !!message.video && typeof message.video === 'object';
  }

  /**
   * The video object from Telegram raw event.
   *
   */
  get video(): ?Video {
    if (this.isVideo) {
      return (this.message: any).video;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes voice.
   *
   */
  get isVoice(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.voice && typeof message.voice === 'object';
  }

  /**
   * The voice object from Telegram raw event.
   *
   */
  get voice(): ?Voice {
    if (this.isVoice) {
      return (this.message: any).voice;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes video note.
   *
   */
  get isVideoNote(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.video_note && typeof message.video_note === 'object';
  }

  /**
   * The video note object from Telegram raw event.
   *
   */
  get videoNote(): ?VideoNote {
    if (this.isVideoNote) {
      return (this.message: any).video_note;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes contact.
   *
   */
  get isContact(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.contact && typeof message.contact === 'object';
  }

  /**
   * The contact object from Telegram raw event.
   *
   */
  get contact(): ?Contact {
    if (this.isContact) {
      return (this.message: any).contact;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes location.
   *
   */
  get isLocation(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.location && typeof message.location === 'object';
  }

  /**
   * The location object from Telegram raw event.
   *
   */
  get location(): ?Location {
    if (this.isLocation) {
      return (this.message: any).location;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes venue.
   *
   */
  get isVenue(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.venue && typeof message.venue === 'object';
  }

  /**
   * The venue object from Telegram raw event.
   *
   */
  get venue(): ?Venue {
    if (this.isVenue) {
      return (this.message: any).venue;
    }
    return null;
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
  get callbackQuery(): ?CallbackQuery {
    return this._rawEvent.callback_query;
  }
}
