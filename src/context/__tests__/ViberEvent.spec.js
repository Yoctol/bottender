import ViberEvent from '../ViberEvent';

const subscribed = {
  event: 'subscribed',
  timestamp: 1457764197627,
  user: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    api_version: 1,
  },
  message_token: 4912661846655238145,
};

const unsubscribed = {
  event: 'unsubscribed',
  timestamp: 1457764197627,
  user_id: '01234567890A=',
  message_token: 4912661846655238145,
};

const conversationStarted = {
  event: 'conversation_started',
  timestamp: 1457764197627,
  message_token: 4912661846655238145,
  type: 'open',
  context: 'context information',
  user: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    api_version: 1,
  },
  subscribed: false,
};

const delivered = {
  event: 'delivered',
  timestamp: 1457764197627,
  message_token: 4912661846655238145,
  user_id: '01234567890A=',
};

const seen = {
  event: 'seen',
  timestamp: 1457764197627,
  message_token: 4912661846655238145,
  user_id: '01234567890A=',
};

const failed = {
  event: 'failed',
  timestamp: 1457764197627,
  message_token: 4912661846655238145,
  user_id: '01234567890A=',
  desc: 'failure description',
};

const textMessage = {
  event: 'message',
  timestamp: 1457764197627,
  message_token: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    api_version: 1,
  },
  message: {
    type: 'text',
    text: 'a message to the service',
    media: 'http://example.com',
    location: {
      lat: 50.76891,
      lon: 6.11499,
    },
    tracking_data: 'tracking data',
  },
};

const pictureMessage = {
  event: 'message',
  timestamp: 1457764197627,
  message_token: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    api_version: 1,
  },
  message: {
    type: 'picture',
    text: 'a message to the service',
    media: 'http://example.com/img.jpg',
    tracking_data: 'tracking data',
  },
};

const videoMessage = {
  event: 'message',
  timestamp: 1457764197627,
  message_token: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    api_version: 1,
  },
  message: {
    type: 'video',
    media: 'http://example.com/video.mp4',
    duration: 320,
    tracking_data: 'tracking data',
  },
};

const fileMessage = {
  event: 'message',
  timestamp: 1457764197627,
  message_token: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    api_version: 1,
  },
  message: {
    type: 'file',
    media: 'http://example.com/doc.pdf',
    file_name: 'doc.pdf',
    file_size: 3220,
    tracking_data: 'tracking data',
  },
};

const stickerMessage = {
  event: 'message',
  timestamp: 1457764197627,
  message_token: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    api_version: 1,
  },
  message: {
    type: 'sticker',
    sticker_id: 46105,
    tracking_data: 'tracking data',
  },
};

const contactMessage = {
  event: 'message',
  timestamp: 1457764197627,
  message_token: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    api_version: 1,
  },
  message: {
    type: 'contact',
    contact: {
      name: 'Itamar',
      phone_number: '+972511123123',
    },
    tracking_data: 'tracking data',
  },
};

const urlMessage = {
  event: 'message',
  timestamp: 1457764197627,
  message_token: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    api_version: 1,
  },
  message: {
    type: 'url',
    media: 'http://example.com',
    tracking_data: 'tracking data',
  },
};

const locationMessage = {
  event: 'message',
  timestamp: 1457764197627,
  message_token: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    api_version: 1,
  },
  message: {
    type: 'location',
    location: {
      lat: 50.76891,
      lon: 6.11499,
    },
    tracking_data: 'tracking data',
  },
};

it('#rawEvent', () => {
  expect(new ViberEvent(textMessage).rawEvent).toEqual(textMessage);
});

