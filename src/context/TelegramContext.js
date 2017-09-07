/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { TelegramClient } from 'messaging-api-telegram';

import type { TelegramSession } from '../bot/TelegramConnector';

import type { Context } from './Context';
import TelegramEvent from './TelegramEvent';
import DelayableJobQueue from './DelayableJobQueue';

type Options = {|
  client: TelegramClient,
  event: TelegramEvent,
  session: ?TelegramSession,
|};

class TelegramContext implements Context {
  _client: TelegramClient;
  _event: TelegramEvent;
  _session: ?TelegramSession;
  _jobQueue: DelayableJobQueue;
  _messageDelay: number = 1000;

  constructor({ client, event, session }: Options) {
    this._client = client;
    this._event = event;
    this._session = session;
    this._jobQueue = new DelayableJobQueue();
    this._jobQueue.beforeEach(({ delay }) => sleep(delay));
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'telegram';
  }

  /**
   * The client instance.
   *
   */
  get client(): TelegramClient {
    return this._client;
  }

  /**
   * The event instance.
   *
   */
  get event(): TelegramEvent {
    return this._event;
  }

  /**
   * The session state of the context.
   *
   */
  get session(): ?TelegramSession {
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
    await sleep(milliseconds);
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
      method: 'sendMessage',
      args: [this._session.user.id, text],
      delay: this._messageDelay,
      showIndicators: true,
    });
  }

  sendTextWithDelay(delay: number, text: string): Promise<any> {
    warning(false, `sendTextWithDelay is deprecated.`);

    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return Promise.resolve();
    }
    return this._enqueue({
      instance: this._client,
      method: 'sendMessage',
      args: [this._session.user.id, text],
      delay,
      showIndicators: true,
    });
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
  'sendMessage',
  'sendPhoto',
  'sendAudio',
  'sendDocument',
  'sendSticker',
  'sendVideo',
  'sendVoice',
  // 'sendVideoNote',
  'sendLocation',
  'sendVenue',
  'sendContact',
  'sendChatAction',
];

sendMethods.forEach(method => {
  Object.defineProperty(TelegramContext.prototype, `${method}`, {
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

  Object.defineProperty(TelegramContext.prototype, `${method}WithDelay`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(delay, ...rest) {
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

export default TelegramContext;
