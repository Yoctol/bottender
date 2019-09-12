import { ViberClient } from 'messaging-api-viber';

import SessionStore from '../session/SessionStore';

import Bot from './Bot';
import ViberConnector, { ViberRequestBody } from './ViberConnector';

export default class ViberBot extends Bot<ViberRequestBody, ViberClient> {
  constructor({
    accessToken,
    sessionStore,
    sync,
    origin,
  }: {
    accessToken: string;
    sessionStore: SessionStore;
    sync?: boolean;
    origin?: string;
  }) {
    const connector = new ViberConnector({ accessToken, origin });
    super({ connector, sessionStore, sync });
  }
}
