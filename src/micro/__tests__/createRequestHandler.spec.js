import micro from 'micro';

import createRequestHandler from '../createRequestHandler';
import verifyMessengerWebhook from '../verifyMessengerWebhook';
import verifyLineSignature from '../verifyLineSignature';

jest.mock('micro');
jest.mock('../verifyMessengerWebhook');
jest.mock('../verifyLineSignature');

function setup({ platform }) {
  const requestHandler = jest.fn();
  const bot = {
    createRequestHandler: () => requestHandler,
    connector: {
      platform,
      verifySignature: jest.fn(),
    },
  };
  return {
    bot,
    requestHandler,
  };
}

it('should call verifyMessengerWebhook when GET', async () => {
  const { bot, requestHandler } = setup({ platform: 'messenger' });
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

it('should call verifyLineSignature if platform is Line', async () => {
  const { bot, requestHandler } = setup({ platform: 'line' });
  const middleware = jest.fn();
  middleware.mockReturnValue(Promise.resolve(true));
  verifyLineSignature.mockReturnValue(middleware);
  requestHandler.mockReturnValue(Promise.resolve());

  const microRequestHandler = createRequestHandler(bot);

  const req = { method: 'POST' };
  const res = {};

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).toBeCalledWith(res, 200);
});

it('should not send 200 if verifyLineSignature fail if platform is Line', async () => {
  const { bot, requestHandler } = setup({ platform: 'line' });
  const middleware = jest.fn();
  middleware.mockReturnValue(Promise.resolve(false));
  verifyLineSignature.mockReturnValue(middleware);
  requestHandler.mockReturnValue(Promise.resolve());

  const microRequestHandler = createRequestHandler(bot);

  const req = { method: 'POST' };
  const res = {};

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).not.toBeCalled();
});

it('should response 200 when no error be thrown in requestHandler', async () => {
  const { bot, requestHandler } = setup({ platform: 'other' });
  requestHandler.mockReturnValue(Promise.resolve());

  const microRequestHandler = createRequestHandler(bot);

  const req = { method: 'POST', body: {} };
  const res = {};

  await microRequestHandler(req, res);

  expect(micro.send).toBeCalledWith(res, 200);
});

it('should overwrite response when provide', async () => {
  const { bot, requestHandler } = setup({ platform: 'other' });
  requestHandler.mockReturnValue(
    Promise.resolve({
      status: 400,
      headers: {
        'X-Header': 'x',
      },
      body: {
        name: 'x',
      },
    })
  );

  const microRequestHandler = createRequestHandler(bot);

  const req = { method: 'POST', body: {} };
  const res = {
    setHeader: jest.fn(),
  };

  await microRequestHandler(req, res);

  expect(res.setHeader).toBeCalledWith('X-Header', 'x');
  expect(micro.send).toBeCalledWith(res, 400, {
    name: 'x',
  });
});
