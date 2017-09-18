/* @flow */
import warning from 'warning';

import * as constants from '../constants';

import BasicHandlerBuilder, {
  type Predicate,
  type FunctionalHandler,
  type Pattern,
  matchPattern,
} from './BasicHandlerBuilder';

export default class MessengerHandlerBuilder extends BasicHandlerBuilder {
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
          !context.event.isEcho &&
          matchPattern(pattern, context.event.message.text),
        handler
      );
    } else {
      handler = ((arg1: any): FunctionalHandler);

      this.onMessage(
        context => context.event.isTextMessage && !context.event.isEcho,
        handler
      );
    }

    return this;
  }

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

  onPayment(predicate: Predicate, handler: FunctionalHandler) {
    this.on(context => context.event.isPayment && predicate(context), handler);
    return this;
  }

  onGetStarted(handler: FunctionalHandler) {
    this.onPayload(constants.payload.GET_STARTED, handler);
    return this;
  }

  onQuickReply(predicate: Predicate, handler: FunctionalHandler) {
    this.onMessage(
      context => !!context.event.message.quick_reply && predicate(context),
      handler
    );
    return this;
  }

  onEcho(predicate: Predicate, handler: FunctionalHandler) {
    this.on(context => context.event.isEcho && predicate(context), handler);
    return this;
  }

  onEchoText(pattern: Pattern, handler: FunctionalHandler) {
    this.on(
      context =>
        context.event.isEcho &&
        matchPattern(pattern, context.event.message.text), // FIXME
      handler
    );
    return this;
  }

  onRead(predicate: Predicate, handler: FunctionalHandler) {
    this.on(context => context.event.isRead && predicate(context), handler);
    return this;
  }

  onDelivery(predicate: Predicate, handler: FunctionalHandler) {
    this.on(context => context.event.isDelivery && predicate(context), handler);
    return this;
  }

  onLocation(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isLocationMessage && predicate(context),
      handler
    );
    return this;
  }

  onImage(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isImageMessage && predicate(context),
      handler
    );
    return this;
  }

  onAudio(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isAudioMessage && predicate(context),
      handler
    );
    return this;
  }

  onVideo(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isVideoMessage && predicate(context),
      handler
    );
    return this;
  }

  onFile(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isFileMessage && predicate(context),
      handler
    );
    return this;
  }

  onFallback(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isFallbackMessage && predicate(context),
      handler
    );
    return this;
  }

  // FIXME
  onEvent(handler: FunctionalHandler) {
    this._handlers.push({
      predicate: context =>
        !context.event.isEcho &&
        !context.event.isRead &&
        !context.event.isDelivery,
      handler,
    });
    return this;
  }
}
