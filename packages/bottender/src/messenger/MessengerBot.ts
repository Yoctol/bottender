import { MessengerClient } from 'messaging-api-messenger';

import Bot, { OnRequest } from '../bot/Bot';
import SessionStore from '../session/SessionStore';

import MessengerConnector, {
  MessengerConnectorOptions,
  MessengerRequestBody,
} from './MessengerConnector';
import MessengerContext from './MessengerContext';
import MessengerEvent from './MessengerEvent';

export default class MessengerBot extends Bot<
  MessengerRequestBody,
  MessengerClient,
  MessengerEvent,
  MessengerContext
> {
  constructor({
    sessionStore,
    sync,
    onRequest,
    ...connectorOptions
  }: MessengerConnectorOptions & {
    sessionStore?: SessionStore;
    sync?: boolean;
    onRequest?: OnRequest;
  }) {
    const connector = new MessengerConnector(connectorOptions);
    super({ connector, sessionStore, sync, onRequest });
  }
}
