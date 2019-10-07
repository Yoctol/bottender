import curry from 'lodash/curry';
import warning from 'warning';

const attachOptions = (options, action) => {
  if (
    !(
      typeof action.argsLength === 'number' &&
      action.argsLength > 0 &&
      action.allowOptions === true
    )
  ) {
    warning(false, 'attachOptions: cannot attach options to this action');

    return action;
  }

  // eslint-disable-next-line no-param-reassign
  action._options = {
    ...action._options,
    ...options,
  };

  return action;
};

export default curry(attachOptions);
