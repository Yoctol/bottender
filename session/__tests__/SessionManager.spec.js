import SessionManager from '../SessionManager';

const createMockStore = () => {
  const store = {
    init: jest.fn(() => Promise.resolve(store)),
    get: () => {},
    set: () => {},
    destroy: () => {},
  };
  return store;
};

it('should call store init when session manager init', async () => {
  const store = createMockStore();
  const manager = new SessionManager(store);
  await manager.init();
  expect(store.init).toBeCalled();
});
