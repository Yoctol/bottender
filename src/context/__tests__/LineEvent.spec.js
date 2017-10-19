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
});

it('#isMessage', () => {
  expect(new LineEvent(textMessage).isMessage).toEqual(true);
  expect(new LineEvent(follow).isMessage).toEqual(false);
  expect(new LineEvent(unfollow).isMessage).toEqual(false);
  expect(new LineEvent(join).isMessage).toEqual(false);
  expect(new LineEvent(leave).isMessage).toEqual(false);
  expect(new LineEvent(postback).isMessage).toEqual(false);
  expect(new LineEvent(beacon).isMessage).toEqual(false);
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
});

it('#isTextMessage', () => {
  expect(new LineEvent(textMessage).isTextMessage).toEqual(true);
  expect(new LineEvent(imageMessage).isTextMessage).toEqual(false);
  expect(new LineEvent(videoMessage).isTextMessage).toEqual(false);
  expect(new LineEvent(audioMessage).isTextMessage).toEqual(false);
  expect(new LineEvent(locationMessage).isTextMessage).toEqual(false);
  expect(new LineEvent(stickerMessage).isTextMessage).toEqual(false);
});

it('#isImageMessage', () => {
  expect(new LineEvent(textMessage).isImageMessage).toEqual(false);
  expect(new LineEvent(imageMessage).isImageMessage).toEqual(true);
  expect(new LineEvent(videoMessage).isImageMessage).toEqual(false);
  expect(new LineEvent(audioMessage).isImageMessage).toEqual(false);
  expect(new LineEvent(locationMessage).isImageMessage).toEqual(false);
  expect(new LineEvent(stickerMessage).isImageMessage).toEqual(false);
});

it('#isVideoMessage', () => {
  expect(new LineEvent(textMessage).isVideoMessage).toEqual(false);
  expect(new LineEvent(imageMessage).isVideoMessage).toEqual(false);
  expect(new LineEvent(videoMessage).isVideoMessage).toEqual(true);
  expect(new LineEvent(audioMessage).isVideoMessage).toEqual(false);
  expect(new LineEvent(locationMessage).isVideoMessage).toEqual(false);
  expect(new LineEvent(stickerMessage).isVideoMessage).toEqual(false);
});

it('#isAudioMessage', () => {
  expect(new LineEvent(textMessage).isAudioMessage).toEqual(false);
  expect(new LineEvent(imageMessage).isAudioMessage).toEqual(false);
  expect(new LineEvent(videoMessage).isAudioMessage).toEqual(false);
  expect(new LineEvent(audioMessage).isAudioMessage).toEqual(true);
  expect(new LineEvent(locationMessage).isAudioMessage).toEqual(false);
  expect(new LineEvent(stickerMessage).isAudioMessage).toEqual(false);
});

it('#isLocationMessage', () => {
  expect(new LineEvent(textMessage).isLocationMessage).toEqual(false);
  expect(new LineEvent(imageMessage).isLocationMessage).toEqual(false);
  expect(new LineEvent(videoMessage).isLocationMessage).toEqual(false);
  expect(new LineEvent(audioMessage).isLocationMessage).toEqual(false);
  expect(new LineEvent(locationMessage).isLocationMessage).toEqual(true);
  expect(new LineEvent(stickerMessage).isLocationMessage).toEqual(false);
});

it('#isStickerMessage', () => {
  expect(new LineEvent(textMessage).isStickerMessage).toEqual(false);
  expect(new LineEvent(imageMessage).isStickerMessage).toEqual(false);
  expect(new LineEvent(videoMessage).isStickerMessage).toEqual(false);
  expect(new LineEvent(audioMessage).isStickerMessage).toEqual(false);
  expect(new LineEvent(locationMessage).isStickerMessage).toEqual(false);
  expect(new LineEvent(stickerMessage).isStickerMessage).toEqual(true);
});

it('#isFollow', () => {
  expect(new LineEvent(textMessage).isFollow).toEqual(false);
  expect(new LineEvent(follow).isFollow).toEqual(true);
  expect(new LineEvent(unfollow).isFollow).toEqual(false);
  expect(new LineEvent(join).isFollow).toEqual(false);
  expect(new LineEvent(leave).isFollow).toEqual(false);
  expect(new LineEvent(postback).isFollow).toEqual(false);
  expect(new LineEvent(beacon).isFollow).toEqual(false);
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
});

it('#isUnfollow', () => {
  expect(new LineEvent(textMessage).isUnfollow).toEqual(false);
  expect(new LineEvent(follow).isUnfollow).toEqual(false);
  expect(new LineEvent(unfollow).isUnfollow).toEqual(true);
  expect(new LineEvent(join).isUnfollow).toEqual(false);
  expect(new LineEvent(leave).isUnfollow).toEqual(false);
  expect(new LineEvent(postback).isUnfollow).toEqual(false);
  expect(new LineEvent(beacon).isUnfollow).toEqual(false);
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
});

it('#isJoin', () => {
  expect(new LineEvent(textMessage).isJoin).toEqual(false);
  expect(new LineEvent(follow).isJoin).toEqual(false);
  expect(new LineEvent(unfollow).isJoin).toEqual(false);
  expect(new LineEvent(join).isJoin).toEqual(true);
  expect(new LineEvent(leave).isJoin).toEqual(false);
  expect(new LineEvent(postback).isJoin).toEqual(false);
  expect(new LineEvent(beacon).isJoin).toEqual(false);
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
});

it('#isLeave', () => {
  expect(new LineEvent(textMessage).isLeave).toEqual(false);
  expect(new LineEvent(follow).isLeave).toEqual(false);
  expect(new LineEvent(unfollow).isLeave).toEqual(false);
  expect(new LineEvent(join).isLeave).toEqual(false);
  expect(new LineEvent(leave).isLeave).toEqual(true);
  expect(new LineEvent(postback).isLeave).toEqual(false);
  expect(new LineEvent(beacon).isLeave).toEqual(false);
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
});
