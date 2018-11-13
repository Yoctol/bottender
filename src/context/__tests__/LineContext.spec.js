jest.mock('delay');
jest.mock('messaging-api-line');
jest.mock('warning');

let Line;
let LineClient;
let LineContext;
let LineEvent;
let sleep;
let warning;

beforeEach(() => {
  /* eslint-disable global-require */
  Line = require('messaging-api-line').Line;
  LineClient = require('messaging-api-line').LineClient;
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

const roomSession = {
  type: 'room',
  room: {
    id: 'fakeRoomId',
  },
  user: {
    id: 'fakeUserId',
  },
};

const groupSession = {
  type: 'group',
  group: {
    id: 'fakeGroupId',
  },
  user: {
    id: 'fakeUserId',
  },
};

const quickReply = {
  items: [
    {
      type: 'action',
      action: {
        type: 'cameraRoll',
        label: 'Send photo',
      },
    },
    {
      type: 'action',
      action: {
        type: 'camera',
        label: 'Open camera',
      },
    },
  ],
};

const setup = ({
  session = userSession,
  requestContext,
  shouldBatch = false,
  sendMethod,
  customAccessToken,
} = {}) => {
  const client = LineClient.connect();
  const context = new LineContext({
    client,
    event: new LineEvent(rawEvent),
    session,
    requestContext,
    shouldBatch,
    sendMethod,
    customAccessToken,
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

describe('#leave', () => {
  it('not leave no session', async () => {
    const { context, client } = setup({ session: null });

    await context.leave();

    expect(client.leaveGroup).not.toBeCalled();
    expect(client.leaveRoom).not.toBeCalled();
    expect(warning).toBeCalled();
    expect(context.isHandled).toBe(false);
  });

  it('leave group', async () => {
    const { context, client } = setup({ session: groupSession });

    await context.leave();

    expect(client.leaveGroup).toBeCalledWith('fakeGroupId', {
      accessToken: undefined,
    });
    expect(context.isHandled).toBe(true);
  });

  it('leave room', async () => {
    const { context, client } = setup({ session: roomSession });

    await context.leave();

    expect(client.leaveRoom).toBeCalledWith('fakeRoomId', {
      accessToken: undefined,
    });
    expect(context.isHandled).toBe(true);
  });

  it('not leave user', async () => {
    const { context, client } = setup({ session: userSession });

    await context.leave();

    expect(client.leaveGroup).not.toBeCalled();
    expect(client.leaveRoom).not.toBeCalled();
    expect(warning).toBeCalled();
    expect(context.isHandled).toBe(false);
  });
});

describe('#reply', () => {
  it('#reply to call client.reply', async () => {
    const { context, client } = setup();

    await context.reply([
      {
        type: 'text',
        text: 'xxx.com',
      },
    ]);

    expect(client.reply).toBeCalledWith(
      rawEvent.replyToken,
      [
        {
          type: 'text',
          text: 'xxx.com',
        },
      ],
      { accessToken: undefined }
    );
  });

  it('should work with quickReply', async () => {
    const { context, client } = setup();

    await context.reply(
      [
        {
          type: 'text',
          text: 'xxx.com',
        },
      ],
      {
        quickReply,
      }
    );

    expect(client.reply).toBeCalledWith(
      rawEvent.replyToken,
      [
        {
          type: 'text',
          text: 'xxx.com',
        },
      ],
      {
        quickReply,
      }
    );
  });
});

describe('#replyText', () => {
  it('should call client.replyText', async () => {
    const { context, client } = setup();

    await context.replyText('xxx.com');

    expect(client.replyText).toBeCalledWith(rawEvent.replyToken, 'xxx.com', {
      accessToken: undefined,
    });
  });

  it('should work with quickReply', async () => {
    const { context, client } = setup();

    await context.replyText('xxx.com', {
      quickReply,
    });

    expect(client.replyText).toBeCalledWith(rawEvent.replyToken, 'xxx.com', {
      quickReply,
    });
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

  it('should support custom token', async () => {
    const { context, client } = setup({
      customAccessToken: 'anyToken',
    });

    await context.replyText('xxx.com');

    expect(client.replyText).toBeCalledWith(rawEvent.replyToken, 'xxx.com', {
      accessToken: 'anyToken',
    });
  });
});

describe('#push', () => {
  it('should call client.push', async () => {
    const { context, client, session } = setup();

    await context.push([
      {
        type: 'text',
        text: 'xxx.com',
      },
    ]);

    expect(client.push).toBeCalledWith(
      session.user.id,
      [
        {
          type: 'text',
          text: 'xxx.com',
        },
      ],
      { accessToken: undefined }
    );
  });

  it('should work with quickReply', async () => {
    const { context, client, session } = setup();

    await context.push(
      [
        {
          type: 'text',
          text: 'xxx.com',
        },
      ],
      {
        quickReply,
      }
    );

    expect(client.push).toBeCalledWith(
      session.user.id,
      [
        {
          type: 'text',
          text: 'xxx.com',
        },
      ],
      {
        quickReply,
      }
    );
  });
});

describe('#pushText', () => {
  it('should call client.pushText', async () => {
    const { context, client, session } = setup();

    await context.pushText('xxx.com');

    expect(client.pushText).toBeCalledWith(session.user.id, 'xxx.com', {
      accessToken: undefined,
    });
  });

  it('should work with quickReply', async () => {
    const { context, client, session } = setup();

    await context.pushText('xxx.com', {
      quickReply,
    });

    expect(client.pushText).toBeCalledWith(session.user.id, 'xxx.com', {
      quickReply,
    });
  });

  it('should work with room session', async () => {
    const { context, client, session } = setup({
      session: roomSession,
    });

    await context.pushText('xxx.com');

    expect(client.pushText).toBeCalledWith(session.room.id, 'xxx.com', {
      accessToken: undefined,
    });
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: groupSession,
    });

    await context.pushText('xxx.com');

    expect(client.pushText).toBeCalledWith(session.group.id, 'xxx.com', {
      accessToken: undefined,
    });
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

  it('should support custom token', async () => {
    const { context, client, session } = setup({
      customAccessToken: 'anyToken',
    });

    await context.pushText('xxx.com');

    expect(client.pushText).toBeCalledWith(session.user.id, 'xxx.com', {
      accessToken: 'anyToken',
    });
  });
});

describe('send APIs', () => {
  describe('#send', () => {
    it('is not defined', () => {
      const { context } = setup();

      expect(context.send).not.toBeDefined();
    });
  });

  describe('#sendText', () => {
    it('should call client.pushText', async () => {
      const { context, client, session } = setup();

      await context.sendText('xxx.com');

      expect(client.pushText).toBeCalledWith(session.user.id, 'xxx.com', {
        accessToken: undefined,
      });
    });

    it('should work with quickReply', async () => {
      const { context, client, session } = setup();

      await context.sendText('xxx.com', {
        quickReply,
      });

      expect(client.pushText).toBeCalledWith(session.user.id, 'xxx.com', {
        quickReply,
      });
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendText('xxx.com');

      expect(client.pushText).toBeCalledWith(session.room.id, 'xxx.com', {
        accessToken: undefined,
      });
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
      });

      await context.sendText('xxx.com');

      expect(client.pushText).toBeCalledWith(session.group.id, 'xxx.com', {
        accessToken: undefined,
      });
    });

    it('should mark context as handled', async () => {
      const { context } = setup();

      await context.sendText('xxx.com');

      expect(context.isHandled).toBe(true);
    });
  });

  describe('#sendImage', () => {
    it('should call client.pushImage', async () => {
      const { context, client, session } = setup();

      await context.sendImage({
        originalContentUrl: 'xxx.jpg',
        previewImageUrl: 'yyy.jpg',
      });

      expect(client.pushImage).toBeCalledWith(
        session.user.id,
        {
          originalContentUrl: 'xxx.jpg',
          previewImageUrl: 'yyy.jpg',
        },
        { accessToken: undefined }
      );
    });

    it('should work with quickReply', async () => {
      const { context, client, session } = setup();

      await context.sendImage(
        {
          originalContentUrl: 'xxx.jpg',
          previewImageUrl: 'yyy.jpg',
        },
        {
          quickReply,
        }
      );

      expect(client.pushImage).toBeCalledWith(
        session.user.id,
        {
          originalContentUrl: 'xxx.jpg',
          previewImageUrl: 'yyy.jpg',
        },
        {
          quickReply,
        }
      );
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendImage({
        originalContentUrl: 'xxx.jpg',
        previewImageUrl: 'yyy.jpg',
      });

      expect(client.pushImage).toBeCalledWith(
        session.room.id,
        {
          originalContentUrl: 'xxx.jpg',
          previewImageUrl: 'yyy.jpg',
        },
        { accessToken: undefined }
      );
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
      });

      await context.sendImage({
        originalContentUrl: 'xxx.jpg',
        previewImageUrl: 'yyy.jpg',
      });

      expect(client.pushImage).toBeCalledWith(
        session.group.id,
        {
          originalContentUrl: 'xxx.jpg',
          previewImageUrl: 'yyy.jpg',
        },
        { accessToken: undefined }
      );
    });

    it('should mark context as handled', async () => {
      const { context } = setup();

      await context.sendImage({
        originalContentUrl: 'xxx.jpg',
        previewImageUrl: 'yyy.jpg',
      });

      expect(context.isHandled).toBe(true);
    });

    it('should call warning and not to send if dont have session', async () => {
      const { context, client } = setup({ session: false });

      await context.sendImage({
        originalContentUrl: 'xxx.jpg',
        previewImageUrl: 'yyy.jpg',
      });

      expect(warning).toBeCalled();
      expect(client.pushImage).not.toBeCalled();
    });
  });

  describe('#sendAudio', () => {
    it('should call client.pushAudio', async () => {
      const { context, client, session } = setup();

      await context.sendAudio({
        originalContentUrl: 'xxx.m4a',
        duration: 240000,
      });

      expect(client.pushAudio).toBeCalledWith(
        session.user.id,
        {
          originalContentUrl: 'xxx.m4a',
          duration: 240000,
        },
        { accessToken: undefined }
      );
    });

    it('should work with quickReply', async () => {
      const { context, client, session } = setup();

      await context.sendAudio(
        {
          originalContentUrl: 'xxx.m4a',
          duration: 240000,
        },
        {
          quickReply,
        }
      );

      expect(client.pushAudio).toBeCalledWith(
        session.user.id,
        {
          originalContentUrl: 'xxx.m4a',
          duration: 240000,
        },
        {
          quickReply,
        }
      );
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendAudio({
        originalContentUrl: 'xxx.m4a',
        duration: 240000,
      });

      expect(client.pushAudio).toBeCalledWith(
        session.room.id,
        {
          originalContentUrl: 'xxx.m4a',
          duration: 240000,
        },
        { accessToken: undefined }
      );
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
      });

      await context.sendAudio({
        originalContentUrl: 'xxx.m4a',
        duration: 240000,
      });

      expect(client.pushAudio).toBeCalledWith(
        session.group.id,
        {
          originalContentUrl: 'xxx.m4a',
          duration: 240000,
        },
        { accessToken: undefined }
      );
    });

    it('should mark context as handled', async () => {
      const { context } = setup();

      await context.sendAudio({
        originalContentUrl: 'xxx.m4a',
        duration: 240000,
      });

      expect(context.isHandled).toBe(true);
    });
  });

  describe('#sendVideo', () => {
    it('should call client.pushVideo', async () => {
      const { context, client, session } = setup();

      await context.sendVideo({
        originalContentUrl: 'xxx.mp4',
        previewImageUrl: 'yyy.jpg',
      });

      expect(client.pushVideo).toBeCalledWith(
        session.user.id,
        {
          originalContentUrl: 'xxx.mp4',
          previewImageUrl: 'yyy.jpg',
        },
        { accessToken: undefined }
      );
    });

    it('should work with quickReply', async () => {
      const { context, client, session } = setup();

      await context.sendVideo(
        {
          originalContentUrl: 'xxx.mp4',
          previewImageUrl: 'yyy.jpg',
        },
        {
          quickReply,
        }
      );

      expect(client.pushVideo).toBeCalledWith(
        session.user.id,
        {
          originalContentUrl: 'xxx.mp4',
          previewImageUrl: 'yyy.jpg',
        },
        {
          quickReply,
        }
      );
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendVideo({
        originalContentUrl: 'xxx.mp4',
        previewImageUrl: 'yyy.jpg',
      });

      expect(client.pushVideo).toBeCalledWith(
        session.room.id,
        {
          originalContentUrl: 'xxx.mp4',
          previewImageUrl: 'yyy.jpg',
        },
        { accessToken: undefined }
      );
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
      });

      await context.sendVideo({
        originalContentUrl: 'xxx.mp4',
        previewImageUrl: 'yyy.jpg',
      });

      expect(client.pushVideo).toBeCalledWith(
        session.group.id,
        {
          originalContentUrl: 'xxx.mp4',
          previewImageUrl: 'yyy.jpg',
        },
        { accessToken: undefined }
      );
    });

    it('should mark context as handled', async () => {
      const { context } = setup();

      await context.sendVideo({
        originalContentUrl: 'xxx.mp4',
        previewImageUrl: 'yyy.jpg',
      });

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

      expect(client.pushLocation).toBeCalledWith(
        session.user.id,
        {
          title: 'my location',
          address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
          latitude: 35.65910807942215,
          longitude: 139.70372892916203,
        },
        { accessToken: undefined }
      );
    });

    it('should work with quickReply', async () => {
      const { context, client, session } = setup();

      await context.sendLocation(
        {
          title: 'my location',
          address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
          latitude: 35.65910807942215,
          longitude: 139.70372892916203,
        },
        {
          quickReply,
        }
      );

      expect(client.pushLocation).toBeCalledWith(
        session.user.id,
        {
          title: 'my location',
          address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
          latitude: 35.65910807942215,
          longitude: 139.70372892916203,
        },
        {
          quickReply,
        }
      );
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendLocation({
        title: 'my location',
        address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
        latitude: 35.65910807942215,
        longitude: 139.70372892916203,
      });

      expect(client.pushLocation).toBeCalledWith(
        session.room.id,
        {
          title: 'my location',
          address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
          latitude: 35.65910807942215,
          longitude: 139.70372892916203,
        },
        { accessToken: undefined }
      );
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
      });

      await context.sendLocation({
        title: 'my location',
        address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
        latitude: 35.65910807942215,
        longitude: 139.70372892916203,
      });

      expect(client.pushLocation).toBeCalledWith(
        session.group.id,
        {
          title: 'my location',
          address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
          latitude: 35.65910807942215,
          longitude: 139.70372892916203,
        },
        { accessToken: undefined }
      );
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

      await context.sendSticker({
        packageId: '1',
        stickerId: '1',
      });

      expect(client.pushSticker).toBeCalledWith(
        session.user.id,
        {
          packageId: '1',
          stickerId: '1',
        },
        { accessToken: undefined }
      );
    });

    it('should work with quickReply', async () => {
      const { context, client, session } = setup();

      await context.sendSticker(
        {
          packageId: '1',
          stickerId: '1',
        },
        {
          quickReply,
        }
      );

      expect(client.pushSticker).toBeCalledWith(
        session.user.id,
        {
          packageId: '1',
          stickerId: '1',
        },
        {
          quickReply,
        }
      );
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendSticker({
        packageId: '1',
        stickerId: '1',
      });

      expect(client.pushSticker).toBeCalledWith(
        session.room.id,
        {
          packageId: '1',
          stickerId: '1',
        },
        { accessToken: undefined }
      );
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
      });

      await context.sendSticker({
        packageId: '1',
        stickerId: '1',
      });

      expect(client.pushSticker).toBeCalledWith(
        session.group.id,
        {
          packageId: '1',
          stickerId: '1',
        },
        { accessToken: undefined }
      );
    });

    it('should mark context as handled', async () => {
      const { context } = setup();

      await context.sendSticker({
        packageId: '1',
        stickerId: '1',
      });

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
        template,
        { accessToken: undefined }
      );
    });

    it('should work with quickReply', async () => {
      const { context, client, session } = setup();

      await context.sendImagemap('this is an imagemap', template, {
        quickReply,
      });

      expect(client.pushImagemap).toBeCalledWith(
        session.user.id,
        'this is an imagemap',
        template,
        {
          quickReply,
        }
      );
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendImagemap('this is an imagemap', template);

      expect(client.pushImagemap).toBeCalledWith(
        session.room.id,
        'this is an imagemap',
        template,
        { accessToken: undefined }
      );
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
      });

      await context.sendImagemap('this is an imagemap', template);

      expect(client.pushImagemap).toBeCalledWith(
        session.group.id,
        'this is an imagemap',
        template,
        { accessToken: undefined }
      );
    });

    it('should mark context as handled', async () => {
      const { context } = setup();

      await context.sendImagemap('this is an imagemap', template);

      expect(context.isHandled).toBe(true);
    });
  });

  describe('#sendFlex', () => {
    const contents = {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'Header text',
          },
        ],
      },
      hero: {
        type: 'image',
        url: 'https://example.com/flex/images/image.jpg',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'Body text',
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'Footer text',
          },
        ],
      },
      styles: {
        comment: 'See the example of a bubble style object',
      },
    };

    it('should call client.pushFlex', async () => {
      const { context, client, session } = setup();

      await context.sendFlex('this is a flex', contents);

      expect(client.pushFlex).toBeCalledWith(
        session.user.id,
        'this is a flex',
        contents,
        { accessToken: undefined }
      );
    });

    it('should work with quickReply', async () => {
      const { context, client, session } = setup();

      await context.sendFlex('this is a flex', contents, {
        quickReply,
      });

      expect(client.pushFlex).toBeCalledWith(
        session.user.id,
        'this is a flex',
        contents,
        {
          quickReply,
        }
      );
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendFlex('this is a flex', contents);

      expect(client.pushFlex).toBeCalledWith(
        session.room.id,
        'this is a flex',
        contents,
        { accessToken: undefined }
      );
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
      });

      await context.sendFlex('this is a flex', contents);

      expect(client.pushFlex).toBeCalledWith(
        session.group.id,
        'this is a flex',
        contents,
        { accessToken: undefined }
      );
    });

    it('should mark context as handled', async () => {
      const { context } = setup();

      await context.sendFlex('this is a flex', contents);

      expect(context.isHandled).toBe(true);
    });
  });

  describe('#sendTemplate', () => {
    const template = {
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
    };

    it('should call client.pushTemplate', async () => {
      const { context, client, session } = setup();

      await context.sendTemplate('this is a template', template);

      expect(client.pushTemplate).toBeCalledWith(
        session.user.id,
        'this is a template',
        template,
        { accessToken: undefined }
      );
    });

    it('should work with quickReply', async () => {
      const { context, client, session } = setup();

      await context.sendTemplate('this is a template', template, {
        quickReply,
      });

      expect(client.pushTemplate).toBeCalledWith(
        session.user.id,
        'this is a template',
        template,
        {
          quickReply,
        }
      );
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendTemplate('this is a template', template);

      expect(client.pushTemplate).toBeCalledWith(
        session.room.id,
        'this is a template',
        template,
        { accessToken: undefined }
      );
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
      });

      await context.sendTemplate('this is a template', template);

      expect(client.pushTemplate).toBeCalledWith(
        session.group.id,
        'this is a template',
        template,
        { accessToken: undefined }
      );
    });

    it('should mark context as handled', async () => {
      const { context } = setup();

      await context.sendTemplate('this is a template', template);

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
        template,
        { accessToken: undefined }
      );
    });

    it('should work with quickReply', async () => {
      const { context, client, session } = setup();

      await context.sendButtonTemplate('this is a button template', template, {
        quickReply,
      });

      expect(client.pushButtonTemplate).toBeCalledWith(
        session.user.id,
        'this is a button template',
        template,
        {
          quickReply,
        }
      );
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendButtonTemplate('this is a button template', template);

      expect(client.pushButtonTemplate).toBeCalledWith(
        session.room.id,
        'this is a button template',
        template,
        { accessToken: undefined }
      );
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
      });

      await context.sendButtonTemplate('this is a button template', template);

      expect(client.pushButtonTemplate).toBeCalledWith(
        session.group.id,
        'this is a button template',
        template,
        { accessToken: undefined }
      );
    });

    it('should mark context as handled', async () => {
      const { context } = setup();

      await context.sendButtonTemplate('this is a button template', template);

      expect(context.isHandled).toBe(true);
    });

    it('should support sendButtonsTemplate alias', async () => {
      const { context, client, session } = setup();

      await context.sendButtonsTemplate('this is a button template', template);

      expect(client.pushButtonTemplate).toBeCalledWith(
        session.user.id,
        'this is a button template',
        template,
        { accessToken: undefined }
      );
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
        template,
        { accessToken: undefined }
      );
    });

    it('should work with quickReply', async () => {
      const { context, client, session } = setup();

      await context.sendConfirmTemplate(
        'this is a confirm template',
        template,
        { quickReply }
      );

      expect(client.pushConfirmTemplate).toBeCalledWith(
        session.user.id,
        'this is a confirm template',
        template,
        { quickReply }
      );
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendConfirmTemplate('this is a confirm template', template);

      expect(client.pushConfirmTemplate).toBeCalledWith(
        session.room.id,
        'this is a confirm template',
        template,
        { accessToken: undefined }
      );
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
      });

      await context.sendConfirmTemplate('this is a confirm template', template);

      expect(client.pushConfirmTemplate).toBeCalledWith(
        session.group.id,
        'this is a confirm template',
        template,
        { accessToken: undefined }
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

      await context.sendCarouselTemplate(
        'this is a carousel template',
        template
      );

      expect(client.pushCarouselTemplate).toBeCalledWith(
        session.user.id,
        'this is a carousel template',
        template,
        { accessToken: undefined }
      );
    });

    it('should work with quickReply', async () => {
      const { context, client, session } = setup();

      await context.sendCarouselTemplate(
        'this is a carousel template',
        template,
        { quickReply }
      );

      expect(client.pushCarouselTemplate).toBeCalledWith(
        session.user.id,
        'this is a carousel template',
        template,
        { quickReply }
      );
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendConfirmTemplate(
        'this is a carousel template',
        template
      );

      expect(client.pushConfirmTemplate).toBeCalledWith(
        session.room.id,
        'this is a carousel template',
        template,
        { accessToken: undefined }
      );
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
      });

      await context.sendConfirmTemplate(
        'this is a carousel template',
        template
      );

      expect(client.pushConfirmTemplate).toBeCalledWith(
        session.group.id,
        'this is a carousel template',
        template,
        { accessToken: undefined }
      );
    });

    it('should mark context as handled', async () => {
      const { context } = setup();

      await context.sendCarouselTemplate(
        'this is a carousel template',
        template
      );

      expect(context.isHandled).toBe(true);
    });
  });
});

