/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import MessengerConnector from './MessengerConnector';

export default class MessengerBot extends Bot {
  constructor({
    accessToken,
    appSecret,
    sessionStore,
    sync,
    mapPageToAccessToken,
    verifyToken,
  }: {
    accessToken: string,
    appSecret: string,
    sessionStore: SessionStore,
    sync?: boolean,
    mapPageToAccessToken?: (pageId: string) => Promise<string>,
    verifyToken?: string,
  }) {
    const connector = new MessengerConnector({
      accessToken,
      appSecret,
      mapPageToAccessToken,
      verifyToken,
    });
    super({ connector, sessionStore, sync });
  }
}
