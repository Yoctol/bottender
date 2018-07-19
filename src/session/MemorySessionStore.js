/* @flow */

import MemoryCacheStore from '../cache/MemoryCacheStore';

import CacheBasedSessionStore from './CacheBasedSessionStore';
import { type SessionStore } from './SessionStore';

const MINUTES_IN_ONE_YEAR = 365 * 24 * 60;

export default class MemorySessionStore extends CacheBasedSessionStore
  implements SessionStore {
  constructor(max: number, expiresIn: number) {
    const cache = new MemoryCacheStore(max);
    super(cache, expiresIn || MINUTES_IN_ONE_YEAR);
  }
}
