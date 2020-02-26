import { Event } from '../context/Event';

import {
  MediaMessageReceived,
  MessageDelivered,
  MessageRead,
  MessageReceived,
  MessageSent,
  WhatsappRawEvent,
} from './WhatsappTypes';

export default class WhatsappEvent implements Event<WhatsappRawEvent> {
  _rawEvent: WhatsappRawEvent;

  constructor(rawEvent: WhatsappRawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from WhatsApp.
   *
   */
  get rawEvent(): WhatsappRawEvent {
    return this._rawEvent;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage(): boolean {
    return this._rawEvent.smsStatus === 'received';
  }

  /**
   * The message object from Messenger raw event.
   *
   */
  get message(): MessageReceived | null {
    return this.isMessage ? (this._rawEvent as MessageReceived) : null;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return (
      this._rawEvent.smsStatus === 'received' && this._rawEvent.numMedia === '0'
    );
  }

  /**
   * The text string from Messenger raw event.
   *
   */
  get text(): string | null {
    return (this._rawEvent as MessageReceived).body || null;
  }

  /**
   * Determine if the event is a message event which includes media.
   *
   */
  get isMedia(): boolean {
    return (
      this._rawEvent.smsStatus === 'received' && this._rawEvent.numMedia === '1'
    );
  }

  /**
   * The media object from Messenger raw event.
   *
   */
  get media(): { contentType: string; url: string } | null {
    if (!this.isMedia) return null;

    const rawEvent = this._rawEvent as MediaMessageReceived;

    return {
      contentType: rawEvent.mediaContentType0,
      url: rawEvent.mediaUrl0,
    };
  }

  /**
   * Determine if the event is a message received event.
   *
   */
  get isReceived(): boolean {
    return this._rawEvent.smsStatus === 'received';
  }

  /**
   * The received object from WhatsApp raw event.
   *
   */
  get received(): MessageReceived | null {
    return this.isReceived ? (this._rawEvent as MessageReceived) : null;
  }

  /**
   * Determine if the event is a message sent event.
   *
   */
  get isSent(): boolean {
    return this._rawEvent.smsStatus === 'sent';
  }

  /**
   * The sent object from WhatsApp raw event.
   *
   */
  get sent(): MessageSent | null {
    return this.isSent ? (this._rawEvent as MessageSent) : null;
  }

  /**
   * Determine if the event is a message delivered event.
   *
   */
  get isDelivered(): boolean {
    return this._rawEvent.smsStatus === 'delivered';
  }

  /**
   * The delivered object from WhatsApp raw event.
   *
   */
  get delivered(): MessageDelivered | null {
    return this.isDelivered ? (this._rawEvent as MessageDelivered) : null;
  }

  /**
   * Determine if the event is a message read event.
   *
   */
  get isRead(): boolean {
    return this._rawEvent.smsStatus === 'read';
  }

  /**
   * The read object from WhatsApp raw event.
   *
   */
  get read(): MessageRead | null {
    return this.isRead ? (this._rawEvent as MessageRead) : null;
  }
}
