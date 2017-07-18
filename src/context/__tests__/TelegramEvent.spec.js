import Telegramevent from '../TelegramEvent';

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

it('#rawEvent', () => {
  expect(new Telegramevent(textMessage).rawEvent).toEqual(textMessage);
});

it('#isMessage', () => {
  expect(new Telegramevent(textMessage).isMessage).toEqual(true);
});

it('#message', () => {
  expect(new Telegramevent(textMessage).message).toEqual({
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
  expect(new Telegramevent(textMessage).isTextMessage).toEqual(true);
  expect(new Telegramevent(stickerMessage).isTextMessage).toEqual(false);
});

it('#isAudioMessage', () => {
  expect(new Telegramevent(textMessage).isAudioMessage).toEqual(false);
  expect(new Telegramevent(audioMessage).isAudioMessage).toEqual(true);
});

it('#isDocumentMessage', () => {
  expect(new Telegramevent(textMessage).isDocumentMessage).toEqual(false);
  expect(new Telegramevent(documentMessage).isDocumentMessage).toEqual(true);
});

it('#isGameMessage', () => {
  expect(new Telegramevent(textMessage).isGameMessage).toEqual(false);
  expect(new Telegramevent(gameMessage).isGameMessage).toEqual(true);
});

it('#isPhoteMessage', () => {
  expect(new Telegramevent(textMessage).isPhoteMessage).toEqual(false);
  expect(new Telegramevent(photoMessage).isPhoteMessage).toEqual(true);
});

it('#isStickerMessage', () => {
  expect(new Telegramevent(textMessage).isStickerMessage).toEqual(false);
  expect(new Telegramevent(stickerMessage).isStickerMessage).toEqual(true);
});

it('#isVideoMessage', () => {
  expect(new Telegramevent(textMessage).isVideoMessage).toEqual(false);
  expect(new Telegramevent(videoMessage).isVideoMessage).toEqual(true);
});

it('#isVoiceMessage', () => {
  expect(new Telegramevent(textMessage).isVoiceMessage).toEqual(false);
  expect(new Telegramevent(voiceMessage).isVoiceMessage).toEqual(true);
});

it('#isVideoNoteMessage', () => {
  expect(new Telegramevent(textMessage).isVideoNoteMessage).toEqual(false);
  expect(new Telegramevent(videoNoteMessage).isVideoNoteMessage).toEqual(true);
});

it('#isContactMessage', () => {
  expect(new Telegramevent(textMessage).isContactMessage).toEqual(false);
  expect(new Telegramevent(contactMessage).isContactMessage).toEqual(true);
});

it('#isLocationMessage', () => {
  expect(new Telegramevent(textMessage).isLocationMessage).toEqual(false);
  expect(new Telegramevent(locationMessage).isLocationMessage).toEqual(true);
});

it('#isVenueMessage', () => {
  expect(new Telegramevent(textMessage).isVenueMessage).toEqual(false);
  expect(new Telegramevent(venueMessage).isVenueMessage).toEqual(true);
});
