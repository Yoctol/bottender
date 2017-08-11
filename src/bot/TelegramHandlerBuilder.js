/* @flow */
import warning from 'warning';

import BasicHandlerBuilder, {
  type Predicate,
  type Handler,
  type Pattern,
  matchPattern,
} from './BasicHandlerBuilder';

export default class TelegramHandlerBuilder extends BasicHandlerBuilder {
  onMessage(predicate: Predicate, handler: Handler) {
    this.on(context => context.event.isMessage && predicate(context), handler);
    return this;
  }

  onText(pattern: Pattern, handler: Handler) {
    warning(
      typeof pattern === 'string' || pattern instanceof RegExp,
      `'onText' only accepts string or regex, but received ${typeof pattern}`
    );
    this.onMessage(
      context =>
        context.event.isTextMessage &&
        matchPattern(pattern, context.event.message.text),
      handler
    );
    return this;
  }

  onCallbackQuery(pattern: Pattern, handler: Handler) {
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
    return this;
  }

  onPhoto(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isPhotoMessage && predicate(context),
      handler
    );
    return this;
  }

  onDocument(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isDocumentMessage && predicate(context),
      handler
    );
    return this;
  }

  onAudio(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isAudioMessage && predicate(context),
      handler
    );
    return this;
  }

  onGame(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isGameMessage && predicate(context),
      handler
    );
    return this;
  }

  onSticker(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isStickerMessage && predicate(context),
      handler
    );
    return this;
  }

  onVideo(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isVideoMessage && predicate(context),
      handler
    );
    return this;
  }

  onVoice(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isVoiceMessage && predicate(context),
      handler
    );
    return this;
  }

  onVideoNote(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isVideoNoteMessage && predicate(context),
      handler
    );
    return this;
  }

  onContact(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isContactMessage && predicate(context),
      handler
    );
    return this;
  }

  onLocation(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isLocationMessage && predicate(context),
      handler
    );
    return this;
  }

  onVenue(predicate: Predicate, handler: Handler) {
    this.on(
      context => context.event.isVenueMessage && predicate(context),
      handler
    );
    return this;
  }
}
