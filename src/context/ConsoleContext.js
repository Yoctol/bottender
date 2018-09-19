/* @flow */
import sleep from 'delay';

import { type Session } from '../session/Session';

import ConsoleEvent from './ConsoleEvent';
import Context from './Context';
import { type ConsoleClient } from './ConsoleClient';
import { type PlatformContext } from './PlatformContext';

type Options = {|
  client: ConsoleClient,
  event: ConsoleEvent,
  session: ?Session,
  initialState: ?Object,
  requestContext: ?Object,
  fallbackMethods: boolean,
  mockPlatform: string,
|};

const methodBlackList = [
  'inspect', // console
  'then', // promise
  'handlerDidEnd', // context lifecycle
];

export default class ConsoleContext extends Context implements PlatformContext {
  _client: ConsoleClient = this._client;

  _event: ConsoleEvent = this._event;

  _session: ?Session = this._session;

  _fallbackMethods: boolean = false;

  _mockPlatform: string = 'console';

  constructor({
    client,
    event,
    session,
    initialState,
    requestContext,
    fallbackMethods,
    mockPlatform,
  }: Options) {
    super({ client, event, session, initialState, requestContext });
    this._mockPlatform = mockPlatform;
    this._fallbackMethods = fallbackMethods;
    if (fallbackMethods) {
      // $FlowExpectedError
      return new Proxy(this, {
        get(target, key) {
          // https://github.com/facebook/flow/issues/6181
          // https://github.com/facebook/flow/issues/6321
          // $FlowFixMe: Cannot get `target[key]` because an indexer property is missing in `ConsoleContext` [1].
          if (typeof target[key] !== 'undefined') {
            // $FlowFixMe: Cannot get `target[key]` because an indexer property is missing in `ConsoleContext` [1].
            return target[key];
          }

          if (methodBlackList.includes(key)) return;
          // $FlowIssue: Support `typeof x === "symbol"` - https://github.com/facebook/flow/issues/1015
          if (typeof key === 'symbol') return; // any symbol should not be method missing

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
    return this._mockPlatform || 'console';
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
  async sendText(text: string, ...args: Array<any>): Promise<void> {
    this._isHandled = true;
    if (args.length > 0 && this._fallbackMethods) {
      this._client.sendText(
        `${text}\nwith other args:\n${JSON.stringify(args, null, 2)}`
      );
    } else {
      this._client.sendText(text);
    }
  }

  async _methodMissing(method: string, args: Array<any>): Promise<void> {
    this._isHandled = true;
    this._client.sendText(
      `${method} with args:\n${JSON.stringify(args, null, 2)}`
    );
  }
}
