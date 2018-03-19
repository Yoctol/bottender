jest.mock('delay');
jest.mock('messaging-api-telegram');
jest.mock('warning');

let TelegramContext;
let TelegramEvent;
let sleep;
let warning;

beforeEach(() => {
  /* eslint-disable global-require */
  TelegramContext = require('../TelegramContext').default;
  TelegramEvent = require('../TelegramEvent').default;
  sleep = require('delay');
  warning = require('warning');
  /* eslint-enable global-require */
});

const createMockTelegramClient = () => ({
  sendMessage: jest.fn(),
  sendPhoto: jest.fn(),
  sendAudio: jest.fn(),
  sendDocument: jest.fn(),
  sendSticker: jest.fn(),
  sendVideo: jest.fn(),
  sendVoice: jest.fn(),
  sendVideoNote: jest.fn(),
  sendMediaGroup: jest.fn(),
  sendLocation: jest.fn(),
  sendVenue: jest.fn(),
  sendContact: jest.fn(),
  sendChatAction: jest.fn(),
  sendInvoice: jest.fn(),
  sendGame: jest.fn(),
  setGameScore: jest.fn(),
  getGameHighScores: jest.fn(),
  kickChatMember: jest.fn(),
  unbanChatMember: jest.fn(),
  restrictChatMember: jest.fn(),
  promoteChatMember: jest.fn(),
  exportChatInviteLink: jest.fn(),
  setChatPhoto: jest.fn(),
  deleteChatPhoto: jest.fn(),
  setChatTitle: jest.fn(),
  setChatDescription: jest.fn(),
  setChatStickerSet: jest.fn(),
  deleteChatStickerSet: jest.fn(),
  pinChatMessage: jest.fn(),
  unpinChatMessage: jest.fn(),
  leaveChat: jest.fn(),
  answerShippingQuery: jest.fn(),
  answerPreCheckoutQuery: jest.fn(),
  answerInlineQuery: jest.fn(),
});

const _rawEvent = {
  message: {
    message_id: 666,
    from: {
      id: 313534466,
      first_name: 'first',
      last_name: 'last',
      username: 'username',
      language_code: 'en',
    },
    chat: {
      id: 427770117,
      first_name: 'first',
      last_name: 'last',
      type: 'private',
    },
    date: 1499402829,
    text: 'text',
  },
};

const setup = ({
  session = { user: { id: 313534466 } },
  rawEvent = _rawEvent,
} = {}) => {
  const client = createMockTelegramClient();
  const args = {
    client,
    event: new TelegramEvent(rawEvent),
    session,
  };
  const context = new TelegramContext(args);
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

it('#platform to be `telegram`', () => {
  const { context } = setup();
  expect(context.platform).toBe('telegram');
});

it('get #session works', () => {
  const { context, session } = setup();
  expect(context.session).toBe(session);
});

it('get #event works', () => {
  const { context } = setup();
  expect(context.event).toBeInstanceOf(TelegramEvent);
});

it('get #client works', () => {
  const { context, client } = setup();
  expect(context.client).toBe(client);
});

describe('#sendText', () => {
  it('should call client.sendMessage', async () => {
    const { context, client } = setup();

    await context.sendText('xxx.com');

    expect(client.sendMessage).toBeCalledWith(427770117, 'xxx.com', undefined);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendText('xxx.com');

    expect(context._isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendText('xxx.com');

    expect(warning).toBeCalled();
    expect(client.sendMessage).not.toBeCalled();
  });
});

describe('#sendMessage', () => {
  it('should call client.sendMessage', async () => {
    const { context, client } = setup();

    await context.sendMessage('xxx.com');

    expect(client.sendMessage).toBeCalledWith(427770117, 'xxx.com');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendMessage('xxx.com');

    expect(context.isHandled).toBe(true);
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: null });

    await context.sendMessage('xxx.com');

    expect(client.sendMessage).not.toBeCalled();
  });
});

