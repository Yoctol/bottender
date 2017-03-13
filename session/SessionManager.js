import Session from './Session';
import SessionData from './SessionData';
// import MemorySessionStore from './MemorySessionStore';
import PersistentMemorySessionStore from './PersistentMemorySessionStore';
// import DangerousFileSessionStore from './DangerousFileSessionStore';

export default class SessionManager {
  constructor(client, filePath) {
    this._client = client;
    // this._store = new MemorySessionStore();
    this._store = new PersistentMemorySessionStore(filePath, 500);
    // this._store = new DangerousFileSessionStore('./sess.json');
  }

  async init() {
    return this._store.init();
  }

  async exists(key) {
    return !!await this._store.get(key);
  }

  async getSession(key) {
    const data = await this._store.get(key);
    return new SessionData(data);
  }

  async createSession(key) {
    const session = new SessionData();
    await this._store.set(key, session);

    return session;
  }

  async createSessionIfNotExists(key) {
    const existed = await this.exists(key);
    const sessionData = existed
      ? await this.getSession(key)
      : await this.createSession(key);
    return {
      session: new Session({
        client: this._client,
        data: sessionData,
      }),
      existed,
    };
  }
}
