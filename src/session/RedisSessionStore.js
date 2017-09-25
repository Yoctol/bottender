/* @flow */

import RedisCacheStore from '../cache/RedisCacheStore';

import CacheBasedSessionStore from './CacheBasedSessionStore';
import type { SessionStore } from './SessionStore';

const MINUTES_IN_ONE_YEAR = 365 * 24 * 60;

type RedisOption =
  | number
  | string
  | {
      port?: number,
      host?: string,
      family?: number,
      password?: string,
      db?: number,
    };

export default class RedisSessionStore extends CacheBasedSessionStore
  implements SessionStore {
  constructor(arg: RedisOption, expiresIn: number) {
    const cache = new RedisCacheStore(arg);
    super(cache, expiresIn || MINUTES_IN_ONE_YEAR);
  }
}
