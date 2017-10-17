/* @flow */

import warning from 'warning';

export type Context = {
  event: {
    isMessage: boolean,
    isTextMessage: boolean,
    message: {
      text: string,
      [key: string]: any,
    },
    [key: string]: any,
  },
  sendText: (text: string) => void,
  +handled: boolean,
};

export type Predicate = (context: Context) => boolean | Promise<boolean>;

export type FunctionalHandler = (
  context: Context,
  otherArg?: any
) => void | Promise<void>;

export type Builder = {
  build: () => FunctionalHandler,
};

export type Pattern = string | RegExp;

type PredicateHandler = {
  predicate: Predicate,
  handler: FunctionalHandler,
};

export function matchPattern(pattern: Pattern, text: string): boolean {
  if (typeof pattern === 'string') {
    return pattern === text;
  } else if (pattern instanceof RegExp) {
    return pattern.test(text);
  }
  return false;
}

export default class Handler {
  _handlers: Array<PredicateHandler> = [];
  _errorHandler: ?FunctionalHandler = null;

  on(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this._handlers.push({
      predicate,
      handler: handler.build ? handler.build() : handler,
    });
    return this;
  }

  onEvent(handler: FunctionalHandler | Builder) {
    this.on(() => true, handler);
    return this;
  }

  onMessage(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const _args: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isMessage, _args[0]);
    } else {
      const _args: [Predicate, FunctionalHandler | Builder] = (args: any);
      this.on(
        context => context.event.isMessage && _args[0](context),
        _args[1]
      );
    }

    return this;
  }

  onText(
    arg1: Pattern | FunctionalHandler | Builder,
    arg2?: FunctionalHandler | Builder
  ) {
    let pattern;
    let handler;
    if (arg2) {
      pattern = ((arg1: any): Pattern);
      const _handler = (arg2.build ? arg2.build() : arg2: FunctionalHandler);

      warning(
        typeof pattern === 'string' || pattern instanceof RegExp,
        `'onText' only accepts string or regex, but received ${typeof pattern}`
      );

      if (pattern instanceof RegExp) {
        handler = context => {
          // $FlowFixMe
          const match = pattern.exec(context.event.message.text);

          if (!match) return _handler(context);

          // reset index so we start at the beginning of the regex each time
          // $FlowFixMe
          pattern.lastIndex = 0;

          return _handler(context, match);
        };
      } else {
        handler = _handler;
      }

      this.onMessage(
        context =>
          context.event.isTextMessage &&
          matchPattern(pattern, context.event.message.text),
        handler
      );
    } else {
      handler = ((arg1: any): FunctionalHandler | Builder);

      this.onMessage(context => context.event.isTextMessage, handler);
    }

    return this;
  }

  onUnhandled(handler: FunctionalHandler | Builder) {
    this.on(context => !context.handled, handler);
    return this;
  }

  onError(handler: FunctionalHandler | Builder) {
    this._errorHandler = handler.build ? handler.build() : handler;
    return this;
  }

  build(): FunctionalHandler {
    const handlers = this._handlers;

    return async (context: Context) => {
      try {
        for (let i = 0; i < handlers.length; i++) {
          const { predicate, handler } = handlers[i];
          // eslint-disable-next-line no-await-in-loop
          const predicateReturn = await predicate(context);
          if (typeof predicateReturn === 'boolean' && predicateReturn) {
            // eslint-disable-next-line no-await-in-loop
            await handler(context);
            break;
          }
        }
      } catch (err) {
        if (this._errorHandler) {
          return this._errorHandler(context, err);
        }
        throw err;
      }
    };
  }
}
