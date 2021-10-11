import MessengerHandler from '../MessengerHandler';

const setup = () => {
  const builder = new MessengerHandler();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(MessengerHandler).toBeDefined();
    expect(builder).toBeInstanceOf(MessengerHandler);
  });
});

describe('#onPostback', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const predicate = () => true;
    const handler = () => {};
    expect(await builder.onPostback(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
        postback: {
          payload: 'payload',
        },
      },
    };
    builder.onPostback(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const postback = {
      payload: 'payload',
    };
    const context = {
      event: {
        isPostback: true,
        postback: {
          payload: 'payload',
        },
      },
    };
    builder.onPostback(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(postback, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call predicate when received not postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: false,
        payload: null,
      },
    };
    builder.onPostback(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn().mockResolvedValue(false);
    const handler = jest.fn();
    const postback = {
      payload: 'payload',
    };
    const context = {
      event: {
        isPostback: true,
        postback,
      },
    };
    builder.onPostback(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(postback, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onPayload', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onPayload('payload', handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
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
    builder.onPayload(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received postback', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
        isPayload: true,
        postback: {
          payload: 'cool',
        },
        payload: 'cool',
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
        isPayload: true,
        message: {
          quick_reply: {
            payload: 'so quick!',
          },
          text: 'wow',
        },
        quick_reply: {
          payload: 'so quick!',
        },
        text: 'wow',
        payload: 'so quick!',
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
        isPostback: false,
        postback: null,
      },
    };
    builder.onPayload('cool', handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
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
        text: 'wow',
      },
    };
    builder.onPayload(handler); // no pattern
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });

  describe('should support regex', () => {
    it('when received postback', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isPostback: true,
          isPayload: true,
          postback: {
            payload: 'cool',
          },
          payload: 'cool',
        },
      };

      const match = ['cool'];
      match.index = 0;
      match.input = 'cool';

      builder.onPayload(/COOL/i, handler);
      await builder.build()(context);
      expect(handler).toBeCalledWith(context, match);
    });

    it('when received quick reply message', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const quickReply = {
        payload: 'so quick!',
      };
      const context = {
        event: {
          isMessage: true,
          isPayload: true,
          isQuickReply: true,
          message: {
            quick_reply: quickReply,
            text: 'wow',
          },
          quickReply,
          text: 'wow',
          payload: 'so quick!',
        },
      };

      const match = ['so quick!'];
      match.index = 0;
      match.input = 'so quick!';

      builder.onPayload(/so quick!/i, handler);
      await builder.build()(context);
      expect(handler).toBeCalledWith(context, match);
    });
  });

  describe('should support function predicate', () => {
    it('when received postback', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isPostback: true,
          isPayload: true,
          postback: {
            payload: 'cool',
          },
          payload: 'cool',
        },
      };

      builder.onPayload((payload) => payload === 'cool', handler);
      await builder.build()(context);
      expect(handler).toBeCalledWith(context);
    });

    it('when received quick reply message', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const quickReply = {
        payload: 'so quick!',
      };
      const context = {
        event: {
          isMessage: true,
          isQuickReply: true,
          isPayload: true,
          message: {
            quick_reply: quickReply,
            text: 'wow',
          },
          quickReply,
          text: 'wow',
          payload: 'so quick!',
        },
      };

      builder.onPayload((payload) => payload === 'so quick!', handler);
      await builder.build()(context);
      expect(handler).toBeCalledWith(context);
    });
  });

  it('should call handler build', async () => {
    const { builder } = setup();
    const build = jest.fn();
    const handler = { build: jest.fn(() => build) };
    const context = {
      event: {
        isPostback: true,
        isPayload: true,
        postback: {
          payload: 'cool',
        },
        payload: 'cool',
      },
    };

    builder.onPayload(/COOL/i, handler);
    await builder.build()(context);
    expect(handler.build()).toBeCalled();
  });
});

