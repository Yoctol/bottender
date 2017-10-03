import warning from 'warning';

import Handler from './Handler';

export default class HandlerBuilder extends Handler {
  constructor() {
    super();
    warning(false, '`HandlerBuilder` is deprecated. use `Handler` instead.');
  }
}
