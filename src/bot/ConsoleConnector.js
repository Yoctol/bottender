/* @flow */

import ConsoleContext from '../context/ConsoleContext';
import { type ConsoleClient } from '../context/ConsoleClient';
import ConsoleEvent, { type ConsoleRawEvent } from '../context/ConsoleEvent';
import type { Session } from '../session/Session';

import type { Connector } from './Connector';

type ConsoleRequestBody = ConsoleRawEvent;

type ConstructorOptions = {|
  client?: ConsoleClient,
  fallbackMethods?: boolean,
|};

export default class ConsoleConnector implements Connector<ConsoleRequestBody> {
  _client: ConsoleClient;

  _fallbackMethods: boolean;

  constructor({ client, fallbackMethods }: ConstructorOptions = {}) {
    this._client = client || {
      sendText: text => {
        process.stdout.write(`Bot > ${text}\n`);
      },
    };
    this._fallbackMethods = fallbackMethods || false;
  }

  get platform(): string {
    return 'console';
  }

  get client(): ConsoleClient {
    return this._client;
  }

  getUniqueSessionKey(): string {
    return '1';
  }

  async updateSession(session: Session): Promise<void> {
    if (!session.user) {
      session.user = {
        id: '1',
        name: 'you',
        _updatedAt: new Date().toISOString(),
      };
    }

    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  }

  mapRequestToEvents(body: ConsoleRequestBody): Array<ConsoleEvent> {
    return [new ConsoleEvent(body)];
  }

  createContext(params: {
    event: ConsoleEvent,
    session: ?Session,
    initialState: ?Object,
    requestContext: ?Object,
  }) {
    return new ConsoleContext({
      ...params,
      client: this._client,
      fallbackMethods: this._fallbackMethods,
    });
  }
}