it('#isMessage', () => {
  expect(new ViberEvent(subscribed).isMessage).toEqual(false);
  expect(new ViberEvent(unsubscribed).isMessage).toEqual(false);
  expect(new ViberEvent(conversationStarted).isMessage).toEqual(false);
  expect(new ViberEvent(delivered).isMessage).toEqual(false);
  expect(new ViberEvent(seen).isMessage).toEqual(false);
  expect(new ViberEvent(failed).isMessage).toEqual(false);
  expect(new ViberEvent(textMessage).isMessage).toEqual(true);
  expect(new ViberEvent(pictureMessage).isMessage).toEqual(true);
  expect(new ViberEvent(videoMessage).isMessage).toEqual(true);
  expect(new ViberEvent(fileMessage).isMessage).toEqual(true);
  expect(new ViberEvent(stickerMessage).isMessage).toEqual(true);
  expect(new ViberEvent(contactMessage).isMessage).toEqual(true);
  expect(new ViberEvent(urlMessage).isMessage).toEqual(true);
  expect(new ViberEvent(locationMessage).isMessage).toEqual(true);
});

it('#message', () => {
  expect(new ViberEvent(subscribed).message).toEqual(null);
  expect(new ViberEvent(unsubscribed).message).toEqual(null);
  expect(new ViberEvent(conversationStarted).message).toEqual(null);
  expect(new ViberEvent(delivered).message).toEqual(null);
  expect(new ViberEvent(seen).message).toEqual(null);
  expect(new ViberEvent(failed).message).toEqual(null);
  expect(new ViberEvent(textMessage).message).toEqual({
    type: 'text',
    text: 'a message to the service',
    media: 'http://example.com',
    location: {
      lat: 50.76891,
      lon: 6.11499,
    },
    tracking_data: 'tracking data',
  });
  expect(new ViberEvent(pictureMessage).message).toEqual({
    type: 'picture',
    text: 'a message to the service',
    media: 'http://example.com/img.jpg',
    tracking_data: 'tracking data',
  });
  expect(new ViberEvent(videoMessage).message).toEqual({
    type: 'video',
    media: 'http://example.com/video.mp4',
    duration: 320,
    tracking_data: 'tracking data',
  });
  expect(new ViberEvent(fileMessage).message).toEqual({
    type: 'file',
    media: 'http://example.com/doc.pdf',
    file_name: 'doc.pdf',
    file_size: 3220,
    tracking_data: 'tracking data',
  });
  expect(new ViberEvent(stickerMessage).message).toEqual({
    type: 'sticker',
    sticker_id: 46105,
    tracking_data: 'tracking data',
  });
  expect(new ViberEvent(contactMessage).message).toEqual({
    type: 'contact',
    contact: {
      name: 'Itamar',
      phone_number: '+972511123123',
    },
    tracking_data: 'tracking data',
  });
  expect(new ViberEvent(urlMessage).message).toEqual({
    type: 'url',
    media: 'http://example.com',
    tracking_data: 'tracking data',
  });
  expect(new ViberEvent(locationMessage).message).toEqual({
    type: 'location',
    location: {
      lat: 50.76891,
      lon: 6.11499,
    },
    tracking_data: 'tracking data',
  });
});

it('#isText', () => {
  expect(new ViberEvent(subscribed).isText).toEqual(false);
  expect(new ViberEvent(unsubscribed).isText).toEqual(false);
  expect(new ViberEvent(conversationStarted).isText).toEqual(false);
  expect(new ViberEvent(delivered).isText).toEqual(false);
  expect(new ViberEvent(seen).isText).toEqual(false);
  expect(new ViberEvent(failed).isText).toEqual(false);
  expect(new ViberEvent(textMessage).isText).toEqual(true);
  expect(new ViberEvent(pictureMessage).isText).toEqual(false);
  expect(new ViberEvent(videoMessage).isText).toEqual(false);
  expect(new ViberEvent(fileMessage).isText).toEqual(false);
  expect(new ViberEvent(stickerMessage).isText).toEqual(false);
  expect(new ViberEvent(contactMessage).isText).toEqual(false);
  expect(new ViberEvent(urlMessage).isText).toEqual(false);
  expect(new ViberEvent(locationMessage).isText).toEqual(false);
});

