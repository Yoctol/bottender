/* @flow */
import Redis from 'ioredis';
import { isNumber } from 'lodash';

export default class RedisCacheStore {
  _redis: Redis;

  _prefix: string = '';

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
    this._redis = new Redis(...args);
  }

  async get(key: string): Promise<mixed> {
    const val = await this._redis.get(`${this._prefix}${key}`);
    return this._unserialize(val);
  }

  async put(key: string, value: mixed, minutes: number): Promise<void> {
    await this._redis.setex(
      `${this._prefix}${key}`,
      minutes * 60,
      this._serialize(value)
    );
  }

  async forget(key: string): Promise<void> {
    await this._redis.del(`${this._prefix}${key}`);
  }

  async flush(): Promise<void> {
    await this._redis.flushdb();
  }

  getRedis(): Redis {
    return this._redis;
  }

  getPrefix(): string {
    return this._prefix;
  }

  setPrefix(prefix: string): void {
    this._prefix = prefix ? `${prefix}:` : '';
  }

  _serialize(value: mixed) {
    return isNumber(value) ? value : JSON.stringify(value);
  }

  _unserialize(value: mixed) {
    return isNumber(value) ? value : JSON.parse((value: any));
  }
}
