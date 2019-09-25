import subMinutes from 'date-fns/subMinutes';

import FileSessionStore from '../FileSessionStore';

const expiresIn = 10;

function setup() {
  const store = new FileSessionStore('.session', expiresIn);
  const jfs = store.getJFS();
  jfs.get = jest.fn();
  jfs.all = jest.fn();
  jfs.save = jest.fn();
  jfs.delete = jest.fn();
  return {
    store,
    jfs,
  };
}

it('should be instanceof FileSessionStore', () => {
  expect(new FileSessionStore('.session')).toBeInstanceOf(FileSessionStore);
  expect(new FileSessionStore({ dirname: '.session' })).toBeInstanceOf(
    FileSessionStore
  );
});

describe('#init', () => {
  it('should return initialize store instance', async () => {
    const { store } = setup();

    expect(await store.init()).toBe(store);
  });
});

describe('#read', () => {
  it('should call jfs get with key', async () => {
    const { store, jfs } = setup();
    await store.init();

    jfs.get.mockImplementation((_, cb) => cb(null, { x: 1 }));

    expect(await store.read('yoctol:1')).toEqual({ x: 1 });
    expect(jfs.get).toBeCalledWith('yoctol:1', expect.any(Function));
  });

  it('should return null when jfs throw error', async () => {
    const { store, jfs } = setup();
    await store.init();

    jfs.get.mockImplementation((_, cb) => cb(new Error()));

    expect(await store.read('yoctol:1')).toBeNull();
    expect(jfs.get).toBeCalledWith('yoctol:1', expect.any(Function));
  });

  it('should return null when session expires', async () => {
    const { store, jfs } = setup();
    await store.init();

    const sess = { lastActivity: subMinutes(Date.now(), expiresIn + 1) };
    jfs.get.mockImplementation((_, cb) => cb(null, sess));

    expect(await store.read('yoctol:1')).toBeNull();
    expect(jfs.get).toBeCalledWith('yoctol:1', expect.any(Function));
  });
});

describe('#all', () => {
  it('should return all values in jfs', async () => {
    const { store, jfs } = setup();
    await store.init();

    jfs.all.mockImplementation(cb => cb(null, [{ id: 1 }, { id: 2 }]));

    expect(await store.all()).toEqual([{ id: 1 }, { id: 2 }]);
    expect(jfs.all).toBeCalledWith(expect.any(Function));
  });

  it('should return empty array when there is no item in sessions or all of them are expired', async () => {
    const { store, jfs } = setup();
    await store.init();

    jfs.all.mockImplementation(cb => cb(null, []));

    expect(await store.all()).toEqual([]);
    expect(jfs.all).toBeCalledWith(expect.any(Function));
  });
});

describe('#write', () => {
  it('should call jfs save with key, value', async () => {
    const { store, jfs } = setup();
    await store.init();

    jfs.save.mockImplementation((_, __, cb) => cb(null));

    const sess = { x: 1 };

    await store.write('yoctol:1', sess);

    expect(jfs.save).toBeCalledWith('yoctol:1', sess, expect.any(Function));
  });
});

describe('#destroy', () => {
  it('should call jfs delete with key', async () => {
    const { store, jfs } = setup();
    await store.init();

    jfs.delete.mockImplementation((_, cb) => cb(null));

    await store.destroy('yoctol:1');

    expect(jfs.delete).toBeCalledWith('yoctol:1', expect.any(Function));
  });
});
