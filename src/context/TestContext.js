/* @flow */
import sleep from 'delay';

import { type Session } from '../session/Session';

import Context from './Context';
import TestEvent from './TestEvent';
import { type PlatformContext } from './PlatformContext';
import { type TestClient } from './TestClient';

type Options = {|
  client: TestClient,
  event: TestEvent,
  session: ?Session,
  initialState: ?Object,
  requestContext: ?Object,
  fallbackMethods: boolean,
|};

const methodBlackList = [
  'then', // promise
  'handlerDidEnd', // context lifecycle
];

export default class TestContext extends Context implements PlatformContext {
  _client: TestClient = this._client;

  _event: TestEvent = this._event;

  _session: ?Session = this._session;

  constructor({
    client,
    event,
    session,
    initialState,
    requestContext,
    fallbackMethods,
  }: Options) {
    super({ client, event, session, initialState, requestContext });
    if (fallbackMethods) {
      // $FlowExpectedError
      return new Proxy(this, {
        get(target, key) {
          // https://github.com/facebook/flow/issues/6181
          // https://github.com/facebook/flow/issues/6321
          // $FlowFixMe: Cannot get `target[key]` because an indexer property is missing in `TestContext` [1].
          if (typeof target[key] !== 'undefined') {
            // $FlowFixMe: Cannot get `target[key]` because an indexer property is missing in `TestContext` [1].
            return target[key];
          }

          if (methodBlackList.some(method => method === key)) return;
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
    return 'test';
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
    return this._methodMissing('sendText', [text]);
  }

  async _methodMissing(method: string, args: Array<any>): Promise<void> {
    this._isHandled = true;
    this._client.callMethod(method, args);
  }
}
