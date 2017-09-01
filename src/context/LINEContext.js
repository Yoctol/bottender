/* @flow */

import sleep from 'delay';
import warning from 'warning';
import invariant from 'invariant';
import { LINEClient } from 'messaging-api-line';

import type { LINESession } from '../bot/LINEConnector';

import type { Context } from './Context';
import LINEEvent from './LINEEvent';

type Options = {
  client: LINEClient,
  event: LINEEvent,
  session: ?LINESession,
};

class LINEContext implements Context {
  _client: LINEClient;
  _event: LINEEvent;
  _session: ?LINESession;
  _messageDelay: number = 1000;

  _replied: boolean = false;

  constructor({ client, event, session }: Options) {
    this._client = client;
    this._event = event;
    this._session = session;
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'line';
  }

  /**
   * The event instance.
   *
   */
  get event(): LINEEvent {
    return this._event;
  }

  /**
   * The session state of the context.
   *
   */
  get session(): ?LINESession {
    return this._session;
  }

  /**
   * Determine if the reply token is already used.
   *
   */
  get replied(): boolean {
    return this._replied;
  }

  /**
   * Set delay before sending every messages.
   *
   */
  setMessageDelay(milliseconds: number): void {
    this._messageDelay = milliseconds;
  }

  /**
   * Delay and show indicators for milliseconds.
   *
   */
  async typing(milliseconds: number): Promise<void> {
    await sleep(milliseconds);
  }

  /**
   * Send text to the owner of then session.
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
    await this.typing(this._messageDelay);
    return this._client.pushText(this._session.user.id, text);
  }

  async sendTextWithDelay(delay: number, text: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendTextWithDelay: should not be called in context without session'
      );
      return;
    }
    await this.typing(delay);
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
];
types.forEach(type => {
  Object.defineProperty(LINEContext.prototype, `reply${type}`, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(...args) {
      invariant(!this._replied, 'Can not reply event mulitple times');

      this._replied = true;

      await this.typing(this._messageDelay);
      return this._client[`reply${type}`](this._event.replyToken, ...args);
    },
  });

  Object.defineProperty(LINEContext.prototype, `push${type}`, {
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

      await this.typing(this._messageDelay);
      return this._client[`push${type}`](this._session.user.id, ...args);
    },
  });

  Object.defineProperty(LINEContext.prototype, `send${type}To`, {
    enumerable: false,
    configurable: true,
    writable: true,
    value(id, ...rest) {
      return this._client[`push${type}`](id, ...rest);
    },
  });
});

types.filter(type => type !== 'Text').forEach(type => {
  Object.defineProperty(LINEContext.prototype, `send${type}`, {
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

      await this.typing(this._messageDelay);
      return this._client[`push${type}`](this._session.user.id, ...args);
    },
  });

  Object.defineProperty(LINEContext.prototype, `send${type}WithDelay`, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(delay, ...rest) {
      warning(false, `send${type}WithDelay is deprecated.`);

      if (!this._session) {
        warning(
          false,
          `send${type}WithDelay: should not be called in context without session`
        );
        return;
      }

      await this.typing(delay);
      return this._client[`push${type}`](this._session.user.id, ...rest);
    },
  });
});

export default LINEContext;
