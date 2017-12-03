/* @flow */

import type { Event } from './Event';

type ViberUser = {
  id: string,
  name: string,
  avatar: string,
  country: string,
  language: string,
  api_version: number,
};

type SubscribedEvent = {
  event: 'subscribed',
  timestamp: number,
  user: ViberUser,
  message_token: number,
};

type UnsubscribedEvent = {
  event: 'unsubscribed',
  timestamp: number,
  user_id: string,
  message_token: number,
};

type ConversationStartedEvent = {
  event: 'conversation_started',
  timestamp: number,
  message_token: number,
  type: 'open',
  context: string,
  user: ViberUser,
  subscribed: false,
};

type DeliveredEvent = {
  event: 'delivered',
  timestamp: number,
  message_token: number,
  user_id: string,
};

type SeenEvent = {
  event: 'delivered',
  timestamp: number,
  message_token: number,
  user_id: string,
};

type FailedEvent = {
  event: 'failed',
  timestamp: number,
  message_token: number,
  user_id: string,
  desc: string,
};

type ViberMessage = {
  type:
    | 'text'
    | 'picture'
    | 'video'
    | 'file'
    | 'sticker'
    | 'contact'
    | 'url'
    | 'location',
  text?: string,
  media?: string,
  location?: {
    lat: string,
    lot: string,
  },
  contact?: {
    name: string,
    phone_number: string,
  },
  tracking_data?: string,
  file_name?: string,
  file_size?: number,
  duration?: number,
  sticker_id?: number,
};

type MessageEvent = {
  event: 'message',
  timestamp: number,
  message_token: number,
  sender: ViberUser,
  message: ViberMessage,
};

type ViberRawEvent =
  | SubscribedEvent
  | UnsubscribedEvent
  | ConversationStartedEvent
  | DeliveredEvent
  | SeenEvent
  | FailedEvent
  | MessageEvent;

export default class ViberEvent implements Event {
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
  get message(): ?ViberMessage {
    if (this.isMessage) {
      return this._rawEvent.message;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return this.isMessage && this.message.type === 'text';
  }

  /**
   * The text string from Viber raw event.
   *
   */
  get text(): ?string {
    if (this.isMessage) {
      return (this.message: any).text || null;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes picture.
   *
   */
  get isPicture(): boolean {
    return this.isMessage && this.message.type === 'picture';
  }

  /**
   * The picture URL from Viber raw event.
   *
   */
  get picture(): ?string {
    if (this.isPicture) {
      return (this.message: any).media;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes video.
   *
   */
  get isVideo(): boolean {
    return this.isMessage && this.message.type === 'video';
  }

  /**
   * The video URL from Viber raw event.
   *
   */
  get video(): ?string {
    if (this.isVideo) {
      return (this.message: any).media;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes file.
   *
   */
  get isFile(): boolean {
    return this.isMessage && this.message.type === 'file';
  }

  /**
   * The file URL from Viber raw event.
   *
   */
  get file(): ?string {
    if (this.isFile) {
      return (this.message: any).media;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes sticker.
   *
   */
  get isSticker(): boolean {
    return this.isMessage && this.message.type === 'sticker';
  }

  /**
   * The sticker id from Viber raw event.
   *
   */
  get sticker(): ?number {
    if (this.isSticker) {
      return (this.message: any).sticker_id;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes contact.
   *
   */
  get isContact(): boolean {
    return this.isMessage && this.message.type === 'contact';
  }

  /**
   * The contact object from Viber raw event.
   *
   */
  get contact(): ?Object {
    if (this.isContact) {
      return (this.message: any).contact;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes URL.
   *
   */
  get isURL(): boolean {
    return this.isMessage && this.message.type === 'url';
  }

  /**
   * The URL from Viber raw event.
   *
   */
  get url(): ?string {
    if (this.isURL) {
      return (this.message: any).media;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes location.
   *
   */
  get isLocation(): boolean {
    return this.isMessage && this.message.type === 'location';
  }

  /**
   * The location object from Viber raw event.
   *
   */
  get location(): ?Object {
    if (this.isLocation) {
      return (this.message: any).location;
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
  get subscribed(): ?string {
    if (this.isSubscribed) {
      return this._rawEvent;
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
  get unsubscribed(): ?string {
    if (this.isUnsubscribed) {
      return this._rawEvent;
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
  get conversationStarted(): ?string {
    if (this.isConversationStarted) {
      return this._rawEvent;
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
  get delivered(): ?string {
    if (this.isDelivered) {
      return this._rawEvent;
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
  get seen(): ?string {
    if (this.isSeen) {
      return this._rawEvent;
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
  get failed(): ?string {
    if (this.isFailed) {
      return this._rawEvent;
    }
    return null;
  }
}
