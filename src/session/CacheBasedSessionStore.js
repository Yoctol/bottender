export default class CacheBasedSessionStore {
  constructor(cache) {
    this._cache = cache;
  }

  async init(): CacheBasedSessionStore {
    return this;
  }

  async read(key): mixed {
    return this._cache.get(key);
  }

  async write(key: string, sess: mixed, maxAge: number) {
    this._cache.put(key, sess, maxAge);
  }

  async destroy(key: string): void {
    this._cache.forget(key);
  }
}
