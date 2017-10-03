import warning from 'warning';

import TelegramHandler from './TelegramHandler';

export default class TelegramHandlerBuilder extends TelegramHandler {
  constructor() {
    super();
    warning(
      false,
      '`TelegramHandlerBuilder` is deprecated. use `TelegramHandler` instead.'
    );
  }
}
