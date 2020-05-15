import { ViberClient } from 'messaging-api-viber';

import Bot from '../bot/Bot';
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
    ...connectorOptions
  }: ViberConnectorOptions & {
    sessionStore?: SessionStore;
    sync?: boolean;
  }) {
    const connector = new ViberConnector(connectorOptions);
    super({ connector, sessionStore, sync });
  }
}
