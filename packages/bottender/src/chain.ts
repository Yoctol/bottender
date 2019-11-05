import Context from './context/Context';
import { Action, Client, Event, Props } from './types';

function chain<C extends Client = any, E extends Event = any>(
  actions: Action<C, E>[]
) {
  if (!Array.isArray(actions))
    throw new TypeError('Chain stack must be an array!');
  for (const action of actions) {
    if (typeof action !== 'function')
      throw new TypeError('Chain must be composed of actions!');
  }

  return function Chain(
    context: Context<C, E>,
    props: Props<C, E> = {}
  ): Action<C, E> {
    // do immutable reverse
    const reversedAction = actions.slice().reverse();

    const boundActions = reversedAction.reduce(
      (acc: Action<C, E>[], curr: Action<C, E>) => {
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
