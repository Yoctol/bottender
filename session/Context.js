/* @flow */

import FBGraphAPIClient from '../api/FBGraphAPIClient';
import type { ScopedDB } from '../database/scoped';

import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';
import SessionHITL from './SessionHITL';

export const DEFAULT_MESSAGE_DELAY = 1000;

type Options = {
  data: SessionData,
  db: ScopedDB,
};

export default class Context {
  _graphAPIClient: FBGraphAPIClient;
  _data: SessionData;
  _db: ScopedDB;
  _hitl: SessionHITL;
  _jobQueue: DelayableJobQueue;

  constructor({ data, db }: Options) {
    this._data = data;
    this._db = db;
    this._hitl = new SessionHITL(this._data);
    this._jobQueue = new DelayableJobQueue();
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
}
