export interface CacheStore {
  get(key: string): Promise<mixed>;
  all(): Promise<Array<mixed>>;
  put(key: string, value: mixed, minutes: number): Promise<void>;
  forget(key: string): Promise<void>;
  flush(): Promise<void>;
  getPrefix(): string;
}
