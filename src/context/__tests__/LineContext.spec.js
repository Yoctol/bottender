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

const setup = ({ session } = { session: userSession }) => {
  const client = {
    reply: jest.fn(),
    replyText: jest.fn(),
    push: jest.fn(),
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
    getUserProfile: jest.fn(),
    getGroupMemberProfile: jest.fn(),
    getRoomMemberProfile: jest.fn(),
    getGroupMemberIds: jest.fn(),
    getAllGroupMemberIds: jest.fn(),
    getRoomMemberIds: jest.fn(),
    getAllRoomMemberIds: jest.fn(),
    getLinkedRichMenu: jest.fn(),
    linkRichMenu: jest.fn(),
    unlinkRichMenu: jest.fn(),
    leaveGroup: jest.fn(),
    leaveRoom: jest.fn(),
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

    expect(client.leaveGroup).toBeCalledWith('fakeGroupId');
    expect(context.isHandled).toBe(true);
  });

  it('leave room', async () => {
    const { context, client } = setup({ session: roomSession });

    await context.leave();

    expect(client.leaveRoom).toBeCalledWith('fakeRoomId');
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

    expect(client.reply).toBeCalledWith(rawEvent.replyToken, [
      {
        type: 'text',
        text: 'xxx.com',
      },
    ]);
  });

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

describe('#push', () => {
  it('should call client.push', async () => {
    const { context, client, session } = setup();

    await context.push([
      {
        type: 'text',
        text: 'xxx.com',
      },
    ]);

    expect(client.push).toBeCalledWith(session.user.id, [
      {
        type: 'text',
        text: 'xxx.com',
      },
    ]);
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
      session: roomSession,
    });

    await context.pushText('xxx.com');

    expect(client.pushText).toBeCalledWith(session.room.id, 'xxx.com');
  });

  it('should work with group session', async () => {
    const { context, client, session } = setup({
      session: groupSession,
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

      expect(client.pushText).toBeCalledWith(session.user.id, 'xxx.com');
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendText('xxx.com');

      expect(client.pushText).toBeCalledWith(session.room.id, 'xxx.com');
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
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
        session: roomSession,
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
        session: groupSession,
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

      expect(client.pushAudio).toBeCalledWith(
        session.user.id,
        'xxx.mp3',
        240000
      );
    });

    it('should work with room session', async () => {
      const { context, client, session } = setup({
        session: roomSession,
      });

      await context.sendAudio('xxx.mp3', 240000);

      expect(client.pushAudio).toBeCalledWith(
        session.room.id,
        'xxx.mp3',
        240000
      );
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
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
        session: roomSession,
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
        session: groupSession,
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
        session: roomSession,
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
        session: groupSession,
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
        session: roomSession,
      });

      await context.sendSticker('1', '1');

      expect(client.pushSticker).toBeCalledWith(session.room.id, '1', '1');
    });

    it('should work with group session', async () => {
      const { context, client, session } = setup({
        session: groupSession,
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
        session: roomSession,
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
        session: groupSession,
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
        session: roomSession,
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
        session: groupSession,
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
        session: roomSession,
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
        session: groupSession,
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

      await context.sendCarouselTemplate(
        'this is a carousel template',
        template
      );

      expect(client.pushCarouselTemplate).toBeCalledWith(
        session.user.id,
        'this is a carousel template',
        template
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
        template
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
        template
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
        type: 'room',
        room: {
          id: 'fakeRoomId',
        },
        user: null,
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
        'fakeUserId'
      );
    });

    it('get user profile in room', async () => {
      const { context, client } = setup({ session: roomSession });

      await context.getUserProfile();

      expect(client.getRoomMemberProfile).toBeCalledWith(
        'fakeRoomId',
        'fakeUserId'
      );
    });

    it('get user profile', async () => {
      const { context, client } = setup({ session: userSession });

      await context.getUserProfile();

      expect(client.getUserProfile).toBeCalledWith('fakeUserId');
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
        'anotherUser'
      );
    });

    it('get member profile in room', async () => {
      const { context, client } = setup({ session: roomSession });

      await context.getMemberProfile('anotherUser');

      expect(client.getRoomMemberProfile).toBeCalledWith(
        'fakeRoomId',
        'anotherUser'
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
        'startToken'
      );
    });

    it('get memeber ids in room', async () => {
      const { context, client } = setup({ session: roomSession });

      await context.getMemberIds('startToken');

      expect(client.getRoomMemberIds).toBeCalledWith(
        'fakeRoomId',
        'startToken'
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

      expect(client.getAllGroupMemberIds).toBeCalledWith('fakeGroupId');
    });

    it('get memeber ids in room', async () => {
      const { context, client } = setup({ session: roomSession });

      await context.getAllMemberIds();

      expect(client.getAllRoomMemberIds).toBeCalledWith('fakeRoomId');
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

      client.getLinkedRichMenu.mockReturnValue(
        Promise.resolve({
          richMenuId: 'richMenuId',
        })
      );

      const result = await context.getLinkedRichMenu();

      expect(client.getLinkedRichMenu).toBeCalledWith(session.user.id);
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

      expect(client.linkRichMenu).toBeCalledWith(session.user.id, 'richMenuId');
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

      expect(client.unlinkRichMenu).toBeCalledWith(session.user.id);
    });

    it('should warn without user', async () => {
      const { context } = setup({ session: {} });

      await context.unlinkRichMenu();

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
