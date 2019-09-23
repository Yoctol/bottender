import { ViberClient, ViberSender } from 'messaging-api-viber';

import SessionStore from '../session/SessionStore';

import Bot from './Bot';
import ViberConnector, { ViberRequestBody } from './ViberConnector';

export default class ViberBot extends Bot<ViberRequestBody, ViberClient> {
  constructor({
    accessToken,
    sender,
    sessionStore,
    sync,
    origin,
  }: {
    accessToken: string;
    sessionStore: SessionStore;
    sender: ViberSender;
    sync?: boolean;
    origin?: string;
  }) {
    const connector = new ViberConnector({ accessToken, sender, origin });
    super({ connector, sessionStore, sync });
  }
}
