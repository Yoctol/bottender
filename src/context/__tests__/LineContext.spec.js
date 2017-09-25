import LineContext from '../LineContext';
import LineEvent from '../LineEvent';

jest.mock('delay');
jest.mock('messaging-api-line');

const rawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  message: {
    id: '325708',
    type: 'text',
    text: 'Hello, world',
  },
};

const setup = () => {
  const client = {
    replyText: jest.fn(),
    pushText: jest.fn(),
    pushImage: jest.fn(),
    pushAudio: jest.fn(),
    pushVideo: jest.fn(),
    pushLocation: jest.fn(),
    pushSticker: jest.fn(),
    pushButtonTemplate: jest.fn(),
    pushConfirmTemplate: jest.fn(),
    pushImagemap: jest.fn(),
    pushCarouselTemplate: jest.fn(),
  };
  const session = {
    user: {
      id: 'fakeUserId',
    },
  };
  const context = new LineContext({
    client,
    event: new LineEvent(rawEvent),
    session,
  });
  context.typing = jest.fn();
  return {
    context,
    session,
    client,
  };
};

it('be defined', () => {
  const { context } = setup();
  expect(context).toBeDefined();
});

it('#platform to be `line`', () => {
  const { context } = setup();
  expect(context.platform).toBe('line');
});

it('get #session works', () => {
  const { context, session } = setup();
  expect(context.session).toBe(session);
});

it('get #event works', () => {
  const { context } = setup();
  expect(context.event).toBeInstanceOf(LineEvent);
});

it('get #client works', () => {
  const { context, client } = setup();
  expect(context.client).toBe(client);
});

describe('#reply', () => {
  it('#replyText to call client.replayText', async () => {
    const { context, client } = setup();

    await context.replyText('xxx.com');

    expect(client.replyText).toBeCalledWith(rawEvent.replyToken, 'xxx.com');
  });

  it('should throw when reply mulitple times', async () => {
    const { context } = setup();

    const error = new Error('Can not reply event mulitple times');
    error.name = 'Invariant Violation';

    await context.replyText('xxx.com');
    await expect(context.replyText('xxx.com')).rejects.toEqual(error);
  });
});

it('#sendText to call client.pushText', async () => {
  const { context, client, session } = setup();

  await context.sendText('xxx.com');

  expect(client.pushText).toBeCalledWith(session.user.id, 'xxx.com');
});

it('#sendImage to call client.pushImage', async () => {
  const { context, client, session } = setup();

  await context.sendImage('xxx.jpg', 'yyy.jpg');

  expect(client.pushImage).toBeCalledWith(
    session.user.id,
    'xxx.jpg',
    'yyy.jpg'
  );
});

it('#sendAudio to call client.pushAudio', async () => {
  const { context, client, session } = setup();

  await context.sendAudio('xxx.mp3', 240000);

  expect(client.pushAudio).toBeCalledWith(session.user.id, 'xxx.mp3', 240000);
});

it('#sendVideo to call client.pushVideo', async () => {
  const { context, client, session } = setup();

  await context.sendVideo('xxx.mp4', 'yyy.jpg');

  expect(client.pushVideo).toBeCalledWith(
    session.user.id,
    'xxx.mp4',
    'yyy.jpg'
  );
});

it('#sendLocation to call client.pushLocation', async () => {
  const { context, client, session } = setup();

  await context.sendLocation({
    title: 'my location',
    address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１s',
    latitude: 35.65910807942215,
    longitude: 139.70372892916203,
  });

  expect(client.pushLocation).toBeCalledWith(session.user.id, {
    title: 'my location',
    address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１s',
    latitude: 35.65910807942215,
    longitude: 139.70372892916203,
  });
});

it('#sendSticker to call client.pushSticker', async () => {
  const { context, client, session } = setup();

  await context.sendSticker('1', '1');

  expect(client.pushSticker).toBeCalledWith(session.user.id, '1', '1');
});

it('#sendImagemap to call client.pushImagemap', async () => {
  const { context, client, session } = setup();

  const template = {
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
  };

  await context.sendImagemap('this is an imagemap', template);

  expect(client.pushImagemap).toBeCalledWith(
    session.user.id,
    'this is an imagemap',
    template
  );
});

it('#sendButtonTemplate to call client.pushButtonTemplate', async () => {
  const { context, client, session } = setup();

  const template = {
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
  };

  await context.sendButtonTemplate('this is a button template', template);

  expect(client.pushButtonTemplate).toBeCalledWith(
    session.user.id,
    'this is a button template',
    template
  );
});

it('#sendConfirmTemplate to call client.pushConfirmTemplate', async () => {
  const { context, client, session } = setup();

  const template = {
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
  };

  await context.sendConfirmTemplate('this is a confirm template', template);

  expect(client.pushConfirmTemplate).toBeCalledWith(
    session.user.id,
    'this is a confirm template',
    template
  );
});

it('#sendCarouselTemplate to call client.pushCarouselTemplate', async () => {
  const { context, client, session } = setup();

  const template = [
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
  ];

  await context.sendCarouselTemplate('this is a carousel template', template);

  expect(client.pushCarouselTemplate).toBeCalledWith(
    session.user.id,
    'this is a carousel template',
    template
  );
});

it('has delay with methods', () => {
  const { context } = setup();
  expect(context.sendTextWithDelay).toBeDefined();
  expect(context.sendImageWithDelay).toBeDefined();
  expect(context.sendVideoWithDelay).toBeDefined();
  expect(context.sendAudioWithDelay).toBeDefined();
  expect(context.sendLocationWithDelay).toBeDefined();
  expect(context.sendStickerWithDelay).toBeDefined();
  expect(context.sendImagemapWithDelay).toBeDefined();
  expect(context.sendButtonTemplateWithDelay).toBeDefined();
  expect(context.sendConfirmTemplateWithDelay).toBeDefined();
  expect(context.sendCarouselTemplateWithDelay).toBeDefined();
});

it('#sendTextWithDelay to call client.pushText', async () => {
  const { context, client, session } = setup();

  await context.sendTextWithDelay(3000, 'xxx.com');

  expect(context.typing).toBeCalledWith(3000);
  expect(client.pushText).toBeCalledWith(session.user.id, 'xxx.com');
});
