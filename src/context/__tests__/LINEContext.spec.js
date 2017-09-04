import LINEContext from '../LINEContext';
import LINEEvent from '../LINEEvent';

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
  const client = {};
  const session = {
    user: {
      id: 'fakeUserId',
    },
  };
  const context = new LINEContext({
    client,
    event: new LINEEvent(rawEvent),
    session,
  });
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
  expect(context.event).toBeInstanceOf(LINEEvent);
});

it('get #client works', () => {
  const { context, client } = setup();
  expect(context.client).toBe(client);
});

describe('#reply', () => {
  it('#replyText put replyText to jobQueue', () => {
    const { context, client } = setup();
    context._jobQueue = {
      enqueue: jest.fn(),
    };

    context.replyText('xxx.com');

    expect(context._jobQueue.enqueue).toBeCalledWith({
      instance: client,
      method: 'replyText',
      args: ['nHuyWiB7yP5Zw52FIkcQobQuGDXCTA', 'xxx.com'],
      delay: 1000,
      showIndicators: true,
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    });
  });

  it('should throw when reply mulitple times', () => {
    const { context } = setup();
    context._jobQueue = {
      enqueue: jest.fn(),
    };

    context.replyText('xxx.com');
    expect(() => {
      context.replyText('xxx.com');
    }).toThrow();
  });
});

it('#sendText put pushText to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushText',
    args: [session.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendImage put pushImage to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendImage('xxx.jpg', 'yyy.jpg');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushImage',
    args: [session.user.id, 'xxx.jpg', 'yyy.jpg'],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendAudio put pushAudio to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendAudio('xxx.mp3', 240000);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushAudio',
    args: [session.user.id, 'xxx.mp3', 240000],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendVideo put pushVideo to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendVideo('xxx.mp4', 'yyy.jpg');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushVideo',
    args: [session.user.id, 'xxx.mp4', 'yyy.jpg'],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendLocation put pushLocation to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendLocation({
    title: 'my location',
    address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
    latitude: 35.65910807942215,
    longitude: 139.70372892916203,
  });

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushLocation',
    args: [
      session.user.id,
      {
        title: 'my location',
        address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
        latitude: 35.65910807942215,
        longitude: 139.70372892916203,
      },
    ],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendSticker put pushSticker to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendSticker('1', '1');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushSticker',
    args: [session.user.id, '1', '1'],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendImagemap put pushImagemap to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

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

  context.sendImagemap('this is an imagemap', template);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushImagemap',
    args: [session.user.id, 'this is an imagemap', template],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendButtonTemplate put pushButtonTemplate to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

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

  context.sendButtonTemplate('this is a button template', template);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushButtonTemplate',
    args: [session.user.id, 'this is a button template', template],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendConfirmTemplate put pushConfirmTemplate to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

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

  context.sendConfirmTemplate('this is a confirm template', template);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushConfirmTemplate',
    args: [session.user.id, 'this is a confirm template', template],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendCarouselTemplate put pushCarouselTemplate to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

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

  context.sendCarouselTemplate('this is a carousel template', template);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushCarouselTemplate',
    args: [session.user.id, 'this is a carousel template', template],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('use default message delay', () => {
  const { context, client, session } = setup();

  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('yooooooo~');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushText',
    args: [session.user.id, 'yooooooo~'],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('has send to methods', () => {
  const { context } = setup();
  expect(context.sendTextTo).toBeDefined();
  expect(context.sendImageTo).toBeDefined();
  expect(context.sendVideoTo).toBeDefined();
  expect(context.sendAudioTo).toBeDefined();
  expect(context.sendLocationTo).toBeDefined();
  expect(context.sendStickerTo).toBeDefined();
  expect(context.sendImagemapTo).toBeDefined();
  expect(context.sendButtonTemplateTo).toBeDefined();
  expect(context.sendConfirmTemplateTo).toBeDefined();
  expect(context.sendCarouselTemplateTo).toBeDefined();
});

it('#sendTextTo put pushText to jobQueue', () => {
  const { context, client } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendTextTo('uid_1', 'xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushText',
    args: ['uid_1', 'xxx.com'],
    delay: 0,
    showIndicators: false,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
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

it('#sendTextWithDelay put pushText to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendTextWithDelay(3000, 'xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushText',
    args: [session.user.id, 'xxx.com'],
    delay: 3000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});
