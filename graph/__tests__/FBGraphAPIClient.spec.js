import MockAdapter from 'axios-mock-adapter';

import FBGraphAPIClient from '../FBGraphAPIClient';

const RECIPIENT_ID = '1QAZ2WSX';
const ACCESS_TOKEN = '1234567890';

const createMock = () => {
  const client = new FBGraphAPIClient(ACCESS_TOKEN);
  const mock = new MockAdapter(client.getHTTPClient());
  return { client, mock };
};

describe('#getHTTPClient', () => {
  it('should return underlying http client', () => {
    const client = new FBGraphAPIClient(ACCESS_TOKEN);
    const http = client.getHTTPClient();
    expect(http.get).toBeDefined();
    expect(http.post).toBeDefined();
    expect(http.put).toBeDefined();
    expect(http.delete).toBeDefined();
  });
});

describe('user profile', () => {
  describe('#getUserProfile', () => {
    it('should response user profile', async () => {
      const { client, mock } = createMock();
      const expected = {
        first_name: '薄餡',
        last_name: '茱',
        profile_pic: 'https://example.com/pic.png',
        locale: 'en_US',
        timezone: 8,
        gender: 'male',
      };

      mock.onGet(`/1?access_token=${ACCESS_TOKEN}`).reply(200, expected);

      const res = await client.getUserProfile('1');

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('get started button', () => {
  describe('#getGetStartedButton', () => {
    it('should response data of get started button', async () => {
      const { client, mock } = createMock();

      const expected = {
        data: [
          {
            get_started: {
              payload: '__ALOHA.AI_GET_STARTED__',
            },
          },
        ],
      };

      mock
        .onGet(
          `/me/messenger_profile?fields=get_started&access_token=${ACCESS_TOKEN}`,
        )
        .reply(200, expected);

      const res = await client.getGetStartedButton();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#setGetStartedButton', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onPost(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          get_started: {
            payload: '__ALOHA.AI_GET_STARTED__',
          },
        })
        .reply(200, expected);

      const res = await client.setGetStartedButton('__ALOHA.AI_GET_STARTED__');

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#deleteGetStartedButton', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onDelete(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          fields: ['get_started'],
        })
        .reply(200, expected);

      const res = await client.deleteGetStartedButton();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('persistent menu', () => {
  describe('#getPersistentMenu', () => {
    it('should response data of persistent menu', async () => {
      const { client, mock } = createMock();

      const expected = {
        data: [
          {
            persistent_menu: [
              {
                locale: 'default',
                composer_input_disabled: true,
                call_to_actions: [
                  {
                    type: 'postback',
                    title: '重新開始對話',
                    payload: '__ALOHA.AI_RESTARTED__',
                  },
                  {
                    type: 'web_url',
                    title: 'Powered by ALOHA.AI, Yoctol',
                    url: 'https://www.yoctol.com/',
                  },
                ],
              },
            ],
          },
        ],
      };

      mock
        .onGet(
          `/me/messenger_profile?fields=persistent_menu&access_token=${ACCESS_TOKEN}`,
        )
        .reply(200, expected);

      const res = await client.getPersistentMenu();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#setPersistentMenu', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onPost(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          persistent_menu: [
            {
              locale: 'default',
              composer_input_disabled: false,
              call_to_actions: [
                {
                  type: 'postback',
                  title: '重新開始對話',
                  payload: '__ALOHA.AI_RESTARTED__',
                },
                {
                  type: 'web_url',
                  title: 'Powered by ALOHA.AI, Yoctol',
                  url: 'https://www.yoctol.com/',
                },
              ],
            },
          ],
        })
        .reply(200, expected);

      const items = [
        {
          type: 'postback',
          title: '重新開始對話',
          payload: '__ALOHA.AI_RESTARTED__',
        },
        {
          type: 'web_url',
          title: 'Powered by ALOHA.AI, Yoctol',
          url: 'https://www.yoctol.com/',
        },
      ];

      const res = await client.setPersistentMenu(items);

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });

    it('should support disabled input', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onPost(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          persistent_menu: [
            {
              locale: 'default',
              composer_input_disabled: true,
              call_to_actions: [
                {
                  type: 'postback',
                  title: '重新開始對話',
                  payload: '__ALOHA.AI_RESTARTED__',
                },
              ],
            },
          ],
        })
        .reply(200, expected);

      const items = [
        {
          type: 'postback',
          title: '重新開始對話',
          payload: '__ALOHA.AI_RESTARTED__',
        },
      ];

      const res = await client.setPersistentMenu(items, {
        inputDisabled: true,
      });

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#deletePersistentMenu', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onDelete(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          fields: ['persistent_menu'],
        })
        .reply(200, expected);

      const res = await client.deletePersistentMenu();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('greeting text', () => {
  describe('#getGreetingText', () => {
    it('should response data of greeting text', async () => {
      const { client, mock } = createMock();

      const expected = {
        data: [
          {
            greeting: [
              {
                locale: 'default',
                text: 'Hello!',
              },
            ],
          },
        ],
      };

      mock.onGet().reply(200, expected);

      const res = await client.getGreetingText();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#setGreetingText', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onPost(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          greeting: [
            {
              locale: 'default',
              text: 'Hello!',
            },
          ],
        })
        .reply(200, expected);

      const res = await client.setGreetingText('Hello!');

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#deleteGreetingText', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onDelete(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          fields: ['greeting'],
        })
        .reply(200, expected);

      const res = await client.deleteGreetingText();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('domain whitelist', () => {
  describe('#getDomainWhitelist', () => {
    it('should response data of domain whitelist', async () => {
      const { client, mock } = createMock();

      const expected = {
        data: [
          {
            whitelisted_domains: ['http://www.yoctol.com/'],
          },
        ],
      };

      mock
        .onGet(
          `/me/messenger_profile?fields=whitelisted_domains&access_token=${ACCESS_TOKEN}`,
        )
        .reply(200, expected);

      const res = await client.getDomainWhitelist();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#setDomainWhitelist', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onPost(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          whitelisted_domains: ['www.yoctol.com'],
        })
        .reply(200, expected);

      const res = await client.setDomainWhitelist('www.yoctol.com');

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#deleteDomainWhitelist', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onDelete(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          fields: ['whitelisted_domains'],
        })
        .reply(200, expected);

      const res = await client.deleteDomainWhitelist();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('account linking url', () => {
  describe('#getAccountLinkingURL', () => {
    it('should response data of account linking url', async () => {
      const { client, mock } = createMock();

      const expected = {
        data: [
          {
            account_linking_url: 'https://www.example.com/oauth?response_type=code&client_id=1234567890&scope=basic',
          },
        ],
      };

      mock
        .onGet(
          `/me/messenger_profile?fields=account_linking_url&access_token=${ACCESS_TOKEN}`,
        )
        .reply(200, expected);

      const res = await client.getAccountLinkingURL();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#setAccountLinkingURL', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onPost(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          account_linking_url: 'https://www.example.com/oauth?response_type=code&client_id=1234567890&scope=basic',
        })
        .reply(200, expected);

      const res = await client.setAccountLinkingURL(
        'https://www.example.com/oauth?response_type=code&client_id=1234567890&scope=basic',
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#deleteAccountLinkingURL', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onDelete(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          fields: ['account_linking_url'],
        })
        .reply(200, expected);

      const res = await client.deleteAccountLinkingURL();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('payment settings', () => {
  describe('#getPaymentSettings', () => {
    it('should response data of payment settings', async () => {
      const { client, mock } = createMock();

      const expected = {
        data: [
          {
            privacy_url: 'www.facebook.com',
            public_key: 'YOUR_PUBLIC_KEY',
            test_users: ['12345678'],
          },
        ],
      };

      mock
        .onGet(
          `/me/messenger_profile?fields=payment_settings&access_token=${ACCESS_TOKEN}`,
        )
        .reply(200, expected);

      const res = await client.getPaymentSettings();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#setPaymentPrivacyPolicyURL', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onPost(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          payment_settings: {
            privacy_url: 'https://www.example.com',
          },
        })
        .reply(200, expected);

      const res = await client.setPaymentPrivacyPolicyURL(
        'https://www.example.com',
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#setPaymentPublicKey', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onPost(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          payment_settings: {
            public_key: 'YOUR_PUBLIC_KEY',
          },
        })
        .reply(200, expected);

      const res = await client.setPaymentPublicKey('YOUR_PUBLIC_KEY');

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#setPaymentTestUsers', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onPost(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          payment_settings: {
            test_users: ['12345678'],
          },
        })
        .reply(200, expected);

      const res = await client.setPaymentTestUsers(['12345678']);

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#deletePaymentSettings', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onDelete(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          fields: ['payment_settings'],
        })
        .reply(200, expected);

      const res = await client.deletePaymentSettings();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('target audience', () => {
  describe('#getTargetAudience', () => {
    it('should response data of target audience', async () => {
      const { client, mock } = createMock();

      const expected = {
        data: [
          {
            audience_type: 'custom',
            countries: {
              whitelist: ['US', 'CA'],
            },
          },
        ],
      };

      mock
        .onGet(
          `/me/messenger_profile?fields=target_audience&access_token=${ACCESS_TOKEN}`,
        )
        .reply(200, expected);

      const res = await client.getTargetAudience();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#setTargetAudience', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onPost(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          target_audience: {
            audience_type: 'custom',
            countries: {
              whitelist: ['US', 'CA'],
              blacklist: ['UK'],
            },
          },
        })
        .reply(200, expected);

      const res = await client.setTargetAudience(
        'custom',
        ['US', 'CA'],
        ['UK'],
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#deleteTargetAudience', () => {
    it('should response success result', async () => {
      const { client, mock } = createMock();

      const expected = {
        result: 'success',
      };

      mock
        .onDelete(`/me/messenger_profile?access_token=${ACCESS_TOKEN}`, {
          fields: ['target_audience'],
        })
        .reply(200, expected);

      const res = await client.deleteTargetAudience();

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('sned api', () => {
  describe('#send', () => {
    it('should call messages api', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            text: 'Hello!',
          },
        })
        .reply(200, expected);

      const res = await client.send(RECIPIENT_ID, {
        text: 'Hello!',
      });

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendAttachment', () => {
    it('should call messages api with attachment', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            attachment: {
              type: 'image',
              payload: {
                url: 'https://example.com/pic.png',
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.sendAttachment(RECIPIENT_ID, {
        type: 'image',
        payload: {
          url: 'https://example.com/pic.png',
        },
      });

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendText', () => {
    it('should call messages api with text', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            text: 'Hello!',
          },
        })
        .reply(200, expected);

      const res = await client.sendText(RECIPIENT_ID, 'Hello!');

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendAudio', () => {
    it('should call messages api with audio', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            attachment: {
              type: 'audio',
              payload: {
                url: 'https://example.com/audio.mp3',
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.sendAudio(
        RECIPIENT_ID,
        'https://example.com/audio.mp3',
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendImage', () => {
    it('should call messages api with audio', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            attachment: {
              type: 'image',
              payload: {
                url: 'https://example.com/pic.png',
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.sendImage(
        RECIPIENT_ID,
        'https://example.com/pic.png',
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendVideo', () => {
    it('should call messages api with video', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            attachment: {
              type: 'video',
              payload: {
                url: 'https://example.com/video.mp4',
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.sendVideo(
        RECIPIENT_ID,
        'https://example.com/video.mp4',
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendFile', () => {
    it('should call messages api with file', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            attachment: {
              type: 'file',
              payload: {
                url: 'https://example.com/word.docx',
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.sendFile(
        RECIPIENT_ID,
        'https://example.com/word.docx',
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendTemplate', () => {
    it('should call messages api with template', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: 'title',
                buttons: [
                  {
                    type: 'postback',
                    title: 'Start Chatting',
                    payload: 'USER_DEFINED_PAYLOAD',
                  },
                ],
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.sendTemplate(RECIPIENT_ID, {
        template_type: 'button',
        text: 'title',
        buttons: [
          {
            type: 'postback',
            title: 'Start Chatting',
            payload: 'USER_DEFINED_PAYLOAD',
          },
        ],
      });

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendButtonTemplate', () => {
    it('should call messages api with button template', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: 'title',
                buttons: [
                  {
                    type: 'postback',
                    title: 'Start Chatting',
                    payload: 'USER_DEFINED_PAYLOAD',
                  },
                ],
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.sendButtonTemplate(RECIPIENT_ID, 'title', [
        {
          type: 'postback',
          title: 'Start Chatting',
          payload: 'USER_DEFINED_PAYLOAD',
        },
      ]);

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendGenericTemplate', () => {
    it('should call messages api with generic template', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'generic',
                elements: [
                  {
                    title: "Welcome to Peter's Hats",
                    image_url: 'https://petersfancybrownhats.com/company_image.png',
                    subtitle: "We've got the right hat for everyone.",
                    default_action: {
                      type: 'web_url',
                      url: 'https://peterssendreceiveapp.ngrok.io/view?item=103',
                      messenger_extensions: true,
                      webview_height_ratio: 'tall',
                      fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
                    },
                    buttons: [
                      {
                        type: 'postback',
                        title: 'Start Chatting',
                        payload: 'DEVELOPER_DEFINED_PAYLOAD',
                      },
                    ],
                  },
                ],
                image_aspect_ratio: 'square',
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.sendGenericTemplate(RECIPIENT_ID, [
        {
          title: "Welcome to Peter's Hats",
          image_url: 'https://petersfancybrownhats.com/company_image.png',
          subtitle: "We've got the right hat for everyone.",
          default_action: {
            type: 'web_url',
            url: 'https://peterssendreceiveapp.ngrok.io/view?item=103',
            messenger_extensions: true,
            webview_height_ratio: 'tall',
            fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
          },
          buttons: [
            {
              type: 'postback',
              title: 'Start Chatting',
              payload: 'DEVELOPER_DEFINED_PAYLOAD',
            },
          ],
        },
      ]);

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendListTemplate', () => {
    it('should call messages api with list template', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'list',
                elements: [
                  {
                    title: 'Classic T-Shirt Collection',
                    image_url: 'https://peterssendreceiveapp.ngrok.io/img/collection.png',
                    subtitle: 'See all our colors',
                    default_action: {
                      type: 'web_url',
                      url: 'https://peterssendreceiveapp.ngrok.io/shop_collection',
                      messenger_extensions: true,
                      webview_height_ratio: 'tall',
                      fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
                    },
                    buttons: [
                      {
                        title: 'View',
                        type: 'web_url',
                        url: 'https://peterssendreceiveapp.ngrok.io/collection',
                        messenger_extensions: true,
                        webview_height_ratio: 'tall',
                        fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
                      },
                    ],
                  },
                ],
                buttons: [
                  {
                    type: 'postback',
                    title: 'Start Chatting',
                    payload: 'USER_DEFINED_PAYLOAD',
                  },
                ],
                top_element_style: 'compact',
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.sendListTemplate(
        RECIPIENT_ID,
        [
          {
            title: 'Classic T-Shirt Collection',
            image_url: 'https://peterssendreceiveapp.ngrok.io/img/collection.png',
            subtitle: 'See all our colors',
            default_action: {
              type: 'web_url',
              url: 'https://peterssendreceiveapp.ngrok.io/shop_collection',
              messenger_extensions: true,
              webview_height_ratio: 'tall',
              fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
            },
            buttons: [
              {
                title: 'View',
                type: 'web_url',
                url: 'https://peterssendreceiveapp.ngrok.io/collection',
                messenger_extensions: true,
                webview_height_ratio: 'tall',
                fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
              },
            ],
          },
        ],
        [
          {
            type: 'postback',
            title: 'Start Chatting',
            payload: 'USER_DEFINED_PAYLOAD',
          },
        ],
        'compact',
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendReceiptTemplate', () => {
    it('should call messages api with receipt template', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'receipt',
                recipient_name: 'Stephane Crozatier',
                order_number: '12345678902',
                currency: 'USD',
                payment_method: 'Visa 2345',
                order_url: 'http://petersapparel.parseapp.com/order?order_id=123456',
                timestamp: '1428444852',
                elements: [
                  {
                    title: 'Classic White T-Shirt',
                    subtitle: '100% Soft and Luxurious Cotton',
                    quantity: 2,
                    price: 50,
                    currency: 'USD',
                    image_url: 'http://petersapparel.parseapp.com/img/whiteshirt.png',
                  },
                  {
                    title: 'Classic Gray T-Shirt',
                    subtitle: '100% Soft and Luxurious Cotton',
                    quantity: 1,
                    price: 25,
                    currency: 'USD',
                    image_url: 'http://petersapparel.parseapp.com/img/grayshirt.png',
                  },
                ],
                address: {
                  street_1: '1 Hacker Way',
                  street_2: '',
                  city: 'Menlo Park',
                  postal_code: '94025',
                  state: 'CA',
                  country: 'US',
                },
                summary: {
                  subtotal: 75.00,
                  shipping_cost: 4.95,
                  total_tax: 6.19,
                  total_cost: 56.14,
                },
                adjustments: [
                  {
                    name: 'New Customer Discount',
                    amount: 20,
                  },
                  {
                    name: '$10 Off Coupon',
                    amount: 10,
                  },
                ],
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.sendReceiptTemplate(RECIPIENT_ID, {
        recipient_name: 'Stephane Crozatier',
        order_number: '12345678902',
        currency: 'USD',
        payment_method: 'Visa 2345',
        order_url: 'http://petersapparel.parseapp.com/order?order_id=123456',
        timestamp: '1428444852',
        elements: [
          {
            title: 'Classic White T-Shirt',
            subtitle: '100% Soft and Luxurious Cotton',
            quantity: 2,
            price: 50,
            currency: 'USD',
            image_url: 'http://petersapparel.parseapp.com/img/whiteshirt.png',
          },
          {
            title: 'Classic Gray T-Shirt',
            subtitle: '100% Soft and Luxurious Cotton',
            quantity: 1,
            price: 25,
            currency: 'USD',
            image_url: 'http://petersapparel.parseapp.com/img/grayshirt.png',
          },
        ],
        address: {
          street_1: '1 Hacker Way',
          street_2: '',
          city: 'Menlo Park',
          postal_code: '94025',
          state: 'CA',
          country: 'US',
        },
        summary: {
          subtotal: 75.00,
          shipping_cost: 4.95,
          total_tax: 6.19,
          total_cost: 56.14,
        },
        adjustments: [
          {
            name: 'New Customer Discount',
            amount: 20,
          },
          {
            name: '$10 Off Coupon',
            amount: 10,
          },
        ],
      });

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendQuickReplies', () => {
    it('should call messages api with quick replies', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
        message_id: 'mid.1489394984387:3dd22de509',
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          message: {
            text: 'Pick a color:',
            attachment: null,
            quick_replies: [
              {
                content_type: 'text',
                title: 'Red',
                payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
              },
            ],
          },
        })
        .reply(200, expected);

      const res = await client.sendQuickReplies(
        RECIPIENT_ID,
        'Pick a color:',
        null,
        [
          {
            content_type: 'text',
            title: 'Red',
            payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
          },
        ],
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#sendSenderAction', () => {
    it('should call messages api with sender action', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          sender_action: 'typing_on',
        })
        .reply(200, expected);

      const res = await client.sendSenderAction(RECIPIENT_ID, 'typing_on');

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#turnTypingIndicatorsOn', () => {
    it('should call messages api with typing_on sender action', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          sender_action: 'typing_on',
        })
        .reply(200, expected);

      const res = await client.turnTypingIndicatorsOn(RECIPIENT_ID);

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#turnTypingIndicatorsOff', () => {
    it('should call messages api with typing_off sender action', async () => {
      const { client, mock } = createMock();

      const expected = {
        recipient_id: RECIPIENT_ID,
      };

      mock
        .onPost(`/me/messages?access_token=${ACCESS_TOKEN}`, {
          recipient: {
            id: RECIPIENT_ID,
          },
          sender_action: 'typing_off',
        })
        .reply(200, expected);

      const res = await client.turnTypingIndicatorsOff(RECIPIENT_ID);

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('upload api', () => {
  describe('#uploadAttachment', () => {
    it('should call messages api to upload attachment', async () => {
      const { client, mock } = createMock();

      const expected = {
        attachment_id: '1854626884821032',
      };

      mock
        .onPost(`/me/message_attachments?access_token=${ACCESS_TOKEN}`, {
          message: {
            attachment: {
              type: 'image',
              payload: {
                url: 'http://www.yoctol-rocks.com/image.jpg',
                is_reusable: true,
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.uploadAttachment(
        'image',
        'http://www.yoctol-rocks.com/image.jpg',
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#uploadAudio', () => {
    it('should call messages api to upload audio', async () => {
      const { client, mock } = createMock();

      const expected = {
        attachment_id: '1854626884821032',
      };

      mock
        .onPost(`/me/message_attachments?access_token=${ACCESS_TOKEN}`, {
          message: {
            attachment: {
              type: 'audio',
              payload: {
                url: 'http://www.yoctol-rocks.com/audio.mp3',
                is_reusable: true,
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.uploadAudio(
        'http://www.yoctol-rocks.com/audio.mp3',
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#uploadImage', () => {
    it('should call messages api to upload image', async () => {
      const { client, mock } = createMock();

      const expected = {
        attachment_id: '1854626884821032',
      };

      mock
        .onPost(`/me/message_attachments?access_token=${ACCESS_TOKEN}`, {
          message: {
            attachment: {
              type: 'image',
              payload: {
                url: 'http://www.yoctol-rocks.com/image.jpg',
                is_reusable: true,
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.uploadImage(
        'http://www.yoctol-rocks.com/image.jpg',
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#uploadVideo', () => {
    it('should call messages api to upload video', async () => {
      const { client, mock } = createMock();

      const expected = {
        attachment_id: '1854626884821032',
      };

      mock
        .onPost(`/me/message_attachments?access_token=${ACCESS_TOKEN}`, {
          message: {
            attachment: {
              type: 'video',
              payload: {
                url: 'http://www.yoctol-rocks.com/video.mp4',
                is_reusable: true,
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.uploadVideo(
        'http://www.yoctol-rocks.com/video.mp4',
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#uploadFile', () => {
    it('should call messages api to upload file', async () => {
      const { client, mock } = createMock();

      const expected = {
        attachment_id: '1854626884821032',
      };

      mock
        .onPost(`/me/message_attachments?access_token=${ACCESS_TOKEN}`, {
          message: {
            attachment: {
              type: 'file',
              payload: {
                url: 'http://www.yoctol-rocks.com/file.pdf',
                is_reusable: true,
              },
            },
          },
        })
        .reply(200, expected);

      const res = await client.uploadFile(
        'http://www.yoctol-rocks.com/file.pdf',
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});
