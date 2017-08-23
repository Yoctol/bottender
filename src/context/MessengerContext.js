/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { MessengerClient } from 'messaging-api-messenger';

import type { MessengerSession } from '../bot/MessengerConnector';

import type { Context } from './Context';
import MessengerEvent from './MessengerEvent';
import DelayableJobQueue from './DelayableJobQueue';

type Options = {
  client: MessengerClient,
  event: MessengerEvent,
  session: ?MessengerSession,
};

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
        this.turnTypingIndicatorsOn();
      }
      await sleep(delay);
    });
    this._jobQueue.after(async ({ showIndicators = true }) => {
      if (showIndicators) {
        this.turnTypingIndicatorsOff();
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
   * Send text to the owner of then session.
   *
   */
  sendText(text: string): Promise<any> {
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
      args: [this._session.user.id, text],
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

  // FIXME: rethink
  sendTextTo(id: string, text: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendTextTo: should not be called in context without session'
      );
      return Promise.resolve();
    }
    return this._enqueue({
      instance: this._client,
      method: 'sendText',
      args: [id, text],
      delay: 0,
      showIndicators: false,
    });
  }

  turnTypingIndicatorsOn(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'turnTypingIndicatorsOn: should not be called in context without session'
      );
      return Promise.resolve();
    }
    return this._client.turnTypingIndicatorsOn(this._session.user.id);
  }

  turnTypingIndicatorsOff(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'turnTypingIndicatorsOff: should not be called in context without session'
      );
      return Promise.resolve();
    }
    return this._client.turnTypingIndicatorsOff(this._session.user.id);
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

  Object.defineProperty(MessengerContext.prototype, `${method}To`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(id, ...rest) {
      return this._enqueue({
        instance: this._client,
        method,
        args: [id, ...rest],
        delay: 0,
        showIndicators: false,
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
