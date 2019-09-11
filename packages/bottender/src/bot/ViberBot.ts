import { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import ViberConnector from './ViberConnector';

export default class ViberBot extends Bot {
  constructor({
    accessToken,
    sessionStore,
    sync,
    origin,
  }: {
    accessToken: string,
    sessionStore: SessionStore,
    sync?: boolean,
    origin?: string,
  }) {
    const connector = new ViberConnector({ accessToken, origin });
    super({ connector, sessionStore, sync });
  }
}
