/* eslint-disable no-await-in-loop */

export default class ProxySessionStore {
  constructor(stores) {
    this._stores = stores;
  }

  async init() {
    for (let i = 0; i < this._stores.length; i++) {
      const store = this._stores[i];
      await store.init();
    }
    return this;
  }

  async get(key) {
    for (let i = 0; i < this._stores.length; i++) {
      const store = this._stores[i];
      const sess = await store.get(key);
      if (sess) return sess;
    }
    return null;
  }

  async set(key, sess /* , maxAge */) {
    for (let i = 0; i < this._stores.length; i++) {
      const store = this._stores[i];
      await store.set(key, sess);
    }
  }

  async destroy(key) {
    for (let i = 0; i < this._stores.length; i++) {
      const store = this._stores[i];
      await store.destroy(key);
    }
  }
}
