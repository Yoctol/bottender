/* @flow */
import SessionData from './SessionData';

type SessionStore = {
  init: () => Promise<SessionStore>,
  get: (key: string) => Promise<any>,
  set: (key: string, data: any) => Promise<void>,
  destroy: (key: string) => Promise<void>,
};

type SessionRecord = {
  sessionData: SessionData,
  existed: boolean,
};

export default class SessionManager {
  _sessionStore: SessionStore;

  constructor(sessionStore: SessionStore) {
    this._sessionStore = sessionStore;
  }

  async init(): Promise<SessionStore> {
    return this._sessionStore.init();
  }

  async createSessionDataIfNotExists(key: string): Promise<SessionRecord> {
    const existed: boolean = !!await this._sessionStore.get(key);
    const sessionData: SessionData = existed
      ? await this._getSessionData(key)
      : await this._createSessionData(key);
    return {
      sessionData,
      existed,
    };
  }

  async _getSessionData(key: string): SessionData {
    const data = await this._sessionStore.get(key);
    return new SessionData(data);
  }

  async _createSessionData(key: string): SessionData {
    const sessionData = new SessionData();
    await this._sessionStore.set(key, sessionData);

    return sessionData;
  }

  async saveSessionData(key: string, data: SessionData): void {
    await this._sessionStore.set(key, data);
  }
}
