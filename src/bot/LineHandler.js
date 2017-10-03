/* @flow */
import warning from 'warning';

import Handler, {
  type Predicate,
  type FunctionalHandler,
  type Pattern,
  type Builder,
  matchPattern,
} from './Handler';

export default class LineHandler extends Handler {
  onPostback(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(context => context.event.isPostback && predicate(context), handler);
    return this;
  }

  onPayload(
    arg1: Pattern | FunctionalHandler | Builder,
    arg2?: FunctionalHandler | Builder
  ) {
    let pattern;
    let handler;
    if (arg2) {
      pattern = ((arg1: any): Pattern);
      handler = (arg2: FunctionalHandler | Builder);

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
      handler = ((arg1: any): FunctionalHandler | Builder);

      this.on(context => context.event.isPostback, handler);
    }

    return this;
  }

  // account is added as a friend (or unblocked).
  onFollow(handler: FunctionalHandler | Builder) {
    this.on(context => context.event.isFollow, handler);
    return this;
  }

  onUnfollow(handler: FunctionalHandler | Builder) {
    this.on(context => context.event.isUnfollow, handler);
    return this;
  }

  // account joins a group or talk room.
  onJoin(handler: FunctionalHandler | Builder) {
    this.on(context => context.event.isJoin, handler);
    return this;
  }

  // account leaves a group.
  onLeave(handler: FunctionalHandler | Builder) {
    this.on(context => context.event.isLeave, handler);
    return this;
  }

  onBeacon(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(context => context.event.isBeacon && predicate(context), handler);
    return this;
  }
}
