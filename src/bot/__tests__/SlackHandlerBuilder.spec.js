import SlackHandlerBuilder from '../SlackHandlerBuilder';

const setup = () => {
  const builder = new SlackHandlerBuilder();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(SlackHandlerBuilder).toBeDefined();
    expect(builder).toBeInstanceOf(SlackHandlerBuilder);
  });
});

describe('#onMessage', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const predicate = () => true;
    const handler = () => {};
    expect(await builder.onMessage(predicate, handler)).toBe(builder);
  });

  it('should call predicate when received message', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
      },
    };
    builder.onMessage(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call predicate when received not message', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: false,
      },
    };
    builder.onMessage(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalledWith(context);
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => Promise.resolve(false));
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
      },
    };
    builder.onMessage(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onText', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onText('text', handler)).toBe(builder);
  });

  describe('should support catch all handler', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: true,
          isTextMessage: true,
          message: {
            type: 'message',
            channel: 'C2147483705',
            user: 'U2147483697',
            text: 'awesome',
            ts: '1355517523.000005',
          },
        },
      };
      builder.onText(handler);
      await builder.build()(context);
      expect(handler).toBeCalledWith(context);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: false,
          isTextMessage: false,
        },
      };
      builder.onText(handler);
      await builder.build()(context);
      expect(handler).not.toBeCalled();
    });
  });

  describe('should support string', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: true,
          isTextMessage: true,
          message: {
            type: 'message',
            channel: 'C2147483705',
            user: 'U2147483697',
            text: 'awesome',
            ts: '1355517523.000005',
          },
        },
      };
      builder.onText('awesome', handler);
      await builder.build()(context);
      expect(handler).toBeCalledWith(context);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: true,
          isTextMessage: true,
          message: {
            type: 'message',
            channel: 'C2147483705',
            user: 'U2147483697',
            text: 'awesome',
            ts: '1355517523.000005',
          },
        },
      };
      builder.onText('awful', handler);
      await builder.build()(context);
      expect(handler).not.toBeCalled();
    });
  });

  describe('should support regex', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: true,
          isTextMessage: true,
          message: {
            type: 'message',
            channel: 'C2147483705',
            user: 'U2147483697',
            text: 'awesome',
            ts: '1355517523.000005',
          },
        },
      };
      builder.onText(/awesome/, handler);
      await builder.build()(context);
      expect(handler).toBeCalledWith(context);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: true,
          isTextMessage: true,
          message: {
            type: 'message',
            channel: 'C2147483705',
            user: 'U2147483697',
            text: 'awesome',
            ts: '1355517523.000005',
          },
        },
      };
      builder.onText(/awful/, handler);
      await builder.build()(context);
      expect(handler).not.toBeCalled();
    });
  });
});
