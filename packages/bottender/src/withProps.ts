import partial from 'lodash/partial';

import Context from './context/Context';
import { Action, Props } from './types';

function withProps<C extends Context<any, any>>(
  action: Action<C, any>,
  props: Props<C>
): Action<C, any> {
  // TODO: we may only apply this on dev env
  Object.freeze(props);

  const actionWithProps = partial(action, partial.placeholder, props);

  Object.defineProperty(actionWithProps, 'name', {
    value: action.name || 'Anonymous',
  });

  return actionWithProps;
}

export default withProps;
