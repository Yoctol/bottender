import MongoSessionStore from '../MongoSessionStore';

jest.mock('../../database/resolve');

const resolve = require('../../database/resolve');

async function createMongoStore() {
  const sessions = {
    findOne: jest.fn(),
    updateOne: jest.fn(),
    remove: jest.fn(),
    insertOne: jest.fn(),
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
  expect(sessions.findOne).toBeCalledWith({
    'user.platform': 'yoctol',
    'user.id': '1',
  });
});

it('should call updateOne with _id and sess when set with _id', async () => {
  const { store, sessions } = await createMongoStore();
  const sess = { _id: '123456' };
  sessions.findOne.mockReturnValue(Promise.resolve({ sess }));
  sessions.updateOne.mockReturnValue(Promise.resolve());
  await store.set('yoctol:1', sess);
  expect(sessions.updateOne).toBeCalledWith({ _id: '123456' }, sess);
});

it('should call insertOne with sess when set without _id', async () => {
  const { store, sessions } = await createMongoStore();
  const sess = {};
  sessions.findOne.mockReturnValue(Promise.resolve(undefined));
  sessions.insertOne.mockReturnValue(
    Promise.resolve({
      insertedId: '1',
    })
  );
  await store.set('yoctol:1', sess);
  expect(sessions.insertOne).toBeCalledWith(sess);
});

it('should call remove with platform and id when destroy', async () => {
  const { store, sessions } = await createMongoStore();
  sessions.remove.mockReturnValue(Promise.resolve());
  await store.destroy('yoctol:1');
  expect(sessions.remove).toBeCalledWith({
    'user.platform': 'yoctol',
    'user.id': '1',
  });
});

it('should call updateOne with _id when save', async () => {
  const { store, sessions } = await createMongoStore();
  const sess = { _id: '123456' };
  sessions.updateOne.mockReturnValue(Promise.resolve());
  await store.save('yoctol:1', sess);
  expect(sessions.updateOne).toBeCalledWith({ _id: '123456' }, sess);
});
