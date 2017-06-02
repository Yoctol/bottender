import CacheBasedSessionStore from '../CacheBasedSessionStore';

// FIXME: rewrite due to reimplementation

xit('should be initialized successfully', async () => {
  const store = new CacheBasedSessionStore();
  expect(await store.init()).toBe(store);
});

xit('should handle multiple types', async () => {
  const store = new CacheBasedSessionStore();
  await store.init();
  const six = {};
  await store.set('1', undefined);
  await store.set('2', null);
  await store.set('3', true);
  await store.set('4', 4);
  await store.set('5', '5');
  await store.set('6', six);
  expect(await store.get('1')).toBeUndefined();
  expect(await store.get('2')).toBeNull();
  expect(await store.get('3')).toBe(true);
  expect(await store.get('4')).toBe(4);
  expect(await store.get('5')).toBe('5');
  expect(await store.get('6')).toBe(six);
});

xit('should remove data from store when destroy be called', async () => {
  const store = new CacheBasedSessionStore();
  await store.init();
  await store.set('1', 1);
  await store.set('2', 2);
  await store.set('3', 3);
  await store.destroy('2');
  expect(await store.get('1')).toBe(1);
  expect(await store.get('2')).toBeUndefined();
  expect(await store.get('3')).toBe(3);
});

xit(
  'should have the same behavior as set when save memory session',
  async () => {
    const store = new CacheBasedSessionStore();
    await store.init();
    const six = {};
    await store.save('1', undefined);
    await store.save('2', null);
    await store.save('3', true);
    await store.save('4', 4);
    await store.save('5', '5');
    await store.save('6', six);
    expect(await store.get('1')).toBeUndefined();
    expect(await store.get('2')).toBeNull();
    expect(await store.get('3')).toBe(true);
    expect(await store.get('4')).toBe(4);
    expect(await store.get('5')).toBe('5');
    expect(await store.get('6')).toBe(six);
  }
);
