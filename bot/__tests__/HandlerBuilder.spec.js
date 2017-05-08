import HandlerBuilder from '../HandlerBuilder';

const setup = ({ message, postback } = {}) => {
  const builder = new HandlerBuilder();
  const condition = '__ALOHA.AI__';
  const context = {
    event: {
      message,
      postback,
    },
  };
  const handler = jest.fn();
  return {
    builder,
    condition,
    handler,
    context,
  };
};

it('be defined', () => {
  const { builder } = setup();
  expect(HandlerBuilder).toBeDefined();
  expect(builder).toBeInstanceOf(HandlerBuilder);
});

it('onMessage will return this', () => {
  const { builder, condition, handler } = setup();
  const sameBuilder = builder.onMessage(condition, handler);
  expect(sameBuilder).toBe(builder);
});

it('onGetStarted will return this', () => {
  const { builder, handler } = setup();
  const sameBuilder = builder.onGetStarted(handler);
  expect(sameBuilder).toBe(builder);
});

it('onPostback will return this', () => {
  const { builder, condition, handler } = setup();
  const sameBuilder = builder.onPostback(condition, handler);
  expect(sameBuilder).toBe(builder);
});

it('onQuickReply will return this', () => {
  const { builder, condition, handler } = setup();
  const sameBuilder = builder.onQuickReply(condition, handler);
  expect(sameBuilder).toBe(builder);
});

it('onUnhandled will return this', () => {
  const { builder, handler } = setup();
  const sameBuilder = builder.onUnhandled(handler);
  expect(sameBuilder).toBe(builder);
});

