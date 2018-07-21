/* @flow */

import { type SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import LineConnector from './LineConnector';

export default class LineBot extends Bot {
  constructor({
    accessToken,
    channelSecret,
    sessionStore,
    sync,
    shouldBatch,
    sendMethod,
  }: {
    accessToken: string,
    channelSecret: string,
    sessionStore: SessionStore,
    sync?: boolean,
    shouldBatch: ?boolean,
    sendMethod: ?string,
  }) {
    const connector = new LineConnector({
      accessToken,
      channelSecret,
      shouldBatch,
      sendMethod,
    });
    super({ connector, sessionStore, sync });
  }
}
