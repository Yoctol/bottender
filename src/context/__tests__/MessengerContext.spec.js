import { delivery, read, echoMessage as echo } from './MessengerEvent.spec';

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

it('be defined', () => {
  const { context } = setup();
  expect(context).toBeDefined();
});

it('#platform to be `messenger`', () => {
  const { context } = setup();
  expect(context.platform).toBe('messenger');
});

it('get #session works', () => {
  const { context, session } = setup();
  expect(context.session).toBe(session);
});

it('get #event works', () => {
  const { context } = setup();
  expect(context.event).toBeInstanceOf(MessengerEvent);
});

it('get #client works', () => {
  const { context, client } = setup();
  expect(context.client).toBe(client);
});

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
      'sendText: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendText).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendText('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendText: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendText).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendText('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendText: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
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
      'sendAttachment: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
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
      'sendAttachment: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
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
      'sendAttachment: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
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
      'sendImage: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendImage('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendImage: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendImage('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendImage: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
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
      'sendAudio: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendAudio('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendAudio: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendAudio('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendAudio: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
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
      'sendVideo: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendVideo).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendVideo('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendVideo: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendVideo).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendVideo('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendVideo: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
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
      'sendFile: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendFile).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    await context.sendFile('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendFile: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendFile).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    await context.sendFile('xxx.com');

    expect(warning).toBeCalledWith(
      false,
      'sendFile: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendFile).not.toBeCalled();
  });
});

describe('#sendTemplate', () => {
  it('should call client.sendTemplate', async () => {
    const { context, client, session } = setup();

    await context.sendTemplate({
      template_type: 'button',
      text: 'title',
      buttons: [
        {
          type: 'postback',
          title: 'Start Chatting',
          payload: 'USER_DEFINED_PAYLOAD',
        },
      ],
    });

    expect(client.sendTemplate).toBeCalledWith(
      session.user.id,
      {
        template_type: 'button',
        text: 'title',
        buttons: [
          {
            type: 'postback',
            title: 'Start Chatting',
            payload: 'USER_DEFINED_PAYLOAD',
          },
        ],
      },
      {
        messaging_type: 'RESPONSE',
      }
    );
  });
});

