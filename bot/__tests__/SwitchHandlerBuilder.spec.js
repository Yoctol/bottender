import BasicHandlerBuilder from '../BasicHandlerBuilder';
import SwitchHandlerBuilder from '../SwitchHandlerBuilder';

it('when will return this', () => {
  const switchBuilder = new SwitchHandlerBuilder();

  const builder = new BasicHandlerBuilder();
  expect(switchBuilder.when(() => true, builder)).toBe(switchBuilder);
});

it('else will return this', () => {
  const switchBuilder = new SwitchHandlerBuilder();

  const builder = new BasicHandlerBuilder();
  expect(switchBuilder.else(builder)).toBe(switchBuilder);
});

describe('#build', () => {
  it('should handle by handler which match the condition', async () => {
    const switchBuilder = new SwitchHandlerBuilder();

    const handler1 = jest.fn();
    const builder1 = new BasicHandlerBuilder();
    builder1.onUnhandled(handler1);

    const fallbackHandler = jest.fn();
    const fallbackBuilder = new BasicHandlerBuilder();
    fallbackBuilder.onUnhandled(fallbackHandler);

    switchBuilder.when(() => true, builder1).else(fallbackBuilder);

    const event = {
      message: {
        text: 'hi!',
      },
    };
    const context = { event };

    await switchBuilder.build()(context);

    expect(handler1).toBeCalledWith(context);
    expect(fallbackHandler).not.toBeCalled();
  });

  it('return promise when handled by async handler', async () => {
    const switchBuilder = new SwitchHandlerBuilder();

    const handler1 = jest.fn().mockReturnValue(Promise.resolve());
    const builder1 = new BasicHandlerBuilder();
    builder1.onUnhandled(handler1);

    const fallbackHandler = jest.fn();
    const fallbackBuilder = new BasicHandlerBuilder();
    fallbackBuilder.onUnhandled(fallbackHandler);

    switchBuilder.when(() => true, builder1).else(fallbackBuilder);

    const event = {
      message: {
        text: 'hi!',
      },
    };
    const context = { event };

    await switchBuilder.build()(context);

    expect(handler1).toBeCalledWith(context);
    expect(fallbackHandler).not.toBeCalled();
  });

  it('should handle by fallback handler when all condition failed', async () => {
    const switchBuilder = new SwitchHandlerBuilder();

    const handler1 = jest.fn();
    const builder1 = new BasicHandlerBuilder();
    builder1.onUnhandled(handler1);

    const handler2 = jest.fn();
    const builder2 = new BasicHandlerBuilder();
    builder2.onUnhandled(handler2);

    const fallbackHandler = jest.fn();
    const fallbackBuilder = new BasicHandlerBuilder();
    fallbackBuilder.onUnhandled(fallbackHandler);

    switchBuilder
      .when(() => false, builder1)
      .when(() => 1 > 2, builder2)
      .else(fallbackBuilder);

    const event = {
      message: {
        text: 'hi!',
      },
    };
    const context = { event };

    await switchBuilder.build()(context);

    expect(handler1).not.toBeCalled();
    expect(handler2).not.toBeCalled();
    expect(fallbackHandler).toBeCalledWith(context);
  });

  it('return promise when handled by async fallback handler', async () => {
    const switchBuilder = new SwitchHandlerBuilder();

    const handler1 = jest.fn();
    const builder1 = new BasicHandlerBuilder();
    builder1.onUnhandled(handler1);

    const handler2 = jest.fn();
    const builder2 = new BasicHandlerBuilder();
    builder2.onUnhandled(handler2);

    const fallbackHandler = jest.fn().mockReturnValue(Promise.resolve());
    const fallbackBuilder = new BasicHandlerBuilder();
    fallbackBuilder.onUnhandled(fallbackHandler);

    switchBuilder
      .when(() => false, builder1)
      .when(() => 1 > 2, builder2)
      .else(fallbackBuilder);

    const event = {
      message: {
        text: 'hi!',
      },
    };
    const context = { event };

    await switchBuilder.build()(context);

    expect(handler1).not.toBeCalled();
    expect(handler2).not.toBeCalled();
    expect(fallbackHandler).toBeCalledWith(context);
  });
});
