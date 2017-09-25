/* @flow */
import warning from 'warning';

import HandlerBuilder, {
  type Predicate,
  type FunctionalHandler,
  type Pattern,
  matchPattern,
} from './HandlerBuilder';

export default class LineHandlerBuilder extends HandlerBuilder {
  onPostback(predicate: Predicate, handler: FunctionalHandler) {
    this.on(context => context.event.isPostback && predicate(context), handler);
    return this;
  }

  onPayload(arg1: Pattern | FunctionalHandler, arg2?: FunctionalHandler) {
    let pattern;
    let handler;
    if (arg2) {
      pattern = ((arg1: any): Pattern);
      handler = (arg2: FunctionalHandler);

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
    } else {
      handler = ((arg1: any): FunctionalHandler);

      this.on(context => context.event.isPostback, handler);
    }

    return this;
  }

  // account is added as a friend (or unblocked).
  onFollow(handler: FunctionalHandler) {
    this.on(context => context.event.isFollow, handler);
    return this;
  }

  onUnfollow(handler: FunctionalHandler) {
    this.on(context => context.event.isUnfollow, handler);
    return this;
  }

  // account joins a group or talk room.
  onJoin(handler: FunctionalHandler) {
    this.on(context => context.event.isJoin, handler);
    return this;
  }

  // account leaves a group.
  onLeave(handler: FunctionalHandler) {
    this.on(context => context.event.isLeave, handler);
    return this;
  }

  onBeacon(predicate: Predicate, handler: FunctionalHandler) {
    this.on(context => context.event.isBeacon && predicate(context), handler);
    return this;
  }
}
