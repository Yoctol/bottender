import sleep from 'delay';
import warning from 'warning';
import { ViberClient, ViberTypes } from 'messaging-api-viber';

import Context from '../context/Context';
import { PlatformContext } from '../context/PlatformContext';

import ViberEvent from './ViberEvent';

class ViberContext extends Context<ViberClient, ViberEvent>
  implements PlatformContext {
  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'viber';
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
  async sendText(
    text: string,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    return this._client.sendText(this._session.user.id, text, options);
  }

  /**
   * Get user details from the owner of the session.
   *
   */
  async getUserDetails(): Promise<ViberTypes.UserDetails | null> {
    if (!this._session) {
      warning(
        false,
        'getUserDetails: should not be called in context without session'
      );
      return null;
    }

    return this._client.getUserDetails(this._session.user.id);
  }

  /**
   * Get user online status from the owner of the session.
   *
   */
  async getOnlineStatus(): Promise<ViberTypes.UserOnlineStatus | null> {
    if (!this._session) {
      warning(
        false,
        'getOnlineStatus: should not be called in context without session'
      );
      return null;
    }

    const status = await this._client.getOnlineStatus([this._session.user.id]);
    return status[0];
  }

  async sendMessage(message: ViberTypes.Message): Promise<any> {
    if (!this._session) {
      warning(
        false,
        `sendMessage: should not be called in context without session`
      );
      return;
    }

    this._isHandled = true;

    return this._client.sendMessage(this._session.user.id, message);
  }

  async sendPicture(
    picture: ViberTypes.Picture,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this._session) {
      warning(
        false,
        `sendPicture: should not be called in context without session`
      );
      return;
    }

    this._isHandled = true;

    return this._client.sendPicture(this._session.user.id, picture, options);
  }

  async sendVideo(
    video: ViberTypes.Video,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this._session) {
      warning(
        false,
        `sendVideo: should not be called in context without session`
      );
      return;
    }

    this._isHandled = true;

    return this._client.sendVideo(this._session.user.id, video, options);
  }

  async sendFile(
    file: ViberTypes.File,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this._session) {
      warning(
        false,
        `sendFile: should not be called in context without session`
      );
      return;
    }

    this._isHandled = true;

    return this._client.sendFile(this._session.user.id, file, options);
  }

  async sendContact(
    contact: ViberTypes.Contact,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this._session) {
      warning(
        false,
        `sendContact: should not be called in context without session`
      );
      return;
    }

    this._isHandled = true;

    return this._client.sendContact(this._session.user.id, contact, options);
  }

  async sendLocation(
    location: ViberTypes.Location,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this._session) {
      warning(
        false,
        `sendLocation: should not be called in context without session`
      );
      return;
    }

    this._isHandled = true;

    return this._client.sendLocation(this._session.user.id, location, options);
  }

  async sendURL(
    url: string,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this._session) {
      warning(
        false,
        `sendURL: should not be called in context without session`
      );
      return;
    }

    this._isHandled = true;

    return this._client.sendURL(this._session.user.id, url, options);
  }

  async sendSticker(
    stickerId: number,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this._session) {
      warning(
        false,
        `sendSticker: should not be called in context without session`
      );
      return;
    }

    this._isHandled = true;

    return this._client.sendSticker(this._session.user.id, stickerId, options);
  }

  async sendCarouselContent(
    richMedia: ViberTypes.RichMedia,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this._session) {
      warning(
        false,
        `sendCarouselContent: should not be called in context without session`
      );
      return;
    }

    this._isHandled = true;

    return this._client.sendCarouselContent(
      this._session.user.id,
      richMedia,
      options
    );
  }
}

export default ViberContext;
