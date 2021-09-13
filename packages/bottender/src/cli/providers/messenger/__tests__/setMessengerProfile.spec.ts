import { MessengerClient } from 'messaging-api-messenger';
import { mocked } from 'ts-jest/utils';

import getChannelConfig from '../../../../shared/getChannelConfig';
import { setMessengerProfile } from '../profile';
import * as log from '../../../../shared/log';

jest.mock('messaging-api-messenger');
jest.mock('warning');

jest.mock('../../../../shared/log');
jest.mock('../../../../shared/getChannelConfig');

const MOCK_FILE_WITH_PLATFORM = {
  channels: {
    messenger: {
      accessToken: '__FAKE_TOKEN__',
      profile: {
        getStarted: {
          payload: '<GET_STARTED_PAYLOAD>',
        },
        persistentMenu: [
          {
            locale: 'default',
            composerInputDisabled: false,
            callToActions: [
              {
                type: 'web_url',
                title: 'Powered by Example',
                url: 'https://www.example.com/',
              },
            ],
          },
        ],
      },
    },
  },
};

beforeEach(() => {
  process.exit = jest.fn();

  mocked(getChannelConfig).mockReturnValue(
    MOCK_FILE_WITH_PLATFORM.channels.messenger
  );

  mocked(MessengerClient.prototype.getMessengerProfile).mockReturnValue([
    {
      persistentMenu: [
        {
          locale: 'default',
          composerInputDisabled: false,
          callToActions: [
            {
              type: 'web_url',
              title: 'Powered by Example',
              url: 'https://www.example.com/',
            },
          ],
        },
      ],
    },
  ]);
});

