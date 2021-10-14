import LineEvent from '../LineEvent';
import { LineRawEvent } from '../LineTypes';

const textMessage: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
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

const imageMessage: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
  message: {
    id: '325708',
    type: 'image',
  },
};

const videoMessage: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
  message: {
    id: '325708',
    type: 'video',
  },
};

const audioMessage: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
  message: {
    id: '325708',
    type: 'audio',
  },
};

const locationMessage: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
  message: {
    id: '325708',
    type: 'location',
    title: 'my location',
    address: 'Golden Gate Bridge, San Francisco, CA, United States',
    latitude: 37.819722,
    longitude: -122.478611,
  },
};

const stickerMessage: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
  message: {
    id: '325708',
    type: 'sticker',
    packageId: '1',
    stickerId: '1',
  },
};

const follow: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'follow',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
};

const unfollow: LineRawEvent = {
  type: 'unfollow',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
};

const join: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'join',
  timestamp: 1462629479859,
  source: {
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  mode: 'active',
};

const leave: LineRawEvent = {
  type: 'leave',
  timestamp: 1462629479859,
  source: {
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  mode: 'active',
};

const postback: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'postback',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
  postback: {
    data: 'action=buyItem&itemId=123123&color=red',
  },
};

const datePostback: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'postback',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
  postback: {
    data: 'action=buyItem&itemId=123123&color=red',
    params: {
      date: '2017-09-06',
    },
  },
};

const timePostback: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'postback',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
  postback: {
    data: 'action=buyItem&itemId=123123&color=red',
    params: {
      time: '12:30',
    },
  },
};

const datetimePostback: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'postback',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
  postback: {
    data: 'action=buyItem&itemId=123123&color=red',
    params: {
      datetime: '2017-09-06T12:30',
    },
  },
};

const beacon: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'beacon',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
  beacon: {
    hwid: 'd41d8cd98f',
    type: 'enter',
  },
};

const accountLink: LineRawEvent = {
  type: 'accountLink',
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  source: {
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
    type: 'user',
  },
  mode: 'active',
  timestamp: 1513669370317,
  link: {
    result: 'ok',
    nonce: 'xxxxxxxxxxxxxxx',
  },
};

