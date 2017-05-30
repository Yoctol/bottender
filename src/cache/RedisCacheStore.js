import Redis from 'ioredis';

export default class RedisCacheStore {
  construct(maxSize) {
    this._redis = new Redis();
  }

  get(key) {
    return this._redis.get(key);
  }

  put(key, value, minutes) {
    this._redis.setex(key, minutes * 60, value);
  }

  forget(key) {
    this._redis.del(key);
  }

  flush() {
    this._redis.flushdb();
  }

  getPrefix() {
    return '';
  }
}
