import { RequestContext } from '../types';

export * from 'messaging-api-line/dist/LineTypes';
export { LineConnectorOptions } from './LineConnector';
export { LineContextOptions } from './LineContext';

export type UserSource = {
  type: 'user';
  userId: string;
};

export type GroupSource = {
  type: 'group';
  groupId: string;
  userId?: string;
};

export type RoomSource = {
  type: 'room';
  roomId: string;
  userId?: string;
};

export type Source = UserSource | GroupSource | RoomSource;

// conflict
export type EventTextMessage = {
  id: string;
  type: 'text';
  text: string;
  /**
   * One or more LINE emojis. Unicode-defined emojis and older versions of LINE emojis may not be retrieved correctly.
   */
  emojis?: MessageEmoji[];
};

// conflict
/**
 * references: https://developers.line.biz/en/reference/messaging-api/#wh-text
 */
export type MessageEmoji = {
  /**
   * Index position for a character in text, with the first character being at position 0.
   */
  index: number;
  /**
   * The length of the LINE emoji string. For LINE emoji (hello), 7 is the length.
   */
  length: number;
  /**
   * Product ID for a set of LINE emoji. See LINE Available Emoji List: https://d.line-scdn.net/r/devcenter/sendable_line_emoji_list.pdf .
   */
  productId: string;
  /**
   * ID for a LINE emoji inside a set. See LINE Available Emoji List: https://d.line-scdn.net/r/devcenter/sendable_line_emoji_list.pdf .
   */
  emojiId: string;
};

export type ContentProviderLine = {
  type: 'line';
};

export type ContentProviderExternal = {
  type: 'external';
  originalContentUrl: string;
  previewImageUrl?: string;
};

export type EventImageMessage = {
  id: string;
  type: 'image';
  contentProvider: ContentProviderLine | ContentProviderExternal;
};

export type EventVideoMessage = {
  id: string;
  type: 'video';
  duration: number;
  contentProvider: ContentProviderLine | ContentProviderExternal;
};

export type EventAudioMessage = {
  id: string;
  type: 'audio';
  duration: number;
  contentProvider: ContentProviderLine | ContentProviderExternal;
};

export type EventFileMessage = {
  id: string;
  type: 'file';
  fileName: string;
  fileSize: number;
};

export type EventLocationMessage = {
  id: string;
  type: 'location';
  title: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type EventStickerMessage = {
  id: string;
  type: 'sticker';
  packageId: string;
  stickerId: string;
};

export type EventMessage =
  | EventTextMessage
  | EventImageMessage
  | EventVideoMessage
  | EventAudioMessage
  | EventFileMessage
  | EventLocationMessage
  | EventStickerMessage;

export type MessageEvent = {
  replyToken: string;
  type: 'message';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
  message: EventMessage;
};

export type FollowEvent = {
  replyToken: string;
  type: 'follow';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
};

export type UnfollowEvent = {
  type: 'unfollow';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
};

export type JoinEvent = {
  replyToken: string;
  type: 'join';
  mode: 'active' | 'standby';
  timestamp: number;
  source: GroupSource | RoomSource;
};

export type LeaveEvent = {
  type: 'leave';
  mode: 'active' | 'standby';
  timestamp: number;
  source: GroupSource | RoomSource;
};

export type MemberJoinedEvent = {
  replyToken: string;
  type: 'memberJoined';
  mode: 'active' | 'standby';
  timestamp: number;
  source: GroupSource | RoomSource;
  joined: {
    members: UserSource[];
  };
};

export type MemberLeftEvent = {
  type: 'memberLeft';
  mode: 'active' | 'standby';
  timestamp: number;
  source: GroupSource | RoomSource;
  left: {
    members: UserSource[];
  };
};

export type PostbackEvent = {
  replyToken: string;
  type: 'postback';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
  postback: Postback;
};

export type PostbackParams =
  | { date: string }
  | { time: string }
  | { datetime: string };

export type Postback = {
  data: string;
  params?: PostbackParams;
};

export type BeaconEvent = {
  replyToken: string;
  type: 'beacon';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
  beacon: Beacon;
};

export type Beacon = {
  hwid: string;
  type: 'enter' | 'banner' | 'stay';
  dm?: string;
};

export type AccountLinkEvent = {
  replyToken: string;
  type: 'accountLink';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
  link: AccountLink;
};

export type AccountLink = {
  result: 'ok' | 'failed';
  nonce: string;
};

export type ThingsEvent = {
  replyToken: string;
  type: 'things';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
  things: Things;
};

export type Things = {
  deviceId: string;
  type: 'link' | 'unlink' | 'scenarioResult';
  result?: any;
};

export type LineEventOptions = {
  destination?: string;
};

export type LineRawEvent =
  | MessageEvent
  | FollowEvent
  | UnfollowEvent
  | JoinEvent
  | LeaveEvent
  | MemberJoinedEvent
  | MemberLeftEvent
  | PostbackEvent
  | BeaconEvent
  | AccountLinkEvent
  | ThingsEvent;

export type LineRequestBody = {
  destination: string;
  events: LineRawEvent[];
};

export type LineRequestContext = RequestContext<
  LineRequestBody,
  { 'x-line-signature'?: string }
>;
