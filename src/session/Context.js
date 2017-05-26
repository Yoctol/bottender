/* @flow */

import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';
import SessionHITL from './SessionHITL';

export const DEFAULT_MESSAGE_DELAY = 1000;

type Options = {
  data: SessionData,
};

type Event = any;

export default class Context {
  _data: SessionData;
  _event: Event;
  _hitl: SessionHITL;
  _jobQueue: DelayableJobQueue;

  constructor({ data }: Options) {
    this._data = data;
    this._hitl = new SessionHITL(this._data);
    this._jobQueue = new DelayableJobQueue();
  }

  get data(): SessionData {
    return this._data;
  }

  get event(): Event {
    return this._event;
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
