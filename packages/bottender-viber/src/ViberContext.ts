import warning from 'warning';
import { Context } from '@bottender/core';
import { ViberClient, ViberTypes } from 'messaging-api-viber';

import ViberEvent from './ViberEvent';

// TODO: find a better way to add constraint to sessions
type SessionUser = {
  id: string;
};

class ViberContext extends Context<ViberClient, ViberEvent> {
  /**
   * The name of the platform.
   */
  get platform(): 'viber' {
    return 'viber';
  }

  /**
   * Send text to the owner of the session.
   *
   */
  async sendText(
    text: string,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this.session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }

    const user = this.session.user as SessionUser;

    return this.client.sendText(user.id, text, options);
  }

  /**
   * Get user details from the owner of the session.
   *
   */
  async getUserDetails(): Promise<ViberTypes.UserDetails | null> {
    if (!this.session) {
      warning(
        false,
        'getUserDetails: should not be called in context without session'
      );
      return null;
    }

    const user = this.session.user as SessionUser;

    return this.client.getUserDetails(user.id);
  }

  /**
   * Get user online status from the owner of the session.
   *
   */
  async getOnlineStatus(): Promise<ViberTypes.UserOnlineStatus | null> {
    if (!this.session) {
      warning(
        false,
        'getOnlineStatus: should not be called in context without session'
      );
      return null;
    }

    const user = this.session.user as SessionUser;

    const status = await this.client.getOnlineStatus([user.id]);
    return status[0];
  }

  async sendMessage(message: ViberTypes.Message): Promise<any> {
    if (!this.session) {
      warning(
        false,
        `sendMessage: should not be called in context without session`
      );
      return;
    }

    const user = this.session.user as SessionUser;

    return this.client.sendMessage(user.id, message);
  }

  async sendPicture(
    picture: ViberTypes.Picture,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this.session) {
      warning(
        false,
        `sendPicture: should not be called in context without session`
      );
      return;
    }

    const user = this.session.user as SessionUser;

    return this.client.sendPicture(user.id, picture, options);
  }

  async sendVideo(
    video: ViberTypes.Video,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this.session) {
      warning(
        false,
        `sendVideo: should not be called in context without session`
      );
      return;
    }

    const user = this.session.user as SessionUser;

    return this.client.sendVideo(user.id, video, options);
  }

  async sendFile(
    file: ViberTypes.File,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this.session) {
      warning(
        false,
        `sendFile: should not be called in context without session`
      );
      return;
    }

    const user = this.session.user as SessionUser;

    return this.client.sendFile(user.id, file, options);
  }

  async sendContact(
    contact: ViberTypes.Contact,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this.session) {
      warning(
        false,
        `sendContact: should not be called in context without session`
      );
      return;
    }

    const user = this.session.user as SessionUser;

    return this.client.sendContact(user.id, contact, options);
  }

  async sendLocation(
    location: ViberTypes.Location,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this.session) {
      warning(
        false,
        `sendLocation: should not be called in context without session`
      );
      return;
    }

    const user = this.session.user as SessionUser;

    return this.client.sendLocation(user.id, location, options);
  }

  async sendURL(
    url: string,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this.session) {
      warning(
        false,
        `sendURL: should not be called in context without session`
      );
      return;
    }

    const user = this.session.user as SessionUser;

    return this.client.sendURL(user.id, url, options);
  }

  async sendSticker(
    stickerId: number,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this.session) {
      warning(
        false,
        `sendSticker: should not be called in context without session`
      );
      return;
    }

    const user = this.session.user as SessionUser;

    return this.client.sendSticker(user.id, stickerId, options);
  }

  async sendCarouselContent(
    richMedia: ViberTypes.RichMedia,
    options?: ViberTypes.MessageOptions
  ): Promise<any> {
    if (!this.session) {
      warning(
        false,
        `sendCarouselContent: should not be called in context without session`
      );
      return;
    }

    const user = this.session.user as SessionUser;

    return this.client.sendCarouselContent(user.id, richMedia, options);
  }
}

export default ViberContext;
