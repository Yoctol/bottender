/* @flow */

import type { CacheStore } from '../cache/CacheStore';

import Session from './Session';
import type { SessionStore } from './SessionStore';

export default class CacheBasedSessionStore implements SessionStore {
  _cache: CacheStore;

  constructor(cache: CacheStore) {
    this._cache = cache;
  }

  async init(): Promise<CacheBasedSessionStore> {
    return this;
  }

  async read(key: string): Promise<mixed> {
    return this._cache.get(key);
  }

  async write(key: string, sess: Session, maxAge: number): Promise<void> {
    this._cache.put(key, sess, maxAge);
  }

  async destroy(key: string): Promise<void> {
    this._cache.forget(key);
  }
}
