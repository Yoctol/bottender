/* @flow */

import { type Event } from './Event';

type Message = {
  text: string,
};

export type WechatRawEvent = {
  message?: Message,
  payload?: string,
};

/**
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140453
 */
export default class WechatEvent implements Event {
  _rawEvent: WechatRawEvent;

  constructor(rawEvent: WechatRawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from Wechat.
   *
   */
  get rawEvent(): WechatRawEvent {
    return this._rawEvent;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage(): boolean {
    return !!this._rawEvent.msgtype;
  }

  /**
   * The message object from Wechat raw event.
   *
   */
  get message(): ?Message {
    if (this.isMessage) {
      return this._rawEvent;
    }
    return null;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    if (this.isMessage && this._rawEvent.msgtype[0] === 'text') {
      return true;
    }
    return false;
  }

  /**
   * The text string from Wechat raw event.
   *
   */
  get text(): ?string {
    if (this.isText) {
      return ((this.message: any): Message).content[0];
    }
    return null;
  }

  /**
   * Determine if the event is a payload event.
   *
   */
  get isPayload(): boolean {
    return false;
  }

  /**
   * The payload string from Wechat raw event.
   *
   */
  get payload(): ?string {
    return null;
  }

  /**
   * Determine if the event is a message event which includes image.
   *
   */
  get isImage(): boolean {
    if (this.isMessage && this._rawEvent.msgtype[0] === 'image') {
      return true;
    }
    return false;
  }

  /**
   * Determine if the event is a message event which includes voice.
   *
   */
  get isVoice(): boolean {
    if (this.isMessage && this._rawEvent.msgtype[0] === 'voice') {
      return true;
    }
    return false;
  }

  /**
   * Determine if the event is a message event which includes video.
   *
   */
  get isVideo(): boolean {
    if (this.isMessage && this._rawEvent.msgtype[0] === 'video') {
      return true;
    }
    return false;
  }

  /**
   * Determine if the event is a message event which includes short video.
   *
   */
  get isShortVideo(): boolean {
    if (this.isMessage && this._rawEvent.msgtype[0] === 'shortvideo') {
      return true;
    }
    return false;
  }

  /**
   * Determine if the event is a message event which includes location.
   *
   */
  get isLocation(): boolean {
    if (this.isMessage && this._rawEvent.msgtype[0] === 'location') {
      return true;
    }
    return false;
  }

  /**
   * Determine if the event is a message event which includes link.
   *
   */
  get isLink(): boolean {
    if (this.isMessage && this._rawEvent.msgtype[0] === 'link') {
      return true;
    }
    return false;
  }

  /**
   * Determine if the event is a subscribe event.
   *
   */
  get isSubscribe(): boolean {
    if (this.isMessage && this._rawEvent.msgtype[0] === 'subscribe') {
      return true;
    }
    return false;
  }

  /**
   * Determine if the event is a scan event.
   *
   */
  get isScan(): boolean {
    if (this.isMessage && this._rawEvent.msgtype[0] === 'scan') {
      return true;
    }
    return false;
  }
}
