const createContext = () => ({
  params: {
    name: 'dummy',
  },
  response: {},
});

afterEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

it('should correctly response when file exists', async () => {
  const read = () => Promise.resolve('<html></html>');
  const mockThenify = jest.fn(() => read);
  jest.mock('thenify', () => mockThenify);

  const serveWebviews = require('../serveWebviews').default; // eslint-disable-line global-require
  const middleware = serveWebviews({ dirname: '' });

  const ctx = createContext();
  await middleware(ctx);
  expect(ctx.response.body).toBe('<html></html>');
});

it('should not have body when file does not exist', async () => {
  const read = () => Promise.reject(new Error());
  const mockThenify = jest.fn(() => read);
  jest.mock('thenify', () => mockThenify);

  const serveWebviews = require('../serveWebviews').default; // eslint-disable-line global-require
  const middleware = serveWebviews({ dirname: '' });

  const ctx = createContext();
  await middleware(ctx);
  expect(ctx.response.body).toBeUndefined();
});
