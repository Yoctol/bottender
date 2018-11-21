/* @flow */

import { type SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import LineConnector from './LineConnector';

export default class LineBot extends Bot {
  constructor({
    accessToken,
    channelSecret,
    sessionStore,
    origin,
    sync,
    shouldBatch,
    sendMethod,
    skipProfile,
  }: {
    accessToken: string,
    channelSecret: string,
    sessionStore: SessionStore,
    sync?: boolean,
    shouldBatch: ?boolean,
    sendMethod: ?string,
    origin?: string,
    skipProfile?: ?boolean,
  }) {
    const connector = new LineConnector({
      accessToken,
      channelSecret,
      shouldBatch,
      sendMethod,
      origin,
      skipProfile,
    });
    super({ connector, sessionStore, sync });
  }
}
