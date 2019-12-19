jest.mock('delay');
jest.mock('messaging-api-telegram');
jest.mock('warning');

let TelegramClient;
let TelegramContext;
let TelegramEvent;
let sleep;
let warning;

beforeEach(() => {
  /* eslint-disable global-require */
  TelegramClient = require('messaging-api-telegram').TelegramClient;
  TelegramContext = require('../TelegramContext').default;
  TelegramEvent = require('../TelegramEvent').default;
  sleep = require('delay');
  warning = require('warning');
  /* eslint-enable global-require */
});

const _rawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 313534466,
      firstName: 'first',
      lastName: 'last',
      username: 'username',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
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
  const client = TelegramClient.connect();
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

    await context.sendText('hello');

    expect(client.sendMessage).toBeCalledWith(427770117, 'hello', undefined);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendText('hello');

    expect(context._isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendText('hello');

    expect(warning).toBeCalled();
    expect(client.sendMessage).not.toBeCalled();
  });
});

describe('#sendMessage', () => {
  it('should call client.sendMessage', async () => {
    const { context, client } = setup();

    await context.sendMessage('hello');

    expect(client.sendMessage).toBeCalledWith(427770117, 'hello', undefined);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendMessage('hello');

    expect(context.isHandled).toBe(true);
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: null });

    await context.sendMessage('hello');

    expect(client.sendMessage).not.toBeCalled();
  });
});

