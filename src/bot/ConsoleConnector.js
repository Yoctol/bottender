/* @flow */

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
  _timeoutId: TimeoutID; // eslint-disable-line no-undef

  constructor({ client }: ConstructorOptions = {}) {
    this._client = client || {
      sendText: text => {
        if (this._timeoutId) {
          clearTimeout(this._timeoutId);
        }
        process.stdout.write(`Bot > ${text}\n`);
        this._timeoutId = setTimeout(() => process.stdout.write(`You > `), 0);
      },
    };
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

  createContext({
    event,
    session,
    initialState,
  }: {
    event: ConsoleEvent,
    session: ?Session,
    initialState: Object,
  }) {
    return new ConsoleContext({
      client: this._client,
      event,
      session,
      initialState,
    });
  }
}
