import { camelcaseKeysDeep } from 'messaging-api-common';

import { Event } from '../context/Event';

export type Sender = {
  id: string;
};

export type Recipient = {
  id: string;
};

type QuickReply = {
  payload: string;
};

type MediaAttachmentPayload = {
  url: string;
};

type LocationAttachmentPayload = {
  coordinates: {
    lat: number;
    long: number;
  };
};

type AttachmentPayload = MediaAttachmentPayload | LocationAttachmentPayload;

type FallbackAttachment = {
  type: 'fallback';
  payload: null;
  title: string;
  URL: string;
};

type MediaAttachment = {
  type: string;
  payload: AttachmentPayload;
};

type Attachment = MediaAttachment | FallbackAttachment;

type Tag = {
  source: string;
};

export type Message = {
  isEcho?: boolean;
  text?: string;
  stickerId?: number;
  quickReply?: QuickReply;
  attachments?: Attachment[];
  tags?: Tag[];
};

export type Delivery = {
  mids: string[];
  watermark: number;
  seq: number;
};

export type Read = {
  watermark: number;
  seq: number;
};

export type Referral = {
  ref: string;
  source: string;
  type: string;
  originDomain?: string;
};

export type Postback = {
  payload: string;
  referral?: Referral;
};

export type GamePlay = {
  gameId: string;
  playerId: string;
  contextType: 'SOLO' | 'THREAD' | 'GROUP';
  contextId: string;
  score: number;
  payload: string;
};

export type Optin = {
  ref: string;
};

export type Payment = {
  payload: string;
  requestedUserInfo: Record<string, any>;
  paymentCredential: Record<string, any>;
  amount: {
    currency: string;
    amount: string;
  };
  shippingOptionId: string;
};

