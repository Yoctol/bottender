import SessionData from '../SessionData';
import SessionManager from '../SessionManager';

const createMockStore = () => {
  const store = {
    init: jest.fn(() => Promise.resolve(store)),
    get: jest.fn(),
    set: () => {},
    destroy: () => {},
    save: jest.fn(() => Promise.resolve()),
  };
  return store;
};

it('should call store init when session manager init', async () => {
  const store = createMockStore();
  const manager = new SessionManager(store);
  await manager.init();
  expect(store.init).toBeCalled();
});

describe('#createSessionDataIfNotExists', () => {
  it('should create session data when it does not exist', async () => {
    const store = createMockStore();
    store.get.mockReturnValue(undefined);
    const manager = new SessionManager(store);
    await manager.init();
    expect(await manager.createSessionDataIfNotExists('1')).toEqual({
      sessionData: new SessionData(),
      existed: false,
    });
  });

  it('should return existed session data when it does exists', async () => {
    const store = createMockStore();
    store.get.mockReturnValue({});
    const manager = new SessionManager(store);
    await manager.init();
    expect(await manager.createSessionDataIfNotExists('1')).toEqual({
      sessionData: new SessionData({}),
      existed: true,
    });
  });
});

describe('#saveSessionData', () => {
  it('should call save method on the session store', async () => {
    const store = createMockStore();
    const manager = new SessionManager(store);
    await manager.init();

    const sessionData = new SessionData();

    await manager.saveSessionData('1', sessionData);

    expect(store.save).toBeCalledWith('1', sessionData);
  });
});
