import _debug from 'debug';

import MemoryCacheStore from '../cache/MemoryCacheStore';
import CacheBasedSessionStore from '../session/CacheBasedSessionStore';
import Session from '../session/Session';

const debug = _debug('core/bot/Bot');

const MINUTES_IN_ONE_YEAR = 365 * 24 * 60;

function createMemorySessionStore() {
  const cache = new MemoryCacheStore(500);
  return new CacheBasedSessionStore(cache);
}

export default class Bot {
  constructor({ connector, sessionStore = createMemorySessionStore() }) {
    this._sessions = sessionStore;
    this._initialized = false;
    this._connector = connector;
  }

  get connector() {
    return this._connector;
  }

  get sessions() {
    return this._sessions;
  }

  handle(handler) {
    this._connector.setHandler(handler);
  }

  createRequestHandler() {
    if (!this._connector.hasHandler) {
      throw new Error(
        'Bot: Missing event handler function. You should assign it using handle(...)'
      );
    }

    return async body => {
      debug(JSON.stringify(body, null, 2));

      if (!this._initialized) {
        await this._sessions.init();
        this._initialized = true;
      }

      const platform = this._connector.platform;
      const senderId = this._connector.getSenderIdFromRequest(body);

      const sessionKey = `${platform}:${senderId}`;

      const data = await this._sessions.read(sessionKey);
      const session = new Session(data);

      if (!session.user) {
        const user = {
          ...(await this._connector.getUserProfile(senderId)),
          id: senderId,
          platform: this._connector.platform,
        };

        session.user = user;
      }

      await this._connector.handleRequest({ body, session });

      this._sessions.write(sessionKey, session, MINUTES_IN_ONE_YEAR);
    };
  }
}