const memberJoined: LineRawEvent = {
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'memberJoined',
  timestamp: 1462629479859,
  source: {
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  mode: 'active',
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

const memberLeft: LineRawEvent = {
  type: 'memberLeft',
  timestamp: 1462629479960,
  source: {
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  mode: 'active',
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

const thingsLink: LineRawEvent = {
  type: 'things',
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
  things: {
    deviceId: 't2c449c9d1...',
    type: 'link',
  },
};

const thingsUnlink: LineRawEvent = {
  type: 'things',
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  },
  mode: 'active',
  things: {
    deviceId: 't2c449c9d1...',
    type: 'unlink',
  },
};

const thingsScenarioResult: LineRawEvent = {
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

  expect(new LineEvent(textMessage).destination).toBeUndefined();
});

it('#replyToken', () => {
  expect(new LineEvent(textMessage).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(follow).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(unfollow).replyToken).toBeUndefined();
  expect(new LineEvent(join).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(leave).replyToken).toBeUndefined();
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
  expect(new LineEvent(memberLeft).replyToken).toBeUndefined();

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
  expect(new LineEvent(noSourceMessage).source).toBeUndefined();
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
  expect(new LineEvent(beacon).message).toBeUndefined();
  expect(new LineEvent(accountLink).message).toBeUndefined();
  expect(new LineEvent(memberJoined).message).toBeUndefined();
  expect(new LineEvent(memberLeft).message).toBeUndefined();
  expect(new LineEvent(thingsLink).message).toBeUndefined();
  expect(new LineEvent(thingsUnlink).message).toBeUndefined();
  expect(new LineEvent(thingsScenarioResult).message).toBeUndefined();
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
  expect(new LineEvent(imageMessage).text).toBeUndefined();
  expect(new LineEvent(videoMessage).text).toBeUndefined();
  expect(new LineEvent(audioMessage).text).toBeUndefined();
  expect(new LineEvent(locationMessage).text).toBeUndefined();
  expect(new LineEvent(stickerMessage).text).toBeUndefined();
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
  expect(new LineEvent(textMessage).image).toBeUndefined();
  expect(new LineEvent(imageMessage).image).toEqual({
    id: '325708',
    type: 'image',
  });
  expect(new LineEvent(videoMessage).image).toBeUndefined();
  expect(new LineEvent(audioMessage).image).toBeUndefined();
  expect(new LineEvent(locationMessage).image).toBeUndefined();
  expect(new LineEvent(stickerMessage).image).toBeUndefined();
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
  expect(new LineEvent(textMessage).video).toBeUndefined();
  expect(new LineEvent(imageMessage).video).toBeUndefined();
  expect(new LineEvent(videoMessage).video).toEqual({
    id: '325708',
    type: 'video',
  });
  expect(new LineEvent(audioMessage).video).toBeUndefined();
  expect(new LineEvent(locationMessage).video).toBeUndefined();
  expect(new LineEvent(stickerMessage).video).toBeUndefined();
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
  expect(new LineEvent(textMessage).audio).toBeUndefined();
  expect(new LineEvent(imageMessage).audio).toBeUndefined();
  expect(new LineEvent(videoMessage).audio).toBeUndefined();
  expect(new LineEvent(audioMessage).audio).toEqual({
    id: '325708',
    type: 'audio',
  });
  expect(new LineEvent(locationMessage).audio).toBeUndefined();
  expect(new LineEvent(stickerMessage).audio).toBeUndefined();
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
  expect(new LineEvent(textMessage).location).toBeUndefined();
  expect(new LineEvent(imageMessage).location).toBeUndefined();
  expect(new LineEvent(videoMessage).location).toBeUndefined();
  expect(new LineEvent(audioMessage).location).toBeUndefined();
  expect(new LineEvent(locationMessage).location).toEqual({
    address: 'Golden Gate Bridge, San Francisco, CA, United States',
    id: '325708',
    latitude: 37.819722,
    longitude: -122.478611,
    title: 'my location',
    type: 'location',
  });
  expect(new LineEvent(stickerMessage).location).toBeUndefined();
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
  expect(new LineEvent(textMessage).sticker).toBeUndefined();
  expect(new LineEvent(imageMessage).sticker).toBeUndefined();
  expect(new LineEvent(videoMessage).sticker).toBeUndefined();
  expect(new LineEvent(audioMessage).sticker).toBeUndefined();
  expect(new LineEvent(locationMessage).sticker).toBeUndefined();
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
  expect(new LineEvent(textMessage).follow).toBeUndefined();
  expect(new LineEvent(follow).follow).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(unfollow).follow).toBeUndefined();
  expect(new LineEvent(join).follow).toBeUndefined();
  expect(new LineEvent(leave).follow).toBeUndefined();
  expect(new LineEvent(postback).follow).toBeUndefined();
  expect(new LineEvent(beacon).follow).toBeUndefined();
  expect(new LineEvent(memberJoined).follow).toBeUndefined();
  expect(new LineEvent(memberLeft).follow).toBeUndefined();
  expect(new LineEvent(thingsLink).follow).toBeUndefined();
  expect(new LineEvent(thingsUnlink).follow).toBeUndefined();
  expect(new LineEvent(thingsScenarioResult).follow).toBeUndefined();
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
  expect(new LineEvent(textMessage).unfollow).toBeUndefined();
  expect(new LineEvent(follow).unfollow).toBeUndefined();
  expect(new LineEvent(unfollow).unfollow).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(join).unfollow).toBeUndefined();
  expect(new LineEvent(leave).unfollow).toBeUndefined();
  expect(new LineEvent(postback).unfollow).toBeUndefined();
  expect(new LineEvent(beacon).unfollow).toBeUndefined();
  expect(new LineEvent(accountLink).unfollow).toBeUndefined();
  expect(new LineEvent(memberJoined).unfollow).toBeUndefined();
  expect(new LineEvent(memberLeft).unfollow).toBeUndefined();
  expect(new LineEvent(thingsLink).unfollow).toBeUndefined();
  expect(new LineEvent(thingsUnlink).unfollow).toBeUndefined();
  expect(new LineEvent(thingsScenarioResult).unfollow).toBeUndefined();
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
  expect(new LineEvent(textMessage).join).toBeUndefined();
  expect(new LineEvent(follow).join).toBeUndefined();
  expect(new LineEvent(unfollow).join).toBeUndefined();
  expect(new LineEvent(join).join).toEqual({
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  });
  expect(new LineEvent(leave).join).toBeUndefined();
  expect(new LineEvent(postback).join).toBeUndefined();
  expect(new LineEvent(beacon).join).toBeUndefined();
  expect(new LineEvent(accountLink).join).toBeUndefined();
  expect(new LineEvent(memberJoined).join).toBeUndefined();
  expect(new LineEvent(memberLeft).join).toBeUndefined();
  expect(new LineEvent(thingsLink).join).toBeUndefined();
  expect(new LineEvent(thingsUnlink).join).toBeUndefined();
  expect(new LineEvent(thingsScenarioResult).join).toBeUndefined();
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
  expect(new LineEvent(textMessage).leave).toBeUndefined();
  expect(new LineEvent(follow).leave).toBeUndefined();
  expect(new LineEvent(unfollow).leave).toBeUndefined();
  expect(new LineEvent(join).leave).toBeUndefined();
  expect(new LineEvent(leave).leave).toEqual({
    type: 'group',
    groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  });
  expect(new LineEvent(postback).leave).toBeUndefined();
  expect(new LineEvent(beacon).leave).toBeUndefined();
  expect(new LineEvent(accountLink).leave).toBeUndefined();
  expect(new LineEvent(memberJoined).leave).toBeUndefined();
  expect(new LineEvent(memberLeft).leave).toBeUndefined();
  expect(new LineEvent(thingsLink).leave).toBeUndefined();
  expect(new LineEvent(thingsUnlink).leave).toBeUndefined();
  expect(new LineEvent(thingsScenarioResult).leave).toBeUndefined();
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
  expect(new LineEvent(textMessage).postback).toBeUndefined();
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
  expect(new LineEvent(textMessage).payload).toBeUndefined();
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
  expect(new LineEvent(textMessage).date).toBeUndefined();
  expect(new LineEvent(postback).date).toBeUndefined();
  expect(new LineEvent(datePostback).date).toEqual('2017-09-06');
  expect(new LineEvent(timePostback).date).toBeUndefined();
  expect(new LineEvent(datetimePostback).date).toBeUndefined();
});

