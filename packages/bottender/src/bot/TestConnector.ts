import EventEmitter from 'events';

import Session from '../session/Session';
import TestContext from '../context/TestContext';
import TestEvent, { TestRawEvent } from '../context/TestEvent';
import { TestClient } from '../context/TestClient';

import { Connector } from './Connector';

export type TestRequestBody = TestRawEvent;

type ConstructorOptions = {
  client?: TestClient;
  fallbackMethods?: boolean;
};

export const testClient: TestClient = {
  calls: [],
  callMethod(name, args) {
    this.calls.push({
      name,
      args,
    });
  },
  mockReset() {
    this.calls = [];
  },
};

export default class TestConnector
  implements Connector<TestRequestBody, TestClient> {
  _client: TestClient;

  _fallbackMethods: boolean;

  constructor({ client, fallbackMethods }: ConstructorOptions = {}) {
    this._client = client || testClient;
    this._fallbackMethods = fallbackMethods || false;
  }

  get platform(): string {
    return 'test';
  }

  get client(): TestClient {
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

  mapRequestToEvents(body: TestRequestBody): Array<TestEvent> {
    return [new TestEvent(body)];
  }

  createContext(params: {
    event: TestEvent;
    session: Session | null;
    initialState: Record<string, any> | null;
    requestContext: Record<string, any> | null;
    emitter?: EventEmitter | null;
  }): TestContext {
    return new TestContext({
      ...params,
      client: this._client,
      fallbackMethods: this._fallbackMethods,
    });
  }
}
