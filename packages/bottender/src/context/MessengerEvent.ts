import { Event } from './Event';

export type Sender = {
  id: string,
};

export type Recipient = {
  id: string,
};

type QuickReply = {
  payload: string,
};

type MediaAttachmentPayload = {
  url: string,
};

type LocationAttachmentPayload = {
  coordinates: {
    lat: number,
    long: number,
  },
};

type AttachmentPayload = MediaAttachmentPayload | LocationAttachmentPayload;

type FallbackAttachment = {
  type: 'fallback',
  payload: null,
  title: string,
  URL: string,
};

type MediaAttachment = {
  type: string,
  payload: AttachmentPayload,
};

type Attachment = MediaAttachment | FallbackAttachment;

type Tag = {
  source: string,
};

export type Message = {
  is_echo?: boolean,
  text?: string,
  sticker_id?: number,
  quick_reply?: QuickReply,
  attachments?: Array<Attachment>,
  tags?: Array<Tag>,
};

export type Delivery = {
  mids: Array<string>,
  watermark: number,
  seq: number,
};

export type Read = {
  watermark: number,
  seq: number,
};

export type Referral = {
  ref: string,
  source: string,
  type: string,
  origin_domain?: string,
};

export type Postback = {
  payload: string,
  referral?: Referral,
};

export type GamePlay = {
  game_id: string,
  player_id: string,
  context_type: 'SOLO' | 'THREAD' | 'GROUP',
  context_id: string,
  score: number,
  payload: string,
};

