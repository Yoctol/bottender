import warning from 'warning';

import SlackHandler from './SlackHandler';

export default class SlackHandlerBuilder extends SlackHandler {
  constructor() {
    super();
    warning(
      false,
      '`SlackHandlerBuilder` is deprecated. use `SlackHandler` instead.'
    );
  }
}
