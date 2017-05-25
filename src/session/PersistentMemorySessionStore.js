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
    const [, id] = key.split(':');
    let sess = this._map.get(id);
    if (!sess) {
      const persistentMap = await this._readPersistentMap();
      if (persistentMap[id]) {
        sess = persistentMap[id];
        this._map.set(id, sess);
      }
    }
    return sess;
  }

  async set(key, sess /* , maxAge */) {
    const [, id] = key.split(':');
    this._map.set(id, sess);
    // FIXME: maxAge
  }

  async destroy(key) {
    const [, id] = key.split(':');
    delete this._map.del(id);
  }

  _readPersistentMap = () => read(this._filename);

  _mergeMapToFile = async () => {
    const persistentMap = await this._readPersistentMap();
    const mergedMap = this._map.dump().reduce(
      (prev, { k, v }) => ({
        ...prev,
        [k]: v,
      }),
      persistentMap
    );
    return write(this._filename, mergedMap);
  };

  async save(key, sess) {
    const [, id] = key.split(':');
    this._map.set(id, sess);
  }
}
