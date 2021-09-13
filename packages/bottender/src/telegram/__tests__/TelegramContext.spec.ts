import warning from 'warning';
import { TelegramClient } from 'messaging-api-telegram';
import { mocked } from 'ts-jest/utils';

import TelegramContext from '../TelegramContext';
import TelegramEvent from '../TelegramEvent';
import { TelegramRawEvent } from '../TelegramTypes';

jest.mock('messaging-api-telegram');
jest.mock('warning');

const defaultRawEvent: TelegramRawEvent = {
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
  rawEvent = defaultRawEvent,
} = {}): {
  context: TelegramContext;
  session: any;
  client: TelegramClient;
} => {
  const client = new TelegramClient({});

  const context = new TelegramContext({
    client,
    event: new TelegramEvent(rawEvent),
    session,
  });

  return {
    context,
    session,
    client,
  };
};

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

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: null });

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
});

describe('#sendAudio', () => {
  it('should call client.sendAudio', async () => {
    const { context, client } = setup();

    await context.sendAudio('xxx.mp3');

    expect(client.sendAudio).toBeCalledWith(427770117, 'xxx.mp3', undefined);
  });
});

describe('#sendDocument', () => {
  it('should call client.sendDocument', async () => {
    const { context, client } = setup();

    await context.sendDocument('xxx.gif');

    expect(client.sendDocument).toBeCalledWith(427770117, 'xxx.gif', undefined);
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
});

describe('#sendVideo', () => {
  it('should call client.sendVideo', async () => {
    const { context, client } = setup();

    await context.sendVideo('xxx.mp4');

    expect(client.sendVideo).toBeCalledWith(427770117, 'xxx.mp4', undefined);
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
});

describe('#sendVoice', () => {
  it('should call client.sendVoice', async () => {
    const { context, client } = setup();

    await context.sendVoice('xxx.ogg');

    expect(client.sendVoice).toBeCalledWith(427770117, 'xxx.ogg', undefined);
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
});

describe('#sendLocation', () => {
  it('#sendLocation to call client.sendLocation', async () => {
    const { context, client } = setup();

    const location = {};

    await context.sendLocation(location);

    expect(client.sendLocation).toBeCalledWith(427770117, location, undefined);
  });
});

describe('#sendVenue', () => {
  it('should call client.sendVenue', async () => {
    const { context, client } = setup();

    const venue = {};

    await context.sendVenue(venue);

    expect(client.sendVenue).toBeCalledWith(427770117, venue, undefined);
  });
});

describe('#sendContact', () => {
  it('should to call client.sendContact', async () => {
    const { context, client } = setup();

    const contact = {};

    await context.sendContact(contact);

    expect(client.sendContact).toBeCalledWith(427770117, contact, undefined);
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
});

describe('#sendChatAction', () => {
  it('should to call client.sendChatAction', async () => {
    const { context, client } = setup();

    await context.sendChatAction('typing');

    expect(client.sendChatAction).toBeCalledWith(427770117, 'typing');
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
});

describe('#sendGame', () => {
  it('should to call client.sendGame', async () => {
    const { context, client } = setup();

    await context.sendGame('Mario Bros.');

    expect(client.sendGame).toBeCalledWith(427770117, 'Mario Bros.', undefined);
  });
});

describe('#setGameScore', () => {
  it('should to call client.setGameScore', async () => {
    const { context, client } = setup();

    await context.setGameScore(427770117, 999);

    expect(client.setGameScore).toBeCalledWith(427770117, 999, undefined);
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
});

describe('#deleteMessage', () => {
  it('should to call client.deleteMessage', async () => {
    const { context, client } = setup();

    await context.deleteMessage(66);

    expect(client.deleteMessage).toBeCalledWith(427770117, 66);
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
});

describe('#stopMessageLiveLocation', () => {
  it('should to call client.stopMessageLiveLocation', async () => {
    const { context, client } = setup();

    await context.stopMessageLiveLocation(313534466);

    expect(client.stopMessageLiveLocation).toBeCalledWith({
      chatId: 427770117,
      messageId: 313534466,
    });
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
});

describe('#unbanChatMember', () => {
  it('should to call client.unbanChatMember', async () => {
    const { context, client } = setup();

    await context.unbanChatMember(313534466);

    expect(client.unbanChatMember).toBeCalledWith(427770117, 313534466);
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
});

describe('#exportChatInviteLink', () => {
  it('should to call client.exportChatInviteLink', async () => {
    const { context, client } = setup();

    await context.exportChatInviteLink();

    expect(client.exportChatInviteLink).toBeCalledWith(427770117);
  });
});

describe('#deleteChatPhoto', () => {
  it('should to call client.deleteChatPhoto', async () => {
    const { context, client } = setup();

    await context.deleteChatPhoto();

    expect(client.deleteChatPhoto).toBeCalledWith(427770117);
  });
});

describe('#setChatTitle', () => {
  it('should to call client.setChatTitle', async () => {
    const { context, client } = setup();

    await context.setChatTitle('New Title');

    expect(client.setChatTitle).toBeCalledWith(427770117, 'New Title');
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
});

describe('#deleteChatStickerSet', () => {
  it('should to call client.deleteChatStickerSet', async () => {
    const { context, client } = setup();

    await context.deleteChatStickerSet();

    expect(client.deleteChatStickerSet).toBeCalledWith(427770117);
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
});

describe('#unpinChatMessage', () => {
  it('should to call client.unpinChatMessage', async () => {
    const { context, client } = setup();

    await context.unpinChatMessage();

    expect(client.unpinChatMessage).toBeCalledWith(427770117);
  });
});

describe('#leaveChat', () => {
  it('should to call client.leaveChat', async () => {
    const { context, client } = setup();

    await context.leaveChat();

    expect(client.leaveChat).toBeCalledWith(427770117);
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

    mocked(client.answerShippingQuery).mockResolvedValue(response);

    const result = await context.answerShippingQuery(true);

    expect(client.answerShippingQuery).toBeCalledWith('123', true, undefined);
    expect(result).toEqual(response);
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

    mocked(client.answerPreCheckoutQuery).mockResolvedValue(response);

    const result = await context.answerPreCheckoutQuery(true);

    expect(client.answerPreCheckoutQuery).toBeCalledWith(
      '123',
      true,
      undefined
    );
    expect(result).toEqual(response);
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

    mocked(client.answerInlineQuery).mockResolvedValue(response);

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

describe('#answerCallbackQuery', () => {
  const callbackQuery = {
    updateId: 869424,
    callbackQuery: {
      id: '705303069014561',
      from: {
        id: 164230,
        isBot: false,
        firstName: 'user_first',
        username: 'username',
        languageCode: 'zh-hans',
      },
      message: {
        messageId: 1474,
        from: {
          id: 902548,
          isBot: true,
          firstName: 'bot_first',
          username: 'botname',
        },
        chat: {
          id: -371089,
          title: 'group name',
          type: 'group',
          allMembersAreAdministrators: true,
        },
        date: 1588145587,
        game: {
          title: 'game title',
          description: 'game description',
          photo: [
            {
              fileId:
                'AgACAgUAAxUAAV6pNvEYJWk8Nn7D-P9i8KxCkeBJAAL5qjEbZ5BIVdV5MmS2G44AAfN1w2p0AAMBAAMCAANtAANXSw',
              fileUniqueId: 'AQAD83XDanQAA1',
              fileSize: 8889,
              width: 320,
              height: 180,
            },
            {
              fileId:
                'AgACAgUAAxUAAV6pNvEYJWk8Nn7D-P9i8KxCkeBJAAL5qjEbZ5BIVdV5MmS2G44AAfN1w2p0AAMBAAMCAAN4AANYSw',
              fileUniqueId: 'AQAD83XDanQAA1',
              fileSize: 20067,
              width: 640,
              height: 360,
            },
          ],
        },
        replyMarkup: {
          inlineKeyboard: [
            [
              {
                text: 'Play gamename',
                callbackGame: {},
              },
            ],
          ],
        },
      },
      chatInstance: '-811839530613755',
      gameShortName: 'gamename',
    },
  };
  it('should to call client.answerCallbackQuery', async () => {
    const { context, client } = setup({ rawEvent: callbackQuery });

    const response = {
      ok: true,
    };

    mocked(client.answerCallbackQuery).mockResolvedValue(response);

    const result = await context.answerCallbackQuery({
      url: 'https://example.com/',
    });

    expect(client.answerCallbackQuery).toBeCalledWith('705303069014561', {
      url: 'https://example.com/',
    });
    expect(result).toEqual(response);
  });

  it('should not call answerCallbackQuery method if event type is not CallbackQuery', async () => {
    const { context, client } = setup();

    await context.answerCallbackQuery({
      url: 'https://example.com/',
    });

    expect(client.answerCallbackQuery).not.toBeCalled();
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

    mocked(client.getUserProfilePhotos).mockResolvedValue(profile);

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

    mocked(client.getChat).mockResolvedValue(chat);

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

    mocked(client.getChatAdministrators).mockResolvedValue(administrators);

    const result = await context.getChatAdministrators();

    expect(client.getChatAdministrators).toBeCalledWith(427770117);
    expect(result).toEqual(administrators);
  });
});

describe('#getChatMembersCount', () => {
  it('should to call client.getChatMembersCount', async () => {
    const { context, client } = setup();

    mocked(client.getChatMembersCount).mockResolvedValue('6');

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

    mocked(client.getChatMember).mockResolvedValue(member);

    const result = await context.getChatMember(313534466);

    expect(client.getChatMember).toBeCalledWith(427770117, 313534466);
    expect(result).toEqual(member);
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
