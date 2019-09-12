import { Event } from './Event';

type Message = {
  text: string;
};

export type ConsoleRawEvent = {
  message?: Message;
  payload?: string;
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
  get message(): Message | null {
    return this._rawEvent.message || null;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return this.isMessage;
  }

  /**
   * The text string from Console raw event.
   *
   */
  get text(): string | null {
    if (this.message) {
      return this.message.text;
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
  get payload(): string | null {
    return this._rawEvent.payload || null;
  }
}
