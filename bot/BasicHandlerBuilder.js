/* @flow */
import randomItem from 'random-item';

import type Context from '../session/Context';

export type Condition = (context: Context) => boolean | Promise<boolean>;
export type Handler = string | Array<string> | (context: Context) => void | Promise<void>;

type ConditionHandler = {
  condition: Condition,
  handler: Handler,
};

function normalizeHandler(handler: Handler) {
  if (typeof handler === 'string') {
    return context => { context.sendText(handler); };
  } else if (Array.isArray(handler)) {
    return context => { context.sendText(randomItem(handler)); };
  }
  return handler;
}

export default class HandlerBuilder {
  _handlers: Array<ConditionHandler> = [];
  _fallbackHandler: ConditionHandler = null;

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

  build(): Handler {
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
