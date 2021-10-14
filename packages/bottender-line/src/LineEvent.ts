import { Event } from '@bottender/core';

import {
  AccountLink,
  AccountLinkEvent,
  Beacon,
  BeaconEvent,
  EventMessage,
  LineEventOptions,
  LineRawEvent,
  MemberJoinedEvent,
  MemberLeftEvent,
  MessageEvent,
  Postback,
  PostbackEvent,
  Source,
  TextMessage,
  Things,
  ThingsEvent,
  UserSource,
} from './LineTypes';

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
   * The timestamp when the event was sent.
   *
   */
  get timestamp(): number {
    return this._rawEvent.timestamp;
  }

  /**
   * The destination is the id of the bot which this event is sent to.
   *
   */
  get destination(): string | undefined {
    return this._destination;
  }

  /**
   * The reply token from LINE raw event. Only present on message, follow, join, postback, beacon events.
   *
   */
  get replyToken(): string | undefined {
    return 'replyToken' in this._rawEvent
      ? this._rawEvent.replyToken
      : undefined;
  }

  /**
   * The source object from LINE raw event.
   *
   */
  get source(): Source {
    return this._rawEvent.source;
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
  get message(): EventMessage | undefined {
    return (this._rawEvent as MessageEvent).message;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return this.isMessage && (this.message as EventMessage).type === 'text';
  }

  /**
   * The text string from LINE raw event.
   *
   */
  get text(): string | undefined {
    if (this.isText) {
      return (this.message as TextMessage).text;
    }
  }

  /**
   * Determine if the event is a message event which includes image.
   *
   */
  get isImage(): boolean {
    return this.isMessage && (this.message as EventMessage).type === 'image';
  }

  /**
   * The image object from LINE raw event.
   *
   */
  get image(): EventMessage | undefined {
    if (this.isImage) {
      return this.message;
    }
  }

  /**
   * Determine if the event is a message event which includes video.
   *
   */
  get isVideo(): boolean {
    return this.isMessage && (this.message as EventMessage).type === 'video';
  }

  /**
   * The video object from LINE raw event.
   *
   */
  get video(): EventMessage | undefined {
    if (this.isVideo) {
      return this.message;
    }
  }

  /**
   * Determine if the event is a message event which includes audio.
   *
   */
  get isAudio(): boolean {
    return this.isMessage && (this.message as EventMessage).type === 'audio';
  }

  /**
   * The audio object from LINE raw event.
   *
   */
  get audio(): EventMessage | undefined {
    if (this.isAudio) {
      return this.message;
    }
  }

  /**
   * Determine if the event is a message event which includes location.
   *
   */
  get isLocation(): boolean {
    return this.isMessage && (this.message as EventMessage).type === 'location';
  }

  /**
   * The location object from LINE raw event.
   *
   */
  get location(): EventMessage | undefined {
    if (this.isLocation) {
      return this.message;
    }
  }

  /**
   * Determine if the event is a message event which includes sticker.
   *
   */
  get isSticker(): boolean {
    return this.isMessage && (this.message as EventMessage).type === 'sticker';
  }

  /**
   * The sticker object from LINE raw event.
   *
   */
  get sticker(): EventMessage | undefined {
    if (this.isSticker) {
      return this.message;
    }
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
  get follow(): Source | undefined {
    if (this.isFollow) {
      return this.source;
    }
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
  get unfollow(): Source | undefined {
    if (this.isUnfollow) {
      return this.source;
    }
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
  get join(): Source | undefined {
    if (this.isJoin) {
      return this.source;
    }
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
  get leave(): Source | undefined {
    if (this.isLeave) {
      return this.source;
    }
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
  get postback(): Postback | undefined {
    return (this._rawEvent as PostbackEvent).postback;
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
  get payload(): string | undefined {
    if (this.isPayload) {
      return (this.postback as Postback).data;
    }
  }

  /**
   * The date string from LINE postback event.
   *
   */
  get date(): string | undefined {
    if (
      this.postback &&
      this.postback.params &&
      'date' in this.postback.params
    ) {
      return this.postback.params.date;
    }
  }

  /**
   * The time string from LINE postback event.
   *
   */
  get time(): string | undefined {
    if (
      this.postback &&
      this.postback.params &&
      'time' in this.postback.params
    ) {
      return this.postback.params.time;
    }
  }

  /**
   * The datetime string from LINE postback event.
   *
   */
  get datetime(): string | undefined {
    if (
      this.postback &&
      this.postback.params &&
      'datetime' in this.postback.params
    ) {
      return this.postback.params.datetime;
    }
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
  get beacon(): Beacon | undefined {
    return (this._rawEvent as BeaconEvent).beacon;
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
  get accountLink(): AccountLink | undefined {
    return (this._rawEvent as AccountLinkEvent).link;
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
  get memberJoined():
    | {
        members: UserSource[];
      }
    | undefined {
    return (this._rawEvent as MemberJoinedEvent).joined;
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
  get memberLeft():
    | {
        members: UserSource[];
      }
    | undefined {
    return (this._rawEvent as MemberLeftEvent).left;
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
   * The things object from LINE raw event.
   *
   */
  get things(): Things | undefined {
    return (this._rawEvent as ThingsEvent).things;
  }
}
