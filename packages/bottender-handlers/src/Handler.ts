import warning from 'warning';

export type Context = {
  event: {
    isMessage: boolean;
    isText: boolean;
    message: {
      text: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  sendText: (text: string) => void;
  isHandled: boolean;
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
  build: () => FunctionalHandler;
};

export type Pattern = string | RegExp | Predicate;

type PredicateHandler = {
  predicate: ContextPredicate;
  handler: FunctionalHandler;
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
  _handlers: PredicateHandler[] = [];

  _errorHandler: FunctionalHandler | null = null;

  _unhandledHandler: FunctionalHandler | null = null;

  on(predicate: ContextPredicate, handler: FunctionalHandler | Builder) {
    this._handlers.push({
      predicate,
      handler: 'build' in handler ? handler.build() : handler,
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
    if (args.length < 2) {
      const [handler] = args as [FunctionalHandler | Builder];
      this.on(context => context.event.isMessage, handler);
    } else {
      const [predicate, handler] = args as [
        Predicate,
        FunctionalHandler | Builder
      ];

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
    if (args.length < 2) {
      const [handler] = args as [FunctionalHandler | Builder];

      this.on(context => context.event.isText, handler);
    } else {
      // eslint-disable-next-line prefer-const
      let [pattern, handler] = args as [Pattern, FunctionalHandler | Builder];

      if ('build' in handler) {
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
          const patternRegExp: RegExp = pattern;

          const _handler = handler;
          handler = context => {
            const match = patternRegExp.exec(context.event.text);

            if (!match) return _handler(context);

            // reset index so we start at the beginning of the regex each time
            patternRegExp.lastIndex = 0;

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
    this._unhandledHandler = 'build' in handler ? handler.build() : handler;
    return this;
  }

  onError(handler: FunctionalHandler | Builder) {
    this._errorHandler = 'build' in handler ? handler.build() : handler;
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
