/* @flow */
import randomItem from 'random-item';

// FIXME: platform
type Context = {
  event: {
    isMessage: boolean,
    isTextMessage: boolean,
    message: {
      is_echo: boolean,
      quick_reply: {
        payload: string,
      },
      text: string,
    },
    isPostback: boolean,
    postback: {
      payload: string,
    },
  },
  sendText: (text: string) => void,
};

export type Condition = (context: Context) => boolean | Promise<boolean>;

type FunctionalHandler = (context: Context) => void | Promise<void>;

export type Handler = string | Array<string> | FunctionalHandler;

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

export default class HandlerBuilder {
  _handlers: Array<ConditionHandler> = [];
  _fallbackHandler: ?ConditionHandler = null;

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

  build(): FunctionalHandler {
    return async (context: Context) => {
      const handlers = this._fallbackHandler
        ? this._handlers.concat(this._fallbackHandler)
        : this._handlers;
      for (let i = 0; i < handlers.length; i++) {
        const { condition, handler } = handlers[i];
        // eslint-disable-next-line no-await-in-loop
        if (await Promise.resolve(condition(context))) {
          return handler(context);
        }
      }
    };
  }
}
