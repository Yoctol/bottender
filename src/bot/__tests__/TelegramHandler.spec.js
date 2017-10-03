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
  const contextWithCallbackQuery = {
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

  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onCallbackQuery('text', handler)).toBe(builder);
  });

  describe('should support catch all handler', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onCallbackQuery(handler);
      await builder.build()(contextWithCallbackQuery);
      expect(handler).toBeCalledWith(contextWithCallbackQuery);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onCallbackQuery('awful', handler);
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

      builder.onCallbackQuery('data', handler);
      await builder.build()(contextWithCallbackQuery);
      expect(handler).toBeCalledWith(contextWithCallbackQuery);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onCallbackQuery('awful', handler);
      await builder.build()(contextWithCallbackQuery);
      expect(handler).not.toBeCalled();
    });
  });

  describe('should support regex', () => {
    it('match', async () => {
      const { builder } = setup();
      const handler = jest.fn();
      builder.onCallbackQuery(/data/, handler);
      await builder.build()(contextWithCallbackQuery);
      expect(handler).toBeCalledWith(contextWithCallbackQuery);
    });

    it('not match', async () => {
      const { builder } = setup();
      const handler = jest.fn();

      builder.onCallbackQuery(/awful/, handler);
      await builder.build()(contextWithCallbackQuery);
      expect(handler).not.toBeCalled();
    });
  });
});

describe('#onPhoto', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    const predicate = jest.fn(() => true);
    expect(await builder.onPhoto(predicate, handler)).toBe(builder);
  });

  it('should call handler when received photo event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isPhotoMessage: true,
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
    builder.onPhoto(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not photo event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isPhotoMessage: false,
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
    const context = {
      event: {
        isPhotoMessage: true,
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
    builder.onPhoto(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
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

  it('should call handler when received document event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isDocumentMessage: true,
        message: {
          message_id: 666,
          document: {
            file_id: '1234',
            file_name: 'file',
          },
        },
      },
    };
    builder.onDocument(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not document event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isDocumentMessage: false,
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
    const context = {
      event: {
        isDocumentMessage: true,
        message: {
          message_id: 666,
          document: {
            file_id: '1234',
            file_name: 'file',
          },
        },
      },
    };
    builder.onDocument(predicate, handler);
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
    builder.onAudio(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
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

  it('should call handler when received game event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isGameMessage: true,
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
    builder.onGame(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not game event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isGameMessage: false,
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
    const context = {
      event: {
        isGameMessage: true,
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
    builder.onGame(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
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

  it('should call handler when received sticker event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isStickerMessage: true,
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
    builder.onSticker(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not sticker event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isStickerMessage: false,
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
    const context = {
      event: {
        isStickerMessage: true,
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
    builder.onSticker(predicate, handler);
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
    builder.onVideo(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
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

  it('should call handler when received voice event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isVoiceMessage: true,
        message: {
          message_id: 666,
          voice: {
            file_id: '543',
            duration: 299,
          },
        },
      },
    };
    builder.onVoice(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not voice event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isVoiceMessage: false,
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
    const context = {
      event: {
        isVoiceMessage: true,
        message: {
          message_id: 666,
          voice: {
            file_id: '543',
            duration: 299,
          },
        },
      },
    };
    builder.onVoice(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
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

  it('should call handler when received video_note event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isVideoNoteMessage: true,
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
    builder.onVideoNote(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not video_note event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isVideoNoteMessage: false,
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
    const context = {
      event: {
        isVideoNoteMessage: true,
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
    builder.onVideoNote(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
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

  it('should call handler when received contact event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isContactMessage: true,
        message: {
          message_id: 666,
          contact: {
            phone_number: '123456789',
            first_name: 'first',
          },
        },
      },
    };
    builder.onContact(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not contact event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isContactMessage: false,
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
    const context = {
      event: {
        isContactMessage: true,
        message: {
          message_id: 666,
          contact: {
            phone_number: '123456789',
            first_name: 'first',
          },
        },
      },
    };
    builder.onContact(predicate, handler);
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
        message: {
          message_id: 666,
          location: {
            longitude: '111.111',
            latitude: '99.99',
          },
        },
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
        message: {
          message_id: 666,
          location: {
            longitude: '111.111',
            latitude: '99.99',
          },
        },
      },
    };
    builder.onLocation(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
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

  it('should call handler when received venue event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isVenueMessage: true,
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
    builder.onVenue(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not venue event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isVenueMessage: false,
        message: {
          text: 'wow',
        },
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
    const context = {
      event: {
        isVenueMessage: true,
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
    builder.onVenue(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(context);
    expect(handler).not.toBeCalled();
  });
});
