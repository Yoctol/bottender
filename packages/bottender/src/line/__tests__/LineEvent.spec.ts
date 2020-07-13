import LineEvent from '../LineEvent';

const textMessage = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  message: {
    id: '325708',
    type: 'text',
    text: 'Hello, world! (love)',
    emojis: [
      {
        index: 14,
        length: 6,
        productId: '5ac1bfd5040ab15980c9b435',
        emojiId: '001',
      },
    ],
  },
};

const imageMessage = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  message: {
    id: '325708',
    type: 'image',
  },
};

const videoMessage = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  message: {
    id: '325708',
    type: 'video',
  },
};

const audioMessage = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  message: {
    id: '325708',
    type: 'audio',
  },
};

const locationMessage = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  message: {
    id: '325708',
    type: 'location',
    title: 'my location',
    address: 'Golden Gate Bridge, San Francisco, CA, United States',
    latitude: 37.819722,
    longitude: -122.478611,
  },
};

const stickerMessage = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  message: {
    id: '325708',
    type: 'sticker',
    packageId: '1',
    stickerId: '1',
  },
};

const follow = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'follow',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
};

const unfollow = {
  type: 'unfollow',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
};

const join = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'join',
  timestamp: 1462629479859,
  source: {
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
};

const leave = {
  type: 'leave',
  timestamp: 1462629479859,
  source: {
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
};

const postback = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'postback',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  postback: {
    data: 'action=buyItem&itemId=123123&color=red',
  },
};

const datePostback = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'postback',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  postback: {
    data: 'action=buyItem&itemId=123123&color=red',
    params: {
      date: '2017-09-06',
    },
  },
};

const timePostback = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'postback',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  postback: {
    data: 'action=buyItem&itemId=123123&color=red',
    params: {
      time: '12:30',
    },
  },
};

const datetimePostback = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'postback',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  postback: {
    data: 'action=buyItem&itemId=123123&color=red',
    params: {
      datetime: '2017-09-06T12:30',
    },
  },
};

const beacon = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'beacon',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  beacon: {
    hwid: 'd41d8cd98f',
    type: 'enter',
  },
};

const accountLink = {
  type: 'accountLink',
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  source: {
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
    type: 'user',
  },
  timestamp: 1513669370317,
  link: {
    result: 'ok',
    nonce: 'xxxxxxxxxxxxxxx',
  },
};

const memberJoined = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'memberJoined',
  timestamp: 1462629479859,
  source: {
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  joined: {
    members: [
      {
        type: 'user',
        userId: 'U4af4980629...',
      },
      {
        type: 'user',
        userId: 'U91eeaf62d9...',
      },
    ],
  },
};

const memberLeft = {
  type: 'memberLeft',
  timestamp: 1462629479960,
  source: {
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  left: {
    members: [
      {
        type: 'user',
        userId: 'U4af4980629...',
      },
      {
        type: 'user',
        userId: 'U91eeaf62d9...',
      },
    ],
  },
};

const thingsLink = {
  type: 'things',
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  things: {
    deviceId: 't2c449c9d1...',
    type: 'link',
  },
};

const thingsUnlink = {
  type: 'things',
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  things: {
    deviceId: 't2c449c9d1...',
    type: 'unlink',
  },
};

const thingsScenarioResult = {
  type: 'things',
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  source: {
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
    type: 'user',
  },
  mode: 'active',
  timestamp: 1547817848122,
  things: {
    type: 'scenarioResult',
    deviceId: 'tXXX',
    result: {
      scenarioId: 'XXX',
      revision: 2,
      startTime: 1547817845950,
      endTime: 1547817845952,
      resultCode: 'success',
      bleNotificationPayload: 'AQ==',
      actionResults: [
        {
          type: 'binary',
          data: '/w==',
        },
      ],
    },
  },
};

const noSourceMessage = {};

const destination = 'Uea8667adaf43586706170ff25ff47ae6';

it('#rawEvent', () => {
  expect(new LineEvent(textMessage).rawEvent).toEqual(textMessage);
  expect(new LineEvent(imageMessage).rawEvent).toEqual(imageMessage);
  expect(new LineEvent(videoMessage).rawEvent).toEqual(videoMessage);
  expect(new LineEvent(audioMessage).rawEvent).toEqual(audioMessage);
  expect(new LineEvent(locationMessage).rawEvent).toEqual(locationMessage);
  expect(new LineEvent(stickerMessage).rawEvent).toEqual(stickerMessage);
  expect(new LineEvent(follow).rawEvent).toEqual(follow);
  expect(new LineEvent(unfollow).rawEvent).toEqual(unfollow);
  expect(new LineEvent(join).rawEvent).toEqual(join);
  expect(new LineEvent(leave).rawEvent).toEqual(leave);
  expect(new LineEvent(postback).rawEvent).toEqual(postback);
  expect(new LineEvent(beacon).rawEvent).toEqual(beacon);
  expect(new LineEvent(memberJoined).rawEvent).toEqual(memberJoined);
  expect(new LineEvent(memberLeft).rawEvent).toEqual(memberLeft);
  expect(new LineEvent(thingsLink).rawEvent).toEqual(thingsLink);
  expect(new LineEvent(thingsUnlink).rawEvent).toEqual(thingsUnlink);
  expect(new LineEvent(thingsScenarioResult).rawEvent).toEqual(
    thingsScenarioResult
  );
});

it('#destination', () => {
  expect(new LineEvent(textMessage, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );

  expect(new LineEvent(textMessage).destination).toEqual(null);
});

it('#replyToken', () => {
  expect(new LineEvent(textMessage).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(follow).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(unfollow).replyToken).toEqual(null);
  expect(new LineEvent(join).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(leave).replyToken).toEqual(null);
  expect(new LineEvent(postback).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(beacon).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(accountLink).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(memberJoined).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(memberLeft).replyToken).toEqual(null);

  expect(new LineEvent(thingsLink).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(thingsUnlink).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(thingsScenarioResult).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
});

it('#source', () => {
  expect(new LineEvent(textMessage).source).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(follow).source).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(unfollow).source).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(join).source).toEqual({
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  });
  expect(new LineEvent(leave).source).toEqual({
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  });
  expect(new LineEvent(postback).source).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(beacon).source).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(accountLink).source).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(memberJoined).source).toEqual({
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  });
  expect(new LineEvent(memberLeft).source).toEqual({
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  });
  expect(new LineEvent(thingsLink).source).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(thingsUnlink).source).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(thingsScenarioResult).source).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(noSourceMessage).source).toEqual(null);
});

