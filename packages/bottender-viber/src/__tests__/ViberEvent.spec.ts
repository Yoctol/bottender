import ViberEvent from '../ViberEvent';
import * as ViberTypes from '../ViberTypes';

const subscribed: ViberTypes.ViberRawEvent = {
  event: 'subscribed',
  timestamp: 1457764197627,
  user: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    apiVersion: 1,
  },
  messageToken: 4912661846655238145,
};

const unsubscribed: ViberTypes.ViberRawEvent = {
  event: 'unsubscribed',
  timestamp: 1457764197627,
  userId: '01234567890A=',
  messageToken: 4912661846655238145,
};

const conversationStarted: ViberTypes.ViberRawEvent = {
  event: 'conversation_started',
  timestamp: 1457764197627,
  messageToken: 4912661846655238145,
  type: 'open',
  context: 'context information',
  user: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    apiVersion: 1,
  },
  subscribed: false,
};

const delivered: ViberTypes.ViberRawEvent = {
  event: 'delivered',
  timestamp: 1457764197627,
  messageToken: 4912661846655238145,
  userId: '01234567890A=',
};

const seen: ViberTypes.ViberRawEvent = {
  event: 'seen',
  timestamp: 1457764197627,
  messageToken: 4912661846655238145,
  userId: '01234567890A=',
};

const failed: ViberTypes.ViberRawEvent = {
  event: 'failed',
  timestamp: 1457764197627,
  messageToken: 4912661846655238145,
  userId: '01234567890A=',
  desc: 'failure description',
};

const textMessage: ViberTypes.ViberRawEvent = {
  event: 'message',
  timestamp: 1457764197627,
  messageToken: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    apiVersion: 1,
  },
  message: {
    type: 'text',
    text: 'a message to the service',
    trackingData: 'tracking data',
  },
};

const pictureMessage: ViberTypes.ViberRawEvent = {
  event: 'message',
  timestamp: 1457764197627,
  messageToken: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    apiVersion: 1,
  },
  message: {
    type: 'picture',
    text: 'a message to the service',
    media: 'http://example.com/img.jpg',
    trackingData: 'tracking data',
  },
};

const videoMessage: ViberTypes.ViberRawEvent = {
  event: 'message',
  timestamp: 1457764197627,
  messageToken: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    apiVersion: 1,
  },
  message: {
    type: 'video',
    media: 'http://example.com/video.mp4',
    duration: 320,
    trackingData: 'tracking data',
  },
};

const fileMessage: ViberTypes.ViberRawEvent = {
  event: 'message',
  timestamp: 1457764197627,
  messageToken: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    apiVersion: 1,
  },
  message: {
    type: 'file',
    media: 'http://example.com/doc.pdf',
    fileName: 'doc.pdf',
    fileSize: 3220,
    trackingData: 'tracking data',
  },
};

const stickerMessage: ViberTypes.ViberRawEvent = {
  event: 'message',
  timestamp: 1457764197627,
  messageToken: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    apiVersion: 1,
  },
  message: {
    type: 'sticker',
    stickerId: 46105,
    trackingData: 'tracking data',
  },
};

const contactMessage: ViberTypes.ViberRawEvent = {
  event: 'message',
  timestamp: 1457764197627,
  messageToken: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    apiVersion: 1,
  },
  message: {
    type: 'contact',
    contact: {
      name: 'Itamar',
      phoneNumber: '+972511123123',
    },
    trackingData: 'tracking data',
  },
};

const urlMessage: ViberTypes.ViberRawEvent = {
  event: 'message',
  timestamp: 1457764197627,
  messageToken: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    apiVersion: 1,
  },
  message: {
    type: 'url',
    media: 'http://example.com',
    trackingData: 'tracking data',
  },
};

const locationMessage: ViberTypes.ViberRawEvent = {
  event: 'message',
  timestamp: 1457764197627,
  messageToken: 4912661846655238145,
  sender: {
    id: '01234567890A=',
    name: 'John McClane',
    avatar: 'http://avatar.example.com',
    country: 'UK',
    language: 'en',
    apiVersion: 1,
  },
  message: {
    type: 'location',
    location: {
      lat: 50.76891,
      lon: 6.11499,
    },
    trackingData: 'tracking data',
  },
};

it('#rawEvent', () => {
  expect(new ViberEvent(textMessage).rawEvent).toEqual(textMessage);
});