describe('#onPayment', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const predicate = () => true;
    const handler = () => {};
    expect(await builder.onPayment(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPayment: true,
        payment: {},
      },
    };
    builder.onPayment(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const payment = {};
    const context = {
      event: {
        isPayment: true,
        payment,
      },
    };
    builder.onPayment(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(payment, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call predicate when received not postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isPayment: false,
        payment: null,
      },
    };
    builder.onPayment(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn().mockResolvedValue(false);
    const handler = jest.fn();
    const payment = {};
    const context = {
      event: {
        isPayment: true,
        payment,
      },
    };
    builder.onPayment(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(payment, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onOptin', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const predicate = () => true;
    const handler = () => {};
    expect(await builder.onOptin(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isOptin: true,
        optin: {},
      },
    };
    builder.onOptin(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const optin = {};
    const context = {
      event: {
        isOptin: true,
        optin,
      },
    };
    builder.onOptin(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(optin, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call predicate when received not postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isOptin: false,
        optin: null,
      },
    };
    builder.onOptin(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn().mockResolvedValue(false);
    const handler = jest.fn();
    const optin = {};
    const context = {
      event: {
        isOptin: true,
        optin,
      },
    };
    builder.onOptin(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(optin, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onCheckoutUpdate', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const predicate = () => true;
    const handler = () => {};
    expect(await builder.onCheckoutUpdate(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isCheckoutUpdate: true,
        checkoutUpdate: {},
      },
    };
    builder.onCheckoutUpdate(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const checkoutUpdate = {};
    const context = {
      event: {
        isCheckoutUpdate: true,
        checkoutUpdate,
      },
    };
    builder.onCheckoutUpdate(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(checkoutUpdate, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call predicate when received not postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isCheckoutUpdate: false,
        checkoutUpdate: null,
      },
    };
    builder.onCheckoutUpdate(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn().mockResolvedValue(false);
    const handler = jest.fn();
    const checkoutUpdate = {};
    const context = {
      event: {
        isCheckoutUpdate: true,
        checkoutUpdate,
      },
    };
    builder.onCheckoutUpdate(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(checkoutUpdate, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onPreCheckout', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const predicate = () => true;
    const handler = () => {};
    expect(await builder.onPreCheckout(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPreCheckout: true,
        preCheckout: {},
      },
    };
    builder.onPreCheckout(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const preCheckout = {};
    const context = {
      event: {
        isPreCheckout: true,
        preCheckout,
      },
    };
    builder.onPreCheckout(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(preCheckout, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call predicate when received not postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isPreCheckout: false,
        preCheckout: null,
      },
    };
    builder.onPreCheckout(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn().mockResolvedValue(false);
    const handler = jest.fn();
    const preCheckout = {};
    const context = {
      event: {
        isPreCheckout: true,
        preCheckout,
      },
    };
    builder.onPreCheckout(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(preCheckout, context);
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

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isQuickReply: true,
        isPayload: true,
        message: {
          quick_reply: {
            payload: 'so quick!',
          },
          text: 'wow',
        },
        text: 'wow',
        payload: 'so quick!',
      },
    };
    builder.onQuickReply(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received quick reply message', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const quickReply = {
      payload: 'so quick!',
    };
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isQuickReply: true,
        isPayload: true,
        message: {
          quick_reply: quickReply,
          text: 'wow',
        },
        quickReply,
        text: 'wow',
        payload: 'so quick!',
      },
    };
    builder.onQuickReply(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(quickReply, context);
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
        isPayload: false,
        message: {
          text: 'wow',
        },
        text: 'wow',
      },
    };
    builder.onQuickReply(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn().mockResolvedValue(false);
    const handler = jest.fn();
    const quickReply = {
      payload: 'so quick!',
    };
    const context = {
      event: {
        isMessage: true,
        isQuickReply: true,
        isPayload: true,
        message: {
          quick_reply: quickReply,
          text: 'wow',
        },
        quickReply,
        text: 'wow',
        payload: 'so quick!',
      },
    };
    builder.onQuickReply(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(quickReply, context);
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

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isEcho: true,
        message: {
          is_echo: true,
          text: 'wow',
        },
        text: 'wow',
      },
    };
    builder.onEcho(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received echo message', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const message = {
      is_echo: true,
      text: 'wow',
    };
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isEcho: true,
        message,
        text: 'wow',
      },
    };
    builder.onEcho(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(message, context);
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
        text: 'wow',
      },
    };
    builder.onEcho(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn().mockResolvedValue(false);
    const handler = jest.fn();
    const message = {
      is_echo: true,
      text: 'wow',
    };
    const context = {
      event: {
        isMessage: true,
        isEcho: true,
        message,
        text: 'wow',
      },
    };
    builder.onEcho(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(message, context);
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

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isRead: true,
        read: {
          watermark: 1458668856253,
          seq: 38,
        },
      },
    };
    builder.onRead(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received read event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const read = {
      watermark: 1458668856253,
      seq: 38,
    };
    const context = {
      event: {
        isRead: true,
        read,
      },
    };
    builder.onRead(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(read, context);
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
        text: 'wow',
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
    const predicate = jest.fn().mockResolvedValue(false);
    const read = {
      watermark: 1458668856253,
      seq: 38,
    };
    const context = {
      event: {
        isRead: true,
        read,
      },
    };
    builder.onRead(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(read, context);
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

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
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
    builder.onDelivery(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received delivery event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const delivery = {
      mids: ['mid.1458668856218:ed81099e15d3f4f233'],
      watermark: 1458668856253,
      seq: 37,
    };
    const context = {
      event: {
        isDelivery: true,
        delivery,
      },
    };
    builder.onDelivery(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(delivery, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not delivery event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isDelivery: false,
        delivery: null,
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
    const predicate = jest.fn().mockResolvedValue(false);
    const delivery = {
      mids: ['mid.1458668856218:ed81099e15d3f4f233'],
      watermark: 1458668856253,
      seq: 37,
    };
    const context = {
      event: {
        isDelivery: true,
        delivery,
      },
    };
    builder.onDelivery(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(delivery, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onLocation', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onLocation(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isLocation: true,
        hasAttachments: true,
        attachments: [
          {
            type: 'location',
            payload: {
              coordinates: {
                lat: 0,
                long: 0,
              },
            },
          },
        ],
      },
    };
    builder.onLocation(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received location event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const location = {
      coordinates: {
        lat: 0,
        long: 0,
      },
    };
    const context = {
      event: {
        isMessage: true,
        isLocation: true,
        hasAttachment: true,
        attachments: [
          {
            type: 'location',
            payload: location,
          },
        ],
        location,
      },
    };
    builder.onLocation(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(location, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not location event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isLocation: false,
        message: {
          text: 'wow',
        },
        text: 'wow',
      },
    };
    builder.onLocation(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn().mockResolvedValue(false);
    const location = {
      coordinates: {
        lat: 0,
        long: 0,
      },
    };
    const context = {
      event: {
        isMessage: true,
        isLocation: true,
        hasAttachment: true,
        attachments: [
          {
            type: 'location',
            payload: location,
          },
        ],
        location,
      },
    };
    builder.onLocation(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(location, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onImage', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onImage(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isImage: true,
        hasAttachment: true,
        attachments: [
          {
            type: 'image',
            payload: {
              url: 'https://example.com/bot/images/image.jpg',
            },
          },
        ],
      },
    };
    builder.onImage(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received image event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const image = {
      url: 'https://example.com/bot/images/image.jpg',
    };
    const context = {
      event: {
        isMessage: true,
        isImage: true,
        hasAttachment: true,
        attachments: [
          {
            type: 'image',
            payload: image,
          },
        ],
        image,
      },
    };
    builder.onImage(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(image, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not image event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isImage: false,
        message: {
          text: 'wow',
        },
        text: 'wow',
      },
    };
    builder.onImage(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn().mockResolvedValue(false);
    const image = {
      url: 'https://example.com/bot/images/image.jpg',
    };
    const context = {
      event: {
        isMessage: true,
        isImage: true,
        hasAttachment: true,
        attachments: [
          {
            type: 'image',
            payload: image,
          },
        ],
        image,
      },
    };
    builder.onImage(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(image, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onAudio', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onAudio(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isAudio: true,
        hasAttachment: true,
        attachments: [
          {
            type: 'audio',
            payload: {
              url: 'https://example.com/bot/audios/audio.mp3',
            },
          },
        ],
      },
    };
    builder.onAudio(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received audio event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const audio = {
      url: 'https://example.com/bot/audios/audio.mp3',
    };
    const context = {
      event: {
        isMessage: true,
        isAudio: true,
        hasAttachment: true,
        attachments: [
          {
            type: 'audio',
            payload: audio,
          },
        ],
        audio,
      },
    };
    builder.onAudio(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(audio, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not audio event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isAudio: false,
        hasAttachment: false,
        message: {
          text: 'wow',
        },
        text: 'wow',
      },
    };
    builder.onAudio(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn().mockResolvedValue(false);
    const audio = {
      url: 'https://example.com/bot/audios/audio.mp3',
    };
    const context = {
      event: {
        isAudio: true,
        attachments: [
          {
            type: 'audio',
            payload: audio,
          },
        ],
        audio,
      },
    };
    builder.onAudio(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(audio, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onVideo', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onVideo(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isVideo: true,
        hasAttachment: true,
        attachments: [
          {
            type: 'video',
            payload: {
              url: 'https://example.com/bot/videos/video.mp4',
            },
          },
        ],
      },
    };
    builder.onVideo(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received video event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const video = {
      url: 'https://example.com/bot/videos/video.mp4',
    };
    const context = {
      event: {
        isMessage: true,
        isVideo: true,
        hasAttachment: true,
        attachments: [
          {
            type: 'video',
            payload: video,
          },
        ],
        video,
      },
    };
    builder.onVideo(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(video, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not video event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isVideo: false,
        message: {
          text: 'wow',
        },
        text: 'wow',
      },
    };
    builder.onVideo(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn().mockResolvedValue(false);
    const video = {
      url: 'https://example.com/bot/videos/video.mp4',
    };
    const context = {
      event: {
        isVideo: true,
        attachments: [
          {
            type: 'video',
            payload: video,
          },
        ],
        video,
      },
    };
    builder.onVideo(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(video, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onFile', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onFile(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isFile: true,
        hasAttachment: true,
        attachments: [
          {
            type: 'file',
            payload: {
              url: 'https://example.com/bot/files/file.doc',
            },
          },
        ],
      },
    };
    builder.onFile(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received file event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const file = {
      url: 'https://example.com/bot/files/file.doc',
    };
    const context = {
      event: {
        isMessage: true,
        isFile: true,
        hasAttachment: true,
        attachments: [
          {
            type: 'file',
            payload: file,
          },
        ],
        file,
      },
    };
    builder.onFile(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(file, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not file event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isFile: false,
        message: {
          text: 'wow',
        },
        text: 'wow',
      },
    };
    builder.onFile(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn().mockResolvedValue(false);
    const file = {
      url: 'https://example.com/bot/files/file.doc',
    };
    const context = {
      event: {
        isFile: true,
        attachments: [
          {
            type: 'file',
            payload: file,
          },
        ],
        file,
      },
    };
    builder.onFile(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(file, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onFallback', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onFallback(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isFallback: true,
        hasAttachment: true,
        attachments: [
          {
            type: 'fallback',
            payload: null,
            title: 'TITLE_OF_THE_URL_ATTACHMENT',
            URL: 'URL_OF_THE_ATTACHMENT',
          },
        ],
      },
    };
    builder.onFallback(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received fallback event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const fallback = {
      type: 'fallback',
      payload: null,
      title: 'TITLE_OF_THE_URL_ATTACHMENT',
      URL: 'URL_OF_THE_ATTACHMENT',
    };
    const context = {
      event: {
        isMessage: true,
        isFallback: true,
        hasAttachment: true,
        attachments: [fallback],
        fallback,
      },
    };
    builder.onFallback(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(fallback, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not fallback event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isFallback: false,
        message: {
          text: 'wow',
        },
        text: 'wow',
      },
    };
    builder.onFallback(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn().mockResolvedValue(false);
    const fallback = {
      type: 'fallback',
      payload: null,
      title: 'TITLE_OF_THE_URL_ATTACHMENT',
      URL: 'URL_OF_THE_ATTACHMENT',
    };
    const context = {
      event: {
        isFallback: true,
        attachments: [fallback],
        fallback,
      },
    };
    builder.onFallback(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(fallback, context);
    expect(handler).not.toBeCalled();
  });
});
