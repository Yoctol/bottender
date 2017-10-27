import TelegramEvent from '../TelegramEvent';

const textMessage = {
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

const stickerMessage = {
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
    sticker: {
      file_id: '123',
      width: 50,
      height: 50,
    },
  },
};

const videoMessage = {
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
    video: {
      file_id: '321',
      width: 100,
      height: 100,
      duration: 199,
    },
  },
};

const voiceMessage = {
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
    voice: {
      file_id: '543',
      duration: 299,
    },
  },
};

const videoNoteMessage = {
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
    video_note: {
      file_id: '654',
      length: 100,
      duration: 399,
    },
  },
};

const contactMessage = {
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
    contact: {
      phone_number: '123456789',
      first_name: 'first',
    },
  },
};

const photoMessage = {
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
    photo: [
      {
        file_id: '112',
        width: 100,
        height: 100,
      },
      {
        file_id: '116',
        width: 50,
        height: 50,
      },
    ],
  },
};

const audioMessage = {
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
    audio: {
      file_id: '321',
      duration: 100,
      title: 'audioooooooo',
    },
  },
};

const locationMessage = {
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
    location: {
      longitude: '111.111',
      latitude: '99.99',
    },
  },
};

const venueMessage = {
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

const documentMessage = {
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
    document: {
      file_id: '234',
      file_name: 'file',
    },
  },
};

const gameMessage = {
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
    game: {
      title: 'gammmmmmmme',
      description: 'Description of the game',
      photo: [
        {
          file_id: '112',
          width: 100,
          height: 100,
        },
        {
          file_id: '116',
          width: 50,
          height: 50,
        },
      ],
    },
  },
};

const callbackQuery = {
  callback_query: {
    id: '123',
    from: {
      id: 427770117,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    message: {
      message_id: 666,
      from: {
        id: 313534466,
        first_name: 'bot_first',
        username: 'bot_name',
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
    chat_instance: '-1828607021492040088',
    data: 'data',
  },
};

it('#rawEvent', () => {
  expect(new TelegramEvent(textMessage).rawEvent).toEqual(textMessage);
});

it('#isMessage', () => {
  expect(new TelegramEvent(textMessage).isMessage).toEqual(true);
});

it('#message', () => {
  expect(new TelegramEvent(textMessage).message).toEqual({
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
  });
});

it('#isText', () => {
  expect(new TelegramEvent(callbackQuery).isText).toEqual(false);
  expect(new TelegramEvent(textMessage).isText).toEqual(true);
  expect(new TelegramEvent(stickerMessage).isText).toEqual(false);
});

it('#text', () => {
  expect(new TelegramEvent(callbackQuery).text).toEqual(null);
  expect(new TelegramEvent(textMessage).text).toEqual('text');
  expect(new TelegramEvent(stickerMessage).text).toEqual(null);
});

it('#isAudio', () => {
  expect(new TelegramEvent(callbackQuery).isAudio).toEqual(false);
  expect(new TelegramEvent(textMessage).isAudio).toEqual(false);
  expect(new TelegramEvent(audioMessage).isAudio).toEqual(true);
});

it('#isDocument', () => {
  expect(new TelegramEvent(callbackQuery).isDocument).toEqual(false);
  expect(new TelegramEvent(textMessage).isDocument).toEqual(false);
  expect(new TelegramEvent(documentMessage).isDocument).toEqual(true);
});

it('#isGame', () => {
  expect(new TelegramEvent(callbackQuery).isGame).toEqual(false);
  expect(new TelegramEvent(textMessage).isGame).toEqual(false);
  expect(new TelegramEvent(gameMessage).isGame).toEqual(true);
});

it('#isPhoto', () => {
  expect(new TelegramEvent(callbackQuery).isPhoto).toEqual(false);
  expect(new TelegramEvent(textMessage).isPhoto).toEqual(false);
  expect(new TelegramEvent(photoMessage).isPhoto).toEqual(true);
});

it('#isSticker', () => {
  expect(new TelegramEvent(callbackQuery).isSticker).toEqual(false);
  expect(new TelegramEvent(textMessage).isSticker).toEqual(false);
  expect(new TelegramEvent(stickerMessage).isSticker).toEqual(true);
});

it('#isVideo', () => {
  expect(new TelegramEvent(callbackQuery).isVideo).toEqual(false);
  expect(new TelegramEvent(textMessage).isVideo).toEqual(false);
  expect(new TelegramEvent(videoMessage).isVideo).toEqual(true);
});

it('#isVoice', () => {
  expect(new TelegramEvent(callbackQuery).isVoice).toEqual(false);
  expect(new TelegramEvent(textMessage).isVoice).toEqual(false);
  expect(new TelegramEvent(voiceMessage).isVoice).toEqual(true);
});

it('#isVideoNote', () => {
  expect(new TelegramEvent(callbackQuery).isVideoNote).toEqual(false);
  expect(new TelegramEvent(textMessage).isVideoNote).toEqual(false);
  expect(new TelegramEvent(videoNoteMessage).isVideoNote).toEqual(true);
});

it('#isContact', () => {
  expect(new TelegramEvent(callbackQuery).isContact).toEqual(false);
  expect(new TelegramEvent(textMessage).isContact).toEqual(false);
  expect(new TelegramEvent(contactMessage).isContact).toEqual(true);
});

it('#isLocation', () => {
  expect(new TelegramEvent(callbackQuery).isLocation).toEqual(false);
  expect(new TelegramEvent(textMessage).isLocation).toEqual(false);
  expect(new TelegramEvent(locationMessage).isLocation).toEqual(true);
});

it('#isVenue', () => {
  expect(new TelegramEvent(callbackQuery).isVenue).toEqual(false);
  expect(new TelegramEvent(textMessage).isVenue).toEqual(false);
  expect(new TelegramEvent(venueMessage).isVenue).toEqual(true);
});

it('#isCallbackQuery', () => {
  expect(new TelegramEvent(textMessage).isCallbackQuery).toEqual(false);
  expect(new TelegramEvent(callbackQuery).isCallbackQuery).toEqual(true);
});

it('#callbackQuery', () => {
  expect(new TelegramEvent(textMessage).callbackQuery).toEqual(null);
  expect(new TelegramEvent(callbackQuery).callbackQuery).toEqual({
    id: '123',
    from: {
      id: 427770117,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    message: {
      message_id: 666,
      from: {
        id: 313534466,
        first_name: 'bot_first',
        username: 'bot_name',
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
    chat_instance: '-1828607021492040088',
    data: 'data',
  });
});

it('#isPayload', () => {
  expect(new TelegramEvent(textMessage).isPayload).toEqual(false);
  expect(new TelegramEvent(callbackQuery).isPayload).toEqual(true);
});

it('#payload', () => {
  expect(new TelegramEvent(textMessage).payload).toEqual(null);
  expect(new TelegramEvent(callbackQuery).payload).toEqual('data');
});
