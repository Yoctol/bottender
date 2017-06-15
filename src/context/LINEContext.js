/* @flow */

import sleep from 'delay';
import { LINEClient } from 'messaging-api-line';

import type { LINESession } from '../bot/LINEConnector';

import { DEFAULT_MESSAGE_DELAY, type Context } from './Context';
import LINEEvent, { type LINERawEvent } from './LINEEvent';
import DelayableJobQueue from './DelayableJobQueue';

type Options = {
  lineAPIClient: LINEClient,
  rawEvent: LINERawEvent,
  session: LINESession,
};

export default class LINEContext implements Context {
  _client: LINEClient;
  _event: LINEEvent;
  _session: LINESession;
  _jobQueue: DelayableJobQueue;

  constructor({ lineAPIClient, rawEvent, session }: Options) {
    this._client = lineAPIClient;
    this._event = new LINEEvent(rawEvent);
    this._session = session;
    this._jobQueue = new DelayableJobQueue();
    this._jobQueue.beforeEach(({ delay }) => sleep(delay));
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
      Object.defineProperty(this, `send${type}`, {
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

      Object.defineProperty(this, `send${type}To`, {
        enumerable: false,
        configurable: true,
        writable: true,
        value(id, ...rest) {
          this._enqueue({
            instance: this._client,
            method: `push${type}`,
            args: [id, ...rest],
            delay: 0,
            showIndicators: false,
          });
        },
      });

      Object.defineProperty(this, `send${type}WithDelay`, {
        enumerable: false,
        configurable: true,
        writable: true,
        value(delay, ...rest) {
          this._enqueue({
            instance: this._client,
            method: `push${type}`,
            args: [this._session.user.id, ...rest],
            delay,
            showIndicators: true,
          });
        },
      });
    });
  }

  get event(): LINEEvent {
    return this._event;
  }

  get session(): LINESession {
    return this._session;
  }

  _enqueue(job: Object): void {
    this._jobQueue.enqueue(job);
  }
}
