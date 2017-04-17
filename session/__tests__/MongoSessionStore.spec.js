import MongoSessionStore from '../MongoSessionStore';

jest.mock('../../database/resolve');

const resolve = require('../../database/resolve');

async function createMongoStore() {
  const sessions = {
    findOne: jest.fn(),
    replaceOne: jest.fn(),
    remove: jest.fn(),
  };

  const db = {
    collection: jest.fn(() => sessions),
  };
  resolve.resolveScoped = jest.fn(() => Promise.resolve(db));
  const store = new MongoSessionStore({ id: 'cph-nlp' });
  await store.init();
  return {
    store,
    sessions,
    db,
  };
}

it('should call resolveScoped when init', async () => {
  const db = {};
  resolve.resolveScoped = jest.fn(() => Promise.resolve(db));
  const store = new MongoSessionStore({ id: 'cph-nlp' });
  await store.init();
  expect(resolve.resolveScoped).toBeCalledWith('cph-nlp');
});

it('should call findOne with platform and id when get', async () => {
  const { store, sessions } = await createMongoStore();
  const sess = {};
  sessions.findOne.mockReturnValue(Promise.resolve(sess));
  await store.get('yoctol:1');
  expect(sessions.findOne).toBeCalledWith({ platform: 'yoctol', id: '1' });
});

it('should call replaceOne with upsert mode when set', async () => {
  const { store, sessions } = await createMongoStore();
  const sess = {};
  sessions.replaceOne.mockReturnValue(Promise.resolve());
  await store.set('yoctol:1', sess);
  expect(sessions.replaceOne).toBeCalledWith(
    { platform: 'yoctol', id: '1' },
    sess,
    { upsert: true }
  );
});

it('should call remove with platform and id when destroy', async () => {
  const { store, sessions } = await createMongoStore();
  sessions.remove.mockReturnValue(Promise.resolve());
  await store.destroy('yoctol:1');
  expect(sessions.remove).toBeCalledWith({ platform: 'yoctol', id: '1' });
});

it('should have the same behavior as set when save session', async () => {
  const { store, sessions } = await createMongoStore();
  const sess = {};
  sessions.replaceOne.mockReturnValue(Promise.resolve());
  await store.save('yoctol:1', sess);
  expect(sessions.replaceOne).toBeCalledWith(
    { platform: 'yoctol', id: '1' },
    sess,
    { upsert: true }
  );
});
