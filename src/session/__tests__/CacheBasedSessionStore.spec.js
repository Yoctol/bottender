import CacheBasedSessionStore from '../CacheBasedSessionStore';

async function createSessionStore() {
  const cache = {
    get: jest.fn(),
    put: jest.fn(),
    forget: jest.fn(),
  };

  const store = new CacheBasedSessionStore(cache);
  await store.init();
  return {
    store,
    cache,
  };
}

it('should call cache get with key when read', async () => {
  const { store, cache } = await createSessionStore();

  await store.read('yoctol:1');

  expect(cache.get).toBeCalledWith('yoctol:1');
});

it('should call cache put with key when write', async () => {
  const { store, cache } = await createSessionStore();
  const sess = {};

  await store.write('yoctol:1', sess, 100);

  expect(cache.put).toBeCalledWith('yoctol:1', sess, 100);
});

it('should call cache forget with key when destroy', async () => {
  const { store, cache } = await createSessionStore();

  await store.destroy('yoctol:1');

  expect(cache.forget).toBeCalledWith('yoctol:1');
});
