/* @flow */

import { MongoClient } from 'mongodb';

import type { Session } from './Session';
import type { SessionStore } from './SessionStore';

type MongoCollection = {
  findOne: (filter: Object) => Promise<{}>,
  updateOne: (filter: Object, data: Object, options: Object) => Promise<void>,
  remove: (filter: Object) => Promise<void>,
};

type MongoConnection = {
  collection: (name: string) => MongoCollection,
};

export default class MongoSessionStore implements SessionStore {
  _url: string;

  _collectionName: string;

  _connection: ?MongoConnection;

  constructor(url: string, options: { collectionName?: string } = {}) {
    this._url = url;
    this._collectionName = options.collectionName || 'sessions';
  }

  async init(): Promise<MongoSessionStore> {
    this._connection = await MongoClient.connect(this._url);
    return this;
  }

  async read(key: string): Promise<Session> {
    const [platform, id] = key.split(':');
    const filter = {
      'user.platform': platform,
      'user.id': id,
    };
    return this._sessions.findOne(filter);
  }

  // FIXME: maxAge
  async write(key: string, sess: Session /* , maxAge */): Promise<void> {
    const [platform, id] = key.split(':');
    const filter = {
      'user.platform': platform,
      'user.id': id,
    };

    await this._sessions.updateOne(filter, sess, {
      upsert: true,
    });
  }

  async destroy(key: string): Promise<void> {
    const [platform, id] = key.split(':');
    const filter = {
      'user.platform': platform,
      'user.id': id,
    };
    await this._sessions.remove(filter);
  }

  get _sessions(): MongoCollection {
    if (this._connection == null) {
      throw new Error(
        'MongoSessionStore: must call `init` before any operation.'
      );
    }
    return this._connection.collection(this._collectionName);
  }
}
