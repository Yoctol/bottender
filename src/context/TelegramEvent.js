/* @flow */

import type { TelegramUser } from '../bot/TelegramConnector';

import type { Event } from './Event';

type PhotoSize = Array<{
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

type VoiceNote = {
  file_id: string,
  length: number,
  duration: number,
};

type Contact = {
  phone_number: string,
  first_name: string,
};

type Location = {
  longitude: number,
  latitude: number,
};

type Venue = {
  location: Location,
  title: string,
  address: string,
};

type File = {
  file_id: string,
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
  entitiess: Array<{
    type: 'bot_command',
    offset: number,
    length: number,
  }>,
  photo?: PhotoSize,
  audio?: Audio,
  document?: Document,
  sticker?: Sticker,
  video?: Video,
  voice?: Voice,
  voice_note?: VoiceNote,
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

  get rawEvent(): TelegramRawEvent {
    return this._rawEvent;
  }

  get isMessage(): boolean {
    return !!this._rawEvent.message;
  }

  get message(): ?Message {
    return this._rawEvent.message;
  }

  get callbackQuery(): ?CallbackQuery {
    return this._rawEvent.callback_query;
  }

  get isTextMessage(): boolean {
    return this.isMessage && typeof (this.message: any).text === 'string';
  }

  get isAudioMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.audio && typeof message.audio === 'object';
  }

  get isDocumentMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.document && typeof message.document === 'object';
  }

  get isGameMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.game && typeof message.game === 'object';
  }

  get isPhoteMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.photo && message.photo.length > 0;
  }

  get isStickerMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.sticker && typeof message.sticker === 'object';
  }

  get isVideoMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);
    return !!message.video && typeof message.video === 'object';
  }

  get isVoiceMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.voice && typeof message.voice === 'object';
  }

  get isVideoNoteMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.video_note && typeof message.video_note === 'object';
  }

  get isContactMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.contact && typeof message.contact === 'object';
  }

  get isLocationMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.location && typeof message.location === 'object';
  }

  get isVenueMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.venue && typeof message.venue === 'object';
  }

  get isCallbackQuery(): boolean {
    if (this.isMessage) return false;

    return !!this.callbackQuery && typeof this.callbackQuery === 'object';
  }
}
