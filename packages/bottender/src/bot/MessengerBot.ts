import { MessengerClient } from 'messaging-api-messenger';

import SessionStore from '../session/SessionStore';

import Bot from './Bot';
import MessengerConnector, { MessengerRequestBody } from './MessengerConnector';

export default class MessengerBot extends Bot<
  MessengerRequestBody,
  MessengerClient
> {
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
    skipProfile,
  }: {
    accessToken: string;
    appId?: string;
    appSecret: string;
    sessionStore: SessionStore;
    sync?: boolean;
    mapPageToAccessToken?: (pageId: string) => Promise<string>;
    verifyToken?: string;
    batchConfig?: Record<string, any>;
    origin?: string;
    skipAppSecretProof?: boolean | null;
    skipProfile?: boolean | null;
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
      skipProfile,
    });
    super({ connector, sessionStore, sync });
  }
}
