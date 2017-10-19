/* @flow */

import type { Event } from './Event';

type ReplyToken = string;

type EventType =
  | 'message'
  | 'postback'
  | 'follow'
  | 'unfollow'
  | 'join'
  | 'leave'
  | 'beacon';

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
  type: string,
|};

export type LineRawEvent = {
  // only message, follow, join, postback, beacon events have replyToken
  replyToken?: ReplyToken,
  type: EventType,
  timestamp: number,
  source: Source,
  message?: Message,
  postback?: Postback,
  beacon?: Beacon,
};

export default class LineEvent implements Event {
  _rawEvent: LineRawEvent;

  constructor(rawEvent: LineRawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from LINE.
   *
   */
  get rawEvent(): LineRawEvent {
    return this._rawEvent;
  }

  /**
   * The reply token from LINE raw event. Only present on message, follow, join, postback, beacon events.
   *
   */
  get replyToken(): ?ReplyToken {
    return this._rawEvent.replyToken || null;
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
    return this._rawEvent.message;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isTextMessage(): boolean {
    return this.isMessage && (this.message: any).type === 'text';
  }

  /**
   * Determine if the event is a message event which includes image.
   *
   */
  get isImageMessage(): boolean {
    return this.isMessage && (this.message: any).type === 'image';
  }

  /**
   * Determine if the event is a message event which includes video.
   *
   */
  get isVideoMessage(): boolean {
    return this.isMessage && (this.message: any).type === 'video';
  }

  /**
   * Determine if the event is a message event which includes audio.
   *
   */
  get isAudioMessage(): boolean {
    return this.isMessage && (this.message: any).type === 'audio';
  }

  /**
   * Determine if the event is a message event which includes location.
   *
   */
  get isLocationMessage(): boolean {
    return this.isMessage && (this.message: any).type === 'location';
  }

  /**
   * Determine if the event is a message event which includes sticker.
   *
   */
  get isStickerMessage(): boolean {
    return this.isMessage && (this.message: any).type === 'sticker';
  }

  /**
   * Determine if the event is a follow event.
   *
   */
  get isFollow(): boolean {
    return this._rawEvent.type === 'follow';
  }

  /**
   * Determine if the event is an unfollow event.
   *
   */
  get isUnfollow(): boolean {
    return this._rawEvent.type === 'unfollow';
  }

  /**
   * Determine if the event is a join event.
   *
   */
  get isJoin(): boolean {
    return this._rawEvent.type === 'join';
  }

  /**
   * Determine if the event is a leave event.
   *
   */
  get isLeave(): boolean {
    return this._rawEvent.type === 'leave';
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
}
