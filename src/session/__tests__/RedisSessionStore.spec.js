import CacheBasedSessionStore from '../CacheBasedSessionStore';
import RedisSessionStore from '../RedisSessionStore';

it('should be instanceof CacheBasedSessionStore', () => {
  expect(new RedisSessionStore(6379)).toBeInstanceOf(CacheBasedSessionStore);
  expect(
    new RedisSessionStore({
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      family: 4, // 4 (IPv4) or 6 (IPv6)
      password: 'auth',
      db: 0,
    })
  ).toBeInstanceOf(CacheBasedSessionStore);
  expect(
    new RedisSessionStore('redis://:authpassword@127.0.0.1:6380/4')
  ).toBeInstanceOf(CacheBasedSessionStore);
});
