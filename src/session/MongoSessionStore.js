import resolve from '../database/resolve';

export default class MongoSessionStore {
  async init() {
    this._db = await resolve();
    return this;
  }

  async get(key) {
    const [platform, id] = key.split(':');
    const filter = {
      'user.platform': platform,
      'user.id': id,
    };
    return this._sessions.findOne(filter);
  }

  async set(key, sess /* , maxAge */) {
    const [platform, id] = key.split(':');
    let filter;
    if (sess._id) {
      filter = {
        _id: sess._id,
      };
    } else {
      filter = {
        'user.platform': platform,
        'user.id': id,
      };
    }

    const result = await this._sessions.updateOne(filter, sess, {
      upsert: true,
    });
    if (result && result.upsertedId && result.upsertedId._id) {
      sess._id = result.upsertedId._id;
    }
  }

  async destroy(key) {
    const [platform, id] = key.split(':');
    const filter = {
      'user.platform': platform,
      'user.id': id,
    };
    return this._sessions.remove(filter);
  }

  async save(key, sess /* , maxAge */) {
    const filter = {
      _id: sess._id,
    };
    return this._sessions.updateOne(filter, sess);
  }

  get _sessions() {
    return this._db.collection('sessions');
  }
}
