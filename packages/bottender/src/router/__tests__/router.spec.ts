import { run } from '../../bot/Bot';

import router, { line, payload, platform, route, text } from '..';

function textContext(message = '') {
  return {
    sendText: jest.fn(),
    event: {
      isText: true,
      isPayload: false,
      text: message,
    },
  };
}

function payloadContext(message = '') {
  return {
    sendText: jest.fn(),
    event: {
      isText: false,
      isPayload: true,
      payload: message,
    },
  };
}

function platformContext(name = '') {
  return {
    sendText: jest.fn(),
    platform: name,
  };
}

function sendText(message) {
  return async function(context) {
    await context.sendText(message);
  };
}

async function expectConversation(app, message, expectedReply) {
  const context = textContext(message);
  await app(context);
  if (expectedReply == null) {
    expect(context.sendText).not.toBeCalled();
  } else {
    expect(context.sendText).toBeCalledWith(expectedReply);
  }
}

async function expectPayloadConversation(app, message, expectedReply) {
  const context = payloadContext(message);

  await app(context);

  if (expectedReply == null) {
    expect(context.sendText).not.toBeCalled();
  } else {
    expect(context.sendText).toBeCalledWith(expectedReply);
  }
}

async function expectPlatformConversation(app, name, expectedReply) {
  const context = platformContext(name);

  await app(context);

  if (expectedReply == null) {
    expect(context.sendText).not.toBeCalled();
  } else {
    expect(context.sendText).toBeCalledWith(expectedReply);
  }
}

describe('#router', () => {
  it('should work with raw route format', async () => {
    const Router = router([
      {
        predicate: () => true,
        action: sendText('hello'),
      },
    ]);

    const app = run(Router);

    await expectConversation(app, 'hi', 'hello');
  });

  it('should return next if not match any route', async () => {
    const Router = router([
      {
        predicate: () => false,
        action: sendText('hello'),
      },
    ]);

    const props = {
      next: sendText('next'),
    };

    const app = run(Router);
    const context = textContext('hi');

    await app(context, props);

    expect(context.sendText).toBeCalledWith('next');
  });

  it('should work with props', async () => {
    let receivedContext;
    let receivedProps;
    const action = (ctx, props) => {
      receivedContext = ctx;
      receivedProps = props;
    };

    const Router = router([
      {
        predicate: () => true,
        action,
      },
    ]);

    const app = run(Router);
    const context = textContext('hi');
    const props = { a: 1 };
    await app(context, props);

    expect(receivedContext).toEqual(context);
    expect(receivedProps).toEqual({
      a: 1,
    });
  });
});

describe('#route', () => {
  it('should work with *', async () => {
    const Router = router([route('*', sendText('hello'))]);

    const app = run(Router);

    await expectConversation(app, 'hi', 'hello');
    await expectConversation(app, 'yo', 'hello');
  });

  it('should work with predicate', async () => {
    const Router = router([
      route(
        context => context.event.isText && context.event.text.startsWith('h'),
        sendText('hello')
      ),
    ]);

    const app = run(Router);

    await expectConversation(app, 'hi', 'hello');
    await expectPayloadConversation(app, 'hi', null);
  });
});

describe('#text', () => {
  it('should work with string', async () => {
    const Router = router([text('hi', sendText('hello'))]);

    const app = run(Router);

    await expectConversation(app, 'hi', 'hello');
    await expectConversation(app, 'yo', null);
    await expectPayloadConversation(app, 'hi', null);
  });

  it('should work with array of string', async () => {
    const Router = router([text(['hi', 'hello'], sendText('hello'))]);

    const app = run(Router);

    await expectConversation(app, 'hi', 'hello');
    await expectConversation(app, 'hello', 'hello');
    await expectConversation(app, 'yo', null);
    await expectPayloadConversation(app, 'hi', null);
  });

  it('should work with regexp', async () => {
    const Router = router([text(/(hi|hello)/, sendText('hello'))]);

    const app = run(Router);

    await expectConversation(app, 'hi', 'hello');
    await expectConversation(app, 'hello', 'hello');
    await expectConversation(app, 'yo', null);
    await expectPayloadConversation(app, 'hi', null);
  });

  it('should work with regexp match', async () => {
    let receivedContext;
    let receivedProps;
    const action = (ctx, props) => {
      receivedContext = ctx;
      receivedProps = props;
    };
    const Router = router([text(/number: (\d+)/, action)]);

    const app = run(Router);
    const context = textContext('number: 123');

    await app(context);

    const match: any = ['number: 123', '123'];
    match.index = 0;
    match.input = 'number: 123';
    match.groups = undefined;

    expect(receivedContext).toEqual(context);
    expect(receivedProps).toEqual({
      match,
      next: undefined,
    });
  });

  it('should work with *', async () => {
    const Router = router([text('*', sendText('hello'))]);

    const app = run(Router);

    await expectConversation(app, 'hi', 'hello');
    await expectConversation(app, 'hello', 'hello');
    await expectConversation(app, 'yo', 'hello');
    await expectPayloadConversation(app, 'hi', null);
  });
});

