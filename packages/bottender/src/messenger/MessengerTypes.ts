import { RequestContext } from '../types';

export * from 'messaging-api-messenger/dist/MessengerTypes';

export { MessengerConnectorOptions } from './MessengerConnector';
export { FacebookBaseConnectorOptions } from './FacebookBaseConnector';
export { MessengerContextOptions } from './MessengerContext';

export type EventSender = {
  id: string;
};

export type EventRecipient = {
  id: string;
};

export type EventMessageQuickReply = {
  payload: string;
};

export type MediaAttachmentPayload = {
  url: string;
};

export type LocationAttachmentPayload = {
  coordinates: {
    lat: number;
    long: number;
  };
};

export type FallbackAttachment = {
  type: 'fallback';
  payload: null;
  title: string;
  URL: string;
};

export type EventMessageAttachment =
  | {
      type: 'audio' | 'video' | 'image' | 'file';
      payload: MediaAttachmentPayload;
    }
  | {
      type: 'location';
      payload: LocationAttachmentPayload;
    }
  | FallbackAttachment;

type EventMessageTag = {
  source: string;
};

type EventMessageReplyTo = {
  mid: string;
};

export type EventMessage = {
  mid: string;
  isEcho?: boolean;
  text?: string;
  stickerId?: number;
  quickReply?: EventMessageQuickReply;
  attachments?: EventMessageAttachment[];
  tags?: EventMessageTag[];
  replyTo?: EventMessageReplyTo;
  appId?: number;
  metadata?: string;
};

export type EventDelivery = {
  mids: string[];
  watermark: number;
};

export type EventRead = {
  watermark: number;
};

export type EventReferral = {
  ref: string;
  source: string;
  type: string;
  originDomain?: string;
};

export type EventPostback = {
  title: string;
  payload?: string;
  referral?: EventReferral;
};

export type EventGamePlay = {
  gameId: string;
  playerId: string;
  contextType: 'SOLO' | 'THREAD' | 'GROUP';
  contextId: string;
  score: number;
  payload: string;
};

export type EventOptin =
  | {
      ref: string;
      userRef?: string;
    }
  | {
      type: 'one_time_notif_req';
      payload: string;
      oneTimeNotifToken: string;
    };

export type EventPayment = {
  payload: string;
  requestedUserInfo: Record<string, any>;
  paymentCredential: Record<string, any>;
  amount: {
    currency: string;
    amount: string;
  };
  shippingOptionId: string;
};

export type EventCheckoutUpdate = {
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

export type EventPreCheckout = {
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

export type EventPolicyEnforcement = {
  action: string;
  reason: string;
};

export type EventAppRoles = Record<string, string[]>;

export type EventPassThreadControl = {
  newOwnerAppId: string;
  metadata: string;
};

export type EventTakeThreadControl = {
  previousOwnerAppId: string;
  metadata: string;
};

export type EventRequestThreadControl = {
  requestedOwnerAppId: number;
  metadata: string;
};

export type EventBrandedCamera = {
  contentIds: string[];
  event: string;
};

export type EventAccountLinking =
  | { status: 'linked'; authorizationCode: string }
  | { status: 'unlinked' };

export type EventReaction = {
  reaction:
    | 'smile'
    | 'angry'
    | 'sad'
    | 'wow'
    | 'love'
    | 'like'
    | 'dislike'
    | 'other';
  emoji: string;
  action: 'react' | 'unreact';
  mid: string;
};

export type MessengerRawEvent =
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      message: EventMessage;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      delivery: EventDelivery;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      read: EventRead;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      postback: EventPostback;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      accountLinking: EventAccountLinking;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      gamePlay: EventGamePlay;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      optin: EventOptin;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      referral: EventReferral;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      payment: EventPayment;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      checkoutUpdate: EventCheckoutUpdate;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      preCheckout: EventPreCheckout;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      passThreadControl: EventPassThreadControl;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      takeThreadControl: EventTakeThreadControl;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      requestThreadControl: EventRequestThreadControl;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      brandedCamera: EventBrandedCamera;
    }
  | {
      sender: EventSender;
      recipient: EventRecipient;
      timestamp: number;
      reaction: EventReaction;
    }
  | {
      recipient: EventRecipient;
      timestamp: number;
      appRoles: EventAppRoles;
    }
  | {
      recipient: EventRecipient;
      timestamp: number;
      'policy-enforcement': EventPolicyEnforcement;
    };

export type MessengerEventOptions = {
  isStandby?: boolean;
  pageId?: string | null;
};

export type MessengerRequestContext = RequestContext<
  MessengerRequestBody,
  { 'x-hub-signature'?: string }
>;

export type MessagingEntry =
  | {
      id: string;
      time: number;
      messaging: MessengerRawEvent[];
    }
  | {
      id: string;
      time: number;
      // Supported Events: message_reads, message_deliveries, messages, messaging_postbacks
      standby: (
        | {
            sender: EventSender;
            recipient: EventRecipient;
            timestamp: number;
            message: EventMessage;
          }
        | {
            sender: EventSender;
            recipient: EventRecipient;
            timestamp: number;
            delivery: EventDelivery;
          }
        | {
            sender: EventSender;
            recipient: EventRecipient;
            timestamp: number;
            read: EventRead;
          }
        | {
            sender: EventSender;
            recipient: EventRecipient;
            timestamp: number;
            postback: EventPostback;
          }
      )[];
    };

export type MessengerRequestBody = {
  object: 'page';
  entry: MessagingEntry[];
};
