/* @flow */

import _debug from 'debug';

import MemoryCacheStore from '../cache/MemoryCacheStore';
import CacheBasedSessionStore from '../session/CacheBasedSessionStore';
import type { Session } from '../session/Session';
import type { SessionStore } from '../session/SessionStore';
import type { FunctionalHandler, Builder } from '../handlers/Handler';

import type { Connector } from './Connector';

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

  _initialState: Object = {};

  _plugins: Array<Function> = [];

  _sync: boolean;

  _getAccessToken: ?(pageId: string) => Promise<string>;

  constructor({
    connector,
    sessionStore = createMemorySessionStore(),
    sync = false,
    getAccessToken,
  }: {|
    connector: Connector<any>,
    sessionStore: SessionStore,
    sync?: boolean,
    getAccessToken?: (pageId: string) => Promise<string>,
  |}) {
    this._sessions = sessionStore;
    this._initialized = false;
    this._connector = connector;
    this._handler = null;
    this._sync = sync;
    this._getAccessToken = getAccessToken;
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

  onEvent(handler: FunctionalHandler | Builder): Bot {
    this._handler = handler.build ? handler.build() : handler;
    return this;
  }

  setInitialState(initialState: Object): Bot {
    this._initialState = initialState;
    return this;
  }

  use(fn: Function): Bot {
    this._plugins.push(fn);
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
      const sessionKey = this._connector.getUniqueSessionKey(body);

      // Create or retrieve session if possible
      let sessionId;
      let session: Session;
      if (sessionKey) {
        sessionId = `${platform}:${sessionKey}`;

        // $FlowFixMe
        session = await this._sessions.read(sessionId);
        session = session || Object.create(null);

        Object.defineProperty(session, 'id', {
          configurable: false,
          enumerable: true,
          writable: false,
          value: session.id || sessionId,
        });

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

      let customAccessToken;

      if (this._getAccessToken) {
        customAccessToken = await this._getAccessToken(body.entry[0].id);
      }

      const contexts = events.map(event =>
        this._connector.createContext({
          event,
          session: ((session: any): Session),
          initialState: this._initialState,
          customAccessToken,
        })
      );

      // Call all of extension functions before passing to handler.
      contexts.forEach(context => {
        this._plugins.forEach(ext => {
          ext(context);
        });
      });

      if (this._handler == null) {
        throw new Error(
          'Bot: Missing event handler function. You should assign it using onEvent(...)'
        );
      }
      const handler: FunctionalHandler = this._handler;
      const promises = Promise.all(
        contexts.map(context => Promise.resolve().then(() => handler(context)))
      );

      if (this._sync) {
        try {
          await promises;
          if (sessionId && session) {
            // $FlowFixMe: suppressing this error until we can refactor
            session.lastActivity = Date.now();
            await this._sessions.write(sessionId, session);
          }
        } catch (err) {
          console.error(err);
        }

        // TODO: Any chances to merge multiple response from context?
        return contexts[0].response;
      }
      promises
        .then(() => {
          if (sessionId && session) {
            // $FlowFixMe: suppressing this error until we can refactor
            session.lastActivity = Date.now();
            this._sessions.write(sessionId, session);
          }
        })
        .catch(console.error);
    };
  }
}
