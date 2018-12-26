/* @flow */

import chunk from 'lodash/chunk';
import invariant from 'invariant';
import sleep from 'delay';
import warning from 'warning';
import { Line, LineClient } from 'messaging-api-line';

import { type Session } from '../session/Session';

import Context from './Context';
import LineEvent from './LineEvent';
import { type PlatformContext } from './PlatformContext';

type Options = {|
  client: LineClient,
  event: LineEvent,
  session: ?Session,
  initialState: ?Object,
  requestContext: ?Object,
  customAccessToken: ?string,
  shouldBatch: ?boolean,
  sendMethod: ?string,
|};

class LineContext extends Context implements PlatformContext {
  _client: LineClient = this._client;

  _event: LineEvent = this._event;

  _session: ?Session = this._session;

  _customAccessToken: ?string;

  _isReplied: boolean = false;

  _shouldBatch: boolean;

  _replyMessages = [];

  _pushMessages = [];

  _sendMethod: string;

  constructor({
    client,
    event,
    session,
    initialState,
    requestContext,
    customAccessToken,
    shouldBatch,
    sendMethod,
  }: Options) {
    super({ client, event, session, initialState, requestContext });
    this._customAccessToken = customAccessToken;
    this._shouldBatch = shouldBatch || false;
    this._sendMethod = sendMethod || 'push';
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'line';
  }

  /**
   * Get applied access token.
   *
   */
  get accessToken(): ?string {
    return this._customAccessToken || this._client.accessToken;
  }

  /**
   * Inject access token for the context.
   *
   */
  useAccessToken(accessToken: string) {
    this._customAccessToken = accessToken;
  }

  /**
   * Determine if the reply token is already used.
   *
   */
  get isReplied(): boolean {
    return this._isReplied;
  }

  /**
   * Context Lifecycle Hook
   */
  async handlerDidEnd() {
    if (this._shouldBatch) {
      if (this._replyMessages.length > 0) {
        const messageChunks = chunk(this._replyMessages, 5);
        warning(
          messageChunks.length === 1,
          'one replyToken can only be used to reply 5 messages'
        );
        await this._client.reply(this._event.replyToken, messageChunks[0], {
          accessToken: this._customAccessToken,
        });
      }

      if (this._pushMessages.length > 0) {
        if (this._session) {
          const sessionTypeId = this._session[this._session.type].id;

          const messageChunks = chunk(this._pushMessages, 5);

          for (let i = 0; i < messageChunks.length; i++) {
            const messages = messageChunks[i];

            // eslint-disable-next-line no-await-in-loop
            await this._client.push(sessionTypeId, messages, {
              accessToken: this._customAccessToken,
            });
          }
        } else {
          warning(
            false,
            'push: should not be called in context without session'
          );
        }
      }
    }
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
  async sendText(text: string, options?: Object): Promise<any> {
    if (this._sendMethod === 'reply') {
      // $FlowExpectedError: dynamically defined below
      return this.replyText(text, {
        accessToken: this._customAccessToken,
        ...options,
      });
    }

    // $FlowExpectedError: dynamically defined below
    return this.pushText(text, {
      accessToken: this._customAccessToken,
      ...options,
    });
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
        return this._client.leaveRoom(this._session.room.id, {
          accessToken: this._customAccessToken,
        });
      case 'group':
        this._isHandled = true;
        return this._client.leaveGroup(this._session.group.id, {
          accessToken: this._customAccessToken,
        });
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
          this._session.user.id,
          {
            accessToken: this._customAccessToken,
          }
        );
      case 'group':
        return this._client.getGroupMemberProfile(
          this._session.group.id,
          this._session.user.id,
          {
            accessToken: this._customAccessToken,
          }
        );
      case 'user':
      default:
        return this._client.getUserProfile(this._session.user.id, {
          accessToken: this._customAccessToken,
        });
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
        return this._client.getRoomMemberProfile(
          this._session.room.id,
          userId,
          {
            accessToken: this._customAccessToken,
          }
        );
      case 'group':
        return this._client.getGroupMemberProfile(
          this._session.group.id,
          userId,
          {
            accessToken: this._customAccessToken,
          }
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
        return this._client.getRoomMemberIds(this._session.room.id, start, {
          accessToken: this._customAccessToken,
        });
      case 'group':
        return this._client.getGroupMemberIds(this._session.group.id, start, {
          accessToken: this._customAccessToken,
        });
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
        return this._client.getAllRoomMemberIds(this._session.room.id, {
          accessToken: this._customAccessToken,
        });
      case 'group':
        return this._client.getAllGroupMemberIds(this._session.group.id, {
          accessToken: this._customAccessToken,
        });
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
      return this._client.getLinkedRichMenu(this._session.user.id, {
        accessToken: this._customAccessToken,
      });
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
      return this._client.linkRichMenu(this._session.user.id, richMenuId, {
        accessToken: this._customAccessToken,
      });
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
      return this._client.unlinkRichMenu(this._session.user.id, {
        accessToken: this._customAccessToken,
      });
    }
    warning(
      false,
      'unlinkRichMenu: should not be called in context without session user'
    );
  }