it('#timestamp', () => {
  expect(new LineEvent(textMessage).timestamp).toEqual(1462629479859);
  expect(new LineEvent(follow).timestamp).toEqual(1462629479859);
  expect(new LineEvent(unfollow).timestamp).toEqual(1462629479859);
  expect(new LineEvent(join).timestamp).toEqual(1462629479859);
  expect(new LineEvent(leave).timestamp).toEqual(1462629479859);
  expect(new LineEvent(postback).timestamp).toEqual(1462629479859);
  expect(new LineEvent(beacon).timestamp).toEqual(1462629479859);
  expect(new LineEvent(accountLink).timestamp).toEqual(1513669370317);
  expect(new LineEvent(memberJoined).timestamp).toEqual(1462629479859);
  expect(new LineEvent(memberLeft).timestamp).toEqual(1462629479960);
  expect(new LineEvent(thingsLink).timestamp).toEqual(1462629479859);
  expect(new LineEvent(thingsUnlink).timestamp).toEqual(1462629479859);
  expect(new LineEvent(thingsScenarioResult).timestamp).toEqual(1547817848122);
});

it('#isMessage', () => {
  expect(new LineEvent(textMessage).isMessage).toEqual(true);
  expect(new LineEvent(follow).isMessage).toEqual(false);
  expect(new LineEvent(unfollow).isMessage).toEqual(false);
  expect(new LineEvent(join).isMessage).toEqual(false);
  expect(new LineEvent(leave).isMessage).toEqual(false);
  expect(new LineEvent(postback).isMessage).toEqual(false);
  expect(new LineEvent(beacon).isMessage).toEqual(false);
  expect(new LineEvent(accountLink).isMessage).toEqual(false);
  expect(new LineEvent(memberJoined).isMessage).toEqual(false);
  expect(new LineEvent(memberLeft).isMessage).toEqual(false);
  expect(new LineEvent(thingsLink).isMessage).toEqual(false);
  expect(new LineEvent(thingsUnlink).isMessage).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isMessage).toEqual(false);
});

it('#message', () => {
  expect(new LineEvent(textMessage).message).toEqual({
    id: '325708',
    type: 'text',
    text: 'Hello, world! (love)',
    emojis: [
      {
        index: 14,
        length: 6,
        productId: '5ac1bfd5040ab15980c9b435',
        emojiId: '001',
      },
    ],
  });
  expect(new LineEvent(imageMessage).message).toEqual({
    id: '325708',
    type: 'image',
  });
  expect(new LineEvent(videoMessage).message).toEqual({
    id: '325708',
    type: 'video',
  });
  expect(new LineEvent(audioMessage).message).toEqual({
    id: '325708',
    type: 'audio',
  });
  expect(new LineEvent(locationMessage).message).toEqual({
    id: '325708',
    type: 'location',
    title: 'my location',
    address: 'Golden Gate Bridge, San Francisco, CA, United States',
    latitude: 37.819722,
    longitude: -122.478611,
  });
  expect(new LineEvent(stickerMessage).message).toEqual({
    id: '325708',
    type: 'sticker',
    packageId: '1',
    stickerId: '1',
  });
  expect(new LineEvent(beacon).message).toEqual(null);
  expect(new LineEvent(accountLink).message).toEqual(null);
  expect(new LineEvent(memberJoined).message).toEqual(null);
  expect(new LineEvent(memberLeft).message).toEqual(null);
  expect(new LineEvent(thingsLink).message).toEqual(null);
  expect(new LineEvent(thingsUnlink).message).toEqual(null);
  expect(new LineEvent(thingsScenarioResult).message).toEqual(null);
});

it('#isText', () => {
  expect(new LineEvent(textMessage).isText).toEqual(true);
  expect(new LineEvent(imageMessage).isText).toEqual(false);
  expect(new LineEvent(videoMessage).isText).toEqual(false);
  expect(new LineEvent(audioMessage).isText).toEqual(false);
  expect(new LineEvent(locationMessage).isText).toEqual(false);
  expect(new LineEvent(stickerMessage).isText).toEqual(false);
});

