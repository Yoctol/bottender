import MockAdapter from 'axios-mock-adapter';

import FBGraphAPIClient from '../FBGraphAPIClient';

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

describe('user', () => {
  describe('#getUser', () => {
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

      const res = await client.getUser('1');

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
    it('should response data of greeting text', async () => {
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
