/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import LINEConnector from './LINEConnector';

export default class LINEBot extends Bot {
  constructor({
    accessToken,
    channelSecret,
    sessionStore,
  }: {
    accessToken: string,
    channelSecret: string,
    sessionStore: SessionStore,
  }) {
    const connector = new LINEConnector({ accessToken, channelSecret });
    super({ connector, sessionStore });
  }
}
