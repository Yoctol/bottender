/* @flow */

import type { Event } from './Event';

type Message = {
  text: string,
};

export type ConsoleRawEvent = {
  message?: Message,
  payload?: string,
};

export default class ConsoleEvent implements Event {
  _rawEvent: ConsoleRawEvent;

  constructor(rawEvent: ConsoleRawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from Console.
   *
   */
  get rawEvent(): ConsoleRawEvent {
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
   * The message object from Console raw event.
   *
   */
  get message(): ?Message {
    return this._rawEvent.message || null;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    if (this.isMessage) {
      return true;
    }
    return false;
  }

  /**
   * The text string from Console raw event.
   *
   */
  get text(): ?string {
    if (this.isText) {
      return ((this.message: any): Message).text;
    }
    return null;
  }

  /**
   * Determine if the event is a payload event.
   *
   */
  get isPayload(): boolean {
    return !!this._rawEvent.payload;
  }

  /**
   * The payload string from Console raw event.
   *
   */
  get payload(): ?string {
    return this._rawEvent.payload || null;
  }
}
