/* @flow */
import sleep from 'delay';

import type { ConsoleSession, ConsoleClient } from '../bot/ConsoleConnector';

import { type Context } from './Context';
import ConsoleEvent from './ConsoleEvent';

type Options = {|
  client: ConsoleClient,
  event: ConsoleEvent,
  session: ?ConsoleSession,
|};

export default class ConsoleContext implements Context {
  _client: ConsoleClient;
  _event: ConsoleEvent;
  _session: ?ConsoleSession;
  _messageDelay: number = 0;

  constructor({ client, event, session }: Options) {
    this._client = client;
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
   * The client instance.
   *
   */
  get client(): ConsoleClient {
    return this._client;
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
  setMessageDelay(milliseconds: number): void {
    this._messageDelay = milliseconds;
  }

  /**
   * Delay and show indicators for milliseconds.
   *
   */
  async typing(milliseconds: number): Promise<void> {
    await sleep(milliseconds);
  }

  /**
   * Send text to the owner of then session.
   *
   */
  async sendText(text: string): Promise<void> {
    await this.typing(this._messageDelay);
    this._client.sendText(text);
  }

  async sendTextWithDelay(delay: number, text: string): Promise<void> {
    await this.typing(delay);
    this._client.sendText(text);
  }

  _sendText(text: string): void {
    process.stdout.write(`Bot > ${text}\nYou > `);
  }
}
