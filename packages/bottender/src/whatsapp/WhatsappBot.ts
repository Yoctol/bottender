import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';

import TwilioClient from './TwilioClient';
import WhatsappConnector, { WhatsappRequestBody } from './WhatsappConnector';
import WhatsappEvent from './WhatsappEvent';

export default class WhatsappBot extends Bot<
  WhatsappRequestBody,
  TwilioClient,
  WhatsappEvent
> {
  constructor({
    accountSid,
    authToken,
    sessionStore,
    sync,
    origin,
  }: {
    accountSid: string;
    authToken: string;
    sessionStore?: SessionStore;
    sync?: boolean;
    origin?: string;
  }) {
    const connector = new WhatsappConnector({
      accountSid,
      authToken,
      origin,
    });
    super({ connector, sessionStore, sync });
  }
}