describe('profile APIs', () => {
  describe('#getUserProfile', () => {
    it('not get profile without session', async () => {
      const { context, client } = setup({ session: null });

      await context.getUserProfile();

      expect(client.getUserProfile).not.toBeCalled();
      expect(client.getGroupMemberProfile).not.toBeCalled();
      expect(client.getRoomMemberProfile).not.toBeCalled();
      expect(warning).toBeCalled();
      expect(context.isHandled).toBe(false);
    });

    it('not get profile without user in session', async () => {
      const { context, client } = setup({
        session: {
          type: 'room',
          room: {
            id: 'fakeRoomId',
          },
          user: null,
        },
      });

      await context.getUserProfile();

      expect(client.getUserProfile).not.toBeCalled();
      expect(client.getGroupMemberProfile).not.toBeCalled();
      expect(client.getRoomMemberProfile).not.toBeCalled();
      expect(warning).toBeCalled();
      expect(context.isHandled).toBe(false);
    });

    it('get user profile in group', async () => {
      const { context, client } = setup({ session: groupSession });

      await context.getUserProfile();

      expect(client.getGroupMemberProfile).toBeCalledWith(
        'fakeGroupId',
        'fakeUserId',
        { accessToken: undefined }
      );
    });

    it('get user profile in room', async () => {
      const { context, client } = setup({ session: roomSession });

      await context.getUserProfile();

      expect(client.getRoomMemberProfile).toBeCalledWith(
        'fakeRoomId',
        'fakeUserId',
        { accessToken: undefined }
      );
    });

    it('get user profile', async () => {
      const { context, client } = setup({ session: userSession });

      await context.getUserProfile();

      expect(client.getUserProfile).toBeCalledWith('fakeUserId', {
        accessToken: undefined,
      });
    });
  });

  describe('#getMemberProfile', () => {
    it('not get profile without session', async () => {
      const { context, client } = setup({ session: null });

      await context.getMemberProfile('anotherUser');

      expect(client.getGroupMemberProfile).not.toBeCalled();
      expect(client.getRoomMemberProfile).not.toBeCalled();
      expect(warning).toBeCalled();
      expect(context.isHandled).toBe(false);
    });

    it('get member profile in group', async () => {
      const { context, client } = setup({ session: groupSession });

      await context.getMemberProfile('anotherUser');

      expect(client.getGroupMemberProfile).toBeCalledWith(
        'fakeGroupId',
        'anotherUser',
        { accessToken: undefined }
      );
    });

    it('get member profile in room', async () => {
      const { context, client } = setup({ session: roomSession });

      await context.getMemberProfile('anotherUser');

      expect(client.getRoomMemberProfile).toBeCalledWith(
        'fakeRoomId',
        'anotherUser',
        { accessToken: undefined }
      );
    });

    it('not get member profile in user session', async () => {
      const { context, client } = setup({ session: userSession });

      await context.getMemberProfile('anotherUser');

      expect(client.getGroupMemberProfile).not.toBeCalled();
      expect(client.getRoomMemberProfile).not.toBeCalled();
      expect(warning).toBeCalled();
      expect(context.isHandled).toBe(false);
    });
  });
});

