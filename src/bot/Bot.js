/* @flow */

import _debug from 'debug';
import warning from 'warning';

import MemoryCacheStore from '../cache/MemoryCacheStore';
import CacheBasedSessionStore from '../session/CacheBasedSessionStore';
import type { SessionStore } from '../session/SessionStore';
import type { Context } from '../context/Context';

import type { Connector, SessionWithUser } from './Connector';

const debug = _debug('core/bot/Bot');

const MINUTES_IN_ONE_YEAR = 365 * 24 * 60;

function createMemorySessionStore(): SessionStore {
  const cache = new MemoryCacheStore(500);
  return new CacheBasedSessionStore(cache);
}

export type FunctionalHandler = (context: Context) => void | Promise<void>;

type RequestHandler = (body: Object) => void | Promise<void>;

export default class Bot {
  _sessions: SessionStore;

  _initialized: boolean;

  _connector: Connector<any, any>;

  _handler: ?FunctionalHandler;

  constructor({
    connector,
    sessionStore = createMemorySessionStore(),
  }: {
    connector: Connector<any, any>,
    sessionStore: SessionStore,
  }) {
    this._sessions = sessionStore;
    this._initialized = false;
    this._connector = connector;
    this._handler = null;
  }

  get connector(): Connector<any, any> {
    return this._connector;
  }

  get sessions(): SessionStore {
    return this._sessions;
  }

  get handler(): ?FunctionalHandler {
    return this._handler;
  }

  onEvent(handler: FunctionalHandler): void {
    this._handler = handler;
  }

  handle(handler: FunctionalHandler): void {
    warning(false, '`handle` is deprecated. Use `onEvent` instead.');
    this.onEvent(handler);
  }

  createRequestHandler(): RequestHandler {
    if (this._handler == null) {
      throw new Error(
        'Bot: Missing event handler function. You should assign it using handle(...)'
      );
    }

    const handler = this._handler;

    return async body => {
      if (!body) {
        throw new Error('Bot.createRequestHandler: Missing argument.');
      }

      debug(JSON.stringify(body, null, 2));

      if (!this._initialized) {
        await this._sessions.init();
        this._initialized = true;
      }

      const platform = this._connector.platform;
      const senderId = this._connector.getUniqueSessionIdFromRequest(body);

      let sessionKey;
      let session;
      if (senderId) {
        sessionKey = `${platform}:${senderId}`;

        const data = await this._sessions.read(sessionKey);
        session = data || Object.create(null);

        if (this._connector.shouldSessionUpdate(session, body)) {
          await this._connector.updateSession(session, body);
        }
      }

      this._connector
        .handleRequest({
          body,
          session: ((session: any): SessionWithUser<{}>),
          handler,
        })
        .then(() => {
          this._sessions.write(sessionKey, session, MINUTES_IN_ONE_YEAR);
        })
        .catch(console.error);
    };
  }
}
