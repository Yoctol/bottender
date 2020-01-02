import EventEmitter from 'events';

import debug from 'debug';
import invariant from 'invariant';
import pMap from 'p-map';
import { camelcaseKeysDeep } from 'messaging-api-common';

import CacheBasedSessionStore from '../session/CacheBasedSessionStore';
import Context from '../context/Context';
import MemoryCacheStore from '../cache/MemoryCacheStore';
import Session from '../session/Session';
import SessionStore from '../session/SessionStore';
import {
  Action,
  Body,
  Client,
  Event,
  Plugin,
  Props,
  RequestContext,
} from '../types';

import { Connector } from './Connector';

type Builder<C extends Client, E extends Event> = {
  build: () => Action<C, E>;
};

const debugRequest = debug('bottender:request');
const debugResponse = debug('bottender:response');
const debugSessionRead = debug('bottender:session:read');
const debugSessionWrite = debug('bottender:session:write');
const debugAction = debug('bottender:action');

const MINUTES_IN_ONE_YEAR = 365 * 24 * 60;

function createMemorySessionStore(): SessionStore {
  const cache = new MemoryCacheStore(500);
  return new CacheBasedSessionStore(cache, MINUTES_IN_ONE_YEAR);
}

export function run<C extends Client, E extends Event>(
  action: Action<C, E>
): Action<C, E> {
  return async function Run(
    context: Context<C, E>,
    props: Props<C, E> = {}
  ): Promise<void> {
    let nextDialog: Action<C, E> | void = action;

    // TODO: refactor this with withProps or whatever
    debugAction(`Current Action: ${nextDialog.name || 'Anonymous'}`);
    // eslint-disable-next-line no-await-in-loop
    nextDialog = await nextDialog(context, props);

    while (typeof nextDialog === 'function') {
      // TODO: improve this debug helper
      debugAction(`Current Action: ${nextDialog.name || 'Anonymous'}`);
      // eslint-disable-next-line no-await-in-loop
      nextDialog = await nextDialog(context, {});
    }

    return nextDialog;
  };
}

type RequestHandler<B> = (
  body: B,
  requestContext?: RequestContext
) => void | Promise<void>;

export default class Bot<B extends Body, C extends Client, E extends Event> {
  _sessions: SessionStore;

  _initialized: boolean;

  _connector: Connector<B, C>;

  _handler: Action<C, E> | null;

  _errorHandler: Action<C, E> | null;

  _initialState: Record<string, any> = {};

  _plugins: Function[] = [];

  _sync: boolean;

  _emitter: EventEmitter;

  constructor({
    connector,
    sessionStore = createMemorySessionStore(),
    sync = false,
  }: {
    connector: Connector<B, C>;
    sessionStore?: SessionStore;
    sync?: boolean;
  }) {
    this._sessions = sessionStore;
    this._initialized = false;
    this._connector = connector;
    this._handler = null;
    this._errorHandler = null;
    this._sync = sync;
    this._emitter = new EventEmitter();
  }

  get connector(): Connector<B, C> {
    return this._connector;
  }

  get sessions(): SessionStore {
    return this._sessions;
  }

  get handler(): Action<C, E> | null {
    return this._handler;
  }

  get emitter(): EventEmitter {
    return this._emitter;
  }

  onEvent(handler: Action<C, E> | Builder<C, E>): Bot<B, C, E> {
    invariant(
      handler,
      'onEvent: Can not pass `undefined`, `null` or any falsy value as handler'
    );
    this._handler = 'build' in handler ? handler.build() : handler;
    return this;
  }

  onError(handler: Action<C, E> | Builder<C, E>): Bot<B, C, E> {
    invariant(
      handler,
      'onError: Can not pass `undefined`, `null` or any falsy value as error handler'
    );
    this._errorHandler = 'build' in handler ? handler.build() : handler;
    return this;
  }

  setInitialState(initialState: Record<string, any>): Bot<B, C, E> {
    this._initialState = initialState;
    return this;
  }

  use(plugin: Plugin<C, E>): Bot<B, C, E> {
    this._plugins.push(plugin);
    return this;
  }

  async initSessionStore(): Promise<void> {
    if (!this._initialized) {
      await this._sessions.init();
      this._initialized = true;
    }
  }

  createRequestHandler(): RequestHandler<B> {
    if (this._handler == null) {
      throw new Error(
        'Bot: Missing event handler function. You should assign it using onEvent(...)'
      );
    }

    if (!this._emitter.listenerCount('error')) {
      this._emitter.on('error', console.error);
    }

    return async (
      inputBody: B,
      requestContext?: RequestContext
    ): Promise<any> => {
      if (!inputBody) {
        throw new Error('Bot.createRequestHandler: Missing argument.');
      }

      debugRequest('Incoming request body:');
      debugRequest(JSON.stringify(inputBody, null, 2));

      await this.initSessionStore();

      const body = camelcaseKeysDeep(inputBody) as B;

      const { platform } = this._connector;
      const sessionKey = this._connector.getUniqueSessionKey(
        body,
        requestContext
      );

      // Create or retrieve session if possible
      let sessionId: string | undefined;
      let session: Session | undefined;
      if (sessionKey) {
        sessionId = `${platform}:${sessionKey}`;

        session =
          (await this._sessions.read(sessionId)) ||
          (Object.create(null) as Session);

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
            session,
            initialState: this._initialState,
            requestContext,
            emitter: this._emitter,
          }),
        {
          concurrency: 5,
        }
      );

      // Call all of extension functions before passing to handler.
      await Promise.all(
        contexts.map(async context =>
          Promise.all(this._plugins.map(ext => ext(context)))
        )
      );

      if (this._handler == null) {
        throw new Error(
          'Bot: Missing event handler function. You should assign it using onEvent(...)'
        );
      }
      const handler: Action<C, E> = this._handler;
      const errorHandler: Action<C, E> | null = this._errorHandler;
      const promises = Promise.all(
        contexts.map(context =>
          Promise.resolve()
            .then(() => run(handler)(context))
            .then(() => {
              if (context.handlerDidEnd) {
                return context.handlerDidEnd();
              }
            })
            .catch(err => {
              if (errorHandler) {
                return run(errorHandler)(context, { error: err });
              }
              throw err;
            })
            .catch(err => {
              context.emitError(err);
              throw err;
            })
        )
      );

      if (this._sync) {
        try {
          await promises;
          if (sessionId && session) {
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
        .then((): Promise<any> | void => {
          if (sessionId && session) {
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
