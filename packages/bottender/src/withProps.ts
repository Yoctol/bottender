import partial from 'lodash/partial';

import { Action, AnyContext } from './types';

function withProps<C extends AnyContext, P extends Record<string, any>>(
  action: Action<C, P>,
  props: P
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
