/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { SlackOAuthClient } from 'messaging-api-slack';

import type { Session } from '../session/Session';

import Context from './Context';
import SlackEvent from './SlackEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: SlackOAuthClient,
  event: SlackEvent,
  session: ?Session,
  initialState: ?Object,
|};

export default class SlackContext extends Context implements PlatformContext {
  _client: SlackOAuthClient;
  _event: SlackEvent;
  _session: ?Session;

  constructor({ client, event, session, initialState }: Options) {
    super({ client, event, session, initialState });
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

  postMessage(text: string, options?: {}): Promise<any> {
    const channelId = this._getChannelIdFromSession();

    if (!channelId) {
      warning(
        false,
        'postMessage: should not be called in context without session'
      );
      return Promise.resolve();
    }

    this._isHandled = true;

    return this._client.postMessage(channelId, text, {
      ...options,
    });
  }

  /**
   * Send text to the owner of then session.
   *
   */
  sendText(text: string, options?: {}): Promise<any> {
    return this.postMessage(text, options);
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
