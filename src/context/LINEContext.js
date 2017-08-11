/* @flow */

import sleep from 'delay';
import { LINEClient } from 'messaging-api-line';

import type { LINESession } from '../bot/LINEConnector';

import { DEFAULT_MESSAGE_DELAY, type Context } from './Context';
import LINEEvent, { type LINERawEvent } from './LINEEvent';
import DelayableJobQueue from './DelayableJobQueue';

type Options = {
  client: LINEClient,
  rawEvent: LINERawEvent,
  session: LINESession,
};

class LINEContext implements Context {
  _client: LINEClient;
  _event: LINEEvent;
  _session: LINESession;
  _jobQueue: DelayableJobQueue;

  constructor({ client, rawEvent, session }: Options) {
    this._client = client;
    this._event = new LINEEvent(rawEvent);
    this._session = session;
    this._jobQueue = new DelayableJobQueue();
    this._jobQueue.beforeEach(({ delay }) => sleep(delay));
  }

  get platform(): string {
    return 'line';
  }

  get event(): LINEEvent {
    return this._event;
  }

  get session(): LINESession {
    return this._session;
  }

  sendText(text: string) {
    this._enqueue({
      instance: this._client,
      method: `pushText`,
      args: [this._session.user.id, text],
      delay: DEFAULT_MESSAGE_DELAY,
      showIndicators: true,
    });
  }

  sendTextWithDelay(delay: number, text: string) {
    this._enqueue({
      instance: this._client,
      method: `pushText`,
      args: [this._session.user.id, text],
      delay,
      showIndicators: true,
    });
  }

  _enqueue(job: Object): void {
    this._jobQueue.enqueue(job);
  }
}

const types = [
  'Text',
  'Image',
  'Video',
  'Audio',
  'Location',
  'Sticker',
  'Imagemap',
  'ButtonTemplate',
  'ConfirmTemplate',
  'CarouselTemplate',
];
types.forEach(type => {
  Object.defineProperty(LINEContext.prototype, `push${type}`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(...args) {
      return new Promise((resolve, reject) => {
        this._enqueue({
          instance: this._client,
          method: `push${type}`,
          args: [this._session.user.id, ...args],
          delay: DEFAULT_MESSAGE_DELAY,
          showIndicators: true,
          onSuccess: resolve,
          onError: reject,
        });
      });
    },
  });

  Object.defineProperty(LINEContext.prototype, `send${type}To`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(id, ...rest) {
      return new Promise((resolve, reject) => {
        this._enqueue({
          instance: this._client,
          method: `push${type}`,
          args: [id, ...rest],
          delay: 0,
          showIndicators: false,
          onSuccess: resolve,
          onError: reject,
        });
      });
    },
  });
});

types.filter(type => type !== 'Text').forEach(type => {
  Object.defineProperty(LINEContext.prototype, `send${type}`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(...args) {
      this._enqueue({
        instance: this._client,
        method: `push${type}`,
        args: [this._session.user.id, ...args],
        delay: DEFAULT_MESSAGE_DELAY,
        showIndicators: true,
      });
    },
  });

  Object.defineProperty(LINEContext.prototype, `send${type}WithDelay`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(delay, ...rest) {
      return new Promise((resolve, reject) => {
        this._enqueue({
          instance: this._client,
          method: `push${type}`,
          args: [this._session.user.id, ...rest],
          delay,
          showIndicators: true,
          onSuccess: resolve,
          onError: reject,
        });
      });
    },
  });
});
export default LINEContext;
