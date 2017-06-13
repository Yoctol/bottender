/* @flow */

import LRU from 'quick-lru';

export default class MemoryCacheStore {
  _lru: LRU;

  constructor(maxSize: number) {
    this._lru = new LRU({ maxSize });
  }

  async get(key: string): Promise<mixed> {
    const value = await this._lru.get(key);
    return value || null;
  }

  async put(key: string, value: mixed, minutes: number): Promise<void> {
    this._lru.set(key, value);
    setTimeout(() => {
      this.forget(key);
    }, minutes * 60);
  }

  async forget(key: string): Promise<void> {
    this._lru.delete(key);
  }

  async flush(): Promise<void> {
    this._lru.clear();
  }

  getPrefix(): string {
    return '';
  }
}
