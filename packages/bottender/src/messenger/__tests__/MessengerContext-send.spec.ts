import warning from 'warning';
import { MessengerClient } from 'messaging-api-messenger';

import MessengerContext from '../MessengerContext';
import MessengerEvent from '../MessengerEvent';

import { delivery, echoMessage as echo, read } from './MessengerEvent.spec';

jest.mock('messaging-api-messenger');
jest.mock('warning');

const ACCESS_TOKEN = 'FAKE_TOKEN';
const APP_SECRET = 'FAKE_SECRET';

const defaultRawEvent = {
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
  { session = userSession, customAccessToken, rawEvent = defaultRawEvent } = {
    session: userSession,
    customAccessToken: undefined,
    defaultRawEvent,
  }
) => {
  const client = new MessengerClient({
    accessToken: customAccessToken ?? ACCESS_TOKEN,
    appSecret: APP_SECRET,
  });
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
        messagingType: 'RESPONSE',
      }
    );
  });
});

describe('#sendText', () => {
  it('should call client.sendText', async () => {
    const { context, client, session } = setup();

    await context.sendText('hello');

    expect(client.sendText).toBeCalledWith(session.user.id, 'hello', {
      messagingType: 'RESPONSE',
    });
  });

  it('can call with tag', async () => {
    const { context, client, session } = setup();

    await context.sendText('hello', { tag: 'CONFIRMED_EVENT_UPDATE' });

    expect(client.sendText).toBeCalledWith(session.user.id, 'hello', {
      messagingType: 'MESSAGE_TAG',
      tag: 'CONFIRMED_EVENT_UPDATE',
    });
  });

  it('can call with custom messaging_type', async () => {
    const { context, client, session } = setup();

    await context.sendText('hello', { messagingType: 'UPDATE' });

    expect(client.sendText).toBeCalledWith(session.user.id, 'hello', {
      messagingType: 'UPDATE',
    });
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

    await context.sendText('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendText: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendText).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendText('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendText: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendText).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendText('hello');

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
      messagingType: 'RESPONSE',
    });
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

    await context.sendImage('hello');

    expect(client.sendImage).toBeCalledWith(session.user.id, 'hello', {
      messagingType: 'RESPONSE',
    });
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendImage('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendImage: should not be called in context without session'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    await context.sendImage('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendImage: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendImage('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendImage: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendImage('hello');

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

    await context.sendAudio('hello');

    expect(client.sendAudio).toBeCalledWith(session.user.id, 'hello', {
      messagingType: 'RESPONSE',
    });
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendAudio('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendAudio: should not be called in context without session'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    await context.sendAudio('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendAudio: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendAudio('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendAudio: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendAudio('hello');

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

    await context.sendVideo('hello');

    expect(client.sendVideo).toBeCalledWith(session.user.id, 'hello', {
      messagingType: 'RESPONSE',
    });
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendVideo('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendVideo: should not be called in context without session'
    );
    expect(client.sendVideo).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    await context.sendVideo('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendVideo: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendVideo).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendVideo('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendVideo: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendVideo).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendVideo('hello');

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

    await context.sendFile('hello');

    expect(client.sendFile).toBeCalledWith(session.user.id, 'hello', {
      messagingType: 'RESPONSE',
    });
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.sendFile('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendFile: should not be called in context without session'
    );
    expect(client.sendFile).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    await context.sendFile('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendFile: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendFile).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendFile('hello');

    expect(warning).toBeCalledWith(
      false,
      'sendFile: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendFile).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendFile('hello');

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
      {}
    );
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

    expect(client.typingOn).toBeCalledWith(session.user.id, {});
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

    expect(client.typingOff).toBeCalledWith(session.user.id, {});
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

    expect(client.markSeen).toBeCalledWith(session.user.id);
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

describe('#useAccessToken', () => {
  it('should support inject custom token', async () => {
    const { context, client, session } = setup();

    context.useAccessToken('anyToken');

    await context.sendText('hello');

    expect(client.sendText).toBeCalledWith(session.user.id, 'hello', {
      messagingType: 'RESPONSE',
      accessToken: 'anyToken',
    });
  });
});
