const parallel = require('../parallel');

let log;
let info;
let warn;
let error;
let createLogger;

beforeEach(() => {
  console.log = jest.fn();
  console.info = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();

  const logger = require('../logger');

  log = logger.log;
  info = logger.info;
  warn = logger.warn;
  error = logger.error;
  createLogger = logger.createLogger;
});

it('#log should work', async () => {
  const action = log('print...');

  await action();

  expect(console.log).toBeCalledWith('print...');
  expect(action.name).toEqual('Log(print...)');
});

it('#info should work', async () => {
  const action = info('print...');

  await action();

  expect(console.info).toBeCalledWith('print...');
  expect(action.name).toEqual('Info(print...)');
});

it('#warn should work', async () => {
  const action = warn('print...');

  await action();

  expect(console.warn).toBeCalledWith('print...');
  expect(action.name).toEqual('Warn(print...)');
});

it('#error should work', async () => {
  const action = error('print...');

  await action();

  expect(console.error).toBeCalledWith('print...');
  expect(action.name).toEqual('Error(print...)');
});

it('#createLogger should work', async () => {
  const adapter = {
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
  const logger = createLogger(adapter);
  const action = parallel([
    logger.log('log...'),
    logger.info('info...'),
    logger.warn('warn...'),
    logger.error('error...'),
  ]);

  await action();

  expect(adapter.log).toBeCalledWith('log...');
  expect(adapter.info).toBeCalledWith('info...');
  expect(adapter.warn).toBeCalledWith('warn...');
  expect(adapter.error).toBeCalledWith('error...');
});

it('should support template', async () => {
  const action = log(
    'print {{context.session.user.first_name}} {{context.session.user.last_name}}...'
  );

  const context = {
    session: {
      user: {
        first_name: 'First',
        last_name: 'Last',
      },
    },
  };

  await action(context);

  expect(console.log).toBeCalledWith('print First Last...');
});

it('should support template with Chinese words', async () => {
  const action = log(
    'print {{context.session.user.姓氏}}{{context.session.user.名字}}...'
  );

  const context = {
    session: {
      user: {
        姓氏: '王',
        名字: '小明',
      },
    },
  };

  await action(context);

  expect(console.log).toBeCalledWith('print 王小明...');
});
