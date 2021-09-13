import { MessengerClient } from 'messaging-api-messenger';
import { mocked } from 'ts-jest/utils';

import getChannelConfig from '../../../../shared/getChannelConfig';
import { createPersona } from '../persona';
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
  it('call createPersona', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
        '--name': 'kpman',
        '--pic': 'https://i.imgur.com/zV6uy4T.jpg',
      },
    };

    mocked(MessengerClient.prototype.createPersona).mockResolvedValue({
      id: 'PERSONA_ID',
    });

    await createPersona(ctx);

    const client = mocked(MessengerClient).mock.instances[0];

    expect(MessengerClient).toBeCalledWith({
      accessToken: '__FAKE_TOKEN__',
    });
    expect(client.createPersona).toBeCalledWith({
      name: 'kpman',
      profilePictureUrl: 'https://i.imgur.com/zV6uy4T.jpg',
    });
  });

  it('error when no config setting', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
        '--name': 'kpman',
        '--pic': 'https://i.imgur.com/zV6uy4T.jpg',
      },
    };

    mocked(MessengerClient.prototype.createPersona).mockResolvedValue(null);

    await createPersona(ctx);

    expect(log.error).toBeCalled();
  });

  it('error when no persona name and pic', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    mocked(MessengerClient.prototype.createPersona).mockResolvedValue(null);

    await createPersona(ctx);

    expect(log.error).toBeCalled();
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
        '--name': 'kpman',
        '--pic': 'https://i.imgur.com/zV6uy4T.jpg',
      },
    };
    const error = {
      response: {
        status: 400,
      },
    };
    mocked(MessengerClient.prototype.createPersona).mockRejectedValue(error);

    await createPersona(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by messenger', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
        '--name': 'kpman',
        '--pic': 'https://i.imgur.com/zV6uy4T.jpg',
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
    mocked(MessengerClient.prototype.createPersona).mockRejectedValue(error);

    await createPersona(ctx);

    expect(log.error).toBeCalled();
    expect(mocked(log.error).mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
        '--name': 'kpman',
        '--pic': 'https://i.imgur.com/zV6uy4T.jpg',
      },
    };

    mocked(MessengerClient.prototype.createPersona).mockRejectedValue(
      new Error('something wrong happened')
    );

    await createPersona(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
