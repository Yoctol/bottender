import Bot from './Bot';
import MessengerConnector from './MessengerConnector';

export default class MessengerBot extends Bot {
  constructor({ accessToken, sessionStore }) {
    const connector = new MessengerConnector(accessToken);
    super({ connector, sessionStore });
  }
}
