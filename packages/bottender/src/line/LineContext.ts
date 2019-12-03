import EventEmitter from 'events';

import chunk from 'lodash/chunk';
import invariant from 'invariant';
import sleep from 'delay';
import warning from 'warning';
import { Line, LineClient, LineTypes } from 'messaging-api-line';

import Context from '../context/Context';
import Session from '../session/Session';
import { PlatformContext } from '../context/PlatformContext';
import { RequestContext } from '../types';

import LineEvent from './LineEvent';

type Options = {
  client: LineClient;
  event: LineEvent;
  session?: Session | null;
  initialState?: Record<string, any> | null;
  requestContext?: RequestContext;
  customAccessToken?: string;
  shouldBatch?: boolean;
  sendMethod?: string;
  emitter?: EventEmitter | null;
};

class LineContext extends Context<LineClient, LineEvent>
  implements PlatformContext {
  _customAccessToken: string | null;

  _isReplied = false;

  _shouldBatch: boolean;

  _replyMessages: LineTypes.Message[] = [];

  _pushMessages: LineTypes.Message[] = [];

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
    emitter,
  }: Options) {
    super({ client, event, session, initialState, requestContext, emitter });
    this._customAccessToken = customAccessToken || null;
    this._shouldBatch = shouldBatch || false;
    this._sendMethod = sendMethod || 'reply';
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
  get accessToken(): string {
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
        if (this._event.replyToken) {
          await this._client.reply(this._event.replyToken, messageChunks[0], {
            ...(this._customAccessToken
              ? { accessToken: this._customAccessToken }
              : undefined),
          });
        }
      }

      if (this._pushMessages.length > 0) {
        if (this._session) {
          const sessionTypeId = this._session[this._session.type].id;

          const messageChunks = chunk(this._pushMessages, 5);

          for (let i = 0; i < messageChunks.length; i++) {
            const messages = messageChunks[i];

            // eslint-disable-next-line no-await-in-loop
            await this._client.push(sessionTypeId, messages, {
              ...(this._customAccessToken
                ? { accessToken: this._customAccessToken }
                : undefined),
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
   * Retrieve content for image, video and audio message.
   *
   */
  getMessageContent(): Promise<Buffer> | undefined {
    if (!(this._event.isImage || this._event.isVideo || this._event.isAudio)) {
      warning(
        false,
        'getMessageContent: should only be called with image, video or audio message'
      );
      return;
    }

    const messageId = (this._event.message as any).id;

    return this._client.getMessageContent(messageId, {
      ...(this._customAccessToken
        ? { accessToken: this._customAccessToken }
        : undefined),
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
          ...(this._customAccessToken
            ? { accessToken: this._customAccessToken }
            : undefined),
        } as any);
      case 'group':
        this._isHandled = true;
        return this._client.leaveGroup(this._session.group.id, {
          ...(this._customAccessToken
            ? { accessToken: this._customAccessToken }
            : undefined),
        } as any);
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
  async getUserProfile(): Promise<Record<string, any> | null> {
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
            ...(this._customAccessToken
              ? { accessToken: this._customAccessToken }
              : undefined),
          } as any
        );
      case 'group':
        return this._client.getGroupMemberProfile(
          this._session.group.id,
          this._session.user.id,
          {
            ...(this._customAccessToken
              ? { accessToken: this._customAccessToken }
              : undefined),
          } as any
        );
      case 'user':
      default:
        return this._client.getUserProfile(this._session.user.id, {
          ...(this._customAccessToken
            ? { accessToken: this._customAccessToken }
            : undefined),
        } as any);
    }
  }

  /**
   * Gets the user profile of a member of the group/room that the bot is in.
   * This includes the user IDs of users who has not added the bot as a friend or has blocked the bot.
   *
   */
  async getMemberProfile(userId: string): Promise<Record<string, any> | null> {
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
            ...(this._customAccessToken
              ? { accessToken: this._customAccessToken }
              : undefined),
          } as any
        );
      case 'group':
        return this._client.getGroupMemberProfile(
          this._session.group.id,
          userId,
          {
            ...(this._customAccessToken
              ? { accessToken: this._customAccessToken }
              : undefined),
          } as any
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
  async getMemberIds(start: string): Promise<Record<string, any> | null> {
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
          ...(this._customAccessToken
            ? { accessToken: this._customAccessToken }
            : undefined),
        } as any);
      case 'group':
        return this._client.getGroupMemberIds(this._session.group.id, start, {
          ...(this._customAccessToken
            ? { accessToken: this._customAccessToken }
            : undefined),
        } as any);
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
  async getAllMemberIds(): Promise<string[] | null> {
    if (!this._session) {
      warning(
        false,
        'getAllMemberIds: should not be called in context without session'
      );
      return null;
    }

    switch (this._session.type) {
      case 'room':
        return this._client.getAllRoomMemberIds(this._session.room.id, {
          ...(this._customAccessToken
            ? { accessToken: this._customAccessToken }
            : undefined),
        });
      case 'group':
        return this._client.getAllGroupMemberIds(this._session.group.id, {
          ...(this._customAccessToken
            ? { accessToken: this._customAccessToken }
            : undefined),
        });
      default:
        warning(
          false,
          'getAllMemberIds: should not be called in context which is not room or group session'
        );
        return null;
    }
  }

  /**
   * Gets the ID of the rich menu linked to the user.
   *
   */
  async getLinkedRichMenu(): Promise<any> {
    if (this._session && this._session.user) {
      return this._client.getLinkedRichMenu(this._session.user.id, {
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
      } as any);
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
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
      } as any);
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
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
      } as any);
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
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
      } as any);
    }
    warning(
      false,
      'issueLinkToken: should not be called in context without session user'
    );
  }

  reply(messages: LineTypes.Message[], options: LineTypes.MessageOptions = {}) {
    invariant(!this._isReplied, 'Can not reply event multiple times');

    this._isHandled = true;

    if (this._shouldBatch) {
      this._replyMessages.push(...messages);

      return;
    }

    this._isReplied = true;

    // FIXME: throw or warn for no replyToken
    return this._client.reply(this._event.replyToken as string, messages, {
      ...(this._customAccessToken
        ? { accessToken: this._customAccessToken }
        : undefined),
      ...options,
    });
  }

  replyText(text: string, options?: LineTypes.MessageOptions) {
    return this.reply([Line.createText(text, options)], options);
  }

  replyImage(
    image: {
      originalContentUrl: string;
      previewImageUrl?: string;
    },
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createImage(image, options)], options);
  }

  replyVideo(
    video: {
      originalContentUrl: string;
      previewImageUrl: string;
    },
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createVideo(video, options)], options);
  }

  replyAudio(
    audio: {
      originalContentUrl: string;
      duration: number;
    },
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createAudio(audio, options)], options);
  }

  replyLocation(
    location: LineTypes.Location,
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createLocation(location, options)], options);
  }

  replySticker(
    sticker: Omit<LineTypes.StickerMessage, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createSticker(sticker, options)], options);
  }

  replyImagemap(
    altText: string,
    imagemap: Omit<LineTypes.ImagemapMessage, 'type' | 'altText'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.reply(
      [Line.createImagemap(altText, imagemap, options)],
      options
    );
  }

  replyFlex(
    altText: string,
    flex: LineTypes.FlexContainer,
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createFlex(altText, flex, options)], options);
  }

  replyTemplate(
    altText: string,
    template: LineTypes.Template,
    options?: LineTypes.MessageOptions
  ) {
    return this.reply(
      [Line.createTemplate(altText, template, options)],
      options
    );
  }

  replyButtonTemplate(
    altText: string,
    buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.reply(
      [Line.createButtonTemplate(altText, buttonTemplate, options)],
      options
    );
  }

  replyButtonsTemplate(
    altText: string,
    buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.replyButtonTemplate(altText, buttonTemplate, options);
  }

  replyConfirmTemplate(
    altText: string,
    confirmTemplate: Omit<LineTypes.ConfirmTemplate, 'type'>,
    options: LineTypes.MessageOptions
  ) {
    return this.reply(
      [Line.createConfirmTemplate(altText, confirmTemplate, options)],
      options
    );
  }

  replyCarouselTemplate(
    altText: string,
    columns: LineTypes.ColumnObject[],
    {
      imageAspectRatio,
      imageSize,
      ...options
    }: {
      imageAspectRatio?: 'rectangle' | 'square';
      imageSize?: 'cover' | 'contain';
    } & LineTypes.MessageOptions = {}
  ) {
    return this.reply(
      [
        Line.createCarouselTemplate(altText, columns, {
          imageAspectRatio,
          imageSize,
          ...options,
        }),
      ],
      options
    );
  }

  replyImageCarouselTemplate(
    altText: string,
    columns: LineTypes.ImageCarouselColumnObject[],
    options: LineTypes.MessageOptions
  ) {
    return this.reply(
      [Line.createImageCarouselTemplate(altText, columns, options)],
      options
    );
  }

  push(messages: LineTypes.Message[], options: LineTypes.MessageOptions = {}) {
    if (!this._session) {
      warning(false, `push: should not be called in context without session`);
      return;
    }

    this._isHandled = true;

    if (this._shouldBatch) {
      this._pushMessages.push(...messages);
      return;
    }

    const sessionType = this._session.type;
    return this._client.push(this._session[sessionType].id, messages, {
      ...(this._customAccessToken
        ? { accessToken: this._customAccessToken }
        : undefined),
      ...options,
    });
  }

  pushText(text: string, options?: LineTypes.MessageOptions) {
    return this.push([Line.createText(text, options)], options);
  }

  pushImage(
    image: {
      originalContentUrl: string;
      previewImageUrl?: string;
    },
    options?: LineTypes.MessageOptions
  ) {
    return this.push([Line.createImage(image, options)], options);
  }

  pushVideo(
    video: {
      originalContentUrl: string;
      previewImageUrl: string;
    },
    options?: LineTypes.MessageOptions
  ) {
    return this.push([Line.createVideo(video, options)], options);
  }

  pushAudio(
    audio: {
      originalContentUrl: string;
      duration: number;
    },
    options?: LineTypes.MessageOptions
  ) {
    return this.push([Line.createAudio(audio, options)], options);
  }

  pushLocation(
    location: LineTypes.Location,
    options?: LineTypes.MessageOptions
  ) {
    return this.push([Line.createLocation(location, options)], options);
  }

  pushSticker(
    sticker: Omit<LineTypes.StickerMessage, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.push([Line.createSticker(sticker, options)], options);
  }

  pushImagemap(
    altText: string,
    imagemap: Omit<LineTypes.ImagemapMessage, 'type' | 'altText'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.push(
      [Line.createImagemap(altText, imagemap, options)],
      options
    );
  }

  pushFlex(
    altText: string,
    flex: LineTypes.FlexContainer,
    options?: LineTypes.MessageOptions
  ) {
    return this.push([Line.createFlex(altText, flex, options)], options);
  }

  pushTemplate(
    altText: string,
    template: LineTypes.Template,
    options?: LineTypes.MessageOptions
  ) {
    return this.push(
      [Line.createTemplate(altText, template, options)],
      options
    );
  }

  pushButtonTemplate(
    altText: string,
    buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.push(
      [Line.createButtonTemplate(altText, buttonTemplate, options)],
      options
    );
  }

  pushButtonsTemplate(
    altText: string,
    buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.pushButtonTemplate(altText, buttonTemplate, options);
  }

  pushConfirmTemplate(
    altText: string,
    confirmTemplate: Omit<LineTypes.ConfirmTemplate, 'type'>,
    options: LineTypes.MessageOptions
  ) {
    return this.push(
      [Line.createConfirmTemplate(altText, confirmTemplate, options)],
      options
    );
  }

  pushCarouselTemplate(
    altText: string,
    columns: LineTypes.ColumnObject[],
    {
      imageAspectRatio,
      imageSize,
      ...options
    }: {
      imageAspectRatio?: 'rectangle' | 'square';
      imageSize?: 'cover' | 'contain';
    } & LineTypes.MessageOptions = {}
  ) {
    return this.push(
      [
        Line.createCarouselTemplate(altText, columns, {
          imageAspectRatio,
          imageSize,
          ...options,
        }),
      ],
      options
    );
  }

  pushImageCarouselTemplate(
    altText: string,
    columns: LineTypes.ImageCarouselColumnObject[],
    options: LineTypes.MessageOptions
  ) {
    return this.push(
      [Line.createImageCarouselTemplate(altText, columns, options)],
      options
    );
  }

  send(messages: LineTypes.Message[], options: LineTypes.MessageOptions = {}) {
    if (this._sendMethod === 'push') {
      return this.push(messages, options);
    }
    return this.reply(messages, options);
  }

  sendText(text: string, options?: LineTypes.MessageOptions) {
    return this.send([Line.createText(text, options)], options);
  }

  sendImage(
    image: {
      originalContentUrl: string;
      previewImageUrl?: string;
    },
    options?: LineTypes.MessageOptions
  ) {
    return this.send([Line.createImage(image, options)], options);
  }

  sendVideo(
    video: {
      originalContentUrl: string;
      previewImageUrl: string;
    },
    options?: LineTypes.MessageOptions
  ) {
    return this.send([Line.createVideo(video, options)], options);
  }

  sendAudio(
    audio: {
      originalContentUrl: string;
      duration: number;
    },
    options?: LineTypes.MessageOptions
  ) {
    return this.send([Line.createAudio(audio, options)], options);
  }

  sendLocation(
    location: LineTypes.Location,
    options?: LineTypes.MessageOptions
  ) {
    return this.send([Line.createLocation(location, options)], options);
  }

  sendSticker(
    sticker: Omit<LineTypes.StickerMessage, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.send([Line.createSticker(sticker, options)], options);
  }

  sendImagemap(
    altText: string,
    imagemap: Omit<LineTypes.ImagemapMessage, 'type' | 'altText'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.send(
      [Line.createImagemap(altText, imagemap, options)],
      options
    );
  }

  sendFlex(
    altText: string,
    flex: LineTypes.FlexContainer,
    options?: LineTypes.MessageOptions
  ) {
    return this.send([Line.createFlex(altText, flex, options)], options);
  }

  sendTemplate(
    altText: string,
    template: LineTypes.Template,
    options?: LineTypes.MessageOptions
  ) {
    return this.send(
      [Line.createTemplate(altText, template, options)],
      options
    );
  }

  sendButtonTemplate(
    altText: string,
    buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.send(
      [Line.createButtonTemplate(altText, buttonTemplate, options)],
      options
    );
  }

  sendButtonsTemplate(
    altText: string,
    buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.sendButtonTemplate(altText, buttonTemplate, options);
  }

  sendConfirmTemplate(
    altText: string,
    confirmTemplate: Omit<LineTypes.ConfirmTemplate, 'type'>,
    options: LineTypes.MessageOptions
  ) {
    return this.send(
      [Line.createConfirmTemplate(altText, confirmTemplate, options)],
      options
    );
  }

  sendCarouselTemplate(
    altText: string,
    columns: LineTypes.ColumnObject[],
    {
      imageAspectRatio,
      imageSize,
      ...options
    }: {
      imageAspectRatio?: 'rectangle' | 'square';
      imageSize?: 'cover' | 'contain';
    } & LineTypes.MessageOptions = {}
  ) {
    return this.send(
      [
        Line.createCarouselTemplate(altText, columns, {
          imageAspectRatio,
          imageSize,
          ...options,
        }),
      ],
      options
    );
  }

  sendImageCarouselTemplate(
    altText: string,
    columns: LineTypes.ImageCarouselColumnObject[],
    options: LineTypes.MessageOptions
  ) {
    return this.send(
      [Line.createImageCarouselTemplate(altText, columns, options)],
      options
    );
  }
}

export default LineContext;
