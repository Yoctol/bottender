/* @flow */
import warning from 'warning';

import * as constants from '../constants';

import BasicHandlerBuilder, {
  type Condition,
  type Handler,
  type Pattern,
  normalizeHandler,
  matchPattern,
} from './BasicHandlerBuilder';

export default class MessengerHandlerBuilder extends BasicHandlerBuilder {
  onMessage(condition: Condition, handler: Handler) {
    this.on(
      context =>
        context.event.isMessage && !context.event.isEcho && condition(context),
      handler
    );
    return this;
  }

  onText(pattern: Pattern, handler: Handler) {
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
    return this;
  }

  onPostback(condition: Condition, handler: Handler) {
    this.on(context => context.event.isPostback && condition(context), handler);
    return this;
  }

  onPayload(pattern: Pattern, handler: Handler) {
    warning(
      typeof pattern === 'string' || pattern instanceof RegExp,
      `'onPayload' only accepts string or regex, but received ${typeof pattern}`
    );
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

  onQuickReply(condition: Condition, handler: Handler) {
    this.onMessage(
      context => !!context.event.message.quick_reply && condition(context),
      handler
    );
    return this;
  }

  onEcho(condition: Condition, handler: Handler) {
    this.on(context => context.event.isEcho && condition(context), handler);
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

  onRead(condition: Condition, handler: Handler) {
    this.on(context => context.event.isRead && condition(context), handler);
    return this;
  }

  onDelivery(condition: Condition, handler: Handler) {
    this.on(context => context.event.isDelivery && condition(context), handler);
    return this;
  }

  onUnhandled(handler: Handler) {
    this._fallbackHandler = {
      condition: context =>
        !context.event.isEcho &&
        !context.event.isRead &&
        !context.event.isDelivery,
      handler: normalizeHandler(handler),
    };
    return this;
  }
}
