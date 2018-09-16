/* @flow */

import debug from 'debug';
import invariant from 'invariant';
import pMap from 'p-map';

import CacheBasedSessionStore from '../session/CacheBasedSessionStore';
import MemoryCacheStore from '../cache/MemoryCacheStore';
import { type Builder, type FunctionalHandler } from '../handlers/Handler';
import { type Session } from '../session/Session';
import { type SessionStore } from '../session/SessionStore';

import { type Connector } from './Connector';

const debugRequest = debug('bottender:request');
const debugResponse = debug('bottender:response');
const debugSessionRead = debug('bottender:session:read');
const debugSessionWrite = debug('bottender:session:write');

const MINUTES_IN_ONE_YEAR = 365 * 24 * 60;

function createMemorySessionStore(): SessionStore {
  const cache = new MemoryCacheStore(500);
  return new CacheBasedSessionStore(cache, MINUTES_IN_ONE_YEAR);
}

type RequestHandler = (
  body: Object,
  requestContext?: ?Object
) => void | Promise<void>;

export default class Bot {
  _sessions: SessionStore;

  _initialized: boolean;

  _connector: Connector<any>;

  _handler: ?FunctionalHandler;

  _initialState: Object = {};

  _plugins: Array<Function> = [];

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

  onEvent(handler: FunctionalHandler | Builder): Bot {
    invariant(
      handler,
      'onEvent: Can not pass `undefined`, `null` or any falsy value as handler'
    );
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

    return async (body: Object, requestContext?: ?Object) => {
      if (!body) {
        throw new Error('Bot.createRequestHandler: Missing argument.');
      }

      debugRequest('Incoming request body:');
      debugRequest(JSON.stringify(body, null, 2));

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

        debugSessionRead(`Read session: ${sessionId}`);
        debugSessionRead(JSON.stringify(session, null, 2));

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

      const contexts = await pMap(
        events,
        event =>
          this._connector.createContext({
            event,
            session: ((session: any): Session),
            initialState: this._initialState,
            requestContext,
          }),
        {
          concurrency: 5,
        }
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
        contexts.map(context =>
          Promise.resolve()
            .then(() => handler(context))
            .then(() => {
              if (context.handlerDidEnd) {
                return context.handlerDidEnd();
              }
            })
        )
      );

      if (this._sync) {
        try {
          await promises;
          if (sessionId && session) {
            // $FlowFixMe: suppressing this error until we can refactor
            session.lastActivity = Date.now();
            contexts.forEach(context => {
              context.isSessionWritten = true;
            });

            debugSessionWrite(`Write session: ${sessionId}`);
            debugSessionWrite(JSON.stringify(session, null, 2));

            await this._sessions.write(sessionId, session);
          }
        } catch (err) {
          console.error(err);
        }

        // TODO: Any chances to merge multiple responses from context?
        const response = contexts[0].response;
        if (response && typeof response === 'object') {
          debugResponse('Outgoing response:');
          debugResponse(JSON.stringify(response, null, 2));
        }
        return response;
      }
      promises
        .then(() => {
          if (sessionId && session) {
            // $FlowFixMe: suppressing this error until we can refactor
            session.lastActivity = Date.now();
            contexts.forEach(context => {
              context.isSessionWritten = true;
            });

            debugSessionWrite(`Write session: ${sessionId}`);
            debugSessionWrite(JSON.stringify(session, null, 2));

            return this._sessions.write(sessionId, session);
          }
        })
        .catch(console.error);
    };
  }
}
