import MemorySessionStore from '../session/MemorySessionStore';
import getBottenderConfig from '../shared/getBottenderConfig';
import getSessionStore from '../getSessionStore';
import { SessionDriver } from '../types';

jest.mock('../shared/getBottenderConfig');

const getBottenderConfigMocked = getBottenderConfig as jest.MockedFunction<
  typeof getBottenderConfig
>;

it('should get MemorySessionStore by default', () => {
  getBottenderConfigMocked.mockReturnValueOnce({});
  expect(getSessionStore().constructor.name).toEqual('MemorySessionStore');
});

it('should get MemorySessionStore when assigning memory as driver', () => {
  getBottenderConfigMocked.mockReturnValueOnce({
    session: {
      driver: SessionDriver.Memory,
      stores: {
        memory: {
          maxSize: 500,
        },
      },
    },
  });
  expect(getSessionStore().constructor.name).toEqual('MemorySessionStore');
});

it('should get FileSessionStore when assigning file as driver', () => {
  getBottenderConfigMocked.mockReturnValueOnce({
    session: {
      driver: SessionDriver.File,
      stores: {
        file: {
          dirname: '.sessions',
        },
      },
    },
  });
  expect(getSessionStore().constructor.name).toEqual('FileSessionStore');
});

it('should get MongoSessionStore when assigning mongo as driver', () => {
  getBottenderConfigMocked.mockReturnValueOnce({
    session: {
      driver: SessionDriver.Mongo,
      stores: {
        mongo: {
          url: 'mongodb://localhost:27017',
          collectionName: 'sessions',
        },
      },
    },
  });
  expect(getSessionStore().constructor.name).toEqual('MongoSessionStore');
});

it('should get RedisSessionStore when assigning redis as driver', () => {
  getBottenderConfigMocked.mockReturnValueOnce({
    session: {
      driver: SessionDriver.Redis,
      stores: {
        redis: {
          port: 6379,
          host: '127.0.0.1',
          password: 'auth',
          db: 0,
        },
      },
    },
  });
  expect(getSessionStore().constructor.name).toEqual('RedisSessionStore');
});

it('should get provided SessionStore when assigning custom driver', () => {
  const memory2SessionStore = new MemorySessionStore();

  getBottenderConfigMocked.mockReturnValueOnce({
    session: {
      driver: 'memory2',
      stores: {
        memory2: memory2SessionStore,
      },
    },
  });

  expect(getSessionStore()).toEqual(memory2SessionStore);
});
