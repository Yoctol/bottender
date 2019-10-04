import router, { payload, route, text } from '..';

const contextWithTextHi = {
  event: {
    isText: true,
    isPayload: false,
    text: 'hi',
  },
};

const contextWithTextHello = {
  event: {
    isText: true,
    isPayload: false,
    text: 'hello',
  },
};

const contextWithTextHey = {
  event: {
    isText: true,
    isPayload: false,
    text: 'hey',
  },
};

const contextWithPayloadHi = {
  event: {
    isText: false,
    isPayload: true,
    payload: 'hi',
  },
};

const contextWithPayloadHello = {
  event: {
    isText: false,
    isPayload: true,
    payload: 'hello',
  },
};

const contextWithPayloadHey = {
  event: {
    isText: false,
    isPayload: true,
    payload: 'hey',
  },
};

describe('#router', () => {
  it('should work with raw route format', async () => {
    const Hi = () => {};

    const Router = router([
      {
        predicate: () => true,
        action: Hi,
      },
    ]);

    expect(await Router(contextWithTextHi as any)).toEqual(Hi);
  });

  it('should return next if not match any route', async () => {
    const Hi = () => {};
    const Next = () => {};

    const Router = router([
      {
        predicate: () => false,
        action: Hi,
      },
    ]);

    expect(await Router(contextWithTextHi as any, { next: Next })).toEqual(
      Next
    );
  });
});

describe('#route', () => {
  it('should work with *', async () => {
    const Hi = () => {};

    const Router = router([route('*', Hi)]);

    expect(await Router(contextWithTextHi as any)).toEqual(Hi);
    expect(await Router(contextWithPayloadHi as any)).toEqual(Hi);
  });

  it('should work with predicate', async () => {
    const Hi = () => {};

    const Router = router([
      route(
        context => context.event.isText && context.event.text.startsWith('h'),
        Hi
      ),
    ]);

    expect(await Router(contextWithTextHi as any)).toEqual(Hi);
    expect(await Router(contextWithPayloadHi as any)).toBeUndefined();
  });
});

describe('#text', () => {
  it('should work with string', async () => {
    const Hi = () => {};

    const Router = router([text('hi', Hi)]);

    expect(await Router(contextWithTextHi as any)).toEqual(Hi);

    expect(await Router(contextWithTextHello as any)).toBeUndefined();
  });

  it('should work with array of string', async () => {
    const Hi = () => {};

    const Router = router([text(['hi', 'hello'], Hi)]);

    expect(await Router(contextWithTextHi as any)).toEqual(Hi);
    expect(await Router(contextWithTextHello as any)).toEqual(Hi);

    expect(await Router(contextWithTextHey as any)).toBeUndefined();
  });

  it('should work with regexp', async () => {
    const Hi = () => {};

    const Router = router([text(/(hi|hello)/, Hi)]);

    expect(await Router(contextWithTextHi as any)).toEqual(Hi);
    expect(await Router(contextWithTextHello as any)).toEqual(Hi);

    expect(await Router(contextWithTextHey as any)).toBeUndefined();
  });

  it('should work with *', async () => {
    const Hi = () => {};

    const Router = router([text('*', Hi)]);

    expect(await Router(contextWithTextHi as any)).toEqual(Hi);
    expect(await Router(contextWithTextHello as any)).toEqual(Hi);
    expect(await Router(contextWithTextHey as any)).toEqual(Hi);
  });
});

describe('#payload', () => {
  it('should work with string', async () => {
    const Hi = () => {};

    const Router = router([payload('hi', Hi)]);

    expect(await Router(contextWithPayloadHi as any)).toEqual(Hi);

    expect(await Router(contextWithPayloadHello as any)).toBeUndefined();
  });

  it('should work with array of string', async () => {
    const Hi = () => {};

    const Router = router([payload(['hi', 'hello'], Hi)]);

    expect(await Router(contextWithPayloadHi as any)).toEqual(Hi);
    expect(await Router(contextWithPayloadHello as any)).toEqual(Hi);

    expect(await Router(contextWithPayloadHey as any)).toBeUndefined();
  });

  it('should work with regexp', async () => {
    const Hi = () => {};

    const Router = router([payload(/(hi|hello)/, Hi)]);

    expect(await Router(contextWithPayloadHi as any)).toEqual(Hi);
    expect(await Router(contextWithPayloadHello as any)).toEqual(Hi);

    expect(await Router(contextWithPayloadHey as any)).toBeUndefined();
  });

  it('should work with *', async () => {
    const Hi = () => {};

    const Router = router([payload('*', Hi)]);

    expect(await Router(contextWithPayloadHi as any)).toEqual(Hi);
    expect(await Router(contextWithPayloadHello as any)).toEqual(Hi);
    expect(await Router(contextWithPayloadHey as any)).toEqual(Hi);
  });
});
