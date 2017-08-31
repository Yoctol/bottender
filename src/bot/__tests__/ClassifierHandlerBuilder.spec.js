import ClassifierHandlerBuilder from '../ClassifierHandlerBuilder';

const setup = () => {
  const classifier = {
    predict: jest.fn(),
  };
  const builder = new ClassifierHandlerBuilder(classifier, 0.3);
  return {
    builder,
    classifier,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(ClassifierHandlerBuilder).toBeDefined();
    expect(builder).toBeInstanceOf(ClassifierHandlerBuilder);
  });
});

describe('#onIntent', () => {
  it('should return this', () => {
    const { builder } = setup();
    const handler = () => {};
    expect(builder.onIntent('intent_1', handler)).toBe(builder);
  });

  it('handler should be called with context when intent match', async () => {
    const { builder, classifier } = setup();
    const result = {
      intents: [
        { name: 'intent_1', score: 0.5 },
        { name: 'intent_2', score: 0.25 },
        { name: 'intent_3', score: 0.25 },
      ],
    };
    classifier.predict.mockReturnValue(Promise.resolve(result));
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    builder.onIntent('intent_1', handler1).onIntent('intent_2', handler2);
    const context = {
      event: {
        isTextMessage: true,
        message: {
          text: 'Hello World',
        },
      },
    };
    await builder.build()(context);
    expect(handler1).toBeCalledWith(context, result);
    expect(handler2).not.toBeCalled();
  });

  it('should not throw when matched intent handler undefiend', async () => {
    const { builder, classifier } = setup();
    const result = {
      intents: [
        { name: 'intent_1', score: 0.5 },
        { name: 'intent_2', score: 0.25 },
        { name: 'intent_3', score: 0.25 },
      ],
    };
    classifier.predict.mockReturnValue(Promise.resolve(result));
    const handler2 = jest.fn();
    builder.onIntent('intent_2', handler2);
    const context = {
      event: {
        isTextMessage: true,
        message: {
          text: 'Hello World',
        },
      },
    };
    let error;
    try {
      await builder.build()(context);
    } catch (err) {
      error = err;
    }
    expect(error).toBeUndefined();
  });
});

describe('#onUnmatched', () => {
  it('should return this', () => {
    const { builder } = setup();
    const handler = () => {};
    expect(builder.onUnmatched(handler)).toBe(builder);
  });

  it('handler should be called with context when under threshold', async () => {
    const { builder, classifier } = setup();
    const result = {
      intents: [
        { name: 'intent_1', score: 0.25 },
        { name: 'intent_2', score: 0.25 },
        { name: 'intent_3', score: 0.25 },
        { name: 'intent_4', score: 0.25 },
      ],
    };
    classifier.predict.mockReturnValue(Promise.resolve(result));
    const handler = jest.fn();
    builder.onUnmatched(handler);
    const context = {
      event: {
        isTextMessage: true,
        message: {
          text: 'Hello World',
        },
      },
    };
    await builder.build()(context);
    expect(handler).toBeCalledWith(context, result);
  });

  it('should not throw when no unmatched handler', async () => {
    const { builder, classifier } = setup();
    const result = {
      intents: [
        { name: 'intent_1', score: 0.25 },
        { name: 'intent_2', score: 0.25 },
        { name: 'intent_3', score: 0.25 },
        { name: 'intent_4', score: 0.25 },
      ],
    };
    classifier.predict.mockReturnValue(Promise.resolve(result));
    const context = {
      event: {
        isTextMessage: true,
        message: {
          text: 'Hello World',
        },
      },
    };
    let error;
    try {
      await builder.build()(context);
    } catch (err) {
      error = err;
    }
    expect(error).toBeUndefined();
  });
});

describe('#build', () => {
  it('should return a function', () => {
    const { builder } = setup();
    expect(builder.build()).toBeInstanceOf(Function);
  });
});
