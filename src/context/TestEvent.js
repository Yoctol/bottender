/* @flow */

import type { Event } from './Event';

type Message = {
  text: string,
};

export type TestRawEvent = {
  message?: Message,
  payload?: string,
};

export default class TestEvent implements Event {
  _rawEvent: TestRawEvent;

  constructor(rawEvent: TestRawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from Test.
   *
   */
  get rawEvent(): TestRawEvent {
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
   * The message object from Test raw event.
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
   * The text string from Test raw event.
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
   * The payload string from Test raw event.
   *
   */
  get payload(): ?string {
    return this._rawEvent.payload || null;
  }
}
