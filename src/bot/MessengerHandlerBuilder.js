/* @flow */
import warning from 'warning';

import * as constants from '../constants';

import BasicHandlerBuilder, {
  type Predicate,
  type Handler,
  type Pattern,
  normalizeHandler,
  matchPattern,
} from './BasicHandlerBuilder';

export default class MessengerHandlerBuilder extends BasicHandlerBuilder {
  onMessage(predicate: Predicate, handler: Handler) {
    this.on(
      context =>
        context.event.isMessage && !context.event.isEcho && predicate(context),
      handler
    );
    return this;
  }

  onText(arg1: Pattern | Handler, arg2?: Handler) {
    let pattern;
    let handler;
    if (arg2) {
      pattern = ((arg1: any): Pattern);
      handler = (arg2: Handler);

      warning(
        typeof pattern === 'string' || pattern instanceof RegExp,
        `'onText' only accepts string or regex, but received ${typeof pattern}`
      );
    } else {
      pattern = /[\s\S]*/;
      handler = ((arg1: any): Handler);
    }
    this.onMessage(
      context =>
        context.event.isTextMessage &&
        !context.event.isEcho &&
        matchPattern(pattern, context.event.message.text),
      handler
    );
    return this;
  }

  onPostback(predicate: Predicate, handler: Handler) {
    this.on(context => context.event.isPostback && predicate(context), handler);
    return this;
  }

  onPayload(arg1: Pattern | Handler, arg2?: Handler) {
    let pattern;
    let handler;
    if (arg2) {
      pattern = ((arg1: any): Pattern);
      handler = (arg2: Handler);

      warning(
        typeof pattern === 'string' || pattern instanceof RegExp,
        `'onPayload' only accepts string or regex, but received ${typeof pattern}`
      );
    } else {
      pattern = /[\s\S]*/;
      handler = ((arg1: any): Handler);
    }
    this.on(({ event }) => {
      if (event.isPostback && matchPattern(pattern, event.postback.payload)) {
        return true;
      }
      if (
        event.isMessage &&
        event.message.quick_reply &&
        matchPattern(pattern, event.message.quick_reply.payload)
      ) {
        return true;
      }
      return false;
    }, handler);
    return this;
  }

  onGetStarted(handler: Handler) {
    this.onPayload(constants.payload.GET_STARTED, handler);
    return this;
  }

  onQuickReply(predicate: Predicate, handler: Handler) {
    this.onMessage(
      context => !!context.event.message.quick_reply && predicate(context),
      handler
    );
    return this;
  }

  onEcho(predicate: Predicate, handler: Handler) {
    this.on(context => context.event.isEcho && predicate(context), handler);
    return this;
  }

  onEchoText(pattern: Pattern, handler: Handler) {
    this.on(
      context =>
        context.event.isEcho &&
        matchPattern(pattern, context.event.message.text), // FIXME
      handler
    );
    return this;
  }

  onRead(predicate: Predicate, handler: Handler) {
    this.on(context => context.event.isRead && predicate(context), handler);
    return this;
  }

  onDelivery(predicate: Predicate, handler: Handler) {
    this.on(context => context.event.isDelivery && predicate(context), handler);
    return this;
  }

  onLocation(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isLocationMessage && predicate(context),
      handler
    );
    return this;
  }

  onImage(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isImageMessage && predicate(context),
      handler
    );
    return this;
  }

  onAudio(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isAudioMessage && predicate(context),
      handler
    );
    return this;
  }

  onVideo(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isVideoMessage && predicate(context),
      handler
    );
    return this;
  }

  onFile(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isFileMessage && predicate(context),
      handler
    );
    return this;
  }

  onFallback(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isFallbackMessage && predicate(context),
      handler
    );
    return this;
  }

  onUnhandled(handler: Handler) {
    this._fallbackHandler = {
      predicate: context =>
        !context.event.isEcho &&
        !context.event.isRead &&
        !context.event.isDelivery,
      handler: normalizeHandler(handler),
    };
    return this;
  }
}
