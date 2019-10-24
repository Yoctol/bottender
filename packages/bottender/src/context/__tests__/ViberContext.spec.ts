jest.mock('delay');
jest.mock('messaging-api-viber');
jest.mock('warning');

let ViberClient;
let ViberContext;
let ViberEvent;
let sleep;
let warning;

beforeEach(() => {
  /* eslint-disable global-require */
  ViberClient = require('messaging-api-viber').ViberClient;
  ViberContext = require('../ViberContext').default;
  ViberEvent = require('../ViberEvent').default;
  sleep = require('delay');
  warning = require('warning');
  /* eslint-enable global-require */
});

const rawEvent = {
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
    tracking_data: 'tracking data',
  },
};

const setup = ({ session } = { session: { user: { id: 'fakeUserId' } } }) => {
  const client = ViberClient.connect();
  const args = {
    client,
    event: new ViberEvent(rawEvent),
    session,
  };
  const context = new ViberContext(args);
  return {
    context,
    session,
    client,
  };
};

it('be defined', () => {
  const { context } = setup();
  expect(context).toBeDefined();
});

it('#platform to be `viber`', () => {
  const { context } = setup();
  expect(context.platform).toBe('viber');
});

it('get #session works', () => {
  const { context, session } = setup();
  expect(context.session).toBe(session);
});

it('get #event works', () => {
  const { context } = setup();
  expect(context.event).toBeInstanceOf(ViberEvent);
});

it('get #client works', () => {
  const { context, client } = setup();
  expect(context.client).toBe(client);
});

describe('#sendText', () => {
  it('should call client.sendText', async () => {
    const { context, client, session } = setup();

    await context.sendText('hello');

    expect(client.sendText).toBeCalledWith(session.user.id, 'hello', undefined);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendText('hello');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendText('hello');

    expect(warning).toBeCalled();
    expect(client.sendText).not.toBeCalled();
  });
});

