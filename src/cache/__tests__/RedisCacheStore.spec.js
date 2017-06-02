import RedisCacheStore from '../RedisCacheStore';

jest.mock('ioredis', () => jest.fn(() => {}));

const Redis = require('ioredis');

beforeEach(() => {
  jest.resetAllMocks();

  const RedisMock = {
    get: jest.fn(),
    setex: jest.fn(),
    del: jest.fn(),
    flushdb: jest.fn(),
  };

  Redis.mockImplementation(() => RedisMock);
});

it('new Redis instance', () => {
  const store = new RedisCacheStore(); // eslint-disable-line no-unused-vars

  expect(Redis.mock.instances.length).toBe(1);
});

it('get', async () => {
  const store = new RedisCacheStore();

  store._redis.get.mockReturnValueOnce(Promise.resolve('{"aaa":456}'));

  expect(Redis.mock.instances.length).toBe(1);
  expect(await store.get('123')).toEqual({ aaa: 456 });
});

it('get nothing', async () => {
  const store = new RedisCacheStore();

  store._redis.get.mockReturnValueOnce(Promise.resolve(null));

  expect(Redis.mock.instances.length).toBe(1);
  expect(await store.get('123')).toEqual(null);
});

it('put', async () => {
  const store = new RedisCacheStore();

  await store.put('123', { aaa: 456 }, 5);

  expect(Redis.mock.instances.length).toBe(1);
  expect(store._redis.setex).toBeCalledWith('123', 300, '{"aaa":456}');
});

it('put nothing', async () => {
  const store = new RedisCacheStore();

  await store.put('123', null, 5);

  expect(Redis.mock.instances.length).toBe(1);
  expect(store._redis.setex).toBeCalledWith('123', 300, null);
});

it('forget', async () => {
  const store = new RedisCacheStore();

  await store.forget('123');

  expect(Redis.mock.instances.length).toBe(1);
  expect(store._redis.del).toBeCalledWith('123');
});

it('flush', async () => {
  const store = new RedisCacheStore();

  await store.flush();

  expect(Redis.mock.instances.length).toBe(1);
  expect(store._redis.flushdb).toBeCalled();
});

it('getPrefix', async () => {
  const store = new RedisCacheStore();

  expect(Redis.mock.instances.length).toBe(1);
  expect(store.getPrefix()).toEqual('');
});