it('#text', () => {
  expect(new LineEvent(textMessage).text).toEqual('Hello, world! (love)');
  expect(new LineEvent(imageMessage).text).toEqual(null);
  expect(new LineEvent(videoMessage).text).toEqual(null);
  expect(new LineEvent(audioMessage).text).toEqual(null);
  expect(new LineEvent(locationMessage).text).toEqual(null);
  expect(new LineEvent(stickerMessage).text).toEqual(null);
});

it('#isImage', () => {
  expect(new LineEvent(textMessage).isImage).toEqual(false);
  expect(new LineEvent(imageMessage).isImage).toEqual(true);
  expect(new LineEvent(videoMessage).isImage).toEqual(false);
  expect(new LineEvent(audioMessage).isImage).toEqual(false);
  expect(new LineEvent(locationMessage).isImage).toEqual(false);
  expect(new LineEvent(stickerMessage).isImage).toEqual(false);
});

it('#image', () => {
  expect(new LineEvent(textMessage).image).toEqual(null);
  expect(new LineEvent(imageMessage).image).toEqual({
    id: '325708',
    type: 'image',
  });
  expect(new LineEvent(videoMessage).image).toEqual(null);
  expect(new LineEvent(audioMessage).image).toEqual(null);
  expect(new LineEvent(locationMessage).image).toEqual(null);
  expect(new LineEvent(stickerMessage).image).toEqual(null);
});

it('#isVideo', () => {
  expect(new LineEvent(textMessage).isVideo).toEqual(false);
  expect(new LineEvent(imageMessage).isVideo).toEqual(false);
  expect(new LineEvent(videoMessage).isVideo).toEqual(true);
  expect(new LineEvent(audioMessage).isVideo).toEqual(false);
  expect(new LineEvent(locationMessage).isVideo).toEqual(false);
  expect(new LineEvent(stickerMessage).isVideo).toEqual(false);
});

it('#video', () => {
  expect(new LineEvent(textMessage).video).toEqual(null);
  expect(new LineEvent(imageMessage).video).toEqual(null);
  expect(new LineEvent(videoMessage).video).toEqual({
    id: '325708',
    type: 'video',
  });
  expect(new LineEvent(audioMessage).video).toEqual(null);
  expect(new LineEvent(locationMessage).video).toEqual(null);
  expect(new LineEvent(stickerMessage).video).toEqual(null);
});

it('#isAudio', () => {
  expect(new LineEvent(textMessage).isAudio).toEqual(false);
  expect(new LineEvent(imageMessage).isAudio).toEqual(false);
  expect(new LineEvent(videoMessage).isAudio).toEqual(false);
  expect(new LineEvent(audioMessage).isAudio).toEqual(true);
  expect(new LineEvent(locationMessage).isAudio).toEqual(false);
  expect(new LineEvent(stickerMessage).isAudio).toEqual(false);
});

it('#audio', () => {
  expect(new LineEvent(textMessage).audio).toEqual(null);
  expect(new LineEvent(imageMessage).audio).toEqual(null);
  expect(new LineEvent(videoMessage).audio).toEqual(null);
  expect(new LineEvent(audioMessage).audio).toEqual({
    id: '325708',
    type: 'audio',
  });
  expect(new LineEvent(locationMessage).audio).toEqual(null);
  expect(new LineEvent(stickerMessage).audio).toEqual(null);
});

it('#isLocation', () => {
  expect(new LineEvent(textMessage).isLocation).toEqual(false);
  expect(new LineEvent(imageMessage).isLocation).toEqual(false);
  expect(new LineEvent(videoMessage).isLocation).toEqual(false);
  expect(new LineEvent(audioMessage).isLocation).toEqual(false);
  expect(new LineEvent(locationMessage).isLocation).toEqual(true);
  expect(new LineEvent(stickerMessage).isLocation).toEqual(false);
});

it('#location', () => {
  expect(new LineEvent(textMessage).location).toEqual(null);
  expect(new LineEvent(imageMessage).location).toEqual(null);
  expect(new LineEvent(videoMessage).location).toEqual(null);
  expect(new LineEvent(audioMessage).location).toEqual(null);
  expect(new LineEvent(locationMessage).location).toEqual({
    address: 'Golden Gate Bridge, San Francisco, CA, United States',
    id: '325708',
    latitude: 37.819722,
    longitude: -122.478611,
    title: 'my location',
    type: 'location',
  });
  expect(new LineEvent(stickerMessage).location).toEqual(null);
});

it('#isSticker', () => {
  expect(new LineEvent(textMessage).isSticker).toEqual(false);
  expect(new LineEvent(imageMessage).isSticker).toEqual(false);
  expect(new LineEvent(videoMessage).isSticker).toEqual(false);
  expect(new LineEvent(audioMessage).isSticker).toEqual(false);
  expect(new LineEvent(locationMessage).isSticker).toEqual(false);
  expect(new LineEvent(stickerMessage).isSticker).toEqual(true);
});

