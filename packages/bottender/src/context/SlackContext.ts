import sleep from 'delay';
import warning from 'warning';
import { SlackOAuthClient, SlackTypes } from 'messaging-api-slack';

import Context from './Context';
import SlackEvent from './SlackEvent';
import { PlatformContext } from './PlatformContext';

export default class SlackContext extends Context<SlackOAuthClient, SlackEvent>
  implements PlatformContext {
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

  /**
   * Sends a message to the channel of the session.
   *
   * https://api.slack.com/methods/chat.postMessage
   */
  postMessage(
    message:
      | {
          text?: string;
          attachments?: SlackTypes.Attachment[] | string;
          blocks?: SlackTypes.Block[] | string;
        }
      | string,
    options?: {}
  ): Promise<any> {
    const channelId = this._getChannelIdFromSession();

    if (!channelId) {
      warning(
        false,
        'postMessage: should not be called in context without session'
      );
      return Promise.resolve();
    }

    this._isHandled = true;

    return this._client.postMessage(channelId, message, {
      threadTs: this._event.rawEvent.threadTs,
      ...options,
    });
  }

  /**
   * Sends an ephemeral message to the session owner.
   *
   * https://api.slack.com/methods/chat.postMessage
   */
  postEphemeral(
    message:
      | {
          text?: string;
          attachments?: SlackTypes.Attachment[] | string;
          blocks?: SlackTypes.Block[] | string;
        }
      | string,
    options?: {}
  ): Promise<any> {
    const channelId = this._getChannelIdFromSession();

    if (!channelId) {
      warning(
        false,
        'postMessage: should not be called in context without session'
      );
      return Promise.resolve();
    }

    this._isHandled = true;

    return this._client.postEphemeral(
      channelId,
      (this._session as any).user.id,
      message,
      options
    );
  }

  /**
   * Send text to the owner of the session.
   *
   */
  sendText(text: string, options?: {}): Promise<any> {
    return this.postMessage(text, options);
  }

  // FIXME: this is to fix type checking
  _getChannelIdFromSession(): string | null {
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
