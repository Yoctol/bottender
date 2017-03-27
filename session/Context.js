/* @flow */

import FBGraphAPIClient from '../graph/FBGraphAPIClient';

import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';
import SessionHITL from './SessionHITL';

const DEFAULT_MESSAGE_DELAY = 1000;

export type MessageDelay = number | ((text?: string) => number);

type Options = {
  data: SessionData,
  messageDelay: MessageDelay,
};

export default class Context {
  _graphAPIClient: FBGraphAPIClient;
  _data: SessionData;
  _hitl: SessionHITL;
  _jobQueue: DelayableJobQueue;
  _messageDelay: MessageDelay;

  constructor({ data, messageDelay }: Options) {
    this._data = data;
    this._hitl = new SessionHITL(this._data);
    this._jobQueue = new DelayableJobQueue();
    this._messageDelay = messageDelay;
  }

  get data(): SessionData {
    return this._data;
  }

  set data(data: mixed): void {
    this._data = data;
  }

  get hitl(): SessionHITL {
    return this._hitl;
  }

  _enqueue(job: Object): void {
    if (!this.hitl.isPaused) {
      this._jobQueue.enqueue(job);
    }
  }

  _getMessageDelay(message?: string): number {
    if (typeof this._messageDelay === 'function') {
      return this._messageDelay(message);
    }
    return this._messageDelay || DEFAULT_MESSAGE_DELAY;
  }
}
