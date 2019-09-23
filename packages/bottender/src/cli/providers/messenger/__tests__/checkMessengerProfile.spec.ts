import { checkMessengerProfile } from '../profile';

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig').default;

const MOCK_FILE_WITH_PLATFORM = {
  channels: {
    messenger: {
      accessToken: '__FAKE_TOKEN__',
    },
  },
};

beforeEach(() => {
  log.error = jest.fn();
  log.print = jest.fn();
});

it('be defined', () => {
  expect(checkMessengerProfile).toBeDefined();
});

describe('resolved', () => {
  it('call getConfig', async () => {
    getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.channels.messenger);

    checkMessengerProfile();

    expect(log.print).toBeCalledWith('Messenger profile check done.');
  });
});

describe('reject', () => {
  it('handle error', async () => {
    getConfig.mockImplementation(() => {
      throw new Error('error');
    });

    process.exit = jest.fn();

    checkMessengerProfile();

    expect(log.error).toBeCalledWith('error');
    expect(process.exit).toBeCalledWith(1);
  });
});
