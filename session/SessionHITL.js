/* @flow */

import type SessionData from './SessionData';

export default class SessionHITL {
  _session: SessionData;

  constructor(session: SessionData) {
    this._session = session;
  }

  get isPaused(): boolean {
    return !!this._session.paused;
  }

  pause(): void {
    this._session.paused = true;
  }

  unpause(): void {
    this._session.paused = false;
  }
}