describe('#sendPicture', () => {
  it('should call client.sendPicture', async () => {
    const { context, client, session } = setup();

    await context.sendPicture({
      text: 'Photo description',
      media: 'http://www.images.com/img.jpg',
      thumbnail: 'http://www.images.com/thumb.jpg',
    });

    expect(client.sendPicture).toBeCalledWith(
      session.user.id,
      {
        text: 'Photo description',
        media: 'http://www.images.com/img.jpg',
        thumbnail: 'http://www.images.com/thumb.jpg',
      },
      undefined
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendPicture({
      text: 'Photo description',
      media: 'http://www.images.com/img.jpg',
      thumbnail: 'http://www.images.com/thumb.jpg',
    });

    expect(context.isHandled).toBe(true);
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.sendPicture({
      text: 'Photo description',
      media: 'http://www.images.com/img.jpg',
      thumbnail: 'http://www.images.com/thumb.jpg',
    });

    expect(client.sendPicture).not.toBeCalled();
  });
});

describe('#sendVideo', () => {
  it('should call client.sendVideo', async () => {
    const { context, client, session } = setup();

    await context.sendVideo({
      media: 'http://www.images.com/video.mp4',
      size: 10000,
      thumbnail: 'http://www.images.com/thumb.jpg',
      duration: 10,
    });

    expect(client.sendVideo).toBeCalledWith(
      session.user.id,
      {
        media: 'http://www.images.com/video.mp4',
        size: 10000,
        thumbnail: 'http://www.images.com/thumb.jpg',
        duration: 10,
      },
      undefined
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendVideo({
      media: 'http://www.images.com/video.mp4',
      size: 10000,
      thumbnail: 'http://www.images.com/thumb.jpg',
      duration: 10,
    });

    expect(context.isHandled).toBe(true);
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.sendVideo({
      media: 'http://www.images.com/video.mp4',
      size: 10000,
      thumbnail: 'http://www.images.com/thumb.jpg',
      duration: 10,
    });

    expect(client.sendVideo).not.toBeCalled();
  });
});

describe('#sendFile', () => {
  it('should call client.sendFile', async () => {
    const { context, client, session } = setup();

    await context.sendFile({
      media: 'http://www.images.com/file.doc',
      size: 10000,
      file_name: 'name_of_file.doc',
    });

    expect(client.sendFile).toBeCalledWith(
      session.user.id,
      {
        media: 'http://www.images.com/file.doc',
        size: 10000,
        file_name: 'name_of_file.doc',
      },
      undefined
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendFile({
      media: 'http://www.images.com/file.doc',
      size: 10000,
      file_name: 'name_of_file.doc',
    });

    expect(context.isHandled).toBe(true);
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.sendFile({
      media: 'http://www.images.com/file.doc',
      size: 10000,
      file_name: 'name_of_file.doc',
    });

    expect(client.sendFile).not.toBeCalled();
  });
});

describe('#sendContact', () => {
  it('should call client.sendContact', async () => {
    const { context, client, session } = setup();

    await context.sendContact({
      name: 'Itamar',
      phone_number: '+972511123123',
    });

    expect(client.sendContact).toBeCalledWith(
      session.user.id,
      {
        name: 'Itamar',
        phone_number: '+972511123123',
      },
      undefined
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendContact({
      name: 'Itamar',
      phone_number: '+972511123123',
    });

    expect(context.isHandled).toBe(true);
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.sendContact({
      name: 'Itamar',
      phone_number: '+972511123123',
    });

    expect(client.sendContact).not.toBeCalled();
  });
});

describe('#sendLocation', () => {
  it('should call client.sendLocation', async () => {
    const { context, client, session } = setup();

    await context.sendLocation({
      lat: '37.7898',
      lon: '-122.3942',
    });

    expect(client.sendLocation).toBeCalledWith(
      session.user.id,
      {
        lat: '37.7898',
        lon: '-122.3942',
      },
      undefined
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendLocation({
      lat: '37.7898',
      lon: '-122.3942',
    });

    expect(context.isHandled).toBe(true);
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.sendLocation({
      lat: '37.7898',
      lon: '-122.3942',
    });

    expect(client.sendLocation).not.toBeCalled();
  });
});

describe('#sendURL', () => {
  it('should call client.sendURL', async () => {
    const { context, client, session } = setup();

    await context.sendURL('http://developers.viber.com');

    expect(client.sendURL).toBeCalledWith(
      session.user.id,
      'http://developers.viber.com',
      undefined
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendURL('http://developers.viber.com');

    expect(context.isHandled).toBe(true);
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.sendURL('http://developers.viber.com');

    expect(client.sendURL).not.toBeCalled();
  });
});

describe('#sendSticker', () => {
  it('should call client.sendSticker', async () => {
    const { context, client, session } = setup();

    await context.sendSticker(46105);

    expect(client.sendSticker).toBeCalledWith(
      session.user.id,
      46105,
      undefined
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendSticker(46105);

    expect(context.isHandled).toBe(true);
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.sendSticker(46105);

    expect(client.sendSticker).not.toBeCalled();
  });
});

const richMedia = {
  Type: 'rich_media',
  ButtonsGroupColumns: 6,
  ButtonsGroupRows: 7,
  BgColor: '#FFFFFF',
  Buttons: [
    {
      Columns: 6,
      Rows: 3,
      ActionType: 'open-url',
      ActionBody: 'https://www.google.com',
      Image: 'http://html-test:8080/myweb/guy/assets/imageRMsmall2.png',
    },
    {
      Columns: 6,
      Rows: 2,
      Text:
        '<font color=#323232><b>Headphones with Microphone, On-ear Wired earphones</b></font><font color=#777777><br>Sound Intone </font><font color=#6fc133>$17.99</font>',
      ActionType: 'open-url',
      ActionBody: 'https://www.google.com',
      TextSize: 'medium',
      TextVAlign: 'middle',
      TextHAlign: 'left',
    },
    {
      Columns: 6,
      Rows: 1,
      ActionType: 'reply',
      ActionBody: 'https://www.google.com',
      Text: '<font color=#ffffff>Buy</font>',
      TextSize: 'large',
      TextVAlign: 'middle',
      TextHAlign: 'middle',
      Image: 'https://s14.postimg.org/4mmt4rw1t/Button.png',
    },
    {
      Columns: 6,
      Rows: 1,
      ActionType: 'reply',
      ActionBody: 'https://www.google.com',
      Text: '<font color=#8367db>MORE DETAILS</font>',
      TextSize: 'small',
      TextVAlign: 'middle',
      TextHAlign: 'middle',
    },
    {
      Columns: 6,
      Rows: 3,
      ActionType: 'open-url',
      ActionBody: 'https://www.google.com',
      Image: 'https://s16.postimg.org/wi8jx20wl/image_RMsmall2.png',
    },
    {
      Columns: 6,
      Rows: 2,
      Text:
        "<font color=#323232><b>Hanes Men's Humor Graphic T-Shirt</b></font><font color=#777777><br>Hanes</font><font color=#6fc133>$10.99</font>",
      ActionType: 'open-url',
      ActionBody: 'https://www.google.com',
      TextSize: 'medium',
      TextVAlign: 'middle',
      TextHAlign: 'left',
    },
    {
      Columns: 6,
      Rows: 1,
      ActionType: 'reply',
      ActionBody: 'https://www.google.com',
      Text: '<font color=#ffffff>Buy</font>',
      TextSize: 'large',
      TextVAlign: 'middle',
      TextHAlign: 'middle',
      Image: 'https://s14.postimg.org/4mmt4rw1t/Button.png',
    },
    {
      Columns: 6,
      Rows: 1,
      ActionType: 'reply',
      ActionBody: 'https://www.google.com',
      Text: '<font color=#8367db>MORE DETAILS</font>',
      TextSize: 'small',
      TextVAlign: 'middle',
      TextHAlign: 'middle',
    },
  ],
};

describe('#sendCarouselContent', () => {
  it('should call client.sendCarouselContent', async () => {
    const { context, client, session } = setup();

    await context.sendCarouselContent(richMedia);

    expect(client.sendCarouselContent).toBeCalledWith(
      session.user.id,
      richMedia,
      undefined
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendCarouselContent(richMedia);

    expect(context.isHandled).toBe(true);
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.sendCarouselContent(richMedia);

    expect(client.sendCarouselContent).not.toBeCalled();
  });
});

describe('#getUserDetails', () => {
  it('should call client.getUserDetails', async () => {
    const { context, client, session } = setup();

    const user = {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      primary_device_os: 'android 7.1',
      api_version: 1,
      viber_version: '6.5.0',
      mcc: 1,
      mnc: 1,
      device_type: 'iPhone9,4',
    };

    client.getUserDetails.mockResolvedValue(user);

    const result = await context.getUserDetails();

    expect(client.getUserDetails).toBeCalledWith(session.user.id);
    expect(result).toEqual(user);
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.getUserDetails();

    expect(client.getUserDetails).not.toBeCalled();
  });
});

describe('#getOnlineStatus', () => {
  it('should call client.getOnlineStatus', async () => {
    const { context, client, session } = setup();

    const user = {
      id: '01234567890=',
      online_status: 0,
      online_status_message: 'online',
    };

    client.getOnlineStatus.mockResolvedValue([user]);

    const result = await context.getOnlineStatus();

    expect(client.getOnlineStatus).toBeCalledWith([session.user.id]);
    expect(result).toEqual(user);
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.getOnlineStatus();

    expect(client.getOnlineStatus).not.toBeCalled();
  });
});

describe('#typing', () => {
  it('avoid delay 0', async () => {
    const { context } = setup();

    await context.typing(0);

    expect(sleep).not.toBeCalled();
  });

  it('should call sleep', async () => {
    const { context } = setup();

    await context.typing(10);

    expect(sleep).toBeCalled();
  });
});
