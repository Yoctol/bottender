import LINEEvent from '../LINEEvent';

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
    address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
    latitude: 35.65910807942215,
    longitude: 139.70372892916203,
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

it('#rawEvent', () => {
  expect(new LINEEvent(textMessage).rawEvent).toEqual(textMessage);
  expect(new LINEEvent(imageMessage).rawEvent).toEqual(imageMessage);
  expect(new LINEEvent(videoMessage).rawEvent).toEqual(videoMessage);
  expect(new LINEEvent(audioMessage).rawEvent).toEqual(audioMessage);
  expect(new LINEEvent(locationMessage).rawEvent).toEqual(locationMessage);
  expect(new LINEEvent(stickerMessage).rawEvent).toEqual(stickerMessage);
  expect(new LINEEvent(follow).rawEvent).toEqual(follow);
  expect(new LINEEvent(unfollow).rawEvent).toEqual(unfollow);
  expect(new LINEEvent(join).rawEvent).toEqual(join);
  expect(new LINEEvent(leave).rawEvent).toEqual(leave);
  expect(new LINEEvent(postback).rawEvent).toEqual(postback);
  expect(new LINEEvent(beacon).rawEvent).toEqual(beacon);
});

it('#replyToken', () => {
  expect(new LINEEvent(textMessage).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LINEEvent(follow).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LINEEvent(unfollow).replyToken).toEqual(null);
  expect(new LINEEvent(join).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LINEEvent(leave).replyToken).toEqual(null);
  expect(new LINEEvent(postback).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
  expect(new LINEEvent(beacon).replyToken).toEqual(
    'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  );
});

it('#isMessage', () => {
  expect(new LINEEvent(textMessage).isMessage).toEqual(true);
  expect(new LINEEvent(follow).isMessage).toEqual(false);
  expect(new LINEEvent(unfollow).isMessage).toEqual(false);
  expect(new LINEEvent(join).isMessage).toEqual(false);
  expect(new LINEEvent(leave).isMessage).toEqual(false);
  expect(new LINEEvent(postback).isMessage).toEqual(false);
  expect(new LINEEvent(beacon).isMessage).toEqual(false);
});

it('#message', () => {
  expect(new LINEEvent(textMessage).message).toEqual({
    id: '325708',
    type: 'text',
    text: 'Hello, world',
  });
  expect(new LINEEvent(imageMessage).message).toEqual({
    id: '325708',
    type: 'image',
  });
  expect(new LINEEvent(videoMessage).message).toEqual({
    id: '325708',
    type: 'video',
  });
  expect(new LINEEvent(audioMessage).message).toEqual({
    id: '325708',
    type: 'audio',
  });
  expect(new LINEEvent(locationMessage).message).toEqual({
    id: '325708',
    type: 'location',
    title: 'my location',
    address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
    latitude: 35.65910807942215,
    longitude: 139.70372892916203,
  });
  expect(new LINEEvent(stickerMessage).message).toEqual({
    id: '325708',
    type: 'sticker',
    packageId: '1',
    stickerId: '1',
  });
});

it('#isTextMessage', () => {
  expect(new LINEEvent(textMessage).isTextMessage).toEqual(true);
  expect(new LINEEvent(imageMessage).isTextMessage).toEqual(false);
  expect(new LINEEvent(videoMessage).isTextMessage).toEqual(false);
  expect(new LINEEvent(audioMessage).isTextMessage).toEqual(false);
  expect(new LINEEvent(locationMessage).isTextMessage).toEqual(false);
  expect(new LINEEvent(stickerMessage).isTextMessage).toEqual(false);
});

it('#isImageMessage', () => {
  expect(new LINEEvent(textMessage).isImageMessage).toEqual(false);
  expect(new LINEEvent(imageMessage).isImageMessage).toEqual(true);
  expect(new LINEEvent(videoMessage).isImageMessage).toEqual(false);
  expect(new LINEEvent(audioMessage).isImageMessage).toEqual(false);
  expect(new LINEEvent(locationMessage).isImageMessage).toEqual(false);
  expect(new LINEEvent(stickerMessage).isImageMessage).toEqual(false);
});

it('#isVideoMessage', () => {
  expect(new LINEEvent(textMessage).isVideoMessage).toEqual(false);
  expect(new LINEEvent(imageMessage).isVideoMessage).toEqual(false);
  expect(new LINEEvent(videoMessage).isVideoMessage).toEqual(true);
  expect(new LINEEvent(audioMessage).isVideoMessage).toEqual(false);
  expect(new LINEEvent(locationMessage).isVideoMessage).toEqual(false);
  expect(new LINEEvent(stickerMessage).isVideoMessage).toEqual(false);
});

it('#isAudioMessage', () => {
  expect(new LINEEvent(textMessage).isAudioMessage).toEqual(false);
  expect(new LINEEvent(imageMessage).isAudioMessage).toEqual(false);
  expect(new LINEEvent(videoMessage).isAudioMessage).toEqual(false);
  expect(new LINEEvent(audioMessage).isAudioMessage).toEqual(true);
  expect(new LINEEvent(locationMessage).isAudioMessage).toEqual(false);
  expect(new LINEEvent(stickerMessage).isAudioMessage).toEqual(false);
});

it('#isLocationMessage', () => {
  expect(new LINEEvent(textMessage).isLocationMessage).toEqual(false);
  expect(new LINEEvent(imageMessage).isLocationMessage).toEqual(false);
  expect(new LINEEvent(videoMessage).isLocationMessage).toEqual(false);
  expect(new LINEEvent(audioMessage).isLocationMessage).toEqual(false);
  expect(new LINEEvent(locationMessage).isLocationMessage).toEqual(true);
  expect(new LINEEvent(stickerMessage).isLocationMessage).toEqual(false);
});

it('#isStickerMessage', () => {
  expect(new LINEEvent(textMessage).isStickerMessage).toEqual(false);
  expect(new LINEEvent(imageMessage).isStickerMessage).toEqual(false);
  expect(new LINEEvent(videoMessage).isStickerMessage).toEqual(false);
  expect(new LINEEvent(audioMessage).isStickerMessage).toEqual(false);
  expect(new LINEEvent(locationMessage).isStickerMessage).toEqual(false);
  expect(new LINEEvent(stickerMessage).isStickerMessage).toEqual(true);
});

it('#isFollow', () => {
  expect(new LINEEvent(textMessage).isFollow).toEqual(false);
  expect(new LINEEvent(follow).isFollow).toEqual(true);
  expect(new LINEEvent(unfollow).isFollow).toEqual(false);
  expect(new LINEEvent(join).isFollow).toEqual(false);
  expect(new LINEEvent(leave).isFollow).toEqual(false);
  expect(new LINEEvent(postback).isFollow).toEqual(false);
  expect(new LINEEvent(beacon).isFollow).toEqual(false);
});

it('#isUnfollow', () => {
  expect(new LINEEvent(textMessage).isUnfollow).toEqual(false);
  expect(new LINEEvent(follow).isUnfollow).toEqual(false);
  expect(new LINEEvent(unfollow).isUnfollow).toEqual(true);
  expect(new LINEEvent(join).isUnfollow).toEqual(false);
  expect(new LINEEvent(leave).isUnfollow).toEqual(false);
  expect(new LINEEvent(postback).isUnfollow).toEqual(false);
  expect(new LINEEvent(beacon).isUnfollow).toEqual(false);
});

it('#isJoin', () => {
  expect(new LINEEvent(textMessage).isJoin).toEqual(false);
  expect(new LINEEvent(follow).isJoin).toEqual(false);
  expect(new LINEEvent(unfollow).isJoin).toEqual(false);
  expect(new LINEEvent(join).isJoin).toEqual(true);
  expect(new LINEEvent(leave).isJoin).toEqual(false);
  expect(new LINEEvent(postback).isJoin).toEqual(false);
  expect(new LINEEvent(beacon).isJoin).toEqual(false);
});

it('#isLeave', () => {
  expect(new LINEEvent(textMessage).isLeave).toEqual(false);
  expect(new LINEEvent(follow).isLeave).toEqual(false);
  expect(new LINEEvent(unfollow).isLeave).toEqual(false);
  expect(new LINEEvent(join).isLeave).toEqual(false);
  expect(new LINEEvent(leave).isLeave).toEqual(true);
  expect(new LINEEvent(postback).isLeave).toEqual(false);
  expect(new LINEEvent(beacon).isLeave).toEqual(false);
});

it('#isPostback', () => {
  expect(new LINEEvent(textMessage).isPostback).toEqual(false);
  expect(new LINEEvent(follow).isPostback).toEqual(false);
  expect(new LINEEvent(unfollow).isPostback).toEqual(false);
  expect(new LINEEvent(join).isPostback).toEqual(false);
  expect(new LINEEvent(leave).isPostback).toEqual(false);
  expect(new LINEEvent(postback).isPostback).toEqual(true);
  expect(new LINEEvent(datePostback).isPostback).toEqual(true);
  expect(new LINEEvent(timePostback).isPostback).toEqual(true);
  expect(new LINEEvent(datetimePostback).isPostback).toEqual(true);
  expect(new LINEEvent(beacon).isPostback).toEqual(false);
});

it('#postback', () => {
  expect(new LINEEvent(textMessage).postback).toEqual(null);
  expect(new LINEEvent(postback).postback).toEqual({
    data: 'action=buyItem&itemId=123123&color=red',
  });
  expect(new LINEEvent(datePostback).postback).toEqual({
    data: 'action=buyItem&itemId=123123&color=red',
    params: {
      date: '2017-09-06',
    },
  });
  expect(new LINEEvent(timePostback).postback).toEqual({
    data: 'action=buyItem&itemId=123123&color=red',
    params: {
      time: '12:30',
    },
  });
  expect(new LINEEvent(datetimePostback).postback).toEqual({
    data: 'action=buyItem&itemId=123123&color=red',
    params: {
      datetime: '2017-09-06T12:30',
    },
  });
});

it('#date', () => {
  expect(new LINEEvent(textMessage).date).toEqual(null);
  expect(new LINEEvent(postback).date).toEqual(null);
  expect(new LINEEvent(datePostback).date).toEqual('2017-09-06');
  expect(new LINEEvent(timePostback).date).toEqual(null);
  expect(new LINEEvent(datetimePostback).date).toEqual(null);
});

it('#time', () => {
  expect(new LINEEvent(textMessage).time).toEqual(null);
  expect(new LINEEvent(postback).time).toEqual(null);
  expect(new LINEEvent(datePostback).time).toEqual(null);
  expect(new LINEEvent(timePostback).time).toEqual('12:30');
  expect(new LINEEvent(datetimePostback).time).toEqual(null);
});

it('#datetime', () => {
  expect(new LINEEvent(textMessage).datetime).toEqual(null);
  expect(new LINEEvent(postback).datetime).toEqual(null);
  expect(new LINEEvent(datePostback).datetime).toEqual(null);
  expect(new LINEEvent(timePostback).datetime).toEqual(null);
  expect(new LINEEvent(datetimePostback).datetime).toEqual('2017-09-06T12:30');
});

it('#isBeacon', () => {
  expect(new LINEEvent(textMessage).isBeacon).toEqual(false);
  expect(new LINEEvent(follow).isBeacon).toEqual(false);
  expect(new LINEEvent(unfollow).isBeacon).toEqual(false);
  expect(new LINEEvent(join).isBeacon).toEqual(false);
  expect(new LINEEvent(leave).isBeacon).toEqual(false);
  expect(new LINEEvent(postback).isBeacon).toEqual(false);
  expect(new LINEEvent(beacon).isBeacon).toEqual(true);
});
