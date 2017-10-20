jest.mock('delay');
jest.mock('messaging-api-line');
jest.mock('warning');

let LineContext;
let LineEvent;
let sleep;
let warning;

beforeEach(() => {
  /* eslint-disable global-require */
  LineContext = require('../LineContext').default;
  LineEvent = require('../LineEvent').default;
  sleep = require('delay');
  warning = require('warning');
  /* eslint-enable global-require */
});

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

const userSession = {
  type: 'user',
  user: {
    id: 'fakeUserId',
  },
};
const setup = ({ session } = { session: userSession }) => {
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
  const context = new LineContext({
    client,
    event: new LineEvent(rawEvent),
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

it('#isReplied default to be false', () => {
  const { context } = setup();
  expect(context.isReplied).toBe(false);
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
  it('#replyText to call client.replyText', async () => {
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

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.replyText('hello');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendText('xxx.com');

    expect(warning).toBeCalled();
    expect(client.pushText).not.toBeCalled();
  });
});

describe('#sendText', () => {
  it('should call client.pushText', async () => {
    const { context, client, session } = setup();

    await context.sendText('xxx.com');

    expect(client.pushText).toBeCalledWith(session.user.id, 'xxx.com');
  });

  it('should work with room session', async () => {
    const { context, client, session } = setup({
      session: { type: 'room', room: { id: 'room' } },
    });

    await context.sendText('xxx.com');

    expect(client.pushText).toBeCalledWith(session.room.id, 'xxx.com');
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: { type: 'group', group: { id: 'group' } },
    });

    await context.sendText('xxx.com');

    expect(client.pushText).toBeCalledWith(session.group.id, 'xxx.com');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendText('xxx.com');

    expect(context.isHandled).toBe(true);
  });
});

describe('#pushText', () => {
  it('should call client.pushText', async () => {
    const { context, client, session } = setup();

    await context.pushText('xxx.com');

    expect(client.pushText).toBeCalledWith(session.user.id, 'xxx.com');
  });

  it('should work with room session', async () => {
    const { context, client, session } = setup({
      session: { type: 'room', room: { id: 'room' } },
    });

    await context.pushText('xxx.com');

    expect(client.pushText).toBeCalledWith(session.room.id, 'xxx.com');
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: { type: 'group', group: { id: 'group' } },
    });

    await context.pushText('xxx.com');

    expect(client.pushText).toBeCalledWith(session.group.id, 'xxx.com');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.pushText('xxx.com');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.pushText('xxx.com');

    expect(warning).toBeCalled();
    expect(client.pushText).not.toBeCalled();
  });
});

describe('#sendImage', () => {
  it('should call client.pushImage', async () => {
    const { context, client, session } = setup();

    await context.sendImage('xxx.jpg', 'yyy.jpg');

    expect(client.pushImage).toBeCalledWith(
      session.user.id,
      'xxx.jpg',
      'yyy.jpg'
    );
  });

  it('should work with room session', async () => {
    const { context, client, session } = setup({
      session: { type: 'room', room: { id: 'room' } },
    });

    await context.sendImage('xxx.jpg', 'yyy.jpg');

    expect(client.pushImage).toBeCalledWith(
      session.room.id,
      'xxx.jpg',
      'yyy.jpg'
    );
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: { type: 'group', group: { id: 'group' } },
    });

    await context.sendImage('xxx.jpg', 'yyy.jpg');

    expect(client.pushImage).toBeCalledWith(
      session.group.id,
      'xxx.jpg',
      'yyy.jpg'
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendImage('xxx.jpg', 'yyy.jpg');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendImage('xxx.jpg', 'yyy.jpg');

    expect(warning).toBeCalled();
    expect(client.pushImage).not.toBeCalled();
  });
});