  /**
   * Issues a link token used for the account link feature with current user.
   *
   */
  async issueLinkToken(): Promise<any> {
    if (this._session && this._session.user) {
      return this._client.issueLinkToken(this._session.user.id, {
        accessToken: this._customAccessToken,
      });
    }
    warning(
      false,
      'issueLinkToken: should not be called in context without session user'
    );
  }
}

const types: Array<{ name: string, arity: number, aliases?: Array<string> }> = [
  { name: '', arity: 3 },
  { name: 'Text', arity: 3 },
  { name: 'Image', arity: 3 },
  { name: 'Video', arity: 3 },
  { name: 'Audio', arity: 3 },
  { name: 'Location', arity: 3 },
  { name: 'Sticker', arity: 3 },
  { name: 'Imagemap', arity: 4 },
  { name: 'Flex', arity: 4 },
  { name: 'Template', arity: 4 },
  { name: 'ButtonTemplate', aliases: ['ButtonsTemplate'], arity: 4 },
  { name: 'ConfirmTemplate', arity: 4 },
  { name: 'CarouselTemplate', arity: 4 },
  { name: 'ImageCarouselTemplate', arity: 4 },
];

types.forEach(({ name, arity, aliases }) => {
  [name].concat(aliases || []).forEach(type => {
    Object.defineProperty(LineContext.prototype, `reply${type}`, {
      enumerable: false,
      configurable: true,
      writable: true,
      async value(...args) {
        invariant(!this._isReplied, 'Can not reply event mulitple times');

        this._isHandled = true;

        if (this._shouldBatch) {
          if (name === '') {
            this._replyMessages.push(...args[0]);
          } else {
            this._replyMessages.push(Line[`create${name}`](...args));
          }
          return;
        }

        this._isReplied = true;

        const options = args[arity - 2];
        args[arity - 2] = {
          accessToken: this._customAccessToken,
          ...options,
        };

        return this._client[`reply${name}`](this._event.replyToken, ...args);
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

        if (this._shouldBatch) {
          if (name === '') {
            this._pushMessages.push(...args[0]);
          } else {
            this._pushMessages.push(Line[`create${name}`](...args));
          }
          return;
        }

        const options = args[arity - 2];
        args[arity - 2] = {
          accessToken: this._customAccessToken,
          ...options,
        };

        const sessionType = this._session.type;
        return this._client[`push${name}`](
          this._session[sessionType].id,
          ...args
        );
      },
    });
  });
});

types
  .filter(({ name }) => name !== 'Text' && name !== '')
  .forEach(({ name, aliases }) => {
    [name].concat(aliases || []).forEach(type => {
      Object.defineProperty(LineContext.prototype, `send${type}`, {
        enumerable: false,
        configurable: true,
        writable: true,
        async value(...args) {
          return this[`${this._sendMethod}${type}`](...args);
        },
      });
    });
  });

export default LineContext;
