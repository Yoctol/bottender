import { ViberClient } from 'messaging-api-viber';

import Bot, { OnRequest } from '../bot/Bot';
import SessionStore from '../session/SessionStore';

import ViberConnector, {
  ViberConnectorOptions,
  ViberRequestBody,
} from './ViberConnector';
import ViberContext from './ViberContext';
import ViberEvent from './ViberEvent';

export default class ViberBot extends Bot<
  ViberRequestBody,
  ViberClient,
  ViberEvent,
  ViberContext
> {
  constructor({
    sessionStore,
    sync,
    onRequest,
    ...connectorOptions
  }: ViberConnectorOptions & {
    sessionStore?: SessionStore;
    sync?: boolean;
    onRequest?: OnRequest;
  }) {
    const connector = new ViberConnector(connectorOptions);
    super({ connector, sessionStore, sync, onRequest });
  }
}
