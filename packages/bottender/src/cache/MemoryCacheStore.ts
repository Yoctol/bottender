import LRU from 'lru-cache';
import cloneDeep from 'lodash/cloneDeep';
import { CacheStore, CacheValue } from '@bottender/core';

export default class MemoryCacheStore<T extends CacheValue = CacheValue>
  implements CacheStore<T>
{
  private lru: LRU<string, T>;

  /**
   * Create a memory cache store.
   *
   * @param max - the maximum size of the cache
   */
  constructor(max?: number);

  /**
   * Create a memory cache store.
   *
   * @param options - the LRU options
   */
  constructor(options?: LRU.Options<string, T>);

  constructor(maxOrOptions?: number | LRU.Options<string, T>) {
    this.lru =
      typeof maxOrOptions === 'number'
        ? new LRU({ max: maxOrOptions })
        : new LRU(maxOrOptions);
  }

  /**
   * Retrieve an item from the cache by key.
   *
   * @param key - cache key
   */
  public async get(key: string): Promise<T | undefined> {
    const _value = this.lru.get(key);

    // cloneDeep: To make sure read as different object to prevent
    // reading same key multiple times, causing freezed by other events.
    const value = typeof _value === 'object' ? cloneDeep(_value) : _value;

    return value;
  }

  /**
   * Get all of the cache data.
   *
   * @returns all of the cache data
   */
  public async all(): Promise<T[]> {
    return this.lru.values();
  }

  /**
   * Store an item in the cache for a given number of seconds.
   *
   * @param key - cache key
   * @param value - cache value
   * @param minutes - minutes to cache
   */
  public async put(key: string, value: T, minutes: number): Promise<void> {
    // cloneDeep: To make sure save as writable object
    const val = value && typeof value === 'object' ? cloneDeep(value) : value;

    if (minutes) {
      this.lru.set(key, val, minutes * 60 * 1000);
    } else {
      this.lru.set(key, val);
    }
  }

  /**
   * Remove an item from the cache storage.
   *
   * @param key - cache key
   */
  public async forget(key: string): Promise<void> {
    this.lru.del(key);
  }

  /**
   * Remove all items from the cache storage.
   */
  public async flush(): Promise<void> {
    this.lru.reset();
  }

  /**
   * Get the cache key prefix.
   *
   * @returns the cache key prefix
   */
  public getPrefix(): string {
    return '';
  }
}
