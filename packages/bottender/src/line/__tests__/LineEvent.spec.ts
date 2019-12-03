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
    text: 'Hello, world',
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

const deviceLink = {
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

const deviceUnlink = {
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
  expect(new LineEvent(deviceLink).rawEvent).toEqual(deviceLink);
  expect(new LineEvent(deviceUnlink).rawEvent).toEqual(deviceUnlink);
});

it('#destination', () => {
  expect(new LineEvent(textMessage, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(imageMessage, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(videoMessage, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(audioMessage, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(locationMessage, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(stickerMessage, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(follow, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(unfollow, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(join, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(leave, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(postback, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(beacon, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(accountLink, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(memberJoined, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(memberLeft, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );

  expect(new LineEvent(deviceLink, { destination }).destination).toEqual(
    'Uea8667adaf43586706170ff25ff47ae6'
  );
  expect(new LineEvent(deviceUnlink, { destination }).destination).toEqual(
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

  expect(new LineEvent(deviceLink).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LineEvent(deviceUnlink).replyToken).toEqual(
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
  expect(new LineEvent(deviceLink).source).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(deviceUnlink).source).toEqual({
    type: 'user',
    userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  });
  expect(new LineEvent(noSourceMessage).source).toEqual(null);
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
  expect(new LineEvent(deviceLink).isMessage).toEqual(false);
  expect(new LineEvent(deviceUnlink).isMessage).toEqual(false);
});

it('#message', () => {
  expect(new LineEvent(textMessage).message).toEqual({
    id: '325708',
    type: 'text',
    text: 'Hello, world',
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
  expect(new LineEvent(textMessage).text).toEqual('Hello, world');
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
  expect(new LineEvent(deviceLink).isMessage).toEqual(false);
  expect(new LineEvent(deviceLink).isFollow).toEqual(false);
  expect(new LineEvent(deviceUnlink).isFollow).toEqual(false);
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
  expect(new LineEvent(deviceLink).follow).toEqual(null);
  expect(new LineEvent(deviceUnlink).follow).toEqual(null);
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
  expect(new LineEvent(deviceLink).isUnfollow).toEqual(false);
  expect(new LineEvent(deviceUnlink).isUnfollow).toEqual(false);
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
  expect(new LineEvent(deviceLink).unfollow).toEqual(null);
  expect(new LineEvent(deviceUnlink).unfollow).toEqual(null);
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
  expect(new LineEvent(deviceLink).isJoin).toEqual(false);
  expect(new LineEvent(deviceUnlink).isJoin).toEqual(false);
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
  expect(new LineEvent(deviceLink).join).toEqual(null);
  expect(new LineEvent(deviceUnlink).join).toEqual(null);
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
  expect(new LineEvent(deviceLink).isLeave).toEqual(false);
  expect(new LineEvent(deviceUnlink).isLeave).toEqual(false);
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
  expect(new LineEvent(deviceLink).leave).toEqual(null);
  expect(new LineEvent(deviceUnlink).leave).toEqual(null);
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
  expect(new LineEvent(deviceLink).isPostback).toEqual(false);
  expect(new LineEvent(deviceUnlink).isPostback).toEqual(false);
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
  expect(new LineEvent(deviceLink).isPayload).toEqual(false);
  expect(new LineEvent(deviceUnlink).isPayload).toEqual(false);
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
  expect(new LineEvent(deviceLink).beacon).toEqual(null);
  expect(new LineEvent(deviceUnlink).beacon).toEqual(null);
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
  expect(new LineEvent(deviceLink).isAccountLink).toEqual(false);
  expect(new LineEvent(deviceUnlink).isAccountLink).toEqual(false);
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
  expect(new LineEvent(deviceLink).accountLink).toEqual(null);
  expect(new LineEvent(deviceUnlink).accountLink).toEqual(null);
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
  expect(new LineEvent(deviceLink).isMemberJoined).toEqual(false);
  expect(new LineEvent(deviceUnlink).isMemberJoined).toEqual(false);
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
  expect(new LineEvent(deviceLink).memberJoined).toEqual(null);
  expect(new LineEvent(deviceUnlink).memberJoined).toEqual(null);
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
  expect(new LineEvent(deviceLink).isMemberLeft).toEqual(false);
  expect(new LineEvent(deviceUnlink).isMemberLeft).toEqual(false);
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
  expect(new LineEvent(deviceLink).memberLeft).toEqual(null);
  expect(new LineEvent(deviceUnlink).memberLeft).toEqual(null);
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
  expect(new LineEvent(deviceLink).isDeviceLink).toEqual(true);
  expect(new LineEvent(deviceUnlink).isDeviceLink).toEqual(false);
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
  expect(new LineEvent(deviceLink).isDeviceUnlink).toEqual(false);
  expect(new LineEvent(deviceUnlink).isDeviceUnlink).toEqual(true);
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
  expect(new LineEvent(deviceLink).things).toEqual({
    deviceId: 't2c449c9d1...',
    type: 'link',
  });
  expect(new LineEvent(deviceUnlink).things).toEqual({
    deviceId: 't2c449c9d1...',
    type: 'unlink',
  });
});
