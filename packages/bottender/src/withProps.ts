import partial from 'lodash/partial';

import { Action, Client, Event, Props } from './types';

function withProps<C extends Client = any, E extends Event = any>(
  action: Action<C, E>,
  props: Props<C, E>
): Action<C, E> {
  // TODO: we may only apply this on dev env
  Object.freeze(props);

  const actionWithProps = partial(action, partial.placeholder, props);

  Object.defineProperty(actionWithProps, 'name', {
    value: action.name || 'Anonymous',
  });

  return actionWithProps;
}

export default withProps;
