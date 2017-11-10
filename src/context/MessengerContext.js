/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { MessengerClient } from 'messaging-api-messenger';

import type { Session } from '../session/Session';

import Context from './Context';
import MessengerEvent from './MessengerEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: MessengerClient,
  event: MessengerEvent,
  session: ?Session,
  initialState: ?Object,
|};

class MessengerContext extends Context implements PlatformContext {
  _client: MessengerClient;
  _event: MessengerEvent;
  _session: ?Session;

  constructor({ client, event, session, initialState }: Options) {
    super({ client, event, session, initialState });
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
    if (milliseconds > 0) {
      await this.typingOn();
      await sleep(milliseconds);
      await this.typingOff();
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

    const messageType = options && options.tag ? 'MESSAGE_TAG' : 'RESPONSE';

    return this._client.sendText(this._session.user.id, text, {
      messaging_type: messageType,
      ...options,
    });
  }

  async typingOn(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'typingOn: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

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

    this._isHandled = true;

    return this._client.typingOff(this._session.user.id);
  }

  async markSeen(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'markSeen: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    return this._client.markSeen(this._session.user.id);
  }
}

const sendMethods = [
  // method name, arguments length
  ['sendAttachment', 3],
  ['sendImage', 3],
  ['sendAudio', 3],
  ['sendVideo', 3],
  ['sendFile', 3],
  ['sendQuickReplies', 4],
  ['sendGenericTemplate', 3],
  ['sendButtonTemplate', 4],
  ['sendListTemplate', 4],
  ['sendReceiptTemplate', 3],
  ['sendAirlineBoardingPassTemplate', 3],
  ['sendAirlineCheckinTemplate', 3],
  ['sendAirlineItineraryTemplate', 3],
  ['sendAirlineFlightUpdateTemplate', 3],
];

sendMethods.forEach(([method, len]) => {
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

      this._isHandled = true;

      const options = args[len - 2];
      const messageType = options && options.tag ? 'MESSAGE_TAG' : 'RESPONSE';

      args[len - 2] = {
        messaging_type: messageType,
        ...options,
      };

      return this._client[method](this._session.user.id, ...args);
    },
  });
});

export default MessengerContext;
