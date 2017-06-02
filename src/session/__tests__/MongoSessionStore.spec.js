import MongoSessionStore from '../MongoSessionStore';

jest.mock('mongodb');

const { MongoClient } = require('mongodb');

async function createMongoStore() {
  const sessions = {
    findOne: jest.fn(),
    updateOne: jest.fn(),
    remove: jest.fn(),
  };
  MongoClient.connect.mockReturnValue(
    Promise.resolve({
      collection: jest.fn(() => sessions),
    })
  );
  const store = new MongoSessionStore('mongodb://fakemongourl');
  await store.init();
  return {
    store,
    sessions,
  };
}

it('should call findOne with platform and id when read', async () => {
  const { store, sessions } = await createMongoStore();
  const sess = {};
  sessions.findOne.mockReturnValue(Promise.resolve(sess));
  await store.read('yoctol:1');
  expect(sessions.findOne).toBeCalledWith({
    'user.platform': 'yoctol',
    'user.id': '1',
  });
});

it('should call updateOne with _id when write with _id', async () => {
  const { store, sessions } = await createMongoStore();
  const sess = { _id: '123456' };
  sessions.updateOne.mockReturnValue(Promise.resolve());
  await store.write('yoctol:1', sess);
  expect(sessions.updateOne).toBeCalledWith({ _id: '123456' }, sess, {
    upsert: true,
  });
});

it('should call updateOne with platform and id when write without _id', async () => {
  const { store, sessions } = await createMongoStore();
  const sess = {};
  sessions.updateOne.mockReturnValue(Promise.resolve());
  await store.write('yoctol:1', sess);
  expect(sessions.updateOne).toBeCalledWith(
    { 'user.platform': 'yoctol', 'user.id': '1' },
    sess,
    { upsert: true }
  );
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
