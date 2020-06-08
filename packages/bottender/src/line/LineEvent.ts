import { Event } from '../context/Event';

import warning = require('warning');

type UserSource = {
  type: 'user';
  userId: string;
};

type GroupSource = {
  type: 'group';
  groupId: string;
  userId?: string;
};

type RoomSource = {
  type: 'room';
  roomId: string;
  userId?: string;
};

type Source = UserSource | GroupSource | RoomSource;

type TextMessage = {
  id: string;
  type: 'text';
  text: string;
  /**
   * One or more LINE emojis. Unicode-defined emojis and older versions of LINE emojis may not be retrieved correctly.
   */
  emojis?: Emoji[];
};

/**
 * references: https://developers.line.biz/en/reference/messaging-api/#wh-text
 */
type Emoji = {
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

type ContentProviderLine = {
  type: 'line';
};

type ContentProviderExternal = {
  type: 'external';
  originalContentUrl: string;
  previewImageUrl?: string;
};

type ImageMessage = {
  id: string;
  type: 'image';
  contentProvider: ContentProviderLine | ContentProviderExternal;
};

type VideoMessage = {
  id: string;
  type: 'video';
  duration: number;
  contentProvider: ContentProviderLine | ContentProviderExternal;
};

type AudioMessage = {
  id: string;
  type: 'audio';
  duration: number;
  contentProvider: ContentProviderLine | ContentProviderExternal;
};

type FileMessage = {
  id: string;
  type: 'file';
  fileName: string;
  fileSize: number;
};

type LocationMessage = {
  id: string;
  type: 'location';
  title: string;
  address: string;
  latitude: number;
  longitude: number;
};

type StickerMessage = {
  id: string;
  type: 'sticker';
  packageId: string;
  stickerId: string;
};

type Message =
  | TextMessage
  | ImageMessage
  | VideoMessage
  | AudioMessage
  | FileMessage
  | LocationMessage
  | StickerMessage;

type MessageEvent = {
  replyToken: string;
  type: 'message';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
  message: Message;
};

type FollowEvent = {
  replyToken: string;
  type: 'follow';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
};

type UnfollowEvent = {
  type: 'unfollow';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
};

type JoinEvent = {
  replyToken: string;
  type: 'join';
  mode: 'active' | 'standby';
  timestamp: number;
  source: GroupSource | RoomSource;
};

type LeaveEvent = {
  type: 'leave';
  mode: 'active' | 'standby';
  timestamp: number;
  source: GroupSource | RoomSource;
};

type MemberJoinedEvent = {
  replyToken: string;
  type: 'memberJoined';
  mode: 'active' | 'standby';
  timestamp: number;
  source: GroupSource | RoomSource;
  joined: {
    members: UserSource[];
  };
};

type MemberLeftEvent = {
  type: 'memberLeft';
  mode: 'active' | 'standby';
  timestamp: number;
  source: GroupSource | RoomSource;
  left: {
    members: UserSource[];
  };
};

type PostbackEvent = {
  replyToken: string;
  type: 'postback';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
  postback: Postback;
};

type PostbackParams =
  | { date: string }
  | { time: string }
  | { datetime: string };

type Postback = {
  data: string;
  params?: PostbackParams;
};

type BeaconEvent = {
  replyToken: string;
  type: 'beacon';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
  beacon: Beacon;
};

type Beacon = {
  hwid: string;
  type: 'enter' | 'banner' | 'stay';
  dm?: string;
};

type AccountLinkEvent = {
  replyToken: string;
  type: 'accountLink';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
  link: AccountLink;
};

type AccountLink = {
  result: 'ok' | 'failed';
  nonce: string;
};

type ThingsEvent = {
  replyToken: string;
  type: 'things';
  mode: 'active' | 'standby';
  timestamp: number;
  source: Source;
  things: Things;
};

type Things = {
  deviceId: string;
  type: 'link' | 'unlink' | 'scenarioResult';
  result?: any;
};

type LineEventOptions = {
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

export default class LineEvent implements Event<LineRawEvent> {
  _rawEvent: LineRawEvent;

  _destination: string | undefined;

  constructor(rawEvent: LineRawEvent, options: LineEventOptions = {}) {
    this._rawEvent = rawEvent;
    this._destination = options.destination;
  }

  /**
   * Underlying raw event from LINE.
   *
   */
  get rawEvent(): LineRawEvent {
    return this._rawEvent;
  }

  /**
   * The destination is the id of the bot which this event is sent to.
   *
   */
  get destination(): string | null {
    return this._destination || null;
  }

  /**
   * The reply token from LINE raw event. Only present on message, follow, join, postback, beacon events.
   *
   */
  get replyToken(): string | null {
    return 'replyToken' in this._rawEvent ? this._rawEvent.replyToken : null;
  }

  /**
   * The source object from LINE raw event.
   *
   */
  get source(): Source {
    return this._rawEvent.source || null;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage(): boolean {
    return this._rawEvent.type === 'message';
  }

  /**
   * The message object from LINE raw event.
   *
   */
  get message(): Message | null {
    return (this._rawEvent as MessageEvent).message || null;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return this.isMessage && (this.message as Message).type === 'text';
  }

  /**
   * The text string from LINE raw event.
   *
   */
  get text(): string | null {
    if (this.isText) {
      return (this.message as TextMessage).text;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes image.
   *
   */
  get isImage(): boolean {
    return this.isMessage && (this.message as Message).type === 'image';
  }

  /**
   * The image object from LINE raw event.
   *
   */
  get image(): Message | null {
    if (this.isImage) {
      return this.message;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes video.
   *
   */
  get isVideo(): boolean {
    return this.isMessage && (this.message as Message).type === 'video';
  }

  /**
   * The video object from LINE raw event.
   *
   */
  get video(): Message | null {
    if (this.isVideo) {
      return this.message;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes audio.
   *
   */
  get isAudio(): boolean {
    return this.isMessage && (this.message as Message).type === 'audio';
  }

  /**
   * The audio object from LINE raw event.
   *
   */
  get audio(): Message | null {
    if (this.isAudio) {
      return this.message;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes location.
   *
   */
  get isLocation(): boolean {
    return this.isMessage && (this.message as Message).type === 'location';
  }

  /**
   * The location object from LINE raw event.
   *
   */
  get location(): Message | null {
    if (this.isLocation) {
      return this.message;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes sticker.
   *
   */
  get isSticker(): boolean {
    return this.isMessage && (this.message as Message).type === 'sticker';
  }

  /**
   * The sticker object from LINE raw event.
   *
   */
  get sticker(): Message | null {
    if (this.isSticker) {
      return this.message;
    }
    return null;
  }

  /**
   * Determine if the event is a follow event.
   *
   */
  get isFollow(): boolean {
    return this._rawEvent.type === 'follow';
  }

  /**
   * The source object from LINE raw event.
   *
   */
  get follow(): Source | null {
    if (this.isFollow) {
      return this.source;
    }
    return null;
  }

  /**
   * Determine if the event is an unfollow event.
   *
   */
  get isUnfollow(): boolean {
    return this._rawEvent.type === 'unfollow';
  }

  /**
   * The source object from LINE raw event.
   *
   */
  get unfollow(): Source | null {
    if (this.isUnfollow) {
      return this.source;
    }
    return null;
  }

  /**
   * Determine if the event is a join event.
   *
   */
  get isJoin(): boolean {
    return this._rawEvent.type === 'join';
  }

  /**
   * The source object from LINE raw event.
   *
   */
  get join(): Source | null {
    if (this.isJoin) {
      return this.source;
    }
    return null;
  }

  /**
   * Determine if the event is a leave event.
   *
   */
  get isLeave(): boolean {
    return this._rawEvent.type === 'leave';
  }

  /**
   * The source object from LINE raw event.
   *
   */
  get leave(): Source | null {
    if (this.isLeave) {
      return this.source;
    }
    return null;
  }

  /**
   * Determine if the event is a postback event.
   *
   */
  get isPostback(): boolean {
    return this._rawEvent.type === 'postback';
  }

  /**
   * The postback object from LINE raw event.
   *
   */
  get postback(): Postback | null {
    return (this._rawEvent as PostbackEvent).postback || null;
  }

  /**
   * Determine if the event is a postback event.
   *
   */
  get isPayload(): boolean {
    return this.isPostback;
  }

  /**
   * The payload string from LINE raw event.
   *
   */
  get payload(): string | null {
    if (this.isPayload) {
      return (this.postback as Postback).data;
    }
    return null;
  }

  /**
   * The date string from LINE postback event.
   *
   */
  get date(): string | null {
    if (
      this.postback &&
      this.postback.params &&
      'date' in this.postback.params
    ) {
      return this.postback.params.date;
    }
    return null;
  }

  /**
   * The time string from LINE postback event.
   *
   */
  get time(): string | null {
    if (
      this.postback &&
      this.postback.params &&
      'time' in this.postback.params
    ) {
      return this.postback.params.time;
    }
    return null;
  }

  /**
   * The datetime string from LINE postback event.
   *
   */
  get datetime(): string | null {
    if (
      this.postback &&
      this.postback.params &&
      'datetime' in this.postback.params
    ) {
      return this.postback.params.datetime;
    }
    return null;
  }

  /**
   * Determine if the event is a beacon event.
   *
   */
  get isBeacon(): boolean {
    return this._rawEvent.type === 'beacon';
  }

  /**
   * The beacon object from LINE raw event.
   *
   */
  get beacon(): Beacon | null {
    return (this._rawEvent as BeaconEvent).beacon || null;
  }

  /**
   * Determine if the event is an accountLink event.
   *
   */
  get isAccountLink(): boolean {
    return this._rawEvent.type === 'accountLink';
  }

  /**
   * The link object from LINE raw event.
   *
   */
  get accountLink(): AccountLink | null {
    return (this._rawEvent as AccountLinkEvent).link || null;
  }

  /**
   * Determine if the event is an memberJoined event.
   *
   */
  get isMemberJoined(): boolean {
    return this._rawEvent.type === 'memberJoined';
  }

  /**
   * The joined object from LINE raw event.
   *
   */
  get memberJoined(): {
    members: UserSource[];
  } | null {
    return (this._rawEvent as MemberJoinedEvent).joined || null;
  }

  /**
   * Determine if the event is an memberLeft event.
   *
   */
  get isMemberLeft(): boolean {
    return this._rawEvent.type === 'memberLeft';
  }

  /**
   * The left object from LINE raw event.
   *
   */
  get memberLeft(): {
    members: UserSource[];
  } | null {
    return (this._rawEvent as MemberLeftEvent).left || null;
  }

  /**
   * Determine if the event is a things event.
   *
   */
  get isThings(): boolean {
    return this._rawEvent.type === 'things';
  }

  /**
   * Determine if the event is a things link event.
   *
   */
  get isThingsLink(): boolean {
    return (
      this._rawEvent.type === 'things' &&
      typeof this._rawEvent.things !== 'undefined' &&
      this._rawEvent.things.type === 'link'
    );
  }

  /**
   * Determine if the event is a things unlink event.
   *
   */
  get isThingsUnlink(): boolean {
    return (
      this._rawEvent.type === 'things' &&
      typeof this._rawEvent.things !== 'undefined' &&
      this._rawEvent.things.type === 'unlink'
    );
  }

  /**
   * Determine if the event is a things scenarioResult event.
   *
   */
  get isThingsScenarioResult(): boolean {
    return (
      this._rawEvent.type === 'things' &&
      typeof this._rawEvent.things !== 'undefined' &&
      this._rawEvent.things.type === 'scenarioResult'
    );
  }

  /**
   * Determine if the event is a device link event.
   *
   */
  get isDeviceLink(): boolean {
    warning(
      false,
      '`event.isDeviceLink` is deprecated. Use `event.isThingsLink` instead.'
    );

    return this.isThingsLink;
  }

  /**
   * Determine if the event is a device unlink event.
   *
   */
  get isDeviceUnlink(): boolean {
    warning(
      false,
      '`event.isDeviceUnlink` is deprecated. Use `event.isThingsUnlink` instead.'
    );

    return this.isThingsUnlink;
  }

  /**
   * The things object from LINE raw event.
   *
   */
  get things(): Things | null {
    return (this._rawEvent as ThingsEvent).things || null;
  }
}