describe('#build', () => {
  describe('#quick_reply', () => {
    it('quickReplyHandler will call when msg has message.quick_reply.payload', () => {
      const { builder, context, handler } = setup({
        message: {
          quick_reply: {
            payload: 'cph',
          },
        },
      });
      builder.onQuickReply('cph', handler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(handler).toBeCalledWith(context);
    });

    it('no match message.quick_reply.payload', () => {
      const { builder, context, handler } = setup({
        message: {
          quick_reply: {
            payload: 'cph',
          },
        },
      });
      const unhandledHandler = jest.fn();
      builder.onUnhandled(unhandledHandler);
      builder.onQuickReply('cph2', handler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(unhandledHandler).toBeCalledWith(context);
    });

    it('no match message.quick_reply.payload && no unhandledHandler', () => {
      const { builder, context, handler } = setup({
        message: {
          quick_reply: {
            payload: 'cph',
          },
        },
      });
      builder.onQuickReply('cph2', handler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(handler).not.toBeCalled();
    });

    it('unhandledHandler will call when not match message.quick_reply.payload', () => {
      const { builder, context } = setup({
        message: {
          quick_reply: {
            payload: 'cph',
          },
        },
      });
      const unhandledHandler = jest.fn();
      builder.onUnhandled(unhandledHandler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(unhandledHandler).toBeCalledWith(context);
    });
  });

  describe('#message', () => {
    it('messageHandler will call when msg has message.text', () => {
      const { builder, context, handler } = setup({
        message: {
          text: 'aloha',
        },
      });
      builder.onMessage('aloha', handler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(handler).toBeCalledWith(context);
    });

    it('async messageHandler will call when msg has message.text', async () => {
      const { builder, context, handler } = setup({
        message: {
          text: 'aloha',
        },
      });
      builder.onMessage('aloha', handler);
      const resultHandler = builder.build();
      await resultHandler(context);
      expect(handler).toBeCalledWith(context);
    });

    it('no match message.text', () => {
      const { builder, context, handler } = setup({
        message: {
          text: 'aloha',
        },
      });
      const unhandledHandler = jest.fn();
      builder.onUnhandled(unhandledHandler);
      builder.onMessage('alohayo', handler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(handler).not.toBeCalled();
      expect(unhandledHandler).toBeCalledWith(context);
    });

    it('call handler when condition function return true', () => {
      const { builder, context, handler } = setup({
        message: {
          text: 'aloha',
        },
      });
      const unhandledHandler = jest.fn();
      builder.onUnhandled(unhandledHandler);
      builder.onMessage(() => true, handler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(handler).toBeCalled();
      expect(unhandledHandler).not.toBeCalledWith(context);
    });

    it('not to call handler when condition function return false', () => {
      const { builder, context, handler } = setup({
        message: {
          text: 'aloha',
        },
      });
      const unhandledHandler = jest.fn();
      builder.onUnhandled(unhandledHandler);
      builder.onMessage(() => false, handler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(handler).not.toBeCalled();
      expect(unhandledHandler).toBeCalledWith(context);
    });

    it('no match message.text && no onUnhandled', () => {
      const { builder, context, handler } = setup({
        message: {
          text: 'aloha',
        },
      });
      builder.onMessage('alohayo', handler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(handler).not.toBeCalled();
    });

    it('unhandledHandler will call when no onMessage handler', () => {
      const { builder, context } = setup({
        message: {
          text: 'aloha',
        },
      });
      const unhandledHandler = jest.fn();
      builder.onUnhandled(unhandledHandler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(unhandledHandler).toBeCalledWith(context);
    });
  });

  describe('#postback', () => {
    it('getStartedHandler will call when msg has getStarted postback payload', () => {
      const { builder, context, handler } = setup({
        postback: {
          payload: '__ALOHA.AI_GET_STARTED__',
        },
      });
      builder.onGetStarted(handler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(handler).toBeCalledWith(context);
    });

    it('postbackHandler will call when msg has normal postback payload', () => {
      const { builder, context, handler } = setup({
        postback: {
          payload: '__ALOHA.AI_SOMETHING_ELSE__',
        },
      });
      builder.onPostback('__ALOHA.AI_SOMETHING_ELSE__', handler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(handler).toBeCalledWith(context);
    });

    it('async postbackHandler will call when msg has normal postback payload', async () => {
      const { builder, context, handler } = setup({
        postback: {
          payload: '__ALOHA.AI_SOMETHING_ELSE__',
        },
      });
      builder.onPostback('__ALOHA.AI_SOMETHING_ELSE__', handler);
      const resultHandler = builder.build();
      await resultHandler(context);
      expect(handler).toBeCalledWith(context);
    });

    it('no unhandledHandler when payload not match', () => {
      const { builder, context, handler } = setup({
        postback: {
          payload: '__ALOHA.AI_SOMETHING_ELSE__',
        },
      });
      builder.onPostback('__ALOHA.AI_SOMETHING_DIFFERENT__', handler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(handler).not.toBeCalled();
    });

    it('unhandledHandler will call when not match postback payload', () => {
      const { builder, context } = setup({
        postback: {
          payload: '__ALOHA.AI_SOMETHING_YOU_DONT_KNOW__',
        },
      });
      const unhandledHandler = jest.fn();
      builder.onUnhandled(unhandledHandler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(unhandledHandler).toBeCalledWith(context);
    });

    it('something not handle by any condition', () => {
      const { builder, context, handler } = setup({ bostpack: {} });
      builder.onPostback('__ALOHA.AI_SOMETHING_ELSE__', handler);
      const resultHandler = builder.build();
      resultHandler(context);
      expect(handler).not.toBeCalled();
    });
  });
});

describe('#matchCondition', () => {
  it('matchCondition with regexp', () => {
    const { builder, context, handler } = setup({
      postback: {
        payload: '讚讚讚',
      },
    });
    builder.onPostback(/讚/, handler);
    const resultHandler = builder.build();
    resultHandler(context);
    expect(handler).toBeCalledWith(context);
  });

  it('matchCondition return false', () => {
    const { builder, context, handler } = setup({
      postback: {
        payload: '讚讚讚',
      },
    });
    const unhandledHandler = jest.fn();
    builder.onUnhandled(unhandledHandler);
    const falsyCondition = jest.fn();
    builder.onPostback(falsyCondition, handler);
    const resultHandler = builder.build();
    resultHandler(context);
    expect(unhandledHandler).toBeCalledWith(context);
  });
});
