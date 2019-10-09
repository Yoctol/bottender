import Joi from '@hapi/joi';

import getChannelSchema from '../getChannelSchema';
import { Channel } from '../types';

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

    const validateResult = Joi.validate(config, messengerSchema, {
      allowUnknown: true,
    });

    expect(validateResult.error).toBeNull();
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
        get_started: {
          payload: 'GET_STARTED',
        },
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: true,
            call_to_actions: [
              {
                type: 'web_url',
                title: 'Latest News',
                url: 'http://petershats.parseapp.com/hat-news',
                webview_height_ratio: 'full',
              },
              {
                type: 'web_url',
                title: 'Latest News',
                url: 'http://petershats.parseapp.com/hat-news',
                webview_height_ratio: 'full',
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
            composer_input_disabled: false,
            call_to_actions: [
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
        whitelisted_domains: ['http://example.com'],
      },
    };

    const validateResult = Joi.validate(config, messengerSchema, {
      allowUnknown: true,
    });

    expect(validateResult.error).not.toBeNull();

    const { message, type } = validateResult.error.details[0];
    const errorPath = validateResult.error.details[0].path.join('.');

    expect(message).toBe(
      '"call_to_actions" must contain less than or equal to 3 items'
    );
    expect(type).toBe('array.max');
    expect(errorPath).toBe('profile.persistent_menu.0.call_to_actions');
    expect(validateResult.error.message).toBe(
      'child "profile" fails because [child "persistent_menu" fails because ["persistent_menu" at position 0 fails because [child "call_to_actions" fails because ["call_to_actions" must contain less than or equal to 3 items]]]]'
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

    const validateResult = Joi.validate(config, lineSchema, {
      allowUnknown: true,
    });

    expect(validateResult.error).toBeNull();
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

    const validateResult = Joi.validate(config, telegramSchema, {
      allowUnknown: true,
    });

    expect(validateResult.error).toBeNull();
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

    const validateResult = Joi.validate(config, slackSchema, {
      allowUnknown: true,
    });

    expect(validateResult.error).toBeNull();
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

    const validateResult = Joi.validate(config, viberSchema, {
      allowUnknown: true,
    });

    expect(validateResult.error).toBeNull();
  });
});
