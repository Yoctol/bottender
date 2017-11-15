/* @flow */

import sleep from 'delay';
import warning from 'warning';
import invariant from 'invariant';
import { LineClient } from 'messaging-api-line';

import type { Session } from '../session/Session';

import Context from './Context';
import LineEvent from './LineEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: LineClient,
  event: LineEvent,
  session: ?Session,
  initialState: ?Object,
|};

class LineContext extends Context implements PlatformContext {
  _client: LineClient;
  _event: LineEvent;
  _session: ?Session;

  _isReplied: boolean = false;

  constructor({ client, event, session, initialState }: Options) {
    super({ client, event, session, initialState });
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'line';
  }

  /**
   * Determine if the reply token is already used.
   *
   */
  get isReplied(): boolean {
    return this._isReplied;
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
  async sendText(text: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;
    const { type } = this._session;
    return this._client.pushText(this._session[type].id, text);
  }

  /**
   * Gets the ID of the rich menu linked to the user.
   *
   */
  async getLinkedRichMenu(): Promise<any> {
    if (this._session && this._session.user) {
      return this._client.getLinkedRichMenu(this._session.user.id);
    }
    warning(
      false,
      'getLinkedRichMenu: should not be called in context without session user'
    );
  }

  /**
   * Links a rich menu to the user.
   *
   */
  async linkRichMenu(richMenuId: string): Promise<any> {
    if (this._session && this._session.user) {
      return this._client.linkRichMenu(this._session.user.id, richMenuId);
    }
    warning(
      false,
      'linkRichMenu: should not be called in context without session user'
    );
  }

  /**
   * Unlinks a rich menu from the user.
   *
   */
  async unlinkRichMenu(): Promise<any> {
    if (this._session && this._session.user) {
      return this._client.unlinkRichMenu(this._session.user.id);
    }
    warning(
      false,
      'unlinkRichMenu: should not be called in context without session user'
    );
  }
}

const types = [
  'Text',
  'Image',
  'Video',
  'Audio',
  'Location',
  'Sticker',
  'Imagemap',
  'ButtonTemplate',
  'ConfirmTemplate',
  'CarouselTemplate',
  'ImageCarouselTemplate',
];
types.forEach(type => {
  Object.defineProperty(LineContext.prototype, `reply${type}`, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(...args) {
      invariant(!this._isReplied, 'Can not reply event mulitple times');

      this._isReplied = true;
      this._isHandled = true;

      return this._client[`reply${type}`](this._event.replyToken, ...args);
    },
  });

  Object.defineProperty(LineContext.prototype, `push${type}`, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(...args) {
      if (!this._session) {
        warning(
          false,
          `push${type}: should not be called in context without session`
        );
        return;
      }

      this._isHandled = true;
      const sessionType = this._session.type;
      return this._client[`push${type}`](
        this._session[sessionType].id,
        ...args
      );
    },
  });
});

types.filter(type => type !== 'Text').forEach(type => {
  Object.defineProperty(LineContext.prototype, `send${type}`, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(...args) {
      if (!this._session) {
        warning(
          false,
          `send${type}: should not be called in context without session`
        );
        return;
      }

      this._isHandled = true;
      const sessionType = this._session.type;
      return this._client[`push${type}`](
        this._session[sessionType].id,
        ...args
      );
    },
  });
});

export default LineContext;
