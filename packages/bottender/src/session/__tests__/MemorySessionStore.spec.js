import CacheBasedSessionStore from '../CacheBasedSessionStore';
import MemorySessionStore from '../MemorySessionStore';

it('should be instanceof CacheBasedSessionStore', () => {
  expect(new MemorySessionStore()).toBeInstanceOf(CacheBasedSessionStore);
  expect(new MemorySessionStore(500)).toBeInstanceOf(CacheBasedSessionStore);
  expect(new MemorySessionStore({ maxSize: 500 })).toBeInstanceOf(
    CacheBasedSessionStore
  );
});
