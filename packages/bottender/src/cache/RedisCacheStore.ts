import IORedis from 'ioredis';
import isNumber from 'lodash/isNumber';
import { CacheStore, CacheValue } from '@bottender/core';

export default class RedisCacheStore<T extends CacheValue = CacheValue>
  implements CacheStore<T>
{
  private redis: IORedis.Redis;

  private prefix = '';

  /**
   * Create a Redis cache store.
   *
   * @example
   * ```js
   * new RedisCacheStore()   // 127.0.0.1:6379
   * ```
   */
  constructor();

  /**
   * Create a Redis cache store.
   *
   * @param options - the Redis options
   * @example
   * ```js
   * new RedisCacheStore(6380)   // 127.0.0.1:6380
   * new RedisCacheStore(6379, '192.168.1.1')        // 192.168.1.1:6379
   * ```
   */
  constructor(port: number, host?: string, options?: IORedis.RedisOptions);

  /**
   * Create a Redis cache store.
   *
   * @param options - the Redis options
   * @example
   * ```js
   * new RedisCacheStore('/tmp/redis.sock')
   * // Connect to 127.0.0.1:6380, db 4, using password "authpassword"
   * new RedisCacheStore('redis://:authpassword@127.0.0.1:6380/4')
   * ```
   */
  constructor(host: string, options?: IORedis.RedisOptions);

  /**
   * Create a Redis cache store.
   *
   * @param options - the Redis options
   * @example
   * ```js
   * new RedisCacheStore({
   *   port: 6379,          // Redis port
   *   host: '127.0.0.1',   // Redis host
   *   family: 4,           // 4 (IPv4) or 6 (IPv6)
   *   password: 'auth',
   *   db: 0,
   * })
   * ```
   */
  constructor(options: IORedis.RedisOptions);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...args: any[]) {
    this.redis = new IORedis(...args);
  }

  /**
   * Retrieve an item from the cache by key.
   *
   * @param key - cache key
   */
  public async get(key: string): Promise<T | undefined> {
    const val = await this.redis.get(`${this.prefix}${key}`);
    if (!val) {
      return;
    }
    return this.unserialize(val);
  }

  /**
   * Get all of the cache data.
   *
   * @returns all of the cache data
   */
  public async all(): Promise<T[]> {
    let [cursor, keys] = await this.redis.scan(0);

    while (cursor !== '0') {
      /* eslint-disable no-await-in-loop */
      const [nextCursor, newkeys] = await this.redis.scan(Number(cursor));
      cursor = nextCursor;
      keys = keys.concat(newkeys);
    }

    const values = await this.redis.mget(...keys);

    if (!values) return [];

    return values
      .filter((val): val is string => val !== null)
      .map((val) => this.unserialize(val));
  }

  /**
   * Store an item in the cache for a given number of seconds.
   *
   * @param key - cache key
   * @param value - cache value
   * @param minutes - minutes to cache
   */
  public async put(key: string, value: T, minutes: number): Promise<void> {
    if (minutes) {
      await this.redis.setex(
        `${this.prefix}${key}`,
        minutes * 60,
        this.serialize(value)
      );
    } else {
      await this.redis.set(`${this.prefix}${key}`, this.serialize(value));
    }
  }

  /**
   * Remove an item from the Redis.
   *
   * @param key - cache key
   */
  public async forget(key: string): Promise<void> {
    await this.redis.del(`${this.prefix}${key}`);
  }

  /**
   * Remove all items from the Redis.
   */
  public async flush(): Promise<void> {
    await this.redis.flushdb();
  }

  /**
   * Get the underlying Redis instance.
   *
   * @returns ioredis instance
   */
  public getRedis(): IORedis.Redis {
    return this.redis;
  }

  /**
   * Get the cache key prefix.
   *
   * @returns the cache key prefix
   */
  public getPrefix(): string {
    return this.prefix;
  }

  /**
   * Set the cache key prefix.
   *
   * @param prefix - the cache key prefix
   */
  public setPrefix(prefix: string): void {
    this.prefix = prefix ? `${prefix}:` : '';
  }

  private serialize(value: T): number | string {
    return isNumber(value) ? value : JSON.stringify(value);
  }

  private unserialize(value: number | string): T {
    return isNumber(value) ? value : JSON.parse(value);
  }
}
