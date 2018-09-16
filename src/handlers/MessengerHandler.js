/* @flow */
import warning from 'warning';

import Handler, {
  type Builder,
  type FunctionalHandler,
  type Pattern,
  type Predicate,
  matchPattern,
} from './Handler';

export default class MessengerHandler extends Handler {
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
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);

      this.on(
        ({ event }) =>
          event.isPostback || (event.isMessage && !!event.message.quick_reply),
        handler
      );
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
            let message;
            if (context.event.isPostback) {
              message = context.event.postback.payload;
            } else {
              message = context.event.message.quick_reply.payload;
            }
            // $FlowFixMe
            const match = pattern.exec(message);

            if (!match) return _handler(context);

            // reset index so we start at the beginning of the regex each time
            // $FlowFixMe
            pattern.lastIndex = 0;

            return _handler(context, match);
          };
        }

        this.on(
          ({ event }) =>
            event.isPayload && matchPattern(pattern, event.payload),
          handler
        );
      }
    }
    return this;
  }

  onPayment(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isPayment, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onPayment' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isPayment && predicate(context.event.payment, context),
        handler
      );
    }

    return this;
  }

  onOptin(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isOptin, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onOptin' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isOptin && predicate(context.event.optin, context),
        handler
      );
    }

    return this;
  }

  onCheckoutUpdate(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isCheckoutUpdate, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onCheckoutUpdate' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isCheckoutUpdate &&
          predicate(context.event.checkoutUpdate, context),
        handler
      );
    }

    return this;
  }

  onPreCheckout(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isPreCheckout, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onPreCheckout' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isPreCheckout &&
          predicate(context.event.preCheckout, context),
        handler
      );
    }

    return this;
  }

  onQuickReply(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isQuickReply, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onQuickReply' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isQuickReply &&
          predicate(context.event.quickReply, context),
        handler
      );
    }

    return this;
  }

  onEcho(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isEcho, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context =>
          context.event.isEcho && predicate(context.event.message, context),
        handler
      );
    }

    return this;
  }

  onRead(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isRead, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onRead' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isRead && predicate(context.event.read, context),
        handler
      );
    }

    return this;
  }

  onDelivery(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isDelivery, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onDelivery' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isDelivery &&
          predicate(context.event.delivery, context),
        handler
      );
    }

    return this;
  }

  onLocation(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isLocation, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onLocation' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isLocation &&
          predicate(context.event.location, context),
        handler
      );
    }

    return this;
  }

  onImage(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isImage, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onImage' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isImage && predicate(context.event.image, context),
        handler
      );
    }

    return this;
  }

  onAudio(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isAudio, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onAudio' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isAudio && predicate(context.event.audio, context),
        handler
      );
    }

    return this;
  }

  onVideo(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isVideo, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onVideo' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isVideo && predicate(context.event.video, context),
        handler
      );
    }

    return this;
  }

  onFile(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isFile, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onFile' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isFile && predicate(context.event.file, context),
        handler
      );
    }

    return this;
  }

  onFallback(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isFallback, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onFallback' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isFallback &&
          predicate(context.event.fallback, context),
        handler
      );
    }

    return this;
  }
}
