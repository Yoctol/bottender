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

const locationMessage = {
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
        type: 'location',
        payload: {
          coordinates: {
            lat: 0,
            long: 0,
          },
        },
      },
    ],
  },
};

const audioMessage = {
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
        type: 'audio',
        payload: {
          url: 'https://example.com/bot/audios/audio.mp3',
        },
      },
    ],
  },
};

const videoMessage = {
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
        type: 'video',
        payload: {
          url: 'https://example.com/bot/videos/video.mp4',
        },
      },
    ],
  },
};

const fileMessage = {
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
        type: 'file',
        payload: {
          url: 'https://example.com/bot/files/file.doc',
        },
      },
    ],
  },
};

const fallbackMessage = {
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
        type: 'fallback',
        payload: null,
        title: 'TITLE_OF_THE_URL_ATTACHMENT',
        URL: 'URL_OF_THE_ATTACHMENT',
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

const payment = {
  recipient: {
    id: 'PAGE_ID',
  },
  timestamp: 1473208792799,
  sender: {
    id: 'USER_ID',
  },
  payment: {
    payload: 'DEVELOPER_DEFINED_PAYLOAD',
    requested_user_info: {
      shipping_address: {},
      contact_name: 'Peter Chang',
      contact_email: 'peter@anemail.com',
      contact_phone: '+15105551234',
    },
    payment_credential: {
      provider_type: 'paypal',
      charge_id: 'ch_18tmdBEoNIH3FPJHa60ep123',
      fb_payment_id: '123456789',
    },
    amount: {
      currency: 'USD',
      amount: '29.62',
    },
    shipping_option_id: '123',
  },
};

const policyEnforcement = {
  recipient: {
    id: '404217156637689',
  },
  timestamp: 1458692752478,
  'policy-enforcement': {
    action: 'block',
    reason:
      'The bot violated our Platform Policies (https://developers.facebook.com/policy/#messengerplatform). Common violations include sending out excessive spammy messages or being non-functional.',
  },
};

const appRoles = {
  recipient: {
    id: '404217156637689',
  },
  timestamp: 1458692752478,
  app_roles: {
    '123456789': ['automation'],
  },
};

const passThreadControl = {
  sender: {
    id: '404217156637689',
  },
  recipient: {
    id: '1423587017700273',
  },
  timestamp: 1458692752478,
  pass_thread_control: {
    new_owner_app_id: '123456789',
    metadata: 'additional content that the caller wants to set',
  },
};

const takeThreadControl = {
  sender: {
    id: '404217156637689',
  },
  recipient: {
    id: '1423587017700273',
  },
  timestamp: 1458692752478,
  take_thread_control: {
    previous_owner_app_id: '123456789',
    metadata: 'additional content that the caller wants to set',
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
  expect(new MessengerEvent(payment).rawEvent).toEqual(payment);
});

it('#isMessage', () => {
  expect(new MessengerEvent(textMessage).isMessage).toEqual(true);
  expect(new MessengerEvent(imageMessage).isMessage).toEqual(true);
  expect(new MessengerEvent(likeStickerMessage).isMessage).toEqual(true);
  expect(new MessengerEvent(quickReplyMessage).isMessage).toEqual(true);
  expect(new MessengerEvent(echoMessage).isMessage).toEqual(true);
  expect(new MessengerEvent(postback).isMessage).toEqual(false);
  expect(new MessengerEvent(payment).isMessage).toEqual(false);
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
  expect(new MessengerEvent(locationMessage).isImageMessage).toEqual(false);
  expect(new MessengerEvent(videoMessage).isImageMessage).toEqual(false);
  expect(new MessengerEvent(audioMessage).isImageMessage).toEqual(false);
  expect(new MessengerEvent(fileMessage).isImageMessage).toEqual(false);
  expect(new MessengerEvent(fallbackMessage).isImageMessage).toEqual(false);
  expect(new MessengerEvent(imageMessage).isImageMessage).toEqual(true);
  expect(new MessengerEvent(likeStickerMessage).isImageMessage).toEqual(true);
});

it('#isAudioMessage', () => {
  expect(new MessengerEvent(textMessage).isAudioMessage).toEqual(false);
  expect(new MessengerEvent(locationMessage).isAudioMessage).toEqual(false);
  expect(new MessengerEvent(videoMessage).isAudioMessage).toEqual(false);
  expect(new MessengerEvent(audioMessage).isAudioMessage).toEqual(true);
  expect(new MessengerEvent(fileMessage).isAudioMessage).toEqual(false);
  expect(new MessengerEvent(fallbackMessage).isAudioMessage).toEqual(false);
  expect(new MessengerEvent(imageMessage).isAudioMessage).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isAudioMessage).toEqual(false);
});

