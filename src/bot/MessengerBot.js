/* @flow */

import { type SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import MessengerConnector from './MessengerConnector';

export default class MessengerBot extends Bot {
  constructor({
    accessToken,
    appId,
    appSecret,
    sessionStore,
    sync,
    mapPageToAccessToken,
    verifyToken,
    batchConfig,
    origin,
    skipAppSecretProof,
  }: {
    accessToken: string,
    appId?: string,
    appSecret: string,
    sessionStore: SessionStore,
    sync?: boolean,
    mapPageToAccessToken?: (pageId: string) => Promise<string>,
    verifyToken?: string,
    batchConfig?: Object,
    origin?: string,
    skipAppSecretProof?: ?boolean,
  }) {
    const connector = new MessengerConnector({
      accessToken,
      appId,
      appSecret,
      mapPageToAccessToken,
      verifyToken,
      batchConfig,
      origin,
      skipAppSecretProof,
    });
    super({ connector, sessionStore, sync });
  }
}
