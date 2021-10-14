import MockDate from 'mockdate';

import TelegramEvent from '../TelegramEvent';
import { TelegramRawEvent } from '../TelegramTypes';

const textMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
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

const stickerMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    sticker: {
      fileId: '123',
      width: 50,
      height: 50,
    },
  },
};

const videoMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 313534466,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    video: {
      fileId: '321',
      width: 100,
      height: 100,
      duration: 199,
    },
  },
};

const voiceMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    voice: {
      fileId: '543',
      duration: 299,
    },
  },
};

const videoNoteMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    videoNote: {
      fileId: '654',
      length: 100,
      duration: 399,
    },
  },
};

const contactMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    contact: {
      phoneNumber: '123456789',
      firstName: 'first',
    },
  },
};

const photoMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    photo: [
      {
        fileId: '112',
        width: 100,
        height: 100,
      },
      {
        fileId: '116',
        width: 50,
        height: 50,
      },
    ],
  },
};

const audioMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    audio: {
      fileId: '321',
      duration: 100,
      title: 'audioooooooo',
    },
  },
};

const locationMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    location: {
      longitude: '111.111',
      latitude: '99.99',
    },
  },
};

const venueMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    venue: {
      location: {
        longitude: '111.111',
        latitude: '99.99',
      },
      title: 'title',
      address: 'addressssss',
    },
  },
};

const documentMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    document: {
      fileId: '234',
      fileName: 'file',
    },
  },
};

const gameMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    game: {
      title: 'gammmmmmmme',
      description: 'Description of the game',
      photo: [
        {
          fileId: '112',
          width: 100,
          height: 100,
        },
        {
          fileId: '116',
          width: 50,
          height: 50,
        },
      ],
    },
  },
};

const groupMessage: TelegramRawEvent = {
  updateId: 141921689,
  message: {
    messageId: 238,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    chat: {
      id: -225456171,
      title: 'Bottender',
      type: 'group',
      allMembersAreAdministrators: true,
    },
    date: 1515758146,
    text: 'hi',
  },
};

const editedMessage: TelegramRawEvent = {
  updateId: 141921687,
  editedMessage: {
    messageId: 229,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    date: 1515736358,
    editDate: 1515758017,
    text: 'hiiiii',
  },
};

const groupEditedMessage: TelegramRawEvent = {
  updateId: 141921688,
  editedMessage: {
    messageId: 234,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    chat: {
      id: -225456171,
      title: 'Bottender',
      type: 'group',
      allMembersAreAdministrators: true,
    },
    date: 1515736470,
    editDate: 1515758048,
    text: 'hiiiii',
  },
};

const channelPost: TelegramRawEvent = {
  updateId: 141921710,
  channelPost: {
    messageId: 2,
    chat: {
      id: -1001305240521,
      title: 'channel_12345',
      type: 'channel',
    },
    date: 1515760382,
    text: 'post~~~',
  },
};

const editedChannelPost: TelegramRawEvent = {
  updateId: 141921711,
  editedChannelPost: {
    messageId: 2,
    chat: {
      id: -1001305240521,
      title: 'channel_12345',
      type: 'channel',
    },
    date: 1515760382,
    editDate: 1515760478,
    text: 'post~~~edited',
  },
};