describe('resolve', () => {
  describe('--force', () => {
    it('will delete all fields and set profile', async () => {
      const ctx = {
        config: null,
        argv: {
          _: [],
          '--force': true,
        },
      };

      await setMessengerProfile(ctx);

      const client = mocked(MessengerClient).mock.instances[0];

      expect(client.deleteMessengerProfile).toBeCalledWith([
        'account_linking_url',
        'persistent_menu',
        'get_started',
        'greeting',
        'ice_breakers',
        'whitelisted_domains',
      ]);
      expect(client.setMessengerProfile).toBeCalledWith({
        getStarted: {
          payload: '<GET_STARTED_PAYLOAD>',
        },
        persistentMenu: [
          {
            locale: 'default',
            composerInputDisabled: false,
            callToActions: [
              {
                type: 'web_url',
                title: 'Powered by Example',
                url: 'https://www.example.com/',
              },
            ],
          },
        ],
      });
    });

    it('should set whole profile once', async () => {
      const ctx = {
        config: null,
        argv: {
          _: [],
          '--force': true,
        },
      };

      mocked(getChannelConfig).mockReturnValue({
        accessToken: '__FAKE_TOKEN__',
        profile: {
          getStarted: {
            payload: '<GET_STARTED_PAYLOAD>',
          },
          persistentMenu: [
            {
              locale: 'default',
              composerInputDisabled: false,
              callToActions: [
                {
                  type: 'web_url',
                  title: 'Open Chat Extensions',
                  url: 'http://example.com/index.html',
                  messengerExtensions: true,
                },
              ],
            },
          ],
        },
      });

      await setMessengerProfile(ctx);

      const client = mocked(MessengerClient).mock.instances[0];

      expect(client.setMessengerProfile).toBeCalledWith({
        getStarted: {
          payload: '<GET_STARTED_PAYLOAD>',
        },
        persistentMenu: [
          {
            locale: 'default',
            composerInputDisabled: false,
            callToActions: [
              {
                type: 'web_url',
                title: 'Open Chat Extensions',
                url: 'http://example.com/index.html',
                messengerExtensions: true,
              },
            ],
          },
        ],
      });
    });

    it('should set whitelisted_domains before other fields', async () => {
      const ctx = {
        config: null,
        argv: {
          _: [],
          '--force': true,
        },
      };
      mocked(getChannelConfig).mockReturnValue({
        accessToken: '__FAKE_TOKEN__',
        profile: {
          getStarted: {
            payload: '<GET_STARTED_PAYLOAD>',
          },
          persistentMenu: [
            {
              locale: 'default',
              composerInputDisabled: false,
              callToActions: [
                {
                  type: 'web_url',
                  title: 'Open Chat Extensions',
                  url: 'http://example.com/index.html',
                  messengerExtensions: true,
                },
              ],
            },
          ],
          whitelistedDomains: ['http://example.com'], // profile has `whitelisted_domains`
          homeUrl: {
            url: 'http://example.com/index.html',
            webviewHeightRatio: 'tall',
            webviewShareButton: 'show',
            inTest: true,
          },
        },
      });

      await setMessengerProfile(ctx);

      const client = mocked(MessengerClient).mock.instances[0];

      expect(mocked(client.setMessengerProfile).mock.calls[0][0]).toEqual({
        whitelistedDomains: ['http://example.com'],
      });
      expect(mocked(client.setMessengerProfile).mock.calls[1][0]).toEqual({
        getStarted: {
          payload: '<GET_STARTED_PAYLOAD>',
        },
        persistentMenu: [
          {
            locale: 'default',
            composerInputDisabled: false,
            callToActions: [
              {
                type: 'web_url',
                title: 'Open Chat Extensions',
                url: 'http://example.com/index.html',
                messengerExtensions: true,
              },
            ],
          },
        ],
        homeUrl: {
          url: 'http://example.com/index.html',
          webviewHeightRatio: 'tall',
          webviewShareButton: 'show',
          inTest: true,
        },
      });
    });
  });

  it('successfully set diff fields `persistent_menu`', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };
    mocked(MessengerClient.prototype.getMessengerProfile).mockReturnValue([
      {
        persistentMenu: [
          {
            locale: 'default',
            composerInputDisabled: false,
            callToActions: [
              {
                type: 'web_url',
                title: 'Powered by Facebook',
                url: 'https://www.facebook.com/',
              },
            ],
          },
        ],
      },
    ]);

    await setMessengerProfile(ctx);

    const client = mocked(MessengerClient).mock.instances[0];

    expect(client.setMessengerProfile).toBeCalledWith({
      getStarted: {
        payload: '<GET_STARTED_PAYLOAD>',
      },
      persistentMenu: [
        {
          locale: 'default',
          composerInputDisabled: false,
          callToActions: [
            {
              type: 'web_url',
              title: 'Powered by Example',
              url: 'https://www.example.com/',
            },
          ],
        },
      ],
    });
  });

  it('should set whitelisted_domains before other fields', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };
    mocked(MessengerClient.prototype.getMessengerProfile).mockReturnValue([
      {
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'web_url',
                title: 'Powered by Facebook',
                url: 'https://www.facebook.com/',
              },
            ],
          },
        ],
      },
    ]);
    mocked(getChannelConfig).mockReturnValue({
      accessToken: '__FAKE_TOKEN__',
      profile: {
        getStarted: {
          payload: '<GET_STARTED_PAYLOAD>',
        },
        persistentMenu: [
          {
            locale: 'default',
            composerInputDisabled: false,
            callToActions: [
              {
                type: 'web_url',
                title: 'Open Chat Extensions',
                url: 'http://example.com/index.html',
                messengerExtensions: true,
              },
            ],
          },
        ],
        whitelistedDomains: ['http://example.com'],
        homeUrl: {
          url: 'http://example.com/index.html',
          webviewHeightRatio: 'tall',
          webviewShareButton: 'show',
          inTest: true,
        },
      },
    });

    await setMessengerProfile(ctx);

    const client = mocked(MessengerClient).mock.instances[0];

    expect(mocked(client.setMessengerProfile).mock.calls[0][0]).toEqual({
      whitelistedDomains: ['http://example.com'],
    });
    expect(mocked(client.setMessengerProfile).mock.calls[1][0]).toEqual({
      getStarted: {
        payload: '<GET_STARTED_PAYLOAD>',
      },
      persistentMenu: [
        {
          locale: 'default',
          composerInputDisabled: false,
          callToActions: [
            {
              type: 'web_url',
              title: 'Open Chat Extensions',
              url: 'http://example.com/index.html',
              messengerExtensions: true,
            },
          ],
        },
      ],
      homeUrl: {
        url: 'http://example.com/index.html',
        webviewHeightRatio: 'tall',
        webviewShareButton: 'show',
        inTest: true,
      },
    });
  });

  it('successfully set diff fields `get_started`', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    await setMessengerProfile(ctx);

    const client = mocked(MessengerClient).mock.instances[0];

    expect(client.setMessengerProfile).toBeCalledWith({
      getStarted: {
        payload: '<GET_STARTED_PAYLOAD>',
      },
    });
  });

  it('successfully delete diff fields `whitelisted_domains`', async () => {
    mocked(MessengerClient.prototype.getMessengerProfile).mockReturnValue([
      {
        persistentMenu: [
          {
            locale: 'default',
            composerInputDisabled: false,
            callToActions: [
              {
                type: 'web_url',
                title: 'Powered by Example',
                url: 'https://www.example.com/',
              },
            ],
          },
        ],
        whitelistedDomains: [
          'https://www.facebook.com/',
          'https://www.google.com/',
        ],
      },
    ]);
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    await setMessengerProfile(ctx);

    const client = mocked(MessengerClient).mock.instances[0];

    expect(client.deleteMessengerProfile).toBeCalledWith([
      'whitelisted_domains',
    ]);
  });

  it('do nothing and log info', async () => {
    mocked(MessengerClient.prototype.getMessengerProfile).mockReturnValue([
      {
        getStarted: {
          payload: '<GET_STARTED_PAYLOAD>',
        },
        persistentMenu: [
          {
            locale: 'default',
            composerInputDisabled: false,
            callToActions: [
              {
                type: 'web_url',
                title: 'Powered by Example',
                url: 'https://www.example.com/',
              },
            ],
          },
        ],
      },
    ]);
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    await setMessengerProfile(ctx);

    const client = mocked(MessengerClient).mock.instances[0];

    expect(client.deleteMessengerProfile).not.toBeCalled();
    expect(client.setMessengerProfile).not.toBeCalled();
    expect(log.print).toHaveBeenCalledWith(
      `No change apply because the profile settings is the same.`
    );
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const error = {
      response: {
        status: 400,
      },
    };
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    mocked(MessengerClient.prototype.setMessengerProfile).mockRejectedValue(
      error
    );

    await setMessengerProfile(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by messenger', async () => {
    const error = {
      response: {
        status: 400,
        data: {
          error: {
            message: '(#100) ...',
            type: 'OAuthException',
            code: 100,
            errorSubcode: 2018145,
            fbtraceId: 'HXd3kIOXLsK',
          },
        },
      },
    };
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };
    mocked(MessengerClient.prototype.setMessengerProfile).mockRejectedValue(
      error
    );

    await setMessengerProfile(ctx);

    expect(log.error).toBeCalled();
    expect(mocked(log.error).mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });
});
