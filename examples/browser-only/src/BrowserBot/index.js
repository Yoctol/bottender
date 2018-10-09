import { Bot } from 'bottender';

import BrowserConnector from './BrowserConnector';

class BrowserBot extends Bot {
  constructor({ client }) {
    const connector = new BrowserConnector(client);
    super({ connector });
  }
}

export default BrowserBot;
