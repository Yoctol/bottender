import SlackContext from '../SlackContext';
import SlackEvent from '../SlackEvent';

jest.mock('delay');
jest.mock('messaging-api-slack');

const rawEvent = {
  type: 'message',
  user: 'U13AGSN1X',
  text: '你好',
  ts: '1500435914.425136',
  channel: 'C6A9RJJ3F',
  event_ts: '1500435914.425136',
};

const setup = () => {
  const client = {};
  const session = {
    user: {
      id: 'fakeUserId',
    },
    channel: {
      id: 'C6A9RJJ3F',
    },
  };
  const args = {
    client,
    event: new SlackEvent(rawEvent),
    session,
  };
  const context = new SlackContext(args);
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

it('#platform to be `slack`', () => {
  const { context } = setup();
  expect(context.platform).toBe('slack');
});

it('get #session works', () => {
  const { context, session } = setup();
  expect(context.session).toBe(session);
});

it('get #event works', () => {
  const { context } = setup();
  expect(context.event).toBeInstanceOf(SlackEvent);
});

it('#sendText put sendText to jobQueue', () => {
  const { context, client } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'postMessage',
    args: ['C6A9RJJ3F', 'xxx.com', { as_user: true }],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('use default message delay', () => {
  const { context, client } = setup();

  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendText('yooooooo~');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'postMessage',
    args: ['C6A9RJJ3F', 'yooooooo~', { as_user: true }],
    delay: 1000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});

it('has send with delay methods', () => {
  const { context } = setup();
  expect(context.sendTextWithDelay).toBeDefined();
});

it('#sendTextWithDelay put sendText to jobQueue', () => {
  const { context, client } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendTextWithDelay(3000, 'xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'postMessage',
    args: ['C6A9RJJ3F', 'xxx.com', { as_user: true }],
    delay: 3000,
    showIndicators: true,
    onSuccess: expect.any(Function),
    onError: expect.any(Function),
  });
});
