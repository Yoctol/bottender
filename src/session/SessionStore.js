/* @flow */

import Session, { type SessionJSONObject } from './Session';

export interface SessionStore {
  init(): Promise<SessionStore>,
  read(key: string): Promise<SessionJSONObject>,
  write(key: string, sess: Session, maxAge: number): Promise<void>,
  destroy(key: string): Promise<void>,
}