describe('#payload', () => {
  it('should work with string', async () => {
    const Router = router([payload('hi', sendText('hello'))]);

    const app = run(Router);

    await expectPayloadConversation(app, 'hi', 'hello');
    await expectPayloadConversation(app, 'hello', null);
    await expectPayloadConversation(app, 'yo', null);
    await expectConversation(app, 'hi', null);
  });

  it('should work with array of string', async () => {
    const Router = router([payload(['hi', 'hello'], sendText('hello'))]);

    const app = run(Router);

    await expectPayloadConversation(app, 'hi', 'hello');
    await expectPayloadConversation(app, 'hello', 'hello');
    await expectPayloadConversation(app, 'yo', null);
    await expectConversation(app, 'hi', null);
  });

  it('should work with regexp', async () => {
    const Router = router([payload(/(hi|hello)/, sendText('hello'))]);

    const app = run(Router);

    await expectPayloadConversation(app, 'hi', 'hello');
    await expectPayloadConversation(app, 'hello', 'hello');
    await expectPayloadConversation(app, 'yo', null);
    await expectConversation(app, 'hi', null);
  });

  it('should work with regexp match', async () => {
    let receivedContext;
    let receivedProps;
    const action = (ctx, props) => {
      receivedContext = ctx;
      receivedProps = props;
    };
    const Router = router([payload(/number: (\d+)/, action)]);

    const app = run(Router);
    const context = payloadContext('number: 123');

    await app(context);

    const match: any = ['number: 123', '123'];
    match.index = 0;
    match.input = 'number: 123';
    match.groups = undefined;

    expect(receivedContext).toEqual(context);
    expect(receivedProps).toEqual({
      match,
      next: undefined,
    });
  });

  it('should work with *', async () => {
    const Router = router([payload('*', sendText('hello'))]);

    const app = run(Router);

    await expectPayloadConversation(app, 'hi', 'hello');
    await expectPayloadConversation(app, 'hello', 'hello');
    await expectPayloadConversation(app, 'yo', 'hello');
    await expectConversation(app, 'hi', null);
  });
});

describe('#platform', () => {
  it('should work with string', async () => {
    const Router = router([platform('line', sendText('hello'))]);

    const app = run(Router);

    await expectPlatformConversation(app, 'line', 'hello');
    await expectPlatformConversation(app, 'telegram', null);
    await expectPlatformConversation(app, 'slack', null);
  });

  it('should work with array of string', async () => {
    const Router = router([platform(['line', 'telegram'], sendText('hello'))]);

    const app = run(Router);

    await expectPlatformConversation(app, 'line', 'hello');
    await expectPlatformConversation(app, 'telegram', 'hello');
    await expectPlatformConversation(app, 'slack', null);
  });

  it('should work with regexp', async () => {
    const Router = router([platform(/(line|telegram)/, sendText('hello'))]);

    const app = run(Router);

    await expectPlatformConversation(app, 'line', 'hello');
    await expectPlatformConversation(app, 'telegram', 'hello');
    await expectPlatformConversation(app, 'slack', null);
  });

  it('should work with *', async () => {
    const Router = router([platform('*', sendText('hello'))]);

    const app = run(Router);

    await expectPlatformConversation(app, 'line', 'hello');
    await expectPlatformConversation(app, 'telegram', 'hello');
    await expectPlatformConversation(app, 'slack', 'hello');
  });
});

it('#line should be exported', () => {
  expect(line).toBeDefined();
});
