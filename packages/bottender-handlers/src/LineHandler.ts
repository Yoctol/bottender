import warning from 'warning';

import Handler, {
  Builder,
  FunctionalHandler,
  Pattern,
  Predicate,
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
        FunctionalHandler | Builder
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onPostback' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isPostback &&
          predicate(context.event.postback, context),
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

      this.on(context => context.event.isPayload, handler);
    } else {
      // eslint-disable-next-line prefer-const
      let [pattern, handler]: [
        Pattern,
        FunctionalHandler | Builder
      ] = (args: any);

      if (handler.build) {
        handler = handler.build();
      }

      warning(
        typeof pattern === 'function' ||
          typeof pattern === 'string' ||
          pattern instanceof RegExp,
        `'onPayload' only accepts string, regex or function, but received ${typeof pattern}`
      );

      if (typeof pattern === 'function') {
        const predicate: Predicate = pattern;
        this.on(
          context =>
            context.event.isPayload &&
            predicate(context.event.payload, context),
          handler
        );
      } else {
        if (pattern instanceof RegExp) {
          const _handler = handler;
          handler = context => {
            // $FlowFixMe
            const match = pattern.exec(context.event.payload);

            if (!match) return _handler(context);

            // reset index so we start at the beginning of the regex each time
            // $FlowFixMe
            pattern.lastIndex = 0;

            return _handler(context, match);
          };
        }

        this.on(
          context =>
            context.event.isPayload &&
            matchPattern(pattern, context.event.payload),
          handler
        );
      }
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
        FunctionalHandler | Builder
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onFollow' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isFollow && predicate(context.event.follow, context),
        handler
      );
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
        FunctionalHandler | Builder
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onUnfollow' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isUnfollow &&
          predicate(context.event.unfollow, context),
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
        FunctionalHandler | Builder
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onJoin' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isJoin && predicate(context.event.join, context),
        handler
      );
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
        FunctionalHandler | Builder
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onLeave' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isLeave && predicate(context.event.leave, context),
        handler
      );
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
        FunctionalHandler | Builder
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onBeacon' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isBeacon && predicate(context.event.beacon, context),
        handler
      );
    }

    return this;
  }
}
