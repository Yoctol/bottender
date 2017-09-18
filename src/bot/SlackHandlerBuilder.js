/* @flow */
import warning from 'warning';

import BasicHandlerBuilder, {
  type FunctionalHandler,
  type Pattern,
  matchPattern,
} from './BasicHandlerBuilder';

export default class SlackHandlerBuilder extends BasicHandlerBuilder {
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

      this.onMessage(
        context =>
          context.event.isTextMessage &&
          matchPattern(pattern, context.event.message.text),
        handler
      );
    } else {
      handler = ((arg1: any): FunctionalHandler);

      this.onMessage(context => context.event.isTextMessage, handler);
    }

    return this;
  }
}
