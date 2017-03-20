import LineContext from '../LineContext';
import SessionData from '../SessionData';

jest.mock('../../graph/LineBotAPIClient');

const setup = (messageDelay = 1000, noDelay = false) => {
  const client = {};
  const data = new SessionData({
    user: {
      id: 'fakeUserId',
    },
  });
  const context = new LineContext({
    lineAPIClient: client,
    data,
    messageDelay: noDelay ? undefined : messageDelay,
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

it('put pushText to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushText',
    args: [data.user.id, 'xxx.com'],
    delay: 1000,
  });
});

it('put pushImage to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendImage('xxx.jpg', 'yyy.jpg');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushImage',
    args: [data.user.id, 'xxx.jpg', 'yyy.jpg'],
    delay: 1000,
  });
});

it('put pushAudio to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendAudio('xxx.mp3', 240000);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushAudio',
    args: [data.user.id, 'xxx.mp3', 240000],
    delay: 1000,
  });
});

it('put pushVideo to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendVideo('xxx.mp4', 'yyy.jpg');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushVideo',
    args: [data.user.id, 'xxx.mp4', 'yyy.jpg'],
    delay: 1000,
  });
});

it('put sendLocation to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendLocation({
    title: 'my location',
    address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
    latitude: 35.65910807942215,
    longitude: 139.70372892916203,
  });

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushLocation',
    args: [
      data.user.id,
      {
        title: 'my location',
        address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
        latitude: 35.65910807942215,
        longitude: 139.70372892916203,
      },
    ],
    delay: 1000,
  });
});

it('put pushSticker to jobQueue', () => {
  const { context, client, data } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendSticker('1', '1');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushSticker',
    args: [data.user.id, '1', '1'],
    delay: 1000,
  });
});

it('use default message delay when nothing passed in', () => {
  const { context, client, data } = setup(null, true);

  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('yooooooo~');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'pushText',
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
    method: 'pushText',
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
    method: 'pushText',
    args: [data.user.id, 'yooooooo~'],
    delay: 999,
  });
});
