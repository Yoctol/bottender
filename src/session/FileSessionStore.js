/* @flow */

import JFSStore from 'jfs';
import thenify from 'thenify';

import type { Session } from './Session';
import type { SessionStore } from './SessionStore';

export default class FileSessionStore implements SessionStore {
  _jfs: JFSStore;

  constructor(dirname: string) {
    const jfs = new JFSStore(dirname || '.sessions');
    jfs.get = thenify(jfs.get);
    jfs.save = thenify(jfs.save);
    jfs.delete = thenify(jfs.delete);
    this._jfs = jfs;
  }

  async init(): Promise<FileSessionStore> {
    return this;
  }

  async read(key: string): Promise<Session> {
    return this._jfs.get(key).catch(() => null);
  }

  async write(key: string, sess: Session, maxAge: number): Promise<void> {
    await this._jfs.save(key, sess);
    setTimeout(() => {
      this.destroy(key);
    }, maxAge * 60 * 1000);
  }

  async destroy(key: string): Promise<void> {
    return this._jfs.delete(key);
  }

  getJFS(): JFSStore {
    return this._jfs;
  }
}
