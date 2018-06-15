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
  const res = {
    setHeader: jest.fn(),
    sendStatus: jest.fn(),
  };

  return {
    bot,
    requestHandler,
    res,
  };
}

it('should call verifyMessengerWebhook when GET', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'messenger' });
  const middleware = jest.fn();
  verifyMessengerWebhook.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'GET',
    url: '',
  };

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
});

it('should call verifySlackWebhook when POST and body with type', async () => {
  const { bot, res } = setup({ platform: 'slack' });
  const middleware = jest.fn();
  verifySlackWebhook.mockReturnValue(middleware);

  const microRequestHandler = createRequestHandler(bot);
  micro.json.mockImplementationOnce(() => ({ type: 'url_verification' }));

  const req = {
    method: 'POST',
    url: '',
    headers: { 'content-type': 'application/json' },
  };

  await microRequestHandler(req, res);

  expect(verifySlackWebhook()).toBeCalled();
});

it('should not call verifyMessengerWebhook when GET if platform is not messenger', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'line' });
  const middleware = jest.fn();
  verifyMessengerWebhook.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'GET',
    url: '',
  };

  await microRequestHandler(req, res);

  expect(middleware).not.toBeCalled();
  expect(micro.send).toBeCalledWith(res, 405);
});

it('should call verifyMessengerSignature if platform is Messenger', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'messenger' });
  const middleware = jest.fn();
  middleware.mockResolvedValue(true);
  verifyMessengerSignature.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    url: '',
    headers: { 'content-type': 'application/json' },
  };

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).toBeCalledWith(res, 200);
});

it('should not send 200 if verifyMessengerSignature fail if platform is Messenger', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'messenger' });
  const middleware = jest.fn();
  middleware.mockResolvedValue(false);
  verifyMessengerSignature.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    url: '',
    headers: { 'content-type': 'application/json' },
  };

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).not.toBeCalled();
});

it('should call verifyLineSignature if platform is Line', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'line' });
  const middleware = jest.fn();
  middleware.mockResolvedValue(true);
  verifyLineSignature.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    url: '',
    headers: { 'content-type': 'application/json' },
  };

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).toBeCalledWith(res, 200);
});

it('should not send 200 if verifyLineSignature fail if platform is Line', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'line' });
  const middleware = jest.fn();
  middleware.mockResolvedValue(false);
  verifyLineSignature.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    url: '',
    headers: { 'content-type': 'application/json' },
  };

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).not.toBeCalled();
});

it('should call verifySlackSignature if platform is Slack', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'slack' });
  const middleware = jest.fn();
  middleware.mockResolvedValue(true);
  verifySlackSignature.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();
  micro.json.mockImplementationOnce(() => ({ token: 'mytoken' }));

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    url: '',
    headers: { 'content-type': 'application/json' },
  };

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).toBeCalledWith(res, 200);
});

it('should not send 200 if verifySlackSignature fail and if platform is Slack', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'slack' });
  const middleware = jest.fn();
  middleware.mockResolvedValue(false);
  verifySlackSignature.mockReturnValue(middleware);
  requestHandler.mockResolvedValue();
  micro.json.mockImplementationOnce(() => ({ token: 'mytoken' }));

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    url: '',
    headers: { 'content-type': 'application/json' },
  };

  await microRequestHandler(req, res);

  expect(middleware).toBeCalled();
  expect(micro.send).not.toBeCalled();
});

it('should response 200 when no error be thrown in requestHandler', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'other' });
  requestHandler.mockResolvedValue();

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    url: '',
    headers: { 'content-type': 'application/json' },
  };

  await microRequestHandler(req, res);

  expect(micro.send).toBeCalledWith(res, 200);
});

it('should merge query and body then pass into requestHandler', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'other' });
  requestHandler.mockResolvedValue();
  micro.json.mockImplementationOnce(() => ({ b: 2 }));

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    url: 'https://example.com/webhook?a=1',
    headers: { 'content-type': 'application/json' },
  };

  await microRequestHandler(req, res);

  expect(requestHandler).toBeCalledWith({ a: '1', b: 2 });
});

it('should overwrite query value if this key exists in body', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'other' });
  requestHandler.mockResolvedValue();
  micro.json.mockImplementationOnce(() => ({ a: 2 }));

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    url: 'https://example.com/webhook?a=1',
    headers: { 'content-type': 'application/json' },
  };

  await microRequestHandler(req, res);

  expect(requestHandler).toBeCalledWith({ a: 2 });
});

it('should response 200 if there is response return from requestHandler', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'other' });
  requestHandler.mockResolvedValue({ headers: {} });

  const microRequestHandler = createRequestHandler(bot);

  const req = {
    method: 'POST',
    url: '',
    headers: { 'content-type': 'application/json' },
  };

  await microRequestHandler(req, res);

  expect(micro.send).toBeCalledWith(res, 200, '');
});

it('should overwrite response when provide', async () => {
  const { bot, requestHandler, res } = setup({ platform: 'other' });
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
    url: '',
    headers: { 'content-type': 'application/json' },
  };

  await microRequestHandler(req, res);

  expect(res.setHeader).toBeCalledWith('X-Header', 'x');
  expect(micro.send).toBeCalledWith(res, 400, {
    name: 'x',
  });
});
