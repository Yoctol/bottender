/* @flow */

import wait from 'delay';

import LINEBotAPIClient from '../api/LINEBotAPIClient';

import type { MessageDelay } from './Context';
import Context from './Context';
import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';

type Options = {
  lineAPIClient: LINEBotAPIClient,
  data: SessionData,
  messageDelay: MessageDelay,
};

export default class LINEContext extends Context {
  _client: LINEBotAPIClient;
  _data: SessionData;
  _jobQueue: DelayableJobQueue;
  _messageDelay: MessageDelay;

  constructor({ lineAPIClient, data, messageDelay }: Options) {
    super({ data, messageDelay });
    this._client = lineAPIClient;
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
}
