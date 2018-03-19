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
   * Leave room or group depending on type of the session.
   *
   */
  async leave(): Promise<any> {
    if (!this._session) {
      warning(false, 'leave: should not be called in context without session');
      return;
    }

    switch (this._session.type) {
      case 'room':
        this._isHandled = true;
        return this._client.leaveRoom(this._session.room.id);
      case 'group':
        this._isHandled = true;
        return this._client.leaveGroup(this._session.group.id);
      default:
        warning(
          false,
          'leave: should not be called in context which is not room or group session'
        );
    }
  }

  /**
   * Gets profile information of current user.
   *
   */
  async getUserProfile(): Promise<?Object> {
    if (!this._session) {
      warning(
        false,
        'getUserProfile: should not be called in context without session'
      );
      return null;
    }

    if (!this._session.user) {
      warning(
        false,
        'getUserProfile: should not be called in context without user in session'
      );
      return null;
    }

    switch (this._session.type) {
      case 'room':
        return this._client.getRoomMemberProfile(
          this._session.room.id,
          this._session.user.id
        );
      case 'group':
        return this._client.getGroupMemberProfile(
          this._session.group.id,
          this._session.user.id
        );
      case 'user':
      default:
        return this._client.getUserProfile(this._session.user.id);
    }
  }

  /**
   * Gets the user profile of a member of the group/room that the bot is in.
   * This includes the user IDs of users who has not added the bot as a friend or has blocked the bot.
   *
   */
  async getMemberProfile(userId: string): Promise<?Object> {
    if (!this._session) {
      warning(
        false,
        'getMemberProfile: should not be called in context without session'
      );
      return null;
    }

    switch (this._session.type) {
      case 'room':
        return this._client.getRoomMemberProfile(this._session.room.id, userId);
      case 'group':
        return this._client.getGroupMemberProfile(
          this._session.group.id,
          userId
        );
      default:
        warning(
          false,
          'getMemberProfile: should not be called in context which is not room or group session'
        );
        return null;
    }
  }

  /**
   * Gets the ID of the users of the members of the group/room that the bot is in.
   * This includes the user IDs of users who have not added the bot as a friend or has blocked the bot.
   *
   * This feature is only available for LINE@ Approved accounts or official accounts.
   *
   */
  async getMemberIds(start: string): Promise<?Object> {
    if (!this._session) {
      warning(
        false,
        'getMemberIds: should not be called in context without session'
      );
      return null;
    }

    switch (this._session.type) {
      case 'room':
        return this._client.getRoomMemberIds(this._session.room.id, start);
      case 'group':
        return this._client.getGroupMemberIds(this._session.group.id, start);
      default:
        warning(
          false,
          'getMemberIds: should not be called in context which is not room or group session'
        );
        return null;
    }
  }

  /**
   * Recursively gets the ID of the users of the members of the group/room that the bot is in using cursors.
   *
   * This feature is only available for LINE@ Approved accounts or official accounts.
   *
   */
  async getAllMemberIds(): Promise<?Array<string>> {
    if (!this._session) {
      warning(
        false,
        'getAllMemberIds: should not be called in context without session'
      );
      return;
    }

    switch (this._session.type) {
      case 'room':
        return this._client.getAllRoomMemberIds(this._session.room.id);
      case 'group':
        return this._client.getAllGroupMemberIds(this._session.group.id);
      default:
        warning(
          false,
          'getAllMemberIds: should not be called in context which is not room or group session'
        );
    }
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
  '',
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

types.filter(type => type !== 'Text' && type !== '').forEach(type => {
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
