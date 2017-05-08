/* @flow */
import warning from 'warning';

import * as constants from '../constants';
import type Context from '../session/Context';

type Condition = string | RegExp | ((context: Context) => boolean);

export type Handler = (context: Context) => void;

type ConditionHandler = {
  condition: Condition,
  handler: Handler,
};

function matchCondition(condition: Condition, payload: string): boolean {
  if (typeof condition === 'string') {
    return condition === payload;
  } else if (condition instanceof RegExp) {
    return condition.test(payload);
  }
  return false;
}

export default class HandlerBuilder {
  _echoHandlers: Array<ConditionHandler> = [];
  _getStartedHandler: ?Handler;
  _messageHandlers: Array<ConditionHandler> = [];
  _postbackHandlers: Array<ConditionHandler> = [];
  _quickReplyHandlers: Array<ConditionHandler> = [];
  _unhandledHandler: ?Handler;

  constructor() {
    warning(false, '`HandlerBuilder` is deprecated.');
  }

  onMessage(condition: Condition, handler: Handler) {
    this._messageHandlers.push({
      condition,
      handler,
    });
    return this;
  }

  onGetStarted(handler: Handler) {
    this._getStartedHandler = handler;
    return this;
  }

  onPostback(condition: Condition, handler: Handler) {
    this._postbackHandlers.push({
      condition,
      handler,
    });
    return this;
  }

  onQuickReply(condition: Condition, handler: Handler) {
    this._quickReplyHandlers.push({
      condition,
      handler,
    });
    return this;
  }

  onEcho(condition: Condition, handler: Handler) {
    this._echoHandlers.push({
      condition,
      handler,
    });
    return this;
  }

  onUnhandled(handler: Handler) {
    this._unhandledHandler = handler;
    return this;
  }

  build(): Handler {
    return (context: Context) => {
      const { message, postback } = context.event;

      if (message && message.is_echo) {
        for (let i = 0; i < this._echoHandlers.length; i++) {
          const echoHandler = this._echoHandlers[i];
          // FIXME: handle more than text case?
          if (message.text) {
            const match = matchCondition(echoHandler.condition, message.text);
            if (match) {
              return echoHandler.handler(context);
            }
          }
        }
        return;
      }

      if (message && message.read) {
        // handle read event in the future
        return;
      }

      if (message && message.quick_reply) {
        for (let i = 0; i < this._quickReplyHandlers.length; i++) {
          const quickReplyHandler = this._quickReplyHandlers[i];
          const match = matchCondition(
            quickReplyHandler.condition,
            message.quick_reply.payload
          );
          if (match) {
            return quickReplyHandler.handler(context);
          }
        }
        if (this._unhandledHandler) {
          return this._unhandledHandler(context);
        }
        return;
      }

      if (message) {
        // TODO: verify
        for (let i = 0; i < this._messageHandlers.length; i++) {
          const messageHandler = this._messageHandlers[i];
          const match =
            matchCondition(messageHandler.condition, message.text) ||
            (typeof messageHandler.condition === 'function' &&
              messageHandler.condition(context));
          if (match) {
            return messageHandler.handler(context);
          }
        }
        if (this._unhandledHandler) {
          return this._unhandledHandler(context);
        }
        return;
      }

      if (postback) {
        if (
          this._getStartedHandler &&
          postback.payload === constants.payload.GET_STARTED
        ) {
          return this._getStartedHandler(context);
        }

        // TODO: verify
        for (let i = 0; i < this._postbackHandlers.length; i++) {
          const postbackHandler = this._postbackHandlers[i];
          const match = matchCondition(
            postbackHandler.condition,
            postback.payload
          );
          if (match) {
            return postbackHandler.handler(context);
          }
        }
        if (this._unhandledHandler) {
          return this._unhandledHandler(context);
        }
      }
    };
  }
}
