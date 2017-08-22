/* @flow */
import warning from 'warning';

import BasicHandlerBuilder, {
  type Predicate,
  type FunctionalHandler,
  type Pattern,
  matchPattern,
} from './BasicHandlerBuilder';

export default class SlackHandlerBuilder extends BasicHandlerBuilder {
  onMessage(predicate: Predicate, handler: FunctionalHandler) {
    this.on(context => context.event.isMessage && predicate(context), handler);
    return this;
  }

  onText(pattern: Pattern, handler: FunctionalHandler) {
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
}
