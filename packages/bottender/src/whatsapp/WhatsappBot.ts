import Bot, { OnRequest } from '../bot/Bot';
import SessionStore from '../session/SessionStore';

import TwilioClient from './TwilioClient';
import WhatsappConnector, {
  WhatsappConnectorOptions,
} from './WhatsappConnector';
import WhatsappContext from './WhatsappContext';
import WhatsappEvent from './WhatsappEvent';
import { WhatsappRequestBody } from './WhatsappTypes';

export default class WhatsappBot extends Bot<
  WhatsappRequestBody,
  TwilioClient,
  WhatsappEvent,
  WhatsappContext
> {
  constructor({
    sessionStore,
    sync,
    onRequest,
    ...connectorOptions
  }: WhatsappConnectorOptions & {
    sessionStore?: SessionStore;
    sync?: boolean;
    onRequest?: OnRequest;
  }) {
    const connector = new WhatsappConnector(connectorOptions);
    super({ connector, sessionStore, sync, onRequest });
  }
}
