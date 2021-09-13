import { MessengerClient } from 'messaging-api-messenger';
import { mocked } from 'ts-jest/utils';

import getChannelConfig from '../../../../shared/getChannelConfig';
import { deleteMessengerProfile } from '../profile';
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
  it('call deleteMessengerProfile', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    mocked(MessengerClient.prototype.deleteMessengerProfile).mockResolvedValue(
      {}
    );

    await deleteMessengerProfile(ctx);

    const client = mocked(MessengerClient).mock.instances[0];

    expect(client.deleteMessengerProfile).toBeCalledWith([
      'account_linking_url',
      'persistent_menu',
      'get_started',
      'greeting',
      'ice_breakers',
      'whitelisted_domains',
    ]);
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
    mocked(MessengerClient.prototype.deleteMessengerProfile).mockRejectedValue(
      error
    );

    await deleteMessengerProfile(ctx);

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
    mocked(MessengerClient.prototype.deleteMessengerProfile).mockRejectedValue(
      error
    );

    await deleteMessengerProfile(ctx);

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
    mocked(MessengerClient.prototype.deleteMessengerProfile).mockRejectedValue(
      new Error('something wrong happened')
    );

    await deleteMessengerProfile(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
