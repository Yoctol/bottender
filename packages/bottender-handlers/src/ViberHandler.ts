import warning from 'warning';

import Handler, {
  Builder,
  FunctionalHandler,
  Predicate,
} from './Handler';

export default class ViberHandler extends Handler {
  onSubscribed(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args as any);
      this.on(context => context.event.isSubscribed, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder
      ] = (args as any);

      warning(
        typeof predicate === 'function',
        `'onSubscribed' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isSubscribed &&
          predicate(context.event.subscribed, context),
        handler
      );
    }

    return this;
  }

  onUnsubscribed(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args as any);
      this.on(context => context.event.isUnsubscribed, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder
      ] = (args as any);

      warning(
        typeof predicate === 'function',
        `'onUnsubscribed' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isUnsubscribed &&
          predicate(context.event.unsubscribed, context),
        handler
      );
    }

    return this;
  }

  onConversationStarted(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args as any);
      this.on(context => context.event.isConversationStarted, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder
      ] = (args as any);

      warning(
        typeof predicate === 'function',
        `'onConversationStarted' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isConversationStarted &&
          predicate(context.event.conversationStarted, context),
        handler
      );
    }

    return this;
  }

  onDelivered(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args as any);
      this.on(context => context.event.isDelivered, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder
      ] = (args as any);

      warning(
        typeof predicate === 'function',
        `'onDelivered' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isDelivered &&
          predicate(context.event.delivered, context),
        handler
      );
    }

    return this;
  }

  onSeen(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args as any);
      this.on(context => context.event.isSeen, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder
      ] = (args as any);

      warning(
        typeof predicate === 'function',
        `'onSeen' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isSeen && predicate(context.event.seen, context),
        handler
      );
    }

    return this;
  }

  onFailed(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args as any);
      this.on(context => context.event.isFailed, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder
      ] = (args as any);

      warning(
        typeof predicate === 'function',
        `'onFailed' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isFailed && predicate(context.event.failed, context),
        handler
      );
    }

    return this;
  }
}
