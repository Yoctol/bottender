import http from 'http';
import net from 'net';
import path from 'path';

import { JsonArray, JsonObject } from 'type-fest';
import { mocked } from 'ts-jest/utils';

import Server from '../Server';
import getBottenderConfig from '../../shared/getBottenderConfig';
import { cleanChannelBots } from '../../shared/getChannelBots';

let receivedContext;

jest.mock('../../messenger/MessengerContext');
jest.mock('../../shared/getBottenderConfig');
jest.mock(
  '/Users/username/bot/index.js',
  () =>
    async function App(context) {
      receivedContext = context;
      await context.sendText('Hello World');
    },
  { virtual: true }
);

const pathResolve = path.resolve;

beforeEach(() => {
  const customPathResolve = jest.fn((...args) => {
    if (args[0] === 'index.js') return '/Users/username/bot/index.js';
    return pathResolve(...args);
  });
  path.resolve = customPathResolve;
  cleanChannelBots();
});

afterEach(() => {
  path.resolve = pathResolve;
});

it('support built-in connectors', async () => {
  mocked(getBottenderConfig).mockReturnValue({
    channels: {
      messenger: {
        enabled: true,
        path: '/webhooks/messenger',
        sync: true,
        accessToken: 'ACCESS_TOKEN',
        appId: 'APP_ID',
        appSecret: 'APP_SECRET',
      },
    },
  });

  const server = new Server();

  await server.prepare();

  const requestHandler = server.getRequestHandler();

  const socket = new net.Socket();
  const req: http.IncomingMessage & {
    rawBody?: string;
    body?: JsonObject | JsonArray;
  } = new http.IncomingMessage(socket);

  const body = {
    object: 'page',
    entry: [
      {
        id: '1895382890692545',
        time: 1486464322257,
        messaging: [
          {
            sender: {
              id: '1412611362105802',
            },
            recipient: {
              id: '1895382890692545',
            },
            timestamp: 1486464322190,
            message: {
              mid: 'mid.1486464322190:cb04e5a654',
              seq: 339979,
              text: 'text',
            },
          },
        ],
      },
    ],
  };

  req.rawBody = JSON.stringify(body);
  req.body = body;
  req.method = 'post';
  req.headers.host = 'www.example.com';
  req.headers['x-hub-signature'] =
    'sha1=0c9b77eea92817a0fa756ee52388061d18112a48';
  req.url = '/webhooks/messenger';

  const res = new http.ServerResponse(req);

  await requestHandler(req, res);

  expect(receivedContext.sendText).toBeCalledWith('Hello World');
});

it('support custom connectors', async () => {
  const event = {
    rawEvent: {
      message: {
        text: 'hi',
      },
    },
    isMessage: true,
    isText: true,
    message: {
      text: 'hi',
    },
  };

  const session = {
    user: {
      id: '__id__',
    },
  };

  const context = {
    event,
    session,
    sendText: jest.fn(),
  };
  const connector = {
    platform: 'any',
    getUniqueSessionKey: jest.fn(() => '__id__'),
    updateSession: jest.fn(),
    mapRequestToEvents: jest.fn(() => [event]),
    createContext: jest.fn(() => context),
    preprocess: jest.fn(() => ({ shouldNext: true })),
  };

  mocked(getBottenderConfig).mockReturnValue({
    channels: {
      custom: {
        enabled: true,
        path: '/webhooks/custom',
        sync: true,
        connector,
      },
    },
  });

  const server = new Server();

  await server.prepare();

  const requestHandler = server.getRequestHandler();

  const socket = new net.Socket();
  const req: http.IncomingMessage & {
    rawBody?: string;
    body?: JsonObject | JsonArray;
  } = new http.IncomingMessage(socket);

  req.rawBody = '{}';
  req.body = {};
  req.headers.host = 'www.example.com';
  req.method = 'post';
  req.url = '/webhooks/custom';

  const res = new http.ServerResponse(req);

  await requestHandler(req, res);

  expect(context.sendText).toBeCalledWith('Hello World');
});
