/* @flow */

import wait from 'delay';

import LINEBotAPIClient from '../api/LINEBotAPIClient';
import type { ScopedDB } from '../database/scoped';

import Context, { type MessageDelay } from './Context';
import LINEEvent, { type RawLINEEvent } from './LINEEvent';
import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';

type Options = {
  lineAPIClient: LINEBotAPIClient,
  rawEvent: RawLINEEvent,
  data: SessionData,
  db: ScopedDB,
  messageDelay: MessageDelay,
};

export default class LINEContext extends Context {
  _client: LINEBotAPIClient;
  _event: LINEEvent;
  _data: SessionData;
  _db: ScopedDB;
  _jobQueue: DelayableJobQueue;
  _messageDelay: MessageDelay;

  constructor({ lineAPIClient, rawEvent, data, db, messageDelay }: Options) {
    super({ data, db, messageDelay });
    this._client = lineAPIClient;
    this._event = new LINEEvent(rawEvent);
    this._jobQueue.beforeEach(({ delay }) => wait(delay));
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
            args: [this._data.user.id, ...args],
            delay: this._getMessageDelay(),
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
            args: [this._data.user.id, ...rest],
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
}
