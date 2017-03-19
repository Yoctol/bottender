import _debug from 'debug';

import MessengerContext from '../session/MessengerContext';
import SessionManager from '../session/SessionManager';
import PersistentMemorySessionStore
  from '../session/PersistentMemorySessionStore';
// import DangerousFileSessionStore from '../session/DangerousFileSessionStore';

const debug = _debug('core/bot/Bot');

export default class Bot {
  constructor({ graphAPIClient, filePath }) {
    this._graphAPIClient = graphAPIClient;
    this._sessionManager = new SessionManager(
      new PersistentMemorySessionStore(filePath, 500),
    );
    this._initialized = false;
  }

  handle(handler) {
    this._handler = handler;
  }

  // {
  //   "object": "page",
  //   "entry": [
  //     {
  //       "id": "1895382890692545",
  //       "time": 1486464322257,
  //       "messaging": [
  //         {
  //           "sender": {
  //             "id": "1412611362105802"
  //           },
  //           "recipient": {
  //             "id": "1895382890692545"
  //           },
  //           "timestamp": 1486464322190,
  //           "message": {
  //             "mid": "mid.1486464322190:cb04e5a654",
  //             "seq": 339979,
  //             "text": "測試了"
  //           }
  //         }
  //       ]
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

      const msg = request.body.entry[0].messaging[0];
      const senderId = msg.sender.id;
      const getStartedRef = msg &&
        msg.postback &&
        msg.postback.referral &&
        msg.postback.referral.ref;

      const normalRef = msg && msg.referral && msg.referral.ref;

      const ref = getStartedRef || normalRef;

      const {
        sessionData,
        existed,
      } = await this._sessionManager.createSessionDataIfNotExists(senderId);

      const context = new MessengerContext({
        graphAPIClient: this._graphAPIClient,
        data: sessionData,
      });

      if (!existed) {
        const { data } = await this._graphAPIClient.getUserProfile(senderId);
        context.data.user = {
          ...data,
          id: senderId,
        };
      }

      if (ref) {
        context.data.user.ref = ref;
      }

      if (!this._handler) {
        throw new Error('must have at least 1 handler');
      }

      this._handler(context, msg);

      response.status = 200;
    };
  }
}
