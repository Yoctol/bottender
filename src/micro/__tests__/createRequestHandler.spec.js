import micro from 'micro';

import createRequestHandler from '../createRequestHandler';
import verifyMessengerWebhook from '../verifyMessengerWebhook';
import verifySlackWebhook from '../verifySlackWebhook';
import verifyLineSignature from '../verifyLineSignature';
import verifyMessengerSignature from '../verifyMessengerSignature';
import verifySlackSignature from '../verifySlackSignature';

jest.mock('micro');
jest.mock('../verifyMessengerWebhook');
jest.mock('../verifySlackWebhook');
jest.mock('../verifyLineSignature');
jest.mock('../verifyMessengerSignature');
jest.mock('../verifySlackSignature');

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
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = { method: 'GET' };
  const res = {
    sendStatus: jest.fn(),
  };

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
});

it('should call verifySlackWebhook when POST and body with type', async () => {
  const { bot } = setup({ platform: 'slack' });
  const middleware = jest.fn();
  verifySlackWebhook.mockReturnValue(middleware);

  const microRequestHandler = createRequestHandler(bot);
  micro.json.mockImplementationOnce(req => req.body);

  const req = {
    method: 'POST',
    body: { type: 'url_verification' },
    headers: { 'content-type': 'application/json' },
  };
  const res = {
    sendStatus: jest.fn(),
  };

  await microRequestHandler(req, res);

  expect(verifySlackWebhook()).toBeCalled();
});

it('should not call verifyMessengerWebhook when GET if platform is not messenger', async () => {
  const { bot, requestHandler } = setup({ platform: 'line' });
  const middleware = jest.fn();
  verifyMessengerWebhook.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = { method: 'GET' };
  const res = {
    sendStatus: jest.fn(),
  };

  await microRequestHandler(req, res);

  expect(middleware).not.toBeCalled();
  expect(micro.send).toBeCalledWith(res, 405);
});

it('should call verifyMessengerSignature if platform is Messenger', async () => {
  const { bot, requestHandler } = setup({ platform: 'messenger' });
  const middleware = jest.fn();
  middleware.mockResolvedValue(true);
  verifyMessengerSignature.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  };
  const res = {};

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).toBeCalledWith(res, 200);
});

it('should not send 200 if verifyMessengerSignature fail if platform is Messenger', async () => {
  const { bot, requestHandler } = setup({ platform: 'messenger' });
  const middleware = jest.fn();
  middleware.mockResolvedValue(false);
  verifyMessengerSignature.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  };
  const res = {};

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).not.toBeCalled();
});

it('should call verifyLineSignature if platform is Line', async () => {
  const { bot, requestHandler } = setup({ platform: 'line' });
  const middleware = jest.fn();
  middleware.mockResolvedValue(true);
  verifyLineSignature.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  };
  const res = {};

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).toBeCalledWith(res, 200);
});

it('should not send 200 if verifyLineSignature fail if platform is Line', async () => {
  const { bot, requestHandler } = setup({ platform: 'line' });
  const middleware = jest.fn();
  middleware.mockResolvedValue(false);
  verifyLineSignature.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  };
  const res = {};

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).not.toBeCalled();
});

it('should call verifySlackSignature if platform is Slack', async () => {
  const { bot, requestHandler } = setup({ platform: 'slack' });
  const middleware = jest.fn();
  middleware.mockResolvedValue(true);
  verifySlackSignature.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();
  micro.json.mockImplementationOnce(req => req.body);

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: { token: 'mytoken' },
  };
  const res = {};

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).toBeCalledWith(res, 200);
});

it('should not send 200 if verifySlackSignature fail and if platform is Slack', async () => {
  const { bot, requestHandler } = setup({ platform: 'slack' });
  const middleware = jest.fn();
  middleware.mockResolvedValue(false);
  verifySlackSignature.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();
  micro.json.mockImplementationOnce(req => req.body);

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: { token: 'mytoken' },
  };
  const res = {};

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).not.toBeCalled();
});

it('should response 200 when no error be thrown in requestHandler', async () => {
  const { bot, requestHandler } = setup({ platform: 'other' });
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    body: {},
    headers: { 'content-type': 'application/json' },
  };
  const res = {};

  await microRequestHandler(req, res);

  expect(micro.send).toBeCalledWith(res, 200);
});

it('should response 200 if there is response return from requestHandler', async () => {
  const { bot, requestHandler } = setup({ platform: 'other' });
  requestHandler.mockResolvedValue({ headers: {} });

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    body: {},
    headers: { 'content-type': 'application/json' },
  };
  const res = {};

  await microRequestHandler(req, res);

  expect(micro.send).toBeCalledWith(res, 200, '');
});

it('should overwrite response when provide', async () => {
  const { bot, requestHandler } = setup({ platform: 'other' });
  requestHandler.mockResolvedValue({
    status: 400,
    headers: {
      'X-Header': 'x',
    },
    body: {
      name: 'x',
    },
  });

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    body: {},
    headers: { 'content-type': 'application/json' },
  };
  const res = {
    setHeader: jest.fn(),
  };

  await microRequestHandler(req, res);

  expect(res.setHeader).toBeCalledWith('X-Header', 'x');
  expect(micro.send).toBeCalledWith(res, 400, {
    name: 'x',
  });
});
