import BrowserContext from './BrowserContext';
import BrowserEvent from './BrowserEvent';

class BrowserConnector {
  constructor(client) {
    this._client = client;
  }

  get platform() {
    return 'browser';
  }

  getUniqueSessionKey() {
    return '1';
  }

  updateSession(session) {
    if (!session.user) {
      session.user = {
        id: '1',
        name: 'you',
        _updatedAt: new Date().toISOString(),
      };
    }

    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  }

  mapRequestToEvents(body) {
    return [new BrowserEvent(body)];
  }

  createContext(params) {
    return new BrowserContext({
      ...params,
      client: this._client,
    });
  }
}

export default BrowserConnector;
