/* @flow */

import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';

export const DEFAULT_MESSAGE_DELAY = 1000;

type Options = {
  data: SessionData,
};

type Event = any;

export default class Context {
  _data: SessionData;
  _event: Event;
  _jobQueue: DelayableJobQueue;

  constructor({ data }: Options) {
    this._data = data;
    this._jobQueue = new DelayableJobQueue();
  }

  get data(): SessionData {
    return this._data;
  }

  get event(): Event {
    return this._event;
  }

  _enqueue(job: Object): void {
    this._jobQueue.enqueue(job);
  }
}