const inlineQuery: TelegramRawEvent = {
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

const chosenInlineResult: TelegramRawEvent = {
  updateId: 141921701,
  chosenInlineResult: {
    resultId: '2837258670654537434',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    inlineMessageId: '1837258670654537434',
    query: '123',
  },
};

const callbackQuery: TelegramRawEvent = {
  updateId: 141921690,
  callbackQuery: {
    id: '123',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    message: {
      messageId: 666,
      from: {
        id: 313534466,
        isBot: true,
        firstName: 'bot_first',
        username: 'bot_name',
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
    chatInstance: '-1828607021492040088',
    data: 'data',
  },
};

const groupCallbackQuery: TelegramRawEvent = {
  updateId: 141921690,
  callbackQuery: {
    id: '1837258667245133763',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    message: {
      messageId: 237,
      from: {
        id: 313534466,
        isBot: true,
        firstName: 'bot_first',
        username: 'bot_name',
      },
      chat: {
        id: -225456171,
        title: 'Bottender',
        type: 'group',
        allMembersAreAdministrators: true,
      },
      date: 1515736481,
      text: 'Hello World',
    },
    chatInstance: '-582211693826679000',
    data: '123',
  },
};

const shippingQuery: TelegramRawEvent = {
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

const preCheckoutQuery: TelegramRawEvent = {
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

const poll: TelegramRawEvent = {
  updateId: 141921690,
  poll: {
    id: '123',
    question: 'What is it?',
    options: [
      { text: 'A', voterCount: 0 },
      { text: 'B', voterCount: 0 },
    ],
    isClosed: false,
  },
};

const replyToTextMessage: TelegramRawEvent = {
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    text: 'replyText',
    replyToMessage: {
      messageId: 777,
      from: {
        id: 427770117,
        isBot: false,
        firstName: 'first',
        lastName: 'last',
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
  },
};

it('#rawEvent', () => {
  expect(new TelegramEvent(textMessage).rawEvent).toEqual(textMessage);
  expect(new TelegramEvent(editedMessage).rawEvent).toEqual(editedMessage);
  expect(new TelegramEvent(channelPost).rawEvent).toEqual(channelPost);
  expect(new TelegramEvent(editedChannelPost).rawEvent).toEqual(
    editedChannelPost
  );
  expect(new TelegramEvent(inlineQuery).rawEvent).toEqual(inlineQuery);
  expect(new TelegramEvent(chosenInlineResult).rawEvent).toEqual(
    chosenInlineResult
  );
  expect(new TelegramEvent(callbackQuery).rawEvent).toEqual(callbackQuery);
  expect(new TelegramEvent(shippingQuery).rawEvent).toEqual(shippingQuery);
  expect(new TelegramEvent(preCheckoutQuery).rawEvent).toEqual(
    preCheckoutQuery
  );
  expect(new TelegramEvent(poll).rawEvent).toEqual(poll);
  expect(new TelegramEvent(replyToTextMessage).rawEvent).toEqual(
    replyToTextMessage
  );
});

it('#timestamp', () => {
  MockDate.set('2020-07-14'); // 15946848000
  expect(new TelegramEvent(textMessage).timestamp).toEqual(1499402829000);
  expect(new TelegramEvent(groupMessage).timestamp).toEqual(1515758146000);
  expect(new TelegramEvent(editedMessage).timestamp).toEqual(1594684800000);
  expect(new TelegramEvent(channelPost).timestamp).toEqual(1594684800000);
  expect(new TelegramEvent(editedChannelPost).timestamp).toEqual(1594684800000);
  expect(new TelegramEvent(inlineQuery).timestamp).toEqual(1594684800000);
  expect(new TelegramEvent(chosenInlineResult).timestamp).toEqual(
    1594684800000
  );
  expect(new TelegramEvent(callbackQuery).timestamp).toEqual(1594684800000);
  expect(new TelegramEvent(shippingQuery).timestamp).toEqual(1594684800000);
  expect(new TelegramEvent(preCheckoutQuery).timestamp).toEqual(1594684800000);
  expect(new TelegramEvent(poll).timestamp).toEqual(1594684800000);
  expect(new TelegramEvent(replyToTextMessage).timestamp).toEqual(
    1499402829000
  );
  MockDate.reset();
});

it('#isMessage', () => {
  expect(new TelegramEvent(textMessage).isMessage).toEqual(true);
  expect(new TelegramEvent(groupMessage).isMessage).toEqual(true);
  expect(new TelegramEvent(editedMessage).isMessage).toEqual(false);
  expect(new TelegramEvent(channelPost).isMessage).toEqual(false);
  expect(new TelegramEvent(editedChannelPost).isMessage).toEqual(false);
  expect(new TelegramEvent(inlineQuery).isMessage).toEqual(false);
  expect(new TelegramEvent(chosenInlineResult).isMessage).toEqual(false);
  expect(new TelegramEvent(callbackQuery).isMessage).toEqual(false);
  expect(new TelegramEvent(shippingQuery).isMessage).toEqual(false);
  expect(new TelegramEvent(preCheckoutQuery).isMessage).toEqual(false);
  expect(new TelegramEvent(poll).isMessage).toEqual(false);
  expect(new TelegramEvent(replyToTextMessage).isMessage).toEqual(true);
});

it('#message', () => {
  expect(new TelegramEvent(textMessage).message).toEqual({
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
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
  });
  expect(new TelegramEvent(groupMessage).message).toEqual({
    messageId: 238,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    chat: {
      id: -225456171,
      title: 'Bottender',
      type: 'group',
      allMembersAreAdministrators: true,
    },
    date: 1515758146,
    text: 'hi',
  });
  expect(new TelegramEvent(editedMessage).message).toBeUndefined();
  expect(new TelegramEvent(channelPost).message).toBeUndefined();
  expect(new TelegramEvent(editedChannelPost).message).toBeUndefined();
  expect(new TelegramEvent(inlineQuery).message).toBeUndefined();
  expect(new TelegramEvent(chosenInlineResult).message).toBeUndefined();
  expect(new TelegramEvent(callbackQuery).message).toBeUndefined();
  expect(new TelegramEvent(shippingQuery).message).toBeUndefined();
  expect(new TelegramEvent(preCheckoutQuery).message).toBeUndefined();
  expect(new TelegramEvent(poll).message).toBeUndefined();
  expect(new TelegramEvent(replyToTextMessage).message).toEqual({
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    text: 'replyText',
    replyToMessage: {
      messageId: 777,
      from: {
        id: 427770117,
        isBot: false,
        firstName: 'first',
        lastName: 'last',
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
  });
});

it('#isText', () => {
  expect(new TelegramEvent(callbackQuery).isText).toEqual(false);
  expect(new TelegramEvent(textMessage).isText).toEqual(true);
  expect(new TelegramEvent(stickerMessage).isText).toEqual(false);
  expect(new TelegramEvent(replyToTextMessage).isText).toEqual(true);
});

it('#text', () => {
  expect(new TelegramEvent(callbackQuery).text).toBeUndefined();
  expect(new TelegramEvent(textMessage).text).toEqual('text');
  expect(new TelegramEvent(stickerMessage).text).toBeUndefined();
  expect(new TelegramEvent(replyToTextMessage).text).toEqual('replyText');
});

it('#isReplyToMessage', () => {
  expect(new TelegramEvent(textMessage).isReplyToMessage).toEqual(false);
  expect(new TelegramEvent(groupMessage).isReplyToMessage).toEqual(false);
  expect(new TelegramEvent(editedMessage).isReplyToMessage).toEqual(false);
  expect(new TelegramEvent(channelPost).isReplyToMessage).toEqual(false);
  expect(new TelegramEvent(editedChannelPost).isReplyToMessage).toEqual(false);
  expect(new TelegramEvent(inlineQuery).isReplyToMessage).toEqual(false);
  expect(new TelegramEvent(chosenInlineResult).isReplyToMessage).toEqual(false);
  expect(new TelegramEvent(callbackQuery).isReplyToMessage).toEqual(false);
  expect(new TelegramEvent(shippingQuery).isReplyToMessage).toEqual(false);
  expect(new TelegramEvent(preCheckoutQuery).isReplyToMessage).toEqual(false);
  expect(new TelegramEvent(poll).isReplyToMessage).toEqual(false);
  expect(new TelegramEvent(replyToTextMessage).isReplyToMessage).toEqual(true);
});

it('#replyToMessage', () => {
  expect(new TelegramEvent(textMessage).replyToMessage).toBeUndefined();
  expect(new TelegramEvent(editedMessage).replyToMessage).toBeUndefined();
  expect(new TelegramEvent(channelPost).replyToMessage).toBeUndefined();
  expect(new TelegramEvent(editedChannelPost).replyToMessage).toBeUndefined();
  expect(new TelegramEvent(inlineQuery).replyToMessage).toBeUndefined();
  expect(new TelegramEvent(chosenInlineResult).replyToMessage).toBeUndefined();
  expect(new TelegramEvent(callbackQuery).replyToMessage).toBeUndefined();
  expect(new TelegramEvent(shippingQuery).replyToMessage).toBeUndefined();
  expect(new TelegramEvent(preCheckoutQuery).replyToMessage).toBeUndefined();
  expect(new TelegramEvent(poll).replyToMessage).toBeUndefined();
  expect(new TelegramEvent(replyToTextMessage).replyToMessage).toEqual({
    messageId: 777,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
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
  });
});

it('#isAudio', () => {
  expect(new TelegramEvent(callbackQuery).isAudio).toEqual(false);
  expect(new TelegramEvent(textMessage).isAudio).toEqual(false);
  expect(new TelegramEvent(audioMessage).isAudio).toEqual(true);
  expect(new TelegramEvent(replyToTextMessage).isAudio).toEqual(false);
});

it('#audio', () => {
  expect(new TelegramEvent(callbackQuery).audio).toBeUndefined();
  expect(new TelegramEvent(textMessage).audio).toBeUndefined();
  expect(new TelegramEvent(audioMessage).audio).toEqual({
    fileId: '321',
    duration: 100,
    title: 'audioooooooo',
  });
  expect(new TelegramEvent(replyToTextMessage).audio).toBeUndefined();
});

it('#isDocument', () => {
  expect(new TelegramEvent(callbackQuery).isDocument).toEqual(false);
  expect(new TelegramEvent(textMessage).isDocument).toEqual(false);
  expect(new TelegramEvent(documentMessage).isDocument).toEqual(true);
  expect(new TelegramEvent(replyToTextMessage).isDocument).toEqual(false);
});

it('#document', () => {
  expect(new TelegramEvent(callbackQuery).document).toBeUndefined();
  expect(new TelegramEvent(textMessage).document).toBeUndefined();
  expect(new TelegramEvent(documentMessage).document).toEqual({
    fileId: '234',
    fileName: 'file',
  });
  expect(new TelegramEvent(replyToTextMessage).document).toBeUndefined();
});

it('#isGame', () => {
  expect(new TelegramEvent(callbackQuery).isGame).toEqual(false);
  expect(new TelegramEvent(textMessage).isGame).toEqual(false);
  expect(new TelegramEvent(gameMessage).isGame).toEqual(true);
  expect(new TelegramEvent(replyToTextMessage).isGame).toEqual(false);
});

it('#game', () => {
  expect(new TelegramEvent(callbackQuery).game).toBeUndefined();
  expect(new TelegramEvent(textMessage).game).toBeUndefined();
  expect(new TelegramEvent(gameMessage).game).toEqual({
    title: 'gammmmmmmme',
    description: 'Description of the game',
    photo: [
      {
        fileId: '112',
        width: 100,
        height: 100,
      },
      {
        fileId: '116',
        width: 50,
        height: 50,
      },
    ],
  });
  expect(new TelegramEvent(replyToTextMessage).game).toBeUndefined();
});

it('#isPhoto', () => {
  expect(new TelegramEvent(callbackQuery).isPhoto).toEqual(false);
  expect(new TelegramEvent(textMessage).isPhoto).toEqual(false);
  expect(new TelegramEvent(photoMessage).isPhoto).toEqual(true);
  expect(new TelegramEvent(replyToTextMessage).isPhoto).toEqual(false);
});

it('#photo', () => {
  expect(new TelegramEvent(callbackQuery).photo).toBeUndefined();
  expect(new TelegramEvent(textMessage).photo).toBeUndefined();
  expect(new TelegramEvent(photoMessage).photo).toEqual([
    {
      fileId: '112',
      width: 100,
      height: 100,
    },
    {
      fileId: '116',
      width: 50,
      height: 50,
    },
  ]);
  expect(new TelegramEvent(replyToTextMessage).photo).toBeUndefined();
});

it('#isSticker', () => {
  expect(new TelegramEvent(callbackQuery).isSticker).toEqual(false);
  expect(new TelegramEvent(textMessage).isSticker).toEqual(false);
  expect(new TelegramEvent(stickerMessage).isSticker).toEqual(true);
  expect(new TelegramEvent(replyToTextMessage).isSticker).toEqual(false);
});

it('#sticker', () => {
  expect(new TelegramEvent(callbackQuery).sticker).toBeUndefined();
  expect(new TelegramEvent(textMessage).sticker).toBeUndefined();
  expect(new TelegramEvent(stickerMessage).sticker).toEqual({
    fileId: '123',
    width: 50,
    height: 50,
  });
  expect(new TelegramEvent(replyToTextMessage).sticker).toBeUndefined();
});

it('#isVideo', () => {
  expect(new TelegramEvent(callbackQuery).isVideo).toEqual(false);
  expect(new TelegramEvent(textMessage).isVideo).toEqual(false);
  expect(new TelegramEvent(videoMessage).isVideo).toEqual(true);
  expect(new TelegramEvent(replyToTextMessage).isVideo).toEqual(false);
});

it('#video', () => {
  expect(new TelegramEvent(callbackQuery).video).toBeUndefined();
  expect(new TelegramEvent(textMessage).video).toBeUndefined();
  expect(new TelegramEvent(videoMessage).video).toEqual({
    fileId: '321',
    width: 100,
    height: 100,
    duration: 199,
  });
  expect(new TelegramEvent(replyToTextMessage).video).toBeUndefined();
});

it('#isVoice', () => {
  expect(new TelegramEvent(callbackQuery).isVoice).toEqual(false);
  expect(new TelegramEvent(textMessage).isVoice).toEqual(false);
  expect(new TelegramEvent(voiceMessage).isVoice).toEqual(true);
  expect(new TelegramEvent(replyToTextMessage).isVoice).toEqual(false);
});

it('#voice', () => {
  expect(new TelegramEvent(callbackQuery).voice).toBeUndefined();
  expect(new TelegramEvent(textMessage).voice).toBeUndefined();
  expect(new TelegramEvent(voiceMessage).voice).toEqual({
    fileId: '543',
    duration: 299,
  });
  expect(new TelegramEvent(replyToTextMessage).voice).toBeUndefined();
});

it('#isVideoNote', () => {
  expect(new TelegramEvent(callbackQuery).isVideoNote).toEqual(false);
  expect(new TelegramEvent(textMessage).isVideoNote).toEqual(false);
  expect(new TelegramEvent(videoNoteMessage).isVideoNote).toEqual(true);
  expect(new TelegramEvent(replyToTextMessage).isVideoNote).toEqual(false);
});

it('#videoNote', () => {
  expect(new TelegramEvent(callbackQuery).videoNote).toBeUndefined();
  expect(new TelegramEvent(textMessage).videoNote).toBeUndefined();
  expect(new TelegramEvent(videoNoteMessage).videoNote).toEqual({
    fileId: '654',
    length: 100,
    duration: 399,
  });
  expect(new TelegramEvent(replyToTextMessage).videoNote).toBeUndefined();
});

it('#isContact', () => {
  expect(new TelegramEvent(callbackQuery).isContact).toEqual(false);
  expect(new TelegramEvent(textMessage).isContact).toEqual(false);
  expect(new TelegramEvent(contactMessage).isContact).toEqual(true);
  expect(new TelegramEvent(replyToTextMessage).isContact).toEqual(false);
});

it('#contact', () => {
  expect(new TelegramEvent(callbackQuery).contact).toBeUndefined();
  expect(new TelegramEvent(textMessage).contact).toBeUndefined();
  expect(new TelegramEvent(contactMessage).contact).toEqual({
    phoneNumber: '123456789',
    firstName: 'first',
  });
  expect(new TelegramEvent(replyToTextMessage).contact).toBeUndefined();
});

it('#isLocation', () => {
  expect(new TelegramEvent(callbackQuery).isLocation).toEqual(false);
  expect(new TelegramEvent(textMessage).isLocation).toEqual(false);
  expect(new TelegramEvent(locationMessage).isLocation).toEqual(true);
  expect(new TelegramEvent(replyToTextMessage).isLocation).toEqual(false);
});

it('#location', () => {
  expect(new TelegramEvent(callbackQuery).location).toBeUndefined();
  expect(new TelegramEvent(textMessage).location).toBeUndefined();
  expect(new TelegramEvent(locationMessage).location).toEqual({
    longitude: '111.111',
    latitude: '99.99',
  });
  expect(new TelegramEvent(replyToTextMessage).location).toBeUndefined();
});

it('#isVenue', () => {
  expect(new TelegramEvent(callbackQuery).isVenue).toEqual(false);
  expect(new TelegramEvent(textMessage).isVenue).toEqual(false);
  expect(new TelegramEvent(venueMessage).isVenue).toEqual(true);
  expect(new TelegramEvent(replyToTextMessage).isVenue).toEqual(false);
});

it('#venue', () => {
  expect(new TelegramEvent(callbackQuery).venue).toBeUndefined();
  expect(new TelegramEvent(textMessage).venue).toBeUndefined();
  expect(new TelegramEvent(venueMessage).venue).toEqual({
    location: {
      longitude: '111.111',
      latitude: '99.99',
    },
    title: 'title',
    address: 'addressssss',
  });
  expect(new TelegramEvent(replyToTextMessage).venue).toBeUndefined();
});

it('#isEditedMessage', () => {
  expect(new TelegramEvent(textMessage).isEditedMessage).toEqual(false);
  expect(new TelegramEvent(editedMessage).isEditedMessage).toEqual(true);
  expect(new TelegramEvent(groupEditedMessage).isEditedMessage).toEqual(true);
  expect(new TelegramEvent(channelPost).isEditedMessage).toEqual(false);
  expect(new TelegramEvent(editedChannelPost).isEditedMessage).toEqual(false);
  expect(new TelegramEvent(inlineQuery).isEditedMessage).toEqual(false);
  expect(new TelegramEvent(chosenInlineResult).isEditedMessage).toEqual(false);
  expect(new TelegramEvent(callbackQuery).isEditedMessage).toEqual(false);
  expect(new TelegramEvent(shippingQuery).isEditedMessage).toEqual(false);
  expect(new TelegramEvent(preCheckoutQuery).isEditedMessage).toEqual(false);
  expect(new TelegramEvent(poll).isEditedMessage).toEqual(false);
  expect(new TelegramEvent(replyToTextMessage).isEditedMessage).toEqual(false);
});

it('#editedMessage', () => {
  expect(new TelegramEvent(textMessage).editedMessage).toBeUndefined();
  expect(new TelegramEvent(editedMessage).editedMessage).toEqual({
    messageId: 229,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    date: 1515736358,
    editDate: 1515758017,
    text: 'hiiiii',
  });
  expect(new TelegramEvent(groupEditedMessage).editedMessage).toEqual({
    messageId: 234,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    chat: {
      id: -225456171,
      title: 'Bottender',
      type: 'group',
      allMembersAreAdministrators: true,
    },
    date: 1515736470,
    editDate: 1515758048,
    text: 'hiiiii',
  });
  expect(new TelegramEvent(channelPost).editedMessage).toBeUndefined();
  expect(new TelegramEvent(editedChannelPost).editedMessage).toBeUndefined();
  expect(new TelegramEvent(inlineQuery).editedMessage).toBeUndefined();
  expect(new TelegramEvent(chosenInlineResult).editedMessage).toBeUndefined();
  expect(new TelegramEvent(callbackQuery).editedMessage).toBeUndefined();
  expect(new TelegramEvent(shippingQuery).editedMessage).toBeUndefined();
  expect(new TelegramEvent(preCheckoutQuery).editedMessage).toBeUndefined();
  expect(new TelegramEvent(poll).editedMessage).toBeUndefined();
  expect(new TelegramEvent(replyToTextMessage).editedMessage).toBeUndefined();
});

it('#isChannelPost', () => {
  expect(new TelegramEvent(textMessage).isChannelPost).toEqual(false);
  expect(new TelegramEvent(editedMessage).isChannelPost).toEqual(false);
  expect(new TelegramEvent(channelPost).isChannelPost).toEqual(true);
  expect(new TelegramEvent(editedChannelPost).isChannelPost).toEqual(false);
  expect(new TelegramEvent(inlineQuery).isChannelPost).toEqual(false);
  expect(new TelegramEvent(chosenInlineResult).isChannelPost).toEqual(false);
  expect(new TelegramEvent(callbackQuery).isChannelPost).toEqual(false);
  expect(new TelegramEvent(shippingQuery).isChannelPost).toEqual(false);
  expect(new TelegramEvent(preCheckoutQuery).isChannelPost).toEqual(false);
  expect(new TelegramEvent(poll).isChannelPost).toEqual(false);
  expect(new TelegramEvent(replyToTextMessage).isChannelPost).toEqual(false);
});

it('#channelPost', () => {
  expect(new TelegramEvent(textMessage).channelPost).toBeUndefined();
  expect(new TelegramEvent(editedMessage).channelPost).toBeUndefined();
  expect(new TelegramEvent(channelPost).channelPost).toEqual({
    messageId: 2,
    chat: {
      id: -1001305240521,
      title: 'channel_12345',
      type: 'channel',
    },
    date: 1515760382,
    text: 'post~~~',
  });
  expect(new TelegramEvent(editedChannelPost).channelPost).toBeUndefined();
  expect(new TelegramEvent(inlineQuery).channelPost).toBeUndefined();
  expect(new TelegramEvent(chosenInlineResult).channelPost).toBeUndefined();
  expect(new TelegramEvent(callbackQuery).channelPost).toBeUndefined();
  expect(new TelegramEvent(shippingQuery).channelPost).toBeUndefined();
  expect(new TelegramEvent(preCheckoutQuery).channelPost).toBeUndefined();
  expect(new TelegramEvent(poll).channelPost).toBeUndefined();
  expect(new TelegramEvent(replyToTextMessage).channelPost).toBeUndefined();
});

it('#isEditedChannelPost', () => {
  expect(new TelegramEvent(textMessage).isEditedChannelPost).toEqual(false);
  expect(new TelegramEvent(editedMessage).isEditedChannelPost).toEqual(false);
  expect(new TelegramEvent(channelPost).isEditedChannelPost).toEqual(false);
  expect(new TelegramEvent(editedChannelPost).isEditedChannelPost).toEqual(
    true
  );
  expect(new TelegramEvent(inlineQuery).isEditedChannelPost).toEqual(false);
  expect(new TelegramEvent(chosenInlineResult).isEditedChannelPost).toEqual(
    false
  );
  expect(new TelegramEvent(callbackQuery).isEditedChannelPost).toEqual(false);
  expect(new TelegramEvent(shippingQuery).isEditedChannelPost).toEqual(false);
  expect(new TelegramEvent(preCheckoutQuery).isEditedChannelPost).toEqual(
    false
  );
  expect(new TelegramEvent(poll).isEditedChannelPost).toEqual(false);
  expect(new TelegramEvent(replyToTextMessage).isEditedChannelPost).toEqual(
    false
  );
});

it('#editedChannelPost', () => {
  expect(new TelegramEvent(textMessage).editedChannelPost).toBeUndefined();
  expect(new TelegramEvent(editedMessage).editedChannelPost).toBeUndefined();
  expect(new TelegramEvent(channelPost).editedChannelPost).toBeUndefined();
  expect(new TelegramEvent(editedChannelPost).editedChannelPost).toEqual({
    messageId: 2,
    chat: {
      id: -1001305240521,
      title: 'channel_12345',
      type: 'channel',
    },
    date: 1515760382,
    editDate: 1515760478,
    text: 'post~~~edited',
  });
  expect(new TelegramEvent(inlineQuery).editedChannelPost).toBeUndefined();
  expect(
    new TelegramEvent(chosenInlineResult).editedChannelPost
  ).toBeUndefined();
  expect(new TelegramEvent(callbackQuery).editedChannelPost).toBeUndefined();
  expect(new TelegramEvent(shippingQuery).editedChannelPost).toBeUndefined();
  expect(new TelegramEvent(preCheckoutQuery).editedChannelPost).toBeUndefined();
  expect(new TelegramEvent(poll).editedChannelPost).toBeUndefined();
  expect(
    new TelegramEvent(replyToTextMessage).editedChannelPost
  ).toBeUndefined();
});

it('#isInlineQuery', () => {
  expect(new TelegramEvent(textMessage).isInlineQuery).toEqual(false);
  expect(new TelegramEvent(editedMessage).isInlineQuery).toEqual(false);
  expect(new TelegramEvent(channelPost).isInlineQuery).toEqual(false);
  expect(new TelegramEvent(editedChannelPost).isInlineQuery).toEqual(false);
  expect(new TelegramEvent(inlineQuery).isInlineQuery).toEqual(true);
  expect(new TelegramEvent(chosenInlineResult).isInlineQuery).toEqual(false);
  expect(new TelegramEvent(callbackQuery).isInlineQuery).toEqual(false);
  expect(new TelegramEvent(shippingQuery).isInlineQuery).toEqual(false);
  expect(new TelegramEvent(preCheckoutQuery).isInlineQuery).toEqual(false);
  expect(new TelegramEvent(poll).isInlineQuery).toEqual(false);
  expect(new TelegramEvent(replyToTextMessage).isInlineQuery).toEqual(false);
});

it('#inlineQuery', () => {
  expect(new TelegramEvent(textMessage).inlineQuery).toBeUndefined();
  expect(new TelegramEvent(editedMessage).inlineQuery).toBeUndefined();
  expect(new TelegramEvent(channelPost).inlineQuery).toBeUndefined();
  expect(new TelegramEvent(editedChannelPost).inlineQuery).toBeUndefined();
  expect(new TelegramEvent(inlineQuery).inlineQuery).toEqual({
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
  });
  expect(new TelegramEvent(chosenInlineResult).inlineQuery).toBeUndefined();
  expect(new TelegramEvent(callbackQuery).inlineQuery).toBeUndefined();
  expect(new TelegramEvent(shippingQuery).inlineQuery).toBeUndefined();
  expect(new TelegramEvent(preCheckoutQuery).inlineQuery).toBeUndefined();
  expect(new TelegramEvent(poll).inlineQuery).toBeUndefined();
  expect(new TelegramEvent(replyToTextMessage).inlineQuery).toBeUndefined();
});

it('#isChosenInlineResult', () => {
  expect(new TelegramEvent(textMessage).isChosenInlineResult).toEqual(false);
  expect(new TelegramEvent(editedMessage).isChosenInlineResult).toEqual(false);
  expect(new TelegramEvent(channelPost).isChosenInlineResult).toEqual(false);
  expect(new TelegramEvent(editedChannelPost).isChosenInlineResult).toEqual(
    false
  );
  expect(new TelegramEvent(inlineQuery).isChosenInlineResult).toEqual(false);
  expect(new TelegramEvent(chosenInlineResult).isChosenInlineResult).toEqual(
    true
  );
  expect(new TelegramEvent(callbackQuery).isChosenInlineResult).toEqual(false);
  expect(new TelegramEvent(shippingQuery).isChosenInlineResult).toEqual(false);
  expect(new TelegramEvent(preCheckoutQuery).isChosenInlineResult).toEqual(
    false
  );
  expect(new TelegramEvent(poll).isChosenInlineResult).toEqual(false);
  expect(new TelegramEvent(replyToTextMessage).isChosenInlineResult).toEqual(
    false
  );
});

it('#chosenInlineResult', () => {
  expect(new TelegramEvent(textMessage).chosenInlineResult).toBeUndefined();
  expect(new TelegramEvent(editedMessage).chosenInlineResult).toBeUndefined();
  expect(new TelegramEvent(channelPost).chosenInlineResult).toBeUndefined();
  expect(
    new TelegramEvent(editedChannelPost).chosenInlineResult
  ).toBeUndefined();
  expect(new TelegramEvent(inlineQuery).chosenInlineResult).toBeUndefined();
  expect(new TelegramEvent(chosenInlineResult).chosenInlineResult).toEqual({
    resultId: '2837258670654537434',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    inlineMessageId: '1837258670654537434',
    query: '123',
  });
  expect(new TelegramEvent(callbackQuery).chosenInlineResult).toBeUndefined();
  expect(new TelegramEvent(shippingQuery).chosenInlineResult).toBeUndefined();
  expect(
    new TelegramEvent(preCheckoutQuery).chosenInlineResult
  ).toBeUndefined();
  expect(new TelegramEvent(poll).chosenInlineResult).toBeUndefined();
  expect(
    new TelegramEvent(replyToTextMessage).chosenInlineResult
  ).toBeUndefined();
});

it('#isCallbackQuery', () => {
  expect(new TelegramEvent(textMessage).isCallbackQuery).toEqual(false);
  expect(new TelegramEvent(editedMessage).isCallbackQuery).toEqual(false);
  expect(new TelegramEvent(channelPost).isCallbackQuery).toEqual(false);
  expect(new TelegramEvent(editedChannelPost).isCallbackQuery).toEqual(false);
  expect(new TelegramEvent(inlineQuery).isCallbackQuery).toEqual(false);
  expect(new TelegramEvent(chosenInlineResult).isCallbackQuery).toEqual(false);
  expect(new TelegramEvent(callbackQuery).isCallbackQuery).toEqual(true);
  expect(new TelegramEvent(groupCallbackQuery).isCallbackQuery).toEqual(true);
  expect(new TelegramEvent(shippingQuery).isCallbackQuery).toEqual(false);
  expect(new TelegramEvent(preCheckoutQuery).isCallbackQuery).toEqual(false);
  expect(new TelegramEvent(poll).isCallbackQuery).toEqual(false);
  expect(new TelegramEvent(replyToTextMessage).isCallbackQuery).toEqual(false);
});

it('#callbackQuery', () => {
  expect(new TelegramEvent(textMessage).callbackQuery).toBeUndefined();
  expect(new TelegramEvent(editedMessage).callbackQuery).toBeUndefined();
  expect(new TelegramEvent(channelPost).callbackQuery).toBeUndefined();
  expect(new TelegramEvent(editedChannelPost).callbackQuery).toBeUndefined();
  expect(new TelegramEvent(inlineQuery).callbackQuery).toBeUndefined();
  expect(new TelegramEvent(chosenInlineResult).callbackQuery).toBeUndefined();
  expect(new TelegramEvent(callbackQuery).callbackQuery).toEqual({
    id: '123',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    message: {
      messageId: 666,
      from: {
        id: 313534466,
        isBot: true,
        firstName: 'bot_first',
        username: 'bot_name',
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
    chatInstance: '-1828607021492040088',
    data: 'data',
  });
  expect(new TelegramEvent(groupCallbackQuery).callbackQuery).toEqual({
    id: '1837258667245133763',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    message: {
      messageId: 237,
      from: {
        id: 313534466,
        isBot: true,
        firstName: 'bot_first',
        username: 'bot_name',
      },
      chat: {
        id: -225456171,
        title: 'Bottender',
        type: 'group',
        allMembersAreAdministrators: true,
      },
      date: 1515736481,
      text: 'Hello World',
    },
    chatInstance: '-582211693826679000',
    data: '123',
  });
  expect(new TelegramEvent(shippingQuery).callbackQuery).toBeUndefined();
  expect(new TelegramEvent(preCheckoutQuery).callbackQuery).toBeUndefined();
  expect(new TelegramEvent(poll).callbackQuery).toBeUndefined();
  expect(new TelegramEvent(replyToTextMessage).callbackQuery).toBeUndefined();
});

it('#isPayload', () => {
  expect(new TelegramEvent(textMessage).isPayload).toEqual(false);
  expect(new TelegramEvent(editedMessage).isPayload).toEqual(false);
  expect(new TelegramEvent(channelPost).isPayload).toEqual(false);
  expect(new TelegramEvent(editedChannelPost).isPayload).toEqual(false);
  expect(new TelegramEvent(inlineQuery).isPayload).toEqual(false);
  expect(new TelegramEvent(chosenInlineResult).isPayload).toEqual(false);
  expect(new TelegramEvent(callbackQuery).isPayload).toEqual(true);
  expect(new TelegramEvent(groupCallbackQuery).isPayload).toEqual(true);
  expect(new TelegramEvent(shippingQuery).isPayload).toEqual(false);
  expect(new TelegramEvent(preCheckoutQuery).isPayload).toEqual(false);
  expect(new TelegramEvent(poll).isPayload).toEqual(false);
  expect(new TelegramEvent(replyToTextMessage).isPayload).toEqual(false);
});

it('#payload', () => {
  expect(new TelegramEvent(textMessage).payload).toBeUndefined();
  expect(new TelegramEvent(editedMessage).payload).toBeUndefined();
  expect(new TelegramEvent(channelPost).payload).toBeUndefined();
  expect(new TelegramEvent(editedChannelPost).payload).toBeUndefined();
  expect(new TelegramEvent(inlineQuery).payload).toBeUndefined();
  expect(new TelegramEvent(chosenInlineResult).payload).toBeUndefined();
  expect(new TelegramEvent(callbackQuery).payload).toEqual('data');
  expect(new TelegramEvent(groupCallbackQuery).payload).toEqual('123');
  expect(new TelegramEvent(shippingQuery).payload).toBeUndefined();
  expect(new TelegramEvent(preCheckoutQuery).payload).toBeUndefined();
  expect(new TelegramEvent(poll).payload).toBeUndefined();
  expect(new TelegramEvent(replyToTextMessage).payload).toBeUndefined();
});
