import { Action, AnyContext, Props } from './types';

function chain<C extends AnyContext>(actions: Action<C, any>[]) {
  if (!Array.isArray(actions))
    throw new TypeError('Chain stack must be an array!');
  for (const action of actions) {
    if (typeof action !== 'function')
      throw new TypeError('Chain must be composed of actions!');
  }

  return function Chain(context: C, props: Props<C> = {}): Action<C, any> {
    // do immutable reverse
    const reversedAction = actions.slice().reverse();

    const boundActions = reversedAction.reduce(
      (acc: Action<C, any>[], curr: Action<C, any>) => {
        if (acc.length === 0) {
          return [
            curr.bind(null, context, {
              ...props,
            }),
          ];
        }
        return [
          curr.bind(null, context, {
            ...props,
            next: acc[0],
          }),
          ...acc,
        ];
      },
      []
    );

    return boundActions[0];
  };
}

export default chain;