describe('#sendPhoto', () => {
  it('should call client.sendPhoto', async () => {
    const { context, client } = setup();

    await context.sendPhoto('xxx.png');

    expect(client.sendPhoto).toBeCalledWith(427770117, 'xxx.png');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendPhoto('xxx.png');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendAudio', () => {
  it('should call client.sendAudio', async () => {
    const { context, client } = setup();

    await context.sendAudio('xxx.mp3');

    expect(client.sendAudio).toBeCalledWith(427770117, 'xxx.mp3');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendAudio('xxx.mp3');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendDocument', () => {
  it('should call client.sendDocument', async () => {
    const { context, client } = setup();

    await context.sendDocument('xxx.gif');

    expect(client.sendDocument).toBeCalledWith(427770117, 'xxx.gif');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendDocument('xxx.gif');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendSticker', () => {
  it('should call client.sendSticker', async () => {
    const { context, client } = setup();

    await context.sendSticker('CAADAgADQAADyIsGAAE7MpzFPFQX5QI');

    expect(client.sendSticker).toBeCalledWith(
      427770117,
      'CAADAgADQAADyIsGAAE7MpzFPFQX5QI'
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendSticker('CAADAgADQAADyIsGAAE7MpzFPFQX5QI');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendVideo', () => {
  it('should call client.sendVideo', async () => {
    const { context, client } = setup();

    await context.sendVideo('xxx.mp4');

    expect(client.sendVideo).toBeCalledWith(427770117, 'xxx.mp4');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendVideo('xxx.mp4');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendVoice', () => {
  it('should call client.sendVoice', async () => {
    const { context, client } = setup();

    await context.sendVoice('xxx.ogg');

    expect(client.sendVoice).toBeCalledWith(427770117, 'xxx.ogg');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendVoice('xxx.ogg');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendVideoNote', () => {
  it('should call client.sendVideoNote', async () => {
    const { context, client } = setup();

    await context.sendVideoNote('xxx.mp4');

    expect(client.sendVideoNote).toBeCalledWith(427770117, 'xxx.mp4');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendVideoNote('xxx.mp4');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendMediaGroup', () => {
  it('should call client.sendMediaGroup', async () => {
    const { context, client } = setup();

    await context.sendMediaGroup([
      { type: 'photo', media: 'BQADBAADApYAAgcZZAfj2-xeidueWwI' },
    ]);

    expect(client.sendMediaGroup).toBeCalledWith(427770117, [
      { type: 'photo', media: 'BQADBAADApYAAgcZZAfj2-xeidueWwI' },
    ]);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendMediaGroup([
      { type: 'photo', media: 'BQADBAADApYAAgcZZAfj2-xeidueWwI' },
    ]);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendLocation', () => {
  it('#sendLocation to call client.sendLocation', async () => {
    const { context, client } = setup();

    const location = {};

    await context.sendLocation(location);

    expect(client.sendLocation).toBeCalledWith(427770117, location);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const location = {};

    await context.sendLocation(location);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendVenue', () => {
  it('should call client.sendVenue', async () => {
    const { context, client } = setup();

    const venue = {};

    await context.sendVenue(venue);

    expect(client.sendVenue).toBeCalledWith(427770117, venue);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const venue = {};

    await context.sendVenue(venue);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendContact', () => {
  it('should to call client.sendContact', async () => {
    const { context, client } = setup();

    const contact = {};

    await context.sendContact(contact);

    expect(client.sendContact).toBeCalledWith(427770117, contact);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const contact = {};

    await context.sendContact(contact);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendChatAction', () => {
  it('should to call client.sendChatAction', async () => {
    const { context, client } = setup();

    await context.sendChatAction('typing');

    expect(client.sendChatAction).toBeCalledWith(427770117, 'typing');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendChatAction('typing');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendInvoice', () => {
  const invoice = {
    title: 'product name',
    description: 'product description',
    payload: 'bot-defined invoice payload',
    provider_token: 'PROVIDER_TOKEN',
    start_parameter: 'pay',
    currency: 'USD',
    prices: [
      { label: 'product', amount: 11000 },
      { label: 'tax', amount: 11000 },
    ],
  };
  it('should to call client.sendInvoice', async () => {
    const { context, client } = setup();

    await context.sendInvoice(invoice);

    expect(client.sendInvoice).toBeCalledWith(427770117, invoice);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendInvoice(invoice);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendGame', () => {
  it('should to call client.sendGame', async () => {
    const { context, client } = setup();

    await context.sendGame('Mario Bros.');

    expect(client.sendGame).toBeCalledWith(427770117, 'Mario Bros.');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendGame('Mario Bros.');

    expect(context.isHandled).toBe(true);
  });
});

describe('#setGameScore', () => {
  it('should to call client.setGameScore', async () => {
    const { context, client } = setup();

    await context.setGameScore(999);

    expect(client.setGameScore).toBeCalledWith(427770117, 999);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.setGameScore(999);

    expect(context.isHandled).toBe(true);
  });
});

describe('#getGameHighScores', () => {
  it('should to call client.getGameHighScores', async () => {
    const { context, client } = setup();

    const response = {
      ok: true,
      result: [
        {
          position: 1,
          user: {
            id: 427770117,
            is_bot: false,
            first_name: 'first',
          },
          score: 999,
        },
      ],
    };

    client.getGameHighScores.mockReturnValue(Promise.resolve(response));

    const result = await context.getGameHighScores();

    expect(client.getGameHighScores).toBeCalledWith(427770117);
    expect(result).toEqual(response);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.getGameHighScores();

    expect(context.isHandled).toBe(true);
  });
});

describe('#kickChatMember', () => {
  it('should to call client.kickChatMember', async () => {
    const { context, client } = setup();

    await context.kickChatMember(313534466, {
      until_date: 1502855973,
    });

    expect(client.kickChatMember).toBeCalledWith(427770117, 313534466, {
      until_date: 1502855973,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.kickChatMember(313534466);

    expect(context.isHandled).toBe(true);
  });
});

describe('#unbanChatMember', () => {
  it('should to call client.unbanChatMember', async () => {
    const { context, client } = setup();

    await context.unbanChatMember(313534466);

    expect(client.unbanChatMember).toBeCalledWith(427770117, 313534466);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.unbanChatMember(313534466);

    expect(context.isHandled).toBe(true);
  });
});

describe('#restrictChatMember', () => {
  it('should to call client.restrictChatMember', async () => {
    const { context, client } = setup();

    await context.restrictChatMember(313534466, {
      can_send_messages: true,
      can_add_web_page_previews: true,
    });

    expect(client.restrictChatMember).toBeCalledWith(427770117, 313534466, {
      can_send_messages: true,
      can_add_web_page_previews: true,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.restrictChatMember(313534466);

    expect(context.isHandled).toBe(true);
  });
});

describe('#promoteChatMember', () => {
  it('should to call client.promoteChatMember', async () => {
    const { context, client } = setup();

    await context.promoteChatMember(313534466, {
      can_change_info: true,
      can_invite_users: true,
      can_delete_messages: true,
    });

    expect(client.promoteChatMember).toBeCalledWith(427770117, 313534466, {
      can_change_info: true,
      can_invite_users: true,
      can_delete_messages: true,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.promoteChatMember(313534466);

    expect(context.isHandled).toBe(true);
  });
});

describe('#exportChatInviteLink', () => {
  it('should to call client.exportChatInviteLink', async () => {
    const { context, client } = setup();

    await context.exportChatInviteLink();

    expect(client.exportChatInviteLink).toBeCalledWith(427770117);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.exportChatInviteLink();

    expect(context.isHandled).toBe(true);
  });
});

describe('#setChatPhoto', () => {
  it('should to call client.setChatPhoto', async () => {
    const { context, client } = setup();

    await context.setChatPhoto('https://example.com/image.png');

    expect(client.setChatPhoto).toBeCalledWith(
      427770117,
      'https://example.com/image.png'
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.setChatPhoto('https://example.com/image.png');

    expect(context.isHandled).toBe(true);
  });
});

describe('#deleteChatPhoto', () => {
  it('should to call client.deleteChatPhoto', async () => {
    const { context, client } = setup();

    await context.deleteChatPhoto();

    expect(client.deleteChatPhoto).toBeCalledWith(427770117);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.deleteChatPhoto();

    expect(context.isHandled).toBe(true);
  });
});

describe('#setChatTitle', () => {
  it('should to call client.setChatTitle', async () => {
    const { context, client } = setup();

    await context.setChatTitle('New Title');

    expect(client.setChatTitle).toBeCalledWith(427770117, 'New Title');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.setChatTitle('New Title');

    expect(context.isHandled).toBe(true);
  });
});

describe('#setChatDescription', () => {
  it('should to call client.setChatDescription', async () => {
    const { context, client } = setup();

    await context.setChatDescription('New Description');

    expect(client.setChatDescription).toBeCalledWith(
      427770117,
      'New Description'
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.setChatDescription('New Description');

    expect(context.isHandled).toBe(true);
  });
});

describe('#setChatStickerSet', () => {
  it('should to call client.setChatStickerSet', async () => {
    const { context, client } = setup();

    await context.setChatStickerSet('Sticker Set Name');

    expect(client.setChatStickerSet).toBeCalledWith(
      427770117,
      'Sticker Set Name'
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.setChatStickerSet('Sticker Set Name');

    expect(context.isHandled).toBe(true);
  });
});

describe('#deleteChatStickerSet', () => {
  it('should to call client.deleteChatStickerSet', async () => {
    const { context, client } = setup();

    await context.deleteChatStickerSet();

    expect(client.deleteChatStickerSet).toBeCalledWith(427770117);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.deleteChatStickerSet();

    expect(context.isHandled).toBe(true);
  });
});

describe('#pinChatMessage', () => {
  it('should to call client.pinChatMessage', async () => {
    const { context, client } = setup();

    await context.pinChatMessage(1, {
      disable_notification: true,
    });

    expect(client.pinChatMessage).toBeCalledWith(427770117, 1, {
      disable_notification: true,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.pinChatMessage(1);

    expect(context.isHandled).toBe(true);
  });
});

describe('#unpinChatMessage', () => {
  it('should to call client.unpinChatMessage', async () => {
    const { context, client } = setup();

    await context.unpinChatMessage();

    expect(client.unpinChatMessage).toBeCalledWith(427770117);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.unpinChatMessage();

    expect(context.isHandled).toBe(true);
  });
});

describe('#leaveChat', () => {
  it('should to call client.leaveChat', async () => {
    const { context, client } = setup();

    await context.leaveChat();

    expect(client.leaveChat).toBeCalledWith(427770117);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.leaveChat();

    expect(context.isHandled).toBe(true);
  });
});

describe('#answerShippingQuery', () => {
  const shippingQuery = {
    update_id: 141921690,
    shipping_query: {
      id: '123',
      from: {
        id: 427770117,
        first_name: 'user_first',
        last_name: 'user_last',
        language_code: 'en',
      },
      invoice_payload: 'bot payload',
      shipping_address: {
        country_code: 'US',
        state: 'New York',
        city: 'New York',
        street_line1: 'xx',
        street_line2: 'xx',
        post_code: '10001',
      },
    },
  };

  it('should to call client.answerShippingQuery', async () => {
    const { context, client } = setup({ rawEvent: shippingQuery });

    const response = {
      ok: true,
      result: true,
    };

    client.answerShippingQuery.mockReturnValue(Promise.resolve(response));

    const result = await context.answerShippingQuery(true);

    expect(client.answerShippingQuery).toBeCalledWith('123', true, undefined);
    expect(result).toEqual(response);
  });

  it('should mark context as handled', async () => {
    const { context } = setup({ rawEvent: shippingQuery });

    await context.answerShippingQuery(true);

    expect(context.isHandled).toBe(true);
  });

  it('should not call answerShippingQuery method if event type is not ShippingQuery', async () => {
    const { context, client } = setup();

    await context.answerShippingQuery(true);

    expect(client.answerShippingQuery).not.toBeCalled();
  });
});

describe('#answerPreCheckoutQuery', () => {
  const preCheckoutQuery = {
    update_id: 141921690,
    pre_checkout_query: {
      id: '123',
      from: {
        id: 427770117,
        first_name: 'user_first',
        last_name: 'user_last',
        language_code: 'en',
      },
      currency: 'USD',
      total_amount: 145,
      invoice_payload: 'bot payload',
    },
  };

  it('should to call client.answerPreCheckoutQuery', async () => {
    const { context, client } = setup({ rawEvent: preCheckoutQuery });

    const response = {
      ok: true,
      result: true,
    };

    client.answerPreCheckoutQuery.mockReturnValue(Promise.resolve(response));

    const result = await context.answerPreCheckoutQuery(true);

    expect(client.answerPreCheckoutQuery).toBeCalledWith(
      '123',
      true,
      undefined
    );
    expect(result).toEqual(response);
  });

  it('should mark context as handled', async () => {
    const { context } = setup({ rawEvent: preCheckoutQuery });

    await context.answerPreCheckoutQuery(true);

    expect(context.isHandled).toBe(true);
  });

  it('should not call answerPreCheckoutQuery method if event type is not PreCheckoutQuery', async () => {
    const { context, client } = setup();

    await context.answerPreCheckoutQuery(true);

    expect(client.answerPreCheckoutQuery).not.toBeCalled();
  });
});

describe('#answerInlineQuery', () => {
  const inlineQuery = {
    update_id: 141921700,
    inline_query: {
      id: '1837258670654537434',
      from: {
        id: 427770117,
        is_bot: false,
        first_name: 'user_first',
        last_name: 'user_last',
        language_code: 'en',
      },
      query: '123',
      offset: '',
    },
  };

  it('should to call client.answerInlineQuery', async () => {
    const { context, client } = setup({ rawEvent: inlineQuery });

    const response = {
      ok: true,
    };

    client.answerInlineQuery.mockReturnValue(Promise.resolve(response));

    const result = await context.answerInlineQuery(
      [
        {
          type: 'photo',
          id: 'UNIQUE_ID',
          photo_file_id: 'FILE_ID',
          title: 'PHOTO_TITLE',
        },
        {
          type: 'audio',
          id: 'UNIQUE_ID',
          audio_file_id: 'FILE_ID',
          caption: 'AUDIO_TITLE',
        },
      ],
      {
        cache_time: 1000,
      }
    );

    expect(client.answerInlineQuery).toBeCalledWith(
      '1837258670654537434',
      [
        {
          type: 'photo',
          id: 'UNIQUE_ID',
          photo_file_id: 'FILE_ID',
          title: 'PHOTO_TITLE',
        },
        {
          type: 'audio',
          id: 'UNIQUE_ID',
          audio_file_id: 'FILE_ID',
          caption: 'AUDIO_TITLE',
        },
      ],
      {
        cache_time: 1000,
      }
    );
    expect(result).toEqual(response);
  });

  it('should mark context as handled', async () => {
    const { context } = setup({ rawEvent: inlineQuery });

    await context.answerInlineQuery(
      [
        {
          type: 'photo',
          id: 'UNIQUE_ID',
          photo_file_id: 'FILE_ID',
          title: 'PHOTO_TITLE',
        },
        {
          type: 'audio',
          id: 'UNIQUE_ID',
          audio_file_id: 'FILE_ID',
          caption: 'AUDIO_TITLE',
        },
      ],
      {
        cache_time: 1000,
      }
    );

    expect(context.isHandled).toBe(true);
  });

  it('should not call answerInlineQuery method if event type is not InlineQuery', async () => {
    const { context, client } = setup();

    await context.answerInlineQuery(
      [
        {
          type: 'photo',
          id: 'UNIQUE_ID',
          photo_file_id: 'FILE_ID',
          title: 'PHOTO_TITLE',
        },
        {
          type: 'audio',
          id: 'UNIQUE_ID',
          audio_file_id: 'FILE_ID',
          caption: 'AUDIO_TITLE',
        },
      ],
      {
        cache_time: 1000,
      }
    );

    expect(client.answerInlineQuery).not.toBeCalled();
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

describe('group chat', () => {
  it('should call method with chat id when receiving message', async () => {
    const { context, client } = setup({
      rawEvent: {
        update_id: 241921684,
        message: {
          message_id: 334,
          from: {
            id: 227770118,
            is_bot: false,
            first_name: 'Chen-Tsu',
            last_name: 'Lin',
            language_code: 'zh-TW',
          },
          chat: {
            id: -325456176,
            title: 'Bottender',
            type: 'group',
            all_members_are_administrators: true,
          },
          date: 1415736470,
          text: 'hi',
        },
      },
    });

    await context.sendText('hello');

    expect(client.sendMessage).toBeCalledWith(-325456176, 'hello', undefined);
  });

  it('should call method with chat id when receiving callback query', async () => {
    const { context, client } = setup({
      rawEvent: {
        update_id: 131921685,
        callback_query: {
          id: '1737258669604245426',
          from: {
            id: 327770118,
            is_bot: false,
            first_name: 'Chen-Tsu',
            last_name: 'Lin',
            language_code: 'zh-TW',
          },
          message: {
            message_id: 235,
            from: {
              id: 213534466,
              is_bot: true,
              first_name: 'already_taken',
              username: 'alreadytaken1_bot',
            },
            chat: {
              id: -325456176,
              title: 'Bottender',
              type: 'group',
              all_members_are_administrators: true,
            },
            date: 1415736471,
            text: 'Hello World',
          },
          chat_instance: '-582211693826679000',
          data: '123',
        },
      },
    });

    await context.sendText('hello');

    expect(client.sendMessage).toBeCalledWith(-325456176, 'hello', undefined);
  });
});
