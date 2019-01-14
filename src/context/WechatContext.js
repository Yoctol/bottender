/* @flow */

import invariant from 'invariant';
import sleep from 'delay';
import warning from 'warning';
import { WechatClient } from 'messaging-api-wechat';

import { type Session } from '../session/Session';

import Context from './Context';
import WechatEvent from './WechatEvent';
import { type PlatformContext } from './PlatformContext';

type Options = {|
  client: WechatClient,
  event: WechatEvent,
  session: ?Session,
  initialState: ?Object,
  requestContext: ?Object,
|};

class WechatContext extends Context implements PlatformContext {
  _client: WechatClient = this._client;

  _event: WechatEvent = this._event;

  _session: ?Session = this.session;

  _isReplied: boolean = false;

  constructor({
    client,
    event,
    session,
    initialState,
    requestContext,
  }: Options) {
    super({ client, event, session, initialState, requestContext });
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'wecaht';
  }

  /**
   * Delay and show indicators for milliseconds.
   *
   */
  async typing(milliseconds: number): Promise<void> {
    if (milliseconds > 0) {
      await sleep(milliseconds);
    }
  }

  /**
   * Send text to the owner of the session.
   *
   */
  async sendText(text: string, options?: Object): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    // FIXME
    return this._client.sendText(this._session.user.id, text, options);
  }

  /**
   * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140543
   */
  async replyText(text: string, options?: Object): Promise<any> {
    invariant(!this._isReplied, 'Can not reply event mulitple times');

    if (!this._session) {
      warning(
        false,
        'replyText: should not be called in context without session'
      );
      return;
    }

    this._isReplied = true;
    this._isHandled = true;

    this.response.headers['content-type'] = 'application/xml';
    this.response.body = `<xml><ToUserName><![CDATA[${
      this._session.user.id
    }]]></ToUserName><FromUserName><![CDATA[gh_29d2d7084492]]></FromUserName><CreateTime>${Date.now()}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[${text}]]></Content></xml>`;
  }

  async replyImage(imageId: string, options?: Object): Promise<any> {
    invariant(!this._isReplied, 'Can not reply event mulitple times');

    if (!this._session) {
      warning(
        false,
        'replyImage: should not be called in context without session'
      );
      return;
    }

    this._isReplied = true;
    this._isHandled = true;

    this.response.headers['content-type'] = 'application/xml';
    this.response.body = `<xml><ToUserName><![CDATA[${
      this._session.user.id
    }]]></ToUserName><FromUserName><![CDATA[gh_29d2d7084492]]></FromUserName><CreateTime>${Date.now()}</CreateTime><MsgType><![CDATA[image]]></MsgType><Image><MediaId><![CDATA[${imageId}]]></MediaId></Image></xml>`;
  }

  async replyVoice(voiceId: string, options?: Object): Promise<any> {
    invariant(!this._isReplied, 'Can not reply event mulitple times');

    if (!this._session) {
      warning(
        false,
        'replyVoice: should not be called in context without session'
      );
      return;
    }

    this._isReplied = true;
    this._isHandled = true;

    this.response.headers['content-type'] = 'application/xml';
    this.response.body = `<xml><ToUserName><![CDATA[${
      this._session.user.id
    }]]></ToUserName><FromUserName><![CDATA[gh_29d2d7084492]]></FromUserName><CreateTime>${Date.now()}</CreateTime><MsgType><![CDATA[voice]]></MsgType><Voice><MediaId><![CDATA[${voiceId}]]></MediaId></Voice></xml>`;
  }

  async replyVideo(videoId: string, options?: Object): Promise<any> {
    invariant(!this._isReplied, 'Can not reply event mulitple times');

    if (!this._session) {
      warning(
        false,
        'replyVideo: should not be called in context without session'
      );
      return;
    }

    this._isReplied = true;
    this._isHandled = true;

    this.response.headers['content-type'] = 'application/xml';
    // FIXME: Title, Description
    this.response.body = `<xml><ToUserName><![CDATA[${
      this._session.user.id
    }]]></ToUserName><FromUserName><![CDATA[gh_29d2d7084492]]></FromUserName><CreateTime>${Date.now()}</CreateTime><MsgType><![CDATA[music]]></MsgType><Music><MediaId><![CDATA[${videoId}]]></MediaId></Music></xml>`;
  }

  async replyMusic(thumbMediaId: string, options?: Object): Promise<any> {
    invariant(!this._isReplied, 'Can not reply event mulitple times');

    if (!this._session) {
      warning(
        false,
        'replyMusic: should not be called in context without session'
      );
      return;
    }

    this._isReplied = true;
    this._isHandled = true;

    this.response.headers['content-type'] = 'application/xml';
    // FIXME: Title, Description, MusicURL, HQMusicUrl
    this.response.body = `<xml><ToUserName><![CDATA[${
      this._session.user.id
    }]]></ToUserName><FromUserName><![CDATA[gh_29d2d7084492]]></FromUserName><CreateTime>${Date.now()}</CreateTime><MsgType><![CDATA[music]]></MsgType><Music><ThumbMediaId><![CDATA[${thumbMediaId}]]></ThumbMediaId></Music></xml>`;
  }

  async replyNews(thumbMediaId: string, options?: Object): Promise<any> {
    invariant(!this._isReplied, 'Can not reply event mulitple times');

    if (!this._session) {
      warning(
        false,
        'replyNews: should not be called in context without session'
      );
      return;
    }

    this._isReplied = true;
    this._isHandled = true;

    this.response.headers['content-type'] = 'application/xml';

    // TODO: 回复图文消息
    this.response.body = '';
  }
}

export default WechatContext;