it('#timestamp', () => {
  expect(new ViberEvent(textMessage).timestamp).toEqual(1457764197627);
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
  expect(new ViberEvent(subscribed).message).toBeUndefined();
  expect(new ViberEvent(unsubscribed).message).toBeUndefined();
  expect(new ViberEvent(conversationStarted).message).toBeUndefined();
  expect(new ViberEvent(delivered).message).toBeUndefined();
  expect(new ViberEvent(seen).message).toBeUndefined();
  expect(new ViberEvent(failed).message).toBeUndefined();
  expect(new ViberEvent(textMessage).message).toEqual({
    type: 'text',
    text: 'a message to the service',
    trackingData: 'tracking data',
  });
  expect(new ViberEvent(pictureMessage).message).toEqual({
    type: 'picture',
    text: 'a message to the service',
    media: 'http://example.com/img.jpg',
    trackingData: 'tracking data',
  });
  expect(new ViberEvent(videoMessage).message).toEqual({
    type: 'video',
    media: 'http://example.com/video.mp4',
    duration: 320,
    trackingData: 'tracking data',
  });
  expect(new ViberEvent(fileMessage).message).toEqual({
    type: 'file',
    media: 'http://example.com/doc.pdf',
    fileName: 'doc.pdf',
    fileSize: 3220,
    trackingData: 'tracking data',
  });
  expect(new ViberEvent(stickerMessage).message).toEqual({
    type: 'sticker',
    stickerId: 46105,
    trackingData: 'tracking data',
  });
  expect(new ViberEvent(contactMessage).message).toEqual({
    type: 'contact',
    contact: {
      name: 'Itamar',
      phoneNumber: '+972511123123',
    },
    trackingData: 'tracking data',
  });
  expect(new ViberEvent(urlMessage).message).toEqual({
    type: 'url',
    media: 'http://example.com',
    trackingData: 'tracking data',
  });
  expect(new ViberEvent(locationMessage).message).toEqual({
    type: 'location',
    location: {
      lat: 50.76891,
      lon: 6.11499,
    },
    trackingData: 'tracking data',
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
  expect(new ViberEvent(subscribed).text).toBeUndefined();
  expect(new ViberEvent(unsubscribed).text).toBeUndefined();
  expect(new ViberEvent(conversationStarted).text).toBeUndefined();
  expect(new ViberEvent(delivered).text).toBeUndefined();
  expect(new ViberEvent(seen).text).toBeUndefined();
  expect(new ViberEvent(failed).text).toBeUndefined();
  expect(new ViberEvent(textMessage).text).toEqual('a message to the service');
  expect(new ViberEvent(pictureMessage).text).toEqual(
    'a message to the service'
  );
  expect(new ViberEvent(videoMessage).text).toBeUndefined();
  expect(new ViberEvent(fileMessage).text).toBeUndefined();
  expect(new ViberEvent(stickerMessage).text).toBeUndefined();
  expect(new ViberEvent(contactMessage).text).toBeUndefined();
  expect(new ViberEvent(urlMessage).text).toBeUndefined();
  expect(new ViberEvent(locationMessage).text).toBeUndefined();
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
  expect(new ViberEvent(subscribed).picture).toBeUndefined();
  expect(new ViberEvent(unsubscribed).picture).toBeUndefined();
  expect(new ViberEvent(conversationStarted).picture).toBeUndefined();
  expect(new ViberEvent(delivered).picture).toBeUndefined();
  expect(new ViberEvent(seen).picture).toBeUndefined();
  expect(new ViberEvent(failed).picture).toBeUndefined();
  expect(new ViberEvent(textMessage).picture).toBeUndefined();
  expect(new ViberEvent(pictureMessage).picture).toEqual(
    'http://example.com/img.jpg'
  );
  expect(new ViberEvent(videoMessage).picture).toBeUndefined();
  expect(new ViberEvent(fileMessage).picture).toBeUndefined();
  expect(new ViberEvent(stickerMessage).picture).toBeUndefined();
  expect(new ViberEvent(contactMessage).picture).toBeUndefined();
  expect(new ViberEvent(urlMessage).picture).toBeUndefined();
  expect(new ViberEvent(locationMessage).picture).toBeUndefined();
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
  expect(new ViberEvent(subscribed).video).toBeUndefined();
  expect(new ViberEvent(unsubscribed).video).toBeUndefined();
  expect(new ViberEvent(conversationStarted).video).toBeUndefined();
  expect(new ViberEvent(delivered).video).toBeUndefined();
  expect(new ViberEvent(seen).video).toBeUndefined();
  expect(new ViberEvent(failed).video).toBeUndefined();
  expect(new ViberEvent(textMessage).video).toBeUndefined();
  expect(new ViberEvent(pictureMessage).video).toBeUndefined();
  expect(new ViberEvent(videoMessage).video).toEqual(
    'http://example.com/video.mp4'
  );
  expect(new ViberEvent(fileMessage).video).toBeUndefined();
  expect(new ViberEvent(stickerMessage).video).toBeUndefined();
  expect(new ViberEvent(contactMessage).video).toBeUndefined();
  expect(new ViberEvent(urlMessage).video).toBeUndefined();
  expect(new ViberEvent(locationMessage).video).toBeUndefined();
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
  expect(new ViberEvent(subscribed).file).toBeUndefined();
  expect(new ViberEvent(unsubscribed).file).toBeUndefined();
  expect(new ViberEvent(conversationStarted).file).toBeUndefined();
  expect(new ViberEvent(delivered).file).toBeUndefined();
  expect(new ViberEvent(seen).file).toBeUndefined();
  expect(new ViberEvent(failed).file).toBeUndefined();
  expect(new ViberEvent(textMessage).file).toBeUndefined();
  expect(new ViberEvent(pictureMessage).file).toBeUndefined();
  expect(new ViberEvent(videoMessage).file).toBeUndefined();
  expect(new ViberEvent(fileMessage).file).toEqual(
    'http://example.com/doc.pdf'
  );
  expect(new ViberEvent(stickerMessage).file).toBeUndefined();
  expect(new ViberEvent(contactMessage).file).toBeUndefined();
  expect(new ViberEvent(urlMessage).file).toBeUndefined();
  expect(new ViberEvent(locationMessage).file).toBeUndefined();
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
  expect(new ViberEvent(subscribed).sticker).toBeUndefined();
  expect(new ViberEvent(unsubscribed).sticker).toBeUndefined();
  expect(new ViberEvent(conversationStarted).sticker).toBeUndefined();
  expect(new ViberEvent(delivered).sticker).toBeUndefined();
  expect(new ViberEvent(seen).sticker).toBeUndefined();
  expect(new ViberEvent(failed).sticker).toBeUndefined();
  expect(new ViberEvent(textMessage).sticker).toBeUndefined();
  expect(new ViberEvent(pictureMessage).sticker).toBeUndefined();
  expect(new ViberEvent(videoMessage).sticker).toBeUndefined();
  expect(new ViberEvent(fileMessage).sticker).toBeUndefined();
  expect(new ViberEvent(stickerMessage).sticker).toEqual(46105);
  expect(new ViberEvent(contactMessage).sticker).toBeUndefined();
  expect(new ViberEvent(urlMessage).sticker).toBeUndefined();
  expect(new ViberEvent(locationMessage).sticker).toBeUndefined();
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
  expect(new ViberEvent(subscribed).contact).toBeUndefined();
  expect(new ViberEvent(unsubscribed).contact).toBeUndefined();
  expect(new ViberEvent(conversationStarted).contact).toBeUndefined();
  expect(new ViberEvent(delivered).contact).toBeUndefined();
  expect(new ViberEvent(seen).contact).toBeUndefined();
  expect(new ViberEvent(failed).contact).toBeUndefined();
  expect(new ViberEvent(textMessage).contact).toBeUndefined();
  expect(new ViberEvent(pictureMessage).contact).toBeUndefined();
  expect(new ViberEvent(videoMessage).contact).toBeUndefined();
  expect(new ViberEvent(fileMessage).contact).toBeUndefined();
  expect(new ViberEvent(stickerMessage).contact).toBeUndefined();
  expect(new ViberEvent(contactMessage).contact).toEqual({
    name: 'Itamar',
    phoneNumber: '+972511123123',
  });
  expect(new ViberEvent(urlMessage).contact).toBeUndefined();
  expect(new ViberEvent(locationMessage).contact).toBeUndefined();
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
  expect(new ViberEvent(subscribed).url).toBeUndefined();
  expect(new ViberEvent(unsubscribed).url).toBeUndefined();
  expect(new ViberEvent(conversationStarted).url).toBeUndefined();
  expect(new ViberEvent(delivered).url).toBeUndefined();
  expect(new ViberEvent(seen).url).toBeUndefined();
  expect(new ViberEvent(failed).url).toBeUndefined();
  expect(new ViberEvent(textMessage).url).toBeUndefined();
  expect(new ViberEvent(pictureMessage).url).toBeUndefined();
  expect(new ViberEvent(videoMessage).url).toBeUndefined();
  expect(new ViberEvent(fileMessage).url).toBeUndefined();
  expect(new ViberEvent(stickerMessage).url).toBeUndefined();
  expect(new ViberEvent(contactMessage).url).toBeUndefined();
  expect(new ViberEvent(urlMessage).url).toEqual('http://example.com');
  expect(new ViberEvent(locationMessage).url).toBeUndefined();
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
  expect(new ViberEvent(subscribed).location).toBeUndefined();
  expect(new ViberEvent(unsubscribed).location).toBeUndefined();
  expect(new ViberEvent(conversationStarted).location).toBeUndefined();
  expect(new ViberEvent(delivered).location).toBeUndefined();
  expect(new ViberEvent(seen).location).toBeUndefined();
  expect(new ViberEvent(failed).location).toBeUndefined();
  expect(new ViberEvent(textMessage).location).toBeUndefined();
  expect(new ViberEvent(pictureMessage).location).toBeUndefined();
  expect(new ViberEvent(videoMessage).location).toBeUndefined();
  expect(new ViberEvent(fileMessage).location).toBeUndefined();
  expect(new ViberEvent(stickerMessage).location).toBeUndefined();
  expect(new ViberEvent(contactMessage).location).toBeUndefined();
  expect(new ViberEvent(urlMessage).location).toBeUndefined();
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
      apiVersion: 1,
    },
    messageToken: 4912661846655238145,
  });
  expect(new ViberEvent(unsubscribed).subscribed).toBeUndefined();
  expect(new ViberEvent(conversationStarted).subscribed).toBeUndefined();
  expect(new ViberEvent(delivered).subscribed).toBeUndefined();
  expect(new ViberEvent(seen).subscribed).toBeUndefined();
  expect(new ViberEvent(failed).subscribed).toBeUndefined();
  expect(new ViberEvent(textMessage).subscribed).toBeUndefined();
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
  expect(new ViberEvent(subscribed).unsubscribed).toBeUndefined();
  expect(new ViberEvent(unsubscribed).unsubscribed).toEqual({
    event: 'unsubscribed',
    timestamp: 1457764197627,
    userId: '01234567890A=',
    messageToken: 4912661846655238145,
  });
  expect(new ViberEvent(conversationStarted).unsubscribed).toBeUndefined();
  expect(new ViberEvent(delivered).unsubscribed).toBeUndefined();
  expect(new ViberEvent(seen).unsubscribed).toBeUndefined();
  expect(new ViberEvent(failed).unsubscribed).toBeUndefined();
  expect(new ViberEvent(textMessage).unsubscribed).toBeUndefined();
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
  expect(new ViberEvent(subscribed).conversationStarted).toBeUndefined();
  expect(new ViberEvent(unsubscribed).conversationStarted).toBeUndefined();
  expect(new ViberEvent(conversationStarted).conversationStarted).toEqual({
    event: 'conversation_started',
    timestamp: 1457764197627,
    messageToken: 4912661846655238145,
    type: 'open',
    context: 'context information',
    user: {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      apiVersion: 1,
    },
    subscribed: false,
  });
  expect(new ViberEvent(delivered).conversationStarted).toBeUndefined();
  expect(new ViberEvent(seen).conversationStarted).toBeUndefined();
  expect(new ViberEvent(failed).conversationStarted).toBeUndefined();
  expect(new ViberEvent(textMessage).conversationStarted).toBeUndefined();
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
  expect(new ViberEvent(subscribed).delivered).toBeUndefined();
  expect(new ViberEvent(unsubscribed).delivered).toBeUndefined();
  expect(new ViberEvent(conversationStarted).delivered).toBeUndefined();
  expect(new ViberEvent(delivered).delivered).toEqual({
    event: 'delivered',
    timestamp: 1457764197627,
    messageToken: 4912661846655238145,
    userId: '01234567890A=',
  });
  expect(new ViberEvent(seen).delivered).toBeUndefined();
  expect(new ViberEvent(failed).delivered).toBeUndefined();
  expect(new ViberEvent(textMessage).delivered).toBeUndefined();
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
  expect(new ViberEvent(subscribed).seen).toBeUndefined();
  expect(new ViberEvent(unsubscribed).seen).toBeUndefined();
  expect(new ViberEvent(conversationStarted).seen).toBeUndefined();
  expect(new ViberEvent(delivered).seen).toBeUndefined();
  expect(new ViberEvent(seen).seen).toEqual({
    event: 'seen',
    timestamp: 1457764197627,
    messageToken: 4912661846655238145,
    userId: '01234567890A=',
  });
  expect(new ViberEvent(failed).seen).toBeUndefined();
  expect(new ViberEvent(textMessage).seen).toBeUndefined();
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
  expect(new ViberEvent(subscribed).failed).toBeUndefined();
  expect(new ViberEvent(unsubscribed).failed).toBeUndefined();
  expect(new ViberEvent(conversationStarted).failed).toBeUndefined();
  expect(new ViberEvent(delivered).failed).toBeUndefined();
  expect(new ViberEvent(seen).failed).toBeUndefined();
  expect(new ViberEvent(failed).failed).toEqual({
    event: 'failed',
    timestamp: 1457764197627,
    messageToken: 4912661846655238145,
    userId: '01234567890A=',
    desc: 'failure description',
  });
  expect(new ViberEvent(textMessage).failed).toBeUndefined();
});