it('#time', () => {
  expect(new LineEvent(textMessage).time).toBeUndefined();
  expect(new LineEvent(postback).time).toBeUndefined();
  expect(new LineEvent(datePostback).time).toBeUndefined();
  expect(new LineEvent(timePostback).time).toEqual('12:30');
  expect(new LineEvent(datetimePostback).time).toBeUndefined();
});

it('#datetime', () => {
  expect(new LineEvent(textMessage).datetime).toBeUndefined();
  expect(new LineEvent(postback).datetime).toBeUndefined();
  expect(new LineEvent(datePostback).datetime).toBeUndefined();
  expect(new LineEvent(timePostback).datetime).toBeUndefined();
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
  expect(new LineEvent(textMessage).beacon).toBeUndefined();
  expect(new LineEvent(follow).beacon).toBeUndefined();
  expect(new LineEvent(unfollow).beacon).toBeUndefined();
  expect(new LineEvent(join).beacon).toBeUndefined();
  expect(new LineEvent(leave).beacon).toBeUndefined();
  expect(new LineEvent(postback).beacon).toBeUndefined();
  expect(new LineEvent(beacon).beacon).toEqual({
    hwid: 'd41d8cd98f',
    type: 'enter',
  });
  expect(new LineEvent(accountLink).beacon).toBeUndefined();
  expect(new LineEvent(memberJoined).beacon).toBeUndefined();
  expect(new LineEvent(memberLeft).beacon).toBeUndefined();
  expect(new LineEvent(thingsLink).beacon).toBeUndefined();
  expect(new LineEvent(thingsUnlink).beacon).toBeUndefined();
  expect(new LineEvent(thingsScenarioResult).beacon).toBeUndefined();
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
  expect(new LineEvent(textMessage).accountLink).toBeUndefined();
  expect(new LineEvent(follow).accountLink).toBeUndefined();
  expect(new LineEvent(unfollow).accountLink).toBeUndefined();
  expect(new LineEvent(join).accountLink).toBeUndefined();
  expect(new LineEvent(leave).accountLink).toBeUndefined();
  expect(new LineEvent(postback).accountLink).toBeUndefined();
  expect(new LineEvent(beacon).accountLink).toBeUndefined();
  expect(new LineEvent(accountLink).accountLink).toEqual({
    result: 'ok',
    nonce: 'xxxxxxxxxxxxxxx',
  });
  expect(new LineEvent(memberJoined).accountLink).toBeUndefined();
  expect(new LineEvent(memberLeft).accountLink).toBeUndefined();
  expect(new LineEvent(thingsLink).accountLink).toBeUndefined();
  expect(new LineEvent(thingsUnlink).accountLink).toBeUndefined();
  expect(new LineEvent(thingsScenarioResult).accountLink).toBeUndefined();
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
  expect(new LineEvent(textMessage).memberJoined).toBeUndefined();
  expect(new LineEvent(follow).memberJoined).toBeUndefined();
  expect(new LineEvent(unfollow).memberJoined).toBeUndefined();
  expect(new LineEvent(join).memberJoined).toBeUndefined();
  expect(new LineEvent(leave).memberJoined).toBeUndefined();
  expect(new LineEvent(postback).memberJoined).toBeUndefined();
  expect(new LineEvent(beacon).memberJoined).toBeUndefined();
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
  expect(new LineEvent(memberLeft).memberJoined).toBeUndefined();
  expect(new LineEvent(thingsLink).memberJoined).toBeUndefined();
  expect(new LineEvent(thingsUnlink).memberJoined).toBeUndefined();
  expect(new LineEvent(thingsScenarioResult).memberJoined).toBeUndefined();
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
  expect(new LineEvent(textMessage).memberLeft).toBeUndefined();
  expect(new LineEvent(follow).memberLeft).toBeUndefined();
  expect(new LineEvent(unfollow).memberLeft).toBeUndefined();
  expect(new LineEvent(join).memberLeft).toBeUndefined();
  expect(new LineEvent(leave).memberLeft).toBeUndefined();
  expect(new LineEvent(postback).memberLeft).toBeUndefined();
  expect(new LineEvent(beacon).memberLeft).toBeUndefined();
  expect(new LineEvent(memberJoined).memberLeft).toBeUndefined();
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
  expect(new LineEvent(thingsLink).memberLeft).toBeUndefined();
  expect(new LineEvent(thingsUnlink).memberLeft).toBeUndefined();
  expect(new LineEvent(thingsScenarioResult).memberLeft).toBeUndefined();
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

it('#things', () => {
  expect(new LineEvent(textMessage).things).toBeUndefined();
  expect(new LineEvent(follow).things).toBeUndefined();
  expect(new LineEvent(unfollow).things).toBeUndefined();
  expect(new LineEvent(join).things).toBeUndefined();
  expect(new LineEvent(leave).things).toBeUndefined();
  expect(new LineEvent(postback).things).toBeUndefined();
  expect(new LineEvent(beacon).things).toBeUndefined();
  expect(new LineEvent(memberJoined).things).toBeUndefined();
  expect(new LineEvent(memberLeft).things).toBeUndefined();
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
