/* @flow */
import randomItem from 'random-item';

// FIXME: platform
export type Context = {
  event: {
    isMessage: boolean,
    isTextMessage: boolean,
    message: {
      text: string,
      is_echo: boolean,
      quick_reply: {
        payload: string,
      },
    },
    postback: {
      payload: string,
      data: string,
    },
    isEcho: boolean,
    isRead: boolean,
    isDelivery: boolean,
    isPostback: boolean,
    isFollow: boolean,
    isUnfollow: boolean,
    isJoin: boolean,
    isLeave: boolean,
    isBeacon: boolean,
  },
  sendText: (text: string) => void,
};

export type Predicate = (context: Context) => boolean | Promise<boolean>;

type FunctionalHandler = (context: Context) => void | Promise<void>;

export type Handler = string | Array<string> | FunctionalHandler;

export type Pattern = string | RegExp;

type PredicateHandler = {
  predicate: Predicate,
  handler: FunctionalHandler,
};

export function normalizeHandler(handler: Handler): FunctionalHandler {
  if (typeof handler === 'string') {
    return context => {
      // $FlowFixMe
      context.sendText(handler);
    };
  } else if (Array.isArray(handler)) {
    return context => {
      context.sendText(randomItem(handler));
    };
  }
  return handler;
}

export function matchPattern(pattern: Pattern, text: string): boolean {
  if (typeof pattern === 'string') {
    return pattern === text;
  } else if (pattern instanceof RegExp) {
    return pattern.test(text);
  }
  return false;
}

export default class HandlerBuilder {
  _beforeHandler: ?FunctionalHandler = null;
  _handlers: Array<PredicateHandler> = [];
  _fallbackHandler: ?PredicateHandler = null;
  _fallbackMessageHandler: ?PredicateHandler = null;
  _errorHandler: ?FunctionalHandler = null;

  before(handler: FunctionalHandler) {
    this._beforeHandler = handler;
    return this;
  }

  beforeMessage(handler: FunctionalHandler) {
    this._beforeHandler = context => {
      if (context.event.isMessage) {
        return handler(context);
      }
    };
    return this;
  }

  on(predicate: Predicate, handler: Handler) {
    this._handlers.push({
      predicate,
      handler: normalizeHandler(handler),
    });
    return this;
  }

  onUnhandled(handler: Handler) {
    this._fallbackHandler = {
      predicate: () => true,
      handler: normalizeHandler(handler),
    };
    return this;
  }

  onUnhandledMessage(handler: Handler) {
    this._fallbackMessageHandler = {
      predicate: context => context.event.isMessage,
      handler: normalizeHandler(handler),
    };
    return this;
  }

  onError(handler: Handler) {
    this._errorHandler = normalizeHandler(handler);
    return this;
  }

  build(): FunctionalHandler {
    const handlers = this._handlers.concat(
      this._fallbackMessageHandler || [],
      this._fallbackHandler || []
    );

    return async (context: Context) => {
      try {
        if (this._beforeHandler) {
          await this._beforeHandler(context);
        }

        for (let i = 0; i < handlers.length; i++) {
          const { predicate, handler } = handlers[i];
          // eslint-disable-next-line no-await-in-loop
          const predicateReturn = await predicate(context);
          if (typeof predicateReturn === 'boolean' && predicateReturn) {
            return handler(context);
          }
        }
      } catch (err) {
        if (this._errorHandler) {
          // TODO: pass error in
          return this._errorHandler(context);
        }
        throw err;
      }
    };
  }
}
