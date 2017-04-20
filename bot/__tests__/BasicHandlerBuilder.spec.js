import BasicHandlerBuilder from '../BasicHandlerBuilder';

const setup = () => {
  const builder = new BasicHandlerBuilder();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(BasicHandlerBuilder).toBeDefined();
    expect(builder).toBeInstanceOf(BasicHandlerBuilder);
  });
});

describe('#on', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const condition = () => true;
    const handler = () => {};
    expect(await builder.on(condition, handler)).toBe(builder);
  });

  it('should receive context pass from builder in condition and handler function', async () => {
    const { builder } = setup();
    const context = {};
    const condition = jest.fn(() => true);
    const handler = jest.fn();
    builder.on(condition, handler);
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler if condition function return true', async () => {
    const { builder } = setup();
    const context = {};
    const condition = jest.fn(() => true);
    const handler = jest.fn();
    builder.on(condition, handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler if condition function return false', async () => {
    const { builder } = setup();
    const context = {};
    const condition = jest.fn(() => false);
    const handler = jest.fn();
    builder.on(condition, handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });

  it('should not call second condition if already found a match condition', async () => {
    const { builder } = setup();
    const context = {};
    const condition1 = jest.fn(() => true);
    const condition2 = jest.fn(() => true);
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    builder.on(condition1, handler1).on(condition2, handler2);
    await builder.build()(context);
    expect(handler1).toBeCalledWith(context);
    expect(condition2).not.toBeCalled();
    expect(handler2).not.toBeCalled();
  });

  it('should support async condition and handler function', async () => {
    const { builder } = setup();
    const context = {};
    const condition = jest.fn(() => Promise.resolve(true));
    const handler = jest.fn(() => Promise.resolve());
    builder.on(condition, handler);
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should support string as handler', async () => {
    const { builder } = setup();
    const context = {
      sendText: jest.fn(),
    };
    const condition = jest.fn(() => Promise.resolve(true));
    builder.on(condition, '處理到');
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(context.sendText).toBeCalledWith('處理到');
  });

  it('should support array as handler', async () => {
    const { builder } = setup();
    const context = {
      sendText: jest.fn(),
    };
    const condition = jest.fn(() => Promise.resolve(true));
    builder.on(condition, ['處理到', '完成']);
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(context.sendText).toBeCalledWith(expect.stringMatching(/處理到|完成/));
  });
});

describe('#onUnhandled', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onUnhandled(handler)).toBe(builder);
  });

  it('should call fallback handler if can not find a match condition', async () => {
    const { builder } = setup();
    const context = {};
    const condition = jest.fn(() => false);
    const handler = jest.fn();
    const fallbackHandler = jest.fn();
    builder.on(condition, handler).onUnhandled(fallbackHandler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
    expect(fallbackHandler).toBeCalledWith(context);
  });

  it('should support async handler', async () => {
    const { builder } = setup();
    const context = {};
    const fallbackHandler = jest.fn(() => Promise.resolve());
    builder.onUnhandled(fallbackHandler);
    await builder.build()(context);
    expect(fallbackHandler).toBeCalledWith(context);
  });

  it('should support string as handler', async () => {
    const { builder } = setup();
    const context = {
      sendText: jest.fn(),
    };
    builder.onUnhandled('沒處理到');
    await builder.build()(context);
    expect(context.sendText).toBeCalledWith('沒處理到');
  });

  it('should support array as handler', async () => {
    const { builder } = setup();
    const context = {
      sendText: jest.fn(),
    };
    builder.onUnhandled(['沒處理到', '漏掉了']);
    await builder.build()(context);
    expect(context.sendText).toBeCalledWith(expect.stringMatching(/沒處理到|漏掉了/));
  });
});

describe('#build', () => {
  it('should return a function', () => {
    const { builder } = setup();
    expect(builder.build()).toBeInstanceOf(Function);
  });
});
