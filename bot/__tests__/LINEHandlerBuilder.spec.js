import LINEHandlerBuilder from '../LINEHandlerBuilder';

const setup = () => {
  const builder = new LINEHandlerBuilder();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(LINEHandlerBuilder).toBeDefined();
    expect(builder).toBeInstanceOf(LINEHandlerBuilder);
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
            id: '325708',
            type: 'text',
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

    it('not match with different message type', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: true,
          isImageMessage: true,
          message: {
            id: '325708',
            type: 'image',
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
          data: 'cool',
        },
      },
    };
    builder.onPayload('cool', handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received no payload message', async () => {
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
          data: 'cool',
        },
      },
    };
    builder.onPayload(/COOL/i, handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });
});

describe('#onFollow', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onFollow('payload', handler)).toBe(builder);
  });

  it('should call condition when received follow event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const condition = jest.fn(() => true);
    const context = {
      event: {
        isFollow: true,
        source: {
          type: 'user',
          userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
        },
      },
    };
    builder.onFollow(condition, handler);
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received no follow event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const condition = jest.fn(() => true);
    const context = {
      event: {
        isFollow: false,
      },
    };
    builder.onFollow(condition, handler);
    await builder.build()(context);
    expect(condition).not.toBeCalledWith();
    expect(handler).not.toBeCalled();
  });
});

describe('#onUnfollow', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onUnfollow('payload', handler)).toBe(builder);
  });

  it('should call condition when received onUnfollow event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const condition = jest.fn(() => true);
    const context = {
      event: {
        isUnfollow: true,
        source: {
          type: 'user',
          userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
        },
      },
    };
    builder.onUnfollow(condition, handler);
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not unfollow event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const condition = jest.fn(() => true);
    const context = {
      event: {
        isUnfollow: false,
      },
    };
    builder.onUnfollow(condition, handler);
    await builder.build()(context);
    expect(condition).not.toBeCalledWith();
    expect(handler).not.toBeCalled();
  });
});

describe('#onJoin', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onJoin('payload', handler)).toBe(builder);
  });

  it('should call condition when received onJoin event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const condition = jest.fn(() => true);
    const context = {
      event: {
        isJoin: true,
        source: {
          type: 'group',
          groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
      },
    };
    builder.onJoin(condition, handler);
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not Join event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const condition = jest.fn(() => true);
    const context = {
      event: {
        isJoin: false,
      },
    };
    builder.onJoin(condition, handler);
    await builder.build()(context);
    expect(condition).not.toBeCalledWith();
    expect(handler).not.toBeCalled();
  });
});

describe('#onLeave', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onLeave('payload', handler)).toBe(builder);
  });

  it('should call condition when received onLeave event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const condition = jest.fn(() => true);
    const context = {
      event: {
        isLeave: true,
        source: {
          type: 'group',
          groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
      },
    };
    builder.onLeave(condition, handler);
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not Leave event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const condition = jest.fn(() => true);
    const context = {
      event: {
        isLeave: false,
      },
    };
    builder.onLeave(condition, handler);
    await builder.build()(context);
    expect(condition).not.toBeCalledWith();
    expect(handler).not.toBeCalled();
  });
});

describe('#onBeacon', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onBeacon('payload', handler)).toBe(builder);
  });

  it('should call condition when received onBeacon event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const condition = jest.fn(() => true);
    const context = {
      event: {
        isBeacon: true,
        source: {
          type: 'group',
          groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
      },
    };
    builder.onBeacon(condition, handler);
    await builder.build()(context);
    expect(condition).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not Beacon event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const condition = jest.fn(() => true);
    const context = {
      event: {
        isBeacon: false,
      },
    };
    builder.onBeacon(condition, handler);
    await builder.build()(context);
    expect(condition).not.toBeCalledWith();
    expect(handler).not.toBeCalled();
  });
});