it('#text', () => {
  expect(new ViberEvent(subscribed).text).toEqual(null);
  expect(new ViberEvent(unsubscribed).text).toEqual(null);
  expect(new ViberEvent(conversationStarted).text).toEqual(null);
  expect(new ViberEvent(delivered).text).toEqual(null);
  expect(new ViberEvent(seen).text).toEqual(null);
  expect(new ViberEvent(failed).text).toEqual(null);
  expect(new ViberEvent(textMessage).text).toEqual('a message to the service');
  expect(new ViberEvent(pictureMessage).text).toEqual(
    'a message to the service'
  );
  expect(new ViberEvent(videoMessage).text).toEqual(null);
  expect(new ViberEvent(fileMessage).text).toEqual(null);
  expect(new ViberEvent(stickerMessage).text).toEqual(null);
  expect(new ViberEvent(contactMessage).text).toEqual(null);
  expect(new ViberEvent(urlMessage).text).toEqual(null);
  expect(new ViberEvent(locationMessage).text).toEqual(null);
});

it('#isPicture', () => {
  expect(new ViberEvent(subscribed).isPicture).toEqual(false);
  expect(new ViberEvent(unsubscribed).isPicture).toEqual(false);
  expect(new ViberEvent(conversationStarted).isPicture).toEqual(false);
  expect(new ViberEvent(delivered).isPicture).toEqual(false);
  expect(new ViberEvent(seen).isPicture).toEqual(false);
  expect(new ViberEvent(failed).isPicture).toEqual(false);
  expect(new ViberEvent(textMessage).isPicture).toEqual(false);
  expect(new ViberEvent(pictureMessage).isPicture).toEqual(true);
  expect(new ViberEvent(videoMessage).isPicture).toEqual(false);
  expect(new ViberEvent(fileMessage).isPicture).toEqual(false);
  expect(new ViberEvent(stickerMessage).isPicture).toEqual(false);
  expect(new ViberEvent(contactMessage).isPicture).toEqual(false);
  expect(new ViberEvent(urlMessage).isPicture).toEqual(false);
  expect(new ViberEvent(locationMessage).isPicture).toEqual(false);
});

it('#picture', () => {
  expect(new ViberEvent(subscribed).picture).toEqual(null);
  expect(new ViberEvent(unsubscribed).picture).toEqual(null);
  expect(new ViberEvent(conversationStarted).picture).toEqual(null);
  expect(new ViberEvent(delivered).picture).toEqual(null);
  expect(new ViberEvent(seen).picture).toEqual(null);
  expect(new ViberEvent(failed).picture).toEqual(null);
  expect(new ViberEvent(textMessage).picture).toEqual(null);
  expect(new ViberEvent(pictureMessage).picture).toEqual(
    'http://example.com/img.jpg'
  );
  expect(new ViberEvent(videoMessage).picture).toEqual(null);
  expect(new ViberEvent(fileMessage).picture).toEqual(null);
  expect(new ViberEvent(stickerMessage).picture).toEqual(null);
  expect(new ViberEvent(contactMessage).picture).toEqual(null);
  expect(new ViberEvent(urlMessage).picture).toEqual(null);
  expect(new ViberEvent(locationMessage).picture).toEqual(null);
});

it('#isVideo', () => {
  expect(new ViberEvent(subscribed).isVideo).toEqual(false);
  expect(new ViberEvent(unsubscribed).isVideo).toEqual(false);
  expect(new ViberEvent(conversationStarted).isVideo).toEqual(false);
  expect(new ViberEvent(delivered).isVideo).toEqual(false);
  expect(new ViberEvent(seen).isVideo).toEqual(false);
  expect(new ViberEvent(failed).isVideo).toEqual(false);
  expect(new ViberEvent(textMessage).isVideo).toEqual(false);
  expect(new ViberEvent(pictureMessage).isVideo).toEqual(false);
  expect(new ViberEvent(videoMessage).isVideo).toEqual(true);
  expect(new ViberEvent(fileMessage).isVideo).toEqual(false);
  expect(new ViberEvent(stickerMessage).isVideo).toEqual(false);
  expect(new ViberEvent(contactMessage).isVideo).toEqual(false);
  expect(new ViberEvent(urlMessage).isVideo).toEqual(false);
  expect(new ViberEvent(locationMessage).isVideo).toEqual(false);
});

