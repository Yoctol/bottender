/* @flow */

export interface CacheStore {
  get(key: string): Promise<mixed>;
  put(key: string, value: mixed, minutes: number): Promise<void>;
  forget(key: string): Promise<void>;
  flush(): Promise<void>;
  getPrefix(): string;
}
