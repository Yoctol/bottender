import MemoryCacheStore from '../MemoryCacheStore';

describe('#get', () => {
  it('should get cache value when value exists', async () => {
    const store = new MemoryCacheStore(5);

    await store.put('x', 'abc', 5);

    expect(await store.get('x')).toBe('abc');
  });

  it('should get different object when get multiple times', async () => {
    const store = new MemoryCacheStore(5);

    await store.put('x', { a: 1 }, 5);

    const result1 = await store.get('x');
    const result2 = await store.get('x');

    expect(result1).not.toBe(result2);
    expect(result1).toEqual(result2);
  });

  it('should get null when value does not exist', async () => {
    const store = new MemoryCacheStore(5);

    expect(await store.get('x')).toBeNull();
  });
});

describe('#all', () => {
  it('should get all the values in the sessions', async () => {
    const store = new MemoryCacheStore(5);

    await store.put('x', { id: 1 }, 5);
    await store.put('y', { id: 2 }, 5);

    const result = await store.all();

    expect(result).toEqual([{ id: 2 }, { id: 1 }]);
  });

  it('should return empty array when there is no item in sessions or all of them are expired', async () => {
    const store = new MemoryCacheStore(5);

    const result = await store.all();

    expect(result).toEqual([]);
  });
});

describe('#put', () => {
  it('should store cache item for a given number of minutes', async () => {
    const _now = Date.now;
    Date.now = jest.fn(() => 1234567891011);

    const store = new MemoryCacheStore(5);

    await store.put('x', 1, 5);
    expect(await store.get('x')).toBe(1);

    const now = Date.now();
    Date.now = jest.fn(() => now + 6 * 60 * 1000);

    expect(await store.get('x')).toBeNull();
    Date.now = _now;
  });

  it('should store cache item until it has been removed by LRU', async () => {
    const _now = Date.now;
    Date.now = jest.fn(() => 1234567891011);

    const store = new MemoryCacheStore(5);

    await store.put('x', 1, 0);
    expect(await store.get('x')).toBe(1);

    const now = Date.now();
    Date.now = jest.fn(() => now + 6 * 60 * 1000);

    expect(await store.get('x')).toBe(1);
    Date.now = _now;
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

  it('should not save as readonly', async () => {
    const store = new MemoryCacheStore(5);

    const obj = { x: 1 };
    Object.freeze(obj);

    await store.put('x', obj, 5);
    const writable = await store.get('x');

    writable.x = 2;

    expect(writable.x).toBe(2);
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