it('#video', () => {
  expect(new ViberEvent(subscribed).video).toEqual(null);
  expect(new ViberEvent(unsubscribed).video).toEqual(null);
  expect(new ViberEvent(conversationStarted).video).toEqual(null);
  expect(new ViberEvent(delivered).video).toEqual(null);
  expect(new ViberEvent(seen).video).toEqual(null);
  expect(new ViberEvent(failed).video).toEqual(null);
  expect(new ViberEvent(textMessage).video).toEqual(null);
  expect(new ViberEvent(pictureMessage).video).toEqual(null);
  expect(new ViberEvent(videoMessage).video).toEqual(
    'http://example.com/video.mp4'
  );
  expect(new ViberEvent(fileMessage).video).toEqual(null);
  expect(new ViberEvent(stickerMessage).video).toEqual(null);
  expect(new ViberEvent(contactMessage).video).toEqual(null);
  expect(new ViberEvent(urlMessage).video).toEqual(null);
  expect(new ViberEvent(locationMessage).video).toEqual(null);
});

it('#isFile', () => {
  expect(new ViberEvent(subscribed).isFile).toEqual(false);
  expect(new ViberEvent(unsubscribed).isFile).toEqual(false);
  expect(new ViberEvent(conversationStarted).isFile).toEqual(false);
  expect(new ViberEvent(delivered).isFile).toEqual(false);
  expect(new ViberEvent(seen).isFile).toEqual(false);
  expect(new ViberEvent(failed).isFile).toEqual(false);
  expect(new ViberEvent(textMessage).isFile).toEqual(false);
  expect(new ViberEvent(pictureMessage).isFile).toEqual(false);
  expect(new ViberEvent(videoMessage).isFile).toEqual(false);
  expect(new ViberEvent(fileMessage).isFile).toEqual(true);
  expect(new ViberEvent(stickerMessage).isFile).toEqual(false);
  expect(new ViberEvent(contactMessage).isFile).toEqual(false);
  expect(new ViberEvent(urlMessage).isFile).toEqual(false);
  expect(new ViberEvent(locationMessage).isFile).toEqual(false);
});

it('#file', () => {
  expect(new ViberEvent(subscribed).file).toEqual(null);
  expect(new ViberEvent(unsubscribed).file).toEqual(null);
  expect(new ViberEvent(conversationStarted).file).toEqual(null);
  expect(new ViberEvent(delivered).file).toEqual(null);
  expect(new ViberEvent(seen).file).toEqual(null);
  expect(new ViberEvent(failed).file).toEqual(null);
  expect(new ViberEvent(textMessage).file).toEqual(null);
  expect(new ViberEvent(pictureMessage).file).toEqual(null);
  expect(new ViberEvent(videoMessage).file).toEqual(null);
  expect(new ViberEvent(fileMessage).file).toEqual(
    'http://example.com/doc.pdf'
  );
  expect(new ViberEvent(stickerMessage).file).toEqual(null);
  expect(new ViberEvent(contactMessage).file).toEqual(null);
  expect(new ViberEvent(urlMessage).file).toEqual(null);
  expect(new ViberEvent(locationMessage).file).toEqual(null);
});

