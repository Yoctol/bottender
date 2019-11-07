import BrowserEvent from './BrowserEvent';

class BrowserContext {
  constructor({ client, rawEvent, session }) {
    this._client = client;
    this._event = new BrowserEvent(rawEvent);
    this._session = session;
  }

  sendText = text => {
    this._client.sendText(text);
  };

  sendTextWithDelay = (delay, text) => {
    setTimeout(() => {
      this.sendText(text);
    }, delay);
  };

  get event() {
    return this._event;
  }

  get session() {
    return this._session;
  }
}

export default BrowserContext;