describe('member IDs APIs', () => {
  describe('#getMemberIds', () => {
    it('not get memeber ids without session', async () => {
      const { context, client } = setup({ session: null });

      await context.getMemberIds('startToken');

      expect(client.getRoomMemberIds).not.toBeCalled();
      expect(client.getGroupMemberIds).not.toBeCalled();
      expect(warning).toBeCalled();
      expect(context.isHandled).toBe(false);
    });

    it('get memeber ids in group', async () => {
      const { context, client } = setup({ session: groupSession });

      await context.getMemberIds('startToken');

      expect(client.getGroupMemberIds).toBeCalledWith(
        'fakeGroupId',
        'startToken',
        { accessToken: undefined }
      );
    });

    it('get memeber ids in room', async () => {
      const { context, client } = setup({ session: roomSession });

      await context.getMemberIds('startToken');

      expect(client.getRoomMemberIds).toBeCalledWith(
        'fakeRoomId',
        'startToken',
        { accessToken: undefined }
      );
    });

    it('not get user profile in user session', async () => {
      const { context, client } = setup({ session: userSession });

      await context.getMemberIds('startToken');

      expect(client.getRoomMemberIds).not.toBeCalled();
      expect(client.getGroupMemberIds).not.toBeCalled();
      expect(warning).toBeCalled();
      expect(context.isHandled).toBe(false);
    });
  });

  describe('#getAllMemberIds', () => {
    it('not get memeber ids without session', async () => {
      const { context, client } = setup({ session: null });

      await context.getAllMemberIds();

      expect(client.getAllRoomMemberIds).not.toBeCalled();
      expect(client.getAllGroupMemberIds).not.toBeCalled();
      expect(warning).toBeCalled();
      expect(context.isHandled).toBe(false);
    });

    it('get memeber ids in group', async () => {
      const { context, client } = setup({ session: groupSession });

      await context.getAllMemberIds();

      expect(client.getAllGroupMemberIds).toBeCalledWith('fakeGroupId', {
        accessToken: undefined,
      });
    });

    it('get memeber ids in room', async () => {
      const { context, client } = setup({ session: roomSession });

      await context.getAllMemberIds();

      expect(client.getAllRoomMemberIds).toBeCalledWith('fakeRoomId', {
        accessToken: undefined,
      });
    });

    it('not get user profile in user session', async () => {
      const { context, client } = setup({ session: userSession });

      await context.getAllMemberIds();

      expect(client.getAllRoomMemberIds).not.toBeCalled();
      expect(client.getAllGroupMemberIds).not.toBeCalled();
      expect(warning).toBeCalled();
      expect(context.isHandled).toBe(false);
    });
  });
});

