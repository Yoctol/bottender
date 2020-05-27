import partial from 'lodash/partial';
import { JsonObject } from 'type-fest';

import Context from './context/Context';
import { Action } from './types';

function withProps<C extends Context, P extends JsonObject>(
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
