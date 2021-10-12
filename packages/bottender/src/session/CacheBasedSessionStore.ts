import { CacheStore, Session, SessionStore } from '@bottender/core';

export default class CacheBasedSessionStore implements SessionStore {
  private cache: CacheStore<Session>;

  // The number of minutes to store the data in the session.
  private expiresIn: number;

  /**
   * Create a cache-based session store.
   *
   * @param cache - a cache store implementation
   * @param expiresIn - the number of minutes to store the data in the session
   */
  constructor(cache: CacheStore<Session>, expiresIn?: number) {
    this.cache = cache;
    this.expiresIn = expiresIn ?? 0;
  }

  /**
   * Initialize the session store.
   *
   * @returns the session store
   */
  public async init(): Promise<CacheBasedSessionStore> {
    return this;
  }

  /**
   * Read the session data from the session storage, and returns the results.
   *
   * @param key - session key
   * @returns the session data or undefined
   */
  public async read(key: string): Promise<Session | undefined> {
    return this.cache.get(key);
  }

  /**
   * Get all of the session data.
   *
   * @returns all of the session data
   */
  public async all(): Promise<Session[]> {
    return this.cache.all();
  }

  /**
   * Replace the given session attributes entirely.
   *
   * @param key - session key
   * @param sess - the session attributes
   */
  public async write(key: string, sess: Session): Promise<void> {
    return this.cache.put(key, sess, this.expiresIn);
  }

  /**
   * Remove an item from the session storage.
   *
   * @param key - session key
   */
  public async destroy(key: string): Promise<void> {
    return this.cache.forget(key);
  }
}
