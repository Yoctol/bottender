export default class MemorySessionStore {
  _map: Object;

  constructor() {
    this._map = Object.create(null);
  }

  async init(): MemorySessionStore {
    return this;
  }

  async get(key): mixed {
    return this._map[key];
  }

  async set(key: string, sess: mixed /* , maxAge */) {
    this._map[key] = sess;
    // FIXME: maxAge
  }

  async destroy(key: string): void {
    delete this._map[key];
  }
}
