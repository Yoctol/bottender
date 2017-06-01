export default class CacheBasedSessionStore {
  constructor(cache) {
    this._cache = cache;
  }

  async init(): CacheBasedSessionStore {
    return this;
  }

  async get(key): mixed {
    return this._cache.get(key);
  }

  async set(key: string, sess: mixed, maxAge: number) {
    this._cache.put(key, sess, maxAge);
  }

  async destroy(key: string): void {
    this._cache.forget(key);
  }

  async save(key: string, sess: mixed) {
    this._cache.put(key, sess, 60 * 60);
  }
}
