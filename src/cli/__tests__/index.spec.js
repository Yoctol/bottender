/* eslint-disable global-require */
jest.mock('../shared/log');

let log;

beforeEach(() => {
  jest.resetModules();
  log = require('../shared/log');
  log.error = jest.fn();
  log.bold = str => str;
  process.exit = jest.fn();
});

it('not warn when there is no any close match', () => {
  process.argv = [
    '/usr/local/bin/iojs',
    '/usr/local/bin/toolbot',
    'abcdefghijk',
  ];
  require('../index');
  expect(log.error).toHaveBeenCalledTimes(1);
  expect(process.exit).toBeCalledWith(1);
});
