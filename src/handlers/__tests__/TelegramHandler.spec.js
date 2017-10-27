import TelegramHandler from '../TelegramHandler';

const setup = () => {
  const builder = new TelegramHandler();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(TelegramHandler).toBeDefined();
    expect(builder).toBeInstanceOf(TelegramHandler);
  });
});

describe('#onCallbackQuery', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onCallbackQuery(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: false,
        isCallbackQuery: true,
        callbackQuery: {
          message: {
            text: 'awesome',
          },
          data: 'data',
        },
      },
    };
    builder.onCallbackQuery(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received photo event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const callbackQuery = {
      message: {
        text: 'awesome',
      },
      data: 'data',
    };
    const context = {
      event: {
        isMessage: false,
        isCallbackQuery: true,
        callbackQuery,
      },
    };
    builder.onCallbackQuery(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(callbackQuery, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not photo event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isPhoto: false,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onCallbackQuery(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => Promise.resolve(false));
    const callbackQuery = {
      message: {
        text: 'awesome',
      },
      data: 'data',
    };
    const context = {
      event: {
        isMessage: false,
        isCallbackQuery: true,
        callbackQuery,
      },
    };
    builder.onCallbackQuery(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(callbackQuery, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onPayload', () => {
  const contextWithCallbackQuery = {
    event: {
      isMessage: false,
      isCallbackQuery: true,
      isPayload: true,
      callbackQuery: {
        message: {
          text: 'awesome',
        },
        data: 'data',
      },
      payload: 'data',
    },
  };

  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onPayload('text', handler)).toBe(builder);
  });

  describe('should support catch all handler', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onPayload(handler);
      await builder.build()(contextWithCallbackQuery);
      expect(handler).toBeCalledWith(contextWithCallbackQuery);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onPayload(handler);
      await builder.build()({
        event: {
          isMessage: true,
          isCallbackQuery: false,
        },
      });
      expect(handler).not.toBeCalled();
    });
  });

  describe('should support string', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onPayload('data', handler);
      await builder.build()(contextWithCallbackQuery);
      expect(handler).toBeCalledWith(contextWithCallbackQuery);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onPayload('awful', handler);
      await builder.build()(contextWithCallbackQuery);
      expect(handler).not.toBeCalled();
    });
  });

  describe('should support regex', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      const match = ['data'];
      match.index = 0;
      match.input = 'data';

      builder.onPayload(/data/, handler);
      await builder.build()(contextWithCallbackQuery);
      expect(handler).toBeCalledWith(contextWithCallbackQuery, match);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onPayload(/awful/, handler);
      await builder.build()(contextWithCallbackQuery);
      expect(handler).not.toBeCalled();
    });
  });

  describe('should support function predicate', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onPayload(payload => payload === 'data', handler);
      await builder.build()(contextWithCallbackQuery);
      expect(handler).toBeCalledWith(contextWithCallbackQuery);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onPayload(payload => payload === 'awful', handler);
      await builder.build()(contextWithCallbackQuery);
      expect(handler).not.toBeCalled();
    });
  });

  it('should call handler build', async () => {
    const { builder } = setup();
    const build = jest.fn();
    const handler = { build: jest.fn(() => build) };

    builder.onPayload(/data/, handler);
    await builder.build()(contextWithCallbackQuery);
    expect(handler.build()).toBeCalled();
  });
});

