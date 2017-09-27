/* @flow */

import sleep from 'delay';
import warning from 'warning';
import invariant from 'invariant';
import { LineClient } from 'messaging-api-line';

import type { LineSession } from '../bot/LineConnector';

import Context from './Context';
import LineEvent from './LineEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: LineClient,
  event: LineEvent,
  session: ?LineSession,
|};

class LineContext extends Context implements PlatformContext {
  _client: LineClient;
  _event: LineEvent;
  _session: ?LineSession;

  _replied: boolean = false;

  constructor({ client, event, session }: Options) {
    super({ client, event, session });
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
  get replied(): boolean {
    return this._replied;
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
    return this._client.pushText(this._session.user.id, text);
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
      invariant(!this._replied, 'Can not reply event mulitple times');

      this._replied = true;

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

      return this._client[`push${type}`](this._session.user.id, ...args);
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

      return this._client[`push${type}`](this._session.user.id, ...args);
    },
  });
});

export default LineContext;
