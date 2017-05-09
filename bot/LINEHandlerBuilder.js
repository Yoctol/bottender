/* @flow */
import warning from 'warning';

import BasicHandlerBuilder, {
  type Condition,
  type Handler,
  type Pattern,
  matchPattern,
} from './BasicHandlerBuilder';

export default class LINEHandlerBuilder extends BasicHandlerBuilder {
  onMessage(condition: Condition, handler: Handler) {
    this.on(context => context.event.isMessage && condition(context), handler);
    return this;
  }

  onText(pattern: Pattern, handler: Handler) {
    warning(
      typeof pattern === 'string' || pattern instanceof RegExp,
      `'onText' only accepts string or regex, but received ${typeof pattern}`
    );
    this.onMessage(
      context =>
        context.event.isTextMessage &&
        matchPattern(pattern, context.event.message.text),
      handler
    );
    return this;
  }

  onPostback(condition: Condition, handler: Handler) {
    this.on(context => context.event.isPostback && condition(context), handler);
    return this;
  }

  onPayload(pattern: Pattern, handler: Handler) {
    warning(
      typeof pattern === 'string' || pattern instanceof RegExp,
      `'onPayload' only accepts string or regex, but received ${typeof pattern}`
    );
    this.on(
      context =>
        context.event.isPostback &&
        matchPattern(pattern, context.event.postback.data),
      handler
    );
    return this;
  }
}