describe('#onPhoto', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onPhoto(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isPhoto: true,
        message: {
          message_id: 666,
          photo: [
            {
              file_id: '112',
              width: 100,
              height: 100,
            },
            {
              file_id: '116',
              width: 50,
              height: 50,
            },
          ],
        },
      },
    };
    builder.onPhoto(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received photo event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const photo = [
      {
        file_id: '112',
        width: 100,
        height: 100,
      },
      {
        file_id: '116',
        width: 50,
        height: 50,
      },
    ];
    const context = {
      event: {
        isPhoto: true,
        message: {
          message_id: 666,
          photo,
        },
        photo,
      },
    };
    builder.onPhoto(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(photo, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not photo event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isPhoto: false,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onPhoto(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => Promise.resolve(false));
    const photo = [
      {
        file_id: '112',
        width: 100,
        height: 100,
      },
      {
        file_id: '116',
        width: 50,
        height: 50,
      },
    ];
    const context = {
      event: {
        isPhoto: true,
        message: {
          message_id: 666,
          photo,
        },
        photo,
      },
    };
    builder.onPhoto(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(photo, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onDocument', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onDocument(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isDocument: true,
        message: {
          message_id: 666,
          document: {
            file_id: '1234',
            file_name: 'file',
          },
        },
      },
    };
    builder.onDocument(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received document event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const document = {
      file_id: '1234',
      file_name: 'file',
    };
    const context = {
      event: {
        isDocument: true,
        message: {
          message_id: 666,
          document,
        },
        document,
      },
    };
    builder.onDocument(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(document, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not document event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isDocument: false,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onDocument(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => Promise.resolve(false));
    const document = {
      file_id: '1234',
      file_name: 'file',
    };
    const context = {
      event: {
        isDocument: true,
        message: {
          message_id: 666,
          document,
        },
        document,
      },
    };
    builder.onDocument(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(document, context);
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
        message: {
          message_id: 666,
          audio: {
            file_id: '321',
            duration: 100,
            title: 'audioooooooo',
          },
        },
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
      file_id: '321',
      duration: 100,
      title: 'audioooooooo',
    };
    const context = {
      event: {
        isMessage: true,
        isAudio: true,
        message: {
          message_id: 666,
          audio,
        },
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
        isText: true,
        isAudio: false,
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
    const audio = {
      file_id: '321',
      duration: 100,
      title: 'audioooooooo',
    };
    const context = {
      event: {
        isMessage: true,
        isAudio: true,
        message: {
          message_id: 666,
          audio,
        },
        audio,
      },
    };
    builder.onAudio(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(audio, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onGame', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onGame(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isGame: true,
        message: {
          message_id: 666,
          game: {
            title: 'gammmmmmmme',
            description: 'Description of the game',
            photo: [
              {
                file_id: '112',
                width: 100,
                height: 100,
              },
              {
                file_id: '116',
                width: 50,
                height: 50,
              },
            ],
          },
        },
      },
    };
    builder.onGame(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received game event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const game = {
      title: 'gammmmmmmme',
      description: 'Description of the game',
      photo: [
        {
          file_id: '112',
          width: 100,
          height: 100,
        },
        {
          file_id: '116',
          width: 50,
          height: 50,
        },
      ],
    };
    const context = {
      event: {
        isGame: true,
        message: {
          message_id: 666,
          game,
        },
        game,
      },
    };
    builder.onGame(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(game, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not game event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isGame: false,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onGame(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => Promise.resolve(false));
    const game = {
      title: 'gammmmmmmme',
      description: 'Description of the game',
      photo: [
        {
          file_id: '112',
          width: 100,
          height: 100,
        },
        {
          file_id: '116',
          width: 50,
          height: 50,
        },
      ],
    };
    const context = {
      event: {
        isGame: true,
        message: {
          message_id: 666,
          game,
        },
        game,
      },
    };
    builder.onGame(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(game, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onSticker', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onSticker(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isSticker: true,
        message: {
          message_id: 666,
          sticker: {
            file_id: '123',
            width: 50,
            height: 50,
          },
        },
      },
    };
    builder.onSticker(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received sticker event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const sticker = {
      file_id: '123',
      width: 50,
      height: 50,
    };
    const context = {
      event: {
        isMessage: true,
        isSticker: true,
        message: {
          message_id: 666,
          sticker,
        },
        sticker,
      },
    };
    builder.onSticker(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(sticker, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not sticker event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isSticker: false,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onSticker(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => Promise.resolve(false));
    const sticker = {
      file_id: '123',
      width: 50,
      height: 50,
    };
    const context = {
      event: {
        isMessage: true,
        isSticker: true,
        message: {
          message_id: 666,
          sticker,
        },
        sticker,
      },
    };
    builder.onSticker(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(sticker, context);
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
        message: {
          message_id: 666,
          video: {
            file_id: '321',
            width: 100,
            height: 100,
            duration: 199,
          },
        },
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
      file_id: '321',
      width: 100,
      height: 100,
      duration: 199,
    };
    const context = {
      event: {
        isMessage: true,
        isVideo: true,
        message: {
          message_id: 666,
          video,
        },
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
    const video = {
      file_id: '321',
      width: 100,
      height: 100,
      duration: 199,
    };
    const context = {
      event: {
        isMessage: true,
        isVideo: true,
        message: {
          message_id: 666,
          video,
        },
        video,
      },
    };
    builder.onVideo(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(video, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onVoice', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onVoice(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isVoice: true,
        message: {
          message_id: 666,
          voice: {
            file_id: '543',
            duration: 299,
          },
        },
      },
    };
    builder.onVoice(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received voice event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const voice = {
      file_id: '543',
      duration: 299,
    };
    const context = {
      event: {
        isMessage: true,
        isVoice: true,
        message: {
          message_id: 666,
          voice,
        },
        voice,
      },
    };
    builder.onVoice(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(voice, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not voice event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isVoice: false,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onVoice(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => Promise.resolve(false));
    const voice = {
      file_id: '543',
      duration: 299,
    };
    const context = {
      event: {
        isMessage: true,
        isVoice: true,
        message: {
          message_id: 666,
          voice,
        },
        voice,
      },
    };
    builder.onVoice(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(voice, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onVideoNote', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onVideoNote(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isVideoNote: true,
        message: {
          message_id: 666,
          video_note: {
            file_id: '654',
            length: 100,
            duration: 399,
          },
        },
      },
    };
    builder.onVideoNote(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received video_note event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const videoNote = {
      file_id: '654',
      length: 100,
      duration: 399,
    };
    const context = {
      event: {
        isMessage: true,
        isVideoNote: true,
        message: {
          message_id: 666,
          video_note: videoNote,
        },
        videoNote,
      },
    };
    builder.onVideoNote(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(videoNote, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not video_note event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isVideoNote: false,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onVideoNote(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => Promise.resolve(false));
    const videoNote = {
      file_id: '654',
      length: 100,
      duration: 399,
    };
    const context = {
      event: {
        isMessage: true,
        isVideoNote: true,
        message: {
          message_id: 666,
          video_note: videoNote,
        },
        videoNote,
      },
    };
    builder.onVideoNote(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(videoNote, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onContact', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onContact(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isContact: true,
        message: {
          message_id: 666,
          contact: {
            phone_number: '123456789',
            first_name: 'first',
          },
        },
      },
    };
    builder.onContact(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received contact event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const contact = {
      phone_number: '123456789',
      first_name: 'first',
    };
    const context = {
      event: {
        isMessage: true,
        isContact: true,
        message: {
          message_id: 666,
          contact,
        },
        contact,
      },
    };
    builder.onContact(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(contact, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not contact event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isContact: false,
        message: {
          text: 'wow',
        },
      },
    };
    builder.onContact(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => Promise.resolve(false));
    const contact = {
      phone_number: '123456789',
      first_name: 'first',
    };
    const context = {
      event: {
        isMessage: true,
        isContact: true,
        message: {
          message_id: 666,
          contact,
        },
        contact,
      },
    };
    builder.onContact(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(contact, context);
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
        isMessage: true,
        isLocation: true,
        message: {
          message_id: 666,
          location: {
            longitude: '111.111',
            latitude: '99.99',
          },
        },
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
      longitude: '111.111',
      latitude: '99.99',
    };
    const context = {
      event: {
        isMessage: true,
        isLocation: true,
        message: {
          message_id: 666,
          location,
        },
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
    const predicate = jest.fn(() => Promise.resolve(false));
    const location = {
      longitude: '111.111',
      latitude: '99.99',
    };
    const context = {
      event: {
        isMessage: true,
        isLocation: true,
        message: {
          message_id: 666,
          location,
        },
        location,
      },
    };
    builder.onLocation(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(location, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onVenue', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onVenue(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isVenue: true,
        message: {
          message_id: 666,
          venue: {
            location: {
              longitude: '111.111',
              latitude: '99.99',
            },
            title: 'title',
            address: 'addressssss',
          },
        },
      },
    };
    builder.onVenue(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler when received venue event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const venue = {
      location: {
        longitude: '111.111',
        latitude: '99.99',
      },
      title: 'title',
      address: 'addressssss',
    };
    const context = {
      event: {
        isMessage: true,
        isVenue: true,
        message: {
          message_id: 666,
          venue,
        },
        venue,
      },
    };
    builder.onVenue(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(venue, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not venue event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        isText: true,
        isVenue: false,
        message: {
          text: 'wow',
        },
        text: 'wow',
      },
    };
    builder.onVenue(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalled();
    expect(handler).not.toBeCalled();
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => Promise.resolve(false));
    const venue = {
      location: {
        longitude: '111.111',
        latitude: '99.99',
      },
      title: 'title',
      address: 'addressssss',
    };
    const context = {
      event: {
        isMessage: true,
        isVenue: true,
        message: {
          message_id: 666,
          venue,
        },
        venue,
      },
    };
    builder.onVenue(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(venue, context);
    expect(handler).not.toBeCalled();
  });
});