describe('#sendPhoto', () => {
  it('should call client.sendPhoto', async () => {
    const { context, client } = setup();

    await context.sendPhoto('xxx.png');

    expect(client.sendPhoto).toBeCalledWith(427770117, 'xxx.png', undefined);
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

    expect(client.sendAudio).toBeCalledWith(427770117, 'xxx.mp3', undefined);
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

    expect(client.sendDocument).toBeCalledWith(427770117, 'xxx.gif', undefined);
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
      'CAADAgADQAADyIsGAAE7MpzFPFQX5QI',
      undefined
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

    expect(client.sendVideo).toBeCalledWith(427770117, 'xxx.mp4', undefined);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendVideo('xxx.mp4');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendAnimation', () => {
  it('should call client.sendAnimation', async () => {
    const { context, client } = setup();

    await context.sendAnimation('xxx.mp4');

    expect(client.sendAnimation).toBeCalledWith(
      427770117,
      'xxx.mp4',
      undefined
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendAnimation('xxx.mp4');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendVoice', () => {
  it('should call client.sendVoice', async () => {
    const { context, client } = setup();

    await context.sendVoice('xxx.ogg');

    expect(client.sendVoice).toBeCalledWith(427770117, 'xxx.ogg', undefined);
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

    expect(client.sendVideoNote).toBeCalledWith(
      427770117,
      'xxx.mp4',
      undefined
    );
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

    expect(client.sendMediaGroup).toBeCalledWith(
      427770117,
      [{ type: 'photo', media: 'BQADBAADApYAAgcZZAfj2-xeidueWwI' }],
      undefined
    );
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

    expect(client.sendLocation).toBeCalledWith(427770117, location, undefined);
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

    expect(client.sendVenue).toBeCalledWith(427770117, venue, undefined);
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

    expect(client.sendContact).toBeCalledWith(427770117, contact, undefined);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const contact = {};

    await context.sendContact(contact);

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendPoll', () => {
  it('should to call client.sendPoll', async () => {
    const { context, client } = setup();

    const question = 'question';
    const options = ['a', 'b'];

    await context.sendPoll(question, options);

    expect(client.sendPoll).toBeCalledWith(
      427770117,
      question,
      options,
      undefined
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const question = 'question';
    const options = ['a', 'b'];

    await context.sendPoll(question, options);

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
    providerToken: 'PROVIDER_TOKEN',
    startParameter: 'pay',
    currency: 'USD',
    prices: [
      { label: 'product', amount: 11000 },
      { label: 'tax', amount: 11000 },
    ],
  };
  it('should to call client.sendInvoice', async () => {
    const { context, client } = setup();

    await context.sendInvoice(invoice);

    expect(client.sendInvoice).toBeCalledWith(427770117, invoice, undefined);
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

    expect(client.sendGame).toBeCalledWith(427770117, 'Mario Bros.', undefined);
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

    await context.setGameScore(427770117, 999);

    expect(client.setGameScore).toBeCalledWith(427770117, 999, undefined);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.setGameScore(427770117, 999);

    expect(context.isHandled).toBe(true);
  });
});

describe('#getGameHighScores', () => {
  it('should to call client.getGameHighScores', async () => {
    const { context, client } = setup();

    const response = [
      {
        position: 1,
        user: {
          id: 427770117,
          isBot: false,
          firstName: 'first',
        },
        score: 999,
      },
    ];

    client.getGameHighScores.mockResolvedValue(response);

    const result = await context.getGameHighScores();

    expect(client.getGameHighScores).toBeCalledWith(427770117, undefined);
    expect(result).toEqual(response);
  });
});

describe('#editMessageText', () => {
  it('should to call client.editMessageText', async () => {
    const { context, client } = setup();

    await context.editMessageText(66, 'new text');

    expect(client.editMessageText).toBeCalledWith('new text', {
      chatId: 427770117,
      messageId: 66,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.editMessageText('new text');

    expect(context.isHandled).toBe(true);
  });
});

describe('#editMessageCaption', () => {
  it('should to call client.editMessageCaption', async () => {
    const { context, client } = setup();

    await context.editMessageCaption(66, 'new caption');

    expect(client.editMessageCaption).toBeCalledWith('new caption', {
      chatId: 427770117,
      messageId: 66,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.editMessageCaption('new caption');

    expect(context.isHandled).toBe(true);
  });
});

describe('#editMessageMedia', () => {
  it('should to call client.editMessageMedia', async () => {
    const { context, client } = setup();

    const media = { type: 'photo', media: 'xxx.png' };
    await context.editMessageMedia(66, media);

    expect(client.editMessageMedia).toBeCalledWith(media, {
      chatId: 427770117,
      messageId: 66,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.editMessageMedia(66, { type: 'photo', media: 'xxx.png' });

    expect(context.isHandled).toBe(true);
  });
});

describe('#editMessageReplyMarkup', () => {
  const markup = {
    keyboard: [[{ text: 'new_button_1' }, { text: 'new_button_2' }]],
    resizeKeyboard: true,
    oneTimeKeyboard: true,
  };

  it('should to call client.editMessageReplyMarkup', async () => {
    const { context, client } = setup();

    await context.editMessageReplyMarkup(66, markup);

    expect(client.editMessageReplyMarkup).toBeCalledWith(markup, {
      chatId: 427770117,
      messageId: 66,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.editMessageReplyMarkup(markup);

    expect(context.isHandled).toBe(true);
  });
});

describe('#deleteMessage', () => {
  it('should to call client.deleteMessage', async () => {
    const { context, client } = setup();

    await context.deleteMessage(66);

    expect(client.deleteMessage).toBeCalledWith(427770117, 66);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.deleteMessage(66);

    expect(context.isHandled).toBe(true);
  });
});

describe('#editMessageLiveLocation', () => {
  const location = {
    latitude: 30,
    longitude: 45,
  };

  it('should to call client.editMessageLiveLocation', async () => {
    const { context, client } = setup();

    await context.editMessageLiveLocation(66, location);

    expect(client.editMessageLiveLocation).toBeCalledWith(location, {
      chatId: 427770117,
      messageId: 66,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.editMessageLiveLocation(location);

    expect(context.isHandled).toBe(true);
  });
});

describe('#stopMessageLiveLocation', () => {
  it('should to call client.stopMessageLiveLocation', async () => {
    const { context, client } = setup();

    await context.stopMessageLiveLocation();

    expect(client.stopMessageLiveLocation).toBeCalledWith({
      chatId: 427770117,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.stopMessageLiveLocation();

    expect(context.isHandled).toBe(true);
  });
});

describe('#forwardMessageFrom', () => {
  it('should to call client.forwardMessage', async () => {
    const { context, client } = setup();

    await context.forwardMessageFrom(313534466, 'messageId', {
      disableNotification: true,
    });

    expect(client.forwardMessage).toBeCalledWith(
      427770117,
      313534466,
      'messageId',
      {
        disableNotification: true,
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.forwardMessageFrom(313534466, 'messageId', {
      disableNotification: true,
    });

    expect(context.isHandled).toBe(true);
  });
});

describe('#forwardMessageTo', () => {
  it('should to call client.forwardMessageTo', async () => {
    const { context, client } = setup();

    await context.forwardMessageTo(413534466, 'messageId', {
      disableNotification: true,
    });

    expect(client.forwardMessage).toBeCalledWith(
      413534466,
      427770117,
      'messageId',
      {
        disableNotification: true,
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.forwardMessageTo(413534466, 'messageId', {
      disableNotification: true,
    });

    expect(context.isHandled).toBe(true);
  });
});

describe('#kickChatMember', () => {
  it('should to call client.kickChatMember', async () => {
    const { context, client } = setup();

    await context.kickChatMember(313534466, {
      untilDate: 1502855973,
    });

    expect(client.kickChatMember).toBeCalledWith(427770117, 313534466, {
      untilDate: 1502855973,
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
      canSendMessages: true,
      canAddWebPagePreviews: true,
    });

    expect(client.restrictChatMember).toBeCalledWith(
      427770117,
      313534466,
      {
        canSendMessages: true,
        canAddWebPagePreviews: true,
      },
      undefined
    );
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
      canChangeInfo: true,
      canInviteUsers: true,
      canDeleteMessages: true,
    });

    expect(client.promoteChatMember).toBeCalledWith(427770117, 313534466, {
      canChangeInfo: true,
      canInviteUsers: true,
      canDeleteMessages: true,
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
      disableNotification: true,
    });

    expect(client.pinChatMessage).toBeCalledWith(427770117, 1, {
      disableNotification: true,
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
    updateId: 141921690,
    shippingQuery: {
      id: '123',
      from: {
        id: 427770117,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
      },
      invoicePayload: 'bot payload',
      shippingAddress: {
        countryCode: 'US',
        state: 'New York',
        city: 'New York',
        streetLine1: 'xx',
        streetLine2: 'xx',
        postCode: '10001',
      },
    },
  };

  it('should to call client.answerShippingQuery', async () => {
    const { context, client } = setup({ rawEvent: shippingQuery });

    const response = {
      ok: true,
      result: true,
    };

    client.answerShippingQuery.mockResolvedValue(response);

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
    updateId: 141921690,
    preCheckoutQuery: {
      id: '123',
      from: {
        id: 427770117,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
      },
      currency: 'USD',
      totalAmount: 145,
      invoicePayload: 'bot payload',
    },
  };

  it('should to call client.answerPreCheckoutQuery', async () => {
    const { context, client } = setup({ rawEvent: preCheckoutQuery });

    const response = {
      ok: true,
      result: true,
    };

    client.answerPreCheckoutQuery.mockResolvedValue(response);

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
    updateId: 141921700,
    inlineQuery: {
      id: '1837258670654537434',
      from: {
        id: 427770117,
        isBot: false,
        firstName: 'user_first',
        lastName: 'user_last',
        languageCode: 'en',
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

    client.answerInlineQuery.mockResolvedValue(response);

    const result = await context.answerInlineQuery(
      [
        {
          type: 'photo',
          id: 'UNIQUE_ID',
          photoFileId: 'FILE_ID',
          title: 'PHOTO_TITLE',
        },
        {
          type: 'audio',
          id: 'UNIQUE_ID',
          audioFileId: 'FILE_ID',
          caption: 'AUDIO_TITLE',
        },
      ],
      {
        cacheTime: 1000,
      }
    );

    expect(client.answerInlineQuery).toBeCalledWith(
      '1837258670654537434',
      [
        {
          type: 'photo',
          id: 'UNIQUE_ID',
          photoFileId: 'FILE_ID',
          title: 'PHOTO_TITLE',
        },
        {
          type: 'audio',
          id: 'UNIQUE_ID',
          audioFileId: 'FILE_ID',
          caption: 'AUDIO_TITLE',
        },
      ],
      {
        cacheTime: 1000,
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
          photoFileId: 'FILE_ID',
          title: 'PHOTO_TITLE',
        },
        {
          type: 'audio',
          id: 'UNIQUE_ID',
          audioFileId: 'FILE_ID',
          caption: 'AUDIO_TITLE',
        },
      ],
      {
        cacheTime: 1000,
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
          photoFileId: 'FILE_ID',
          title: 'PHOTO_TITLE',
        },
        {
          type: 'audio',
          id: 'UNIQUE_ID',
          audioFileId: 'FILE_ID',
          caption: 'AUDIO_TITLE',
        },
      ],
      {
        cacheTime: 1000,
      }
    );

    expect(client.answerInlineQuery).not.toBeCalled();
  });
});

describe('#getUserProfilePhotos', () => {
  it('should to call client.getUserProfilePhotos', async () => {
    const { context, client } = setup();

    const profile = {
      totalCount: 3,
      photos: [
        [
          {
            fileId: 'AgADBAADGTo4Gz8cZAeR-ouu4XBx78EeqRkABHahi76pN-aO0UoDA050',
            fileSize: 14650,
            width: 160,
            height: 160,
          },
          {
            fileId: 'AgADBAADGTo4Gz8cZAeR-ouu4XBx78EeqRkABKCfooqTgFUX0EoD5B1C',
            fileSize: 39019,
            width: 320,
            height: 320,
          },
          {
            fileId: 'AgADBAADGTo4Gz8cZAeR-ouu4XBx78EeqRkABPL_pC9K3UpI0koD1B1C',
            fileSize: 132470,
            width: 640,
            height: 640,
          },
        ],
        [
          {
            fileId: 'AgABXQSPEUo4Gz8cZAeR-ouu7XBx93EeqRkABHahi76pN-aO0UoDO203',
            fileSize: 14220,
            width: 160,
            height: 160,
          },
          {
            fileId: 'AgADBAADGTo4Gz8cZAeR-ouu4XBx78EeqRkABKCfooqTgFUX0EoDAT90',
            fileSize: 35122,
            width: 320,
            height: 320,
          },
          {
            fileId: 'UtAqweADGTo4Gz8cZAeR-ouu4XBx78EeqRkABPL_pM4A1UpI0koD65K2',
            fileSize: 106356,
            width: 640,
            height: 640,
          },
        ],
      ],
    };

    client.getUserProfilePhotos.mockResolvedValue(profile);

    const result = await context.getUserProfilePhotos({ limit: 2 });

    expect(client.getUserProfilePhotos).toBeCalledWith(313534466, { limit: 2 });
    expect(result).toEqual(profile);
  });
});

describe('#getChat', () => {
  it('should to call client.getChat', async () => {
    const { context, client } = setup();

    const chat = {
      id: 313534466,
      firstName: 'first',
      lastName: 'last',
      username: 'username',
      type: 'private',
    };

    client.getChat.mockResolvedValue(chat);

    const result = await context.getChat();

    expect(client.getChat).toBeCalledWith(427770117);
    expect(result).toEqual(chat);
  });
});

describe('#getChatAdministrators', () => {
  it('should to call client.getChatAdministrators', async () => {
    const { context, client } = setup();

    const administrators = [
      {
        user: {
          id: 313534466,
          firstName: 'first',
          lastName: 'last',
          username: 'username',
          languangeCode: 'zh-TW',
        },
        status: 'creator',
      },
    ];

    client.getChatAdministrators.mockResolvedValue(administrators);

    const result = await context.getChatAdministrators();

    expect(client.getChatAdministrators).toBeCalledWith(427770117);
    expect(result).toEqual(administrators);
  });
});

describe('#getChatMembersCount', () => {
  it('should to call client.getChatMembersCount', async () => {
    const { context, client } = setup();

    client.getChatMembersCount.mockResolvedValue('6');

    const result = await context.getChatMembersCount();

    expect(client.getChatMembersCount).toBeCalledWith(427770117);
    expect(result).toEqual('6');
  });
});

describe('#getChatMember', () => {
  it('should to call client.getChatMember', async () => {
    const { context, client } = setup();

    const member = {
      user: {
        id: 313534466,
        firstName: 'first',
        lastName: 'last',
        username: 'username',
        languangeCode: 'zh-TW',
      },
      status: 'creator',
    };

    client.getChatMember.mockResolvedValue(member);

    const result = await context.getChatMember(313534466);

    expect(client.getChatMember).toBeCalledWith(427770117, 313534466);
    expect(result).toEqual(member);
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
        updateId: 241921684,
        message: {
          messageId: 334,
          from: {
            id: 227770118,
            isBot: false,
            firstName: 'Chen-Tsu',
            lastName: 'Lin',
            languageCode: 'zh-TW',
          },
          chat: {
            id: -325456176,
            title: 'Bottender',
            type: 'group',
            allMembersAreAdministrators: true,
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
        updateId: 131921685,
        callbackQuery: {
          id: '1737258669604245426',
          from: {
            id: 327770118,
            isBot: false,
            firstName: 'Chen-Tsu',
            lastName: 'Lin',
            languageCode: 'zh-TW',
          },
          message: {
            messageId: 235,
            from: {
              id: 213534466,
              isBot: true,
              firstName: 'already_taken',
              username: 'alreadytaken1_bot',
            },
            chat: {
              id: -325456176,
              title: 'Bottender',
              type: 'group',
              allMembersAreAdministrators: true,
            },
            date: 1415736471,
            text: 'Hello World',
          },
          chatInstance: '-582211693826679000',
          data: '123',
        },
      },
    });

    await context.sendText('hello');

    expect(client.sendMessage).toBeCalledWith(-325456176, 'hello', undefined);
  });
});
