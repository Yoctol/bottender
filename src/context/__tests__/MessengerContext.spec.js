import MessengerContext from '../MessengerContext';
import MessengerEvent from '../MessengerEvent';

jest.mock('delay');
jest.mock('messaging-api-messenger');

let sleep;

beforeEach(() => {
  sleep = require('delay'); // eslint-disable-line global-require
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

const setup = () => {
  const client = createMockGraphAPIClient();
  const session = {
    user: {
      id: 'fakeUserId',
    },
  };
  const args = {
    client,
    event: new MessengerEvent(rawEvent),
    session,
  };
  const context = new MessengerContext(args);
  context.typing = jest.fn(() => {
    client.typingOn();
    client.typingOff();
  });
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
    const option = undefined;

    await context.sendText('xxx.com');

    expect(client.sendText).toBeCalledWith(session.user.id, 'xxx.com', option);
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendText('xxx.com');

    expect(context.isHandled).toBe(true);
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

    expect(client.sendAttachment).toBeCalledWith(session.user.id, attachment);
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

    expect(client.sendImage).toBeCalledWith(session.user.id, 'xxx.com');
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.sendImage('xxx.com');

    expect(context.isHandled).toBe(true);
  });
});

describe('#sendAudio', () => {
  it('should call client.sendAudio', async () => {
    const { context, client, session } = setup();

    await context.sendAudio('xxx.com');

    expect(client.sendAudio).toBeCalledWith(session.user.id, 'xxx.com');
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

    expect(client.sendVideo).toBeCalledWith(session.user.id, 'xxx.com');
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

    expect(client.sendFile).toBeCalledWith(session.user.id, 'xxx.com');
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
      quickReplies
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
      buttons
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

    await context.sendListTemplate(elements, buttons, 'large');

    expect(client.sendListTemplate).toBeCalledWith(
      session.user.id,
      elements,
      buttons,
      'large'
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

    expect(client.sendReceiptTemplate).toBeCalledWith(session.user.id, receipt);
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
      boardingPass
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
      checkin
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
      itinerary
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
      flightUpdate
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
});

describe('#typing', () => {
  it('avoid delay 0', async () => {
    const { context } = setup();

    await context.typing(0);

    expect(sleep).not.toBeCalled();
  });
});
