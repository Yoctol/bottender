/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { ViberClient } from 'messaging-api-viber';

import type { Session } from '../session/Session';

import Context from './Context';
import ViberEvent from './ViberEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: ViberClient,
  event: ViberEvent,
  session: ?Session,
  initialState: ?Object,
|};

class ViberContext extends Context implements PlatformContext {
  _client: ViberClient;
  _event: ViberEvent;
  _session: ?Session;

  constructor({ client, event, session, initialState }: Options) {
    super({ client, event, session, initialState });
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'viber';
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
  async sendText(text: string, options?: Object): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    return this._client.sendText(this._session.user.id, text, options);
  }
}

const sendMethods = [
  'sendMessage',
  'sendPicture',
  'sendVideo',
  'sendFile',
  'sendContact',
  'sendLocation',
  'sendURL',
  'sendSticker',
  'sendCarouselContent',
];

sendMethods.forEach(method => {
  Object.defineProperty(ViberContext.prototype, `${method}`, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(...args) {
      if (!this._session) {
        warning(
          false,
          `${method}: should not be called in context without session`
        );
        return;
      }

      this._isHandled = true;

      return this._client[method](this._session.user.id, ...args);
    },
  });
});

export default ViberContext;