it('#sticker', () => {
  expect(new LineEvent(textMessage).sticker).toEqual(null);
  expect(new LineEvent(imageMessage).sticker).toEqual(null);
  expect(new LineEvent(videoMessage).sticker).toEqual(null);
  expect(new LineEvent(audioMessage).sticker).toEqual(null);
  expect(new LineEvent(locationMessage).sticker).toEqual(null);
  expect(new LineEvent(stickerMessage).sticker).toEqual({
    id: '325708',
    packageId: '1',
    stickerId: '1',
    type: 'sticker',
  });
});

it('#isFollow', () => {
  expect(new LineEvent(textMessage).isFollow).toEqual(false);
  expect(new LineEvent(follow).isFollow).toEqual(true);
  expect(new LineEvent(unfollow).isFollow).toEqual(false);
  expect(new LineEvent(join).isFollow).toEqual(false);
  expect(new LineEvent(leave).isFollow).toEqual(false);
  expect(new LineEvent(postback).isFollow).toEqual(false);
  expect(new LineEvent(beacon).isFollow).toEqual(false);
  expect(new LineEvent(memberJoined).isFollow).toEqual(false);
  expect(new LineEvent(memberLeft).isFollow).toEqual(false);
  expect(new LineEvent(thingsLink).isMessage).toEqual(false);
  expect(new LineEvent(thingsLink).isFollow).toEqual(false);
  expect(new LineEvent(thingsUnlink).isFollow).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isFollow).toEqual(false);
});

it('#follow', () => {
  expect(new LineEvent(textMessage).follow).toEqual(null);
  expect(new LineEvent(follow).follow).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(unfollow).follow).toEqual(null);
  expect(new LineEvent(join).follow).toEqual(null);
  expect(new LineEvent(leave).follow).toEqual(null);
  expect(new LineEvent(postback).follow).toEqual(null);
  expect(new LineEvent(beacon).follow).toEqual(null);
  expect(new LineEvent(memberJoined).follow).toEqual(null);
  expect(new LineEvent(memberLeft).follow).toEqual(null);
  expect(new LineEvent(thingsLink).follow).toEqual(null);
  expect(new LineEvent(thingsUnlink).follow).toEqual(null);
  expect(new LineEvent(thingsScenarioResult).follow).toEqual(null);
});

it('#isUnfollow', () => {
  expect(new LineEvent(textMessage).isUnfollow).toEqual(false);
  expect(new LineEvent(follow).isUnfollow).toEqual(false);
  expect(new LineEvent(unfollow).isUnfollow).toEqual(true);
  expect(new LineEvent(join).isUnfollow).toEqual(false);
  expect(new LineEvent(leave).isUnfollow).toEqual(false);
  expect(new LineEvent(postback).isUnfollow).toEqual(false);
  expect(new LineEvent(beacon).isUnfollow).toEqual(false);
  expect(new LineEvent(accountLink).isUnfollow).toEqual(false);
  expect(new LineEvent(memberJoined).isUnfollow).toEqual(false);
  expect(new LineEvent(memberLeft).isUnfollow).toEqual(false);
  expect(new LineEvent(thingsLink).isUnfollow).toEqual(false);
  expect(new LineEvent(thingsUnlink).isUnfollow).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isUnfollow).toEqual(false);
});

it('#unfollow', () => {
  expect(new LineEvent(textMessage).unfollow).toEqual(null);
  expect(new LineEvent(follow).unfollow).toEqual(null);
  expect(new LineEvent(unfollow).unfollow).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(join).unfollow).toEqual(null);
  expect(new LineEvent(leave).unfollow).toEqual(null);
  expect(new LineEvent(postback).unfollow).toEqual(null);
  expect(new LineEvent(beacon).unfollow).toEqual(null);
  expect(new LineEvent(accountLink).unfollow).toEqual(null);
  expect(new LineEvent(memberJoined).unfollow).toEqual(null);
  expect(new LineEvent(memberLeft).unfollow).toEqual(null);
  expect(new LineEvent(thingsLink).unfollow).toEqual(null);
  expect(new LineEvent(thingsUnlink).unfollow).toEqual(null);
  expect(new LineEvent(thingsScenarioResult).unfollow).toEqual(null);
});

it('#isJoin', () => {
  expect(new LineEvent(textMessage).isJoin).toEqual(false);
  expect(new LineEvent(follow).isJoin).toEqual(false);
  expect(new LineEvent(unfollow).isJoin).toEqual(false);
  expect(new LineEvent(join).isJoin).toEqual(true);
  expect(new LineEvent(leave).isJoin).toEqual(false);
  expect(new LineEvent(postback).isJoin).toEqual(false);
  expect(new LineEvent(beacon).isJoin).toEqual(false);
  expect(new LineEvent(accountLink).isJoin).toEqual(false);
  expect(new LineEvent(memberJoined).isJoin).toEqual(false);
  expect(new LineEvent(memberLeft).isJoin).toEqual(false);
  expect(new LineEvent(thingsLink).isJoin).toEqual(false);
  expect(new LineEvent(thingsUnlink).isJoin).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isJoin).toEqual(false);
});