it('#isSticker', () => {
  expect(new ViberEvent(subscribed).isSticker).toEqual(false);
  expect(new ViberEvent(unsubscribed).isSticker).toEqual(false);
  expect(new ViberEvent(conversationStarted).isSticker).toEqual(false);
  expect(new ViberEvent(delivered).isSticker).toEqual(false);
  expect(new ViberEvent(seen).isSticker).toEqual(false);
  expect(new ViberEvent(failed).isSticker).toEqual(false);
  expect(new ViberEvent(textMessage).isSticker).toEqual(false);
  expect(new ViberEvent(pictureMessage).isSticker).toEqual(false);
  expect(new ViberEvent(videoMessage).isSticker).toEqual(false);
  expect(new ViberEvent(fileMessage).isSticker).toEqual(false);
  expect(new ViberEvent(stickerMessage).isSticker).toEqual(true);
  expect(new ViberEvent(contactMessage).isSticker).toEqual(false);
  expect(new ViberEvent(urlMessage).isSticker).toEqual(false);
  expect(new ViberEvent(locationMessage).isSticker).toEqual(false);
});

it('#sticker', () => {
  expect(new ViberEvent(subscribed).sticker).toEqual(null);
  expect(new ViberEvent(unsubscribed).sticker).toEqual(null);
  expect(new ViberEvent(conversationStarted).sticker).toEqual(null);
  expect(new ViberEvent(delivered).sticker).toEqual(null);
  expect(new ViberEvent(seen).sticker).toEqual(null);
  expect(new ViberEvent(failed).sticker).toEqual(null);
  expect(new ViberEvent(textMessage).sticker).toEqual(null);
  expect(new ViberEvent(pictureMessage).sticker).toEqual(null);
  expect(new ViberEvent(videoMessage).sticker).toEqual(null);
  expect(new ViberEvent(fileMessage).sticker).toEqual(null);
  expect(new ViberEvent(stickerMessage).sticker).toEqual(46105);
  expect(new ViberEvent(contactMessage).sticker).toEqual(null);
  expect(new ViberEvent(urlMessage).sticker).toEqual(null);
  expect(new ViberEvent(locationMessage).sticker).toEqual(null);
});

it('#isContact', () => {
  expect(new ViberEvent(subscribed).isContact).toEqual(false);
  expect(new ViberEvent(unsubscribed).isContact).toEqual(false);
  expect(new ViberEvent(conversationStarted).isContact).toEqual(false);
  expect(new ViberEvent(delivered).isContact).toEqual(false);
  expect(new ViberEvent(seen).isContact).toEqual(false);
  expect(new ViberEvent(failed).isContact).toEqual(false);
  expect(new ViberEvent(textMessage).isContact).toEqual(false);
  expect(new ViberEvent(pictureMessage).isContact).toEqual(false);
  expect(new ViberEvent(videoMessage).isContact).toEqual(false);
  expect(new ViberEvent(fileMessage).isContact).toEqual(false);
  expect(new ViberEvent(stickerMessage).isContact).toEqual(false);
  expect(new ViberEvent(contactMessage).isContact).toEqual(true);
  expect(new ViberEvent(urlMessage).isContact).toEqual(false);
  expect(new ViberEvent(locationMessage).isContact).toEqual(false);
});

it('#contact', () => {
  expect(new ViberEvent(subscribed).contact).toEqual(null);
  expect(new ViberEvent(unsubscribed).contact).toEqual(null);
  expect(new ViberEvent(conversationStarted).contact).toEqual(null);
  expect(new ViberEvent(delivered).contact).toEqual(null);
  expect(new ViberEvent(seen).contact).toEqual(null);
  expect(new ViberEvent(failed).contact).toEqual(null);
  expect(new ViberEvent(textMessage).contact).toEqual(null);
  expect(new ViberEvent(pictureMessage).contact).toEqual(null);
  expect(new ViberEvent(videoMessage).contact).toEqual(null);
  expect(new ViberEvent(fileMessage).contact).toEqual(null);
  expect(new ViberEvent(stickerMessage).contact).toEqual(null);
  expect(new ViberEvent(contactMessage).contact).toEqual({
    name: 'Itamar',
    phone_number: '+972511123123',
  });
  expect(new ViberEvent(urlMessage).contact).toEqual(null);
  expect(new ViberEvent(locationMessage).contact).toEqual(null);
});

