/* @flow */
import * as constants from '../constants';

import BasicHandlerBuilder, {
  type Condition,
  type Handler,
} from './BasicHandlerBuilder';

type Pattern = string | RegExp;

function matchPattern(pattern: Pattern, text: string): boolean {
  if (typeof pattern === 'string') {
    return pattern === text;
  } else if (pattern instanceof RegExp) {
    return pattern.test(text);
  }
  return false;
}

export default class MessengerHandlerBuilder extends BasicHandlerBuilder {
  onMessage(condition: Condition, handler: Handler) {
    this.on(context => context.event.isMessage && condition(context), handler);
    return this;
  }

  onText(pattern: Pattern, handler: Handler) {
    this.onMessage(
      context =>
        context.event.isTextMessage &&
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
    this.onMessage(
      context => context.event.message.is_echo && condition(context),
      handler
    );
    return this;
  }
}
