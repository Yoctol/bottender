import ProxySessionStore from '../ProxySessionStore';

function createMockStore() {
  return {
    init: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    destroy: jest.fn(),
  };
}

it('should call init to every store', async () => {
  const store1 = createMockStore();
  const store2 = createMockStore();
  const proxy = new ProxySessionStore([store1, store2]);
  store1.init.mockReturnValue(Promise.resolve(store1));
  store2.init.mockReturnValue(Promise.resolve(store2));
  await proxy.init();
  expect(store1.init).toBeCalled();
  expect(store2.init).toBeCalled();
});

it('should get value when there is value in one of store', async () => {
  let store1 = createMockStore();
  let store2 = createMockStore();
  let proxy = new ProxySessionStore([store1, store2]);
  let sess = {};
  store1.get.mockReturnValue(Promise.resolve(sess));
  expect(await proxy.get('ID')).toBe(sess);
  expect(store1.get).toBeCalledWith('ID');

  store1 = createMockStore();
  store2 = createMockStore();
  proxy = new ProxySessionStore([store1, store2]);
  sess = {};
  store1.get.mockReturnValue(Promise.resolve(null));
  store2.get.mockReturnValue(Promise.resolve(sess));
  expect(await proxy.get('ID')).toBe(sess);
  expect(store1.get).toBeCalledWith('ID');
  expect(store2.get).toBeCalledWith('ID');
});

it('should get null when there is no value in any stores', async () => {
  const store1 = createMockStore();
  const store2 = createMockStore();
  const proxy = new ProxySessionStore([store1, store2]);
  store1.get.mockReturnValue(Promise.resolve(null));
  store2.get.mockReturnValue(Promise.resolve(null));
  expect(await proxy.get('ID')).toBeNull();
});

it('should call set to every store', async () => {
  const store1 = createMockStore();
  const store2 = createMockStore();
  const proxy = new ProxySessionStore([store1, store2]);
  store1.set.mockReturnValue(Promise.resolve());
  store2.set.mockReturnValue(Promise.resolve());
  const sess = {};
  await proxy.set('ID', sess);
  expect(store1.set).toBeCalledWith('ID', sess);
  expect(store2.set).toBeCalledWith('ID', sess);
});

it('should call destroy to every store', async () => {
  const store1 = createMockStore();
  const store2 = createMockStore();
  const proxy = new ProxySessionStore([store1, store2]);
  store1.destroy.mockReturnValue(Promise.resolve());
  store2.destroy.mockReturnValue(Promise.resolve());
  await proxy.destroy('ID');
  expect(store1.destroy).toBeCalledWith('ID');
  expect(store2.destroy).toBeCalledWith('ID');
});
