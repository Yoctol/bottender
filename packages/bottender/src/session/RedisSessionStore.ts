import RedisCacheStore from '../cache/RedisCacheStore';

import CacheBasedSessionStore from './CacheBasedSessionStore';
import SessionStore from './SessionStore';

type RedisOption =
  | number
  | string
  | {
      port?: number;
      host?: string;
      family?: number;
      password?: string;
      db?: number;
    };

export default class RedisSessionStore extends CacheBasedSessionStore
  implements SessionStore {
  constructor(arg: RedisOption, expiresIn?: number) {
    const cache = new RedisCacheStore(arg);
    super(cache, expiresIn);
  }
}
