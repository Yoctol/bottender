import Session from './Session';

export default interface SessionStore {
  /**
   * Initialize the session store.
   *
   * @returns the session store
   */
  init(): Promise<ThisType<SessionStore>>;

  /**
   * Read the session data from the session storage, and returns the results.
   *
   * @param key - session key
   * @returns the session data or undefined
   */
  read(key: string): Promise<Session | undefined>;

  /**
   * Get all of the session data.
   *
   * @returns all of the session data
   */
  all(): Promise<Session[]>;

  /**
   * Replace the given session attributes entirely.
   *
   * @param key - session key
   * @param sess - the session attributes
   */
  write(key: string, sess: Session): Promise<void>;

  /**
   * Remove an item from the session storage.
   *
   * @param key - session key
   */
  destroy(key: string): Promise<void>;

  /**
   * Close the session store.
   */
  // TODO: enable this in v2
  // close(): Promise<void>;
}
