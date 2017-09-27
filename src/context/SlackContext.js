/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { SlackOAuthClient } from 'messaging-api-slack';

import type { SlackSession } from '../bot/SlackConnector';

import Context from './Context';
import SlackEvent from './SlackEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: SlackOAuthClient,
  event: SlackEvent,
  session: ?SlackSession,
|};

export default class SlackContext extends Context implements PlatformContext {
  _client: SlackOAuthClient;
  _event: SlackEvent;
  _session: ?SlackSession;

  constructor({ client, event, session }: Options) {
    super({ client, event, session });
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'slack';
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

  async postMessage(text: string): Promise<any> {
    const channelId = this._getChannelIdFromSession();

    if (!channelId) {
      warning(
        false,
        'postMessage: should not be called in context without session'
      );
      return;
    }

    this._handled = true;

    return this._client.postMessage(channelId, text, { as_user: true });
  }

  /**
   * Send text to the owner of then session.
   *
   */
  sendText(text: string): Promise<any> {
    return this.postMessage(text);
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
