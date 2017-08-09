/* @flow */

import type { Event } from './Event';

type ReplyToken = string;

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

type Postback = {
  data: string,
};

export type LINERawEvent = {
  // only message, follow, join, postback, beacon events have replyToken
  replyToken?: ReplyToken,
  type: string,
  timestamp: number,
  source: Source,
  message?: Message,
  postback?: Postback,
};

export default class LINEEvent implements Event {
  _rawEvent: LINERawEvent;

  constructor(rawEvent: LINERawEvent) {
    this._rawEvent = rawEvent;
  }

  get rawEvent(): LINERawEvent {
    return this._rawEvent;
  }

  get replyToken(): ?ReplyToken {
    return this._rawEvent.replyToken || null;
  }

  get isMessage(): boolean {
    return this._rawEvent.type === 'message';
  }

  get message(): ?Message {
    return this._rawEvent.message;
  }

  get isTextMessage(): boolean {
    return this.isMessage && (this.message: any).type === 'text';
  }

  get isImageMessage(): boolean {
    return this.isMessage && (this.message: any).type === 'image';
  }

  get isVideoMessage(): boolean {
    return this.isMessage && (this.message: any).type === 'video';
  }

  get isAudioMessage(): boolean {
    return this.isMessage && (this.message: any).type === 'audio';
  }

  get isLocationMessage(): boolean {
    return this.isMessage && (this.message: any).type === 'location';
  }

  get isStickerMessage(): boolean {
    return this.isMessage && (this.message: any).type === 'sticker';
  }

  get isFollow(): boolean {
    return this._rawEvent.type === 'follow';
  }

  get isUnfollow(): boolean {
    return this._rawEvent.type === 'unfollow';
  }

  get isJoin(): boolean {
    return this._rawEvent.type === 'join';
  }

  get isLeave(): boolean {
    return this._rawEvent.type === 'leave';
  }

  get isPostback(): boolean {
    return this._rawEvent.type === 'postback';
  }

  get postback(): ?Postback {
    return this._rawEvent.postback || null;
  }

  get isBeacon(): boolean {
    return this._rawEvent.type === 'beacon';
  }
}
