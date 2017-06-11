import Store from 'jfs';
import thenify from 'thenify';

export default class FileSessionStore {
  constructor(directoryName) {
    const db = new Store(directoryName || '.sessions');
    db.get = thenify(db.get);
    db.save = thenify(db.save);
    db.delete = thenify(db.delete);
    this._db = db;
  }

  async init() {
    return this;
  }

  async read(key) {
    return this._db.get(key).catch(() => null);
  }

  async write(key, sess /* , maxAge */) {
    await this._db.save(key, sess);
  }

  async destroy(key) {
    return this._db.delete(key);
  }
}
