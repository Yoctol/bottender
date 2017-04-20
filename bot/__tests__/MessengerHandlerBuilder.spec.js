import * as constants from '../../constants';
import MessengerHandlerBuilder from '../MessengerHandlerBuilder';

const setup = () => {
  const builder = new MessengerHandlerBuilder();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(MessengerHandlerBuilder).toBeDefined();
    expect(builder).toBeInstanceOf(MessengerHandlerBuilder);
  });
});

describe('#onMessage', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const condition = () => true;
    const handler = () => {};
    expect(await builder.onMessage(condition, handler)).toBe(builder);
  });

  it('should call condition when received message', async () => {
    const { builder } = setup();
    const condition = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
      },
    };
    builder.onMessage(condition, handler);
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call condition when received not message', async () => {
    const { builder } = setup();
    const condition = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: false,
      },
    };
    builder.onMessage(condition, handler);
    await builder.build()(context);
    expect(condition).not.toBeCalledWith(context);
  });
});

describe('#onText', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onText('text', handler)).toBe(builder);
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
            text: 'awesome',
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
            text: 'awesome',
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
            text: 'awesome',
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
            text: 'awesome',
          },
        },
      };
      builder.onText(/awful/, handler);
      await builder.build()(context);
      expect(handler).not.toBeCalled();
    });
  });
});

describe('#onPostback', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const condition = () => true;
    const handler = () => {};
    expect(await builder.onPostback(condition, handler)).toBe(builder);
  });

  it('should call condition when received postback', async () => {
    const { builder } = setup();
    const condition = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
      },
    };
    builder.onPostback(condition, handler);
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call condition when received not postback', async () => {
    const { builder } = setup();
    const condition = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: false,
      },
    };
    builder.onPostback(condition, handler);
    await builder.build()(context);
    expect(condition).not.toBeCalledWith(context);
  });
});

describe('#onPayload', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onPayload('payload', handler)).toBe(builder);
  });

  it('should call condition when received postback', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
        postback: {
          payload: 'cool',
        },
      },
    };
    builder.onPayload('cool', handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received quick reply message', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isQuickReply: true,
        message: {
          quick_reply: {
            payload: 'so quick!',
          },
          text: 'wow',
        },
      },
    };
    builder.onPayload('so quick!', handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received no payload message', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isQuickReply: false,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onPayload('wow', handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });

  it('should support regex', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
        postback: {
          payload: 'cool',
        },
      },
    };
    builder.onPayload(/COOL/i, handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });
});

describe('#onGetStarted', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onGetStarted(handler)).toBe(builder);
  });

  it('should call handler when received GET_STARTED payload', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
        postback: {
          payload: constants.payload.GET_STARTED,
        },
      },
    };
    builder.onGetStarted(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received other payload', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
        postback: {
          payload: 'finished',
        },
      },
    };
    builder.onGetStarted(handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onQuickReply', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const condition = () => true;
    const handler = () => {};
    expect(await builder.onQuickReply(condition, handler)).toBe(builder);
  });

  it('should call handler when received quick reply message', async () => {
    const { builder } = setup();
    const condition = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isQuickReply: true,
        message: {
          quick_reply: {
            payload: 'so quick!',
          },
          text: 'wow',
        },
      },
    };
    builder.onQuickReply(condition, handler);
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not quick reply message', async () => {
    const { builder } = setup();
    const condition = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isQuickReply: false,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onQuickReply(condition, handler);
    await builder.build()(context);
    expect(condition).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });
});

describe('#onEcho', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const condition = () => true;
    const handler = () => {};
    expect(await builder.onEcho(condition, handler)).toBe(builder);
  });

  it('should call handler when received echo message', async () => {
    const { builder } = setup();
    const condition = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isEcho: true,
        message: {
          is_echo: true,
          text: 'wow',
        },
      },
    };
    builder.onEcho(condition, handler);
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not echo message', async () => {
    const { builder } = setup();
    const condition = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isEcho: false,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onEcho(condition, handler);
    await builder.build()(context);
    expect(condition).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });
});