it('#isVideoMessage', () => {
  expect(new MessengerEvent(textMessage).isVideoMessage).toEqual(false);
  expect(new MessengerEvent(locationMessage).isVideoMessage).toEqual(false);
  expect(new MessengerEvent(videoMessage).isVideoMessage).toEqual(true);
  expect(new MessengerEvent(audioMessage).isVideoMessage).toEqual(false);
  expect(new MessengerEvent(fileMessage).isVideoMessage).toEqual(false);
  expect(new MessengerEvent(fallbackMessage).isVideoMessage).toEqual(false);
  expect(new MessengerEvent(imageMessage).isVideoMessage).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isVideoMessage).toEqual(false);
});

it('#isLocationMessage', () => {
  expect(new MessengerEvent(textMessage).isLocationMessage).toEqual(false);
  expect(new MessengerEvent(locationMessage).isLocationMessage).toEqual(true);
  expect(new MessengerEvent(videoMessage).isLocationMessage).toEqual(false);
  expect(new MessengerEvent(audioMessage).isLocationMessage).toEqual(false);
  expect(new MessengerEvent(fileMessage).isLocationMessage).toEqual(false);
  expect(new MessengerEvent(fallbackMessage).isLocationMessage).toEqual(false);
  expect(new MessengerEvent(imageMessage).isLocationMessage).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isLocationMessage).toEqual(
    false
  );
});

it('#isFileMessage', () => {
  expect(new MessengerEvent(textMessage).isFileMessage).toEqual(false);
  expect(new MessengerEvent(locationMessage).isFileMessage).toEqual(false);
  expect(new MessengerEvent(videoMessage).isFileMessage).toEqual(false);
  expect(new MessengerEvent(audioMessage).isFileMessage).toEqual(false);
  expect(new MessengerEvent(fileMessage).isFileMessage).toEqual(true);
  expect(new MessengerEvent(fallbackMessage).isFileMessage).toEqual(false);
  expect(new MessengerEvent(imageMessage).isFileMessage).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isFileMessage).toEqual(false);
});

it('#isFallbackMessage', () => {
  expect(new MessengerEvent(textMessage).isFallbackMessage).toEqual(false);
  expect(new MessengerEvent(locationMessage).isFallbackMessage).toEqual(false);
  expect(new MessengerEvent(videoMessage).isFallbackMessage).toEqual(false);
  expect(new MessengerEvent(audioMessage).isFallbackMessage).toEqual(false);
  expect(new MessengerEvent(fileMessage).isFallbackMessage).toEqual(false);
  expect(new MessengerEvent(fallbackMessage).isFallbackMessage).toEqual(true);
  expect(new MessengerEvent(imageMessage).isFallbackMessage).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isFallbackMessage).toEqual(
    false
  );
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
  expect(new MessengerEvent(payment).isPostback).toEqual(false);
});

it('#postback', () => {
  expect(new MessengerEvent(postback).postback).toEqual({
    payload: 'USER_DEFINED_PAYLOAD',
  });
});

it('#isPayload', () => {
  expect(new MessengerEvent(textMessage).isPayload).toEqual(false);
  expect(new MessengerEvent(imageMessage).isPayload).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isPayload).toEqual(false);
  expect(new MessengerEvent(echoMessage).isPayload).toEqual(false);
  expect(new MessengerEvent(quickReplyMessage).isPayload).toEqual(true);
  expect(new MessengerEvent(postback).isPayload).toEqual(true);
});

it('#postback', () => {
  expect(new MessengerEvent(postback).payload).toEqual('USER_DEFINED_PAYLOAD');
  expect(new MessengerEvent(quickReplyMessage).payload).toEqual(
    'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED'
  );
  expect(new MessengerEvent(textMessage).payload).toEqual(null);
});

