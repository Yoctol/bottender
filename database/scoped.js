class ScopedDB {
  constructor(db, scope) {
    this._db = db;
    this._scope = scope;
  }

  get scope() {
    return this._scope;
  }

  collection(name, options, callback) {
    return this._db.collection(`${this._scope}.${name}`, options, callback);
  }

  collections(callback) {
    function belongsToScope(collection) {
      return collection.startsWith(this._scope);
    }
    if (callback) {
      return this._db.collections((err, collections) => {
        if (err) return callback(err);
        callback(null, collections.filter(belongsToScope));
      });
    }
    return this._db
      .collections()
      .then(collections => collections.filter(belongsToScope));
  }

  createCollection(name, options, callback) {
    return this._db.createCollection(
      `${this._scope}.${name}`,
      options,
      callback,
    );
  }

  createIndex(name, fieldOrSpec, options, callback) {
    return this._db.createIndex(
      `${this._scope}.${name}`,
      fieldOrSpec,
      options,
      callback,
    );
  }

  dropCollection(name, callback) {
    return this._db.dropCollection(`${this._scope}.${name}`, callback);
  }

  ensureIndex(name, fieldOrSpec, options, callback) {
    return this._db.ensureIndex(
      `${this._scope}.${name}`,
      fieldOrSpec,
      options,
      callback,
    );
  }

  indexInformation(name, options, callback) {
    return this._db.indexInformation(
      `${this._scope}.${name}`,
      options,
      callback,
    );
  }

  renameCollection(from, to, options, callback) {
    return this._db.renameCollection(
      `${this._scope}.${from}`,
      `${this._scope}.${to}`,
      options,
      callback,
    );
  }
}

export default function scoped(db, scope) {
  return new ScopedDB(db, scope);
}
