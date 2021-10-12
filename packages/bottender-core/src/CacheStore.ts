import { JsonObject } from 'type-fest';

export type CacheValue = number | string | JsonObject;

export default interface CacheStore<T extends CacheValue = CacheValue> {
  /**
   * Retrieve an item from the cache by key.
   *
   * @param key - cache key
   */
  get(key: string): Promise<T | undefined>;

  /**
   * Get all of the cache data.
   *
   * @returns all of the cache data
   */
  all(): Promise<T[]>;

  /**
   * Store an item in the cache for a given number of seconds.
   *
   * @param key - cache key
   * @param value - cache value
   * @param minutes - minutes to cache
   */
  put(key: string, value: T, minutes: number): Promise<void>;

  /**
   * Remove an item from the cache storage.
   *
   * @param key - cache key
   */
  forget(key: string): Promise<void>;

  /**
   * Remove all items from the cache storage.
   */
  flush(): Promise<void>;

  /**
   * Get the cache key prefix.
   *
   * @returns the cache key prefix
   */
  getPrefix(): string;
}
