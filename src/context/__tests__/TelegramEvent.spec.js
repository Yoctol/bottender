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

const groupMessage = {
  update_id: 141921689,
  message: {
    message_id: 238,
    from: {
      id: 427770117,
      is_bot: false,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    chat: {
      id: -225456171,
      title: 'Bottender',
      type: 'group',
      all_members_are_administrators: true,
    },
    date: 1515758146,
    text: 'hi',
  },
};

const editedMessage = {
  update_id: 141921687,
  edited_message: {
    message_id: 229,
    from: {
      id: 427770117,
      is_bot: false,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    chat: {
      id: 427770117,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    date: 1515736358,
    edit_date: 1515758017,
    text: 'hiiiii',
  },
};

const groupEditedMessage = {
  update_id: 141921688,
  edited_message: {
    message_id: 234,
    from: {
      id: 427770117,
      is_bot: false,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    chat: {
      id: -225456171,
      title: 'Bottender',
      type: 'group',
      all_members_are_administrators: true,
    },
    date: 1515736470,
    edit_date: 1515758048,
    text: 'hiiiii',
  },
};

const channelPost = {
  update_id: 141921710,
  channel_post: {
    message_id: 2,
    chat: {
      id: -1001305240521,
      title: 'channel_12345',
      type: 'channel',
    },
    date: 1515760382,
    text: 'post~~~',
  },
};

const editedChannelPost = {
  update_id: 141921711,
  edited_channel_post: {
    message_id: 2,
    chat: {
      id: -1001305240521,
      title: 'channel_12345',
      type: 'channel',
    },
    date: 1515760382,
    edit_date: 1515760478,
    text: 'post~~~edited',
  },
};

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

const chosenInlineResult = {
  update_id: 141921701,
  chosen_inline_result: {
    result_id: '2837258670654537434',
    from: {
      id: 427770117,
      is_bot: false,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    inline_message_id: '1837258670654537434',
    query: '123',
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

const groupCallbackQuery = {
  update_id: 141921690,
  callback_query: {
    id: '1837258667245133763',
    from: {
      id: 427770117,
      is_bot: false,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    message: {
      message_id: 237,
      from: {
        id: 313534466,
        is_bot: true,
        first_name: 'bot_first',
        username: 'bot_name',
      },
      chat: {
        id: -225456171,
        title: 'Bottender',
        type: 'group',
        all_members_are_administrators: true,
      },
      date: 1515736481,
      text: 'Hello World',
    },
    chat_instance: '-582211693826679000',
    data: '123',
  },
};

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
  expect(new TelegramEvent(groupMessage).message).toEqual({
    message_id: 238,
    from: {
      id: 427770117,
      is_bot: false,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    chat: {
      id: -225456171,
      title: 'Bottender',
      type: 'group',
      all_members_are_administrators: true,
    },
    date: 1515758146,
    text: 'hi',
  });
  expect(new TelegramEvent(editedMessage).message).toEqual(null);
  expect(new TelegramEvent(channelPost).message).toEqual(null);
  expect(new TelegramEvent(editedChannelPost).message).toEqual(null);
  expect(new TelegramEvent(inlineQuery).message).toEqual(null);
  expect(new TelegramEvent(chosenInlineResult).message).toEqual(null);
  expect(new TelegramEvent(callbackQuery).message).toEqual(null);
  expect(new TelegramEvent(shippingQuery).message).toEqual(null);
  expect(new TelegramEvent(preCheckoutQuery).message).toEqual(null);
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

it('#audio', () => {
  expect(new TelegramEvent(callbackQuery).audio).toEqual(null);
  expect(new TelegramEvent(textMessage).audio).toEqual(null);
  expect(new TelegramEvent(audioMessage).audio).toEqual({
    file_id: '321',
    duration: 100,
    title: 'audioooooooo',
  });
});

it('#isDocument', () => {
  expect(new TelegramEvent(callbackQuery).isDocument).toEqual(false);
  expect(new TelegramEvent(textMessage).isDocument).toEqual(false);
  expect(new TelegramEvent(documentMessage).isDocument).toEqual(true);
});

it('#document', () => {
  expect(new TelegramEvent(callbackQuery).document).toEqual(null);
  expect(new TelegramEvent(textMessage).document).toEqual(null);
  expect(new TelegramEvent(documentMessage).document).toEqual({
    file_id: '234',
    file_name: 'file',
  });
});

it('#isGame', () => {
  expect(new TelegramEvent(callbackQuery).isGame).toEqual(false);
  expect(new TelegramEvent(textMessage).isGame).toEqual(false);
  expect(new TelegramEvent(gameMessage).isGame).toEqual(true);
});

it('#game', () => {
  expect(new TelegramEvent(callbackQuery).game).toEqual(null);
  expect(new TelegramEvent(textMessage).game).toEqual(null);
  expect(new TelegramEvent(gameMessage).game).toEqual({
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
  });
});

it('#isPhoto', () => {
  expect(new TelegramEvent(callbackQuery).isPhoto).toEqual(false);
  expect(new TelegramEvent(textMessage).isPhoto).toEqual(false);
  expect(new TelegramEvent(photoMessage).isPhoto).toEqual(true);
});

it('#photo', () => {
  expect(new TelegramEvent(callbackQuery).photo).toEqual(null);
  expect(new TelegramEvent(textMessage).photo).toEqual(null);
  expect(new TelegramEvent(photoMessage).photo).toEqual([
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
  ]);
});

it('#isSticker', () => {
  expect(new TelegramEvent(callbackQuery).isSticker).toEqual(false);
  expect(new TelegramEvent(textMessage).isSticker).toEqual(false);
  expect(new TelegramEvent(stickerMessage).isSticker).toEqual(true);
});

it('#sticker', () => {
  expect(new TelegramEvent(callbackQuery).sticker).toEqual(null);
  expect(new TelegramEvent(textMessage).sticker).toEqual(null);
  expect(new TelegramEvent(stickerMessage).sticker).toEqual({
    file_id: '123',
    width: 50,
    height: 50,
  });
});

it('#isVideo', () => {
  expect(new TelegramEvent(callbackQuery).isVideo).toEqual(false);
  expect(new TelegramEvent(textMessage).isVideo).toEqual(false);
  expect(new TelegramEvent(videoMessage).isVideo).toEqual(true);
});

it('#video', () => {
  expect(new TelegramEvent(callbackQuery).video).toEqual(null);
  expect(new TelegramEvent(textMessage).video).toEqual(null);
  expect(new TelegramEvent(videoMessage).video).toEqual({
    file_id: '321',
    width: 100,
    height: 100,
    duration: 199,
  });
});

it('#isVoice', () => {
  expect(new TelegramEvent(callbackQuery).isVoice).toEqual(false);
  expect(new TelegramEvent(textMessage).isVoice).toEqual(false);
  expect(new TelegramEvent(voiceMessage).isVoice).toEqual(true);
});

it('#voice', () => {
  expect(new TelegramEvent(callbackQuery).voice).toEqual(null);
  expect(new TelegramEvent(textMessage).voice).toEqual(null);
  expect(new TelegramEvent(voiceMessage).voice).toEqual({
    file_id: '543',
    duration: 299,
  });
});

it('#isVideoNote', () => {
  expect(new TelegramEvent(callbackQuery).isVideoNote).toEqual(false);
  expect(new TelegramEvent(textMessage).isVideoNote).toEqual(false);
  expect(new TelegramEvent(videoNoteMessage).isVideoNote).toEqual(true);
});

it('#videoNote', () => {
  expect(new TelegramEvent(callbackQuery).videoNote).toEqual(null);
  expect(new TelegramEvent(textMessage).videoNote).toEqual(null);
  expect(new TelegramEvent(videoNoteMessage).videoNote).toEqual({
    file_id: '654',
    length: 100,
    duration: 399,
  });
});

it('#isContact', () => {
  expect(new TelegramEvent(callbackQuery).isContact).toEqual(false);
  expect(new TelegramEvent(textMessage).isContact).toEqual(false);
  expect(new TelegramEvent(contactMessage).isContact).toEqual(true);
});

it('#contact', () => {
  expect(new TelegramEvent(callbackQuery).contact).toEqual(null);
  expect(new TelegramEvent(textMessage).contact).toEqual(null);
  expect(new TelegramEvent(contactMessage).contact).toEqual({
    phone_number: '123456789',
    first_name: 'first',
  });
});

it('#isLocation', () => {
  expect(new TelegramEvent(callbackQuery).isLocation).toEqual(false);
  expect(new TelegramEvent(textMessage).isLocation).toEqual(false);
  expect(new TelegramEvent(locationMessage).isLocation).toEqual(true);
});

it('#location', () => {
  expect(new TelegramEvent(callbackQuery).location).toEqual(null);
  expect(new TelegramEvent(textMessage).location).toEqual(null);
  expect(new TelegramEvent(locationMessage).location).toEqual({
    longitude: '111.111',
    latitude: '99.99',
  });
});

it('#isVenue', () => {
  expect(new TelegramEvent(callbackQuery).isVenue).toEqual(false);
  expect(new TelegramEvent(textMessage).isVenue).toEqual(false);
  expect(new TelegramEvent(venueMessage).isVenue).toEqual(true);
});

it('#venue', () => {
  expect(new TelegramEvent(callbackQuery).venue).toEqual(null);
  expect(new TelegramEvent(textMessage).venue).toEqual(null);
  expect(new TelegramEvent(venueMessage).venue).toEqual({
    location: {
      longitude: '111.111',
      latitude: '99.99',
    },
    title: 'title',
    address: 'addressssss',
  });
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
});

it('#editedMessage', () => {
  expect(new TelegramEvent(textMessage).editedMessage).toEqual(null);
  expect(new TelegramEvent(editedMessage).editedMessage).toEqual({
    message_id: 229,
    from: {
      id: 427770117,
      is_bot: false,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    chat: {
      id: 427770117,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    date: 1515736358,
    edit_date: 1515758017,
    text: 'hiiiii',
  });
  expect(new TelegramEvent(groupEditedMessage).editedMessage).toEqual({
    message_id: 234,
    from: {
      id: 427770117,
      is_bot: false,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    chat: {
      id: -225456171,
      title: 'Bottender',
      type: 'group',
      all_members_are_administrators: true,
    },
    date: 1515736470,
    edit_date: 1515758048,
    text: 'hiiiii',
  });
  expect(new TelegramEvent(channelPost).editedMessage).toEqual(null);
  expect(new TelegramEvent(editedChannelPost).editedMessage).toEqual(null);
  expect(new TelegramEvent(inlineQuery).editedMessage).toEqual(null);
  expect(new TelegramEvent(chosenInlineResult).editedMessage).toEqual(null);
  expect(new TelegramEvent(callbackQuery).editedMessage).toEqual(null);
  expect(new TelegramEvent(shippingQuery).editedMessage).toEqual(null);
  expect(new TelegramEvent(preCheckoutQuery).editedMessage).toEqual(null);
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
});

it('#channelPost', () => {
  expect(new TelegramEvent(textMessage).channelPost).toEqual(null);
  expect(new TelegramEvent(editedMessage).channelPost).toEqual(null);
  expect(new TelegramEvent(channelPost).channelPost).toEqual({
    message_id: 2,
    chat: {
      id: -1001305240521,
      title: 'channel_12345',
      type: 'channel',
    },
    date: 1515760382,
    text: 'post~~~',
  });
  expect(new TelegramEvent(editedChannelPost).channelPost).toEqual(null);
  expect(new TelegramEvent(inlineQuery).channelPost).toEqual(null);
  expect(new TelegramEvent(chosenInlineResult).channelPost).toEqual(null);
  expect(new TelegramEvent(callbackQuery).channelPost).toEqual(null);
  expect(new TelegramEvent(shippingQuery).channelPost).toEqual(null);
  expect(new TelegramEvent(preCheckoutQuery).channelPost).toEqual(null);
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
});

it('#editedChannelPost', () => {
  expect(new TelegramEvent(textMessage).editedChannelPost).toEqual(null);
  expect(new TelegramEvent(editedMessage).editedChannelPost).toEqual(null);
  expect(new TelegramEvent(channelPost).editedChannelPost).toEqual(null);
  expect(new TelegramEvent(editedChannelPost).editedChannelPost).toEqual({
    message_id: 2,
    chat: {
      id: -1001305240521,
      title: 'channel_12345',
      type: 'channel',
    },
    date: 1515760382,
    edit_date: 1515760478,
    text: 'post~~~edited',
  });
  expect(new TelegramEvent(inlineQuery).editedChannelPost).toEqual(null);
  expect(new TelegramEvent(chosenInlineResult).editedChannelPost).toEqual(null);
  expect(new TelegramEvent(callbackQuery).editedChannelPost).toEqual(null);
  expect(new TelegramEvent(shippingQuery).editedChannelPost).toEqual(null);
  expect(new TelegramEvent(preCheckoutQuery).editedChannelPost).toEqual(null);
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
});

it('#inlineQuery', () => {
  expect(new TelegramEvent(textMessage).inlineQuery).toEqual(null);
  expect(new TelegramEvent(editedMessage).inlineQuery).toEqual(null);
  expect(new TelegramEvent(channelPost).inlineQuery).toEqual(null);
  expect(new TelegramEvent(editedChannelPost).inlineQuery).toEqual(null);
  expect(new TelegramEvent(inlineQuery).inlineQuery).toEqual({
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
  });
  expect(new TelegramEvent(chosenInlineResult).inlineQuery).toEqual(null);
  expect(new TelegramEvent(callbackQuery).inlineQuery).toEqual(null);
  expect(new TelegramEvent(shippingQuery).inlineQuery).toEqual(null);
  expect(new TelegramEvent(preCheckoutQuery).inlineQuery).toEqual(null);
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
});

it('#chosenInlineResult', () => {
  expect(new TelegramEvent(textMessage).chosenInlineResult).toEqual(null);
  expect(new TelegramEvent(editedMessage).chosenInlineResult).toEqual(null);
  expect(new TelegramEvent(channelPost).chosenInlineResult).toEqual(null);
  expect(new TelegramEvent(editedChannelPost).chosenInlineResult).toEqual(null);
  expect(new TelegramEvent(inlineQuery).chosenInlineResult).toEqual(null);
  expect(new TelegramEvent(chosenInlineResult).chosenInlineResult).toEqual({
    result_id: '2837258670654537434',
    from: {
      id: 427770117,
      is_bot: false,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    inline_message_id: '1837258670654537434',
    query: '123',
  });
  expect(new TelegramEvent(callbackQuery).chosenInlineResult).toEqual(null);
  expect(new TelegramEvent(shippingQuery).chosenInlineResult).toEqual(null);
  expect(new TelegramEvent(preCheckoutQuery).chosenInlineResult).toEqual(null);
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
});

it('#callbackQuery', () => {
  expect(new TelegramEvent(textMessage).callbackQuery).toEqual(null);
  expect(new TelegramEvent(editedMessage).callbackQuery).toEqual(null);
  expect(new TelegramEvent(channelPost).callbackQuery).toEqual(null);
  expect(new TelegramEvent(editedChannelPost).callbackQuery).toEqual(null);
  expect(new TelegramEvent(inlineQuery).callbackQuery).toEqual(null);
  expect(new TelegramEvent(chosenInlineResult).callbackQuery).toEqual(null);
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
  expect(new TelegramEvent(groupCallbackQuery).callbackQuery).toEqual({
    id: '1837258667245133763',
    from: {
      id: 427770117,
      is_bot: false,
      first_name: 'user_first',
      last_name: 'user_last',
      language_code: 'en',
    },
    message: {
      message_id: 237,
      from: {
        id: 313534466,
        is_bot: true,
        first_name: 'bot_first',
        username: 'bot_name',
      },
      chat: {
        id: -225456171,
        title: 'Bottender',
        type: 'group',
        all_members_are_administrators: true,
      },
      date: 1515736481,
      text: 'Hello World',
    },
    chat_instance: '-582211693826679000',
    data: '123',
  });
  expect(new TelegramEvent(shippingQuery).callbackQuery).toEqual(null);
  expect(new TelegramEvent(preCheckoutQuery).callbackQuery).toEqual(null);
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
});

it('#payload', () => {
  expect(new TelegramEvent(textMessage).payload).toEqual(null);
  expect(new TelegramEvent(editedMessage).payload).toEqual(null);
  expect(new TelegramEvent(channelPost).payload).toEqual(null);
  expect(new TelegramEvent(editedChannelPost).payload).toEqual(null);
  expect(new TelegramEvent(inlineQuery).payload).toEqual(null);
  expect(new TelegramEvent(chosenInlineResult).payload).toEqual(null);
  expect(new TelegramEvent(callbackQuery).payload).toEqual('data');
  expect(new TelegramEvent(groupCallbackQuery).payload).toEqual('123');
  expect(new TelegramEvent(shippingQuery).payload).toEqual(null);
  expect(new TelegramEvent(preCheckoutQuery).payload).toEqual(null);
});