describe('#sendGenericTemplate', () => {
  it('should call client.sendGenericTemplate', async () => {
    const { context, client, session } = setup();

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

    expect(client.sendGenericTemplate).toBeCalledWith(
      session.user.id,
      elements,
      {
        image_aspect_ratio: ratio,
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('can call with tag', async () => {
    const { context, client, session } = setup();

    const elements = {};

    await context.sendGenericTemplate(elements, { tag: 'ISSUE_RESOLUTION' });

    expect(client.sendGenericTemplate).toBeCalledWith(
      session.user.id,
      elements,
      {
        messaging_type: 'MESSAGE_TAG',
        tag: 'ISSUE_RESOLUTION',
      }
    );
  });

  it('can call with custom messaging_type', async () => {
    const { context, client, session } = setup();

    const elements = {};

    await context.sendGenericTemplate(elements, { messaging_type: 'UPDATE' });

    expect(client.sendGenericTemplate).toBeCalledWith(
      session.user.id,
      elements,
      {
        messaging_type: 'UPDATE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

    expect(warning).toBeCalledWith(
      false,
      'sendGenericTemplate: should not be called in context without session'
    );
    expect(client.sendGenericTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

    expect(warning).toBeCalledWith(
      false,
      'sendGenericTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendGenericTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

    expect(warning).toBeCalledWith(
      false,
      'sendGenericTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendGenericTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

    expect(warning).toBeCalledWith(
      false,
      'sendGenericTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendGenericTemplate).not.toBeCalled();
  });
});

describe('#sendButtonTemplate', () => {
  it('should call client.sendButtonTemplate', async () => {
    const { context, client, session } = setup();

    const buttons = [];

    await context.sendButtonTemplate('yayaya', buttons);

    expect(client.sendButtonTemplate).toBeCalledWith(
      session.user.id,
      'yayaya',
      buttons,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const buttons = [];

    await context.sendButtonTemplate('yayaya', buttons);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const buttons = [];

    await context.sendButtonTemplate('yayaya', buttons);

    expect(warning).toBeCalledWith(
      false,
      'sendButtonTemplate: should not be called in context without session'
    );
    expect(client.sendButtonTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const buttons = [];

    await context.sendButtonTemplate('yayaya', buttons);

    expect(warning).toBeCalledWith(
      false,
      'sendButtonTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendButtonTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const buttons = [];

    await context.sendButtonTemplate('yayaya', buttons);

    expect(warning).toBeCalledWith(
      false,
      'sendButtonTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendButtonTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const buttons = [];

    await context.sendButtonTemplate('yayaya', buttons);

    expect(warning).toBeCalledWith(
      false,
      'sendButtonTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendButtonTemplate).not.toBeCalled();
  });
});

describe('#sendListTemplate', () => {
  it('should call client.sendListTemplate', async () => {
    const { context, client, session } = setup();

    const elements = [];
    const buttons = [];

    await context.sendListTemplate(elements, buttons, {
      top_element_style: 'large',
    });

    expect(client.sendListTemplate).toBeCalledWith(
      session.user.id,
      elements,
      buttons,
      {
        top_element_style: 'large',
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const elements = [];
    const buttons = [];

    await context.sendListTemplate(elements, buttons, 'large');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const elements = [];
    const buttons = [];

    await context.sendListTemplate(elements, buttons, 'large');

    expect(warning).toBeCalledWith(
      false,
      'sendListTemplate: should not be called in context without session'
    );
    expect(client.sendListTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const elements = [];
    const buttons = [];

    await context.sendListTemplate(elements, buttons, 'large');

    expect(warning).toBeCalledWith(
      false,
      'sendListTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendListTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const elements = [];
    const buttons = [];

    await context.sendListTemplate(elements, buttons, 'large');

    expect(warning).toBeCalledWith(
      false,
      'sendListTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendListTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const elements = [];
    const buttons = [];

    await context.sendListTemplate(elements, buttons, 'large');

    expect(warning).toBeCalledWith(
      false,
      'sendListTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendListTemplate).not.toBeCalled();
  });
});

describe('#sendOpenGraphTemplate', () => {
  it('should call client.sendOpenGraphTemplate', async () => {
    const { context, client, session } = setup();

    await context.sendOpenGraphTemplate([
      {
        media_type: 'image',
        attachment_id: '1854626884821032',
        buttons: [
          {
            type: 'web_url',
            url: 'https://en.wikipedia.org/wiki/Rickrolling',
            title: 'View Website',
          },
        ],
      },
    ]);

    expect(client.sendOpenGraphTemplate).toBeCalledWith(
      session.user.id,
      [
        {
          media_type: 'image',
          attachment_id: '1854626884821032',
          buttons: [
            {
              type: 'web_url',
              url: 'https://en.wikipedia.org/wiki/Rickrolling',
              title: 'View Website',
            },
          ],
        },
      ],
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const elements = [];

    await context.sendOpenGraphTemplate(elements);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const elements = [];

    await context.sendOpenGraphTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendOpenGraphTemplate: should not be called in context without session'
    );
    expect(client.sendOpenGraphTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const elements = [];

    await context.sendOpenGraphTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendOpenGraphTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendOpenGraphTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const elements = [];

    await context.sendOpenGraphTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendOpenGraphTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendOpenGraphTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const elements = [];

    await context.sendOpenGraphTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendOpenGraphTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendOpenGraphTemplate).not.toBeCalled();
  });
});

describe('#sendMediaTemplate', () => {
  it('should call client.sendMediaTemplate', async () => {
    const { context, client, session } = setup();

    await context.sendMediaTemplate([
      {
        url: 'https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb',
        buttons: [
          {
            type: 'web_url',
            url: 'https://en.wikipedia.org/wiki/Rickrolling',
            title: 'View More',
          },
        ],
      },
    ]);

    expect(client.sendMediaTemplate).toBeCalledWith(
      session.user.id,
      [
        {
          url: 'https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb',
          buttons: [
            {
              type: 'web_url',
              url: 'https://en.wikipedia.org/wiki/Rickrolling',
              title: 'View More',
            },
          ],
        },
      ],
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const elements = [];

    await context.sendMediaTemplate(elements);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const elements = [];

    await context.sendMediaTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendMediaTemplate: should not be called in context without session'
    );
    expect(client.sendMediaTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const elements = [];

    await context.sendMediaTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendMediaTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendMediaTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const elements = [];

    await context.sendMediaTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendMediaTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendMediaTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const elements = [];

    await context.sendMediaTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendMediaTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendMediaTemplate).not.toBeCalled();
  });
});

describe('#sendReceiptTemplate', () => {
  it('should call client.sendReceiptTemplate', async () => {
    const { context, client, session } = setup();

    const receipt = {};

    await context.sendReceiptTemplate(receipt);

    expect(client.sendReceiptTemplate).toBeCalledWith(
      session.user.id,
      receipt,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const receipt = {};

    await context.sendReceiptTemplate(receipt);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const receipt = {};

    await context.sendReceiptTemplate(receipt);

    expect(warning).toBeCalledWith(
      false,
      'sendReceiptTemplate: should not be called in context without session'
    );
    expect(client.sendReceiptTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const receipt = {};

    await context.sendReceiptTemplate(receipt);

    expect(warning).toBeCalledWith(
      false,
      'sendReceiptTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendReceiptTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const receipt = {};

    await context.sendReceiptTemplate(receipt);

    expect(warning).toBeCalledWith(
      false,
      'sendReceiptTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendReceiptTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const receipt = {};

    await context.sendReceiptTemplate(receipt);

    expect(warning).toBeCalledWith(
      false,
      'sendReceiptTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendReceiptTemplate).not.toBeCalled();
  });
});

describe('#sendAirlineBoardingPassTemplate', () => {
  it('should call client.sendAirlineBoardingPassTemplate', async () => {
    const { context, client, session } = setup();

    const boardingPass = {};

    await context.sendAirlineBoardingPassTemplate(boardingPass);

    expect(client.sendAirlineBoardingPassTemplate).toBeCalledWith(
      session.user.id,
      boardingPass,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const boardingPass = {};

    await context.sendAirlineBoardingPassTemplate(boardingPass);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const boardingPass = {};

    await context.sendAirlineBoardingPassTemplate(boardingPass);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineBoardingPassTemplate: should not be called in context without session'
    );
    expect(client.sendAirlineBoardingPassTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const boardingPass = {};

    await context.sendAirlineBoardingPassTemplate(boardingPass);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineBoardingPassTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineBoardingPassTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const boardingPass = {};

    await context.sendAirlineBoardingPassTemplate(boardingPass);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineBoardingPassTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineBoardingPassTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const boardingPass = {};

    await context.sendAirlineBoardingPassTemplate(boardingPass);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineBoardingPassTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineBoardingPassTemplate).not.toBeCalled();
  });
});

describe('#sendAirlineCheckinTemplate', () => {
  it('should call client.sendAirlineCheckinTemplate', async () => {
    const { context, client, session } = setup();

    const checkin = {};

    await context.sendAirlineCheckinTemplate(checkin);

    expect(client.sendAirlineCheckinTemplate).toBeCalledWith(
      session.user.id,
      checkin,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const checkin = {};

    await context.sendAirlineCheckinTemplate(checkin);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const checkin = {};

    await context.sendAirlineCheckinTemplate(checkin);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineCheckinTemplate: should not be called in context without session'
    );
    expect(client.sendAirlineCheckinTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const checkin = {};

    await context.sendAirlineCheckinTemplate(checkin);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineCheckinTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineCheckinTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const checkin = {};

    await context.sendAirlineCheckinTemplate(checkin);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineCheckinTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineCheckinTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const checkin = {};

    await context.sendAirlineCheckinTemplate(checkin);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineCheckinTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineCheckinTemplate).not.toBeCalled();
  });
});

describe('#sendAirlineItineraryTemplate', () => {
  it('should call client.sendAirlineItineraryTemplate', async () => {
    const { context, client, session } = setup();

    const itinerary = {};

    await context.sendAirlineItineraryTemplate(itinerary);

    expect(client.sendAirlineItineraryTemplate).toBeCalledWith(
      session.user.id,
      itinerary,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const itinerary = {};

    await context.sendAirlineItineraryTemplate(itinerary);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const itinerary = {};

    await context.sendAirlineItineraryTemplate(itinerary);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineItineraryTemplate: should not be called in context without session'
    );
    expect(client.sendAirlineItineraryTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const itinerary = {};

    await context.sendAirlineItineraryTemplate(itinerary);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineItineraryTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineItineraryTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const itinerary = {};

    await context.sendAirlineItineraryTemplate(itinerary);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineItineraryTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineItineraryTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const itinerary = {};

    await context.sendAirlineItineraryTemplate(itinerary);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineItineraryTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineItineraryTemplate).not.toBeCalled();
  });
});

describe('#sendAirlineFlightUpdateTemplate', () => {
  it('should call client.sendAirlineFlightUpdateTemplate', async () => {
    const { context, client, session } = setup();

    const flightUpdate = {};

    await context.sendAirlineFlightUpdateTemplate(flightUpdate);

    expect(client.sendAirlineFlightUpdateTemplate).toBeCalledWith(
      session.user.id,
      flightUpdate,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const flightUpdate = {};

    await context.sendAirlineFlightUpdateTemplate(flightUpdate);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const flightUpdate = {};

    await context.sendAirlineFlightUpdateTemplate(flightUpdate);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineFlightUpdateTemplate: should not be called in context without session'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const flightUpdate = {};

    await context.sendAirlineFlightUpdateTemplate(flightUpdate);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineFlightUpdateTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const flightUpdate = {};

    await context.sendAirlineFlightUpdateTemplate(flightUpdate);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineFlightUpdateTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const flightUpdate = {};

    await context.sendAirlineFlightUpdateTemplate(flightUpdate);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineFlightUpdateTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subsctiption of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });
});

describe('#getUserProfile', () => {
  it('should call client sendSenderAction', async () => {
    const { context, client, session } = setup();

    const user = {
      first_name: 'Kevin',
      last_name: 'Durant',
      profile_pic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };

    client.getUserProfile.mockResolvedValue(user);

    const result = await context.getUserProfile();

    expect(client.getUserProfile).toBeCalledWith(session.user.id, {
      access_token: undefined,
    });
    expect(result).toEqual(user);
  });

  it('should use custom access token', async () => {
    const { context, client, session } = setup({
      session: userSession,
      customAccessToken: 'anyToken',
    });

    const user = {
      first_name: 'Kevin',
      last_name: 'Durant',
      profile_pic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };

    client.getUserProfile.mockResolvedValue(user);

    const result = await context.getUserProfile();

    expect(client.getUserProfile).toBeCalledWith(session.user.id, {
      access_token: 'anyToken',
    });
    expect(result).toEqual(user);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.getUserProfile();

    expect(warning).toBeCalledWith(
      false,
      'getUserProfile: should not be called in context without session'
    );
    expect(client.getUserProfile).not.toBeCalled();
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

describe('#passThreadControl', () => {
  it('should call to pass user thread control to other app', async () => {
    const { context, client, session } = setup();

    await context.passThreadControl(263902037430900, 'metadata');

    expect(client.passThreadControl).toBeCalledWith(
      session.user.id,
      263902037430900,
      'metadata',
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

    await context.passThreadControl(263902037430900, 'metadata');

    expect(client.passThreadControl).toBeCalledWith(
      session.user.id,
      263902037430900,
      'metadata',
      {
        access_token: 'anyToken',
      }
    );
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.passThreadControl(263902037430900);

    expect(warning).toBeCalledWith(
      false,
      'passThreadControl: should not be called in context without session'
    );
    expect(client.passThreadControl).not.toBeCalled();
  });
});

describe('#passThreadControlToPageInbox', () => {
  it('should call to pass user thread control to page inbox', async () => {
    const { context, client, session } = setup();

    await context.passThreadControlToPageInbox('metadata');

    expect(client.passThreadControlToPageInbox).toBeCalledWith(
      session.user.id,
      'metadata',
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

    await context.passThreadControlToPageInbox();

    expect(client.passThreadControlToPageInbox).toBeCalledWith(
      session.user.id,
      undefined,
      {
        access_token: 'anyToken',
      }
    );
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.passThreadControlToPageInbox();

    expect(warning).toBeCalledWith(
      false,
      'passThreadControlToPageInbox: should not be called in context without session'
    );
    expect(client.passThreadControlToPageInbox).not.toBeCalled();
  });
});

describe('#takeThreadControl', () => {
  it('should call to take user thread control back', async () => {
    const { context, client, session } = setup();

    await context.takeThreadControl('metadata');

    expect(client.takeThreadControl).toBeCalledWith(
      session.user.id,
      'metadata',
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

    await context.takeThreadControl('metadata');

    expect(client.takeThreadControl).toBeCalledWith(
      session.user.id,
      'metadata',
      {
        access_token: 'anyToken',
      }
    );
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.takeThreadControl();

    expect(warning).toBeCalledWith(
      false,
      'takeThreadControl: should not be called in context without session'
    );
    expect(client.takeThreadControl).not.toBeCalled();
  });
});

describe('#requestThreadControl', () => {
  it('should call to request user thread control', async () => {
    const { context, client, session } = setup();

    await context.requestThreadControl('metadata');

    expect(client.requestThreadControl).toBeCalledWith(
      session.user.id,
      'metadata',
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

    await context.requestThreadControl('metadata');

    expect(client.requestThreadControl).toBeCalledWith(
      session.user.id,
      'metadata',
      {
        access_token: 'anyToken',
      }
    );
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.requestThreadControl();

    expect(warning).toBeCalledWith(
      false,
      'requestThreadControl: should not be called in context without session'
    );
    expect(client.requestThreadControl).not.toBeCalled();
  });
});

describe('#getThreadOwner', () => {
  it('should call to get thread owner', async () => {
    const { context, client, session } = setup();

    await context.getThreadOwner();

    expect(client.getThreadOwner).toBeCalledWith(session.user.id, {
      access_token: undefined,
    });
  });

  it('should use custom access token', async () => {
    const { context, client, session } = setup({
      session: userSession,
      customAccessToken: 'anyToken',
    });

    await context.getThreadOwner();

    expect(client.getThreadOwner).toBeCalledWith(session.user.id, {
      access_token: 'anyToken',
    });
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.getThreadOwner();

    expect(warning).toBeCalledWith(
      false,
      'getThreadOwner: should not be called in context without session'
    );
    expect(client.getThreadOwner).not.toBeCalled();
  });
});

describe('#associateLabel', () => {
  it('should call api to associate label to the user', async () => {
    const { context, client, session } = setup();

    await context.associateLabel(1712444532121303);

    expect(client.associateLabel).toBeCalledWith(
      session.user.id,
      1712444532121303,
      { access_token: undefined }
    );
  });

  it('should use custom access token', async () => {
    const { context, client, session } = setup({
      session: userSession,
      customAccessToken: 'anyToken',
    });

    await context.associateLabel(1712444532121303);

    expect(client.associateLabel).toBeCalledWith(
      session.user.id,
      1712444532121303,
      { access_token: 'anyToken' }
    );
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.associateLabel(1712444532121303);

    expect(warning).toBeCalledWith(
      false,
      'associateLabel: should not be called in context without session'
    );
    expect(client.associateLabel).not.toBeCalled();
  });
});

describe('#dissociateLabel', () => {
  it('should call api to dissociate label from the user', async () => {
    const { context, client, session } = setup();

    await context.dissociateLabel(1712444532121303);

    expect(client.dissociateLabel).toBeCalledWith(
      session.user.id,
      1712444532121303,
      { access_token: undefined }
    );
  });

  it('should use custom access token', async () => {
    const { context, client, session } = setup({
      session: userSession,
      customAccessToken: 'anyToken',
    });

    await context.dissociateLabel(1712444532121303);

    expect(client.dissociateLabel).toBeCalledWith(
      session.user.id,
      1712444532121303,
      { access_token: 'anyToken' }
    );
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.dissociateLabel(1712444532121303);

    expect(warning).toBeCalledWith(
      false,
      'dissociateLabel: should not be called in context without session'
    );
    expect(client.dissociateLabel).not.toBeCalled();
  });
});

describe('#getAssociatedLabels', () => {
  it('should call api to dissociate label from the user', async () => {
    const { context, client, session } = setup();

    client.getAssociatedLabels.mockReturnValue({
      data: [
        {
          name: 'myLabel',
          id: '1001200005003',
        },
        {
          name: 'myOtherLabel',
          id: '1001200005002',
        },
      ],
      paging: {
        cursors: {
          before:
            'QVFIUmx1WTBpMGpJWXprYzVYaVhabW55dVpycko4U2xURGE5ODNtNFZAPal94a1hTUnNVMUtoMVVoTzlzSDktUkMtQkUzWEFLSXlMS3ZALYUw3TURLelZAPOGVR',
          after:
            'QVFIUmItNkpTbjVzakxFWGRydzdaVUFNNnNPaUl0SmwzVHN5ZAWZAEQ3lZANDAzTXFIM0NHbHdYSkQ5OG1GaEozdjkzRmxpUFhxTDl4ZAlBibnE4LWt1eGlTa3Bn',
        },
      },
    });

    await context.getAssociatedLabels();

    expect(client.getAssociatedLabels).toBeCalledWith(session.user.id, {
      access_token: undefined,
    });
  });

  it('should use custom access token', async () => {
    const { context, client, session } = setup({
      session: userSession,
      customAccessToken: 'anyToken',
    });

    client.getAssociatedLabels.mockReturnValue({
      data: [
        {
          name: 'myLabel',
          id: '1001200005003',
        },
        {
          name: 'myOtherLabel',
          id: '1001200005002',
        },
      ],
      paging: {
        cursors: {
          before:
            'QVFIUmx1WTBpMGpJWXprYzVYaVhabW55dVpycko4U2xURGE5ODNtNFZAPal94a1hTUnNVMUtoMVVoTzlzSDktUkMtQkUzWEFLSXlMS3ZALYUw3TURLelZAPOGVR',
          after:
            'QVFIUmItNkpTbjVzakxFWGRydzdaVUFNNnNPaUl0SmwzVHN5ZAWZAEQ3lZANDAzTXFIM0NHbHdYSkQ5OG1GaEozdjkzRmxpUFhxTDl4ZAlBibnE4LWt1eGlTa3Bn',
        },
      },
    });

    await context.getAssociatedLabels();

    expect(client.getAssociatedLabels).toBeCalledWith(session.user.id, {
      access_token: 'anyToken',
    });
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.getAssociatedLabels();

    expect(warning).toBeCalledWith(
      false,
      'getAssociatedLabels: should not be called in context without session'
    );
    expect(client.getAssociatedLabels).not.toBeCalled();
  });
});
