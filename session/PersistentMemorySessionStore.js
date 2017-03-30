import fs from 'fs';

import Cache from 'lru-cache';
import jsonfile from 'jsonfile';
import steno from 'steno';
import thenify from 'thenify';

const read = thenify(jsonfile.readFile);
const write = (filename, obj) =>
  thenify(steno.writeFile)(filename, JSON.stringify(obj));
const stat = thenify(fs.stat);

const DEFAULT_SNAPSHOT_INTERVAL = 30000;

export default class PersistentMemorySessionStore {
  constructor(filename, maxSize) {
    this._map = new Cache(maxSize);
    this._filename = filename;
  }

  async init() {
    try {
      await stat(this._filename);
    } catch (err) {
      await write(this._filename, {});
    }
    const persistentMap = await this._readPersistentMap();

    this._map.load(Object.entries(persistentMap).map(([k, v]) => ({ k, v })));

    setInterval(this._mergeMapToFile, DEFAULT_SNAPSHOT_INTERVAL);

    return this;
  }

  async get(key) {
    let sess = this._map.get(key);
    if (!sess) {
      const persistentMap = await this._readPersistentMap();
      if (persistentMap[key]) {
        sess = persistentMap[key];
        this._map.set(key, sess);
      }
    }
    return sess;
  }

  async set(key, sess /* , maxAge */) {
    this._map.set(key, sess);
    // FIXME: maxAge
  }

  async destroy(key) {
    delete this._map.del(key);
  }

  _readPersistentMap = () => read(this._filename);

  _mergeMapToFile = async () => {
    const persistentMap = await this._readPersistentMap();
    const mergedMap = this._map.dump().reduce(
      (prev, { k, v }) => ({
        ...prev,
        [k]: v,
      }),
      persistentMap,
    );
    return write(this._filename, mergedMap);
  };

  async save(key, sess) {
    this._map.set(key, sess);
  }
}
