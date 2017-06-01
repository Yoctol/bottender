import Redis from 'ioredis';

export default class RedisCacheStore {
  constructor() {
    this._redis = new Redis();
  }

  async get(key) {
    const val = await this._redis.get(key);
    return this._unserialize(val);
  }

  async put(key, value, minutes) {
    await this._redis.setex(key, minutes * 60, this._serialize(value));
  }

  async forget(key) {
    await this._redis.del(key);
  }

  async flush() {
    await this._redis.flushdb();
  }

  getPrefix() {
    return '';
  }

  _serialize(value) {
    return value ? JSON.stringify(value) : value;
  }

  _unserialize(value) {
    return value ? JSON.parse(value) : value;
  }
}
