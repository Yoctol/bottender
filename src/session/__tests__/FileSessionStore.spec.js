import FileSessionStore from '../FileSessionStore';

function setup() {
  const store = new FileSessionStore();
  const jfs = store.getJFS();
  jfs.get = jest.fn();
  jfs.save = jest.fn();
  jfs.delete = jest.fn();
  return {
    store,
    jfs,
  };
}

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

    jfs.get.mockReturnValue(Promise.resolve({ x: 1 }));

    expect(await store.read('yoctol:1')).toEqual({ x: 1 });
    expect(jfs.get).toBeCalledWith('yoctol:1');
  });

  it('should return null when jfs throw error', async () => {
    const { store, jfs } = setup();
    await store.init();

    jfs.get.mockReturnValue(Promise.reject(new Error()));

    expect(await store.read('yoctol:1')).toBeNull();
    expect(jfs.get).toBeCalledWith('yoctol:1');
  });
});

describe('#write', () => {
  it('should call jfs save with key, value', async () => {
    const { store, jfs } = setup();
    await store.init();

    const sess = { x: 1 };

    await store.write('yoctol:1', sess, 5);

    expect(jfs.save).toBeCalledWith('yoctol:1', sess);
  });
});

describe('#destroy', () => {
  it('should call jfs delete with key', async () => {
    const { store, jfs } = setup();
    await store.init();

    await store.destroy('yoctol:1');

    expect(jfs.delete).toBeCalledWith('yoctol:1');
  });
});
