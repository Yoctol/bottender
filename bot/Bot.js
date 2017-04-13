import _debug from 'debug';

import SessionManager from '../session/SessionManager';
import PersistentMemorySessionStore
  from '../session/PersistentMemorySessionStore';
import { resolveScoped } from '../database/resolve';

const debug = _debug('core/bot/Bot');

export default class Bot {
  constructor({ id, filePath }) {
    this._id = id;
    this._sessionManager = new SessionManager(
      new PersistentMemorySessionStore(filePath, 500),
    );
    this._initialized = false;
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
        await this._sessionManager.init();
        this._initialized = true;
      }

      const senderId = this._connector.getSenderIdFromRequest();

      const {
        sessionData,
        existed,
      } = await this._sessionManager.createSessionDataIfNotExists(senderId);

      if (!existed) {
        const data = await this._connector.getUserProfile(senderId);
        sessionData.user = {
          ...data,
          id: senderId,
        };
      }

      const db = await resolveScoped(this._id);

      await this._connector.handleRequest({ request, sessionData, db });

      this._sessionManager.saveSessionData(senderId, sessionData);

      response.status = 200;
    };
  }
}
