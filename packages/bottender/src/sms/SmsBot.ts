import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';

import SmsConnector, { SmsRequestBody } from './SmsConnector';
import SmsContext from './SmsContext';
import SmsEvent from './SmsEvent';
import TwilioClient from './TwilioClient';

export default class SmsBot extends Bot<
  SmsRequestBody,
  TwilioClient,
  SmsEvent,
  SmsContext
> {
  constructor({
    accountSid,
    authToken,
    phoneNumber,
    sessionStore,
    sync,
    origin,
    includeStatusCallback,
  }: {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
    sessionStore?: SessionStore;
    sync?: boolean;
    origin?: string;
    includeStatusCallback?: boolean;
  }) {
    const connector = new SmsConnector({
      accountSid,
      authToken,
      phoneNumber,
      origin,
      includeStatusCallback,
    });
    super({ connector, sessionStore, sync });
  }
}
