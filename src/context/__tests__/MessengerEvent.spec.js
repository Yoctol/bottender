import MessengerEvent from '../MessengerEvent';

const textMessage = {
  sender: { id: '1423587017700273' },
  recipient: { id: '404217156637689' },
  timestamp: 1491796363181,
  message: {
    mid: 'mid.$cAAE1UUyiiwthh0NPrVbVf4HFNDGl',
    seq: 348847,
    text: '請給我背影',
  },
};

const imageMessage = {
  sender: {
    id: '1423587017700273',
  },
  recipient: {
    id: '404217156637689',
  },
  timestamp: 1491797604411,
  message: {
    mid: 'mid.$cAAE1UUyiiwthh1ZAO1bVhDxGk2N0',
    seq: 348855,
    attachments: [
      {
        type: 'image',
        payload: {
          url:
            'https://scontent.xx.fbcdn.net/v/t35.0-12/17887258_1429713783754592_1626047672_o.jpg?_nc_ad=z-m&oh=e44af5a4c973541ef56333202f160720&oe=58ECF78B',
        },
      },
    ],
  },
};

const likeStickerMessage = {
  sender: {
    id: '1423587017700273',
  },
  recipient: {
    id: '404217156637689',
  },
  timestamp: 1491797086506,
  message: {
    mid: 'mid.$cAAE1UUyiiwthh05ZKlbVgkOobi32',
    seq: 348853,
    sticker_id: 369239263222822,
    attachments: [
      {
        type: 'image',
        payload: {
          url:
            'https://scontent.xx.fbcdn.net/v/t39.1997-6/851557_369239266556155_759568595_n.png?_nc_ad=z-m&oh=547beb90237e24a9682810a5144c9fba&oe=5988CFDC',
          sticker_id: 369239263222822,
        },
      },
    ],
  },
};

const largeLikeStickerMessage = {
  sender: {
    id: '1423587017700273',
  },
  recipient: {
    id: '404217156637689',
  },
  timestamp: 1491797086506,
  message: {
    mid: 'mid.$cAAE1UUyiiwthh05ZKlbVgkOobi32',
    seq: 348853,
    sticker_id: 369239343222814,
    attachments: [
      {
        type: 'image',
        payload: {
          url:
            'https://scontent.xx.fbcdn.net/v/t39.1997-6/p100x100/851587_369239346556147_162929011_n.png?_nc_ad=z-m&oh=2008c832edbd2376b09a1008358b8fd9&oe=598FC1B0',
          sticker_id: 369239343222814,
        },
      },
    ],
  },
};

const quickReplyMessage = {
  sender: {
    id: '1423587017700273',
  },
  recipient: {
    id: '404217156637689',
  },
  timestamp: 1491798262319,
  message: {
    quick_reply: {
      payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
    },
    mid: 'mid.$cAAE1UUyiiwthh2BKL1bVhsBhVxvm',
    seq: 348865,
    text: 'Red',
  },
};

const echoMessage = {
  sender: {
    id: '404217156637689',
  },
  recipient: {
    id: '1423587017700273',
  },
  timestamp: 1491798024994,
  message: {
    is_echo: true,
    app_id: 205552219930699,
    mid: 'mid.$cAAE1UUyiiwthh1yrIlbVhdisQW8M',
    seq: 348859,
    text: '我與父親不相見已兩年餘，我最不能忘記的是他的背影。',
  },
};

const postback = {
  recipient: {
    id: '404217156637689',
  },
  timestamp: 1491798782090,
  sender: {
    id: '1423587017700273',
  },
  postback: {
    payload: 'USER_DEFINED_PAYLOAD',
  },
};

it('#rawEvent', () => {
  expect(new MessengerEvent(textMessage).rawEvent).toEqual(textMessage);
  expect(new MessengerEvent(imageMessage).rawEvent).toEqual(imageMessage);
  expect(new MessengerEvent(likeStickerMessage).rawEvent).toEqual(
    likeStickerMessage
  );
  expect(new MessengerEvent(quickReplyMessage).rawEvent).toEqual(
    quickReplyMessage
  );
  expect(new MessengerEvent(echoMessage).rawEvent).toEqual(echoMessage);
  expect(new MessengerEvent(postback).rawEvent).toEqual(postback);
});

it('#isMessage', () => {
  expect(new MessengerEvent(textMessage).isMessage).toEqual(true);
  expect(new MessengerEvent(imageMessage).isMessage).toEqual(true);
  expect(new MessengerEvent(likeStickerMessage).isMessage).toEqual(true);
  expect(new MessengerEvent(quickReplyMessage).isMessage).toEqual(true);
  expect(new MessengerEvent(echoMessage).isMessage).toEqual(true);
  expect(new MessengerEvent(postback).isMessage).toEqual(false);
});

