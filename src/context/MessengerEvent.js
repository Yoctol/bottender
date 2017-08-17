/* @flow */

import type { Event } from './Event';

export type Sender = {
  id: string,
};

export type Recipient = {
  id: string,
};

type QuickReply = {
  payload: string,
};

type Attachment = {
  type: string,
};

export type Message = {
  is_echo?: boolean,
  text?: string,
  sticker_id?: number,
  quick_reply?: QuickReply,
  attachments?: Array<Attachment>,
};

export type Postback = {
  payload: string,
};

export type PolicyEnforcement = {
  action: String,
  reason: String,
};

export type AppRoles = {
  [key: string]: Array<String>,
};

export type PassThreadControl = {
  new_owner_app_id: String,
  metadata: String,
};

export type TakeThreadControl = {
  previous_owner_app_id: String,
  metadata: String,
};

export type MessengerRawEvent = {
  sender?: Sender,
  recipient?: Recipient,
  timestamp?: number,
  message?: Message,
  postback?: Postback,
  'policy-enforcement'?: PolicyEnforcement,
  app_roles?: AppRoles,
  pass_thread_control?: PassThreadControl,
  take_thread_control?: TakeThreadControl,
};

export default class MessengerEvent implements Event {
  _rawEvent: MessengerRawEvent;

  constructor(rawEvent: MessengerRawEvent) {
    this._rawEvent = rawEvent;
  }

  get rawEvent(): MessengerRawEvent {
    return this._rawEvent;
  }

  get isMessage(): boolean {
    return (
      !!this._rawEvent.message && typeof this._rawEvent.message === 'object'
    );
  }

  get message(): ?Message {
    return this._rawEvent.message;
  }

  get isTextMessage(): boolean {
    return this.isMessage && typeof (this.message: any).text === 'string';
  }

  get hasAttachment(): boolean {
    return (
      this.isMessage &&
      !!(this.message: any).attachments &&
      (this.message: any).attachments.length > 0
    );
  }

  get attachments(): ?Array<Attachment> {
    return this.message ? this.message.attachments : null;
  }

  get isImageMessage(): boolean {
    return this.hasAttachment && (this.attachments: any)[0].type === 'image';
  }

  get isAudioMessage(): boolean {
    return this.hasAttachment && (this.attachments: any)[0].type === 'audio';
  }

  get isVideoMessage(): boolean {
    return this.hasAttachment && (this.attachments: any)[0].type === 'video';
  }

  get isLocationMessage(): boolean {
    return this.hasAttachment && (this.attachments: any)[0].type === 'location';
  }

  get isFileMessage(): boolean {
    return this.hasAttachment && (this.attachments: any)[0].type === 'file';
  }

  get isFallbackMessage(): boolean {
    return this.hasAttachment && (this.attachments: any)[0].type === 'fallback';
  }

  get isStickerMessage(): boolean {
    return this.isMessage && typeof (this.message: any).sticker_id === 'number';
  }

  get isLikeSticker(): boolean {
    return (
      this.isStickerMessage &&
      ((this.message: any).sticker_id === 369239263222822 ||
        (this.message: any).sticker_id === 369239343222814)
    );
  }

  get isQuickReply(): boolean {
    return (
      this.isMessage &&
      !!(this.message: any).quick_reply &&
      typeof (this.message: any).quick_reply === 'object'
    );
  }

  get quickReply(): ?QuickReply {
    return this.message ? this.message.quick_reply : null;
  }

  get isEcho(): boolean {
    return this.isMessage && !!(this.message: any).is_echo;
  }

  get isPostback(): boolean {
    return (
      !!this._rawEvent.postback && typeof this._rawEvent.postback === 'object'
    );
  }

  get postback(): ?Postback {
    return this._rawEvent.postback || null;
  }

  get isRead(): boolean {
    return !!this._rawEvent.read && typeof this._rawEvent.read === 'object';
  }

  get isDelivery(): boolean {
    return (
      !!this._rawEvent.delivery && typeof this._rawEvent.delivery === 'object'
    );
  }

  get isPayload(): boolean {
    return (
      (!!this.postback && typeof this.postback.payload === 'string') ||
      (!!this.quickReply && typeof this.quickReply.payload === 'string')
    );
  }

  get payload(): ?string {
    if (!!this.postback && this.isPayload) {
      return this.postback.payload;
    } else if (!!this.quickReply && this.isPayload) {
      return this.quickReply.payload;
    }
    return null;
  }
}
