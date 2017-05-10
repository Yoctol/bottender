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
    isPostback: boolean,
    isFollow: boolean,
    isUnfollow: boolean,
    isJoin: boolean,
    isLeave: boolean,
    isBeacon: boolean,
  },
  sendText: (text: string) => void,
};

export type Condition = (context: Context) => boolean | Promise<boolean>;

type FunctionalHandler = (context: Context) => void | Promise<void>;

export type Handler = string | Array<string> | FunctionalHandler;

export type Pattern = string | RegExp;

type ConditionHandler = {
  condition: Condition,
  handler: FunctionalHandler,
};

function normalizeHandler(handler: Handler): FunctionalHandler {
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
  _handlers: Array<ConditionHandler> = [];
  _fallbackHandler: ?ConditionHandler = null;
  _errorHandler: ?FunctionalHandler = null;

  before(handler: FunctionalHandler) {
    this._beforeHandler = handler;
    return this;
  }

  on(condition: Condition, handler: Handler) {
    this._handlers.push({
      condition,
      handler: normalizeHandler(handler),
    });
    return this;
  }

  onUnhandled(handler: Handler) {
    this._fallbackHandler = {
      condition: () => true,
      handler: normalizeHandler(handler),
    };
    return this;
  }

  onError(handler: Handler) {
    this._errorHandler = normalizeHandler(handler);
    return this;
  }

  build(): FunctionalHandler {
    const handlers = this._fallbackHandler
      ? this._handlers.concat(this._fallbackHandler)
      : this._handlers;

    return async (context: Context) => {
      try {
        if (this._beforeHandler) {
          await this._beforeHandler(context);
        }

        for (let i = 0; i < handlers.length; i++) {
          const { condition, handler } = handlers[i];
          // eslint-disable-next-line no-await-in-loop
          if (await condition(context)) {
            return handler(context);
          }
        }
      } catch (err) {
        if (this._errorHandler) {
          return this._errorHandler(err, context);
        }
        throw err;
      }
    };
  }
}
