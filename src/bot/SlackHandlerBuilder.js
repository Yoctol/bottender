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

  onText(arg1: Pattern | FunctionalHandler, arg2?: FunctionalHandler) {
    let pattern;
    let handler;
    if (arg2) {
      pattern = ((arg1: any): Pattern);
      handler = (arg2: FunctionalHandler);

      warning(
        typeof pattern === 'string' || pattern instanceof RegExp,
        `'onText' only accepts string or regex, but received ${typeof pattern}`
      );
    } else {
      pattern = /[\s\S]*/;
      handler = ((arg1: any): FunctionalHandler);
    }

    this.onMessage(
      context =>
        context.event.isTextMessage &&
        matchPattern(pattern, context.event.message.text),
      handler
    );
    return this;
  }
}
