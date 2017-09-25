/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { MessengerClient } from 'messaging-api-messenger';

import type { MessengerSession } from '../bot/MessengerConnector';

import type { Context } from './Context';
import MessengerEvent from './MessengerEvent';
import DelayableJobQueue from './DelayableJobQueue';

type Options = {|
  client: MessengerClient,
  event: MessengerEvent,
  session: ?MessengerSession,
|};

class MessengerContext implements Context {
  _client: MessengerClient;
  _event: MessengerEvent;
  _session: ?MessengerSession;
  _jobQueue: DelayableJobQueue;
  _messageDelay: number = 1000;

  constructor({ client, event, session }: Options) {
    this._client = client;
    this._event = event;
    this._session = session;
    this._jobQueue = new DelayableJobQueue();
    this._jobQueue.beforeEach(async ({ delay, showIndicators = true }) => {
      if (showIndicators) {
        this.typingOn();
      }
      await sleep(delay);
    });
    this._jobQueue.after(async ({ showIndicators = true }) => {
      if (showIndicators) {
        this.typingOff();
      }
    });
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'messenger';
  }

  /**
   * The client instance.
   *
   */
  get client(): MessengerClient {
    return this._client;
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
  setMessageDelay(milliseconds: number): void {
    this._messageDelay = milliseconds;
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
  sendText(text: string, options?: Object): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return Promise.resolve();
    }
    return this._enqueue({
      instance: this._client,
      method: 'sendText',
      args: options
        ? [this._session.user.id, text, options]
        : [this._session.user.id, text],
      delay: this._messageDelay,
      showIndicators: true,
    });
  }

  sendTextWithDelay(delay: number, text: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendTextWithDelay: should not be called in context without session'
      );
      return Promise.resolve();
    }
    return this._enqueue({
      instance: this._client,
      method: 'sendText',
      args: [this._session.user.id, text],
      delay,
      showIndicators: true,
    });
  }

  typingOn(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'typingOn: should not be called in context without session'
      );
      return Promise.resolve();
    }
    return this._client.typingOn(this._session.user.id);
  }

  typingOff(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'typingOff: should not be called in context without session'
      );
      return Promise.resolve();
    }
    return this._client.typingOff(this._session.user.id);
  }

  _enqueue(job: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      this._jobQueue.enqueue({
        ...job,
        onSuccess: resolve,
        onError: reject,
      });
    });
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
    value(...args) {
      if (!this._session) {
        warning(
          false,
          `${method}: should not be called in context without session`
        );
        return Promise.resolve();
      }

      return this._enqueue({
        instance: this._client,
        method,
        args: [this._session.user.id, ...args],
        delay: this._messageDelay,
        showIndicators: true,
      });
    },
  });

  Object.defineProperty(MessengerContext.prototype, `${method}WithDelay`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(delay, ...rest) {
      warning(false, `${method}WithDelay is deprecated.`);
      if (!this._session) {
        warning(
          false,
          `${method}WithDelay: should not be called in context without session`
        );
        return Promise.resolve();
      }

      return this._enqueue({
        instance: this._client,
        method,
        args: [this._session.user.id, ...rest],
        delay,
        showIndicators: true,
      });
    },
  });
});

export default MessengerContext;
