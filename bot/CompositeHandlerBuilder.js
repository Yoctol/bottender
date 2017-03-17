/* @flow */
import type { Handler } from './HandlerBuilder';

type Condition = () => boolean;
type ConditionHandler = {
  condition: Condition,
  handler: Handler,
};
type Builder = {
  build: () => Handler,
};

export default class CompositeHandlerBuilder {
  _conditionHandlers: Array<ConditionHandler> = [];
  _fallbackHandler: ?Handler;

  when(condition: Condition, builder: Builder): CompositeHandlerBuilder {
    this._conditionHandlers.push({
      condition,
      handler: builder.build(),
    });
    return this;
  }

  else(builder: Builder): CompositeHandlerBuilder {
    this._fallbackHandler = builder.build();
    return this;
  }

  build() {
    return (session, msg) => {
      for (let i = 0; i < this._conditionHandlers.length; i++) {
        const { condition, handler } = this._conditionHandlers[i];
        if (condition(session, msg)) {
          handler(session, msg);
          return;
        }
      }
      if (this._fallbackHandler) {
        this._fallbackHandler(session, msg);
      }
    };
  }
}
