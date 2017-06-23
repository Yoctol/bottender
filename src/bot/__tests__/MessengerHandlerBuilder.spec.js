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
    const predicate = () => true;
    const handler = () => {};
    expect(await builder.onPostback(predicate, handler)).toBe(builder);
  });

  it('should call predicate when received postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
      },
    };
    builder.onPostback(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call predicate when received not postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: false,
      },
    };
    builder.onPostback(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalledWith(context);
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => Promise.resolve(false));
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
      },
    };
    builder.onPostback(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onPayload', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onPayload('payload', handler)).toBe(builder);
  });

  it('should call predicate when received postback', async () => {
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
    const predicate = () => true;
    const handler = () => {};
    expect(await builder.onQuickReply(predicate, handler)).toBe(builder);
  });

  it('should call handler when received quick reply message', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
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
    builder.onQuickReply(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not quick reply message', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
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
    builder.onQuickReply(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => Promise.resolve(false));
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
    builder.onQuickReply(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onEcho', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const predicate = () => true;
    const handler = () => {};
    expect(await builder.onEcho(predicate, handler)).toBe(builder);
  });

  it('should call handler when received echo message', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
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
    builder.onEcho(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not echo message', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
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
    builder.onEcho(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => Promise.resolve(false));
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
    builder.onEcho(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onEchoText', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onEchoText('some text', handler)).toBe(builder);
  });

  it('should call handler when received echo message', async () => {
    const { builder } = setup();
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
    builder.onEchoText(/wow/, handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not echo message', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onEcho(/wow/, handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onRead', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onRead(predicate, handler)).toBe(builder);
  });

  it('should call handler when received read event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isRead: true,
        read: {
          watermark: 1458668856253,
          seq: 38,
        },
      },
    };
    builder.onRead(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not read event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isRead: false,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onRead(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => Promise.resolve(false));
    const context = {
      event: {
        isRead: true,
        read: {
          watermark: 1458668856253,
          seq: 38,
        },
      },
    };
    builder.onRead(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onDelivery', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onDelivery(predicate, handler)).toBe(builder);
  });

  it('should call handler when received delivery event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isDelivery: true,
        delivery: {
          mids: ['mid.1458668856218:ed81099e15d3f4f233'],
          watermark: 1458668856253,
          seq: 37,
        },
      },
    };
    builder.onDelivery(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not delivery event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isDelivery: false,
        delivery: {
          mids: ['mid.1458668856218:ed81099e15d3f4f233'],
          watermark: 1458668856253,
          seq: 37,
        },
      },
    };
    builder.onDelivery(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => Promise.resolve(false));
    const context = {
      event: {
        isDelivery: true,
        delivery: {
          mids: ['mid.1458668856218:ed81099e15d3f4f233'],
          watermark: 1458668856253,
          seq: 37,
        },
      },
    };
    builder.onDelivery(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).not.toBeCalled();
  });
});
