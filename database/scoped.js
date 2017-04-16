import snakeCase from 'snake-case';

export class ScopedDB {
  constructor(db, scope) {
    this._db = db;
    this._scope = snakeCase(scope);
  }

  get scope() {
    return this._scope;
  }

  collection(name, ...args) {
    return this._db.collection(`${this._scope}.${name}`, ...args);
  }

  collections = callback => {
    const belongsToScope = collection =>
      collection.collectionName.startsWith(this._scope);
    if (callback) {
      return this._db.collections((err, collections) => {
        if (err) return callback(err);
        callback(null, collections.filter(belongsToScope));
      });
    }
    return this._db
      .collections()
      .then(collections => collections.filter(belongsToScope));
  };

  createCollection(name, ...args) {
    return this._db.createCollection(`${this._scope}.${name}`, ...args);
  }

  createIndex(name, ...args) {
    return this._db.createIndex(`${this._scope}.${name}`, ...args);
  }

  dropCollection(name, ...args) {
    return this._db.dropCollection(`${this._scope}.${name}`, ...args);
  }

  ensureIndex(name, ...args) {
    return this._db.ensureIndex(`${this._scope}.${name}`, ...args);
  }

  indexInformation(name, ...args) {
    return this._db.indexInformation(`${this._scope}.${name}`, ...args);
  }

  renameCollection(from, to, ...args) {
    return this._db.renameCollection(
      `${this._scope}.${from}`,
      `${this._scope}.${to}`,
      ...args
    );
  }
}

export default function scoped(db, scope) {
  return new ScopedDB(db, scope);
}
