/* @flow */
import type Context from '../session/Context';

import type { Handler, Msg } from './HandlerBuilder';

type Condition = () => boolean;
type ConditionHandler = {
  condition: Condition,
  handler: Handler,
};
type Builder = {
  build: () => Handler,
};

export default class SwitchHandlerBuilder {
  _conditionHandlers: Array<ConditionHandler> = [];
  _fallbackHandler: ?Handler;

  when(condition: Condition, builder: Builder): SwitchHandlerBuilder {
    this._conditionHandlers.push({
      condition,
      handler: builder.build(),
    });
    return this;
  }

  else(builder: Builder): SwitchHandlerBuilder {
    this._fallbackHandler = builder.build();
    return this;
  }

  build() {
    return (context: Context, msg: Msg) => {
      for (let i = 0; i < this._conditionHandlers.length; i++) {
        const { condition, handler } = this._conditionHandlers[i];
        if (condition(context, msg)) {
          return handler(context, msg);
        }
      }
      if (this._fallbackHandler) {
        return this._fallbackHandler(context, msg);
      }
    };
  }
}
