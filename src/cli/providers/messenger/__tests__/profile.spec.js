import {
  getMessengerProfile,
  setMessengerProfile,
  deleteMessengerProfile,
  trimDomain,
} from '../profile';

jest.mock('messaging-api-messenger');

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { MessengerClient } = require('messaging-api-messenger');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const profile = {
  get_started: {
    payload: 'GET_STARTED',
  },
  persistent_menu: [
    {
      locale: 'default',
      composer_input_disabled: false,
      call_to_actions: [
        {
          type: 'postback',
          title: '__TITLE_HERE__',
          payload: '__PAYLOAD_HERE__',
        },
        {
          type: 'web_url',
          title: '__TITLE_HERE__',
          url: 'http://example.com',
        },
      ],
    },
  ],
  greeting: [
    {
      locale: 'default',
      text: 'Hello!',
    },
  ],
};

const setup = (
  {
    _getMessengerProfile,
    _setMessengerProfile,
    _deleteMessengerProfile,
    force,
  } = {}
) => {
  const ctx = {
    argv: {
      force,
    },
  };
  const client = {
    getMessengerProfile: _getMessengerProfile || jest.fn(),
    setMessengerProfile: _setMessengerProfile || jest.fn(),
    deleteMessengerProfile: _deleteMessengerProfile || jest.fn(),
  };
  MessengerClient.connect.mockReturnValue(client);

  return {
    client,
    MessengerClient,
    ctx,
  };
};

let processExit;

beforeEach(() => {
  getConfig.mockReturnValue({
    accessToken: 'anyToken',
    profile,
  });
  processExit = process.exit;
  process.exit = jest.fn();
});

afterEach(() => {
  process.exit = processExit;
});

it('should be defined', () => {
  expect(getMessengerProfile).toBeDefined();
  expect(setMessengerProfile).toBeDefined();
  expect(deleteMessengerProfile).toBeDefined();
  expect(trimDomain).toBeDefined();
});

describe('#getMessengerProfile', () => {
  it('should call getMessengerProfile with all fields', async () => {
    const { client } = setup();

    await getMessengerProfile();

    expect(client.getMessengerProfile).toBeCalledWith([
      'account_linking_url',
      'persistent_menu',
      'get_started',
      'greeting',
      'whitelisted_domains',
      'payment_settings',
      'target_audience',
      'home_url',
    ]);
  });

  it('should give hint when not profile return', async () => {
    const _getMessengerProfile = jest.fn(() => Promise.resolve());
    setup({ _getMessengerProfile });

    await getMessengerProfile();

    expect(log.error).toHaveBeenCalledTimes(1);
  });
});

describe('#setMessengerProfile', () => {
  describe('--force', () => {
    it('should call delete and set when pass force option', async () => {
      const { client, ctx } = setup({ force: true });

      await setMessengerProfile(ctx);

      expect(client.deleteMessengerProfile).toBeCalledWith([
        'account_linking_url',
        'persistent_menu',
        'get_started',
        'greeting',
        'whitelisted_domains',
        'payment_settings',
        'target_audience',
        'home_url',
      ]);
      expect(client.setMessengerProfile).toBeCalledWith({
        get_started: {
          payload: 'GET_STARTED',
        },
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'postback',
                title: '__TITLE_HERE__',
                payload: '__PAYLOAD_HERE__',
              },
              {
                type: 'web_url',
                title: '__TITLE_HERE__',
                url: 'http://example.com',
              },
            ],
          },
        ],
        greeting: [
          {
            locale: 'default',
            text: 'Hello!',
          },
        ],
      });
    });
  });
  describe('without --force', () => {
    it('should call deleteMessengerProfile and setMessengerProfile', async () => {
      const existedProfile = {
        greeting: [
          {
            locale: 'default',
            text: 'Hello!',
          },
        ],
        whitelisted_domains: ['https://facebook.com'],
      };
      const _getMessengerProfile = jest.fn(() =>
        Promise.resolve([existedProfile])
      );
      const { client, ctx } = setup({ _getMessengerProfile });

      await setMessengerProfile(ctx);

      expect(client.deleteMessengerProfile).toBeCalledWith([
        'whitelisted_domains',
      ]);

      expect(client.setMessengerProfile).toBeCalledWith({
        get_started: {
          payload: 'GET_STARTED',
        },
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'postback',
                title: '__TITLE_HERE__',
                payload: '__PAYLOAD_HERE__',
              },
              {
                type: 'web_url',
                title: '__TITLE_HERE__',
                url: 'http://example.com',
              },
            ],
          },
        ],
      });
    });
    it('should not call deleteMessengerProfile', async () => {
      const existedProfile = {
        greeting: [
          {
            locale: 'default',
            text: 'Hello!',
          },
        ],
      };
      const _getMessengerProfile = jest.fn(() =>
        Promise.resolve([existedProfile])
      );
      const { client, ctx } = setup({ _getMessengerProfile });

      await setMessengerProfile(ctx);

      expect(client.deleteMessengerProfile).not.toBeCalled();
    });

    it('should not call setMessengerProfile', async () => {
      const existedProfile = {
        get_started: {
          payload: 'GET_STARTED',
        },
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'postback',
                title: '__TITLE_HERE__',
                payload: '__PAYLOAD_HERE__',
              },
              {
                type: 'web_url',
                title: '__TITLE_HERE__',
                url: 'http://example.com',
              },
            ],
          },
        ],
        greeting: [
          {
            locale: 'default',
            text: 'Hello!',
          },
        ],
      };
      const _getMessengerProfile = jest.fn(() =>
        Promise.resolve([existedProfile])
      );
      const { client, ctx } = setup({ _getMessengerProfile });

      await setMessengerProfile(ctx);

      expect(client.setMessengerProfile).not.toBeCalled();
    });

    it('should give hint when not call any client method', async () => {
      const existedProfile = {
        get_started: {
          payload: 'GET_STARTED',
        },
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'postback',
                title: '__TITLE_HERE__',
                payload: '__PAYLOAD_HERE__',
              },
              {
                type: 'web_url',
                title: '__TITLE_HERE__',
                url: 'http://example.com',
              },
            ],
          },
        ],
        greeting: [
          {
            locale: 'default',
            text: 'Hello!',
          },
        ],
      };
      const _getMessengerProfile = jest.fn(() =>
        Promise.resolve([existedProfile])
      );
      const { client, ctx } = setup({ _getMessengerProfile });

      await setMessengerProfile(ctx);

      expect(client.setMessengerProfile).not.toBeCalled();
      expect(client.deleteMessengerProfile).not.toBeCalled();
      expect(log.print).toHaveBeenCalledTimes(1);
    });
  });
});

describe('#deleteMessengerProfile', () => {
  it('should call deleteMessengerProfile with all fields', async () => {
    const { client } = setup();

    await deleteMessengerProfile();

    expect(client.deleteMessengerProfile).toBeCalledWith([
      'account_linking_url',
      'persistent_menu',
      'get_started',
      'greeting',
      'whitelisted_domains',
      'payment_settings',
      'target_audience',
      'home_url',
    ]);
  });
});

describe('#trimDomain', () => {
  it('should remove whitelisted_domains end slash', () => {
    const testProfile = {
      whitelisted_domains: [
        'https://www.facebook.com/',
        'https://facebook.com',
      ],
    };
    const trimProfile = trimDomain(testProfile);
    expect(trimProfile).toEqual({
      whitelisted_domains: ['https://www.facebook.com', 'https://facebook.com'],
    });
  });
});
