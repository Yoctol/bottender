/* @flow */

import type { ScopedDB } from '../database/scoped';

import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';
import SessionHITL from './SessionHITL';

export const DEFAULT_MESSAGE_DELAY = 1000;

type Options = {
  data: SessionData,
  db: ScopedDB,
};

type Collection = {};

type Event = any;

export default class Context {
  _data: SessionData;
  _db: ScopedDB;
  _event: Event;
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

  get event(): Event {
    return this._event;
  }

  get hitl(): SessionHITL {
    return this._hitl;
  }

  get logs(): Promise<Collection> {
    return this._db.collection('logs');
  }

  get users(): Promise<Collection> {
    return this._db.collection('users');
  }

  get sessions(): Promise<Collection> {
    return this._db.collection('sessions');
  }

  _enqueue(job: Object): void {
    if (!this.hitl.isPaused) {
      this._jobQueue.enqueue(job);
    }
  }
}
