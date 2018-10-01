/* @flow */

import JFSStore from 'jfs';
import isBefore from 'date-fns/is_before';
import subMinutes from 'date-fns/sub_minutes';
import thenify from 'thenify';

import { type Session } from './Session';
import { type SessionStore } from './SessionStore';

const MINUTES_IN_ONE_YEAR = 365 * 24 * 60;

export default class FileSessionStore implements SessionStore {
  _jfs: JFSStore;

  // The number of minutes to store the data in the session.
  _expiresIn: number;

  constructor(dirname: string, expiresIn: number) {
    this._expiresIn = expiresIn || MINUTES_IN_ONE_YEAR;
    const jfs = new JFSStore(dirname || '.sessions');
    jfs.get = thenify(jfs.get);
    jfs.save = thenify(jfs.save);
    jfs.delete = thenify(jfs.delete);
    this._jfs = jfs;
  }

  async init(): Promise<FileSessionStore> {
    return this;
  }

  async read(key: string): Promise<Session | null> {
    const session = await this._jfs.get(key).catch(() => null);

    if (session && this._expired(session)) {
      return null;
    }

    return session;
  }

  all(): Promise<Array<Session>> {
    return this._jfs.all();
  }

  async write(key: string, sess: Session): Promise<void> {
    sess.lastActivity = Date.now();

    await this._jfs.save(key, sess);
  }

  async destroy(key: string): Promise<void> {
    return this._jfs.delete(key);
  }

  getJFS(): JFSStore {
    return this._jfs;
  }

  _expired(sess: Session): boolean {
    return (
      sess.lastActivity !== undefined &&
      isBefore(sess.lastActivity, subMinutes(Date.now(), this._expiresIn))
    );
  }
}
