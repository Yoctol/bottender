import _debug from 'debug';

import SessionData from '../session/SessionData';
import MongoSessionStore from '../session/MongoSessionStore';

const debug = _debug('core/bot/Bot');

export default class Bot {
  constructor({ connector }) {
    this._sessions = new MongoSessionStore('mongodb://localhost:27017/toolbot');
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
