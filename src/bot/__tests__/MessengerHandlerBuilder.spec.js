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

  describe('should support catch all handler', () => {
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
      builder.onText(handler);
      await builder.build()(context);
      expect(handler).toBeCalledWith(context);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      const context = {
        event: {
          isMessage: false,
          isTextMessage: false,
        },
      };
      builder.onText(handler);
      await builder.build()(context);
      expect(handler).not.toBeCalled();
    });
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

describe('#onPayment', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const predicate = () => true;
    const handler = () => {};
    expect(await builder.onPayment(predicate, handler)).toBe(builder);
  });

  it('should call predicate when received postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isPayment: true,
      },
    };
    builder.onPayment(predicate, handler);
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
        isPayment: false,
      },
    };
    builder.onPayment(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalledWith(context);
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => Promise.resolve(false));
    const handler = jest.fn();
    const context = {
      event: {
        isPayment: true,
      },
    };
    builder.onPayment(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).not.toBeCalled();
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

describe('#onLocation', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onLocation(predicate, handler)).toBe(builder);
  });

  it('should call handler when received location event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isLocationMessage: true,
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
    builder.onLocation(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not location event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isLocationMessage: false,
        message: {
          text: 'wow',
        },
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
    const predicate = jest.fn(() => Promise.resolve(false));
    const context = {
      event: {
        isLocationMessage: true,
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
    builder.onLocation(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
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

  it('should call handler when received image event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isImageMessage: true,
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
    builder.onImage(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not image event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isImageMessage: false,
        message: {
          text: 'wow',
        },
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
    const predicate = jest.fn(() => Promise.resolve(false));
    const context = {
      event: {
        isImageMessage: true,
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
    builder.onImage(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
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

  it('should call handler when received audio event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isAudioMessage: true,
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
    builder.onAudio(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not audio event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isAudioMessage: false,
        message: {
          text: 'wow',
        },
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
    const predicate = jest.fn(() => Promise.resolve(false));
    const context = {
      event: {
        isAudioMessage: true,
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
    builder.onAudio(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
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

  it('should call handler when received video event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isVideoMessage: true,
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
    builder.onVideo(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not video event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isVideoMessage: false,
        message: {
          text: 'wow',
        },
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
    const predicate = jest.fn(() => Promise.resolve(false));
    const context = {
      event: {
        isVideoMessage: true,
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
    builder.onVideo(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
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

  it('should call handler when received file event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isFileMessage: true,
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
    builder.onFile(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not file event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isFileMessage: false,
        message: {
          text: 'wow',
        },
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
    const predicate = jest.fn(() => Promise.resolve(false));
    const context = {
      event: {
        isFileMessage: true,
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
    builder.onFile(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
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

  it('should call handler when received fallback event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isFallbackMessage: true,
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
    builder.onFallback(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not fallback event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isFallbackMessage: false,
        message: {
          text: 'wow',
        },
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
    const predicate = jest.fn(() => Promise.resolve(false));
    const context = {
      event: {
        isFallbackMessage: true,
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
    builder.onFallback(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).not.toBeCalled();
  });
});
