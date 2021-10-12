import IORedis from 'ioredis';
import { SessionStore } from '@bottender/core';

import RedisCacheStore from '../cache/RedisCacheStore';

import CacheBasedSessionStore from './CacheBasedSessionStore';

type RedisOption = number | string | IORedis.RedisOptions;

export default class RedisSessionStore
  extends CacheBasedSessionStore
  implements SessionStore
{
  /**
   * Create a Redis-based session store.
   *
   * @param arg - the Redis options
   * @param expiresIn - the number of minutes to store the data in the session
   */
  constructor(arg: RedisOption, expiresIn?: number) {
    // @ts-ignore
    const cache = new RedisCacheStore<Session>(arg);
    super(cache, expiresIn);
  }
}
