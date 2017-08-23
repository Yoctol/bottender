/* @flow */

import type { ConsoleSession } from '../bot/ConsoleConnector';

import { type Context } from './Context';
import ConsoleEvent from './ConsoleEvent';

type Options = {
  event: ConsoleEvent,
  session: ?ConsoleSession,
};

export default class ConsoleContext implements Context {
  _event: ConsoleEvent;
  _session: ?ConsoleSession;

  constructor({ event, session }: Options) {
    this._event = event;
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

  get platform(): string {
    return 'console';
  }

  get event(): ConsoleEvent {
    return this._event;
  }

  get session(): ?ConsoleSession {
    return this._session;
  }
}
