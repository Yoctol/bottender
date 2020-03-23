import { ViberClient, ViberTypes } from 'messaging-api-viber';

import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';

import ViberConnector, { ViberRequestBody } from './ViberConnector';
import ViberEvent from './ViberEvent';

export default class ViberBot extends Bot<
  ViberRequestBody,
  ViberClient,
  ViberEvent
> {
  /**
   * constructor
   */
  constructor(options: {
    accessToken: string;
    sender: ViberTypes.Sender;
    sessionStore?: SessionStore;
    sync?: boolean;
    origin?: string;
  }) {
    const {
      accessToken,
      sender,
      sessionStore,
      sync,
      origin,
    } = options;
    const connector = new ViberConnector({ accessToken, sender, origin });
    super({ connector, sessionStore, sync });
  }
}
