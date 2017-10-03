import warning from 'warning';

import LineHandler from './LineHandler';

export default class LineHandlerBuilder extends LineHandler {
  constructor() {
    super();
    warning(
      false,
      '`LineHandlerBuilder` is deprecated. use `LineHandler` instead.'
    );
  }
}
