import MemoryCacheStore from '../MemoryCacheStore';

jest.mock('quick-lru', () => jest.fn(() => {}));

const LRU = require('quick-lru');

beforeEach(() => {
  jest.resetAllMocks();

  const LRUMock = {
    get: jest.fn(),
    set: jest.fn(),
    forget: jest.fn(),
    delete: jest.fn(),
    clear: jest.fn(),
  };

  LRU.mockImplementation(() => LRUMock);
});

it('new LRU instance', () => {
  const store = new MemoryCacheStore(5); // eslint-disable-line no-unused-vars

  expect(LRU).toBeCalledWith({ maxSize: 5 });
  expect(LRU.mock.instances.length).toBe(1);
});

it('get', async () => {
  const store = new MemoryCacheStore(5);

  store._lru.get.mockReturnValueOnce(Promise.resolve({ aaa: 456 }));

  expect(LRU.mock.instances.length).toBe(1);
  expect(await store.get('123')).toEqual({ aaa: 456 });
});

it('put', async () => {
  jest.useFakeTimers();
  const store = new MemoryCacheStore(5);
  store.forget = jest.fn();

  await store.put('123', { aaa: 456 }, 5);

  expect(LRU.mock.instances.length).toBe(1);
  expect(store._lru.set).toBeCalledWith('123', { aaa: 456 });

  jest.runTimersToTime(5 * 60 * 1000);
  expect(store.forget).toBeCalledWith('123');
});

it('forget', async () => {
  const store = new MemoryCacheStore(5);

  await store.forget('123');

  expect(LRU.mock.instances.length).toBe(1);
  expect(store._lru.delete).toBeCalledWith('123');
});

it('flush', async () => {
  const store = new MemoryCacheStore(5);

  await store.flush();

  expect(LRU.mock.instances.length).toBe(1);
  expect(store._lru.clear).toBeCalled();
});

it('getPrefix', async () => {
  const store = new MemoryCacheStore(5);

  expect(LRU.mock.instances.length).toBe(1);
  expect(store.getPrefix()).toEqual('');
});