it('#isURL', () => {
  expect(new ViberEvent(subscribed).isURL).toEqual(false);
  expect(new ViberEvent(unsubscribed).isURL).toEqual(false);
  expect(new ViberEvent(conversationStarted).isURL).toEqual(false);
  expect(new ViberEvent(delivered).isURL).toEqual(false);
  expect(new ViberEvent(seen).isURL).toEqual(false);
  expect(new ViberEvent(failed).isURL).toEqual(false);
  expect(new ViberEvent(textMessage).isURL).toEqual(false);
  expect(new ViberEvent(pictureMessage).isURL).toEqual(false);
  expect(new ViberEvent(videoMessage).isURL).toEqual(false);
  expect(new ViberEvent(fileMessage).isURL).toEqual(false);
  expect(new ViberEvent(stickerMessage).isURL).toEqual(false);
  expect(new ViberEvent(contactMessage).isURL).toEqual(false);
  expect(new ViberEvent(urlMessage).isURL).toEqual(true);
  expect(new ViberEvent(locationMessage).isURL).toEqual(false);
});

it('#url', () => {
  expect(new ViberEvent(subscribed).url).toEqual(null);
  expect(new ViberEvent(unsubscribed).url).toEqual(null);
  expect(new ViberEvent(conversationStarted).url).toEqual(null);
  expect(new ViberEvent(delivered).url).toEqual(null);
  expect(new ViberEvent(seen).url).toEqual(null);
  expect(new ViberEvent(failed).url).toEqual(null);
  expect(new ViberEvent(textMessage).url).toEqual(null);
  expect(new ViberEvent(pictureMessage).url).toEqual(null);
  expect(new ViberEvent(videoMessage).url).toEqual(null);
  expect(new ViberEvent(fileMessage).url).toEqual(null);
  expect(new ViberEvent(stickerMessage).url).toEqual(null);
  expect(new ViberEvent(contactMessage).url).toEqual(null);
  expect(new ViberEvent(urlMessage).url).toEqual('http://example.com');
  expect(new ViberEvent(locationMessage).url).toEqual(null);
});

it('#isLocation', () => {
  expect(new ViberEvent(subscribed).isLocation).toEqual(false);
  expect(new ViberEvent(unsubscribed).isLocation).toEqual(false);
  expect(new ViberEvent(conversationStarted).isLocation).toEqual(false);
  expect(new ViberEvent(delivered).isLocation).toEqual(false);
  expect(new ViberEvent(seen).isLocation).toEqual(false);
  expect(new ViberEvent(failed).isLocation).toEqual(false);
  expect(new ViberEvent(textMessage).isLocation).toEqual(false);
  expect(new ViberEvent(pictureMessage).isLocation).toEqual(false);
  expect(new ViberEvent(videoMessage).isLocation).toEqual(false);
  expect(new ViberEvent(fileMessage).isLocation).toEqual(false);
  expect(new ViberEvent(stickerMessage).isLocation).toEqual(false);
  expect(new ViberEvent(contactMessage).isLocation).toEqual(false);
  expect(new ViberEvent(urlMessage).isLocation).toEqual(false);
  expect(new ViberEvent(locationMessage).isLocation).toEqual(true);
});

it('#location', () => {
  expect(new ViberEvent(subscribed).location).toEqual(null);
  expect(new ViberEvent(unsubscribed).location).toEqual(null);
  expect(new ViberEvent(conversationStarted).location).toEqual(null);
  expect(new ViberEvent(delivered).location).toEqual(null);
  expect(new ViberEvent(seen).location).toEqual(null);
  expect(new ViberEvent(failed).location).toEqual(null);
  expect(new ViberEvent(textMessage).location).toEqual(null);
  expect(new ViberEvent(pictureMessage).location).toEqual(null);
  expect(new ViberEvent(videoMessage).location).toEqual(null);
  expect(new ViberEvent(fileMessage).location).toEqual(null);
  expect(new ViberEvent(stickerMessage).location).toEqual(null);
  expect(new ViberEvent(contactMessage).location).toEqual(null);
  expect(new ViberEvent(urlMessage).location).toEqual(null);
  expect(new ViberEvent(locationMessage).location).toEqual({
    lat: 50.76891,
    lon: 6.11499,
  });
});

