import LRU from 'quick-lru';

export default class MemoryCacheStore {
  constructor(maxSize) {
    this._lru = new LRU({ maxSize });
  }

  async get(key) {
    return this._lru.get(key);
  }

  async put(key, value, minutes) {
    this._lru.set(key, value);
    setTimeout(() => {
      this.forget(key);
    }, minutes * 60);
  }

  async forget(key) {
    this._lru.delete(key);
  }

  async flush() {
    this._lru.clear();
  }

  getPrefix() {
    return '';
  }
}
