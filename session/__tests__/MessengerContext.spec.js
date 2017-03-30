import MessengerContext from '../MessengerContext';
import SessionData from '../SessionData';

jest.mock('../../api/FBGraphAPIClient');

const createMockGraphAPIClient = () => ({
  turnTypingIndicatorsOn: jest.fn(),
  turnTypingIndicatorsOff: jest.fn(),
});

const setup = (messageDelay = 1000) => {
  const client = createMockGraphAPIClient();
  const data = new SessionData({
    user: {
      id: 'fakeUserId',
    },
  });
  const context = new MessengerContext({
    graphAPIClient: client,
    data,
    messageDelay,
  });
  return {
    context,
    data,
    client,
  };
};

const setupNoDelay = () => {
  const client = createMockGraphAPIClient();
  const data = new SessionData({
    user: {
      id: 'fakeUserId',
    },
  });
  const context = new MessengerContext({
    graphAPIClient: client,
    data,
  });
  return {
    context,
    data,
    client,
  };
};

it('be defined', () => {
  const { context } = setup();
  expect(context).toBeDefined();
});

it('get #data works', () => {
  const { context, data } = setup();
  expect(context.data).toBe(data);
});

it('#sendText put sendText to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendImage put sendImage to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendImage('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendImage',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendAudio put sendAudio to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendAudio('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendAudio',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendVideo put sendVideo to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendVideo('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendVideo',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendFile put sendFile to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendFile('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendFile',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendQuickReplies put sendQuickReplies to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const quickReplies = [];

  context.sendQuickReplies({ text: 'xxx.com' }, quickReplies);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendQuickReplies',
    args: [data.user.id, { text: 'xxx.com' }, quickReplies],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendGenericTemplate put sendGenericTemplate to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const elements = {};
  const ratio = '';

  context.sendGenericTemplate(elements, ratio);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendGenericTemplate',
    args: [data.user.id, elements, ratio],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendButtonTemplate put sendButtonTemplate to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  const buttons = [];

  context.sendButtonTemplate('yayaya', buttons);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendButtonTemplate',
    args: [data.user.id, 'yayaya', buttons],
    delay: 1000,
    showIndicators: true,
  });
});

it('#turnTypingIndicatorsOn call client turnTypingIndicatorsOn', () => {
  const { context, client, data } = setup();
  context.turnTypingIndicatorsOn();
  expect(client.turnTypingIndicatorsOn).toBeCalledWith(data.user.id);
});

it('#turnTypingIndicatorsOff call client turnTypingIndicatorsOff', () => {
  const { context, client, data } = setup();
  context.turnTypingIndicatorsOff();
  expect(client.turnTypingIndicatorsOff).toBeCalledWith(data.user.id);
});

it('use default message delay when nothing passed in', () => {
  const { context, client, data } = setupNoDelay();

  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('yooooooo~');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [data.user.id, 'yooooooo~'],
    delay: 1000,
    showIndicators: true,
  });
});

it('call messageDelay() when it passed in with a function', () => {
  const messageDelay = jest.fn();
  messageDelay.mockReturnValue(2500);
  const { context, client, data } = setup(messageDelay);

  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('yooooooo~');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [data.user.id, 'yooooooo~'],
    delay: 2500,
    showIndicators: true,
  });
});

it('return messageDelay when it passed in with a number', () => {
  const _messageDelay = 999;
  const { context, client, data } = setup(_messageDelay);

  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('yooooooo~');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [data.user.id, 'yooooooo~'],
    delay: 999,
    showIndicators: true,
  });
});

it('should not sendText to enqueu in jobQueue when paused', () => {
  const { context } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.hitl.pause();

  context.sendText('xxx.com');

  expect(context._jobQueue.enqueue).not.toBeCalled();
});

it('should sendText to enqueu in jobQueue when resumed', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.hitl.pause();
  context.hitl.unpause();

  context.sendText('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
    showIndicators: true,
  });
});

it('has send to methods', () => {
  const { context } = setup();
  expect(context.sendTextTo).toBeDefined();
  expect(context.sendImageTo).toBeDefined();
  expect(context.sendAudioTo).toBeDefined();
  expect(context.sendVideoTo).toBeDefined();
  expect(context.sendFileTo).toBeDefined();
  expect(context.sendQuickRepliesTo).toBeDefined();
  expect(context.sendGenericTemplateTo).toBeDefined();
  expect(context.sendButtonTemplateTo).toBeDefined();
});

it('#sendTextTo put sendText to jobQueue', () => {
  const { context, client } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendTextTo('uid_1', 'xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: ['uid_1', 'xxx.com'],
    delay: 0,
    showIndicators: false,
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
});

it('#sendTextWithDelay put sendText to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendTextWithDelay(3000, 'xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [data.user.id, 'xxx.com'],
    delay: 3000,
    showIndicators: true,
  });
});
