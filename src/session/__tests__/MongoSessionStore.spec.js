import subMinutes from 'date-fns/sub_minutes';

import MongoSessionStore from '../MongoSessionStore';

jest.mock('mongodb');

const { MongoClient } = require('mongodb');

const expiresIn = 10;

function setup(options = {}) {
  jest.resetAllMocks();
  const sessions = {
    findOne: jest.fn(),
    updateOne: jest.fn(),
    remove: jest.fn(),
  };
  const connection = {
    collection: jest.fn(() => sessions),
  };
  MongoClient.connect.mockReturnValue(Promise.resolve(connection));
  const store = new MongoSessionStore(
    'mongodb://fakemongourl',
    options,
    expiresIn
  );
  return {
    store,
    connection,
    sessions,
  };
}

describe('#init', () => {
  it('should return initialize store instance', async () => {
    const { store } = setup();

    expect(await store.init()).toBe(store);
  });

  it('should connect to provided url', async () => {
    const { store } = setup();

    await store.init();
    expect(MongoClient.connect).toBeCalledWith('mongodb://fakemongourl');
  });
});

describe('#read', () => {
  it('should call findOne with platform and id', async () => {
    const { store, sessions } = setup();
    await store.init();
    const sess = { lastActivity: Date.now() };
    sessions.findOne.mockReturnValue(Promise.resolve(sess));
    expect(await store.read('messenger:1')).toBe(sess);
    expect(sessions.findOne).toBeCalledWith({
      'user.platform': 'messenger',
      'user.id': '1',
    });
  });

  it('should return null when document not found', async () => {
    const { store, sessions } = setup();
    await store.init();
    sessions.findOne.mockReturnValue(Promise.resolve(null));
    expect(await store.read('messenger:1')).toBeNull();
    expect(sessions.findOne).toBeCalledWith({
      'user.platform': 'messenger',
      'user.id': '1',
    });
  });

  it('should return null when seesion expires', async () => {
    const { store, sessions } = setup();
    await store.init();
    const sess = { lastActivity: subMinutes(Date.now(), expiresIn + 1) };
    sessions.findOne.mockReturnValue(Promise.resolve(sess));
    expect(await store.read('messenger:1')).toBeNull();
    expect(sessions.findOne).toBeCalledWith({
      'user.platform': 'messenger',
      'user.id': '1',
    });
  });
});

describe('#write', () => {
  it('should call updateOne with platform, id and session using upsert', async () => {
    const { store, sessions } = setup();
    await store.init();
    const sess = {};
    sessions.updateOne.mockReturnValue(Promise.resolve());
    await store.write('messenger:1', sess);
    expect(sessions.updateOne).toBeCalledWith(
      { 'user.platform': 'messenger', 'user.id': '1' },
      sess,
      { upsert: true }
    );
  });
});

describe('#destroy', () => {
  it('should call remove with platform and id', async () => {
    const { store, sessions } = setup();
    await store.init();
    sessions.remove.mockReturnValue(Promise.resolve());
    await store.destroy('messenger:1');
    expect(sessions.remove).toBeCalledWith({
      'user.platform': 'messenger',
      'user.id': '1',
    });
  });
});

describe('collection name', () => {
  it('should use sessions as default collection name', async () => {
    const { store, sessions, connection } = setup();
    await store.init();
    sessions.findOne.mockReturnValue(Promise.resolve(null));
    await store.read('messenger:1');
    expect(connection.collection).toBeCalledWith('sessions');
  });

  it('should allow custom collection name', async () => {
    const { store, sessions, connection } = setup({
      collectionName: 'my.sessions',
    });
    await store.init();
    sessions.findOne.mockReturnValue(Promise.resolve(null));
    await store.read('messenger:1');
    expect(connection.collection).toBeCalledWith('my.sessions');
  });
});
