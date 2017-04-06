import { MongoClient } from 'mongodb';

import scoped from './scoped';

let _db;

export default (async function resolve() {
  if (_db) {
    return _db;
  }
  const url = process.env.__MONGO_URL__ || 'mongodb://localhost:27017/toolbot';
  const db = await MongoClient.connect(url);
  _db = db;
  return db;
});

export const resolveScoped = async name => {
  const db = await resolve();
  return scoped(db, name);
};
