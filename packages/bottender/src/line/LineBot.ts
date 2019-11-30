import { LineClient } from 'messaging-api-line';

import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';

import LineConnector, { LineRequestBody } from './LineConnector';
import LineEvent from './LineEvent';

export default class LineBot extends Bot<
  LineRequestBody,
  LineClient,
  LineEvent
> {
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
    shouldBatch?: boolean;
    sendMethod?: string;
    origin?: string;
    skipProfile?: boolean;
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
