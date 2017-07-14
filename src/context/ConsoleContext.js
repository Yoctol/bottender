/* @flow */

import type { ConsoleSession } from '../bot/ConsoleConnector';

import { type Context } from './Context';
import ConsoleEvent, { type ConsoleRawEvent } from './ConsoleEvent';

type Options = {
  rawEvent: ConsoleRawEvent,
  session: ConsoleSession,
};

export default class ConsoleContext implements Context {
  _event: ConsoleEvent;
  _session: ConsoleSession;

  constructor({ rawEvent, session }: Options) {
    this._event = new ConsoleEvent(rawEvent);
    this._session = session;
  }

  sendText(text: string): void {
    process.stdout.write(`Bot > ${text}\nYou > `);
  }

  sendTextWithDelay(delay: number, text: string): void {
    setTimeout(() => {
      this.sendText(text);
    }, delay);
  }

  get event(): ConsoleEvent {
    return this._event;
  }

  get session(): ConsoleSession {
    return this._session;
  }
}
