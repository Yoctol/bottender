import Bot from './Bot';
import LINEConnector from './LINEConnector';

export default class LINEBot extends Bot {
  constructor({ accessToken, channelSecret, sessionStore }) {
    const connector = new LINEConnector({ accessToken, channelSecret });
    super({ connector, sessionStore });
  }
}
