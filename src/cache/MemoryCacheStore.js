/* @flow */

import LRU from 'lru-cache';

import type { CacheStore } from './CacheStore';

export default class MemoryCacheStore implements CacheStore {
  _lru: LRU;

  constructor(max: number) {
    this._lru = new LRU({ max });
  }

  async get(key: string): Promise<mixed> {
    const value = await this._lru.get(key);
    return value || null;
  }

  async put(key: string, value: mixed, minutes: number): Promise<void> {
    this._lru.set(key, value, minutes * 60 * 1000);
  }

  async forget(key: string): Promise<void> {
    this._lru.del(key);
  }

  async flush(): Promise<void> {
    this._lru.reset();
  }

  getPrefix(): string {
    return '';
  }
}
