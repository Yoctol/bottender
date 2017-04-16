import MockAdapter from 'axios-mock-adapter';

import LINEBotAPIClient from '../LINEBotAPIClient';

const RECIPIENT_ID = '1QAZ2WSX';
const REPLY_TOKEN = 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA';
const ACCESS_TOKEN = '1234567890';

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
};

const createMock = () => {
  const client = new LINEBotAPIClient(ACCESS_TOKEN);
  const mock = new MockAdapter(client.getHTTPClient());
  return { client, mock };
};

describe('#getHTTPClient', () => {
  it('should return underlying http client', () => {
    const client = new LINEBotAPIClient(ACCESS_TOKEN);
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
        displayName: 'LINE taro',
        userId: RECIPIENT_ID,
        pictureUrl: 'http://obs.line-apps.com/...',
        statusMessage: 'Hello, LINE!',
      };

      mock.onGet(`/profile/${RECIPIENT_ID}`).reply(200, expected, headers);

      const res = await client.getUserProfile(RECIPIENT_ID);

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('reply message', () => {
  describe('#reply', () => {
    it('should call reply api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/reply', {
          replyToken: REPLY_TOKEN,
          messages: [{ type: 'text', text: 'Hello!' }],
        })
        .reply(200, expected, headers);

      const res = await client.reply(REPLY_TOKEN, [
        {
          type: 'text',
          text: 'Hello!',
        },
      ]);

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#replyText', () => {
    it('should call reply api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/reply', {
          replyToken: REPLY_TOKEN,
          messages: [{ type: 'text', text: 'Hello!' }],
        })
        .reply(200, expected, headers);

      const res = await client.replyText(REPLY_TOKEN, 'Hello!');

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('push message', () => {
  describe('#push', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [{ type: 'text', text: 'Hello!' }],
        })
        .reply(200, expected, headers);

      const res = await client.push(RECIPIENT_ID, [
        {
          type: 'text',
          text: 'Hello!',
        },
      ]);

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#pushText', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [{ type: 'text', text: 'Hello!' }],
        })
        .reply(200, expected, headers);

      const res = await client.pushText(RECIPIENT_ID, 'Hello!');

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#pushText', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [{ type: 'text', text: 'Hello!' }],
        })
        .reply(200, expected, headers);

      const res = await client.pushText(RECIPIENT_ID, 'Hello!');

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#pushImage', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [
            {
              type: 'image',
              originalContentUrl: 'https://example.com/original.jpg',
              previewImageUrl: 'https://example.com/preview.jpg',
            },
          ],
        })
        .reply(200, expected, headers);

      const res = await client.pushImage(
        RECIPIENT_ID,
        'https://example.com/original.jpg',
        'https://example.com/preview.jpg'
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#pushVideo', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [
            {
              type: 'video',
              originalContentUrl: 'https://example.com/original.mp4',
              previewImageUrl: 'https://example.com/preview.jpg',
            },
          ],
        })
        .reply(200, expected, headers);

      const res = await client.pushVideo(
        RECIPIENT_ID,
        'https://example.com/original.mp4',
        'https://example.com/preview.jpg'
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#pushAudio', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [
            {
              type: 'audio',
              originalContentUrl: 'https://example.com/original.m4a',
              duration: 240000,
            },
          ],
        })
        .reply(200, expected, headers);

      const res = await client.pushAudio(
        RECIPIENT_ID,
        'https://example.com/original.m4a',
        240000
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#pushLocation', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [
            {
              type: 'location',
              title: 'my location',
              address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
              latitude: 35.65910807942215,
              longitude: 139.70372892916203,
            },
          ],
        })
        .reply(200, expected, headers);

      const res = await client.pushLocation(RECIPIENT_ID, {
        title: 'my location',
        address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
        latitude: 35.65910807942215,
        longitude: 139.70372892916203,
      });

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#pushSticker', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [
            {
              type: 'sticker',
              packageId: '1',
              stickerId: '1',
            },
          ],
        })
        .reply(200, expected, headers);

      const res = await client.pushSticker(RECIPIENT_ID, '1', '1');

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#pushImagemap', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [
            {
              type: 'imagemap',
              baseUrl: 'https://example.com/bot/images/rm001',
              altText: 'this is an imagemap',
              baseSize: {
                height: 1040,
                width: 1040,
              },
              actions: [
                {
                  type: 'uri',
                  linkUri: 'https://example.com/',
                  area: {
                    x: 0,
                    y: 0,
                    width: 520,
                    height: 1040,
                  },
                },
                {
                  type: 'message',
                  text: 'hello',
                  area: {
                    x: 520,
                    y: 0,
                    width: 520,
                    height: 1040,
                  },
                },
              ],
            },
          ],
        })
        .reply(200, expected, headers);

      const res = await client.pushImagemap(
        RECIPIENT_ID,
        'this is an imagemap',
        {
          baseUrl: 'https://example.com/bot/images/rm001',
          baseHeight: 1040,
          baseWidth: 1040,
          actions: [
            {
              type: 'uri',
              linkUri: 'https://example.com/',
              area: {
                x: 0,
                y: 0,
                width: 520,
                height: 1040,
              },
            },
            {
              type: 'message',
              text: 'hello',
              area: {
                x: 520,
                y: 0,
                width: 520,
                height: 1040,
              },
            },
          ],
        }
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#pushTemplate', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [
            {
              type: 'template',
              altText: 'this is a template',
              template: {
                type: 'buttons',
                thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
                title: 'Menu',
                text: 'Please select',
                actions: [
                  {
                    type: 'postback',
                    label: 'Buy',
                    data: 'action=buy&itemid=123',
                  },
                  {
                    type: 'postback',
                    label: 'Add to cart',
                    data: 'action=add&itemid=123',
                  },
                  {
                    type: 'uri',
                    label: 'View detail',
                    uri: 'http://example.com/page/123',
                  },
                ],
              },
            },
          ],
        })
        .reply(200, expected, headers);

      const res = await client.pushTemplate(
        RECIPIENT_ID,
        'this is a template',
        {
          type: 'buttons',
          thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
          title: 'Menu',
          text: 'Please select',
          actions: [
            {
              type: 'postback',
              label: 'Buy',
              data: 'action=buy&itemid=123',
            },
            {
              type: 'postback',
              label: 'Add to cart',
              data: 'action=add&itemid=123',
            },
            {
              type: 'uri',
              label: 'View detail',
              uri: 'http://example.com/page/123',
            },
          ],
        }
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#pushButtonTemplate', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [
            {
              type: 'template',
              altText: 'this is a template',
              template: {
                type: 'buttons',
                thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
                title: 'Menu',
                text: 'Please select',
                actions: [
                  {
                    type: 'postback',
                    label: 'Buy',
                    data: 'action=buy&itemid=123',
                  },
                  {
                    type: 'postback',
                    label: 'Add to cart',
                    data: 'action=add&itemid=123',
                  },
                  {
                    type: 'uri',
                    label: 'View detail',
                    uri: 'http://example.com/page/123',
                  },
                ],
              },
            },
          ],
        })
        .reply(200, expected, headers);

      const res = await client.pushButtonTemplate(
        RECIPIENT_ID,
        'this is a template',
        {
          thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
          title: 'Menu',
          text: 'Please select',
          actions: [
            {
              type: 'postback',
              label: 'Buy',
              data: 'action=buy&itemid=123',
            },
            {
              type: 'postback',
              label: 'Add to cart',
              data: 'action=add&itemid=123',
            },
            {
              type: 'uri',
              label: 'View detail',
              uri: 'http://example.com/page/123',
            },
          ],
        }
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#pushConfirmTemplate', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [
            {
              type: 'template',
              altText: 'this is a confirm template',
              template: {
                type: 'confirm',
                text: 'Are you sure?',
                actions: [
                  {
                    type: 'message',
                    label: 'Yes',
                    text: 'yes',
                  },
                  {
                    type: 'message',
                    label: 'No',
                    text: 'no',
                  },
                ],
              },
            },
          ],
        })
        .reply(200, expected, headers);

      const res = await client.pushConfirmTemplate(
        RECIPIENT_ID,
        'this is a confirm template',
        {
          text: 'Are you sure?',
          actions: [
            {
              type: 'message',
              label: 'Yes',
              text: 'yes',
            },
            {
              type: 'message',
              label: 'No',
              text: 'no',
            },
          ],
        }
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#pushCarouselTemplate', () => {
    it('should call push api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/push', {
          to: RECIPIENT_ID,
          messages: [
            {
              type: 'template',
              altText: 'this is a carousel template',
              template: {
                type: 'carousel',
                columns: [
                  {
                    thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
                    title: 'this is menu',
                    text: 'description',
                    actions: [
                      {
                        type: 'postback',
                        label: 'Buy',
                        data: 'action=buy&itemid=111',
                      },
                      {
                        type: 'postback',
                        label: 'Add to cart',
                        data: 'action=add&itemid=111',
                      },
                      {
                        type: 'uri',
                        label: 'View detail',
                        uri: 'http://example.com/page/111',
                      },
                    ],
                  },
                  {
                    thumbnailImageUrl: 'https://example.com/bot/images/item2.jpg',
                    title: 'this is menu',
                    text: 'description',
                    actions: [
                      {
                        type: 'postback',
                        label: 'Buy',
                        data: 'action=buy&itemid=222',
                      },
                      {
                        type: 'postback',
                        label: 'Add to cart',
                        data: 'action=add&itemid=222',
                      },
                      {
                        type: 'uri',
                        label: 'View detail',
                        uri: 'http://example.com/page/222',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        })
        .reply(200, expected, headers);

      const res = await client.pushCarouselTemplate(
        RECIPIENT_ID,
        'this is a carousel template',
        [
          {
            thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
            title: 'this is menu',
            text: 'description',
            actions: [
              {
                type: 'postback',
                label: 'Buy',
                data: 'action=buy&itemid=111',
              },
              {
                type: 'postback',
                label: 'Add to cart',
                data: 'action=add&itemid=111',
              },
              {
                type: 'uri',
                label: 'View detail',
                uri: 'http://example.com/page/111',
              },
            ],
          },
          {
            thumbnailImageUrl: 'https://example.com/bot/images/item2.jpg',
            title: 'this is menu',
            text: 'description',
            actions: [
              {
                type: 'postback',
                label: 'Buy',
                data: 'action=buy&itemid=222',
              },
              {
                type: 'postback',
                label: 'Add to cart',
                data: 'action=add&itemid=222',
              },
              {
                type: 'uri',
                label: 'View detail',
                uri: 'http://example.com/page/222',
              },
            ],
          },
        ]
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('multicast', () => {
  describe('#multicast', () => {
    it('should call multicast api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      mock
        .onPost('/message/multicast', {
          to: [RECIPIENT_ID],
          messages: [{ type: 'text', text: 'Hello!' }],
        })
        .reply(200, expected, headers);

      const res = await client.multicast(
        [RECIPIENT_ID],
        [
          {
            type: 'text',
            text: 'Hello!',
          },
        ]
      );

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});

describe('leave', () => {
  describe('#leaveGroup', () => {
    it('should call leave api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      const GROUP_ID = 'G123456';

      mock.onPost(`/group/${GROUP_ID}/leave`).reply(200, expected, headers);

      const res = await client.leaveGroup(GROUP_ID);

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });

  describe('#leaveRoom', () => {
    it('should call leave api', async () => {
      const { client, mock } = createMock();

      const expected = {};

      const ROOM_ID = 'R123456';

      mock.onPost(`/room/${ROOM_ID}/leave`).reply(200, expected, headers);

      const res = await client.leaveRoom(ROOM_ID);

      expect(res.status).toBe(200);
      expect(res.data).toBe(expected);
    });
  });
});
