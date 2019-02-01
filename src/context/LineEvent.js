/* @flow */

import { type Event } from './Event';

type ReplyToken = string;

type EventType =
  | 'message'
  | 'postback'
  | 'follow'
  | 'unfollow'
  | 'join'
  | 'leave'
  | 'beacon'
  | 'accountLink'
  | 'memberJoined'
  | 'memberLeft';

type UserSource = {
  type: 'user',
  userId: string,
};

type GroupSource = {
  type: 'group',
  userId?: string,
  groupId: string,
};

type RoomSource = {
  type: 'room',
  userId?: string,
  roomId: string,
};

type Source = UserSource | GroupSource | RoomSource;

type Message = {
  id: string,
  type: string,
  text?: string,
};

type PostbackParams =
  | {| date: string |}
  | {| time: string |}
  | {| datetime: string |};

type Postback = {|
  data: string,
  params?: PostbackParams,
|};

type Beacon = {|
  hwid: string,
  type: 'enter' | 'leave' | 'banner',
  dm?: string,
|};

type AccountLink = {|
  result: 'ok' | 'false',
  nonce: string,
|};

type Members = {
  members: Array<UserSource>,
};

type LineEventOptions = {
  destination?: ?string,
};

export type LineRawEvent = {
  // only message, follow, join, postback, beacon, accountLink, memberJoined events have replyToken
  replyToken?: ReplyToken,
  type: EventType,
  timestamp: number,
  source: Source,
  message?: Message,
  postback?: Postback,
  beacon?: Beacon,
  link?: AccountLink,
  joined?: Members,
  left?: Members,
};

export default class LineEvent implements Event {
  _rawEvent: LineRawEvent;

  _destination: ?string;

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
  get destination(): ?string {
    return this._destination || null;
  }

  /**
   * The reply token from LINE raw event. Only present on message, follow, join, postback, beacon events.
   *
   */
  get replyToken(): ?ReplyToken {
    return this._rawEvent.replyToken || null;
  }

  /**
   * The source object from LINE raw event.
   *
   */
  get source(): ?Source {
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
  get message(): ?Message {
    return this._rawEvent.message || null;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return this.isMessage && (this.message: any).type === 'text';
  }

  /**
   * The text string from LINE raw event.
   *
   */
  get text(): ?string {
    if (this.isText) {
      return (this.message: any).text;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes image.
   *
   */
  get isImage(): boolean {
    return this.isMessage && (this.message: any).type === 'image';
  }

  /**
   * The image object from LINE raw event.
   *
   */
  get image(): ?Message {
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
    return this.isMessage && (this.message: any).type === 'video';
  }

  /**
   * The video object from LINE raw event.
   *
   */
  get video(): ?Message {
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
    return this.isMessage && (this.message: any).type === 'audio';
  }

  /**
   * The audio object from LINE raw event.
   *
   */
  get audio(): ?Message {
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
    return this.isMessage && (this.message: any).type === 'location';
  }

  /**
   * The location object from LINE raw event.
   *
   */
  get location(): ?Message {
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
    return this.isMessage && (this.message: any).type === 'sticker';
  }

  /**
   * The sticker object from LINE raw event.
   *
   */
  get sticker(): ?Message {
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
  get follow(): ?Source {
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
  get unfollow(): ?Source {
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
  get join(): ?Source {
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
  get leave(): ?Source {
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
  get postback(): ?Postback {
    return this._rawEvent.postback || null;
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
  get payload(): ?string {
    if (this.isPayload) {
      return (this.postback: any).data;
    }
    return null;
  }

  /**
   * The date string from LINE postback event.
   *
   */
  get date(): ?string {
    if (this.postback && this.postback.params && this.postback.params.date) {
      return this.postback.params.date;
    }
    return null;
  }

  /**
   * The time string from LINE postback event.
   *
   */
  get time(): ?string {
    if (this.postback && this.postback.params && this.postback.params.time) {
      return this.postback.params.time;
    }
    return null;
  }

  /**
   * The datetime string from LINE postback event.
   *
   */
  get datetime(): ?string {
    if (
      this.postback &&
      this.postback.params &&
      this.postback.params.datetime
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
  get beacon(): ?Beacon {
    return this._rawEvent.beacon || null;
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
  get accountLink(): ?AccountLink {
    return this._rawEvent.link || null;
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
  get memberJoined(): ?Members {
    return this._rawEvent.joined || null;
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
  get memberLeft(): ?Members {
    return this._rawEvent.left || null;
  }
}
