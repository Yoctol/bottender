import IORedis from 'ioredis';

import RedisCacheStore from '../cache/RedisCacheStore';

import CacheBasedSessionStore from './CacheBasedSessionStore';
import SessionStore from './SessionStore';

export default class RedisSessionStore
  extends CacheBasedSessionStore
  implements SessionStore
{
  constructor(arg: IORedis.RedisOptions, expiresIn?: number) {
    const cache = new RedisCacheStore(arg);
    super(cache, expiresIn);
  }
}