it('#join', () => {
  expect(new LineEvent(textMessage).join).toEqual(null);
  expect(new LineEvent(follow).join).toEqual(null);
  expect(new LineEvent(unfollow).join).toEqual(null);
  expect(new LineEvent(join).join).toEqual({
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  });
  expect(new LineEvent(leave).join).toEqual(null);
  expect(new LineEvent(postback).join).toEqual(null);
  expect(new LineEvent(beacon).join).toEqual(null);
  expect(new LineEvent(accountLink).join).toEqual(null);
  expect(new LineEvent(memberJoined).join).toEqual(null);
  expect(new LineEvent(memberLeft).join).toEqual(null);
  expect(new LineEvent(thingsLink).join).toEqual(null);
  expect(new LineEvent(thingsUnlink).join).toEqual(null);
  expect(new LineEvent(thingsScenarioResult).join).toEqual(null);
});

it('#isLeave', () => {
  expect(new LineEvent(textMessage).isLeave).toEqual(false);
  expect(new LineEvent(follow).isLeave).toEqual(false);
  expect(new LineEvent(unfollow).isLeave).toEqual(false);
  expect(new LineEvent(join).isLeave).toEqual(false);
  expect(new LineEvent(leave).isLeave).toEqual(true);
  expect(new LineEvent(postback).isLeave).toEqual(false);
  expect(new LineEvent(beacon).isLeave).toEqual(false);
  expect(new LineEvent(accountLink).isLeave).toEqual(false);
  expect(new LineEvent(memberJoined).isLeave).toEqual(false);
  expect(new LineEvent(memberLeft).isLeave).toEqual(false);
  expect(new LineEvent(thingsLink).isLeave).toEqual(false);
  expect(new LineEvent(thingsUnlink).isLeave).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isLeave).toEqual(false);
});

it('#leave', () => {
  expect(new LineEvent(textMessage).leave).toEqual(null);
  expect(new LineEvent(follow).leave).toEqual(null);
  expect(new LineEvent(unfollow).leave).toEqual(null);
  expect(new LineEvent(join).leave).toEqual(null);
  expect(new LineEvent(leave).leave).toEqual({
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  });
  expect(new LineEvent(postback).leave).toEqual(null);
  expect(new LineEvent(beacon).leave).toEqual(null);
  expect(new LineEvent(accountLink).leave).toEqual(null);
  expect(new LineEvent(memberJoined).leave).toEqual(null);
  expect(new LineEvent(memberLeft).leave).toEqual(null);
  expect(new LineEvent(thingsLink).leave).toEqual(null);
  expect(new LineEvent(thingsUnlink).leave).toEqual(null);
  expect(new LineEvent(thingsScenarioResult).leave).toEqual(null);
});

it('#isPostback', () => {
  expect(new LineEvent(textMessage).isPostback).toEqual(false);
  expect(new LineEvent(follow).isPostback).toEqual(false);
  expect(new LineEvent(unfollow).isPostback).toEqual(false);
  expect(new LineEvent(join).isPostback).toEqual(false);
  expect(new LineEvent(leave).isPostback).toEqual(false);
  expect(new LineEvent(postback).isPostback).toEqual(true);
  expect(new LineEvent(datePostback).isPostback).toEqual(true);
  expect(new LineEvent(timePostback).isPostback).toEqual(true);
  expect(new LineEvent(datetimePostback).isPostback).toEqual(true);
  expect(new LineEvent(beacon).isPostback).toEqual(false);
  expect(new LineEvent(accountLink).isPostback).toEqual(false);
  expect(new LineEvent(memberJoined).isPostback).toEqual(false);
  expect(new LineEvent(memberLeft).isPostback).toEqual(false);
  expect(new LineEvent(thingsLink).isPostback).toEqual(false);
  expect(new LineEvent(thingsUnlink).isPostback).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isPostback).toEqual(false);
});

it('#postback', () => {
  expect(new LineEvent(textMessage).postback).toEqual(null);
  expect(new LineEvent(postback).postback).toEqual({
    data: 'action=buyItem&itemId=123123&color=red',
  });
  expect(new LineEvent(datePostback).postback).toEqual({
    data: 'action=buyItem&itemId=123123&color=red',
    params: {
      date: '2017-09-06',
    },
  });
  expect(new LineEvent(timePostback).postback).toEqual({
    data: 'action=buyItem&itemId=123123&color=red',
    params: {
      time: '12:30',
    },
  });
  expect(new LineEvent(datetimePostback).postback).toEqual({
    data: 'action=buyItem&itemId=123123&color=red',
    params: {
      datetime: '2017-09-06T12:30',
    },
  });
});

it('#isPayload', () => {
  expect(new LineEvent(textMessage).isPayload).toEqual(false);
  expect(new LineEvent(follow).isPayload).toEqual(false);
  expect(new LineEvent(unfollow).isPayload).toEqual(false);
  expect(new LineEvent(join).isPayload).toEqual(false);
  expect(new LineEvent(leave).isPayload).toEqual(false);
  expect(new LineEvent(postback).isPayload).toEqual(true);
  expect(new LineEvent(datePostback).isPayload).toEqual(true);
  expect(new LineEvent(timePostback).isPayload).toEqual(true);
  expect(new LineEvent(datetimePostback).isPayload).toEqual(true);
  expect(new LineEvent(beacon).isPayload).toEqual(false);
  expect(new LineEvent(accountLink).isPayload).toEqual(false);
  expect(new LineEvent(memberJoined).isPayload).toEqual(false);
  expect(new LineEvent(memberLeft).isPayload).toEqual(false);
  expect(new LineEvent(thingsLink).isPayload).toEqual(false);
  expect(new LineEvent(thingsUnlink).isPayload).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isPayload).toEqual(false);
});

