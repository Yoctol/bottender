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
  fallbackMethods: boolean,
|};

export default class ConsoleContext extends Context implements PlatformContext {
  _client: ConsoleClient;
  _event: ConsoleEvent;
  _session: ?Session;

  constructor({
    client,
    event,
    session,
    initialState,
    fallbackMethods,
  }: Options) {
    super({ client, event, session, initialState });
    if (fallbackMethods) {
      // $FlowExpectedError
      return new Proxy(this, {
        get(target, key) {
          if (target[key]) {
            return target[key];
          }
          // should return undefined when check if it is a promise
          if (key === 'then') return;
          return async (...args) => {
            await target._methodMissing(key, args);
          };
        },
      });
    }
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

  async _methodMissing(method: string, args: Array<any>): Promise<void> {
    this._isHandled = true;
    this._client.sendText(`${method}: ${JSON.stringify(args)}`);
  }
}
