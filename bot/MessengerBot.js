import Bot from './Bot';
import MessengerConnector from './MessengerConnector';

export default class MessengerBot extends Bot {
  constructor({ id, accessToken }) {
    const connector = new MessengerConnector(accessToken);
    super({ id, connector });
  }
}
