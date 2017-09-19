import warning from 'warning';

import HandlerBuilder from './HandlerBuilder';

export default class BasicHandlerBuilder extends HandlerBuilder {
  constructor() {
    super();
    warning(
      false,
      '`BasicHandlerBuilder` is deprecated. use `HandlerBuilder` instead.'
    );
  }
}
