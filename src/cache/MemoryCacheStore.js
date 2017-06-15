/* @flow */

import LRU from 'quick-lru';

import type { CacheStore } from './CacheStore';

export default class MemoryCacheStore implements CacheStore {
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
    }, minutes * 60 * 1000);
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
