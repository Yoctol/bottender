import warning from 'warning';
import { ViberClient } from 'messaging-api-viber';
import { mocked } from 'ts-jest/utils';

import ViberContext from '../ViberContext';
import ViberEvent from '../ViberEvent';
import { RichMedia, UserOnlineStatus, ViberRawEvent } from '../ViberTypes';

jest.mock('messaging-api-viber');
jest.mock('warning');

const ACCESS_TOKEN = 'ACCESS_TOKEN';

const rawEvent: ViberRawEvent = {
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

const defaultSession = { user: { id: 'fakeUserId' } };

const setup = (
  { session }: { session: typeof defaultSession | null } = {
    session: defaultSession,
  }
): {
  context: ViberContext;
  session: typeof defaultSession | null;
  client: ViberClient;
} => {
  const client = new ViberClient({
    accessToken: ACCESS_TOKEN,
    sender: { name: 'sender' },
  });

  const context = new ViberContext({
    client,
    event: new ViberEvent(rawEvent),
    session,
  });

  return {
    context,
    session,
    client,
  };
};

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

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: null });

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
      fileName: 'name_of_file.doc',
    });

    expect(client.sendFile).toBeCalledWith(
      session.user.id,
      {
        media: 'http://www.images.com/file.doc',
        size: 10000,
        fileName: 'name_of_file.doc',
      },
      undefined
    );
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.sendFile({
      media: 'http://www.images.com/file.doc',
      size: 10000,
      fileName: 'name_of_file.doc',
    });

    expect(client.sendFile).not.toBeCalled();
  });
});

describe('#sendContact', () => {
  it('should call client.sendContact', async () => {
    const { context, client, session } = setup();

    await context.sendContact({
      name: 'Itamar',
      phoneNumber: '+972511123123',
    });

    expect(client.sendContact).toBeCalledWith(
      session.user.id,
      {
        name: 'Itamar',
        phoneNumber: '+972511123123',
      },
      undefined
    );
  });

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.sendContact({
      name: 'Itamar',
      phoneNumber: '+972511123123',
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

  it('should not call send method if dont have session', async () => {
    const { context, client } = setup({ session: undefined });

    await context.sendSticker(46105);

    expect(client.sendSticker).not.toBeCalled();
  });
});

const richMedia: RichMedia = {
  type: 'rich_media',
  buttonsGroupColumns: 6,
  buttonsGroupRows: 7,
  bgColor: '#FFFFFF',
  buttons: [
    {
      columns: 6,
      rows: 3,
      actionType: 'open-url',
      actionBody: 'https://www.google.com',
      image: 'http://html-test:8080/myweb/guy/assets/imageRMsmall2.png',
    },
    {
      columns: 6,
      rows: 2,
      text:
        '<font color=#323232><b>Headphones with Microphone, On-ear Wired earphones</b></font><font color=#777777><br>Sound Intone </font><font color=#6fc133>$17.99</font>',
      actionType: 'open-url',
      actionBody: 'https://www.google.com',
      textSize: 'medium',
      textVAlign: 'middle',
      textHAlign: 'left',
    },
    {
      columns: 6,
      rows: 1,
      actionType: 'reply',
      actionBody: 'https://www.google.com',
      text: '<font color=#ffffff>Buy</font>',
      textSize: 'large',
      textVAlign: 'middle',
      textHAlign: 'middle',
      image: 'https://s14.postimg.org/4mmt4rw1t/Button.png',
    },
    {
      columns: 6,
      rows: 1,
      actionType: 'reply',
      actionBody: 'https://www.google.com',
      text: '<font color=#8367db>MORE DETAILS</font>',
      textSize: 'small',
      textVAlign: 'middle',
      textHAlign: 'middle',
    },
    {
      columns: 6,
      rows: 3,
      actionType: 'open-url',
      actionBody: 'https://www.google.com',
      image: 'https://s16.postimg.org/wi8jx20wl/image_RMsmall2.png',
    },
    {
      columns: 6,
      rows: 2,
      text:
        "<font color=#323232><b>Hanes Men's Humor Graphic T-Shirt</b></font><font color=#777777><br>Hanes</font><font color=#6fc133>$10.99</font>",
      actionType: 'open-url',
      actionBody: 'https://www.google.com',
      textSize: 'medium',
      textVAlign: 'middle',
      textHAlign: 'left',
    },
    {
      columns: 6,
      rows: 1,
      actionType: 'reply',
      actionBody: 'https://www.google.com',
      text: '<font color=#ffffff>Buy</font>',
      textSize: 'large',
      textVAlign: 'middle',
      textHAlign: 'middle',
      image: 'https://s14.postimg.org/4mmt4rw1t/Button.png',
    },
    {
      columns: 6,
      rows: 1,
      actionType: 'reply',
      actionBody: 'https://www.google.com',
      text: '<font color=#8367db>MORE DETAILS</font>',
      textSize: 'small',
      textVAlign: 'middle',
      textHAlign: 'middle',
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
      primaryDeviceOs: 'android 7.1',
      apiVersion: 1,
      viberVersion: '6.5.0',
      mcc: 1,
      mnc: 1,
      deviceType: 'iPhone9,4',
    };

    mocked(client.getUserDetails).mockResolvedValue(user);

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

    const user: UserOnlineStatus = {
      id: '01234567890=',
      onlineStatus: 0,
      onlineStatusMessage: 'online',
    };

    mocked(client.getOnlineStatus).mockResolvedValue([user]);

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
