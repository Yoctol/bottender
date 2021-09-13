import warning from 'warning';

import SessionStore from '../session/SessionStore';

import getBottenderConfig from './getBottenderConfig';

function getSessionStore(): SessionStore {
  const { session } = getBottenderConfig();

  const sessionDriver = (session && session.driver) || 'memory';

  const storesConfig = (session && session.stores) || {};

  switch (sessionDriver) {
    case 'memory': {
      const MemorySessionStore =
        require('../session/MemorySessionStore').default;

      return new MemorySessionStore(
        storesConfig.memory || {},
        session && session.expiresIn
      );
    }
    case 'file': {
      const FileSessionStore = require('../session/FileSessionStore').default;

      return new FileSessionStore(
        storesConfig.file || {},
        session && session.expiresIn
      );
    }
    case 'mongo': {
      const MongoSessionStore = require('../session/MongoSessionStore').default;

      return new MongoSessionStore(
        storesConfig.mongo || {},
        session && session.expiresIn
      );
    }
    case 'redis': {
      const RedisSessionStore = require('../session/RedisSessionStore').default;

      return new RedisSessionStore(
        storesConfig.redis || {},
        session && session.expiresIn
      );
    }
    default: {
      // Support custom session stores by returning the session store instance
      const customSessionStore: SessionStore | undefined = (
        storesConfig as any
      )[sessionDriver];
      if (customSessionStore) {
        return customSessionStore;
      }

      warning(
        false,
        `Received unknown driver: ${sessionDriver}, so fallback it to \`memory\` driver.`
      );
      const MemorySessionStore =
        require('../session/MemorySessionStore').default;

      return new MemorySessionStore(
        storesConfig.memory || {},
        session && session.expiresIn
      );
    }
  }
}

export default getSessionStore;
