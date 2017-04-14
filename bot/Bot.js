import _debug from 'debug';

import SessionManager from '../session/SessionManager';
import PersistentMemorySessionStore
  from '../session/PersistentMemorySessionStore';
import { resolveScoped } from '../database/resolve';

const debug = _debug('core/bot/Bot');

export default class Bot {
  constructor({ id, filePath, connector }) {
    this._id = id;
    this._sessionManager = new SessionManager(
      new PersistentMemorySessionStore(filePath, 500),
    );
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

      const db = await resolveScoped(this._id);

      if (db && typeof db.collection === 'function') {
        const logs = await db.collection('logs');
        logs.insert({
          platform: this._connector.platform,
          body: request.body,
        });
      }

      if (!this._initialized) {
        await this._sessionManager.init();
        this._initialized = true;
      }

      const senderId = this._connector.getSenderIdFromRequest(request);

      const {
        sessionData,
        existed,
      } = await this._sessionManager.createSessionDataIfNotExists(senderId);

      if (!existed) {
        const data = await this._connector.getUserProfile(senderId);

        const users = await db.collection('users');
        const user = {
          ...data,
          id: senderId,
          platform: this._connector.platform,
        };

        sessionData.user = user;
        users.insert(user);
      }

      await this._connector.handleRequest({ request, sessionData, db });
      this._sessionManager.saveSessionData(senderId, sessionData);

      response.status = 200;
    };
  }
}
