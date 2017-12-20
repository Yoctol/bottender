import delay from 'delay';

import withTyping from '../withTyping';

jest.mock('delay');

function setup() {
  const context = {
    platform: 'messenger',
    typingOn: jest.fn(),
    sendText: jest.fn(),
  };
  return {
    context,
  };
}

it('should typingOn and delay with default typing', async () => {
  const { context } = setup();

  const _send = context.sendText;

  withTyping({ delay: 1000 })(context);

  await context.sendText('Hello');

  expect(context.typingOn).toBeCalled();
  expect(delay).toBeCalledWith(1000);
  expect(_send).toBeCalledWith('Hello');
});

it('typing duration can be overwritten', async () => {
  const { context } = setup();

  const _send = context.sendText;

  withTyping({ delay: 1000 })(context);

  await context.sendText('Hello', { delay: 2000 });

  expect(context.typingOn).toBeCalled();
  expect(delay).toBeCalledWith(2000);
  expect(_send).toBeCalledWith('Hello', {});
});

it('should attch sendTextWithDelay', () => {
  const { context } = setup();

  withTyping({ delay: 1000 })(context);

  expect(context.sendTextWithDelay).toBeDefined();
});

describe('platforms', () => {
  it('works with messenger', async () => {
    const context = {
      platform: 'messenger',
      typingOn: jest.fn(),
      sendGenericTemplate: jest.fn(),
    };

    const _send = context.sendGenericTemplate;

    withTyping({ delay: 1000 })(context);

    await context.sendGenericTemplate([]);

    expect(delay).toBeCalledWith(1000);
    expect(_send).toBeCalledWith([]);
  });

  it('works with line', async () => {
    const context = {
      platform: 'line',
      sendImagemap: jest.fn(),
    };

    const _send = context.sendImagemap;

    withTyping({ delay: 1000 })(context);

    const imagemap = {
      baseUrl: 'https://example.com/bot/images/rm001',
      baseWidth: 1040,
      baseHeight: 1040,
      actions: [
        {
          type: 'uri',
          linkUri: 'https://example.com/',
          area: {
            x: 0,
            y: 0,
            width: 520,
            height: 1040,
          },
        },
        {
          type: 'message',
          text: 'hello',
          area: {
            x: 520,
            y: 0,
            width: 520,
            height: 1040,
          },
        },
      ],
    };

    await context.sendImagemap('this is an imagemap', imagemap);

    expect(delay).toBeCalledWith(1000);
    expect(_send).toBeCalledWith('this is an imagemap', imagemap);
  });

  it('works with telegram', async () => {
    const context = {
      platform: 'telegram',
      sendVenue: jest.fn(),
    };

    const _send = context.sendVenue;

    withTyping({ delay: 1000 })(context);

    await context.sendVenue({
      latitude: 30,
      longitude: 45,
      title: 'a_title',
      address: 'an_address',
    });

    expect(delay).toBeCalledWith(1000);
    expect(_send).toBeCalledWith({
      latitude: 30,
      longitude: 45,
      title: 'a_title',
      address: 'an_address',
    });
  });

  it('works with slack', async () => {
    const context = {
      platform: 'slack',
      sendText: jest.fn(),
    };

    const _send = context.sendText;

    withTyping({ delay: 1000 })(context);

    await context.sendText('text');

    expect(delay).toBeCalledWith(1000);
    expect(_send).toBeCalledWith('text');
  });

  it('works with viber', async () => {
    const context = {
      platform: 'viber',
      sendVideo: jest.fn(),
    };

    const _send = context.sendVideo;

    withTyping({ delay: 1000 })(context);

    await context.sendVideo({
      media: 'http://www.images.com/video.mp4',
      size: 10000,
      thumbnail: 'http://www.images.com/thumb.jpg',
      duration: 10,
    });

    expect(delay).toBeCalledWith(1000);
    expect(_send).toBeCalledWith({
      media: 'http://www.images.com/video.mp4',
      size: 10000,
      thumbnail: 'http://www.images.com/thumb.jpg',
      duration: 10,
    });
  });
});
