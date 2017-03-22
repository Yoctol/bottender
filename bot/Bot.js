import warning from 'warning';

import MessengerBot from './MessengerBot';

export default class Bot extends MessengerBot {
  constructor(...args) {
    warning(false, '`Bot` is deprecated. Use `MessengerBot` instead.');
    super(...args);
  }
}
