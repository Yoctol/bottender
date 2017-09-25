/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { MessengerClient } from 'messaging-api-messenger';

import type { MessengerSession } from '../bot/MessengerConnector';

import Context from './Context';
import MessengerEvent from './MessengerEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: MessengerClient,
  event: MessengerEvent,
  session: ?MessengerSession,
|};

class MessengerContext extends Context implements PlatformContext {
  _client: MessengerClient;
  _event: MessengerEvent;
  _session: ?MessengerSession;

  constructor({ client, event, session }: Options) {
    super({ client, event, session });
    this.setMessageDelay(1000);
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'messenger';
  }

  /**
   * Delay and show indicators for milliseconds.
   *
   */
  async typing(milliseconds: number): Promise<void> {
    await this.typingOn();
    await sleep(milliseconds);
    await this.typingOff();
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
    const session = this._session;
    await this.typing(this._messageDelay);
    return this._client.sendText(session.user.id, text, options);
  }

  async sendTextWithDelay(delay: number, text: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendTextWithDelay: should not be called in context without session'
      );
      return;
    }
    const session = this._session;
    await this.typing(delay);
    return this._client.sendText(session.user.id, text);
  }

  async typingOn(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'typingOn: should not be called in context without session'
      );
      return;
    }
    return this._client.typingOn(this._session.user.id);
  }

  async typingOff(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'typingOff: should not be called in context without session'
      );
      return;
    }
    return this._client.typingOff(this._session.user.id);
  }
}

const sendMethods = [
  'sendAttachment',
  'sendImage',
  'sendAudio',
  'sendVideo',
  'sendFile',
  'sendQuickReplies',
  'sendGenericTemplate',
  'sendButtonTemplate',
  'sendListTemplate',
  'sendReceiptTemplate',
  'sendAirlineBoardingPassTemplate',
  'sendAirlineCheckinTemplate',
  'sendAirlineItineraryTemplate',
  'sendAirlineFlightUpdateTemplate',
];

sendMethods.forEach(method => {
  Object.defineProperty(MessengerContext.prototype, `${method}`, {
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
      await this.typing(this._messageDelay);
      return this._client[method](this._session.user.id, ...args);
    },
  });

  Object.defineProperty(MessengerContext.prototype, `${method}WithDelay`, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(delay, ...rest) {
      warning(false, `${method}WithDelay is deprecated.`);
      if (!this._session) {
        warning(
          false,
          `${method}WithDelay: should not be called in context without session`
        );
        return;
      }

      await this.typing(delay);
      return this._client[method](this._session.user.id, ...rest);
    },
  });
});

export default MessengerContext;
