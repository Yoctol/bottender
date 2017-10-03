import warning from 'warning';

import MessengerHandler from './MessengerHandler';

export default class MessengerHandlerBuilder extends MessengerHandler {
  constructor() {
    super();
    warning(
      false,
      '`MessengerHandlerBuilder` is deprecated. use `MessengerHandler` instead.'
    );
  }
}
