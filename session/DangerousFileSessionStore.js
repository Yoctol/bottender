import fs from 'fs';

import jsonfile from 'jsonfile';
import steno from 'steno';
import thenify from 'thenify';

const read = thenify(jsonfile.readFile);
const write = (filename, obj) =>
  thenify(steno.writeFile)(filename, JSON.stringify(obj));
const stat = thenify(fs.stat);

export default class FileSessionStore {
  constructor(filename) {
    this._filename = filename;
  }

  async init() {
    try {
      await stat(this._filename);
    } catch (err) {
      await write(this._filename, {});
    }
    return this;
  }

  async _readMap() {
    return read(this._filename);
  }

  async _writeMap(map) {
    return write(this._filename, map);
  }

  async get(key) {
    const map = await this._readMap();
    return map[key];
  }

  async set(key, sess /* , maxAge */) {
    const map = await this._readMap();
    map[key] = sess;
    return this._writeMap(map);
    // FIXME: maxAge
  }

  async destroy(key) {
    const map = await this._readMap();
    delete map[key];
    return this._writeMap(map);
  }
}
