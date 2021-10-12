import { Event } from '@bottender/core';

import {
  ConversationStartedEvent,
  DeliveredEvent,
  FailedEvent,
  MessageEvent,
  SeenEvent,
  SubscribedEvent,
  UnsubscribedEvent,
  ViberMessage,
  ViberRawEvent,
} from './ViberTypes';

export default class ViberEvent implements Event<ViberRawEvent> {
  _rawEvent: ViberRawEvent;

  constructor(rawEvent: ViberRawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from Viber.
   *
   */
  get rawEvent(): ViberRawEvent {
    return this._rawEvent;
  }

  /**
   * The timestamp when the event was sent.
   *
   */
  get timestamp(): number {
    return this._rawEvent.timestamp;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage(): boolean {
    return this._rawEvent.event === 'message';
  }

  /**
   * The message object from Viber raw event.
   *
   */
  get message(): ViberMessage | undefined {
    if (!this.isMessage) {
      return;
    }
    return (this._rawEvent as MessageEvent).message;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return this.isMessage && (this.message as ViberMessage).type === 'text';
  }

  /**
   * The text string from Viber raw event.
   *
   */
  get text(): string | undefined {
    if (!this.isMessage) {
      return;
    }
    return (this.message as ViberMessage).text;
  }

  /**
   * Determine if the event is a message event which includes picture.
   *
   */
  get isPicture(): boolean {
    return this.isMessage && (this.message as ViberMessage).type === 'picture';
  }

  /**
   * The picture URL from Viber raw event.
   *
   */
  get picture(): string | undefined {
    if (!this.isPicture) {
      return;
    }
    return (this.message as ViberMessage).media;
  }

  /**
   * Determine if the event is a message event which includes video.
   *
   */
  get isVideo(): boolean {
    return this.isMessage && (this.message as ViberMessage).type === 'video';
  }

  /**
   * The video URL from Viber raw event.
   *
   */
  get video(): string | undefined {
    if (!this.isVideo) {
      return;
    }
    return (this.message as ViberMessage).media;
  }

  /**
   * Determine if the event is a message event which includes file.
   *
   */
  get isFile(): boolean {
    return this.isMessage && (this.message as ViberMessage).type === 'file';
  }

  /**
   * The file URL from Viber raw event.
   *
   */
  get file(): string | undefined {
    if (!this.isFile) {
      return;
    }
    return (this.message as ViberMessage).media;
  }

  /**
   * Determine if the event is a message event which includes sticker.
   *
   */
  get isSticker(): boolean {
    return this.isMessage && (this.message as ViberMessage).type === 'sticker';
  }

  /**
   * The sticker id from Viber raw event.
   *
   */
  get sticker(): number | undefined {
    if (!this.isSticker) {
      return;
    }
    return (this.message as ViberMessage).stickerId;
  }

  /**
   * Determine if the event is a message event which includes contact.
   *
   */
  get isContact(): boolean {
    return this.isMessage && (this.message as ViberMessage).type === 'contact';
  }

  /**
   * The contact object from Viber raw event.
   *
   */
  get contact(): ViberMessage['contact'] | undefined {
    if (!this.isContact) {
      return;
    }
    return (this.message as ViberMessage).contact;
  }

  /**
   * Determine if the event is a message event which includes URL.
   *
   */
  get isURL(): boolean {
    return this.isMessage && (this.message as ViberMessage).type === 'url';
  }

  /**
   * The URL from Viber raw event.
   *
   */
  get url(): string | undefined {
    if (!this.isURL) {
      return;
    }
    return (this.message as ViberMessage).media;
  }

  /**
   * Determine if the event is a message event which includes location.
   *
   */
  get isLocation(): boolean {
    return this.isMessage && (this.message as ViberMessage).type === 'location';
  }

  /**
   * The location object from Viber raw event.
   *
   */
  get location(): ViberMessage['location'] | undefined {
    if (!this.isLocation) {
      return;
    }
    return (this.message as ViberMessage).location;
  }

  /**
   * Determine if the event is a subscribed event.
   *
   */
  get isSubscribed(): boolean {
    return this._rawEvent.event === 'subscribed';
  }

  /**
   * The subscribed payload from Viber raw event.
   *
   */
  get subscribed(): SubscribedEvent | undefined {
    if (!this.isSubscribed) {
      return;
    }
    return this._rawEvent as SubscribedEvent;
  }

  /**
   * Determine if the event is an unsubscribed event.
   *
   */
  get isUnsubscribed(): boolean {
    return this._rawEvent.event === 'unsubscribed';
  }

  /**
   * The unsubscribed payload from Viber raw event.
   *
   */
  get unsubscribed(): UnsubscribedEvent | undefined {
    if (!this.isUnsubscribed) {
      return;
    }
    return this._rawEvent as UnsubscribedEvent;
  }

  /**
   * Determine if the event is a conversation_started event.
   *
   */
  get isConversationStarted(): boolean {
    return this._rawEvent.event === 'conversation_started';
  }

  /**
   * The conversation started payload from Viber raw event.
   *
   */
  get conversationStarted(): ConversationStartedEvent | undefined {
    if (!this.isConversationStarted) {
      return;
    }
    return this._rawEvent as ConversationStartedEvent;
  }

  /**
   * Determine if the event is a delivered event.
   *
   */
  get isDelivered(): boolean {
    return this._rawEvent.event === 'delivered';
  }

  /**
   * The delivered payload from Viber raw event.
   *
   */
  get delivered(): DeliveredEvent | undefined {
    if (!this.isDelivered) {
      return;
    }
    return this._rawEvent as DeliveredEvent;
  }

  /**
   * Determine if the event is a seen event.
   *
   */
  get isSeen(): boolean {
    return this._rawEvent.event === 'seen';
  }

  /**
   * The seen payload from Viber raw event.
   *
   */
  get seen(): SeenEvent | undefined {
    if (!this.isSeen) {
      return;
    }
    return this._rawEvent as SeenEvent;
  }

  /**
   * Determine if the event is a failed event.
   *
   */
  get isFailed(): boolean {
    return this._rawEvent.event === 'failed';
  }

  /**
   * The failed payload from Viber raw event.
   *
   */
  get failed(): FailedEvent | undefined {
    if (!this.isFailed) {
      return;
    }
    return this._rawEvent as FailedEvent;
  }
}