it('#message', () => {
  expect(new MessengerEvent(textMessage).message).toEqual({
    mid: 'mid.$cAAE1UUyiiwthh0NPrVbVf4HFNDGl',
    seq: 348847,
    text: '請給我背影',
  });
  expect(new MessengerEvent(imageMessage).message).toEqual({
    mid: 'mid.$cAAE1UUyiiwthh1ZAO1bVhDxGk2N0',
    seq: 348855,
    attachments: [
      {
        type: 'image',
        payload: {
          url:
            'https://scontent.xx.fbcdn.net/v/t35.0-12/17887258_1429713783754592_1626047672_o.jpg?_nc_ad=z-m&oh=e44af5a4c973541ef56333202f160720&oe=58ECF78B',
        },
      },
    ],
  });
  expect(new MessengerEvent(likeStickerMessage).message).toEqual({
    mid: 'mid.$cAAE1UUyiiwthh05ZKlbVgkOobi32',
    seq: 348853,
    sticker_id: 369239263222822,
    attachments: [
      {
        type: 'image',
        payload: {
          url:
            'https://scontent.xx.fbcdn.net/v/t39.1997-6/851557_369239266556155_759568595_n.png?_nc_ad=z-m&oh=547beb90237e24a9682810a5144c9fba&oe=5988CFDC',
          sticker_id: 369239263222822,
        },
      },
    ],
  });
});

it('#isTextMessage', () => {
  expect(new MessengerEvent(textMessage).isTextMessage).toEqual(true);
  expect(new MessengerEvent(imageMessage).isTextMessage).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isTextMessage).toEqual(false);
});

it('#hasAttachment', () => {
  expect(new MessengerEvent(textMessage).hasAttachment).toEqual(false);
  expect(new MessengerEvent(imageMessage).hasAttachment).toEqual(true);
  expect(new MessengerEvent(likeStickerMessage).hasAttachment).toEqual(true);
});

it('#attachments', () => {
  expect(new MessengerEvent(imageMessage).attachments).toEqual([
    {
      type: 'image',
      payload: {
        url:
          'https://scontent.xx.fbcdn.net/v/t35.0-12/17887258_1429713783754592_1626047672_o.jpg?_nc_ad=z-m&oh=e44af5a4c973541ef56333202f160720&oe=58ECF78B',
      },
    },
  ]);
  expect(new MessengerEvent(likeStickerMessage).attachments).toEqual([
    {
      type: 'image',
      payload: {
        url:
          'https://scontent.xx.fbcdn.net/v/t39.1997-6/851557_369239266556155_759568595_n.png?_nc_ad=z-m&oh=547beb90237e24a9682810a5144c9fba&oe=5988CFDC',
        sticker_id: 369239263222822,
      },
    },
  ]);
});

it('#isImageMessage', () => {
  expect(new MessengerEvent(textMessage).isImageMessage).toEqual(false);
  expect(new MessengerEvent(imageMessage).isImageMessage).toEqual(true);
  expect(new MessengerEvent(likeStickerMessage).isImageMessage).toEqual(true);
});

it('#isStickerMessage', () => {
  expect(new MessengerEvent(textMessage).isStickerMessage).toEqual(false);
  expect(new MessengerEvent(imageMessage).isStickerMessage).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isStickerMessage).toEqual(true);
  expect(new MessengerEvent(largeLikeStickerMessage).isStickerMessage).toEqual(
    true
  );
});

it('#isLikeSticker', () => {
  expect(new MessengerEvent(textMessage).isLikeSticker).toEqual(false);
  expect(new MessengerEvent(imageMessage).isLikeSticker).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isLikeSticker).toEqual(true);
  expect(new MessengerEvent(largeLikeStickerMessage).isLikeSticker).toEqual(
    true
  );
});

it('#isQuickReply', () => {
  expect(new MessengerEvent(textMessage).isQuickReply).toEqual(false);
  expect(new MessengerEvent(imageMessage).isQuickReply).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isQuickReply).toEqual(false);
  expect(new MessengerEvent(quickReplyMessage).isQuickReply).toEqual(true);
  expect(new MessengerEvent(echoMessage).isQuickReply).toEqual(false);
});

it('#quickReply', () => {
  expect(new MessengerEvent(quickReplyMessage).quickReply).toEqual({
    payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
  });
});

it('#isEcho', () => {
  expect(new MessengerEvent(textMessage).isEcho).toEqual(false);
  expect(new MessengerEvent(imageMessage).isEcho).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isEcho).toEqual(false);
  expect(new MessengerEvent(quickReplyMessage).isEcho).toEqual(false);
  expect(new MessengerEvent(echoMessage).isEcho).toEqual(true);
});

it('#isPostback', () => {
  expect(new MessengerEvent(textMessage).isPostback).toEqual(false);
  expect(new MessengerEvent(imageMessage).isPostback).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isPostback).toEqual(false);
  expect(new MessengerEvent(quickReplyMessage).isPostback).toEqual(false);
  expect(new MessengerEvent(echoMessage).isPostback).toEqual(false);
  expect(new MessengerEvent(postback).isPostback).toEqual(true);
});

it('#postback', () => {
  expect(new MessengerEvent(postback).postback).toEqual({
    payload: 'USER_DEFINED_PAYLOAD',
  });
});
