import Redis from 'ioredis';

import RedisCacheStore from '../RedisCacheStore';

describe('#constructor', () => {
  it('can call without any arguments', () => {
    const store = new RedisCacheStore(); // eslint-disable-line no-unused-vars

    expect(Redis).toBeCalledWith();
  });

  it('can call with port', () => {
    const store = new RedisCacheStore(6380); // eslint-disable-line no-unused-vars

    expect(Redis).toBeCalledWith(6380);
  });

  it('can call with port and host', () => {
    const store = new RedisCacheStore(6379, '192.168.1.1'); // eslint-disable-line no-unused-vars

    expect(Redis).toBeCalledWith(6379, '192.168.1.1');
  });

  it('can call with .sock', () => {
    const store = new RedisCacheStore('/tmp/redis.sock'); // eslint-disable-line no-unused-vars

    expect(Redis).toBeCalledWith('/tmp/redis.sock');
  });

  it('can call with config object', () => {
    // eslint-disable-next-line no-unused-vars
    const store = new RedisCacheStore({
      port: 6379,
      host: '127.0.0.1',
      family: 4,
      password: 'auth',
      db: 0,
    });

    expect(Redis).toBeCalledWith({
      port: 6379,
      host: '127.0.0.1',
      family: 4,
      password: 'auth',
      db: 0,
    });
  });

  it('can call with url', () => {
    const store = new RedisCacheStore('redis://:authpassword@127.0.0.1:6380/4'); // eslint-disable-line no-unused-vars

    expect(Redis).toBeCalledWith('redis://:authpassword@127.0.0.1:6380/4');
  });
});

describe('#get', () => {
  it('should get cache value when value exists', async () => {
    const store = new RedisCacheStore();
    const redis = store.getRedis();

    redis.get.mockResolvedValueOnce('{"aaa":456}');

    expect(await store.get('123')).toEqual({ aaa: 456 });
    expect(redis.get).toBeCalledWith('123');
  });

  it('should get null when value does not exist', async () => {
    const store = new RedisCacheStore();
    const redis = store.getRedis();

    redis.get.mockResolvedValueOnce(null);

    expect(await store.get('123')).toBeNull();
    expect(redis.get).toBeCalledWith('123');
  });
});

describe('#all', () => {
  it('should get all the values in the sessions', async () => {
    const store = new RedisCacheStore();
    const redis = store.getRedis();

    redis.scan.mockResolvedValueOnce(['0', ['key1', 'key2']]);
    redis.mget.mockResolvedValueOnce([{ id: 1 }, { id: 2 }]);

    const result = await store.all();

    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    expect(redis.scan).toBeCalledWith(0);
  });

  it('should iterate through all the keys in redis', async () => {
    const store = new RedisCacheStore();
    const redis = store.getRedis();

    redis.scan
      .mockResolvedValueOnce(['4', ['key1', 'key2', 'key3', 'key4']])
      .mockResolvedValueOnce(['0', ['key5', 'key6', 'key7', 'key8']]);

    await store.all();

    expect(redis.scan).toBeCalledWith(0);
    expect(redis.scan).toBeCalledWith(4);
  });
});

describe('#put', () => {
  it('should store cache item for a given number of minutes', async () => {
    const store = new RedisCacheStore();
    const redis = store.getRedis();

    await store.put('123', 'xyz', 5);

    expect(redis.setex).toBeCalledWith('123', 300, '"xyz"');
  });

  it('should store cache item', async () => {
    const store = new RedisCacheStore();
    const redis = store.getRedis();

    await store.put('123', 'xyz', 0);

    expect(redis.set).toBeCalledWith('123', '"xyz"');
  });

  it('can store mixed data types', async () => {
    const store = new RedisCacheStore();
    const redis = store.getRedis();

    await store.put('x', 1, 5);
    expect(redis.setex).toHaveBeenLastCalledWith('x', 300, 1);

    await store.put('x', 'abc', 5);
    expect(redis.setex).toHaveBeenLastCalledWith('x', 300, '"abc"');

    await store.put('x', true, 5);
    expect(redis.setex).toHaveBeenLastCalledWith('x', 300, 'true');

    await store.put('x', { x: 1 }, 5);
    expect(redis.setex).toHaveBeenLastCalledWith('x', 300, '{"x":1}');

    await store.put('x', [{ x: 1 }], 5);
    expect(redis.setex).toHaveBeenLastCalledWith('x', 300, '[{"x":1}]');
  });
});

describe('#forget', () => {
  it('should remove specified item from the cache', async () => {
    const store = new RedisCacheStore();
    const redis = store.getRedis();

    await store.forget('123');

    expect(redis.del).toBeCalledWith('123');
  });
});

describe('#flush', () => {
  it('should remove all items from the cache', async () => {
    const store = new RedisCacheStore();
    const redis = store.getRedis();

    await store.flush();

    expect(redis.flushdb).toBeCalled();
  });
});

describe('#getPrefix', () => {
  it('should have initial value empty string', () => {
    const store = new RedisCacheStore();

    expect(store.getPrefix()).toBe('');
  });

  it('should get prefix set by setPrefix', () => {
    const store = new RedisCacheStore();

    store.setPrefix('myprefix');

    expect(store.getPrefix()).toBe('myprefix:');
  });
});
