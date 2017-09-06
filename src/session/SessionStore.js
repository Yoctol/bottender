/* @flow */

import type { Session } from './Session';

export interface SessionStore {
  init(): Promise<SessionStore>,
  read(key: string): Promise<Session | null>,
  write(key: string, sess: Session): Promise<void>,
  destroy(key: string): Promise<void>,
}
