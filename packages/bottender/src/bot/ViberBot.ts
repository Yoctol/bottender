import { ViberClient, ViberTypes } from 'messaging-api-viber';

import SessionStore from '../session/SessionStore';

import Bot from './Bot';
import ViberConnector, { ViberRequestBody } from './ViberConnector';

import { ViberEvent } from '..';

export default class ViberBot extends Bot<
  ViberRequestBody,
  ViberClient,
  ViberEvent
> {
  constructor({
    accessToken,
    sender,
    sessionStore,
    sync,
    origin,
  }: {
    accessToken: string;
    sender: ViberTypes.Sender;
    sessionStore?: SessionStore;
    sync?: boolean;
    origin?: string;
  }) {
    const connector = new ViberConnector({ accessToken, sender, origin });
    super({ connector, sessionStore, sync });
  }
}
