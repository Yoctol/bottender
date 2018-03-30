jest.mock('delay');
jest.mock('messaging-api-slack');
jest.mock('warning');

let SlackClient;
let SlackContext;
let SlackEvent;
let sleep;
let warning;

beforeEach(() => {
  /* eslint-disable global-require */
  SlackClient = require('messaging-api-slack').SlackOAuthClient;
  SlackContext = require('../SlackContext').default;
  SlackEvent = require('../SlackEvent').default;
  sleep = require('delay');
  warning = require('warning');
  /* eslint-enable global-require */
});

const messageRawEvent = {
  type: 'message',
  user: 'U13AGSN1X',
  text: 'Experience is the best teacher.',
  ts: '1500435914.425136',
  channel: 'C6A9RJJ3F',
  event_ts: '1500435914.425136',
};

const threadRawEvent = {
  type: 'message',
  channel: 'C6A9RJJ3F',
  user: 'U056KAAAA',
  text: 'in a thread',
  ts: '1515480368.000083',
  source_team: 'T056KAAAA',
  team: 'T056KAAAA',
  thread_ts: '1515479974.000115',
};

const userSession = {
  user: {
    id: 'fakeUserId',
  },
  channel: {
    id: 'C6A9RJJ3F',
  },
};
const setup = ({ session: _session, rawEvent: _rawEvent } = {}) => {
  const session = _session === undefined ? userSession : _session;
  const rawEvent = _rawEvent === undefined ? messageRawEvent : _rawEvent;
  const client = SlackClient.connect();
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

describe('#sendText', () => {
  it('should call this.postMessage', async () => {
    const { context } = setup();

    expect(context.sendText('xxx.com')).toEqual(context.postMessage('xxx.com'));
  });
});

describe('#postMessage', () => {
  it('should call client.postMessage', async () => {
    const { context, client } = setup();

    await context.postMessage('xxx.com');

    expect(client.postMessage).toBeCalledWith('C6A9RJJ3F', 'xxx.com', {});
  });

  it('should set thread_ts if event is in a thread', async () => {
    const { context, client } = setup({ rawEvent: threadRawEvent });

    await context.postMessage('xxx.com');

    expect(client.postMessage).toBeCalledWith('C6A9RJJ3F', 'xxx.com', {
      thread_ts: '1515479974.000115',
    });
  });

  it('should support overwrite options', async () => {
    const { context, client } = setup();

    await context.postMessage('xxx.com', { attachments: [], as_user: false });

    expect(client.postMessage).toBeCalledWith('C6A9RJJ3F', 'xxx.com', {
      attachments: [],
      as_user: false,
    });
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    await context.postMessage('xxx.com');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have channelId', async () => {
    const { context, client } = setup({ session: false });

    await context.postMessage('xxx.com');

    expect(warning).toBeCalled();
    expect(client.postMessage).not.toBeCalled();
  });

  it('should get channel id', async () => {
    const id = '123';
    const { context, client } = setup({ session: { channel: { id } } });

    await context.postMessage('xxx.com');

    expect(client.postMessage).toBeCalledWith(id, 'xxx.com', {});
  });

  it('should get null channelId and call warning if no session', async () => {
    const { context, client } = setup({ session: false });

    await context.postMessage('xxx.com');

    expect(warning).toBeCalled();
    expect(client.postMessage).not.toBeCalled();
  });

  it('should get null channelId and call warning if session is wrong', async () => {
    const { context, client } = setup({ session: { channel: '123' } });

    await context.postMessage('xxx.com');

    expect(warning).toBeCalled();
    expect(client.postMessage).not.toBeCalled();
  });
});

describe('#postEphemeral', () => {
  it('should call client.postEphemeral', async () => {
    const { context, client } = setup();

    await context.postEphemeral('xxx.com');

    expect(client.postEphemeral).toBeCalledWith(
      'C6A9RJJ3F',
      'fakeUserId',
      'xxx.com',
      {}
    );
  });
});

describe('#typing', () => {
  it('avoid delay 0', async () => {
    const { context } = setup();

    await context.typing(0);

    expect(sleep).not.toBeCalled();
  });

  it('should call sleep', async () => {
    const { context } = setup();

    await context.typing(10);

    expect(sleep).toBeCalled();
  });
});
