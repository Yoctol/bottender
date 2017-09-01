/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { SlackOAuthClient } from 'messaging-api-slack';

import type { SlackSession } from '../bot/SlackConnector';

import type { Context } from './Context';
import SlackEvent from './SlackEvent';

type Options = {
  client: SlackOAuthClient,
  event: SlackEvent,
  session: ?SlackSession,
};

export default class SlackContext implements Context {
  _client: SlackOAuthClient;
  _event: SlackEvent;
  _session: ?SlackSession;
  _messageDelay: number = 1000;

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
    return 'slack';
  }

  /**
   * The event instance.
   *
   */
  get event(): SlackEvent {
    return this._event;
  }

  /**
   * The session state of the context.
   *
   */
  get session(): ?SlackSession {
    return this._session;
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

  async postMessage(text: string): Promise<any> {
    const channelId = this._getChannelIdFromSession();

    if (!channelId) {
      warning(
        false,
        'postMessage: should not be called in context without session'
      );
      return;
    }

    await this.typing(this._messageDelay);
    return this._client.postMessage(channelId, text, { as_user: true });
  }

  /**
   * Send text to the owner of then session.
   *
   */
  sendText(text: string): Promise<any> {
    return this.postMessage(text);
  }

  async sendTextWithDelay(delay: number, text: string): Promise<any> {
    warning(false, `sendTextWithDelay is deprecated.`);

    const channelId = this._getChannelIdFromSession();

    if (!channelId) {
      warning(
        false,
        'sendTextWithDelay: should not be called in context without session'
      );
      return;
    }

    await this.typing(delay);
    return this._client.postMessage(channelId, text, { as_user: true });
  }

  // FIXME: this is to fix type checking
  _getChannelIdFromSession(): ?string {
    if (!this._session) return null;
    if (
      typeof this._session.channel === 'object' &&
      this._session.channel &&
      this._session.channel.id &&
      typeof this._session.channel.id === 'string'
    ) {
      return this._session.channel.id;
    }
    return null;
  }
}
