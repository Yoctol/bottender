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
  onPostback(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isPostback, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isPostback && predicate(context),
        handler
      );
    }

    return this;
  }

  onPayload(
    ...args:
      | [Pattern, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);

      this.on(context => context.event.isPostback, handler);
    } else {
      // eslint-disable-next-line prefer-const
      let [pattern, handler]: [
        Pattern,
        FunctionalHandler | Builder,
      ] = (args: any);

      if (handler.build) {
        handler = handler.build();
      }

      warning(
        typeof pattern === 'string' || pattern instanceof RegExp,
        `'onPayload' only accepts string or regex, but received ${typeof pattern}`
      );

      if (pattern instanceof RegExp) {
        const _handler = handler;
        handler = context => {
          // $FlowFixMe
          const match = pattern.exec(context.event.postback.data);

          if (!match) return _handler(context);

          // reset index so we start at the beginning of the regex each time
          // $FlowFixMe
          pattern.lastIndex = 0;

          return _handler(context, match);
        };
      }

      this.on(
        context =>
          context.event.isPostback &&
          matchPattern(pattern, context.event.postback.data),
        handler
      );
    }

    return this;
  }

  // account is added as a friend (or unblocked).
  onFollow(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isFollow, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(context => context.event.isFollow && predicate(context), handler);
    }

    return this;
  }

  onUnfollow(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isUnfollow, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isUnfollow && predicate(context),
        handler
      );
    }

    return this;
  }

  // account joins a group or talk room.
  onJoin(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isJoin, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(context => context.event.isJoin && predicate(context), handler);
    }

    return this;
  }

  // account leaves a group.
  onLeave(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isLeave, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(context => context.event.isLeave && predicate(context), handler);
    }

    return this;
  }

  onBeacon(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isBeacon, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(context => context.event.isBeacon && predicate(context), handler);
    }

    return this;
  }
}
