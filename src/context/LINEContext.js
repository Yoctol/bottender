/* @flow */

import sleep from 'delay';
import warning from 'warning';
import invariant from 'invariant';
import { LINEClient } from 'messaging-api-line';

import type { LINESession } from '../bot/LINEConnector';

import { DEFAULT_MESSAGE_DELAY, type Context } from './Context';
import LINEEvent, { type LINERawEvent } from './LINEEvent';
import DelayableJobQueue from './DelayableJobQueue';

type Options = {
  client: LINEClient,
  rawEvent: LINERawEvent,
  session: ?LINESession,
};

class LINEContext implements Context {
  _client: LINEClient;
  _event: LINEEvent;
  _session: ?LINESession;
  _jobQueue: DelayableJobQueue;

  _replied: boolean = false;

  constructor({ client, rawEvent, session }: Options) {
    this._client = client;
    this._event = new LINEEvent(rawEvent);
    this._session = session;
    this._jobQueue = new DelayableJobQueue();
    this._jobQueue.beforeEach(({ delay }) => sleep(delay));
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'line';
  }

  /**
   * The event instance.
   *
   */
  get event(): LINEEvent {
    return this._event;
  }

  /**
   * The session state of the context.
   *
   */
  get session(): ?LINESession {
    return this._session;
  }

  /**
   * Determine if the reply token is already used.
   *
   */
  get replied(): boolean {
    return this._replied;
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
      method: `pushText`,
      args: [this._session.user.id, text],
      delay: DEFAULT_MESSAGE_DELAY,
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
      method: `pushText`,
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
  Object.defineProperty(LINEContext.prototype, `reply${type}`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(...args) {
      invariant(!this._replied, 'Can not reply event mulitple times');

      this._replied = true;

      return this._enqueue({
        instance: this._client,
        method: `reply${type}`,
        args: [this._event.replyToken, ...args],
        delay: DEFAULT_MESSAGE_DELAY,
        showIndicators: true,
      });
    },
  });

  Object.defineProperty(LINEContext.prototype, `push${type}`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(...args) {
      if (!this._session) {
        warning(
          false,
          `push${type}: should not be called in context without session`
        );
        return Promise.resolve();
      }
      return this._enqueue({
        instance: this._client,
        method: `push${type}`,
        args: [this._session.user.id, ...args],
        delay: DEFAULT_MESSAGE_DELAY,
        showIndicators: true,
      });
    },
  });

  Object.defineProperty(LINEContext.prototype, `send${type}To`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(id, ...rest) {
      return this._enqueue({
        instance: this._client,
        method: `push${type}`,
        args: [id, ...rest],
        delay: 0,
        showIndicators: false,
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
      if (!this._session) {
        warning(
          false,
          `send${type}: should not be called in context without session`
        );
        return Promise.resolve();
      }
      return this._enqueue({
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
      warning(false, `send${type}WithDelay is deprecated.`);

      if (!this._session) {
        warning(
          false,
          `send${type}WithDelay: should not be called in context without session`
        );
        return Promise.resolve();
      }
      return this._enqueue({
        instance: this._client,
        method: `push${type}`,
        args: [this._session.user.id, ...rest],
        delay,
        showIndicators: true,
      });
    },
  });
});

export default LINEContext;
