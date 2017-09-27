import SlackContext from '../SlackContext';
import SlackEvent from '../SlackEvent';

jest.mock('delay');
jest.mock('messaging-api-slack');

let sleep;

beforeEach(() => {
  sleep = require('delay'); // eslint-disable-line global-require
});

const rawEvent = {
  type: 'message',
  user: 'U13AGSN1X',
  text: 'Experience is the best teacher.',
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
  context.typing = jest.fn();
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

describe('#sendText', () => {
  it('should call client.postMessage', async () => {
    const { context, client } = setup();

    await context.postMessage('xxx.com');

    expect(client.postMessage).toBeCalledWith('C6A9RJJ3F', 'xxx.com', {
      as_user: true,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.postMessage('xxx.com');

    expect(context.handled).toBe(true);
  });
});

describe('#typing', () => {
  it('avoid delay 0', async () => {
    const { context } = setup();

    await context.typing(0);

    expect(sleep).not.toBeCalled();
  });
});
