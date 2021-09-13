import warning from 'warning';

import { Event } from '../context/Event';

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
  get message(): EventMessage | null {
    return (this._rawEvent as MessageEvent).message || null;
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
    return this.isMessage && (this.message as EventMessage).type === 'image';
  }

  /**
   * The image object from LINE raw event.
   *
   */
  get image(): EventMessage | null {
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
    return this.isMessage && (this.message as EventMessage).type === 'video';
  }

  /**
   * The video object from LINE raw event.
   *
   */
  get video(): EventMessage | null {
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
    return this.isMessage && (this.message as EventMessage).type === 'audio';
  }

  /**
   * The audio object from LINE raw event.
   *
   */
  get audio(): EventMessage | null {
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
    return this.isMessage && (this.message as EventMessage).type === 'location';
  }

  /**
   * The location object from LINE raw event.
   *
   */
  get location(): EventMessage | null {
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
    return this.isMessage && (this.message as EventMessage).type === 'sticker';
  }

  /**
   * The sticker object from LINE raw event.
   *
   */
  get sticker(): EventMessage | null {
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
