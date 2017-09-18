/* @flow */
import warning from 'warning';

import BasicHandlerBuilder, {
  type Predicate,
  type FunctionalHandler,
  type Pattern,
  matchPattern,
} from './BasicHandlerBuilder';

export default class TelegramHandlerBuilder extends BasicHandlerBuilder {
  onCallbackQuery(arg1: Pattern | FunctionalHandler, arg2?: FunctionalHandler) {
    let pattern;
    let handler;
    if (arg2) {
      pattern = ((arg1: any): Pattern);
      handler = (arg2: FunctionalHandler);

      warning(
        typeof pattern === 'string' || pattern instanceof RegExp,
        `'onCallbackQuery' only accepts string or regex, but received ${typeof pattern}`
      );

      this.on(
        context =>
          context.event.isCallbackQuery &&
          matchPattern(pattern, context.event.callbackQuery.data),
        handler
      );
    } else {
      handler = ((arg1: any): FunctionalHandler);

      this.on(context => context.event.isCallbackQuery, handler);
    }

    return this;
  }

  onPhoto(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isPhotoMessage && predicate(context),
      handler
    );
    return this;
  }

  onDocument(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isDocumentMessage && predicate(context),
      handler
    );
    return this;
  }

  onAudio(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isAudioMessage && predicate(context),
      handler
    );
    return this;
  }

  onGame(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isGameMessage && predicate(context),
      handler
    );
    return this;
  }

  onSticker(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isStickerMessage && predicate(context),
      handler
    );
    return this;
  }

  onVideo(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isVideoMessage && predicate(context),
      handler
    );
    return this;
  }

  onVoice(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isVoiceMessage && predicate(context),
      handler
    );
    return this;
  }

  onVideoNote(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isVideoNoteMessage && predicate(context),
      handler
    );
    return this;
  }

  onContact(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isContactMessage && predicate(context),
      handler
    );
    return this;
  }

  onLocation(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isLocationMessage && predicate(context),
      handler
    );
    return this;
  }

  onVenue(predicate: Predicate, handler: FunctionalHandler) {
    this.on(
      context => context.event.isVenueMessage && predicate(context),
      handler
    );
    return this;
  }
}
