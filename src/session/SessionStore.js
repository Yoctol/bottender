/* @flow */

import Session from './Session';

export interface SessionStore {
  init(): Promise<SessionStore>,
  read(key: string): Promise<mixed>,
  write(key: string, sess: Session, maxAge: number): Promise<void>,
  destroy(key: string): Promise<void>,
}
