/* @flow */

export interface SessionStore {
  init(): Promise<SessionStore>,
  read(key: string): Promise<mixed>,
  write(key: string, sess: mixed, maxAge: number): Promise<void>,
  destroy(key: string): Promise<void>,
}
