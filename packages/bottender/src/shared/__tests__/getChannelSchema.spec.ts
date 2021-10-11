import getChannelSchema from '../getChannelSchema';
import { Channel } from '../../types';

describe('messenger', () => {
  const messengerSchema = getChannelSchema(Channel.Messenger);

  it('should be valid', () => {
    const config = {
      enabled: true,
      path: '/webhooks/messenger',
      pageId: 'MESSENGER_PAGE_ID',
      accessToken: 'MESSENGER_ACCESS_TOKEN',
      appId: 'MESSENGER_APP_ID',
      appSecret: 'MESSENGER_APP_SECRET',
      verifyToken: 'MESSENGER_VERIFY_TOKEN',
    };

    const validateResult = messengerSchema.validate(config, {
      allowUnknown: true,
    });

    expect(validateResult.error).toBeUndefined();
  });

  it('should check too many menu items', () => {
    const config = {
      enabled: true,
      path: '/webhooks/messenger',
      pageId: 'MESSENGER_PAGE_ID',
      accessToken: 'MESSENGER_ACCESS_TOKEN',
      appId: 'MESSENGER_APP_ID',
      appSecret: 'MESSENGER_APP_SECRET',
      verifyToken: 'MESSENGER_VERIFY_TOKEN',
      profile: {
        getStarted: {
          payload: 'GET_STARTED',
        },
        persistentMenu: [
          {
            locale: 'default',
            composerInputDisabled: true,
            callToActions: [
              {
                type: 'web_url',
                title: 'Latest News',
                url: 'http://petershats.parseapp.com/hat-news',
                webviewHeightRatio: 'full',
              },
              {
                type: 'web_url',
                title: 'Latest News',
                url: 'http://petershats.parseapp.com/hat-news',
                webviewHeightRatio: 'full',
              },
              {
                title: 'History',
                type: 'postback',
                payload: 'HISTORY_PAYLOAD',
              },
              {
                title: 'Contact Info',
                type: 'postback',
                payload: 'CONTACT_INFO_PAYLOAD',
              },
            ],
          },
          {
            locale: 'zh_CN',
            composerInputDisabled: false,
            callToActions: [
              {
                title: 'Pay Bill',
                type: 'postback',
                payload: 'PAYBILL_PAYLOAD',
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
        whitelistedDomains: ['http://example.com'],
      },
    };

    const validateResult = messengerSchema.validate(config, {
      allowUnknown: true,
    });

    expect(validateResult.error).not.toBeUndefined();

    const { message, type } = validateResult.error.details[0];
    const errorPath = validateResult.error.details[0].path.join('.');

    expect(message).toBe(
      '"profile.persistentMenu[0].callToActions" must contain less than or equal to 3 items'
    );
    expect(type).toBe('array.max');
    expect(errorPath).toBe('profile.persistentMenu.0.callToActions');
    expect(validateResult.error.message).toBe(
      '"profile.persistentMenu[0].callToActions" must contain less than or equal to 3 items'
    );
  });
});

describe('line', () => {
  const lineSchema = getChannelSchema(Channel.Line);

  it('should be valid', () => {
    const config = {
      enabled: true,
      path: '/webhooks/line',
      accessToken: 'LINE_ACCESS_TOKEN',
      channelSecret: 'LINE_CHANNEL_SECRET',
    };

    const validateResult = lineSchema.validate(config, {
      allowUnknown: true,
    });

    expect(validateResult.error).toBeUndefined();
  });
});

describe('telegram', () => {
  const telegramSchema = getChannelSchema(Channel.Telegram);

  it('should be valid', () => {
    const config = {
      enabled: true,
      path: '/webhooks/telegram',
      accessToken: 'TELEGRAM_ACCESS_TOKEN',
    };

    const validateResult = telegramSchema.validate(config, {
      allowUnknown: true,
    });

    expect(validateResult.error).toBeUndefined();
  });
});

describe('slack', () => {
  const slackSchema = getChannelSchema(Channel.Slack);

  it('should be valid', () => {
    const config = {
      enabled: true,
      path: '/webhooks/slack',
      accessToken: 'SLACK_ACCESS_TOKEN',
    };

    const validateResult = slackSchema.validate(config, {
      allowUnknown: true,
    });

    expect(validateResult.error).toBeUndefined();
  });
});

describe('viber', () => {
  const viberSchema = getChannelSchema(Channel.Viber);

  it('should be valid', () => {
    const config = {
      enabled: true,
      path: '/webhooks/viber',
      accessToken: 'VIBER_ACCESS_TOKEN',
      sender: {
        name: 'SENDER_NAME',
      },
    };

    const validateResult = viberSchema.validate(config, {
      allowUnknown: true,
    });

    expect(validateResult.error).toBeUndefined();
  });
});
