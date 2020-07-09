import { camelcaseKeysDeep } from 'messaging-api-common';

import { Event } from '../context/Event';

import {
  EventAccountLinking,
  EventAppRoles,
  EventBrandedCamera,
  EventCheckoutUpdate,
  EventDelivery,
  EventGamePlay,
  EventMessage,
  EventMessageAttachment,
  EventMessageQuickReply,
  EventOptin,
  EventPassThreadControl,
  EventPayment,
  EventPolicyEnforcement,
  EventPostback,
  EventPreCheckout,
  EventReaction,
  EventRead,
  EventReferral,
  EventRequestThreadControl,
  EventTakeThreadControl,
  FallbackAttachment,
  LocationAttachmentPayload,
  MediaAttachmentPayload,
  MessengerEventOptions,
  MessengerRawEvent,
} from './MessengerTypes';

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
      'message' in this._rawEvent && typeof this._rawEvent.message === 'object'
    );
  }

  /**
   * The message object from Messenger raw event.
   *
   */
  get message(): EventMessage | null {
    if ('message' in this._rawEvent) {
      return this._rawEvent.message;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return this.isMessage && typeof this.message!.text === 'string';
  }

  /**
   * The text string from Messenger raw event.
   *
   */
  get text(): string | null {
    if (this.isText) {
      return this.message!.text || null;
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
      !!this.message!.attachments &&
      this.message!.attachments.length > 0
    );
  }

  /**
   * The attachments array from Messenger raw event.
   *
   */
  get attachments(): EventMessageAttachment[] | null {
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
    return this.hasAttachment && this.attachments![0].type === 'image';
  }

  /**
   * The image attachment from Messenger raw event.
   *
   */
  get image(): MediaAttachmentPayload | null {
    if (!this.hasAttachment) {
      return null;
    }
    const attachment = this.attachments![0];

    if (attachment.type === 'image') {
      return attachment.payload;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes audio attachment.
   *
   */
  get isAudio(): boolean {
    return this.hasAttachment && this.attachments![0].type === 'audio';
  }

  /**
   * The audio attachment from Messenger raw event.
   *
   */
  get audio(): MediaAttachmentPayload | null {
    if (!this.hasAttachment) {
      return null;
    }
    const attachment = this.attachments![0];

    if (attachment.type === 'audio') {
      return attachment.payload;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes video attachment.
   *
   */
  get isVideo(): boolean {
    return this.hasAttachment && this.attachments![0].type === 'video';
  }

  /**
   * The video attachment from Messenger raw event.
   *
   */
  get video(): MediaAttachmentPayload | null {
    if (!this.hasAttachment) {
      return null;
    }
    const attachment = this.attachments![0];

    if (attachment.type === 'video') {
      return attachment.payload;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes location attachment.
   *
   */
  get isLocation(): boolean {
    return this.hasAttachment && this.attachments![0].type === 'location';
  }

  /**
   * The location attachment from Messenger raw event.
   *
   */
  get location(): LocationAttachmentPayload | null {
    if (!this.hasAttachment) {
      return null;
    }
    const attachment = this.attachments![0];

    if (attachment.type === 'location') {
      return attachment.payload;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes file attachment.
   *
   */
  get isFile(): boolean {
    return this.hasAttachment && this.attachments![0].type === 'file';
  }

  /**
   * The file attachment from Messenger raw event.
   *
   */
  get file(): MediaAttachmentPayload | null {
    if (!this.hasAttachment) {
      return null;
    }
    const attachment = this.attachments![0];

    if (attachment.type === 'file') {
      return attachment.payload;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes fallback attachment.
   *
   */
  get isFallback(): boolean {
    return this.hasAttachment && this.attachments![0].type === 'fallback';
  }

  /**
   * The fallback attachment from Messenger raw event.
   *
   */
  get fallback(): FallbackAttachment | null {
    if (!this.hasAttachment) {
      return null;
    }
    const attachment = this.attachments![0];

    if (attachment.type === 'fallback') {
      return attachment;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes sticker.
   *
   */
  get isSticker(): boolean {
    return this.isMessage && typeof this.message!.stickerId === 'number';
  }

  /**
   * The stickerId from Messenger raw event.
   *
   */
  get sticker(): number | null {
    if (this.isSticker) {
      return this.message!.stickerId || null;
    }
    return null;
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
      (this.message!.stickerId === 369239263222822 ||
        this.message!.stickerId === 369239343222814 ||
        this.message!.stickerId === 369239383222810)
    );
  }

  /**
   * Determine if the event is a message event triggered from quick reply.
   *
   */
  get isQuickReply(): boolean {
    return (
      this.isMessage &&
      !!this.message!.quickReply &&
      typeof this.message!.quickReply === 'object'
    );
  }

  /**
   * The quick reply object from Messenger raw event.
   *
   */
  get quickReply(): EventMessageQuickReply | null {
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
    return this.isMessage && !!this.message!.isEcho;
  }

  /**
   * Determine if the event is a postback event.
   *
   */
  get isPostback(): boolean {
    return (
      'postback' in this._rawEvent &&
      typeof this._rawEvent.postback === 'object'
    );
  }

  /**
   * The postback object from Messenger raw event.
   *
   */
  get postback(): EventPostback | null {
    if ('postback' in this._rawEvent) {
      return this._rawEvent.postback;
    }
    return null;
  }

  /**
   * Determine if the event is a game_play event.
   *
   */
  get isGamePlay(): boolean {
    return (
      'gamePlay' in this._rawEvent &&
      typeof this._rawEvent.gamePlay === 'object'
    );
  }

  /**
   * The gamePlay object from Messenger raw event.
   *
   */
  get gamePlay(): EventGamePlay | null {
    if (!('gamePlay' in this._rawEvent)) {
      return null;
    }

    const rawGamePlay = this._rawEvent.gamePlay;

    let payload;
    try {
      const parsed = JSON.parse(rawGamePlay.payload);
      payload =
        parsed && typeof parsed === 'object'
          ? camelcaseKeysDeep(parsed)
          : parsed;
    } catch (err) {
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
    return (
      'optin' in this._rawEvent && typeof this._rawEvent.optin === 'object'
    );
  }

  /**
   * The optin object from Messenger raw event.
   *
   */
  get optin(): EventOptin | null {
    if ('optin' in this._rawEvent) {
      return this._rawEvent.optin;
    }
    return null;
  }

  /**
   * Determine if the event is a payment event.
   *
   */
  get isPayment(): boolean {
    return (
      'payment' in this._rawEvent && typeof this._rawEvent.payment === 'object'
    );
  }

  /**
   * The payment object from Messenger raw event.
   *
   */
  get payment(): EventPayment | null {
    if ('payment' in this._rawEvent) {
      return this._rawEvent.payment;
    }
    return null;
  }

  /**
   * Determine if the event is a checkout update event.
   *
   */
  get isCheckoutUpdate(): boolean {
    return (
      'checkoutUpdate' in this._rawEvent &&
      typeof this._rawEvent.checkoutUpdate === 'object'
    );
  }

  /**
   * The checkoutUpdate object from Messenger raw event.
   *
   */
  get checkoutUpdate(): EventCheckoutUpdate | null {
    if ('checkoutUpdate' in this._rawEvent) {
      return this._rawEvent.checkoutUpdate;
    }
    return null;
  }

  /**
   * Determine if the event is a pre-checkout event.
   *
   */
  get isPreCheckout(): boolean {
    return (
      'preCheckout' in this._rawEvent &&
      typeof this._rawEvent.preCheckout === 'object'
    );
  }

  /**
   * The preCheckout object from Messenger raw event.
   *
   */
  get preCheckout(): EventPreCheckout | null {
    if ('preCheckout' in this._rawEvent) {
      return this._rawEvent.preCheckout;
    }
    return null;
  }

  /**
   * Determine if the event is a message read event.
   *
   */
  get isRead(): boolean {
    return 'read' in this._rawEvent && typeof this._rawEvent.read === 'object';
  }

  /**
   * The read object from Messenger raw event.
   *
   */
  get read(): EventRead | null {
    if ('read' in this._rawEvent) {
      return this._rawEvent.read;
    }
    return null;
  }

  /**
   * Determine if the event is a message delivery event.
   *
   */
  get isDelivery(): boolean {
    return (
      'delivery' in this._rawEvent &&
      typeof this._rawEvent.delivery === 'object'
    );
  }

  /**
   * The delivery object from Messenger raw event.
   *
   */
  get delivery(): EventDelivery | null {
    if ('delivery' in this._rawEvent) {
      return this._rawEvent.delivery;
    }
    return null;
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
      return this.postback.payload || null;
    }
    if (!!this.quickReply && this.isPayload) {
      return this.quickReply.payload || null;
    }
    return null;
  }

  /**
   * Determine if the event is a policy enforcement event.
   *
   */
  get isPolicyEnforcement(): boolean {
    return (
      'policy-enforcement' in this._rawEvent &&
      typeof this._rawEvent['policy-enforcement'] === 'object'
    );
  }

  /**
   * The policy enforcement object from Messenger raw event.
   *
   */
  get policyEnforcement(): EventPolicyEnforcement | null {
    if ('policy-enforcement' in this._rawEvent) {
      return this._rawEvent['policy-enforcement'];
    }
    return null;
  }

  /**
   * Determine if the event is an app roles event.
   *
   */
  get isAppRoles(): boolean {
    return (
      'appRoles' in this._rawEvent &&
      typeof this._rawEvent.appRoles === 'object'
    );
  }

  /**
   * The app roles object from Messenger raw event.
   *
   */
  get appRoles(): EventAppRoles | null {
    if ('appRoles' in this._rawEvent) {
      return this._rawEvent.appRoles;
    }
    return null;
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
      'passThreadControl' in this._rawEvent &&
      typeof this._rawEvent.passThreadControl === 'object'
    );
  }

  /**
   * The pass thread control object from Messenger raw event.
   *
   */
  get passThreadControl(): EventPassThreadControl | null {
    if ('passThreadControl' in this._rawEvent) {
      return this._rawEvent.passThreadControl;
    }
    return null;
  }

  /**
   * Determine if the event is a take thread control event.
   *
   */
  get isTakeThreadControl(): boolean {
    return (
      'takeThreadControl' in this._rawEvent &&
      typeof this._rawEvent.takeThreadControl === 'object'
    );
  }

  /**
   * The take thread control object from Messenger raw event.
   *
   */
  get takeThreadControl(): EventTakeThreadControl | null {
    if ('takeThreadControl' in this._rawEvent) {
      return this._rawEvent.takeThreadControl;
    }
    return null;
  }

  /**
   * Determine if the event is a request thread control event.
   *
   */
  get isRequestThreadControl(): boolean {
    return (
      'requestThreadControl' in this._rawEvent &&
      typeof this._rawEvent.requestThreadControl === 'object'
    );
  }

  /**
   * Determine if the event is a request thread control event sent by facebook integrated 'Page Inbox' (appId is 263902037430900).
   *
   */
  get isRequestThreadControlFromPageInbox(): boolean {
    return (
      'requestThreadControl' in this._rawEvent &&
      typeof this._rawEvent.requestThreadControl === 'object' &&
      this._rawEvent.requestThreadControl.requestedOwnerAppId ===
        263902037430900
    );
  }

  /**
   * The take thread control object from Messenger raw event.
   *
   */
  get requestThreadControl(): EventRequestThreadControl | null {
    if ('requestThreadControl' in this._rawEvent) {
      return this._rawEvent.requestThreadControl;
    }
    return null;
  }

  /**
   * Determine if the event is from customer chat plugin.
   *
   */
  get isFromCustomerChatPlugin(): boolean {
    const isMessageFromCustomerChatPlugin = !!(
      this.isMessage &&
      'tags' in this.message! &&
      this.message!.tags!.length !== 0 &&
      this.message!.tags!.some((tag) => tag.source === 'customer_chat_plugin')
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
      'referral' in this._rawEvent ||
      ('postback' in this._rawEvent && this._rawEvent.postback.referral)
    );
  }

  /**
   * The referral object from Messenger event.
   *
   */
  get referral(): EventReferral | null {
    if (!this.isReferral) {
      return null;
    }
    if ('referral' in this._rawEvent) {
      return this._rawEvent.referral;
    }
    if ('postback' in this._rawEvent && 'referral' in this._rawEvent.postback) {
      return this._rawEvent.postback.referral || null;
    }
    return null;
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
      'brandedCamera' in this._rawEvent &&
      typeof this._rawEvent.brandedCamera === 'object'
    );
  }

  /**
   * The brandedCamera object from Messenger event.
   *
   */
  get brandedCamera(): EventBrandedCamera | null {
    if ('brandedCamera' in this._rawEvent) {
      return this._rawEvent.brandedCamera;
    }
    return null;
  }

  /**
   * Determine if the event is a account_linking event.
   *
   */
  get isAccountLinking(): boolean {
    return (
      'accountLinking' in this._rawEvent &&
      typeof this._rawEvent.accountLinking === 'object'
    );
  }

  /**
   * The accountLinking object from Messenger event.
   *
   */
  get accountLinking(): EventAccountLinking | null {
    if ('accountLinking' in this._rawEvent) {
      return this._rawEvent.accountLinking;
    }
    return null;
  }

  /**
   * Determine if the event is a reaction event.
   *
   */
  get isReaction(): boolean {
    return (
      'reaction' in this._rawEvent &&
      typeof this._rawEvent.reaction === 'object'
    );
  }

  /**
   * The reaction object from Messenger event.
   *
   */
  get reaction(): EventReaction | null {
    if ('reaction' in this._rawEvent) {
      return this._rawEvent.reaction;
    }
    return null;
  }
}
