import TelegramHandlerBuilder from '../TelegramHandlerBuilder';

const setup = () => {
  const builder = new TelegramHandlerBuilder();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(TelegramHandlerBuilder).toBeDefined();
    expect(builder).toBeInstanceOf(TelegramHandlerBuilder);
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
  const context = {
    event: {
      isMessage: true,
      isTextMessage: true,
      message: {
        text: 'awesome',
      },
    },
  };

  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onText('text', handler)).toBe(builder);
  });

  describe('should support string', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onText('awesome', handler);
      await builder.build()(context);
      expect(handler).toBeCalledWith(context);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onText('awful', handler);
      await builder.build()(context);
      expect(handler).not.toBeCalled();
    });
  });

  describe('should support regex', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      builder.onText(/awesome/, handler);
      await builder.build()(context);
      expect(handler).toBeCalledWith(context);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onText(/awful/, handler);
      await builder.build()(context);
      expect(handler).not.toBeCalled();
    });
  });
});
