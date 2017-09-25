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

const createMockSlackClient = () => ({
  postMessage: jest.fn(),
});

const setup = () => {
  const client = createMockSlackClient();
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

it('get #client works', () => {
  const { context, client } = setup();
  expect(context.client).toBe(client);
});

it('#sendText to call client.postMessage', async () => {
  const { context, client } = setup();

  await context.postMessage('xxx.com');

  expect(client.postMessage).toBeCalledWith('C6A9RJJ3F', 'xxx.com', {
    as_user: true,
  });
});

it('has send with delay methods', () => {
  const { context } = setup();
  expect(context.sendTextWithDelay).toBeDefined();
});

it('#sendTextWithDelay to call client.postMessage', async () => {
  const { context, client } = setup();

  await context.sendTextWithDelay(3000, 'xxx.com');

  expect(client.postMessage).toBeCalledWith('C6A9RJJ3F', 'xxx.com', {
    as_user: true,
  });
});