it('#isSubscribed', () => {
  expect(new ViberEvent(subscribed).isSubscribed).toEqual(true);
  expect(new ViberEvent(unsubscribed).isSubscribed).toEqual(false);
  expect(new ViberEvent(conversationStarted).isSubscribed).toEqual(false);
  expect(new ViberEvent(delivered).isSubscribed).toEqual(false);
  expect(new ViberEvent(seen).isSubscribed).toEqual(false);
  expect(new ViberEvent(failed).isSubscribed).toEqual(false);
  expect(new ViberEvent(textMessage).isSubscribed).toEqual(false);
});

it('#subscribed', () => {
  expect(new ViberEvent(subscribed).subscribed).toEqual({
    event: 'subscribed',
    timestamp: 1457764197627,
    user: {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      api_version: 1,
    },
    message_token: 4912661846655238145,
  });
  expect(new ViberEvent(unsubscribed).subscribed).toEqual(null);
  expect(new ViberEvent(conversationStarted).subscribed).toEqual(null);
  expect(new ViberEvent(delivered).subscribed).toEqual(null);
  expect(new ViberEvent(seen).subscribed).toEqual(null);
  expect(new ViberEvent(failed).subscribed).toEqual(null);
  expect(new ViberEvent(textMessage).subscribed).toEqual(null);
});

it('#isUnsubscribed', () => {
  expect(new ViberEvent(subscribed).isUnsubscribed).toEqual(false);
  expect(new ViberEvent(unsubscribed).isUnsubscribed).toEqual(true);
  expect(new ViberEvent(conversationStarted).isUnsubscribed).toEqual(false);
  expect(new ViberEvent(delivered).isUnsubscribed).toEqual(false);
  expect(new ViberEvent(seen).isUnsubscribed).toEqual(false);
  expect(new ViberEvent(failed).isUnsubscribed).toEqual(false);
  expect(new ViberEvent(textMessage).isUnsubscribed).toEqual(false);
});

it('#unsubscribed', () => {
  expect(new ViberEvent(subscribed).unsubscribed).toEqual(null);
  expect(new ViberEvent(unsubscribed).unsubscribed).toEqual({
    event: 'unsubscribed',
    timestamp: 1457764197627,
    user_id: '01234567890A=',
    message_token: 4912661846655238145,
  });
  expect(new ViberEvent(conversationStarted).unsubscribed).toEqual(null);
  expect(new ViberEvent(delivered).unsubscribed).toEqual(null);
  expect(new ViberEvent(seen).unsubscribed).toEqual(null);
  expect(new ViberEvent(failed).unsubscribed).toEqual(null);
  expect(new ViberEvent(textMessage).unsubscribed).toEqual(null);
});

it('#isConversationStarted', () => {
  expect(new ViberEvent(subscribed).isConversationStarted).toEqual(false);
  expect(new ViberEvent(unsubscribed).isConversationStarted).toEqual(false);
  expect(new ViberEvent(conversationStarted).isConversationStarted).toEqual(
    true
  );
  expect(new ViberEvent(delivered).isConversationStarted).toEqual(false);
  expect(new ViberEvent(seen).isConversationStarted).toEqual(false);
  expect(new ViberEvent(failed).isConversationStarted).toEqual(false);
  expect(new ViberEvent(textMessage).isConversationStarted).toEqual(false);
});

