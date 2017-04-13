/* @flow */

import FBGraphAPIClient from '../api/FBGraphAPIClient';
import type { ScopedDB } from '../database/scoped';

import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';
import SessionHITL from './SessionHITL';

const DEFAULT_MESSAGE_DELAY = 1000;

export type MessageDelay = number | ((text?: string) => number);

type Options = {
  data: SessionData,
  db: ScopedDB,
  messageDelay: MessageDelay,
};

export default class Context {
  _graphAPIClient: FBGraphAPIClient;
  _data: SessionData;
  _db: ScopedDB;
  _hitl: SessionHITL;
  _jobQueue: DelayableJobQueue;
  _messageDelay: MessageDelay;

  constructor({ data, db, messageDelay }: Options) {
    this._data = data;
    this._db = db;
    this._hitl = new SessionHITL(this._data);
    this._jobQueue = new DelayableJobQueue();
    this._messageDelay = messageDelay;
  }

  get data(): SessionData {
    return this._data;
  }

  get db(): ScopedDB {
    return this._db;
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