describe('#sendAudio', () => {
  it('should call client.pushAudio', async () => {
    const { context, client, session } = setup();

    await context.sendAudio('xxx.mp3', 240000);

    expect(client.pushAudio).toBeCalledWith(session.user.id, 'xxx.mp3', 240000);
  });

  it('should work with room session', async () => {
    const { context, client, session } = setup({
      session: { type: 'room', room: { id: 'room' } },
    });

    await context.sendAudio('xxx.mp3', 240000);

    expect(client.pushAudio).toBeCalledWith(session.room.id, 'xxx.mp3', 240000);
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: { type: 'group', group: { id: 'group' } },
    });

    await context.sendAudio('xxx.mp3', 240000);

    expect(client.pushAudio).toBeCalledWith(
      session.group.id,
      'xxx.mp3',
      240000
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendAudio('xxx.mp3', 240000);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendVideo', () => {
  it('should call client.pushVideo', async () => {
    const { context, client, session } = setup();

    await context.sendVideo('xxx.mp4', 'yyy.jpg');

    expect(client.pushVideo).toBeCalledWith(
      session.user.id,
      'xxx.mp4',
      'yyy.jpg'
    );
  });

  it('should work with room session', async () => {
    const { context, client, session } = setup({
      session: { type: 'room', room: { id: 'room' } },
    });

    await context.sendVideo('xxx.mp4', 'yyy.jpg');

    expect(client.pushVideo).toBeCalledWith(
      session.room.id,
      'xxx.mp4',
      'yyy.jpg'
    );
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: { type: 'group', group: { id: 'group' } },
    });

    await context.sendVideo('xxx.mp4', 'yyy.jpg');

    expect(client.pushVideo).toBeCalledWith(
      session.group.id,
      'xxx.mp4',
      'yyy.jpg'
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendVideo('xxx.mp4', 'yyy.jpg');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendLocation', () => {
  it('should call client.pushLocation', async () => {
    const { context, client, session } = setup();

    await context.sendLocation({
      title: 'my location',
      address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
      latitude: 35.65910807942215,
      longitude: 139.70372892916203,
    });

    expect(client.pushLocation).toBeCalledWith(session.user.id, {
      title: 'my location',
      address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
      latitude: 35.65910807942215,
      longitude: 139.70372892916203,
    });
  });

  it('should work with room session', async () => {
    const { context, client, session } = setup({
      session: { type: 'room', room: { id: 'room' } },
    });

    await context.sendLocation({
      title: 'my location',
      address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
      latitude: 35.65910807942215,
      longitude: 139.70372892916203,
    });

    expect(client.pushLocation).toBeCalledWith(session.room.id, {
      title: 'my location',
      address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
      latitude: 35.65910807942215,
      longitude: 139.70372892916203,
    });
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: { type: 'group', group: { id: 'group' } },
    });

    await context.sendLocation({
      title: 'my location',
      address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
      latitude: 35.65910807942215,
      longitude: 139.70372892916203,
    });

    expect(client.pushLocation).toBeCalledWith(session.group.id, {
      title: 'my location',
      address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
      latitude: 35.65910807942215,
      longitude: 139.70372892916203,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendLocation({
      title: 'my location',
      address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
      latitude: 35.65910807942215,
      longitude: 139.70372892916203,
    });

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendSticker', () => {
  it('should call client.pushSticker', async () => {
    const { context, client, session } = setup();

    await context.sendSticker('1', '1');

    expect(client.pushSticker).toBeCalledWith(session.user.id, '1', '1');
  });

  it('should work with room session', async () => {
    const { context, client, session } = setup({
      session: { type: 'room', room: { id: 'room' } },
    });

    await context.sendSticker('1', '1');

    expect(client.pushSticker).toBeCalledWith(session.room.id, '1', '1');
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: { type: 'group', group: { id: 'group' } },
    });

    await context.sendSticker('1', '1');

    expect(client.pushSticker).toBeCalledWith(session.group.id, '1', '1');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendSticker('1', '1');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendImagemap', () => {
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

  it('should call client.pushImagemap', async () => {
    const { context, client, session } = setup();

    await context.sendImagemap('this is an imagemap', template);

    expect(client.pushImagemap).toBeCalledWith(
      session.user.id,
      'this is an imagemap',
      template
    );
  });

  it('should work with room session', async () => {
    const { context, client, session } = setup({
      session: { type: 'room', room: { id: 'room' } },
    });

    await context.sendImagemap('this is an imagemap', template);

    expect(client.pushImagemap).toBeCalledWith(
      session.room.id,
      'this is an imagemap',
      template
    );
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: { type: 'group', group: { id: 'group' } },
    });

    await context.sendImagemap('this is an imagemap', template);

    expect(client.pushImagemap).toBeCalledWith(
      session.group.id,
      'this is an imagemap',
      template
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendImagemap('this is an imagemap', template);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendButtonTemplate', () => {
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

  it('should call client.pushButtonTemplate', async () => {
    const { context, client, session } = setup();

    await context.sendButtonTemplate('this is a button template', template);

    expect(client.pushButtonTemplate).toBeCalledWith(
      session.user.id,
      'this is a button template',
      template
    );
  });

  it('should work with room session', async () => {
    const { context, client, session } = setup({
      session: { type: 'room', room: { id: 'room' } },
    });

    await context.sendButtonTemplate('this is a button template', template);

    expect(client.pushButtonTemplate).toBeCalledWith(
      session.room.id,
      'this is a button template',
      template
    );
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: { type: 'group', group: { id: 'group' } },
    });

    await context.sendButtonTemplate('this is a button template', template);

    expect(client.pushButtonTemplate).toBeCalledWith(
      session.group.id,
      'this is a button template',
      template
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendButtonTemplate('this is a button template', template);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendConfirmTemplate', () => {
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

  it('should call client.pushConfirmTemplate', async () => {
    const { context, client, session } = setup();

    await context.sendConfirmTemplate('this is a confirm template', template);

    expect(client.pushConfirmTemplate).toBeCalledWith(
      session.user.id,
      'this is a confirm template',
      template
    );
  });

  it('should work with room session', async () => {
    const { context, client, session } = setup({
      session: { type: 'room', room: { id: 'room' } },
    });

    await context.sendConfirmTemplate('this is a confirm template', template);

    expect(client.pushConfirmTemplate).toBeCalledWith(
      session.room.id,
      'this is a confirm template',
      template
    );
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: { type: 'group', group: { id: 'group' } },
    });

    await context.sendConfirmTemplate('this is a confirm template', template);

    expect(client.pushConfirmTemplate).toBeCalledWith(
      session.group.id,
      'this is a confirm template',
      template
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendConfirmTemplate('this is a confirm template', template);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendCarouselTemplate', () => {
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

  it('should call client.pushCarouselTemplate', async () => {
    const { context, client, session } = setup();

    await context.sendCarouselTemplate('this is a carousel template', template);

    expect(client.pushCarouselTemplate).toBeCalledWith(
      session.user.id,
      'this is a carousel template',
      template
    );
  });

  it('should work with room session', async () => {
    const { context, client, session } = setup({
      session: { type: 'room', room: { id: 'room' } },
    });

    await context.sendConfirmTemplate('this is a carousel template', template);

    expect(client.pushConfirmTemplate).toBeCalledWith(
      session.room.id,
      'this is a carousel template',
      template
    );
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: { type: 'group', group: { id: 'group' } },
    });

    await context.sendConfirmTemplate('this is a carousel template', template);

    expect(client.pushConfirmTemplate).toBeCalledWith(
      session.group.id,
      'this is a carousel template',
      template
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendCarouselTemplate('this is a carousel template', template);

    expect(context.isHandled).toBe(true);
  });
});

describe('#typing', () => {
  it('avoid delay 0', async () => {
    const { context } = setup();

    await context.typing(0);

    expect(sleep).not.toBeCalled();
  });

  it('should call sleep', async () => {
    const { context } = setup();

    await context.typing(10);

    expect(sleep).toBeCalled();
  });
});
