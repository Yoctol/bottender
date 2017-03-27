import MessengerContext from '../MessengerContext';
import SessionData from '../SessionData';

jest.mock('../../graph/FBGraphAPIClient');

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

it('set #data works', () => {
  const { context } = setup();
  const data = new SessionData();

  context.data = data;

  expect(context.data).toBe(data);
});

it('sendText to enqueu in jobQueue', () => {
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
  });
});

it('sendImage to enqueu in jobQueue', () => {
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
  });
});

it('sendAudio to enqueu in jobQueue', () => {
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
  });
});

it('sendVideo to enqueu in jobQueue', () => {
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
  });
});

it('sendFile to enqueu in jobQueue', () => {
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
  });
});

it('sendQuickReplies to enqueu in jobQueue', () => {
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
  });
});

it('sendGenericTemplate to enqueu in jobQueue', () => {
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
  });
});

it('sendButtonTemplate to enqueu in jobQueue', () => {
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
  });
});

it('turnTypingIndicatorsOn called client turnTypingIndicatorsOn', () => {
  const { context, client, data } = setup();
  context.turnTypingIndicatorsOn();
  expect(client.turnTypingIndicatorsOn).toBeCalledWith(data.user.id);
});

it('turnTypingIndicatorsOff called client turnTypingIndicatorsOff', () => {
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
  });
});
