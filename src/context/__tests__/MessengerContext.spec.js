jest.mock('delay');
jest.mock('messaging-api-messenger');
jest.mock('warning');

let MessengerContext;
let MessengerEvent;
let sleep;
let warning;

beforeEach(() => {
  /* eslint-disable global-require */
  MessengerContext = require('../MessengerContext').default;
  MessengerEvent = require('../MessengerEvent').default;
  sleep = require('delay');
  warning = require('warning');
  /* eslint-enable global-require */
});

afterEach(() => {
  jest.useFakeTimers();
});

const createMockGraphAPIClient = () => ({
  typingOn: jest.fn(),
  typingOff: jest.fn(),
  markSeen: jest.fn(),
  sendText: jest.fn(),
  sendAttachment: jest.fn(),
  sendImage: jest.fn(),
  sendAudio: jest.fn(),
  sendVideo: jest.fn(),
  sendFile: jest.fn(),
  sendQuickReplies: jest.fn(),
  sendGenericTemplate: jest.fn(),
  sendButtonTemplate: jest.fn(),
  sendListTemplate: jest.fn(),
  sendReceiptTemplate: jest.fn(),
  sendAirlineBoardingPassTemplate: jest.fn(),
  sendAirlineCheckinTemplate: jest.fn(),
  sendAirlineItineraryTemplate: jest.fn(),
  sendAirlineFlightUpdateTemplate: jest.fn(),
  sendTextWithDelay: jest.fn(),
});

const rawEvent = {
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
const setup = ({ session } = { session: userSession }) => {
  const client = createMockGraphAPIClient();
  const args = {
    client,
    event: new MessengerEvent(rawEvent),
    session,
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

    expect(warning).toBeCalled();
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

    expect(warning).toBeCalled();
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
});

describe('#sendQuickReplies', () => {
  it('should call client.sendQuickReplies', async () => {
    const { context, client, session } = setup();

    const quickReplies = [];

    await context.sendQuickReplies({ text: 'xxx.com' }, quickReplies);

    expect(client.sendQuickReplies).toBeCalledWith(
      session.user.id,
      { text: 'xxx.com' },
      quickReplies,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const quickReplies = [];

    await context.sendQuickReplies({ text: 'xxx.com' }, quickReplies);

    expect(context.isHandled).toBe(true);
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
});

describe('#typingOn', () => {
  it('should call client typingOn', async () => {
    const { context, client, session } = setup();

    await context.typingOn();

    expect(client.typingOn).toBeCalledWith(session.user.id);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.typingOn();

    expect(context.isHandled).toBe(true);
  });
  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.typingOn();

    expect(warning).toBeCalled();
    expect(client.typingOn).not.toBeCalled();
  });
});

describe('#typingOff', () => {
  it('should call client typingOff', async () => {
    const { context, client, session } = setup();

    await context.typingOff();

    expect(client.typingOff).toBeCalledWith(session.user.id);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.typingOff();

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.typingOff();

    expect(warning).toBeCalled();
    expect(client.typingOff).not.toBeCalled();
  });
});

describe('#markSeen', () => {
  it('should call client markSeen', async () => {
    const { context, client, session } = setup();

    await context.markSeen();

    expect(client.markSeen).toBeCalledWith(session.user.id);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.markSeen();

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.markSeen();

    expect(warning).toBeCalled();
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
