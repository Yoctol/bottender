import MemorySessionStore from '../MemorySessionStore';
import CacheBasedSessionStore from '../CacheBasedSessionStore';

it('should be instanceof CacheBasedSessionStore', () => {
  expect(new MemorySessionStore()).toBeInstanceOf(CacheBasedSessionStore);
  expect(new MemorySessionStore(500)).toBeInstanceOf(CacheBasedSessionStore);
});
