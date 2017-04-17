import { resolveScoped } from '../database/resolve';

export default class MongoSessionStore {
  constructor({ id }) {
    this._id = id;
  }

  async init() {
    this._db = await resolveScoped(this._id);
    return this;
  }

  async get(key) {
    const [platform, id] = key.split(':');
    return this._sessions.findOne({ platform, id });
  }

  async set(key, sess /* , maxAge */) {
    const [platform, id] = key.split(':');
    const filter = { platform, id };
    return this._sessions.replaceOne(filter, sess, { upsert: true });
  }

  async destroy(key) {
    const [platform, id] = key.split(':');
    return this._sessions.remove({ platform, id });
  }

  async save(key, sess /* , maxAge */) {
    return this.set(key, sess);
  }

  get _sessions() {
    return this._db.collection('sessions');
  }
}
