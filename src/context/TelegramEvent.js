/* @flow */

import type {
  TelegramUser,
  TelegramRequestBody,
} from '../bot/TelegramConnector';

import type { Event } from './Event';

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
};

export type TelegramRawEvent = TelegramRequestBody;

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

  get isTextMessage(): boolean {
    return this.isMessage && typeof (this.message: any).text === 'string';
  }
}
