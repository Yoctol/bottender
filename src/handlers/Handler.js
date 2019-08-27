/* @flow */

import warning from 'warning';

export type Context = {
  event: {
    isMessage: boolean,
    isText: boolean,
    message: {
      text: string,
      [key: string]: any,
    },
    [key: string]: any,
  },
  sendText: (text: string) => void,
  +isHandled: boolean,
};

type ContextPredicate = (context: Context) => boolean | Promise<boolean>;

export type Predicate = (
  arg1: any,
  context: Context
) => boolean | Promise<boolean>;

export type FunctionalHandler = (
  context: Context,
  otherArg?: any
) => void | Promise<void>;

export type Builder = {
  build: () => FunctionalHandler,
};

export type Pattern = string | RegExp | Predicate;

type PredicateHandler = {
  predicate: ContextPredicate,
  handler: FunctionalHandler,
};

export function matchPattern(pattern: Pattern, text: string): boolean {
  if (typeof pattern === 'string') {
    return pattern === text;
  }
  if (pattern instanceof RegExp) {
    return pattern.test(text);
  }
  return false;
}

export default class Handler {
  _handlers: Array<PredicateHandler> = [];

  _errorHandler: ?FunctionalHandler = null;

  _unhandledHandler: ?FunctionalHandler = null;

  on(predicate: ContextPredicate, handler: FunctionalHandler | Builder) {
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
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isMessage, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onMessage' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isMessage && predicate(context.event.message, context),
        handler
      );
    }

    return this;
  }

  onText(
    ...args:
      | [Pattern, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);

      this.on(context => context.event.isText, handler);
    } else {
      // eslint-disable-next-line prefer-const
      let [pattern, handler]: [
        Pattern,
        FunctionalHandler | Builder
      ] = (args: any);

      if (handler.build) {
        handler = handler.build();
      }

      warning(
        typeof pattern === 'function' ||
          typeof pattern === 'string' ||
          pattern instanceof RegExp,
        `'onText' only accepts string, regex or function, but received ${typeof pattern}`
      );

      if (typeof pattern === 'function') {
        const predicate: Predicate = pattern;
        this.on(
          context =>
            context.event.isText && predicate(context.event.text, context),
          handler
        );
      } else {
        if (pattern instanceof RegExp) {
          const _handler = handler;
          handler = context => {
            // $FlowFixMe
            const match = pattern.exec(context.event.text);

            if (!match) return _handler(context);

            // reset index so we start at the beginning of the regex each time
            // $FlowFixMe
            pattern.lastIndex = 0;

            return _handler(context, match);
          };
        }

        this.on(
          context =>
            context.event.isText && matchPattern(pattern, context.event.text),
          handler
        );
      }
    }

    return this;
  }

  onUnhandled(handler: FunctionalHandler | Builder) {
    this._unhandledHandler = handler.build ? handler.build() : handler;
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
          const predicateResult = await predicate(context);
          if (typeof predicateResult === 'boolean' && predicateResult) {
            // eslint-disable-next-line no-await-in-loop
            await handler(context);
            break;
          }
        }
        if (this._unhandledHandler && !context.isHandled) {
          await this._unhandledHandler(context);
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
