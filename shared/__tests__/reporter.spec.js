const NODE_ENV = process.env.NODE_ENV;

afterEach(() => {
  process.env.NODE_ENV = NODE_ENV;
  delete process.env.ROLLBAR_TOKEN;
  jest.resetModules();
});

it('should not be a real rollbar when in not production env', () => {
  process.env.ROLLBAR_TOKEN = 'x';
  const reporter = require('../reporter').default; // eslint-disable-line global-require

  expect(reporter.__FAKE_ROLLBAR__).toBe(true);
});

it('should not be a real rollbar when there is no token', () => {
  const reporter = require('../reporter').default; // eslint-disable-line global-require

  expect(reporter.__FAKE_ROLLBAR__).toBe(true);
});

it('should be a real rollbar when in production env and there is a token', () => {
  process.env.ROLLBAR_TOKEN = 'x';
  process.env.NODE_ENV = 'production';
  const reporter = require('../reporter').default; // eslint-disable-line global-require

  expect(reporter.__FAKE_ROLLBAR__).toBeUndefined();
});
