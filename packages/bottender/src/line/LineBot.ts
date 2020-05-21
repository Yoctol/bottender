import { LineClient } from 'messaging-api-line';

import Bot, { OnRequest } from '../bot/Bot';
import SessionStore from '../session/SessionStore';

import LineConnector, {
  LineConnectorOptions,
  LineRequestBody,
} from './LineConnector';
import LineContext from './LineContext';
import LineEvent from './LineEvent';

export default class LineBot extends Bot<
  LineRequestBody,
  LineClient,
  LineEvent,
  LineContext
> {
  constructor({
    sessionStore,
    sync,
    onRequest,
    ...connectorOptions
  }: LineConnectorOptions & {
    sessionStore?: SessionStore;
    sync?: boolean;
    onRequest?: OnRequest;
  }) {
    const connector = new LineConnector(connectorOptions);
    super({ connector, sessionStore, sync, onRequest });
  }
}
