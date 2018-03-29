import CacheBasedSessionStore from '../CacheBasedSessionStore';

const expiresIn = 10;

function setup() {
  const cache = {
    get: jest.fn(),
    put: jest.fn(),
    forget: jest.fn(),
    flush: jest.fn(),
    getPrefix: jest.fn(),
  };

  const store = new CacheBasedSessionStore(cache, expiresIn);
  return {
    store,
    cache,
  };
}

describe('#init', () => {
  it('should return initialize store instance', async () => {
    const { store } = setup();

    expect(await store.init()).toBe(store);
  });
});

describe('#read', () => {
  it('should call cache get with key', async () => {
    const { store, cache } = setup();
    await store.init();

    cache.get.mockResolvedValue({ x: 1 });

    expect(await store.read('yoctol:1')).toEqual({ x: 1 });
    expect(cache.get).toBeCalledWith('yoctol:1');
  });
});

describe('#write', () => {
  it('should call cache put with key, value, and expiresIn', async () => {
    const { store, cache } = setup();
    await store.init();

    const sess = { x: 1 };

    await store.write('yoctol:1', sess, expiresIn);

    expect(cache.put).toBeCalledWith('yoctol:1', sess, expiresIn);
  });
});

describe('#destroy', () => {
  it('should call cache forget with key', async () => {
    const { store, cache } = setup();
    await store.init();

    await store.destroy('yoctol:1');

    expect(cache.forget).toBeCalledWith('yoctol:1');
  });
});
