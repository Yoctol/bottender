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
  };
  const args = {
    client,
    rawEvent,
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
    method: 'sendText',
    args: ['xxx.com'],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendAttachment put sendAttachment to jobQueue', () => {
  const { context, client } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendAttachment('xxx.png');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendAttachment',
    args: ['xxx.png'],
    delay: 1000,
    showIndicators: true,
  });
});

it('#sendAttachments put sendAttachments to jobQueue', () => {
  const { context, client } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendAttachments(['xxx.mp3']);

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendAttachments',
    args: [['xxx.mp3']],
    delay: 1000,
    showIndicators: true,
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
    method: 'sendText',
    args: ['yooooooo~'],
    delay: 1000,
    showIndicators: true,
  });
});

it('has send with delay methods', () => {
  const { context } = setup();
  expect(context.sendTextWithDelay).toBeDefined();
  expect(context.sendAttachmentWithDelay).toBeDefined();
  expect(context.sendAttachmentsWithDelay).toBeDefined();
});

it('#sendTextWithDelay put sendText to jobQueue', () => {
  const { context, client } = setup();
  context._jobQueue = {
    enqueue: jest.fn(),
  };

  context.sendTextWithDelay(3000, 'xxx.com');

  expect(context._jobQueue.enqueue).toBeCalledWith({
    instance: client,
    method: 'sendText',
    args: ['xxx.com'],
    delay: 3000,
    showIndicators: true,
  });
});