describe('ruchmenu APIs', () => {
  describe('#getLinkedRichMenu', () => {
    it('should call client.getLinkedRichMenu', async () => {
      const { context, client, session } = setup();

      client.getLinkedRichMenu.mockResolvedValue({
        richMenuId: 'richMenuId',
      });

      const result = await context.getLinkedRichMenu();

      expect(client.getLinkedRichMenu).toBeCalledWith(session.user.id, {
        accessToken: undefined,
      });
      expect(result.richMenuId).toEqual('richMenuId');
    });

    it('should warn without user', async () => {
      const { context } = setup({ session: {} });

      await context.getLinkedRichMenu();

      expect(warning).toBeCalled();
    });
  });

  describe('#linkRichMenu', () => {
    it('should call client.linkRichMenu', async () => {
      const { context, client, session } = setup();

      await context.linkRichMenu('richMenuId');

      expect(client.linkRichMenu).toBeCalledWith(
        session.user.id,
        'richMenuId',
        { accessToken: undefined }
      );
    });

    it('should warn without user', async () => {
      const { context } = setup({ session: {} });

      await context.linkRichMenu('richMenuId');

      expect(warning).toBeCalled();
    });
  });

  describe('#unlinkRichMenu', () => {
    it('should call client.unlinkRichMenu', async () => {
      const { context, client, session } = setup();

      await context.unlinkRichMenu();

      expect(client.unlinkRichMenu).toBeCalledWith(session.user.id, {
        accessToken: undefined,
      });
    });

    it('should warn without user', async () => {
      const { context } = setup({ session: {} });

      await context.unlinkRichMenu();

      expect(warning).toBeCalled();
    });
  });
});

