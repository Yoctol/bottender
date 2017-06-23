import micro from 'micro';

import createRequestHandler from '../createRequestHandler';
import verifyMessengerWebhook from '../verifyMessengerWebhook';

jest.mock('micro');
jest.mock('../verifyMessengerWebhook');

function setup({ platform = 'messenger' } = { platform: 'messenger' }) {
  const requestHandler = jest.fn();
  const bot = {
    createRequestHandler: () => requestHandler,
    connector: {
      platform,
    },
  };
  return {
    bot,
    requestHandler,
  };
}

it('should call verifyMessengerWebhook when GET', async () => {
  const { bot, requestHandler } = setup();
  const middleware = jest.fn();
  verifyMessengerWebhook.mockReturnValue(middleware);
  requestHandler.mockReturnValue(Promise.resolve());

  const microRequestHandler = createRequestHandler(bot);

  const req = { method: 'GET' };
  const res = {
    sendStatus: jest.fn(),
  };

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
});

it('should not call verifyMessengerWebhook when GET if platform is not messenger', async () => {
  const { bot, requestHandler } = setup({ platform: 'line' });
  const middleware = jest.fn();
  verifyMessengerWebhook.mockReturnValue(middleware);
  requestHandler.mockReturnValue(Promise.resolve());

  const microRequestHandler = createRequestHandler(bot);

  const req = { method: 'GET' };
  const res = {
    sendStatus: jest.fn(),
  };

  await microRequestHandler(req, res);

  expect(middleware).not.toBeCalled();
  expect(micro.send).toBeCalledWith(res, 405);
});

it('should response 200 when no error be thrown in requestHandler', async () => {
  const { bot, requestHandler } = setup();
  requestHandler.mockReturnValue(Promise.resolve());

  const microRequestHandler = createRequestHandler(bot);

  const req = { method: 'POST', body: {} };
  const res = {};

  await microRequestHandler(req, res);

  expect(micro.send).toBeCalledWith(res, 200);
});
