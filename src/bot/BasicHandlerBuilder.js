import warning from 'warning';

import Handler from './Handler';

export default class BasicHandlerBuilder extends Handler {
  constructor() {
    super();
    warning(
      false,
      '`BasicHandlerBuilder` is deprecated. use `Handler` instead.'
    );
  }
}
