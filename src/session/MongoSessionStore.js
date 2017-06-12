import { MongoClient } from 'mongodb';

export default class MongoSessionStore {
  constructor(url) {
    this._url = url;
  }

  async init() {
    this._db = await MongoClient.connect(this._url);
    return this;
  }

  async read(key) {
    const [platform, id] = key.split(':');
    const filter = {
      'user.platform': platform,
      'user.id': id,
    };
    return this._sessions.findOne(filter);
  }

  async write(key, sess /* , maxAge */) {
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

    // FIXME: may delete?
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

  get _sessions() {
    return this._db.collection('sessions');
  }
}
