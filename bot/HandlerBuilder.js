/* @flow */
import type Context from '../session/Context';

type Condition = string | RegExp;

export type Msg = {
  message: ?{ quick_reply: ?Object, text: string },
  postback: ?{ payload: string },
};
export type Handler = (context: Context, msg: Msg) => void;

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
  static GET_STARTED_PAYLOAD = '__ALOHA.AI_GET_STARTED__';

  _getStartedHandler: ?Handler;
  _messageHandlers: Array<ConditionHandler> = [];
  _postbackHandlers: Array<ConditionHandler> = [];
  _quickReplyHandlers: Array<ConditionHandler> = [];
  _unhandledHandler: ?Handler;

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

  onUnhandled(handler: Handler) {
    this._unhandledHandler = handler;
    return this;
  }

  build(): Handler {
    return (context: Context, msg: Msg) => {
      const { message, postback } = msg;
      if (message && message.quick_reply) {
        for (let i = 0; i < this._quickReplyHandlers.length; i++) {
          const quickReplyHandler = this._quickReplyHandlers[i];
          const match = matchCondition(
            quickReplyHandler.condition,
            message.quick_reply.payload,
          );
          if (match) {
            quickReplyHandler.handler(context, msg);
            return;
          }
        }
        if (this._unhandledHandler) {
          this._unhandledHandler(context, msg);
        }
        return;
      }
      if (message) {
        // TODO: verify
        for (let i = 0; i < this._messageHandlers.length; i++) {
          const messageHandler = this._messageHandlers[i];
          const match = matchCondition(messageHandler.condition, message.text);
          if (match) {
            messageHandler.handler(context, msg);
            return;
          }
        }
        if (this._unhandledHandler) {
          this._unhandledHandler(context, msg);
        }
        return;
      }
      if (postback) {
        if (
          this._getStartedHandler &&
          postback.payload === HandlerBuilder.GET_STARTED_PAYLOAD
        ) {
          this._getStartedHandler(context, msg);
          return;
        }

        // TODO: verify
        for (let i = 0; i < this._postbackHandlers.length; i++) {
          const postbackHandler = this._postbackHandlers[i];
          const match = matchCondition(
            postbackHandler.condition,
            postback.payload,
          );
          if (match) {
            postbackHandler.handler(context, msg);
            return;
          }
        }
        if (this._unhandledHandler) {
          this._unhandledHandler(context, msg);
        }
      }
    };
  }
}
