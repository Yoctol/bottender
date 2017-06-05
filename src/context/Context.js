/* @flow */
import Session from '../session/Session';

import DelayableJobQueue from './DelayableJobQueue';

export const DEFAULT_MESSAGE_DELAY = 1000;

type Options = {
  session: Session,
};

type Event = any;

export default class Context {
  _session: Session;
  _event: Event;
  _jobQueue: DelayableJobQueue;

  constructor({ session }: Options) {
    this._session = session;
    this._jobQueue = new DelayableJobQueue();
  }

  get session(): Session {
    return this._session;
  }

  get event(): Event {
    return this._event;
  }

  _enqueue(job: Object): void {
    this._jobQueue.enqueue(job);
  }
}
