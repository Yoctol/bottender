import subMinutes from 'date-fns/sub_minutes';

import MongoSessionStore from '../MongoSessionStore';

jest.mock('mongodb');

const { MongoClient } = require('mongodb');

const MINUTES_IN_ONE_YEAR = 365 * 24 * 60;

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
    MINUTES_IN_ONE_YEAR
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

  it('should connect to provided url', async () => {
    const { store } = setup();

    await store.init();
    expect(MongoClient.connect).toBeCalledWith('mongodb://fakemongourl');
  });
});

describe('#read', () => {
  it('should call findOne with platform and id', async () => {
    const { store, sessions } = setup();
    const sess = { lastActivity: Date.now() };
    sessions.findOne.mockReturnValue(Promise.resolve(sess));

    await store.init();

    expect(await store.read('messenger:1')).toBe(sess);
    expect(sessions.findOne).toBeCalledWith({
      id: 'messenger:1',
    });
  });

  it('should return null when document not found', async () => {
    const { store, sessions } = setup();
    sessions.findOne.mockReturnValue(Promise.resolve(null));

    await store.init();

    expect(await store.read('messenger:1')).toBeNull();
    expect(sessions.findOne).toBeCalledWith({
      id: 'messenger:1',
    });
  });

  it('should return null when seesion expires', async () => {
    const { store, sessions } = setup();
    const sess = {
      lastActivity: subMinutes(Date.now(), MINUTES_IN_ONE_YEAR + 1),
    };
    sessions.findOne.mockReturnValue(Promise.resolve(sess));

    await store.init();

    expect(await store.read('messenger:1')).toBeNull();
    expect(sessions.findOne).toBeCalledWith({
      id: 'messenger:1',
    });
  });

  it('should log Error when MongoClient.connect is null', async () => {
    console.error = jest.fn();
    const { store, sessions } = setup();
    const sess = {
      lastActivity: subMinutes(Date.now(), MINUTES_IN_ONE_YEAR + 1),
    };
    MongoClient.connect.mockReturnValue(null);
    sessions.findOne.mockReturnValue(Promise.resolve(sess));

    await store.init();
    await store.read('messenger:1');

    expect(console.error).toBeCalledWith(
      Error('MongoSessionStore: must call `init` before any operation.')
    );
  });
});

describe('#write', () => {
  it('should call updateOne with platform, id and session using upsert', async () => {
    const { store, sessions } = setup();
    const sess = {};
    sessions.updateOne.mockReturnValue(Promise.resolve());

    await store.init();
    await store.write('messenger:1', sess);

    expect(sessions.updateOne).toBeCalledWith(
      {
        id: 'messenger:1',
      },
      sess,
      { upsert: true }
    );
  });

  it('should log Error when MongoClient.connect is null', async () => {
    console.error = jest.fn();
    const { store, sessions } = setup();
    const sess = {};
    MongoClient.connect.mockReturnValue(null);
    sessions.updateOne.mockReturnValue(Promise.resolve());

    await store.init();
    await store.write('messenger:1', sess);

    expect(console.error).toBeCalledWith(
      Error('MongoSessionStore: must call `init` before any operation.')
    );
  });
});

describe('#destroy', () => {
  it('should call remove with platform and id', async () => {
    const { store, sessions } = setup();
    sessions.remove.mockReturnValue(Promise.resolve());

    await store.init();
    await store.destroy('messenger:1');

    expect(sessions.remove).toBeCalledWith({
      id: 'messenger:1',
    });
  });

  it('should log Error when MongoClient.connect is null', async () => {
    console.error = jest.fn();
    const { store, sessions } = setup();
    MongoClient.connect.mockReturnValue(null);
    sessions.remove.mockReturnValue(Promise.resolve());

    await store.init();
    await store.destroy('messenger:1');

    expect(console.error).toBeCalledWith(
      Error('MongoSessionStore: must call `init` before any operation.')
    );
  });
});

describe('collection name', () => {
  it('should use sessions as default collection name', async () => {
    const { store, sessions, connection } = setup();
    sessions.findOne.mockReturnValue(Promise.resolve(null));

    await store.init();
    await store.read('messenger:1');

    expect(connection.collection).toBeCalledWith('sessions');
  });

  it('should allow custom collection name', async () => {
    const { store, sessions, connection } = setup({
      collectionName: 'my.sessions',
    });
    sessions.findOne.mockReturnValue(Promise.resolve(null));

    await store.init();
    await store.read('messenger:1');

    expect(connection.collection).toBeCalledWith('my.sessions');
  });
});
