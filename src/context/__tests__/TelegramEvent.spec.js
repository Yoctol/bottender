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

it('#isTextMessage', () => {
  expect(new TelegramEvent(callbackQuery).isTextMessage).toEqual(false);
  expect(new TelegramEvent(textMessage).isTextMessage).toEqual(true);
  expect(new TelegramEvent(stickerMessage).isTextMessage).toEqual(false);
});

it('#isAudioMessage', () => {
  expect(new TelegramEvent(callbackQuery).isAudioMessage).toEqual(false);
  expect(new TelegramEvent(textMessage).isAudioMessage).toEqual(false);
  expect(new TelegramEvent(audioMessage).isAudioMessage).toEqual(true);
});

it('#isDocumentMessage', () => {
  expect(new TelegramEvent(callbackQuery).isDocumentMessage).toEqual(false);
  expect(new TelegramEvent(textMessage).isDocumentMessage).toEqual(false);
  expect(new TelegramEvent(documentMessage).isDocumentMessage).toEqual(true);
});

it('#isGameMessage', () => {
  expect(new TelegramEvent(callbackQuery).isGameMessage).toEqual(false);
  expect(new TelegramEvent(textMessage).isGameMessage).toEqual(false);
  expect(new TelegramEvent(gameMessage).isGameMessage).toEqual(true);
});

it('#isPhotoMessage', () => {
  expect(new TelegramEvent(callbackQuery).isPhotoMessage).toEqual(false);
  expect(new TelegramEvent(textMessage).isPhotoMessage).toEqual(false);
  expect(new TelegramEvent(photoMessage).isPhotoMessage).toEqual(true);
});

it('#isStickerMessage', () => {
  expect(new TelegramEvent(callbackQuery).isStickerMessage).toEqual(false);
  expect(new TelegramEvent(textMessage).isStickerMessage).toEqual(false);
  expect(new TelegramEvent(stickerMessage).isStickerMessage).toEqual(true);
});

it('#isVideoMessage', () => {
  expect(new TelegramEvent(callbackQuery).isVideoMessage).toEqual(false);
  expect(new TelegramEvent(textMessage).isVideoMessage).toEqual(false);
  expect(new TelegramEvent(videoMessage).isVideoMessage).toEqual(true);
});

it('#isVoiceMessage', () => {
  expect(new TelegramEvent(callbackQuery).isVoiceMessage).toEqual(false);
  expect(new TelegramEvent(textMessage).isVoiceMessage).toEqual(false);
  expect(new TelegramEvent(voiceMessage).isVoiceMessage).toEqual(true);
});

it('#isVideoNoteMessage', () => {
  expect(new TelegramEvent(callbackQuery).isVideoNoteMessage).toEqual(false);
  expect(new TelegramEvent(textMessage).isVideoNoteMessage).toEqual(false);
  expect(new TelegramEvent(videoNoteMessage).isVideoNoteMessage).toEqual(true);
});

it('#isContactMessage', () => {
  expect(new TelegramEvent(callbackQuery).isContactMessage).toEqual(false);
  expect(new TelegramEvent(textMessage).isContactMessage).toEqual(false);
  expect(new TelegramEvent(contactMessage).isContactMessage).toEqual(true);
});

it('#isLocationMessage', () => {
  expect(new TelegramEvent(callbackQuery).isLocationMessage).toEqual(false);
  expect(new TelegramEvent(textMessage).isLocationMessage).toEqual(false);
  expect(new TelegramEvent(locationMessage).isLocationMessage).toEqual(true);
});

it('#isVenueMessage', () => {
  expect(new TelegramEvent(callbackQuery).isVenueMessage).toEqual(false);
  expect(new TelegramEvent(textMessage).isVenueMessage).toEqual(false);
  expect(new TelegramEvent(venueMessage).isVenueMessage).toEqual(true);
});

it('#isCallbackQuery', () => {
  expect(new TelegramEvent(textMessage).isCallbackQuery).toEqual(false);
  expect(new TelegramEvent(callbackQuery).isCallbackQuery).toEqual(true);
});