it('#conversationStarted', () => {
  expect(new ViberEvent(subscribed).conversationStarted).toEqual(null);
  expect(new ViberEvent(unsubscribed).conversationStarted).toEqual(null);
  expect(new ViberEvent(conversationStarted).conversationStarted).toEqual({
    event: 'conversation_started',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    type: 'open',
    context: 'context information',
    user: {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      api_version: 1,
    },
    subscribed: false,
  });
  expect(new ViberEvent(delivered).conversationStarted).toEqual(null);
  expect(new ViberEvent(seen).conversationStarted).toEqual(null);
  expect(new ViberEvent(failed).conversationStarted).toEqual(null);
  expect(new ViberEvent(textMessage).conversationStarted).toEqual(null);
});

it('#isDelivered', () => {
  expect(new ViberEvent(subscribed).isDelivered).toEqual(false);
  expect(new ViberEvent(unsubscribed).isDelivered).toEqual(false);
  expect(new ViberEvent(conversationStarted).isDelivered).toEqual(false);
  expect(new ViberEvent(delivered).isDelivered).toEqual(true);
  expect(new ViberEvent(seen).isDelivered).toEqual(false);
  expect(new ViberEvent(failed).isDelivered).toEqual(false);
  expect(new ViberEvent(textMessage).isDelivered).toEqual(false);
});

it('#delivered', () => {
  expect(new ViberEvent(subscribed).delivered).toEqual(null);
  expect(new ViberEvent(unsubscribed).delivered).toEqual(null);
  expect(new ViberEvent(conversationStarted).delivered).toEqual(null);
  expect(new ViberEvent(delivered).delivered).toEqual({
    event: 'delivered',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    user_id: '01234567890A=',
  });
  expect(new ViberEvent(seen).delivered).toEqual(null);
  expect(new ViberEvent(failed).delivered).toEqual(null);
  expect(new ViberEvent(textMessage).delivered).toEqual(null);
});

it('#isSeen', () => {
  expect(new ViberEvent(subscribed).isSeen).toEqual(false);
  expect(new ViberEvent(unsubscribed).isSeen).toEqual(false);
  expect(new ViberEvent(conversationStarted).isSeen).toEqual(false);
  expect(new ViberEvent(delivered).isSeen).toEqual(false);
  expect(new ViberEvent(seen).isSeen).toEqual(true);
  expect(new ViberEvent(failed).isSeen).toEqual(false);
  expect(new ViberEvent(textMessage).isSeen).toEqual(false);
});

it('#seen', () => {
  expect(new ViberEvent(subscribed).seen).toEqual(null);
  expect(new ViberEvent(unsubscribed).seen).toEqual(null);
  expect(new ViberEvent(conversationStarted).seen).toEqual(null);
  expect(new ViberEvent(delivered).seen).toEqual(null);
  expect(new ViberEvent(seen).seen).toEqual({
    event: 'seen',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    user_id: '01234567890A=',
  });
  expect(new ViberEvent(failed).seen).toEqual(null);
  expect(new ViberEvent(textMessage).seen).toEqual(null);
});

it('#isFailed', () => {
  expect(new ViberEvent(subscribed).isFailed).toEqual(false);
  expect(new ViberEvent(unsubscribed).isFailed).toEqual(false);
  expect(new ViberEvent(conversationStarted).isFailed).toEqual(false);
  expect(new ViberEvent(delivered).isFailed).toEqual(false);
  expect(new ViberEvent(seen).isFailed).toEqual(false);
  expect(new ViberEvent(failed).isFailed).toEqual(true);
  expect(new ViberEvent(textMessage).isFailed).toEqual(false);
});

it('#failed', () => {
  expect(new ViberEvent(subscribed).failed).toEqual(null);
  expect(new ViberEvent(unsubscribed).failed).toEqual(null);
  expect(new ViberEvent(conversationStarted).failed).toEqual(null);
  expect(new ViberEvent(delivered).failed).toEqual(null);
  expect(new ViberEvent(seen).failed).toEqual(null);
  expect(new ViberEvent(failed).failed).toEqual({
    event: 'failed',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    user_id: '01234567890A=',
    desc: 'failure description',
  });
  expect(new ViberEvent(textMessage).failed).toEqual(null);
});
