/* @flow */

import _debug from 'debug';

import MemoryCacheStore from '../cache/MemoryCacheStore';
import CacheBasedSessionStore from '../session/CacheBasedSessionStore';
import type { Session } from '../session/Session';
import type { SessionStore } from '../session/SessionStore';

import type { Connector } from './Connector';
import type { FunctionalHandler, Builder } from './Handler';

const debug = _debug('core/bot/Bot');

const MINUTES_IN_ONE_YEAR = 365 * 24 * 60;

function createMemorySessionStore(): SessionStore {
  const cache = new MemoryCacheStore(500);
  return new CacheBasedSessionStore(cache, MINUTES_IN_ONE_YEAR);
}

type RequestHandler = (body: Object) => void | Promise<void>;

export default class Bot {
  _sessions: SessionStore;

  _initialized: boolean;

  _connector: Connector<any>;

  _handler: ?FunctionalHandler;

  _contextExtensions: Array<Function> = [];

  _sync: boolean;

  constructor({
    connector,
    sessionStore = createMemorySessionStore(),
    sync = false,
  }: {|
    connector: Connector<any>,
    sessionStore: SessionStore,
    sync?: boolean,
  |}) {
    this._sessions = sessionStore;
    this._initialized = false;
    this._connector = connector;
    this._handler = null;
    this._sync = sync;
  }

  get connector(): Connector<any> {
    return this._connector;
  }

  get sessions(): SessionStore {
    return this._sessions;
  }

  get handler(): ?FunctionalHandler {
    return this._handler;
  }

  onEvent(handler: FunctionalHandler | Builder): void {
    this._handler = handler.build ? handler.build() : handler;
  }

  extendContext(fn: Function): Bot {
    this._contextExtensions.push(fn);
    return this;
  }

  createRequestHandler(): RequestHandler {
    if (this._handler == null) {
      throw new Error(
        'Bot: Missing event handler function. You should assign it using onEvent(...)'
      );
    }

    return async body => {
      if (!body) {
        throw new Error('Bot.createRequestHandler: Missing argument.');
      }

      debug(JSON.stringify(body, null, 2));

      if (!this._initialized) {
        await this._sessions.init();
        this._initialized = true;
      }

      const { platform } = this._connector;
      const sessionId = this._connector.getUniqueSessionIdFromRequest(body);

      // Create or retrieve session if possible
      let sessionKey;
      let session: Session;
      if (sessionId) {
        sessionKey = `${platform}:${sessionId}`;

        // $FlowFixMe
        session = await this._sessions.read(sessionKey);
        session = session || Object.create(null);
        session.id = session.id || sessionKey;

        if (!session.platform) session.platform = platform;

        Object.defineProperty(session, 'platform', {
          configurable: false,
          enumerable: true,
          writable: false,
          value: session.platform,
        });

        await this._connector.updateSession(session, body);
      }

      const events = this._connector.mapRequestToEvents(body);

      const contexts = events.map(event =>
        this._connector.createContext({
          event,
          session: ((session: any): Session),
        })
      );

      // Call all of extension functions before passing to handler.
      contexts.forEach(context => {
        this._contextExtensions.forEach(ext => {
          ext(context);
        });
      });

      const promises = Promise.all(
        contexts.map(context => {
          if (this._handler == null) {
            throw new Error(
              'Bot: Missing event handler function. You should assign it using onEvent(...)'
            );
          }
          return this._handler(context);
        })
      );

      if (this._sync) {
        try {
          await promises;
          if (sessionKey && session) {
            // $FlowFixMe: suppressing this error until we can refactor
            session.lastActivity = Date.now();
            await this._sessions.write(sessionKey, session);
          }
        } catch (err) {
          console.error(err);
        }

        // TODO: Any chances to merge multiple response from context?
        return contexts[0].response;
      }
      promises
        .then(() => {
          if (sessionKey && session) {
            // $FlowFixMe: suppressing this error until we can refactor
            session.lastActivity = Date.now();
            this._sessions.write(sessionKey, session);
          }
        })
        .catch(console.error);
    };
  }
}
