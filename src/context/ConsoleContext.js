/* @flow */
import sleep from 'delay';

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
  _messageDelay: number = 0;

  constructor({ event, session }: Options) {
    this._event = event;
    this._session = session;
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'console';
  }

  /**
   * The event instance.
   *
   */
  get event(): ConsoleEvent {
    return this._event;
  }

  /**
   * The session state of the context.
   *
   */
  get session(): ?ConsoleSession {
    return this._session;
  }

  /**
   * Set delay before sending every messages.
   *
   */
  setMessageDelay(seconds: number): void {
    this._messageDelay = seconds;
  }

  /**
   * Delay and show indicators for seconds.
   *
   */
  async typing(seconds: number): Promise<void> {
    await sleep(seconds);
  }

  /**
   * Send text to the owner of then session.
   *
   */
  sendText(text: string): void {
    setTimeout(() => {
      process.stdout.write(`Bot > ${text}\nYou > `);
    }, this._messageDelay);
  }

  sendTextWithDelay(delay: number, text: string): void {
    setTimeout(() => {
      this.sendText(text);
    }, delay);
  }
}
