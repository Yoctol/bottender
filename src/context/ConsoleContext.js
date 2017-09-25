/* @flow */
import sleep from 'delay';

import type { ConsoleSession, ConsoleClient } from '../bot/ConsoleConnector';

import Context from './Context';
import ConsoleEvent from './ConsoleEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: ConsoleClient,
  event: ConsoleEvent,
  session: ?ConsoleSession,
|};

export default class ConsoleContext extends Context implements PlatformContext {
  _client: ConsoleClient;
  _event: ConsoleEvent;
  _session: ?ConsoleSession;

  constructor({ client, event, session }: Options) {
    super({ client, event, session });
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'console';
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
  sendText(text: string): void {
    setTimeout(() => {
      this._client.sendText(text);
    }, this._messageDelay);
  }

  sendTextWithDelay(delay: number, text: string): void {
    setTimeout(() => {
      this._client.sendText(text);
    }, delay);
  }
}
