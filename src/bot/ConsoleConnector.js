/*
  eslint-disable class-methods-use-this
  @flow
*/
import ConsoleContext from '../context/ConsoleContext';
import ConsoleEvent, { type ConsoleRawEvent } from '../context/ConsoleEvent';
import type { Session } from '../session/Session';

import type { Connector } from './Connector';

type ConsoleRequestBody = ConsoleRawEvent;

export type ConsoleClient = {
  sendText(text: string): void,
};

type ConstructorOptions = {|
  client?: ConsoleClient,
|};

export default class ConsoleConnector implements Connector<ConsoleRequestBody> {
  _client: ConsoleClient;

  constructor({ client }: ConstructorOptions = {}) {
    this._client = client || {
      sendText: text => {
        process.stdout.write(`Bot > ${text}\nYou > `);
      },
    };
  }

  get platform(): string {
    return 'console';
  }

  get client(): ConsoleClient {
    return this._client;
  }

  getUniqueSessionIdFromRequest(): string {
    return '1';
  }

  async updateSession(session: Session): Promise<void> {
    if (!session.user) {
      session.user = {
        id: '1',
        platform: 'console',
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

  createContext({
    event,
    session,
  }: {
    event: ConsoleEvent,
    session: ?Session,
  }) {
    return new ConsoleContext({
      client: this._client,
      event,
      session,
    });
  }
}
