/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import LineConnector from './LineConnector';

export default class LineBot extends Bot {
  constructor({
    accessToken,
    channelSecret,
    sessionStore,
    sync,
    shouldBatch,
    aliasSendToReply,
  }: {
    accessToken: string,
    channelSecret: string,
    sessionStore: SessionStore,
    sync?: boolean,
    shouldBatch: ?boolean,
    aliasSendToReply: ?boolean,
  }) {
    const connector = new LineConnector({
      accessToken,
      channelSecret,
      shouldBatch,
      aliasSendToReply,
    });
    super({ connector, sessionStore, sync });
  }
}
