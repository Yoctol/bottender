import { MessengerClient } from 'messaging-api-messenger';
import { mocked } from 'ts-jest/utils';

import getChannelConfig from '../../../../shared/getChannelConfig';
import { getMessengerProfile } from '../profile';
import * as log from '../../../../shared/log';

jest.mock('messaging-api-messenger');

jest.mock('../../../../shared/log');
jest.mock('../../../../shared/getChannelConfig');

const MOCK_FILE_WITH_PLATFORM = {
  channels: {
    messenger: {
      accessToken: '__FAKE_TOKEN__',
    },
  },
};

beforeEach(() => {
  process.exit = jest.fn();

  mocked(getChannelConfig).mockReturnValue(
    MOCK_FILE_WITH_PLATFORM.channels.messenger
  );
});

describe('resolved', () => {
  it('call getMessengerProfile', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    mocked(MessengerClient.prototype.getMessengerProfile).mockResolvedValue({});

    await getMessengerProfile(ctx);

    const client = mocked(MessengerClient).mock.instances[0];

    expect(client.getMessengerProfile).toBeCalledWith([
      'account_linking_url',
      'persistent_menu',
      'get_started',
      'greeting',
      'ice_breakers',
      'whitelisted_domains',
    ]);
  });

  it('error when no config setting', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    mocked(MessengerClient.prototype.getMessengerProfile).mockResolvedValue(
      null
    );

    await getMessengerProfile(ctx);

    const client = mocked(MessengerClient).mock.instances[0];

    expect(log.error).toBeCalled();
    expect(client.getMessengerProfile).toBeCalled();
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };
    const error = {
      response: {
        status: 400,
      },
    };
    mocked(MessengerClient.prototype.getMessengerProfile).mockRejectedValue(
      error
    );

    await getMessengerProfile(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by messenger', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };
    const error = {
      response: {
        status: 400,
        data: {
          error: {
            message: '(#100) ...',
            type: 'OAuthException',
            code: 100,
            error_subcode: 2018145,
            fbtrace_id: 'HXd3kIOXLsK',
          },
        },
      },
    };
    mocked(MessengerClient.prototype.getMessengerProfile).mockRejectedValue(
      error
    );

    await getMessengerProfile(ctx);

    expect(log.error).toBeCalled();
    expect(mocked(log.error).mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };
    mocked(MessengerClient.prototype.getMessengerProfile).mockRejectedValue(
      new Error('something wrong happened')
    );

    await getMessengerProfile(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
