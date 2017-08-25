/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { MessengerClient } from 'messaging-api-messenger';

import type { MessengerSession } from '../bot/MessengerConnector';

import type { Context } from './Context';
import MessengerEvent from './MessengerEvent';

type Options = {
  client: MessengerClient,
  event: MessengerEvent,
  session: ?MessengerSession,
};

class MessengerContext implements Context {
  _client: MessengerClient;
  _event: MessengerEvent;
  _session: ?MessengerSession;
  _messageDelay: number = 1000;

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
    return 'messenger';
  }

  /**
   * The event instance.
   *
   */
  get event(): MessengerEvent {
    return this._event;
  }

  /**
   * The session state of the context.
   *
   */
  get session(): ?MessengerSession {
    return this._session;
  }

  /**
   * Set delay before sending every messages.
   *
   */
  setMessageDelay(seconds: number): void {
    this._messageDelay = seconds;
  }

  /**
   * Delay and show indicators for seconds.
   *
   */
  async typing(seconds: number): Promise<void> {
    await this.turnTypingIndicatorsOn();
    await sleep(seconds);
    await this.turnTypingIndicatorsOff();
  }

  /**
   * Send text to the owner of then session.
   *
   */
  async sendText(text: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }
    await this.typing(this._messageDelay);
    return this._client.sendText(this._session.user.id, text);
  }

  async sendTextWithDelay(delay: number, text: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendTextWithDelay: should not be called in context without session'
      );
      return;
    }
    await this.typing(delay);
    return this._client.sendText(this._session.user.id, text);
  }

  // FIXME: rethink
  sendTextTo(id: string, text: string): Promise<any> {
    return this._client.sendText(id, text);
  }

  async turnTypingIndicatorsOn(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'turnTypingIndicatorsOn: should not be called in context without session'
      );
      return;
    }
    return this._client.turnTypingIndicatorsOn(this._session.user.id);
  }

  async turnTypingIndicatorsOff(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'turnTypingIndicatorsOff: should not be called in context without session'
      );
      return;
    }
    return this._client.turnTypingIndicatorsOff(this._session.user.id);
  }
}

const sendMethods = [
  'sendIssueResolutionText',
  'sendImage',
  'sendAudio',
  'sendVideo',
  'sendFile',
  'sendQuickReplies',
  'sendGenericTemplate',
  'sendShippingUpdateTemplate',
  'sendReservationUpdateTemplate',
  'sendIssueResolutionTemplate',
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

  Object.defineProperty(MessengerContext.prototype, `${method}To`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(id, ...rest) {
      return this._client[method](id, ...rest);
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
