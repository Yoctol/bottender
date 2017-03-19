import _debug from 'debug';

import LineBotAPIClient from '../graph/LineBotAPIClient';
import Context from '../session/Context';
import SessionManager from '../session/SessionManager';
// import MemorySessionStore from '../session/MemorySessionStore';
import PersistentMemorySessionStore
  from '../session/PersistentMemorySessionStore';
// import DangerousFileSessionStore from '../session/DangerousFileSessionStore';

const debug = _debug('core/bot/LineBot');

export default class LineBot {
  constructor({ accessToken, filePath }) {
    this._lineAPIClient = new LineBotAPIClient(accessToken);
    this._sessionManager = new SessionManager(
      new PersistentMemorySessionStore(filePath, 500),
    );
    this._initialized = false;
  }

  handle(handler) {
    this._handler = handler;
  }

  // {
  //   "events": [
  //     {
  //       "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
  //       "type": "message",
  //       "timestamp": 1462629479859,
  //       "source": {
  //         "type": "user",
  //         "userId": "U206d25c2ea6bd87c17655609a1c37cb8"
  //       },
  //       "message": {
  //         "id": "325708",
  //         "type": "text",
  //         "text": "Hello, world"
  //       }
  //     },
  //     {
  //       "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
  //       "type": "follow",
  //       "timestamp": 1462629479859,
  //       "source": {
  //         "type": "user",
  //         "userId": "U206d25c2ea6bd87c17655609a1c37cb8"
  //       }
  //     }
  //   ]
  // }
  createKoaMiddleware() {
    return async ({ request, response }) => {
      debug(JSON.stringify(request.body, null, 2));

      if (!this._initialized) {
        await this._sessionManager.init();
        this._initialized = true;
      }

      const msg = request.body.events[0];
      const senderId = msg.source.userId;

      const {
        sessionData,
        existed,
      } = await this._sessionManager.createSessionDataIfNotExists(senderId);

      const context = new Context({
        lineAPIClient: this._lineAPIClient,
        data: sessionData,
      });

      if (!existed) {
        const { data } = await this._lineAPIClient.getUserProfile(senderId);
        context.data.user = {
          ...data,
          id: senderId,
        };
      }

      if (!this._handler) {
        throw new Error('must have at least 1 handler');
      }

      this._handler(context, msg);

      response.status = 200;
    };
  }
}
