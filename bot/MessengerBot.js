import Bot from './Bot';
import MessengerConnector from './MessengerConnector';

export default class MessengerBot extends Bot {
  constructor({ id, accessToken, filePath }) {
    const connector = new MessengerConnector(accessToken);
    super({ id, filePath, connector });
  }
}
