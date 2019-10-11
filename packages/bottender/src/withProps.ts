import Context from './context/Context';
import { Action, Props } from './types';

function withProps(action: Action, props: Props): Action {
  // TODO: we may only apply this on dev env
  Object.freeze(props);

  const actionWithProps = (context: Context): Action => {
    return action.bind(null, context, props);
  };

  Object.defineProperty(actionWithProps, 'name', {
    value: `withProps(${action.name || 'Anonymous'})`,
  });

  return actionWithProps;
}

export default withProps;
