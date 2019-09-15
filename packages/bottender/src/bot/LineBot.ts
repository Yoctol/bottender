import { LineClient } from 'messaging-api-line';

import SessionStore from '../session/SessionStore';

import Bot from './Bot';
import LineConnector, { LineRequestBody } from './LineConnector';

export default class LineBot extends Bot<LineRequestBody, LineClient> {
  constructor({
    accessToken,
    channelSecret,
    sessionStore,
    origin,
    sync,
    mapDestinationToAccessToken,
    shouldBatch,
    sendMethod,
    skipProfile,
  }: {
    accessToken: string;
    channelSecret: string;
    sessionStore: SessionStore;
    sync?: boolean;
    mapDestinationToAccessToken?: (destination: string) => Promise<string>;
    shouldBatch?: boolean | null;
    sendMethod?: string | null;
    origin?: string;
    skipProfile?: boolean | null;
  }) {
    const connector = new LineConnector({
      accessToken,
      channelSecret,
      mapDestinationToAccessToken,
      shouldBatch,
      sendMethod,
      origin,
      skipProfile,
    });
    super({ connector, sessionStore, sync });
  }
}
