import LRU from 'quick-lru';

export default class MemoryCacheStore {
  construct(maxSize) {
    this._lru = new LRU({ maxSize });
  }

  get(key) {
    return this._lru.get(key);
  }

  put(key, value, minutes) {
    this._lru.set(key, value);
    setTimeout(() => {
      this.forget(key);
    }, minutes * 60);
  }

  forget(key) {
    this._lru.delete(key);
  }

  flush() {
    this._lru.clear();
  }

  getPrefix() {
    return '';
  }
}
