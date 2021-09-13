import { Event } from '../context/Event';

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
  get message(): ViberMessage | null {
    if (this.isMessage) {
      return (this._rawEvent as MessageEvent).message;
    }
    return null;
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
  get text(): string | null {
    if (this.isMessage) {
      return (this.message as ViberMessage).text || null;
    }
    return null;
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
  get picture(): string | null {
    if (this.isPicture) {
      return (this.message as ViberMessage).media || null;
    }
    return null;
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
  get video(): string | null {
    if (this.isVideo) {
      return (this.message as ViberMessage).media || null;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes file.
   *
   */
  get isFile(): boolean {
    return (
      this.isMessage && (this.message as any as ViberMessage).type === 'file'
    );
  }

  /**
   * The file URL from Viber raw event.
   *
   */
  get file(): string | null {
    if (this.isFile) {
      return (this.message as ViberMessage).media || null;
    }
    return null;
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
  get sticker(): number | null {
    if (this.isSticker) {
      return (this.message as ViberMessage).stickerId || null;
    }
    return null;
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
  get contact(): Record<string, any> | null {
    if (this.isContact) {
      return (this.message as ViberMessage).contact || null;
    }
    return null;
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
  get url(): string | null {
    if (this.isURL) {
      return (this.message as ViberMessage).media || null;
    }
    return null;
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
  get location(): Record<string, any> | null {
    if (this.isLocation) {
      return (this.message as ViberMessage).location || null;
    }
    return null;
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
  get subscribed(): SubscribedEvent | null {
    if (this.isSubscribed) {
      return this._rawEvent as any;
    }
    return null;
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
  get unsubscribed(): UnsubscribedEvent | null {
    if (this.isUnsubscribed) {
      return this._rawEvent as any;
    }
    return null;
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
  get conversationStarted(): ConversationStartedEvent | null {
    if (this.isConversationStarted) {
      return this._rawEvent as any;
    }
    return null;
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
  get delivered(): DeliveredEvent | null {
    if (this.isDelivered) {
      return this._rawEvent as any;
    }
    return null;
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
  get seen(): SeenEvent | null {
    if (this.isSeen) {
      return this._rawEvent as any;
    }
    return null;
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
  get failed(): FailedEvent | null {
    if (this.isFailed) {
      return this._rawEvent as any;
    }
    return null;
  }
}