it('#payload', () => {
  expect(new LineEvent(textMessage).payload).toEqual(null);
  expect(new LineEvent(postback).payload).toEqual(
    'action=buyItem&itemId=123123&color=red'
  );
  expect(new LineEvent(datePostback).payload).toEqual(
    'action=buyItem&itemId=123123&color=red'
  );
  expect(new LineEvent(timePostback).payload).toEqual(
    'action=buyItem&itemId=123123&color=red'
  );
  expect(new LineEvent(datetimePostback).payload).toEqual(
    'action=buyItem&itemId=123123&color=red'
  );
});

it('#date', () => {
  expect(new LineEvent(textMessage).date).toEqual(null);
  expect(new LineEvent(postback).date).toEqual(null);
  expect(new LineEvent(datePostback).date).toEqual('2017-09-06');
  expect(new LineEvent(timePostback).date).toEqual(null);
  expect(new LineEvent(datetimePostback).date).toEqual(null);
});

it('#time', () => {
  expect(new LineEvent(textMessage).time).toEqual(null);
  expect(new LineEvent(postback).time).toEqual(null);
  expect(new LineEvent(datePostback).time).toEqual(null);
  expect(new LineEvent(timePostback).time).toEqual('12:30');
  expect(new LineEvent(datetimePostback).time).toEqual(null);
});

it('#datetime', () => {
  expect(new LineEvent(textMessage).datetime).toEqual(null);
  expect(new LineEvent(postback).datetime).toEqual(null);
  expect(new LineEvent(datePostback).datetime).toEqual(null);
  expect(new LineEvent(timePostback).datetime).toEqual(null);
  expect(new LineEvent(datetimePostback).datetime).toEqual('2017-09-06T12:30');
});

it('#isBeacon', () => {
  expect(new LineEvent(textMessage).isBeacon).toEqual(false);
  expect(new LineEvent(follow).isBeacon).toEqual(false);
  expect(new LineEvent(unfollow).isBeacon).toEqual(false);
  expect(new LineEvent(join).isBeacon).toEqual(false);
  expect(new LineEvent(leave).isBeacon).toEqual(false);
  expect(new LineEvent(postback).isBeacon).toEqual(false);
  expect(new LineEvent(beacon).isBeacon).toEqual(true);
  expect(new LineEvent(accountLink).isBeacon).toEqual(false);
  expect(new LineEvent(memberJoined).isBeacon).toEqual(false);
  expect(new LineEvent(memberLeft).isBeacon).toEqual(false);
  expect(new LineEvent(thingsLink).isBeacon).toEqual(false);
  expect(new LineEvent(thingsUnlink).isBeacon).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isBeacon).toEqual(false);
});

it('#beacon', () => {
  expect(new LineEvent(textMessage).beacon).toEqual(null);
  expect(new LineEvent(follow).beacon).toEqual(null);
  expect(new LineEvent(unfollow).beacon).toEqual(null);
  expect(new LineEvent(join).beacon).toEqual(null);
  expect(new LineEvent(leave).beacon).toEqual(null);
  expect(new LineEvent(postback).beacon).toEqual(null);
  expect(new LineEvent(beacon).beacon).toEqual({
    hwid: 'd41d8cd98f',
    type: 'enter',
  });
  expect(new LineEvent(accountLink).beacon).toEqual(null);
  expect(new LineEvent(memberJoined).beacon).toEqual(null);
  expect(new LineEvent(memberLeft).beacon).toEqual(null);
  expect(new LineEvent(thingsLink).beacon).toEqual(null);
  expect(new LineEvent(thingsUnlink).beacon).toEqual(null);
  expect(new LineEvent(thingsScenarioResult).beacon).toEqual(null);
});

it('#isAccountLink', () => {
  expect(new LineEvent(textMessage).isAccountLink).toEqual(false);
  expect(new LineEvent(follow).isAccountLink).toEqual(false);
  expect(new LineEvent(unfollow).isAccountLink).toEqual(false);
  expect(new LineEvent(join).isAccountLink).toEqual(false);
  expect(new LineEvent(leave).isAccountLink).toEqual(false);
  expect(new LineEvent(postback).isAccountLink).toEqual(false);
  expect(new LineEvent(beacon).isAccountLink).toEqual(false);
  expect(new LineEvent(accountLink).isAccountLink).toEqual(true);
  expect(new LineEvent(memberJoined).isAccountLink).toEqual(false);
  expect(new LineEvent(memberLeft).isAccountLink).toEqual(false);
  expect(new LineEvent(thingsLink).isAccountLink).toEqual(false);
  expect(new LineEvent(thingsUnlink).isAccountLink).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isAccountLink).toEqual(false);
});

