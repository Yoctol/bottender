export type CacheValue = number | Record<string, any>;

type CacheStore = {
  get(key: string): Promise<CacheValue | null>;

  all(): Promise<CacheValue[]>;

  put(key: string, value: CacheValue, minutes: number): Promise<void>;

  forget(key: string): Promise<void>;

  flush(): Promise<void>;

  getPrefix(): string;
};

export default CacheStore;
