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

export type Payment = {
  payload: string,
  requested_user_info: Object,
  payment_credential: Object,
  amount: {
    currency: string,
    amount: string,
  },
  shipping_option_id: string,
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
  payment?: Payment,
  'policy-enforcement'?: PolicyEnforcement,
  app_roles?: AppRoles,
  pass_thread_control?: PassThreadControl,
  take_thread_control?: TakeThreadControl,
};

type MessengerEventOptions = {
  isStandby?: boolean,
};

export default class MessengerEvent implements Event {
  _rawEvent: MessengerRawEvent;
  _isStandby: boolean;

  constructor(
    rawEvent: MessengerRawEvent,
    options: MessengerEventOptions = {}
  ) {
    this._rawEvent = rawEvent;
    this._isStandby = options.isStandby || false;
  }

  /**
   * Underlying raw event from Messenger.
   *
   */
  get rawEvent(): MessengerRawEvent {
    return this._rawEvent;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage(): boolean {
    return (
      !!this._rawEvent.message && typeof this._rawEvent.message === 'object'
    );
  }

  /**
   * The message object from Messenger raw event.
   *
   */
  get message(): ?Message {
    return this._rawEvent.message;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isTextMessage(): boolean {
    return this.isMessage && typeof (this.message: any).text === 'string';
  }

  /**
   * Determine if the event has any attachments.
   *
   */
  get hasAttachment(): boolean {
    return (
      this.isMessage &&
      !!(this.message: any).attachments &&
      (this.message: any).attachments.length > 0
    );
  }

  /**
   * The attachments array from Messenger raw event.
   *
   */
  get attachments(): ?Array<Attachment> {
    return this.message ? this.message.attachments : null;
  }

  /**
   * Determine if the event is a message event which includes image attachment.
   *
   */
  get isImageMessage(): boolean {
    return this.hasAttachment && (this.attachments: any)[0].type === 'image';
  }

  /**
   * Determine if the event is a message event which includes audio attachment.
   *
   */
  get isAudioMessage(): boolean {
    return this.hasAttachment && (this.attachments: any)[0].type === 'audio';
  }

  /**
   * Determine if the event is a message event which includes video attachment.
   *
   */
  get isVideoMessage(): boolean {
    return this.hasAttachment && (this.attachments: any)[0].type === 'video';
  }

  /**
   * Determine if the event is a message event which includes location attachment.
   *
   */
  get isLocationMessage(): boolean {
    return this.hasAttachment && (this.attachments: any)[0].type === 'location';
  }

  /**
   * Determine if the event is a message event which includes file attachment.
   *
   */
  get isFileMessage(): boolean {
    return this.hasAttachment && (this.attachments: any)[0].type === 'file';
  }

  /**
   * Determine if the event is a message event which includes fallback attachment.
   *
   */
  get isFallbackMessage(): boolean {
    return this.hasAttachment && (this.attachments: any)[0].type === 'fallback';
  }

  /**
   * Determine if the event is a message event which includes sticker.
   *
   */
  get isStickerMessage(): boolean {
    return this.isMessage && typeof (this.message: any).sticker_id === 'number';
  }

  /**
   * Determine if the event is a message event which includes 'like' sticker.
   *
   */
  get isLikeSticker(): boolean {
    return (
      this.isStickerMessage &&
      ((this.message: any).sticker_id === 369239263222822 ||
        (this.message: any).sticker_id === 369239343222814)
    );
  }

  /**
   * Determine if the event is a message event triggered from quick reply.
   *
   */
  get isQuickReply(): boolean {
    return (
      this.isMessage &&
      !!(this.message: any).quick_reply &&
      typeof (this.message: any).quick_reply === 'object'
    );
  }

  /**
   * The quick reply object from Messenger raw event.
   *
   */
  get quickReply(): ?QuickReply {
    return this.message ? this.message.quick_reply : null;
  }

  /**
   * Determine if the event is a message event sent from our side.
   *
   */
  get isEcho(): boolean {
    return this.isMessage && !!(this.message: any).is_echo;
  }

  /**
   * Determine if the event is a postback event.
   *
   */
  get isPostback(): boolean {
    return (
      !!this._rawEvent.postback && typeof this._rawEvent.postback === 'object'
    );
  }

  /**
   * The postback object from Messenger raw event.
   *
   */
  get postback(): ?Postback {
    return this._rawEvent.postback || null;
  }

  /**
   * Determine if the event is a payment event.
   *
   */
  get isPayment(): boolean {
    return (
      !!this._rawEvent.payment && typeof this._rawEvent.payment === 'object'
    );
  }

  /**
   * The payment object from Messenger raw event.
   *
   */
  get payment(): ?Payment {
    return this._rawEvent.payment || null;
  }

  /**
   * Determine if the event is a message read event.
   *
   */
  get isRead(): boolean {
    return !!this._rawEvent.read && typeof this._rawEvent.read === 'object';
  }

  /**
   * Determine if the event is a message delivery event.
   *
   */
  get isDelivery(): boolean {
    return (
      !!this._rawEvent.delivery && typeof this._rawEvent.delivery === 'object'
    );
  }

  /**
   * Determine if the event is a postback or quick reply which includes payload.
   *
   */
  get isPayload(): boolean {
    return (
      (!!this.postback && typeof this.postback.payload === 'string') ||
      (!!this.quickReply && typeof this.quickReply.payload === 'string')
    );
  }

  /**
   * The payload received from postback or quick reply.
   *
   */
  get payload(): ?string {
    if (!!this.postback && this.isPayload) {
      return this.postback.payload;
    } else if (!!this.quickReply && this.isPayload) {
      return this.quickReply.payload;
    }
    return null;
  }

  /**
   * Determine if the event is a policy enforcement event.
   *
   */
  get isPolicyEnforcement(): boolean {
    return (
      !!this._rawEvent['policy-enforcement'] &&
      typeof this._rawEvent['policy-enforcement'] === 'object'
    );
  }

  /**
   * The policy enforcement object from Messenger raw event.
   *
   */
  get policyEnforcement(): ?PolicyEnforcement {
    return this._rawEvent['policy-enforcement'] || null;
  }

  /**
   * Determine if the event is an app roles event.
   *
   */
  get isAppRoles(): boolean {
    return (
      !!this._rawEvent.app_roles && typeof this._rawEvent.app_roles === 'object'
    );
  }

  /**
   * The app roles object from Messenger raw event.
   *
   */
  get appRoles(): ?AppRoles {
    return this._rawEvent.app_roles || null;
  }

  /**
   * Determine if the event is a standby event.
   *
   */
  get isStandby(): boolean {
    return this._isStandby;
  }

  /**
   * Determine if the event is a pass thread control event.
   *
   */
  get isPassThreadControl(): boolean {
    return (
      !!this._rawEvent.pass_thread_control &&
      typeof this._rawEvent.pass_thread_control === 'object'
    );
  }

  /**
   * The pass thread control object from Messenger raw event.
   *
   */
  get passThreadControl(): ?PassThreadControl {
    return this._rawEvent.pass_thread_control || null;
  }

  /**
   * Determine if the event is a take thread control event.
   *
   */
  get isTakeThreadControl(): boolean {
    return (
      !!this._rawEvent.take_thread_control &&
      typeof this._rawEvent.take_thread_control === 'object'
    );
  }

  /**
   * The take thread control object from Messenger raw event.
   *
   */
  get takeThreadControl(): ?TakeThreadControl {
    return this._rawEvent.take_thread_control || null;
  }
}
