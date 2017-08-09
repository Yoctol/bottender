import TelegramContext from '../TelegramContext';
import TelegramEvent from '../TelegramEvent';

jest.mock('delay');
jest.mock('messaging-api-messenger');

const createMockGraphAPIClient = () => ({
  turnTypingIndicatorsOn: jest.fn(),
  turnTypingIndicatorsOff: jest.fn(),
});

const rawEvent = {
  message: {
    message_id: 666,
    from: {
      id: 313534466,
      first_name: 'first',
      last_name: 'last',
      username: 'username',
      language_code: 'en',
    },
    chat: {
      id: 427770117,
      first_name: 'first',
      last_name: 'last',
      type: 'private',
    },
    date: 1499402829,
    text: 'text',
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
    rawEvent,
    session,
  };
  const context = new TelegramContext(args);
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

it('#platform to be `telegram`', () => {
  const { context } = setup();
  expect(context.platform).toBe('telegram');
});

it('get #session works', () => {
  const { context, session } = setup();
  expect(context.session).toBe(session);
});

it('get #event works', () => {
  const { context } = setup();
  expect(context.event).toBeInstanceOf(TelegramEvent);
});

it('#sendMessage put sendMessage to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendMessage('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendMessage',
    args: [session.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});

it('#sendPhoto put sendPhoto to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendPhoto('xxx.png');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendPhoto',
    args: [session.user.id, 'xxx.png'],
    delay: 1000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});

it('#sendAudio put sendAudio to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendAudio('xxx.mp3');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendAudio',
    args: [session.user.id, 'xxx.mp3'],
    delay: 1000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});

it('#sendDocument put sendDocument to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendDocument('xxx.gif');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendDocument',
    args: [session.user.id, 'xxx.gif'],
    delay: 1000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});

it('#sendSticker put sendSticker to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendSticker('CAADAgADQAADyIsGAAE7MpzFPFQX5QI');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendSticker',
    args: [session.user.id, 'CAADAgADQAADyIsGAAE7MpzFPFQX5QI'],
    delay: 1000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});

it('#sendVideo put sendVideo to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendVideo('xxx.mp4');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendVideo',
    args: [session.user.id, 'xxx.mp4'],
    delay: 1000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});

it('#sendVoice put sendVoice to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendVoice('xxx.ogg');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendVoice',
    args: [session.user.id, 'xxx.ogg'],
    delay: 1000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});

it('#sendLocation put sendLocation to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const location = {};

  context.sendLocation(location);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendLocation',
    args: [session.user.id, location],
    delay: 1000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});

it('#sendVenue put sendVenue to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const venue = {};

  context.sendVenue(venue);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendVenue',
    args: [session.user.id, venue],
    delay: 1000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});

it('#sendContact put sendContact to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const contact = {};

  context.sendContact(contact);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendContact',
    args: [session.user.id, contact],
    delay: 1000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});

it('#sendChatAction put sendChatAction to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendChatAction('typing');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendChatAction',
    args: [session.user.id, 'typing'],
    delay: 1000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});

it('use default message delay', () => {
  const { context, client, session } = setup();

  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendMessage('yooooooo~');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendMessage',
    args: [session.user.id, 'yooooooo~'],
    delay: 1000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});

it('has send to methods', () => {
  const { context } = setup();
  expect(context.sendMessageTo).toBeDefined();
  expect(context.sendPhotoTo).toBeDefined();
  expect(context.sendAudioTo).toBeDefined();
  expect(context.sendDocumentTo).toBeDefined();
  expect(context.sendStickerTo).toBeDefined();
  expect(context.sendVideoTo).toBeDefined();
  expect(context.sendVoiceTo).toBeDefined();
  expect(context.sendLocationTo).toBeDefined();
  expect(context.sendVenueTo).toBeDefined();
  expect(context.sendContactTo).toBeDefined();
  expect(context.sendChatActionTo).toBeDefined();
});

it('#sendMessageTo put sendMessage to jobQueue', () => {
  const { context, client } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendMessageTo('userId', 'xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendMessage',
    args: ['userId', 'xxx.com'],
    delay: 0,
    showIndicators: false,
    callback: expect.any(Function),
  });
});

it('has send with delay methods', () => {
  const { context } = setup();
  expect(context.sendMessageWithDelay).toBeDefined();
  expect(context.sendPhotoWithDelay).toBeDefined();
  expect(context.sendAudioWithDelay).toBeDefined();
  expect(context.sendDocumentWithDelay).toBeDefined();
  expect(context.sendStickerWithDelay).toBeDefined();
  expect(context.sendVideoWithDelay).toBeDefined();
  expect(context.sendVoiceWithDelay).toBeDefined();
  expect(context.sendLocationWithDelay).toBeDefined();
  expect(context.sendVenueWithDelay).toBeDefined();
  expect(context.sendContactWithDelay).toBeDefined();
  expect(context.sendChatActionWithDelay).toBeDefined();
});

it('#sendMessageWithDelay put sendMessage to jobQueue', () => {
  const { context, client, session } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendMessageWithDelay(3000, 'xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendMessage',
    args: [session.user.id, 'xxx.com'],
    delay: 3000,
    showIndicators: true,
    callback: expect.any(Function),
  });
});