it('#accountLink', () => {
  expect(new LineEvent(textMessage).accountLink).toEqual(null);
  expect(new LineEvent(follow).accountLink).toEqual(null);
  expect(new LineEvent(unfollow).accountLink).toEqual(null);
  expect(new LineEvent(join).accountLink).toEqual(null);
  expect(new LineEvent(leave).accountLink).toEqual(null);
  expect(new LineEvent(postback).accountLink).toEqual(null);
  expect(new LineEvent(beacon).accountLink).toEqual(null);
  expect(new LineEvent(accountLink).accountLink).toEqual({
    result: 'ok',
    nonce: 'xxxxxxxxxxxxxxx',
  });
  expect(new LineEvent(memberJoined).accountLink).toEqual(null);
  expect(new LineEvent(memberLeft).accountLink).toEqual(null);
  expect(new LineEvent(thingsLink).accountLink).toEqual(null);
  expect(new LineEvent(thingsUnlink).accountLink).toEqual(null);
  expect(new LineEvent(thingsScenarioResult).accountLink).toEqual(null);
});

it('#isMemberJoined', () => {
  expect(new LineEvent(textMessage).isMemberJoined).toEqual(false);
  expect(new LineEvent(follow).isMemberJoined).toEqual(false);
  expect(new LineEvent(unfollow).isMemberJoined).toEqual(false);
  expect(new LineEvent(join).isMemberJoined).toEqual(false);
  expect(new LineEvent(leave).isMemberJoined).toEqual(false);
  expect(new LineEvent(postback).isMemberJoined).toEqual(false);
  expect(new LineEvent(beacon).isMemberJoined).toEqual(false);
  expect(new LineEvent(accountLink).isMemberJoined).toEqual(false);
  expect(new LineEvent(memberJoined).isMemberJoined).toEqual(true);
  expect(new LineEvent(memberLeft).isMemberJoined).toEqual(false);
  expect(new LineEvent(thingsLink).isMemberJoined).toEqual(false);
  expect(new LineEvent(thingsUnlink).isMemberJoined).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isMemberJoined).toEqual(false);
});

it('#memberJoined', () => {
  expect(new LineEvent(textMessage).memberJoined).toEqual(null);
  expect(new LineEvent(follow).memberJoined).toEqual(null);
  expect(new LineEvent(unfollow).memberJoined).toEqual(null);
  expect(new LineEvent(join).memberJoined).toEqual(null);
  expect(new LineEvent(leave).memberJoined).toEqual(null);
  expect(new LineEvent(postback).memberJoined).toEqual(null);
  expect(new LineEvent(beacon).memberJoined).toEqual(null);
  expect(new LineEvent(memberJoined).memberJoined).toEqual({
    members: [
      {
        type: 'user',
        userId: 'U4af4980629...',
      },
      {
        type: 'user',
        userId: 'U91eeaf62d9...',
      },
    ],
  });
  expect(new LineEvent(memberLeft).memberJoined).toEqual(null);
  expect(new LineEvent(thingsLink).memberJoined).toEqual(null);
  expect(new LineEvent(thingsUnlink).memberJoined).toEqual(null);
  expect(new LineEvent(thingsScenarioResult).memberJoined).toEqual(null);
});

it('#isMemberLeft', () => {
  expect(new LineEvent(textMessage).isMemberLeft).toEqual(false);
  expect(new LineEvent(follow).isMemberLeft).toEqual(false);
  expect(new LineEvent(unfollow).isMemberLeft).toEqual(false);
  expect(new LineEvent(join).isMemberLeft).toEqual(false);
  expect(new LineEvent(leave).isMemberLeft).toEqual(false);
  expect(new LineEvent(postback).isMemberLeft).toEqual(false);
  expect(new LineEvent(beacon).isMemberLeft).toEqual(false);
  expect(new LineEvent(accountLink).isMemberLeft).toEqual(false);
  expect(new LineEvent(memberJoined).isMemberLeft).toEqual(false);
  expect(new LineEvent(memberLeft).isMemberLeft).toEqual(true);
  expect(new LineEvent(thingsLink).isMemberLeft).toEqual(false);
  expect(new LineEvent(thingsUnlink).isMemberLeft).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isMemberLeft).toEqual(false);
});

it('#memberLeft', () => {
  expect(new LineEvent(textMessage).memberLeft).toEqual(null);
  expect(new LineEvent(follow).memberLeft).toEqual(null);
  expect(new LineEvent(unfollow).memberLeft).toEqual(null);
  expect(new LineEvent(join).memberLeft).toEqual(null);
  expect(new LineEvent(leave).memberLeft).toEqual(null);
  expect(new LineEvent(postback).memberLeft).toEqual(null);
  expect(new LineEvent(beacon).memberLeft).toEqual(null);
  expect(new LineEvent(memberJoined).memberLeft).toEqual(null);
  expect(new LineEvent(memberLeft).memberLeft).toEqual({
    members: [
      {
        type: 'user',
        userId: 'U4af4980629...',
      },
      {
        type: 'user',
        userId: 'U91eeaf62d9...',
      },
    ],
  });
  expect(new LineEvent(thingsLink).memberLeft).toEqual(null);
  expect(new LineEvent(thingsUnlink).memberLeft).toEqual(null);
  expect(new LineEvent(thingsScenarioResult).memberLeft).toEqual(null);
});

