/* @flow */

import sleep from 'delay';
import { TelegramClient } from 'messaging-api-telegram';

import type { TelegramSession } from '../bot/TelegramConnector';

import { DEFAULT_MESSAGE_DELAY, type Context } from './Context';
import TelegramEvent, { type TelegramRawEvent } from './TelegramEvent';
import DelayableJobQueue from './DelayableJobQueue';

type Options = {
  client: TelegramClient,
  rawEvent: TelegramRawEvent,
  session: TelegramSession,
};

class TelegramContext implements Context {
  _client: TelegramClient;
  _event: TelegramEvent;
  _session: TelegramSession;
  _jobQueue: DelayableJobQueue;

  constructor({ client, rawEvent, session }: Options) {
    this._client = client;
    this._event = new TelegramEvent(rawEvent);
    this._session = session;
    this._jobQueue = new DelayableJobQueue();
    this._jobQueue.beforeEach(({ delay }) => sleep(delay));
  }

  get platform(): string {
    return 'telegram';
  }

  get event(): TelegramEvent {
    return this._event;
  }

  get session(): TelegramSession {
    return this._session;
  }

  // FIXME
  turnTypingIndicatorsOn(): void {
    this._client.turnTypingIndicatorsOn(this._session.user.id);
  }

  // FIXME
  turnTypingIndicatorsOff(): void {
    this._client.turnTypingIndicatorsOff(this._session.user.id);
  }

  _enqueue(job: Object): void {
    this._jobQueue.enqueue(job);
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
      this._enqueue({
        instance: this._client,
        method,
        args: [this._session.user.id, ...args],
        delay: DEFAULT_MESSAGE_DELAY,
        showIndicators: true,
      });
    },
  });

  Object.defineProperty(TelegramContext.prototype, `${method}To`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(id, ...rest) {
      this._enqueue({
        instance: this._client,
        method,
        args: [id, ...rest],
        delay: 0,
        showIndicators: false,
      });
    },
  });

  Object.defineProperty(TelegramContext.prototype, `${method}WithDelay`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(delay, ...rest) {
      this._enqueue({
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
