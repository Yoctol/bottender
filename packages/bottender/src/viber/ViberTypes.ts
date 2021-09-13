import { RequestContext } from '../types';

export * from 'messaging-api-viber/dist/ViberTypes';
export { ViberConnectorOptions } from './ViberConnector';

export type ViberUser = {
  id: string;
  name: string;
  avatar: string;
  country: string;
  language: string;
  apiVersion: number;
};

export type SubscribedEvent = {
  event: 'subscribed';
  timestamp: number;
  user: ViberUser;
  messageToken: number;
};

export type UnsubscribedEvent = {
  event: 'unsubscribed';
  timestamp: number;
  userId: string;
  messageToken: number;
};

export type ConversationStartedEvent = {
  event: 'conversation_started';
  timestamp: number;
  messageToken: number;
  type: 'open';
  context: string;
  user: ViberUser;
  subscribed: false;
};

export type DeliveredEvent = {
  event: 'delivered';
  timestamp: number;
  messageToken: number;
  userId: string;
};

export type SeenEvent = {
  event: 'seen';
  timestamp: number;
  messageToken: number;
  userId: string;
};

export type FailedEvent = {
  event: 'failed';
  timestamp: number;
  messageToken: number;
  userId: string;
  desc: string;
};

export type ViberMessage = {
  type:
    | 'text'
    | 'picture'
    | 'video'
    | 'file'
    | 'sticker'
    | 'contact'
    | 'url'
    | 'location';
  text?: string;
  media?: string;
  location?: {
    lat: string;
    lot: string;
  };
  contact?: {
    name: string;
    phoneNumber: string;
  };
  trackingData?: string;
  fileName?: string;
  fileSize?: number;
  duration?: number;
  stickerId?: number;
};

export type MessageEvent = {
  event: 'message';
  timestamp: number;
  messageToken: number;
  sender: ViberUser;
  message: ViberMessage;
};

export type ViberRawEvent =
  | SubscribedEvent
  | UnsubscribedEvent
  | ConversationStartedEvent
  | DeliveredEvent
  | SeenEvent
  | FailedEvent
  | MessageEvent;

export type ViberRequestBody = ViberRawEvent;

export type ViberRequestContext = RequestContext<
  ViberRequestBody,
  { 'x-viber-content-signature'?: string }
>;
