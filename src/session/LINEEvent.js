/* @flow */

type Source = {
  type: string,
  userId?: string,
  groupId?: string,
  roomId?: string,
};

type Message = {
  id: string,
  type: string,
  text?: string,
};

type Postback = {
  data: string,
};

export type RawLINEEvent = {
  replyToken: string,
  type: string,
  timestamp: number,
  source: Source,
  message?: Message,
  postback?: Postback,
};

export default class LINEEvent {
  _rawEvent: RawLINEEvent;

  constructor(rawEvent: RawLINEEvent) {
    this._rawEvent = rawEvent;
  }

  get rawEvent(): RawLINEEvent {
    return this._rawEvent;
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
