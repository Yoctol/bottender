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
  }: {
    accessToken: string,
    channelSecret: string,
    sessionStore: SessionStore,
    sync?: boolean,
  }) {
    const connector = new LineConnector({ accessToken, channelSecret });
    super({ connector, sessionStore, sync });
  }
}
