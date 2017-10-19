/* @flow */
import sleep from 'delay';

import type { ConsoleClient } from '../bot/ConsoleConnector';
import type { Session } from '../session/Session';

import Context from './Context';
import ConsoleEvent from './ConsoleEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: ConsoleClient,
  event: ConsoleEvent,
  session: ?Session,
  initialState: ?Object,
|};

export default class ConsoleContext extends Context implements PlatformContext {
  _client: ConsoleClient;
  _event: ConsoleEvent;
  _session: ?Session;

  constructor({ client, event, session, initialState }: Options) {
    super({ client, event, session, initialState });
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
    if (milliseconds > 0) {
      await sleep(milliseconds);
    }
  }

  /**
   * Send text to the owner of then session.
   *
   */
  async sendText(text: string): Promise<void> {
    this._isHandled = true;
    this._client.sendText(text);
  }
}