describe('account link APIs', () => {
  describe('#issueLinkToken', () => {
    it('should call client.issueLinkToken', async () => {
      const { context, client, session } = setup();
      client.issueLinkToken.mockResolvedValue({
        token: 'xxxxx',
      });

      const result = await context.issueLinkToken();

      expect(client.issueLinkToken).toBeCalledWith(session.user.id, {
        accessToken: undefined,
      });
      expect(result).toEqual({
        token: 'xxxxx',
      });
      expect(warning).not.toBeCalled();
    });

    it('should warn without user', async () => {
      const { context } = setup({ session: {} });

      await context.issueLinkToken();

      expect(warning).toBeCalled();
    });
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

describe('batch', () => {
  it('should not batch when shouldBatch: false', async () => {
    const { client, context } = setup({ shouldBatch: false });

    await context.replyText('1');
    await context.pushText('2');
    await context.pushText('3');

    await context.handlerDidEnd();

    expect(client.reply).not.toBeCalled();
    expect(client.push).not.toBeCalled();
  });

  it('should batch reply', async () => {
    const { client, context } = setup({ shouldBatch: true });

    await context.replyText('1');
    await context.replyText('2');
    await context.replyText('3');

    await context.handlerDidEnd();

    expect(client.reply).toBeCalledWith(
      rawEvent.replyToken,
      [
        {
          type: 'text',
          text: '1',
        },
        {
          type: 'text',
          text: '2',
        },
        {
          type: 'text',
          text: '3',
        },
      ],
      { accessToken: undefined }
    );
  });

  it('should work with context.reply', async () => {
    const { client, context } = setup({ shouldBatch: true });

    await context.replyText('1');
    await context.reply([Line.createText('2'), Line.createText('3')]);

    await context.handlerDidEnd();

    expect(client.reply).toBeCalledWith(
      rawEvent.replyToken,
      [
        {
          type: 'text',
          text: '1',
        },
        {
          type: 'text',
          text: '2',
        },
        {
          type: 'text',
          text: '3',
        },
      ],
      { accessToken: undefined }
    );
  });

  it('should warning when reply over 5 messages', async () => {
    const { client, context } = setup({ shouldBatch: true });

    await context.replyText('1');
    await context.replyText('2');
    await context.replyText('3');
    await context.replyText('4');
    await context.replyText('5');

    await context.replyText('6');

    await context.handlerDidEnd();

    expect(client.reply).toHaveBeenCalledTimes(1);
    expect(client.reply).toBeCalledWith(
      rawEvent.replyToken,
      [
        {
          type: 'text',
          text: '1',
        },
        {
          type: 'text',
          text: '2',
        },
        {
          type: 'text',
          text: '3',
        },
        {
          type: 'text',
          text: '4',
        },
        {
          type: 'text',
          text: '5',
        },
      ],
      { accessToken: undefined }
    );
    expect(warning).toBeCalledWith(false, expect.any(String));
  });

  it('should batch push', async () => {
    const { client, context, session } = setup({ shouldBatch: true });

    await context.pushText('1');
    await context.pushText('2');
    await context.pushText('3');

    await context.handlerDidEnd();

    expect(client.push).toBeCalledWith(
      session.user.id,
      [
        {
          type: 'text',
          text: '1',
        },
        {
          type: 'text',
          text: '2',
        },
        {
          type: 'text',
          text: '3',
        },
      ],
      { accessToken: undefined }
    );
  });

  it('should work with context.push', async () => {
    const { client, context, session } = setup({ shouldBatch: true });

    await context.pushText('1');
    await context.push([Line.createText('2'), Line.createText('3')]);

    await context.handlerDidEnd();

    expect(client.push).toBeCalledWith(
      session.user.id,
      [
        {
          type: 'text',
          text: '1',
        },
        {
          type: 'text',
          text: '2',
        },
        {
          type: 'text',
          text: '3',
        },
      ],
      { accessToken: undefined }
    );
  });

  it('should have more requests when push over 5 messages', async () => {
    const { client, context, session } = setup({ shouldBatch: true });

    await context.pushText('1');
    await context.pushText('2');
    await context.pushText('3');
    await context.pushText('4');
    await context.pushText('5');

    await context.pushText('6');

    await context.handlerDidEnd();

    expect(client.push).toHaveBeenCalledTimes(2);
    expect(client.push).toBeCalledWith(
      session.user.id,
      [
        {
          type: 'text',
          text: '1',
        },
        {
          type: 'text',
          text: '2',
        },
        {
          type: 'text',
          text: '3',
        },
        {
          type: 'text',
          text: '4',
        },
        {
          type: 'text',
          text: '5',
        },
      ],
      { accessToken: undefined }
    );
    expect(client.push).toBeCalledWith(
      session.user.id,
      [
        {
          type: 'text',
          text: '6',
        },
      ],
      { accessToken: undefined }
    );
    expect(warning).not.toBeCalled();
  });
});

describe('sendMethod', () => {
  it('should use push in send as default', async () => {
    const { context, client, session } = setup();

    await context.sendText('hello');

    expect(client.pushText).toBeCalledWith(session.user.id, 'hello', {
      accessToken: undefined,
    });
    expect(client.replyText).not.toBeCalled();
  });

  it('should use reply in send when sendMethod: reply', async () => {
    const { context, client } = setup({
      sendMethod: 'reply',
    });

    await context.sendText('hello');

    expect(client.replyText).toBeCalledWith(rawEvent.replyToken, 'hello', {
      accessToken: undefined,
    });
    expect(client.pushText).not.toBeCalled();
  });
});
