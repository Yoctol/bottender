export default class MemorySessionStore {
  constructor() {
    this._map = Object.create(null);
  }

  async init() {
    return this;
  }

  async get(key) {
    return this._map[key];
  }

  async set(key, sess /* , maxAge */) {
    this._map[key] = sess;
    // FIXME: maxAge
  }

  async destroy(key) {
    delete this._map[key];
  }
}
