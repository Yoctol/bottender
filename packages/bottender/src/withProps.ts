import partial from 'lodash/partial';

import { Action, Props } from './types';

function withProps(action: Action, props: Props): Action {
  // TODO: we may only apply this on dev env
  Object.freeze(props);

  const actionWithProps = partial(action, partial.placeholder, props);

  Object.defineProperty(actionWithProps, 'name', {
    value: action.name || 'Anonymous',
  });

  return actionWithProps;
}

export default withProps;
