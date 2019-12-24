import IORedis from 'ioredis';
import isNumber from 'lodash/isNumber';

import CacheStore, { CacheValue } from './CacheStore';

export default class RedisCacheStore implements CacheStore {
  _redis: IORedis.Redis;

  _prefix = '';

  /*
    Support all of args supported by `ioredis`:
    - new Redis()       // Connect to 127.0.0.1:6379
    - new Redis(6380)   // 127.0.0.1:6380
    - new Redis(6379, '192.168.1.1')        // 192.168.1.1:6379
    - new Redis('/tmp/redis.sock')
    - new Redis({
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        password: 'auth',
        db: 0
      })
    // Connect to 127.0.0.1:6380, db 4, using password "authpassword"
    - new Redis('redis://:authpassword@127.0.0.1:6380/4')
  */
  constructor(...args: any) {
    this._redis = new IORedis(...args);
  }

  async get(key: string): Promise<CacheValue | null> {
    const val = await this._redis.get(`${this._prefix}${key}`);
    if (val) {
      return this._unserialize(val);
    }
    return null;
  }

  async all(): Promise<CacheValue[]> {
    let [cursor, keys] = await this._redis.scan(0);

    while (cursor !== '0') {
      /* eslint-disable no-await-in-loop */
      const [nextCursor, newkeys] = await this._redis.scan(Number(cursor));
      cursor = nextCursor;
      keys = keys.concat(newkeys);
    }

    return this._redis.mget(...keys);
  }

  async put(key: string, value: CacheValue, minutes: number): Promise<void> {
    if (minutes) {
      await this._redis.setex(
        `${this._prefix}${key}`,
        minutes * 60,
        this._serialize(value)
      );
    } else {
      await this._redis.set(`${this._prefix}${key}`, this._serialize(value));
    }
  }

  async forget(key: string): Promise<void> {
    await this._redis.del(`${this._prefix}${key}`);
  }

  async flush(): Promise<void> {
    await this._redis.flushdb();
  }

  getRedis(): IORedis.Redis {
    return this._redis;
  }

  getPrefix(): string {
    return this._prefix;
  }

  setPrefix(prefix: string): void {
    this._prefix = prefix ? `${prefix}:` : '';
  }

  _serialize(value: CacheValue): number | string {
    return isNumber(value) ? value : JSON.stringify(value);
  }

  _unserialize(value: number | string): CacheValue {
    return isNumber(value) ? value : JSON.parse(value);
  }
}
