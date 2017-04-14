import LINEContext from '../LINEContext';
import LINEEvent from '../LINEEvent';
import SessionData from '../SessionData';

jest.mock('../../api/LINEBotAPIClient');
jest.mock('../../database/resolve');

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
  const data = new SessionData({
    user: {
      id: 'fakeUserId',
    },
  });
  const db = {};
  const context = new LINEContext({
    lineAPIClient: client,
    rawEvent,
    data,
    db,
  });
  return {
    context,
    data,
    db,
    client,
  };
};

it('be defined', () => {
  const { context } = setup();
  expect(context).toBeDefined();
});

it('get #data works', () => {
  const { context, data } = setup();
  expect(context.data).toBe(data);
});

it('get #db works', () => {
  const { context, db } = setup();
  expect(context.db).toBe(db);
});

it('get #event works', () => {
  const { context } = setup();
  expect(context.event).toBeInstanceOf(LINEEvent);
});

it('#sendText put pushText to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushText',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendImage put pushImage to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendImage('xxx.jpg', 'yyy.jpg');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushImage',
    args: [data.user.id, 'xxx.jpg', 'yyy.jpg'],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendAudio put pushAudio to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendAudio('xxx.mp3', 240000);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushAudio',
    args: [data.user.id, 'xxx.mp3', 240000],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendVideo put pushVideo to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendVideo('xxx.mp4', 'yyy.jpg');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushVideo',
    args: [data.user.id, 'xxx.mp4', 'yyy.jpg'],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendLocation put pushLocation to jobQueue', () => {
  const { context, client, data } = setup();
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
      data.user.id,
      {
        title: 'my location',
        address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
        latitude: 35.65910807942215,
        longitude: 139.70372892916203,
      },
    ],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendSticker put pushSticker to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendSticker('1', '1');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushSticker',
    args: [data.user.id, '1', '1'],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendImagemap put pushImagemap to jobQueue', () => {
  const { context, client, data } = setup();
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
    args: [data.user.id, 'this is an imagemap', template],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendButtonTemplate put pushButtonTemplate to jobQueue', () => {
  const { context, client, data } = setup();
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
    args: [data.user.id, 'this is a button template', template],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendConfirmTemplate put pushConfirmTemplate to jobQueue', () => {
  const { context, client, data } = setup();
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
    args: [data.user.id, 'this is a confirm template', template],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendCarouselTemplate put pushCarouselTemplate to jobQueue', () => {
  const { context, client, data } = setup();
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
    args: [data.user.id, 'this is a carousel template', template],
    delay: 1000,
    showIndicators: true,
  });
});

it('use default message delay', () => {
  const { context, client, data } = setup();

  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('yooooooo~');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushText',
    args: [data.user.id, 'yooooooo~'],
    delay: 1000,
    showIndicators: true,
  });
});

it('should not pushText to enqueu in jobQueue when paused', () => {
  const { context } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.hitl.pause();

  context.sendText('xxx.com');

  expect(context._jobQueue.enqueue).not.toBeCalled();
});

it('should pushText to enqueu in jobQueue when resumed', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.hitl.pause();
  context.hitl.unpause();

  context.sendText('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushText',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
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
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendTextWithDelay(3000, 'xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushText',
    args: [data.user.id, 'xxx.com'],
    delay: 3000,
    showIndicators: true,
  });
});
