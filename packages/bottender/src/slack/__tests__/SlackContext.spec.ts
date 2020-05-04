jest.mock('delay');
// jest.mock('messaging-api-slack');
jest.mock('warning');

let SlackClient;
let SlackContext;
let SlackEvent;
let sleep;
let warning;

const VIEW_PAYLOAD = {
  id: 'VMHU10V25',
  teamId: 'T8N4K1JN',
  type: 'modal',
  title: {
    type: 'plain_text',
    text: 'Quite a plain modal',
  },
  submit: {
    type: 'plain_text',
    text: 'Create',
  },
  blocks: [
    {
      type: 'input',
      blockId: 'a_block_id',
      label: {
        type: 'plain_text',
        text: 'A simple label',
        emoji: true,
      },
      optional: false,
      element: {
        type: 'plain_text_input',
        actionId: 'an_action_id',
      },
    },
  ],
  privateMetadata: 'Shh it is a secret',
  callbackId: 'identify_your_modals',
  externalId: '',
  state: {
    values: [],
  },
  hash: '156772938.1827394',
  clearOnClose: false,
  notifyOnClose: false,
};

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
  eventTs: '1500435914.425136',
};

const threadRawEvent = {
  type: 'message',
  channel: 'C6A9RJJ3F',
  user: 'U056KAAAA',
  text: 'in a thread',
  ts: '1515480368.000083',
  sourceTeam: 'T056KAAAA',
  team: 'T056KAAAA',
  threadTs: '1515479974.000115',
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

  client.chat = {
    postMessage: jest.fn(),
    postEphemeral: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    meMessage: jest.fn(),
    getPermalink: jest.fn(),
    scheduleMessage: jest.fn(),
    deleteScheduledMessage: jest.fn(),
    unfurl: jest.fn(),
    scheduledMessages: {
      list: jest.fn(),
    },
  };

  client.views = {
    open: jest.fn(),
    publish: jest.fn(),
    push: jest.fn(),
    update: jest.fn(),
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

describe('#sendText', () => {
  it('should call this.postMessage', async () => {
    const { context } = setup();

    expect(context.sendText('hello')).toEqual(context.postMessage('hello'));
  });
});

describe('#postMessage', () => {
  it('should call client.chat.postMessage', async () => {
    const { context, client } = setup();

    await context.postMessage('hello');

    expect(client.chat.postMessage).toBeCalledWith({
      channel: 'C6A9RJJ3F',
      text: 'hello',
    });
  });

  it('should set threadTs if event is in a thread', async () => {
    const { context, client } = setup({ rawEvent: threadRawEvent });

    await context.postMessage('hello');

    expect(client.chat.postMessage).toBeCalledWith({
      channel: 'C6A9RJJ3F',
      text: 'hello',
      threadTs: '1515479974.000115',
    });
  });

  it('should support overwrite options', async () => {
    const { context, client } = setup();

    await context.postMessage({
      asUser: false,
      attachments: [],
      channel: 'C6A9RJJ3F',
      text: 'hello',
      threadTs: undefined,
    });

    expect(client.chat.postMessage).toBeCalledWith({
      asUser: false,
      attachments: [],
      channel: 'C6A9RJJ3F',
      text: 'hello',
    });
  });

  it('should call warning and not to send if dont have channelId', async () => {
    const { context, client } = setup({ session: false });

    await context.postMessage('hello');

    expect(warning).toBeCalled();
    expect(client.chat.postMessage).not.toBeCalled();
  });

  it('should get channel id', async () => {
    const id = '123';
    const { context, client } = setup({ session: { channel: { id } } });

    await context.postMessage('hello');

    expect(client.chat.postMessage).toBeCalledWith({
      channel: '123',
      text: 'hello',
    });
  });

  it('should get null channelId and call warning if no session', async () => {
    const { context, client } = setup({ session: false });

    await context.postMessage('hello');

    expect(warning).toBeCalled();
    expect(client.chat.postMessage).not.toBeCalled();
  });

  it('should get null channelId and call warning if session is wrong', async () => {
    const { context, client } = setup({ session: { channel: '123' } });

    await context.postMessage('hello');

    expect(warning).toBeCalled();
    expect(client.chat.postMessage).not.toBeCalled();
  });
});

describe('#chat.postMessage', () => {
  it('should call client.chat.postMessage', async () => {
    const { context, client } = setup();

    await context.chat.postMessage({ text: 'hello' });

    expect(client.chat.postMessage).toBeCalledWith({
      channel: 'C6A9RJJ3F',
      text: 'hello',
    });
  });

  it('should set threadTs if event is in a thread', async () => {
    const { context, client } = setup({ rawEvent: threadRawEvent });

    await context.chat.postMessage({ text: 'hello' });

    expect(client.chat.postMessage).toBeCalledWith({
      channel: 'C6A9RJJ3F',
      text: 'hello',
      threadTs: '1515479974.000115',
    });
  });

  it('should support overwrite options', async () => {
    const { context, client } = setup();

    await context.chat.postMessage({
      asUser: false,
      attachments: [],
      channel: 'C6A9RJJ3F',
      text: 'hello',
    });

    expect(client.chat.postMessage).toBeCalledWith({
      asUser: false,
      attachments: [],
      channel: 'C6A9RJJ3F',
      text: 'hello',
    });
  });

  it('should call warning and not to send if dont have channelId', async () => {
    const { context, client } = setup({ session: false });

    await context.postMessage({ text: 'hello' });

    expect(warning).toBeCalled();
    expect(client.chat.postMessage).not.toBeCalled();
  });

  it('should get channel id', async () => {
    const id = '123';
    const { context, client } = setup({ session: { channel: { id } } });

    await context.postMessage({ text: 'hello' });

    expect(client.chat.postMessage).toBeCalledWith({
      channel: '123',
      text: 'hello',
    });
  });

  it('should get null channelId and call warning if no session', async () => {
    const { context, client } = setup({ session: false });

    await context.postMessage({ text: 'hello' });

    expect(warning).toBeCalled();
    expect(client.chat.postMessage).not.toBeCalled();
  });

  it('should get null channelId and call warning if session is wrong', async () => {
    const { context, client } = setup({ session: { channel: '123' } });

    await context.postMessage({ text: 'hello' });

    expect(warning).toBeCalled();
    expect(client.chat.postMessage).not.toBeCalled();
  });
});

describe('#postEphemeral', () => {
  it('should call client.chat.postEphemeral', async () => {
    const { context, client } = setup();

    await context.postEphemeral('hello');

    expect(client.chat.postEphemeral).toBeCalledWith({
      channel: 'C6A9RJJ3F',
      text: 'hello',
      user: 'fakeUserId',
    });
  });
});

describe('#chat.postEphemeral', () => {
  it('should call client.chat.postEphemeral', async () => {
    const { context, client } = setup();

    await context.chat.postEphemeral({
      text: 'hello',
    });

    expect(client.chat.postEphemeral).toBeCalledWith({
      channel: 'C6A9RJJ3F',
      text: 'hello',
      user: 'fakeUserId',
    });
  });
});

describe('#chat.update', () => {
  it('should call client.chat.update', async () => {
    const { context, client } = setup();

    await context.chat.update({
      ts: '1405894322.002768',
      text: 'hello',
    });

    expect(client.chat.update).toBeCalledWith({
      ts: '1405894322.002768',
      text: 'hello',
    });
  });
});

describe('#chat.delete', () => {
  it('should call client.chat.delete', async () => {
    const { context, client } = setup();

    await context.chat.delete({
      ts: '1405894322.002768',
    });

    expect(client.chat.delete).toBeCalledWith({
      channel: 'C6A9RJJ3F',
      ts: '1405894322.002768',
    });
  });
});

describe('#chat.meMessage', () => {
  it('should call client.chat.meMessage', async () => {
    const { context, client } = setup();

    await context.chat.meMessage({
      text: 'hello',
    });

    expect(client.chat.meMessage).toBeCalledWith({
      channel: 'C6A9RJJ3F',
      text: 'hello',
    });
  });
});

describe('#chat.getPermalink', () => {
  it('should call client.chat.getPermalink', async () => {
    const { context, client } = setup();

    await context.chat.getPermalink({
      messageTs: '1234567890.123456',
    });

    expect(client.chat.getPermalink).toBeCalledWith({
      channel: 'C6A9RJJ3F',
      messageTs: '1234567890.123456',
    });
  });
});

describe('#chat.scheduleMessage', () => {
  it('should call client.chat.scheduleMessage', async () => {
    const { context, client } = setup();

    await context.chat.scheduleMessage({
      postAt: '299876400',
      text: 'hello',
    });

    expect(client.chat.scheduleMessage).toBeCalledWith({
      channel: 'C6A9RJJ3F',
      postAt: '299876400',
      text: 'hello',
    });
  });
});

describe('#chat.deleteScheduledMessage', () => {
  it('should call client.chat.deleteScheduledMessage', async () => {
    const { context, client } = setup();

    await context.chat.deleteScheduledMessage({
      scheduledMessageId: 'Q1234ABCD',
    });

    expect(client.chat.deleteScheduledMessage).toBeCalledWith({
      channel: 'C6A9RJJ3F',
      scheduledMessageId: 'Q1234ABCD',
    });
  });
});

describe('#chat.scheduledMessages.list', () => {
  it('should call client.chat.scheduledMessages.list', async () => {
    const { context, client } = setup();

    await context.chat.scheduledMessages.list({});

    expect(client.chat.scheduledMessages.list).toBeCalledWith({});
  });
});

describe('#views.open', () => {
  it('should call client.views.open', async () => {
    const { context, client } = setup();

    await context.views.open({
      triggerId: '12345.98765.abcd2358fdea',
      view: VIEW_PAYLOAD,
    });

    expect(client.views.open).toBeCalledWith({
      triggerId: '12345.98765.abcd2358fdea',
      view: {
        ...VIEW_PAYLOAD,
        privateMetadata: '{"original":"Shh it is a secret"}',
      },
    });
  });
});

describe('#views.publish', () => {
  it('should call client.views.publish', async () => {
    const { context, client } = setup();

    await context.views.publish({
      userId: 'U0BPQUNTA',
      view: VIEW_PAYLOAD,
    });

    expect(client.views.publish).toBeCalledWith({
      userId: 'U0BPQUNTA',
      view: VIEW_PAYLOAD,
    });
  });
});

describe('#views.push', () => {
  it('should call client.views.push', async () => {
    const { context, client } = setup();

    await context.views.push({
      triggerId: '12345.98765.abcd2358fdea',
      view: VIEW_PAYLOAD,
    });

    expect(client.views.push).toBeCalledWith({
      triggerId: '12345.98765.abcd2358fdea',
      view: VIEW_PAYLOAD,
    });
  });
});

describe('#views.update', () => {
  it('should call client.views.update', async () => {
    const { context, client } = setup();

    await context.views.update({
      externalId: 'bmarley_view2',
      view: VIEW_PAYLOAD,
    });

    expect(client.views.update).toBeCalledWith({
      externalId: 'bmarley_view2',
      view: VIEW_PAYLOAD,
    });
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
