/* @flow */
import warning from 'warning';

import Handler, {
  type Predicate,
  type FunctionalHandler,
  type Pattern,
  type Builder,
  matchPattern,
} from './Handler';

export default class MessengerHandler extends Handler {
  onPostback(predicate: Predicate, handler: FunctionalHandler | Builder) {
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

      this.on(({ event }) => {
        if (event.isPostback && matchPattern(pattern, event.postback.payload)) {
          return true;
        } else if (
          event.isMessage &&
          event.message.quick_reply &&
          matchPattern(pattern, event.message.quick_reply.payload)
        ) {
          return true;
        }
        return false;
      }, handler);
    } else {
      handler = ((arg1: any): FunctionalHandler);

      this.on(
        ({ event }) =>
          event.isPostback || (event.isMessage && !!event.message.quick_reply),
        handler
      );
    }
    return this;
  }

  onPayment(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(context => context.event.isPayment && predicate(context), handler);
    return this;
  }

  onOptin(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(context => context.event.isOptin && predicate(context), handler);
    return this;
  }

  onCheckoutUpdate(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(
      context => context.event.isCheckoutUpdate && predicate(context),
      handler
    );
    return this;
  }

  onPreCheckout(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(
      context => context.event.isPreCheckout && predicate(context),
      handler
    );
    return this;
  }

  onQuickReply(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.onMessage(
      context => !!context.event.message.quick_reply && predicate(context),
      handler
    );
    return this;
  }

  onEcho(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(context => context.event.isEcho && predicate(context), handler);
    return this;
  }

  onEchoText(pattern: Pattern, handler: FunctionalHandler | Builder) {
    this.on(
      context =>
        context.event.isEcho &&
        matchPattern(pattern, context.event.message.text), // FIXME
      handler
    );
    return this;
  }

  onRead(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(context => context.event.isRead && predicate(context), handler);
    return this;
  }

  onDelivery(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(context => context.event.isDelivery && predicate(context), handler);
    return this;
  }

  onLocation(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(
      context => context.event.isLocationMessage && predicate(context),
      handler
    );
    return this;
  }

  onImage(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(
      context => context.event.isImageMessage && predicate(context),
      handler
    );
    return this;
  }

  onAudio(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(
      context => context.event.isAudioMessage && predicate(context),
      handler
    );
    return this;
  }

  onVideo(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(
      context => context.event.isVideoMessage && predicate(context),
      handler
    );
    return this;
  }

  onFile(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(
      context => context.event.isFileMessage && predicate(context),
      handler
    );
    return this;
  }

  onFallback(predicate: Predicate, handler: FunctionalHandler | Builder) {
    this.on(
      context => context.event.isFallbackMessage && predicate(context),
      handler
    );
    return this;
  }
}
