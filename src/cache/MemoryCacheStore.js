/* @flow */

import LRU from 'lru-cache';
import cloneDeep from 'lodash/cloneDeep';

import type { CacheStore } from './CacheStore';

export default class MemoryCacheStore implements CacheStore {
  _lru: LRU;

  constructor(max: number) {
    this._lru = new LRU({ max });
  }

  async get(key: string): Promise<mixed> {
    const _value = this._lru.get(key);

    // cloneDeep: To make sure read as different object to prevent
    // reading same key multiple times, causing freezed by other events.
    const value = typeof _value === 'object' ? cloneDeep(_value) : _value;

    return value || null;
  }

  async put(key: string, value: mixed, minutes: number): Promise<void> {
    // cloneDeep: To make sure save as writable object
    const val = value && typeof value === 'object' ? cloneDeep(value) : value;

    this._lru.set(key, val, minutes * 60 * 1000);
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