export type Optin = {
  ref: string,
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

export type CheckoutUpdate = {
  payload: string,
  shipping_address: {
    id: number,
    street_1: string,
    street_2: string,
    city: string,
    state: string,
    country: string,
    postal_code: string,
  },
};

export type PreCheckout = {
  payload: string,
  requested_user_info: {
    shipping_address: {
      name: string,
      street_1: string,
      street_2: string,
      city: string,
      state: string,
      country: string,
      postal_code: string,
    },
    contact_name: string,
  },
  amount: {
    currency: string,
    amount: string,
  },
};

export type PolicyEnforcement = {
  action: string,
  reason: string,
};

export type AppRoles = {
  [key: string]: Array<string>,
};

export type PassThreadControl = {
  new_owner_app_id: string,
  metadata: string,
};

export type TakeThreadControl = {
  previous_owner_app_id: string,
  metadata: string,
};

export type RequestThreadControl = {
  requested_owner_app_id: string,
  metadata: string,
};

export type BrandedCamera = {
  content_ids: Array<string>,
  event: string,
};

export type MessengerRawEvent = {
  sender?: Sender,
  recipient?: Recipient,
  timestamp?: number,
  message?: Message,
  read?: Read,
  delivery?: Delivery,
  postback?: Postback,
  game_play?: GamePlay,
  optin?: Optin,
  payment?: Payment,
  checkout_update?: CheckoutUpdate,
  pre_checkout?: PreCheckout,
  'policy-enforcement'?: PolicyEnforcement,
  app_roles?: AppRoles,
  pass_thread_control?: PassThreadControl,
  take_thread_control?: TakeThreadControl,
  request_thread_control?: RequestThreadControl,
  referral?: Referral,
  branded_camera?: BrandedCamera,
};

type MessengerEventOptions = {
  isStandby?: boolean,
  pageId?: ?string,
};

export default class MessengerEvent implements Event {
  _rawEvent: MessengerRawEvent;

  _isStandby: boolean;

  _pageId: ?string;

  constructor(
    rawEvent: MessengerRawEvent,
    options: MessengerEventOptions = {}
  ) {
    this._rawEvent = rawEvent;
    this._isStandby = options.isStandby || false;
    this._pageId = options.pageId;
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
  get isText(): boolean {
    return this.isMessage && typeof (this.message as any).text === 'string';
  }

  /**
   * The text string from Messenger raw event.
   *
   */
  get text(): ?string {
    if (this.isText) {
      return (this.message as any).text;
    }
    return null;
  }

  /**
   * Determine if the event has any attachments.
   *
   */
  get hasAttachment(): boolean {
    return (
      this.isMessage &&
      !!(this.message as any).attachments &&
      (this.message as any).attachments.length > 0
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
  get isImage(): boolean {
    return this.hasAttachment && (this.attachments as any)[0].type === 'image';
  }

  /**
   * The image attachment from Messenger raw event.
   *
   */
  get image(): ?MediaAttachmentPayload {
    return this.isImage ? (this.attachments as any)[0].payload : null;
  }

  /**
   * Determine if the event is a message event which includes audio attachment.
   *
   */
  get isAudio(): boolean {
    return this.hasAttachment && (this.attachments as any)[0].type === 'audio';
  }

  /**
   * The audio attachment from Messenger raw event.
   *
   */
  get audio(): ?MediaAttachmentPayload {
    return this.isAudio ? (this.attachments as any)[0].payload : null;
  }

  /**
   * Determine if the event is a message event which includes video attachment.
   *
   */
  get isVideo(): boolean {
    return this.hasAttachment && (this.attachments as any)[0].type === 'video';
  }

  /**
   * The video attachment from Messenger raw event.
   *
   */
  get video(): ?MediaAttachmentPayload {
    return this.isVideo ? (this.attachments as any)[0].payload : null;
  }

  /**
   * Determine if the event is a message event which includes location attachment.
   *
   */
  get isLocation(): boolean {
    return this.hasAttachment && (this.attachments as any)[0].type === 'location';
  }

  /**
   * The location attachment from Messenger raw event.
   *
   */
  get location(): ?LocationAttachmentPayload {
    return this.isLocation ? (this.attachments as any)[0].payload : null;
  }

  /**
   * Determine if the event is a message event which includes file attachment.
   *
   */
  get isFile(): boolean {
    return this.hasAttachment && (this.attachments as any)[0].type === 'file';
  }

  /**
   * The file attachment from Messenger raw event.
   *
   */
  get file(): ?MediaAttachmentPayload {
    return this.isFile ? (this.attachments as any)[0].payload : null;
  }

  /**
   * Determine if the event is a message event which includes fallback attachment.
   *
   */
  get isFallback(): boolean {
    return this.hasAttachment && (this.attachments as any)[0].type === 'fallback';
  }

  /**
   * The fallback attachment from Messenger raw event.
   *
   */
  get fallback(): ?FallbackAttachment {
    return this.isFallback ? (this.attachments as any)[0] : null;
  }

  /**
   * Determine if the event is a message event which includes sticker.
   *
   */
  get isSticker(): boolean {
    return this.isMessage && typeof (this.message as any).sticker_id === 'number';
  }

  /**
   * The sticker_id from Messenger raw event.
   *
   */
  get sticker(): ?string {
    return this.isSticker ? (this.message as any).sticker_id : null;
  }

  /**
   * Determine if the event is a message event which includes 'like' sticker.
   * id 369239263222822 is a small like sticker
   * id 369239263222814 is a large like sticker
   * id 369239263222810 is a huge like sticker
   */
  get isLikeSticker(): boolean {
    return (
      this.isSticker &&
      ((this.message as any).sticker_id === 369239263222822 ||
        (this.message as any).sticker_id === 369239343222814 ||
        (this.message as any).sticker_id === 369239383222810)
    );
  }

  /**
   * Determine if the event is a message event triggered from quick reply.
   *
   */
  get isQuickReply(): boolean {
    return (
      this.isMessage &&
      !!(this.message as any).quick_reply &&
      typeof (this.message as any).quick_reply === 'object'
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
    return this.isMessage && !!(this.message as any).is_echo;
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
   * Determine if the event is a game_play event.
   *
   */
  get isGamePlay(): boolean {
    return (
      !!this._rawEvent.game_play && typeof this._rawEvent.game_play === 'object'
    );
  }

  /**
   * The game_play object from Messenger raw event.
   *
   */
  get gamePlay(): ?GamePlay {
    if (!this.isGamePlay) {
      return null;
    }

    const rawGamePlay = (this._rawEvent as any).game_play;

    let payload;
    try {
      payload = JSON.parse(rawGamePlay.payload);
    } catch (e) {
      payload = rawGamePlay.payload;
    }

    return {
      ...rawGamePlay,
      payload,
    };
  }

  /**
   * Determine if the event is an opt-in event.
   *
   */
  get isOptin(): boolean {
    return !!this._rawEvent.optin && typeof this._rawEvent.optin === 'object';
  }

  /**
   * The optin object from Messenger raw event.
   *
   */
  get optin(): ?Optin {
    return this._rawEvent.optin || null;
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
   * Determine if the event is a checkout update event.
   *
   */
  get isCheckoutUpdate(): boolean {
    return (
      !!this._rawEvent.checkout_update &&
      typeof this._rawEvent.checkout_update === 'object'
    );
  }

  /**
   * The checkout_update object from Messenger raw event.
   *
   */
  get checkoutUpdate(): ?CheckoutUpdate {
    return this._rawEvent.checkout_update || null;
  }

  /**
   * Determine if the event is a pre-checkout event.
   *
   */
  get isPreCheckout(): boolean {
    return (
      !!this._rawEvent.pre_checkout &&
      typeof this._rawEvent.pre_checkout === 'object'
    );
  }

  /**
   * The pre_checkout object from Messenger raw event.
   *
   */
  get preCheckout(): ?PreCheckout {
    return this._rawEvent.pre_checkout || null;
  }

  /**
   * Determine if the event is a message read event.
   *
   */
  get isRead(): boolean {
    return !!this._rawEvent.read && typeof this._rawEvent.read === 'object';
  }

  /**
   * The read object from Messenger raw event.
   *
   */
  get read(): ?Read {
    return this.isRead ? this._rawEvent.read : null;
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
   * The delivery object from Messenger raw event.
   *
   */
  get delivery(): ?Delivery {
    return this.isDelivery ? this._rawEvent.delivery : null;
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
    }
    if (!!this.quickReply && this.isPayload) {
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

  /**
   * Determine if the event is a request thread control event.
   *
   */
  get isRequestThreadControl(): boolean {
    return (
      !!this._rawEvent.request_thread_control &&
      typeof this._rawEvent.request_thread_control === 'object'
    );
  }

  /**
   * Determine if the event is a request thread control event sent by facebook integrated 'Page Inbox' (appId is 263902037430900).
   *
   */
  get isRequestThreadControlFromPageInbox(): boolean {
    return (
      !!this._rawEvent.request_thread_control &&
      typeof this._rawEvent.request_thread_control === 'object' &&
      this._rawEvent.request_thread_control.requested_owner_app_id ===
        263902037430900
    );
  }

  /**
   * The take thread control object from Messenger raw event.
   *
   */
  get requestThreadControl(): ?RequestThreadControl {
    return this._rawEvent.request_thread_control || null;
  }

  /**
   * Determine if the event is from customer chat plugin.
   *
   */
  get isFromCustomerChatPlugin(): boolean {
    const isMessageFromCustomerChatPlugin = !!(
      this.isMessage &&
      !!(this.message as any).tags &&
      (this.message as any).tags.length !== 0 &&
      (this.message as any).tags.some(
        tag => tag.source === 'customer_chat_plugin'
      )
    );

    const isReferralFromCustomerChatPlugin = !!(
      this.isReferral &&
      this.referral &&
      this.referral.source === 'CUSTOMER_CHAT_PLUGIN'
    );

    return isMessageFromCustomerChatPlugin || isReferralFromCustomerChatPlugin;
  }

  /**
   * Determine if the event is a referral event.
   *
   */
  get isReferral(): boolean {
    return !!(
      this._rawEvent.referral ||
      (this._rawEvent.postback && this._rawEvent.postback.referral)
    );
  }

  /**
   * The referral object from Messenger event.
   *
   */
  get referral(): ?Referral {
    if (!this.isReferral) {
      return null;
    }
    return (
      this._rawEvent.referral ||
      (this._rawEvent.postback && this._rawEvent.postback.referral)
    );
  }

  /**
   * The ref string from Messenger event.
   *
   */
  get ref(): ?string {
    if (!this.isReferral) {
      return null;
    }
    return this.referral && this.referral.ref;
  }

  /**
   * The pageId of the Page where this Messenger event is happening on.
   *
   */
  get pageId(): ?string {
    return this._pageId || null;
  }

  /**
   * Determine if the event is a branded_camera event.
   *
   */
  get isBrandedCamera(): boolean {
    return (
      !!this._rawEvent.branded_camera &&
      typeof this._rawEvent.branded_camera === 'object'
    );
  }

  /**
   * The branded_camera object from Messenger event.
   *
   */
  get brandedCamera(): ?BrandedCamera {
    if (!this.isBrandedCamera) {
      return null;
    }
    return this._rawEvent.branded_camera;
  }
}
