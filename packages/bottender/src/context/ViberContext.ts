import sleep from 'delay';
import warning from 'warning';
import { ViberClient } from 'messaging-api-viber';

import Session from '../session/Session';

import Context from './Context';
import ViberEvent from './ViberEvent';
import { PlatformContext } from './PlatformContext';

class ViberContext extends Context implements PlatformContext {
  _client: ViberClient = this._client;

  _event: ViberEvent = this._event;

  _session: Session | null = this.session;

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
   * Send text to the owner of the session.
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

  /**
   * Get user details from the owner of the session.
   *
   */
  async getUserDetails(): Promise<Object | null> {
    if (!this._session) {
      warning(
        false,
        'getUserDetails: should not be called in context without session'
      );
      return null;
    }

    return this._client.getUserDetails(this._session.user.id);
  }

  /**
   * Get user online status from the owner of the session.
   *
   */
  async getOnlineStatus(): Promise<Object | null> {
    if (!this._session) {
      warning(
        false,
        'getOnlineStatus: should not be called in context without session'
      );
      return null;
    }

    const status = await this._client.getOnlineStatus([this._session.user.id]);
    return status[0];
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
