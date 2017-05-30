import _debug from 'debug';

import SessionManager from '../session/SessionManager';
import MongoSessionStore from '../session/MongoSessionStore';
import resolve from '../database/resolve';

const debug = _debug('core/bot/Bot');

export default class Bot {
  constructor({ connector }) {
    this._sessionManager = new SessionManager(new MongoSessionStore());
    this._initialized = false;
    this._connector = connector;
  }

  get connector() {
    return this._connector;
  }

  get sessionManager() {
    return this._sessionManager;
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

      const platform = this._connector.platform;

      if (!this._initialized) {
        await this._sessionManager.init();
        this._initialized = true;
      }

      const senderId = this._connector.getSenderIdFromRequest(request);

      const sessionKey = `${platform}:${senderId}`;

      const {
        sessionData,
        existed,
      } = await this._sessionManager.createSessionDataIfNotExists(sessionKey);

      if (!existed) {
        const data = await this._connector.getUserProfile(senderId);
        const user = {
          ...data,
          id: senderId,
          platform: this._connector.platform,
        };

        sessionData.user = user;

        const db = await resolve();
        const users = await db.collection('users');
        users.insert(user);
      }

      await this._connector.handleRequest({ request, sessionData });
      this._sessionManager.saveSessionData(sessionKey, sessionData);

      response.status = 200;
    };
  }
}
