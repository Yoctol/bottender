import HandlerBuilder from '../HandlerBuilder';
import CompositeHandlerBuilder from '../CompositeHandlerBuilder';

it('when will return this', () => {
  const compositebuilder = new CompositeHandlerBuilder();

  const builder = new HandlerBuilder();
  expect(compositebuilder.when(() => true, builder)).toBe(compositebuilder);
});

it('else will return this', () => {
  const compositebuilder = new CompositeHandlerBuilder();

  const builder = new HandlerBuilder();
  expect(compositebuilder.else(builder)).toBe(compositebuilder);
});

describe('#build', () => {
  it('should handle by handler which match the condition', () => {
    const compositebuilder = new CompositeHandlerBuilder();

    const handler1 = jest.fn();
    const builder1 = new HandlerBuilder();
    builder1.onUnhandled(handler1);

    const fallbackHandler = jest.fn();
    const fallbackBuilder = new HandlerBuilder();
    fallbackBuilder.onUnhandled(fallbackHandler);

    compositebuilder.when(() => true, builder1).else(fallbackBuilder);

    const context = {};
    const msg = {
      message: {
        text: 'hi!',
      },
    };

    compositebuilder.build()(context, msg);

    expect(handler1).toBeCalledWith(context, msg);
    expect(fallbackHandler).not.toBeCalled();
  });

  it('return promise when handled by async handler', async () => {
    const compositebuilder = new CompositeHandlerBuilder();

    const handler1 = jest.fn().mockReturnValue(Promise.resolve());
    const builder1 = new HandlerBuilder();
    builder1.onUnhandled(handler1);

    const fallbackHandler = jest.fn();
    const fallbackBuilder = new HandlerBuilder();
    fallbackBuilder.onUnhandled(fallbackHandler);

    compositebuilder.when(() => true, builder1).else(fallbackBuilder);

    const context = {};
    const msg = {
      message: {
        text: 'hi!',
      },
    };

    await compositebuilder.build()(context, msg);

    expect(handler1).toBeCalledWith(context, msg);
    expect(fallbackHandler).not.toBeCalled();
  });

  it('should handle by fallback handler when all condition failed', () => {
    const compositebuilder = new CompositeHandlerBuilder();

    const handler1 = jest.fn();
    const builder1 = new HandlerBuilder();
    builder1.onUnhandled(handler1);

    const handler2 = jest.fn();
    const builder2 = new HandlerBuilder();
    builder2.onUnhandled(handler2);

    const fallbackHandler = jest.fn();
    const fallbackBuilder = new HandlerBuilder();
    fallbackBuilder.onUnhandled(fallbackHandler);

    compositebuilder
      .when(() => false, builder1)
      .when(() => 1 > 2, builder2)
      .else(fallbackBuilder);

    const context = {};
    const msg = {
      message: {
        text: 'hi!',
      },
    };

    compositebuilder.build()(context, msg);

    expect(handler1).not.toBeCalled();
    expect(handler2).not.toBeCalled();
    expect(fallbackHandler).toBeCalledWith(context, msg);
  });

  it('return promise when handled by async fallback handler', async () => {
    const compositebuilder = new CompositeHandlerBuilder();

    const handler1 = jest.fn();
    const builder1 = new HandlerBuilder();
    builder1.onUnhandled(handler1);

    const handler2 = jest.fn();
    const builder2 = new HandlerBuilder();
    builder2.onUnhandled(handler2);

    const fallbackHandler = jest.fn().mockReturnValue(Promise.resolve());
    const fallbackBuilder = new HandlerBuilder();
    fallbackBuilder.onUnhandled(fallbackHandler);

    compositebuilder
      .when(() => false, builder1)
      .when(() => 1 > 2, builder2)
      .else(fallbackBuilder);

    const context = {};
    const msg = {
      message: {
        text: 'hi!',
      },
    };

    await compositebuilder.build()(context, msg);

    expect(handler1).not.toBeCalled();
    expect(handler2).not.toBeCalled();
    expect(fallbackHandler).toBeCalledWith(context, msg);
  });
});
