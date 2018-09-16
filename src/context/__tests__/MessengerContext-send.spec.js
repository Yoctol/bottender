import { delivery, echoMessage as echo, read } from './MessengerEvent.spec';

jest.mock('delay');
jest.mock('messaging-api-messenger');
jest.mock('warning');

let MessengerClient;
let MessengerContext;
let MessengerEvent;
let sleep;
let warning;

beforeEach(() => {
  /* eslint-disable global-require */
  MessengerClient = require('messaging-api-messenger').MessengerClient;
  MessengerContext = require('../MessengerContext').default;
  MessengerEvent = require('../MessengerEvent').default;
  sleep = require('delay');
  warning = require('warning');
  /* eslint-enable global-require */
});

afterEach(() => {
  jest.useFakeTimers();
});

const _rawEvent = {
  sender: { id: '1423587017700273' },
  recipient: { id: '404217156637689' },
  timestamp: 1491796363181,
  message: {
    mid: 'mid.$cAAE1UUyiiwthh0NPrVbVf4HFNDGl',
    seq: 348847,
    text: 'There is no royal road to learning.',
  },
};

const userSession = {
  user: {
    id: 'fakeUserId',
  },
};

const setup = (
  { session = userSession, customAccessToken, rawEvent = _rawEvent } = {
    session: userSession,
    customAccessToken: undefined,
    _rawEvent,
  }
) => {
  const client = MessengerClient.connect();
  const args = {
    client,
    event: new MessengerEvent(rawEvent),
    session,
    customAccessToken,
  };
  const context = new MessengerContext(args);
  return {
    context,
    session,
    client,
  };
};

describe('#sendMessage', () => {
  it('should call client.sendMessage', async () => {
    const { context, client, session } = setup();

    await context.sendMessage({
      text: 'Hello!',
    });

    expect(client.sendMessage).toBeCalledWith(
      session.user.id,
      {
        text: 'Hello!',
      },
      {
        messaging_type: 'RESPONSE',
      }
    );
  });
});

