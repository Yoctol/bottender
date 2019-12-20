import { Context } from 'bottender';

class BrowserContext extends Context {
  sendText(text) {
    this._client.sendText(text);
  }
}

export default BrowserContext;
