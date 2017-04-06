import HandlerBuilder from '../HandlerBuilder';
import SwitchHandlerBuilder from '../SwitchHandlerBuilder';

it('when will return this', () => {
  const switchBuilder = new SwitchHandlerBuilder();

  const builder = new HandlerBuilder();
  expect(switchBuilder.when(() => true, builder)).toBe(switchBuilder);
});

it('else will return this', () => {
  const switchBuilder = new SwitchHandlerBuilder();

  const builder = new HandlerBuilder();
  expect(switchBuilder.else(builder)).toBe(switchBuilder);
});

describe('#build', () => {
  it('should handle by handler which match the condition', () => {
    const switchBuilder = new SwitchHandlerBuilder();

    const handler1 = jest.fn();
    const builder1 = new HandlerBuilder();
    builder1.onUnhandled(handler1);

    const fallbackHandler = jest.fn();
    const fallbackBuilder = new HandlerBuilder();
    fallbackBuilder.onUnhandled(fallbackHandler);

    switchBuilder.when(() => true, builder1).else(fallbackBuilder);

    const context = {};
    const msg = {
      message: {
        text: 'hi!',
      },
    };

    switchBuilder.build()(context, msg);

    expect(handler1).toBeCalledWith(context, msg);
    expect(fallbackHandler).not.toBeCalled();
  });

  it('return promise when handled by async handler', async () => {
    const switchBuilder = new SwitchHandlerBuilder();

    const handler1 = jest.fn().mockReturnValue(Promise.resolve());
    const builder1 = new HandlerBuilder();
    builder1.onUnhandled(handler1);

    const fallbackHandler = jest.fn();
    const fallbackBuilder = new HandlerBuilder();
    fallbackBuilder.onUnhandled(fallbackHandler);

    switchBuilder.when(() => true, builder1).else(fallbackBuilder);

    const context = {};
    const msg = {
      message: {
        text: 'hi!',
      },
    };

    await switchBuilder.build()(context, msg);

    expect(handler1).toBeCalledWith(context, msg);
    expect(fallbackHandler).not.toBeCalled();
  });

  it('should handle by fallback handler when all condition failed', () => {
    const switchBuilder = new SwitchHandlerBuilder();

    const handler1 = jest.fn();
    const builder1 = new HandlerBuilder();
    builder1.onUnhandled(handler1);

    const handler2 = jest.fn();
    const builder2 = new HandlerBuilder();
    builder2.onUnhandled(handler2);

    const fallbackHandler = jest.fn();
    const fallbackBuilder = new HandlerBuilder();
    fallbackBuilder.onUnhandled(fallbackHandler);

    switchBuilder
      .when(() => false, builder1)
      .when(() => 1 > 2, builder2)
      .else(fallbackBuilder);

    const context = {};
    const msg = {
      message: {
        text: 'hi!',
      },
    };

    switchBuilder.build()(context, msg);

    expect(handler1).not.toBeCalled();
    expect(handler2).not.toBeCalled();
    expect(fallbackHandler).toBeCalledWith(context, msg);
  });

  it('return promise when handled by async fallback handler', async () => {
    const switchBuilder = new SwitchHandlerBuilder();

    const handler1 = jest.fn();
    const builder1 = new HandlerBuilder();
    builder1.onUnhandled(handler1);

    const handler2 = jest.fn();
    const builder2 = new HandlerBuilder();
    builder2.onUnhandled(handler2);

    const fallbackHandler = jest.fn().mockReturnValue(Promise.resolve());
    const fallbackBuilder = new HandlerBuilder();
    fallbackBuilder.onUnhandled(fallbackHandler);

    switchBuilder
      .when(() => false, builder1)
      .when(() => 1 > 2, builder2)
      .else(fallbackBuilder);

    const context = {};
    const msg = {
      message: {
        text: 'hi!',
      },
    };

    await switchBuilder.build()(context, msg);

    expect(handler1).not.toBeCalled();
    expect(handler2).not.toBeCalled();
    expect(fallbackHandler).toBeCalledWith(context, msg);
  });
});
