import MemoryCacheStore from '../MemoryCacheStore';

describe('#get', () => {
  it('should get cache value when value exists', async () => {
    const store = new MemoryCacheStore(5);

    await store.put('x', 'abc', 5);
    expect(await store.get('x')).toBe('abc');
  });

  it('should get null when value does not exist', async () => {
    const store = new MemoryCacheStore(5);

    expect(await store.get('x')).toBeNull();
  });
});

describe('#put', () => {
  xit('should store cache item for a given number of minutes', async () => {
    jest.useFakeTimers();

    const store = new MemoryCacheStore(5);

    await store.put('x', 1, 5);
    expect(await store.get('x')).toBe(1);

    jest.runTimersToTime(6 * 60 * 1000);

    expect(await store.get('x')).toBeNull();
  });

  it('can store mixed data types', async () => {
    const store = new MemoryCacheStore(5);

    await store.put('x', 1, 5);
    expect(await store.get('x')).toBe(1);

    await store.put('x', 'abc', 5);
    expect(await store.get('x')).toBe('abc');

    await store.put('x', true, 5);
    expect(await store.get('x')).toBe(true);

    await store.put('x', { x: 1 }, 5);
    expect(await store.get('x')).toEqual({ x: 1 });

    await store.put('x', [{ x: 1 }], 5);
    expect(await store.get('x')).toEqual([{ x: 1 }]);
  });
});

describe('#forget', () => {
  it('should remove specified item from the cache', async () => {
    const store = new MemoryCacheStore(5);

    await store.put('x', 1, 5);
    await store.put('y', 2, 5);
    await store.forget('x');

    expect(await store.get('x')).toBeNull();
    expect(await store.get('y')).toBe(2);
  });
});

describe('#flush', () => {
  it('should remove all items from the cache', async () => {
    const store = new MemoryCacheStore(5);

    await store.put('x', 1, 5);
    await store.put('y', 2, 5);
    await store.flush();

    expect(await store.get('x')).toBeNull();
    expect(await store.get('y')).toBeNull();
  });
});

describe('#getPrefix', () => {
  it('should have empty prefix', async () => {
    const store = new MemoryCacheStore(5);

    expect(store.getPrefix()).toBe('');
  });
});
