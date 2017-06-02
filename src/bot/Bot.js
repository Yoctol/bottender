import _debug from 'debug';

import MemoryCacheStore from '../cache/MemoryCacheStore';
import CacheBasedSessionStore from '../session/CacheBasedSessionStore';
import SessionData from '../session/SessionData';

const debug = _debug('core/bot/Bot');

function createMemorySessionStore() {
  const cache = new MemoryCacheStore(500);
  return new CacheBasedSessionStore(cache);
}

export default class Bot {
  constructor({ connector, sessionHandler = createMemorySessionStore() }) {
    this._sessions = sessionHandler;
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

  createExpressMiddleware() {
    if (!this._connector.hasHandler) {
      throw new Error('must have at least 1 handler');
    }

    return async (req, res) => {
      debug(JSON.stringify(req.body, null, 2));

      if (!this._initialized) {
        await this._sessions.init();
        this._initialized = true;
      }

      const platform = this._connector.platform;
      const senderId = this._connector.getSenderIdFromRequest(req);

      const sessionKey = `${platform}:${senderId}`;

      const session = await this._sessions.get(sessionKey);
      const sessionData = new SessionData(session);

      if (!sessionData.user) {
        const user = {
          ...(await this._connector.getUserProfile(senderId)),
          id: senderId,
          platform: this._connector.platform,
        };

        sessionData.user = user;
      }

      await this._connector.handleRequest({ request: req, sessionData });
      this._sessions.save(sessionKey, sessionData);

      res.sendStatus(200);
    };
  }

  createKoaMiddleware() {
    if (!this._connector.hasHandler) {
      throw new Error('must have at least 1 handler');
    }

    return async ({ request, response }) => {
      debug(JSON.stringify(request.body, null, 2));

      if (!this._initialized) {
        await this._sessions.init();
        this._initialized = true;
      }

      const platform = this._connector.platform;
      const senderId = this._connector.getSenderIdFromRequest(request);

      const sessionKey = `${platform}:${senderId}`;

      const session = await this._sessions.get(sessionKey);
      const sessionData = new SessionData(session);

      if (!sessionData.user) {
        const user = {
          ...(await this._connector.getUserProfile(senderId)),
          id: senderId,
          platform: this._connector.platform,
        };

        sessionData.user = user;
      }

      await this._connector.handleRequest({ request, sessionData });
      this._sessions.save(sessionKey, sessionData);

      response.status = 200;
    };
  }
}
