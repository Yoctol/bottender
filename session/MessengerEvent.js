/* @flow */

type Sender = {
  id: string,
};

type Recipient = {
  id: string,
};

type QuickReply = {
  payload: string,
};

type Attachment = {
  type: string,
};

type Message = {
  is_echo?: boolean,
  text?: string,
  sticker_id?: number,
  quick_reply?: QuickReply,
  attachments?: Array<Attachment>,
};

type Postback = {
  payload: string,
};

export type RawMessengerEvent = {
  sender: Sender,
  recipient: Recipient,
  timestamp: number,
  message?: Message,
  postback?: Postback,
};

export default class MessengerEvent {
  _rawEvent: RawMessengerEvent;

  constructor(rawEvent: RawMessengerEvent) {
    this._rawEvent = rawEvent;
  }

  get rawEvent(): RawMessengerEvent {
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
}