it('#isPayment', () => {
  expect(new MessengerEvent(textMessage).isPayment).toEqual(false);
  expect(new MessengerEvent(imageMessage).isPayment).toEqual(false);
  expect(new MessengerEvent(likeStickerMessage).isPayment).toEqual(false);
  expect(new MessengerEvent(echoMessage).isPayment).toEqual(false);
  expect(new MessengerEvent(quickReplyMessage).isPayment).toEqual(false);
  expect(new MessengerEvent(postback).isPayment).toEqual(false);
  expect(new MessengerEvent(payment).isPayment).toEqual(true);
});

it('#payment', () => {
  expect(new MessengerEvent(textMessage).payment).toEqual(null);
  expect(new MessengerEvent(payment).payment).toEqual({
    payload: 'DEVELOPER_DEFINED_PAYLOAD',
    requested_user_info: {
      shipping_address: {},
      contact_name: 'Peter Chang',
      contact_email: 'peter@anemail.com',
      contact_phone: '+15105551234',
    },
    payment_credential: {
      provider_type: 'paypal',
      charge_id: 'ch_18tmdBEoNIH3FPJHa60ep123',
      fb_payment_id: '123456789',
    },
    amount: {
      currency: 'USD',
      amount: '29.62',
    },
    shipping_option_id: '123',
  });
});

it('#isPolicyEnforcement', () => {
  expect(new MessengerEvent(textMessage).isPolicyEnforcement).toEqual(false);
  expect(new MessengerEvent(postback).isPolicyEnforcement).toEqual(false);
  expect(new MessengerEvent(policyEnforcement).isPolicyEnforcement).toEqual(
    true
  );
});

it('#policyEnforcement', () => {
  expect(new MessengerEvent(textMessage).policyEnforcement).toEqual(null);
  expect(new MessengerEvent(postback).policyEnforcement).toEqual(null);
  expect(new MessengerEvent(policyEnforcement).policyEnforcement).toEqual({
    action: 'block',
    reason:
      'The bot violated our Platform Policies (https://developers.facebook.com/policy/#messengerplatform). Common violations include sending out excessive spammy messages or being non-functional.',
  });
});

it('#isAppRoles', () => {
  expect(new MessengerEvent(textMessage).isAppRoles).toEqual(false);
  expect(new MessengerEvent(postback).isAppRoles).toEqual(false);
  expect(new MessengerEvent(appRoles).isAppRoles).toEqual(true);
});

it('#appRoles', () => {
  expect(new MessengerEvent(textMessage).appRoles).toEqual(null);
  expect(new MessengerEvent(postback).appRoles).toEqual(null);
  expect(new MessengerEvent(appRoles).appRoles).toEqual({
    '123456789': ['automation'],
  });
});

it('#isStandby', () => {
  expect(new MessengerEvent(textMessage).isStandby).toEqual(false);
  expect(
    new MessengerEvent(textMessage, { isStandby: false }).isStandby
  ).toEqual(false);
  expect(
    new MessengerEvent(textMessage, { isStandby: true }).isStandby
  ).toEqual(true);
});

it('#isPassThreadControl', () => {
  expect(new MessengerEvent(textMessage).isPassThreadControl).toEqual(false);
  expect(new MessengerEvent(postback).isPassThreadControl).toEqual(false);
  expect(new MessengerEvent(passThreadControl).isPassThreadControl).toEqual(
    true
  );
});

it('#passThreadControl', () => {
  expect(new MessengerEvent(textMessage).passThreadControl).toEqual(null);
  expect(new MessengerEvent(postback).passThreadControl).toEqual(null);
  expect(new MessengerEvent(passThreadControl).passThreadControl).toEqual({
    metadata: 'additional content that the caller wants to set',
    new_owner_app_id: '123456789',
  });
});

it('#isTakeThreadControl', () => {
  expect(new MessengerEvent(textMessage).isTakeThreadControl).toEqual(false);
  expect(new MessengerEvent(postback).isTakeThreadControl).toEqual(false);
  expect(new MessengerEvent(takeThreadControl).isTakeThreadControl).toEqual(
    true
  );
});

it('#takeThreadControl', () => {
  expect(new MessengerEvent(textMessage).takeThreadControl).toEqual(null);
  expect(new MessengerEvent(postback).takeThreadControl).toEqual(null);
  expect(new MessengerEvent(takeThreadControl).takeThreadControl).toEqual({
    metadata: 'additional content that the caller wants to set',
    previous_owner_app_id: '123456789',
  });
});
