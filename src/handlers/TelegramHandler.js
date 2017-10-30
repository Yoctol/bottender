/* @flow */
import warning from 'warning';

import Handler, {
  type Predicate,
  type FunctionalHandler,
  type Pattern,
  type Builder,
  matchPattern,
} from './Handler';

export default class TelegramHandler extends Handler {
  onCallbackQuery(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isCallbackQuery, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onCallbackQuery' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isCallbackQuery &&
          predicate(context.event.callbackQuery, context),
        handler
      );
    }

    return this;
  }

  onPayload(
    ...args:
      | [Pattern, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);

      this.on(context => context.event.isPayload, handler);
    } else {
      // eslint-disable-next-line prefer-const
      let [pattern, handler]: [
        Pattern,
        FunctionalHandler | Builder,
      ] = (args: any);

      if (handler.build) {
        handler = handler.build();
      }

      warning(
        typeof pattern === 'function' ||
          typeof pattern === 'string' ||
          pattern instanceof RegExp,
        `'onPayload' only accepts string, regex or function, but received ${typeof pattern}`
      );

      if (typeof pattern === 'function') {
        const predicate: Predicate = pattern;
        this.on(
          context =>
            context.event.isPayload &&
            predicate(context.event.payload, context),
          handler
        );
      } else {
        if (pattern instanceof RegExp) {
          const _handler = handler;
          handler = context => {
            // $FlowFixMe
            const match = pattern.exec(context.event.payload);

            if (!match) return _handler(context);

            // reset index so we start at the beginning of the regex each time
            // $FlowFixMe
            pattern.lastIndex = 0;

            return _handler(context, match);
          };
        }

        this.on(
          ({ event }) =>
            event.isPayload && matchPattern(pattern, event.payload),
          handler
        );
      }
    }

    return this;
  }

  onPhoto(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isPhoto, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onPhoto' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isPhoto && predicate(context.event.photo, context),
        handler
      );
    }

    return this;
  }

  onDocument(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isDocument, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onDocument' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isDocument &&
          predicate(context.event.document, context),
        handler
      );
    }

    return this;
  }

  onAudio(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isAudio, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onAudio' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isAudio && predicate(context.event.audio, context),
        handler
      );
    }

    return this;
  }

  onGame(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isGame, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onGame' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isGame && predicate(context.event.game, context),
        handler
      );
    }

    return this;
  }

  onSticker(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isSticker, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onSticker' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isSticker && predicate(context.event.sticker, context),
        handler
      );
    }

    return this;
  }

  onVideo(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isVideo, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onVideo' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isVideo && predicate(context.event.video, context),
        handler
      );
    }

    return this;
  }

  onVoice(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isVoice, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onVoice' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isVoice && predicate(context.event.voice, context),
        handler
      );
    }

    return this;
  }

  onVideoNote(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isVideoNote, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onVideoNote' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isVideoNote &&
          predicate(context.event.videoNote, context),
        handler
      );
    }

    return this;
  }

  onContact(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isContact, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onContact' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isContact && predicate(context.event.contact, context),
        handler
      );
    }

    return this;
  }

  onLocation(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isLocation, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onLocation' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isLocation &&
          predicate(context.event.location, context),
        handler
      );
    }

    return this;
  }

  onVenue(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isVenue, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);

      warning(
        typeof predicate === 'function',
        `'onVenue' only accepts function, but received ${typeof predicate}`
      );

      this.on(
        context =>
          context.event.isVenue && predicate(context.event.venue, context),
        handler
      );
    }

    return this;
  }
}
