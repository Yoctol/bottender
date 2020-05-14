import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';

import TwilioClient from './TwilioClient';
import WhatsappConnector, {
  WhatsappConnectorOptions,
  WhatsappRequestBody,
} from './WhatsappConnector';
import WhatsappContext from './WhatsappContext';
import WhatsappEvent from './WhatsappEvent';

export default class WhatsappBot extends Bot<
  WhatsappRequestBody,
  TwilioClient,
  WhatsappEvent,
  WhatsappContext
> {
  constructor({
    sessionStore,
    sync,
    ...connectorOptions
  }: WhatsappConnectorOptions & {
    sessionStore?: SessionStore;
    sync?: boolean;
  }) {
    const connector = new WhatsappConnector(connectorOptions);
    super({ connector, sessionStore, sync });
  }
}
