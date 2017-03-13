import _debug from 'debug';

import SessionManager from '../session/SessionManager';

const debug = _debug('shared/bot/Bot');

export default class Bot {
  constructor({ graphAPIClient, filePath }) {
    this._graphAPIClient = graphAPIClient;
    this._sessionManager = new SessionManager(this._graphAPIClient, filePath);
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
        session,
        existed,
      } = await this._sessionManager.createSessionIfNotExists(senderId);

      if (!existed) {
        const { data } = await this._graphAPIClient.getUser(senderId);
        // FIXME: define property
        session.data.user = {
          ...data,
          id: senderId,
        };
      }

      if (ref) {
        session.data.user.ref = ref;
      }

      if (!this._handler) {
        throw new Error('must have at least 1 handler');
      }

      this._handler(session, msg);

      response.status = 200;
    };
  }
}