it('#isThingsLink', () => {
  expect(new LineEvent(textMessage).isThingsLink).toEqual(false);
  expect(new LineEvent(follow).isThingsLink).toEqual(false);
  expect(new LineEvent(unfollow).isThingsLink).toEqual(false);
  expect(new LineEvent(join).isThingsLink).toEqual(false);
  expect(new LineEvent(leave).isThingsLink).toEqual(false);
  expect(new LineEvent(postback).isThingsLink).toEqual(false);
  expect(new LineEvent(beacon).isThingsLink).toEqual(false);
  expect(new LineEvent(accountLink).isThingsLink).toEqual(false);
  expect(new LineEvent(memberJoined).isThingsLink).toEqual(false);
  expect(new LineEvent(memberLeft).isThingsLink).toEqual(false);
  expect(new LineEvent(thingsLink).isThingsLink).toEqual(true);
  expect(new LineEvent(thingsUnlink).isThingsLink).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isThingsLink).toEqual(false);
});

it('#isThingsUnlink', () => {
  expect(new LineEvent(textMessage).isThingsUnlink).toEqual(false);
  expect(new LineEvent(follow).isThingsUnlink).toEqual(false);
  expect(new LineEvent(unfollow).isThingsUnlink).toEqual(false);
  expect(new LineEvent(join).isThingsUnlink).toEqual(false);
  expect(new LineEvent(leave).isThingsUnlink).toEqual(false);
  expect(new LineEvent(postback).isThingsUnlink).toEqual(false);
  expect(new LineEvent(beacon).isThingsUnlink).toEqual(false);
  expect(new LineEvent(accountLink).isThingsUnlink).toEqual(false);
  expect(new LineEvent(memberJoined).isThingsUnlink).toEqual(false);
  expect(new LineEvent(memberLeft).isThingsUnlink).toEqual(false);
  expect(new LineEvent(thingsLink).isThingsUnlink).toEqual(false);
  expect(new LineEvent(thingsUnlink).isThingsUnlink).toEqual(true);
  expect(new LineEvent(thingsScenarioResult).isThingsUnlink).toEqual(false);
});

it('#isDeviceLink', () => {
  expect(new LineEvent(textMessage).isDeviceLink).toEqual(false);
  expect(new LineEvent(follow).isDeviceLink).toEqual(false);
  expect(new LineEvent(unfollow).isDeviceLink).toEqual(false);
  expect(new LineEvent(join).isDeviceLink).toEqual(false);
  expect(new LineEvent(leave).isDeviceLink).toEqual(false);
  expect(new LineEvent(postback).isDeviceLink).toEqual(false);
  expect(new LineEvent(beacon).isDeviceLink).toEqual(false);
  expect(new LineEvent(accountLink).isDeviceLink).toEqual(false);
  expect(new LineEvent(memberJoined).isDeviceLink).toEqual(false);
  expect(new LineEvent(memberLeft).isDeviceLink).toEqual(false);
  expect(new LineEvent(thingsLink).isDeviceLink).toEqual(true);
  expect(new LineEvent(thingsUnlink).isDeviceLink).toEqual(false);
  expect(new LineEvent(thingsScenarioResult).isDeviceLink).toEqual(false);
});

it('#isDeviceUnlink', () => {
  expect(new LineEvent(textMessage).isDeviceUnlink).toEqual(false);
  expect(new LineEvent(follow).isDeviceUnlink).toEqual(false);
  expect(new LineEvent(unfollow).isDeviceUnlink).toEqual(false);
  expect(new LineEvent(join).isDeviceUnlink).toEqual(false);
  expect(new LineEvent(leave).isDeviceUnlink).toEqual(false);
  expect(new LineEvent(postback).isDeviceUnlink).toEqual(false);
  expect(new LineEvent(beacon).isDeviceUnlink).toEqual(false);
  expect(new LineEvent(accountLink).isDeviceUnlink).toEqual(false);
  expect(new LineEvent(memberJoined).isDeviceUnlink).toEqual(false);
  expect(new LineEvent(memberLeft).isDeviceUnlink).toEqual(false);
  expect(new LineEvent(thingsLink).isDeviceUnlink).toEqual(false);
  expect(new LineEvent(thingsUnlink).isDeviceUnlink).toEqual(true);
  expect(new LineEvent(thingsScenarioResult).isDeviceUnlink).toEqual(false);
});

it('#things', () => {
  expect(new LineEvent(textMessage).things).toEqual(null);
  expect(new LineEvent(follow).things).toEqual(null);
  expect(new LineEvent(unfollow).things).toEqual(null);
  expect(new LineEvent(join).things).toEqual(null);
  expect(new LineEvent(leave).things).toEqual(null);
  expect(new LineEvent(postback).things).toEqual(null);
  expect(new LineEvent(beacon).things).toEqual(null);
  expect(new LineEvent(memberJoined).things).toEqual(null);
  expect(new LineEvent(memberLeft).things).toEqual(null);
  expect(new LineEvent(thingsLink).things).toEqual({
    deviceId: 't2c449c9d1...',
    type: 'link',
  });
  expect(new LineEvent(thingsUnlink).things).toEqual({
    deviceId: 't2c449c9d1...',
    type: 'unlink',
  });
  expect(new LineEvent(thingsScenarioResult).things).toEqual({
    deviceId: 'tXXX',
    type: 'scenarioResult',
    result: {
      actionResults: [
        {
          data: '/w==',
          type: 'binary',
        },
      ],
      bleNotificationPayload: 'AQ==',
      endTime: 1547817845952,
      resultCode: 'success',
      revision: 2,
      scenarioId: 'XXX',
      startTime: 1547817845950,
    },
  });
});
