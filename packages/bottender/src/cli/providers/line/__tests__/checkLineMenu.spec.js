import { checkLineMenu } from '../menu';

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  messenger: {
    accessToken: '__FAKE_TOKEN__',
  },
  line: {
    accessToken: '__FAKE_TOKEN__',
    richMenus: [
      {
        size: {
          width: 2500,
          height: 1686,
        },
        selected: false,
        name: 'Nice richmenu',
        chatBarText: 'Tap here',
        areas: [
          {
            bounds: {
              x: 0,
              y: 0,
              width: 2500,
              height: 1686,
            },
            action: {
              type: 'postback',
              data: 'action=buy&itemid=123',
            },
          },
        ],
      },
    ],
  },
};

beforeEach(() => {
  log.error = jest.fn();
  log.print = jest.fn();
});

it('be defined', () => {
  expect(checkLineMenu).toBeDefined();
});

describe('resolved', () => {
  it('call getConfig', async () => {
    getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.line);

    checkLineMenu();

    expect(log.print).toBeCalledWith('LINE rich menu check done.');
  });
});

describe('reject', () => {
  it('handle error', async () => {
    getConfig.mockImplementation(() => {
      throw new Error('error');
    });

    process.exit = jest.fn();

    checkLineMenu();

    expect(log.error).toBeCalledWith('error');
    expect(process.exit).toBeCalledWith(1);
  });
});
