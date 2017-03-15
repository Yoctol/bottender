import Session from '../Session';
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
  const sessionInstance = new Session({
    graphAPIClient: client,
    data,
    messageDelay,
  });
  return {
    sessionInstance,
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
  const sessionInstance = new Session({
    graphAPIClient: client,
    data,
  });
  return {
    sessionInstance,
    data,
    client,
  };
};

it('be defined', () => {
  const { sessionInstance } = setup();
  expect(sessionInstance).toBeDefined();
});

it('get #data works', () => {
  const { sessionInstance, data } = setup();
  expect(sessionInstance.data).toBe(data);
});

it('set #data works', () => {
  const { sessionInstance } = setup();
  const data = new SessionData();

  sessionInstance.data = data;

  expect(sessionInstance.data).toBe(data);
});

it('sendText to enqueu in jobQueue', () => {
  const { sessionInstance, client, data } = setup();
  sessionInstance._jobQueue = {
    enqueue: jest.fn(),
  };

  sessionInstance.sendText('xxx.com');

  expect(sessionInstance._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
  });
});

it('sendImage to enqueu in jobQueue', () => {
  const { sessionInstance, client, data } = setup();
  sessionInstance._jobQueue = {
    enqueue: jest.fn(),
  };

  sessionInstance.sendImage('xxx.com');

  expect(sessionInstance._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendImage',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
  });
});

it('sendAudio to enqueu in jobQueue', () => {
  const { sessionInstance, client, data } = setup();
  sessionInstance._jobQueue = {
    enqueue: jest.fn(),
  };

  sessionInstance.sendAudio('xxx.com');

  expect(sessionInstance._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendAudio',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
  });
});

it('sendVideo to enqueu in jobQueue', () => {
  const { sessionInstance, client, data } = setup();
  sessionInstance._jobQueue = {
    enqueue: jest.fn(),
  };

  sessionInstance.sendVideo('xxx.com');

  expect(sessionInstance._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendVideo',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
  });
});

it('sendFile to enqueu in jobQueue', () => {
  const { sessionInstance, client, data } = setup();
  sessionInstance._jobQueue = {
    enqueue: jest.fn(),
  };

  sessionInstance.sendFile('xxx.com');

  expect(sessionInstance._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendFile',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
  });
});

it('sendQuickReplies to enqueu in jobQueue', () => {
  const { sessionInstance, client, data } = setup();
  sessionInstance._jobQueue = {
    enqueue: jest.fn(),
  };

  const attachment = [];
  const quickReplies = [];

  sessionInstance.sendQuickReplies('xxx.com', attachment, quickReplies);

  expect(sessionInstance._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendQuickReplies',
    args: [data.user.id, 'xxx.com', attachment, quickReplies],
    delay: 1000,
  });
});

it('sendGenericTemplate to enqueu in jobQueue', () => {
  const { sessionInstance, client, data } = setup();
  sessionInstance._jobQueue = {
    enqueue: jest.fn(),
  };

  const element = {};

  sessionInstance.sendGenericTemplate(element);

  expect(sessionInstance._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendGenericTemplate',
    args: [data.user.id, element],
    delay: 1000,
  });
});

it('sendButtonTemplate to enqueu in jobQueue', () => {
  const { sessionInstance, client, data } = setup();
  sessionInstance._jobQueue = {
    enqueue: jest.fn(),
  };

  const buttons = [];

  sessionInstance.sendButtonTemplate('yayaya', buttons);

  expect(sessionInstance._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendButtonTemplate',
    args: [data.user.id, 'yayaya', buttons],
    delay: 1000,
  });
});

it('turnTypingIndicatorsOn called client turnTypingIndicatorsOn', () => {
  const { sessionInstance, client, data } = setup();
  sessionInstance.turnTypingIndicatorsOn();
  expect(client.turnTypingIndicatorsOn).toBeCalledWith(data.user.id);
});

it('turnTypingIndicatorsOff called client turnTypingIndicatorsOff', () => {
  const { sessionInstance, client, data } = setup();
  sessionInstance.turnTypingIndicatorsOff();
  expect(client.turnTypingIndicatorsOff).toBeCalledWith(data.user.id);
});

it('use default message delay when nothing passed in', () => {
  const { sessionInstance, client, data } = setupNoDelay();

  sessionInstance._jobQueue = {
    enqueue: jest.fn(),
  };

  sessionInstance.sendText('yooooooo~');

  expect(sessionInstance._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [data.user.id, 'yooooooo~'],
    delay: 1000,
  });
});

it('call messageDelay() when it passed in with a function', () => {
  const messageDelay = jest.fn();
  messageDelay.mockReturnValue(2500);
  const { sessionInstance, client, data } = setup(messageDelay);

  sessionInstance._jobQueue = {
    enqueue: jest.fn(),
  };

  sessionInstance.sendText('yooooooo~');

  expect(sessionInstance._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [data.user.id, 'yooooooo~'],
    delay: 2500,
  });
});

it('return messageDelay when it passed in with a number', () => {
  const _messageDelay = 999;
  const { sessionInstance, client, data } = setup(_messageDelay);

  sessionInstance._jobQueue = {
    enqueue: jest.fn(),
  };

  sessionInstance.sendText('yooooooo~');

  expect(sessionInstance._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: [data.user.id, 'yooooooo~'],
    delay: 999,
  });
});
