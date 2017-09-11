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
});

const rawEvent = {
  sender: { id: '1423587017700273' },
  recipient: { id: '404217156637689' },
  timestamp: 1491796363181,
  message: {
    mid: 'mid.$cAAE1UUyiiwthh0NPrVbVf4HFNDGl',
    seq: 348847,
    text: '請給我背影',
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

it('#sendText put sendText to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [session.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendAttachment put sendAttachment to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const attachment = {
    type: 'image',
    payload: {
      url: 'https://example.com/pic.png',
    },
  };

  context.sendAttachment({
    type: 'image',
    payload: {
      url: 'https://example.com/pic.png',
    },
  });

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendAttachment',
    args: [session.user.id, attachment],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendImage put sendImage to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendImage('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendImage',
    args: [session.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendAudio put sendAudio to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendAudio('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendAudio',
    args: [session.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendVideo put sendVideo to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendVideo('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendVideo',
    args: [session.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendFile put sendFile to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendFile('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendFile',
    args: [session.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendQuickReplies put sendQuickReplies to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const quickReplies = [];

  context.sendQuickReplies({ text: 'xxx.com' }, quickReplies);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendQuickReplies',
    args: [session.user.id, { text: 'xxx.com' }, quickReplies],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendGenericTemplate put sendGenericTemplate to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const elements = {};
  const ratio = '';

  context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendGenericTemplate',
    args: [session.user.id, elements, { image_aspect_ratio: ratio }],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendButtonTemplate put sendButtonTemplate to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const buttons = [];

  context.sendButtonTemplate('yayaya', buttons);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendButtonTemplate',
    args: [session.user.id, 'yayaya', buttons],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendListTemplate put sendListTemplate to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const elements = [];
  const buttons = [];

  context.sendListTemplate(elements, buttons, 'large');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendListTemplate',
    args: [session.user.id, elements, buttons, 'large'],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendReceiptTemplate put sendReceiptTemplate to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const receipt = {};

  context.sendReceiptTemplate(receipt);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendReceiptTemplate',
    args: [session.user.id, receipt],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendAirlineBoardingPassTemplate put sendAirlineBoardingPassTemplate to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const boardingPass = {};

  context.sendAirlineBoardingPassTemplate(boardingPass);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendAirlineBoardingPassTemplate',
    args: [session.user.id, boardingPass],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendAirlineCheckinTemplate put sendAirlineCheckinTemplate to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const checkin = {};

  context.sendAirlineCheckinTemplate(checkin);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendAirlineCheckinTemplate',
    args: [session.user.id, checkin],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendAirlineItineraryTemplate put sendAirlineItineraryTemplate to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const itinerary = {};

  context.sendAirlineItineraryTemplate(itinerary);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendAirlineItineraryTemplate',
    args: [session.user.id, itinerary],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#sendAirlineFlightUpdateTemplate put sendAirlineFlightUpdateTemplate to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const flightUpdate = {};

  context.sendAirlineFlightUpdateTemplate(flightUpdate);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendAirlineFlightUpdateTemplate',
    args: [session.user.id, flightUpdate],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('#typingOn call client typingOn', () => {
  const { context, client, session } = setup();
  context.typingOn();
  expect(client.typingOn).toBeCalledWith(session.user.id);
});

it('#typingOff call client typingOff', () => {
  const { context, client, session } = setup();
  context.typingOff();
  expect(client.typingOff).toBeCalledWith(session.user.id);
});

it('use default message delay', () => {
  const { context, client, session } = setup();

  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('yooooooo~');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [session.user.id, 'yooooooo~'],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('has send with delay methods', () => {
  const { context } = setup();
  expect(context.sendTextWithDelay).toBeDefined();
  expect(context.sendImageWithDelay).toBeDefined();
  expect(context.sendAudioWithDelay).toBeDefined();
  expect(context.sendVideoWithDelay).toBeDefined();
  expect(context.sendFileWithDelay).toBeDefined();
  expect(context.sendQuickRepliesWithDelay).toBeDefined();
  expect(context.sendGenericTemplateWithDelay).toBeDefined();
  expect(context.sendButtonTemplateWithDelay).toBeDefined();
  expect(context.sendListTemplateWithDelay).toBeDefined();
  expect(context.sendReceiptTemplateWithDelay).toBeDefined();
  expect(context.sendAirlineBoardingPassTemplateWithDelay).toBeDefined();
  expect(context.sendAirlineCheckinTemplateWithDelay).toBeDefined();
  expect(context.sendAirlineItineraryTemplateWithDelay).toBeDefined();
  expect(context.sendAirlineFlightUpdateTemplateWithDelay).toBeDefined();
});

it('#sendTextWithDelay put sendText to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendTextWithDelay(3000, 'xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [session.user.id, 'xxx.com'],
    delay: 3000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('show typing when sending', () => {
  const { context, client } = setup();

  context.sendText('xxx.com');

  expect(client.typingOn).toBeCalled();
  expect(client.typingOff).not.toBeCalled();
});