describe('#sendText', () => {
  it('should call client.sendText', async () => {
    const { context, client, session } = setup();

    await context.sendText('xxx.com');

    expect(client.sendText).toBeCalledWith(session.user.id, 'xxx.com', {
      messaging_type: 'RESPONSE',
    });
  });

  it('can call with tag', async () => {
    const { context, client, session } = setup();

    await context.sendText('xxx.com', { tag: 'ISSUE_RESOLUTION' });

    expect(client.sendText).toBeCalledWith(session.user.id, 'xxx.com', {
      messaging_type: 'MESSAGE_TAG',
      tag: 'ISSUE_RESOLUTION',
    });
  });

  it('can call with custom messaging_type', async () => {
    const { context, client, session } = setup();

    await context.sendText('xxx.com', { messaging_type: 'UPDATE' });

    expect(client.sendText).toBeCalledWith(session.user.id, 'xxx.com', {
      messaging_type: 'UPDATE',
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendText('xxx.com');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendText();

    expect(warning).toBeCalledWith(
      false,
      'sendText: should not be called in context without session'
    );
    expect(client.sendText).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    await context.sendText('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendText: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendText).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendText('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendText: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendText).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendText('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendText: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendText).not.toBeCalled();
  });
});

describe('#sendAttachment', () => {
  it('should call client.sendAttachment', async () => {
    const { context, client, session } = setup();

    const attachment = {
      type: 'image',
      payload: {
        url: 'https://example.com/pic.png',
      },
    };

    await context.sendAttachment({
      type: 'image',
      payload: {
        url: 'https://example.com/pic.png',
      },
    });

    expect(client.sendAttachment).toBeCalledWith(session.user.id, attachment, {
      messaging_type: 'RESPONSE',
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendAttachment({
      type: 'image',
      payload: {
        url: 'https://example.com/pic.png',
      },
    });

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendAttachment({
      type: 'image',
      payload: {
        url: 'https://example.com/pic.png',
      },
    });

    expect(warning).toBeCalledWith(
      false,
      'sendAttachment: should not be called in context without session'
    );
    expect(client.sendAttachment).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    await context.sendAttachment({
      type: 'image',
      payload: {
        url: 'https://example.com/pic.png',
      },
    });

    expect(warning).toBeCalledWith(
      false,
      'sendAttachment: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendAttachment).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendAttachment({
      type: 'image',
      payload: {
        url: 'https://example.com/pic.png',
      },
    });

    expect(warning).toBeCalledWith(
      false,
      'sendAttachment: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendAttachment).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendAttachment({
      type: 'image',
      payload: {
        url: 'https://example.com/pic.png',
      },
    });

    expect(warning).toBeCalledWith(
      false,
      'sendAttachment: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendAttachment).not.toBeCalled();
  });
});

describe('#sendImage', () => {
  it('should call client.sendImage', async () => {
    const { context, client, session } = setup();

    await context.sendImage('xxx.com');

    expect(client.sendImage).toBeCalledWith(session.user.id, 'xxx.com', {
      messaging_type: 'RESPONSE',
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendImage('xxx.com');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendImage('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendImage: should not be called in context without session'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    await context.sendImage('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendImage: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendImage('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendImage: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendImage('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendImage: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });
});

describe('#sendAudio', () => {
  it('should call client.sendAudio', async () => {
    const { context, client, session } = setup();

    await context.sendAudio('xxx.com');

    expect(client.sendAudio).toBeCalledWith(session.user.id, 'xxx.com', {
      messaging_type: 'RESPONSE',
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendAudio('xxx.com');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendAudio('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendAudio: should not be called in context without session'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    await context.sendAudio('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendAudio: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendAudio('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendAudio: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendAudio('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendAudio: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });
});

describe('#sendVideo', () => {
  it('should call client.sendVideo', async () => {
    const { context, client, session } = setup();

    await context.sendVideo('xxx.com');

    expect(client.sendVideo).toBeCalledWith(session.user.id, 'xxx.com', {
      messaging_type: 'RESPONSE',
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendVideo('xxx.com');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendVideo('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendVideo: should not be called in context without session'
    );
    expect(client.sendVideo).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    await context.sendVideo('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendVideo: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendVideo).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendVideo('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendVideo: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendVideo).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendVideo('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendVideo: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendVideo).not.toBeCalled();
  });
});

describe('#sendFile', () => {
  it('should call client.sendFile', async () => {
    const { context, client, session } = setup();

    await context.sendFile('xxx.com');

    expect(client.sendFile).toBeCalledWith(session.user.id, 'xxx.com', {
      messaging_type: 'RESPONSE',
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendFile('xxx.com');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendFile('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendFile: should not be called in context without session'
    );
    expect(client.sendFile).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    await context.sendFile('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendFile: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendFile).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendFile('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendFile: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendFile).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendFile('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendFile: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendFile).not.toBeCalled();
  });
});

describe('#sendSenderAction', () => {
  it('should call client sendSenderAction', async () => {
    const { context, client, session } = setup();

    await context.sendSenderAction('typing_on');

    expect(client.sendSenderAction).toBeCalledWith(
      session.user.id,
      'typing_on',
      {
        access_token: undefined,
      }
    );
  });

  it('should use custom access token', async () => {
    const { context, client, session } = setup({
      session: userSession,
      customAccessToken: 'anyToken',
    });

    await context.sendSenderAction('typing_on');

    expect(client.sendSenderAction).toBeCalledWith(
      session.user.id,
      'typing_on',
      {
        access_token: 'anyToken',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendSenderAction('typing_on');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendSenderAction('typing_on');

    expect(warning).toBeCalledWith(
      false,
      'sendSenderAction: should not be called in context without session'
    );
    expect(client.sendSenderAction).not.toBeCalled();
  });
});

describe('#typingOn', () => {
  it('should call client typingOn', async () => {
    const { context, client, session } = setup();

    await context.typingOn();

    expect(client.typingOn).toBeCalledWith(session.user.id, {
      access_token: undefined,
    });
  });

  it('should use custom access token', async () => {
    const { context, client, session } = setup({
      session: userSession,
      customAccessToken: 'anyToken',
    });

    await context.typingOn();

    expect(client.typingOn).toBeCalledWith(session.user.id, {
      access_token: 'anyToken',
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.typingOn();

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.typingOn();

    expect(warning).toBeCalledWith(
      false,
      'typingOn: should not be called in context without session'
    );
    expect(client.typingOn).not.toBeCalled();
  });
});

describe('#typingOff', () => {
  it('should call client typingOff', async () => {
    const { context, client, session } = setup();

    await context.typingOff();

    expect(client.typingOff).toBeCalledWith(session.user.id, {
      access_token: undefined,
    });
  });

  it('should use custom access token', async () => {
    const { context, client, session } = setup({
      session: userSession,
      customAccessToken: 'anyToken',
    });

    await context.typingOff();

    expect(client.typingOff).toBeCalledWith(session.user.id, {
      access_token: 'anyToken',
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.typingOff();

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.typingOff();

    expect(warning).toBeCalledWith(
      false,
      'typingOff: should not be called in context without session'
    );
    expect(client.typingOff).not.toBeCalled();
  });
});

describe('#markSeen', () => {
  it('should call client markSeen', async () => {
    const { context, client, session } = setup();

    await context.markSeen();

    expect(client.markSeen).toBeCalledWith(session.user.id, {
      access_token: undefined,
    });
  });

  it('should use custom access token', async () => {
    const { context, client, session } = setup({
      session: userSession,
      customAccessToken: 'anyToken',
    });

    await context.markSeen();

    expect(client.markSeen).toBeCalledWith(session.user.id, {
      access_token: 'anyToken',
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.markSeen();

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.markSeen();

    expect(warning).toBeCalledWith(
      false,
      'markSeen: should not be called in context without session'
    );
    expect(client.markSeen).not.toBeCalled();
  });
});

describe('#typing', () => {
  it('avoid delay 0', async () => {
    const { context } = setup();

    await context.typing(0);

    expect(sleep).not.toBeCalled();
  });

  it('should call sleep', async () => {
    const { context, client } = setup();

    await context.typing(10);

    expect(client.typingOn).toBeCalled();
    expect(sleep).toBeCalledWith(10);
    expect(client.typingOff).toBeCalled();
  });
});
