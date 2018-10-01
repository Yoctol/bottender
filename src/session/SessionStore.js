/* @flow */

import { type Session } from './Session';

export interface SessionStore {
  init(): Promise<SessionStore>;
  read(key: string): Promise<Session | null>;
  all(): Promise<Array<Session>>;
  write(key: string, sess: Session): Promise<void>;
  destroy(key: string): Promise<void>;
}
