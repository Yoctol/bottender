/* @flow */

import type { Event } from './Event';

type Message = {
  text: string,
};

export type ConsoleRawEvent = {
  message: Message,
};

export default class ConsoleEvent implements Event {
  _rawEvent: ConsoleRawEvent;

  constructor(rawEvent: ConsoleRawEvent) {
    this._rawEvent = rawEvent;
  }

  get rawEvent(): ConsoleRawEvent {
    return this._rawEvent;
  }

  get isMessage(): boolean {
    return true;
  }

  get message(): Message {
    return this._rawEvent.message;
  }

  get isTextMessage(): boolean {
    return true;
  }
}
