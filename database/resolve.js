import { MongoClient } from 'mongodb';

import scoped from './scoped';

let _db;

async function resolve() {
  if (_db) {
    return _db;
  }

  try {
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017/toolbot';
    const db = await MongoClient.connect(url);
    _db = db;
  } catch (err) {
    _db = {};
  }
  return _db;
}

async function resolveScoped(scope) {
  const db = await resolve();
  return scoped(db, scope);
}

export default resolve;

export { resolveScoped };
