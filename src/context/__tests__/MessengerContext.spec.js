import MessengerContext from '../MessengerContext';
import MessengerEvent from '../MessengerEvent';

jest.mock('delay');
jest.mock('messaging-api-messenger');

afterEach(() => {
  jest.useFakeTimers();
});

const createMockGraphAPIClient = () => ({
  typingOn: jest.fn(),
  typingOff: jest.fn(),
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

it('#sendText to call client.sendText', async () => {
  const { context, client, session } = setup();
  const option = undefined;

  await context.sendText('xxx.com');

  expect(client.sendText).toBeCalledWith(session.user.id, 'xxx.com', option);
});

it('#sendAttachment to call client.sendAttachment', async () => {
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

it('#sendImage to call client.sendImage', async () => {
  const { context, client, session } = setup();

  await context.sendImage('xxx.com');

  expect(client.sendImage).toBeCalledWith(session.user.id, 'xxx.com');
});

it('#sendAudio to call client.sendAudio', async () => {
  const { context, client, session } = setup();

  await context.sendAudio('xxx.com');

  expect(client.sendAudio).toBeCalledWith(session.user.id, 'xxx.com');
});

it('#sendVideo to call client.sendVideo', async () => {
  const { context, client, session } = setup();

  await context.sendVideo('xxx.com');

  expect(client.sendVideo).toBeCalledWith(session.user.id, 'xxx.com');
});

it('#sendFile to call client.sendFile', async () => {
  const { context, client, session } = setup();

  await context.sendFile('xxx.com');

  expect(client.sendFile).toBeCalledWith(session.user.id, 'xxx.com');
});

it('#sendQuickReplies to call client.sendQuickReplies', async () => {
  const { context, client, session } = setup();

  const quickReplies = [];

  await context.sendQuickReplies({ text: 'xxx.com' }, quickReplies);

  expect(client.sendQuickReplies).toBeCalledWith(
    session.user.id,
    { text: 'xxx.com' },
    quickReplies
  );
});

it('#sendGenericTemplate to call client.sendGenericTemplate', async () => {
  const { context, client, session } = setup();

  const elements = {};
  const ratio = '';

  await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

  expect(client.sendGenericTemplate).toBeCalledWith(session.user.id, elements, {
    image_aspect_ratio: ratio,
  });
});

it('#sendButtonTemplate to call client.sendButtonTemplate', async () => {
  const { context, client, session } = setup();

  const buttons = [];

  await context.sendButtonTemplate('yayaya', buttons);

  expect(client.sendButtonTemplate).toBeCalledWith(
    session.user.id,
    'yayaya',
    buttons
  );
});

it('#sendListTemplate to call client.sendListTemplate', async () => {
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

it('#sendReceiptTemplate to call client.sendReceiptTemplate', async () => {
  const { context, client, session } = setup();

  const receipt = {};

  await context.sendReceiptTemplate(receipt);

  expect(client.sendReceiptTemplate).toBeCalledWith(session.user.id, receipt);
});

it('#sendAirlineBoardingPassTemplate to call client.sendAirlineBoardingPassTemplate', async () => {
  const { context, client, session } = setup();

  const boardingPass = {};

  await context.sendAirlineBoardingPassTemplate(boardingPass);

  expect(client.sendAirlineBoardingPassTemplate).toBeCalledWith(
    session.user.id,
    boardingPass
  );
});

it('#sendAirlineCheckinTemplate to call client.sendAirlineCheckinTemplate', async () => {
  const { context, client, session } = setup();

  const checkin = {};

  await context.sendAirlineCheckinTemplate(checkin);

  expect(client.sendAirlineCheckinTemplate).toBeCalledWith(
    session.user.id,
    checkin
  );
});

it('#sendAirlineItineraryTemplate to call client.sendAirlineItineraryTemplate', async () => {
  const { context, client, session } = setup();

  const itinerary = {};

  await context.sendAirlineItineraryTemplate(itinerary);

  expect(client.sendAirlineItineraryTemplate).toBeCalledWith(
    session.user.id,
    itinerary
  );
});

it('#sendAirlineFlightUpdateTemplate to call client.sendAirlineFlightUpdateTemplate', async () => {
  const { context, client, session } = setup();

  const flightUpdate = {};

  await context.sendAirlineFlightUpdateTemplate(flightUpdate);

  expect(client.sendAirlineFlightUpdateTemplate).toBeCalledWith(
    session.user.id,
    flightUpdate
  );
});

it('#typingOn call client typingOn', async () => {
  const { context, client, session } = setup();
  await context.typingOn();
  expect(client.typingOn).toBeCalledWith(session.user.id);
});

it('#typingOff call client typingOff', async () => {
  const { context, client, session } = setup();
  await context.typingOff();
  expect(client.typingOff).toBeCalledWith(session.user.id);
});