export type CheckoutUpdate = {
  payload: string;
  shippingAddress: {
    id: number;
    street1: string;
    street2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
};

export type PreCheckout = {
  payload: string;
  requestedUserInfo: {
    shippingAddress: {
      name: string;
      street1: string;
      street2: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
    contactName: string;
  };
  amount: {
    currency: string;
    amount: string;
  };
};

export type PolicyEnforcement = {
  action: string;
  reason: string;
};

export type AppRoles = Record<string, string[]>;

export type PassThreadControl = {
  newOwnerAppId: string;
  metadata: string;
};

export type TakeThreadControl = {
  previousOwnerAppId: string;
  metadata: string;
};

export type RequestThreadControl = {
  requestedOwnerAppId: number;
  metadata: string;
};

export type BrandedCamera = {
  contentIds: string[];
  event: string;
};

export type MessengerRawEvent = {
  sender?: Sender;
  recipient?: Recipient;
  timestamp?: number;
  message?: Message;
  read?: Read;
  delivery?: Delivery;
  postback?: Postback;
  gamePlay?: GamePlay;
  optin?: Optin;
  payment?: Payment;
  checkoutUpdate?: CheckoutUpdate;
  preCheckout?: PreCheckout;
  'policy-enforcement'?: PolicyEnforcement;
  appRoles?: AppRoles;
  passThreadControl?: PassThreadControl;
  takeThreadControl?: TakeThreadControl;
  requestThreadControl?: RequestThreadControl;
  referral?: Referral;
  brandedCamera?: BrandedCamera;
};

type MessengerEventOptions = {
  isStandby?: boolean;
  pageId?: string | null;
};

export default class MessengerEvent implements Event<MessengerRawEvent> {
  _rawEvent: MessengerRawEvent;

  _isStandby: boolean;

  _pageId: string | null;

  constructor(
    rawEvent: MessengerRawEvent,
    options: MessengerEventOptions = {}
  ) {
    this._rawEvent = rawEvent;
    this._isStandby = options.isStandby || false;
    this._pageId = options.pageId || null;
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
  get message(): Message | null {
    return this._rawEvent.message || null;
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
  get text(): string | null {
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
  get attachments(): Attachment[] | null {
    if (this.message && this.message.attachments) {
      return this.message.attachments;
    }
    return null;
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
  get image(): MediaAttachmentPayload | null {
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
  get audio(): MediaAttachmentPayload | null {
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
  get video(): MediaAttachmentPayload | null {
    return this.isVideo ? (this.attachments as any)[0].payload : null;
  }

  /**
   * Determine if the event is a message event which includes location attachment.
   *
   */
  get isLocation(): boolean {
    return (
      this.hasAttachment && (this.attachments as any)[0].type === 'location'
    );
  }

  /**
   * The location attachment from Messenger raw event.
   *
   */
  get location(): LocationAttachmentPayload | null {
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
  get file(): MediaAttachmentPayload | null {
    return this.isFile ? (this.attachments as any)[0].payload : null;
  }

  /**
   * Determine if the event is a message event which includes fallback attachment.
   *
   */
  get isFallback(): boolean {
    return (
      this.hasAttachment && (this.attachments as any)[0].type === 'fallback'
    );
  }

  /**
   * The fallback attachment from Messenger raw event.
   *
   */
  get fallback(): FallbackAttachment | null {
    return this.isFallback ? (this.attachments as any)[0] : null;
  }

  /**
   * Determine if the event is a message event which includes sticker.
   *
   */
  get isSticker(): boolean {
    return (
      this.isMessage && typeof (this.message as any).stickerId === 'number'
    );
  }

  /**
   * The stickerId from Messenger raw event.
   *
   */
  get sticker(): string | null {
    return this.isSticker ? (this.message as any).stickerId : null;
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
      ((this.message as any).stickerId === 369239263222822 ||
        (this.message as any).stickerId === 369239343222814 ||
        (this.message as any).stickerId === 369239383222810)
    );
  }

  /**
   * Determine if the event is a message event triggered from quick reply.
   *
   */
  get isQuickReply(): boolean {
    return (
      this.isMessage &&
      !!(this.message as any).quickReply &&
      typeof (this.message as any).quickReply === 'object'
    );
  }

  /**
   * The quick reply object from Messenger raw event.
   *
   */
  get quickReply(): QuickReply | null {
    if (this.message && this.message.quickReply) {
      return this.message.quickReply;
    }
    return null;
  }

  /**
   * Determine if the event is a message event sent from our side.
   *
   */
  get isEcho(): boolean {
    return this.isMessage && !!(this.message as any).isEcho;
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
  get postback(): Postback | null {
    return this._rawEvent.postback || null;
  }

  /**
   * Determine if the event is a game_play event.
   *
   */
  get isGamePlay(): boolean {
    return (
      !!this._rawEvent.gamePlay && typeof this._rawEvent.gamePlay === 'object'
    );
  }

  /**
   * The gamePlay object from Messenger raw event.
   *
   */
  get gamePlay(): GamePlay | null {
    if (!this.isGamePlay) {
      return null;
    }

    const rawGamePlay = (this._rawEvent as any).gamePlay;

    let payload;
    try {
      const parsed = JSON.parse(rawGamePlay.payload);
      payload =
        parsed && typeof parsed === 'object'
          ? camelcaseKeysDeep(parsed)
          : parsed;
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
  get optin(): Optin | null {
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
  get payment(): Payment | null {
    return this._rawEvent.payment || null;
  }

  /**
   * Determine if the event is a checkout update event.
   *
   */
  get isCheckoutUpdate(): boolean {
    return (
      !!this._rawEvent.checkoutUpdate &&
      typeof this._rawEvent.checkoutUpdate === 'object'
    );
  }

  /**
   * The checkoutUpdate object from Messenger raw event.
   *
   */
  get checkoutUpdate(): CheckoutUpdate | null {
    return this._rawEvent.checkoutUpdate || null;
  }

  /**
   * Determine if the event is a pre-checkout event.
   *
   */
  get isPreCheckout(): boolean {
    return (
      !!this._rawEvent.preCheckout &&
      typeof this._rawEvent.preCheckout === 'object'
    );
  }

  /**
   * The preCheckout object from Messenger raw event.
   *
   */
  get preCheckout(): PreCheckout | null {
    return this._rawEvent.preCheckout || null;
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
  get read(): Read | null {
    return this.isRead ? (this._rawEvent as any).read : null;
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
  get delivery(): Delivery | null {
    return this.isDelivery ? (this._rawEvent as any).delivery : null;
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
  get payload(): string | null {
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
  get policyEnforcement(): PolicyEnforcement | null {
    return this._rawEvent['policy-enforcement'] || null;
  }

  /**
   * Determine if the event is an app roles event.
   *
   */
  get isAppRoles(): boolean {
    return (
      !!this._rawEvent.appRoles && typeof this._rawEvent.appRoles === 'object'
    );
  }

  /**
   * The app roles object from Messenger raw event.
   *
   */
  get appRoles(): AppRoles | null {
    return this._rawEvent.appRoles || null;
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
      !!this._rawEvent.passThreadControl &&
      typeof this._rawEvent.passThreadControl === 'object'
    );
  }

  /**
   * The pass thread control object from Messenger raw event.
   *
   */
  get passThreadControl(): PassThreadControl | null {
    return this._rawEvent.passThreadControl || null;
  }

  /**
   * Determine if the event is a take thread control event.
   *
   */
  get isTakeThreadControl(): boolean {
    return (
      !!this._rawEvent.takeThreadControl &&
      typeof this._rawEvent.takeThreadControl === 'object'
    );
  }

  /**
   * The take thread control object from Messenger raw event.
   *
   */
  get takeThreadControl(): TakeThreadControl | null {
    return this._rawEvent.takeThreadControl || null;
  }

  /**
   * Determine if the event is a request thread control event.
   *
   */
  get isRequestThreadControl(): boolean {
    return (
      !!this._rawEvent.requestThreadControl &&
      typeof this._rawEvent.requestThreadControl === 'object'
    );
  }

  /**
   * Determine if the event is a request thread control event sent by facebook integrated 'Page Inbox' (appId is 263902037430900).
   *
   */
  get isRequestThreadControlFromPageInbox(): boolean {
    return (
      !!this._rawEvent.requestThreadControl &&
      typeof this._rawEvent.requestThreadControl === 'object' &&
      this._rawEvent.requestThreadControl.requestedOwnerAppId ===
        263902037430900
    );
  }

  /**
   * The take thread control object from Messenger raw event.
   *
   */
  get requestThreadControl(): RequestThreadControl | null {
    return this._rawEvent.requestThreadControl || null;
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
        (tag: any) => tag.source === 'customer_chat_plugin'
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
  get referral(): Referral | null {
    if (!this.isReferral) {
      return null;
    }
    return (
      this._rawEvent.referral ||
      (this._rawEvent.postback && this._rawEvent.postback.referral) ||
      null
    );
  }

  /**
   * The ref string from Messenger event.
   *
   */
  get ref(): string | null {
    if (!this.isReferral) {
      return null;
    }
    return this.referral && this.referral.ref;
  }

  /**
   * The pageId of the Page where this Messenger event is happening on.
   *
   */
  get pageId(): string | null {
    return this._pageId || null;
  }

  /**
   * Determine if the event is a branded_camera event.
   *
   */
  get isBrandedCamera(): boolean {
    return (
      !!this._rawEvent.brandedCamera &&
      typeof this._rawEvent.brandedCamera === 'object'
    );
  }

  /**
   * The brandedCamera object from Messenger event.
   *
   */
  get brandedCamera(): BrandedCamera | null {
    if (!this.isBrandedCamera) {
      return null;
    }
    return (this._rawEvent as any).brandedCamera;
  }
}
