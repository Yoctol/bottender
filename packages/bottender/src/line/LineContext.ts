import { EventEmitter } from 'events';

import chunk from 'lodash/chunk';
import invariant from 'invariant';
import warning from 'warning';
import { JsonObject } from 'type-fest';
import { Line, LineClient } from 'messaging-api-line';

import Context from '../context/Context';
import Session from '../session/Session';
import { RequestContext } from '../types';

import LineEvent from './LineEvent';
import * as LineTypes from './LineTypes';

export type LineContextOptions = {
  client: LineClient;
  event: LineEvent;
  session?: Session | null;
  initialState?: JsonObject | null;
  requestContext?: RequestContext;
  customAccessToken?: string;
  shouldBatch?: boolean;
  sendMethod?: string;
  emitter?: EventEmitter | null;
};

class LineContext extends Context<LineClient, LineEvent> {
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
  }: LineContextOptions) {
    super({ client, event, session, initialState, requestContext, emitter });
    this._shouldBatch = shouldBatch || false;
    this._sendMethod = sendMethod || 'reply';

    // TODO: remove this in v2
    if (customAccessToken) {
      this.useAccessToken(customAccessToken);
    }
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): 'line' {
    return 'line';
  }

  /**
   * Get applied access token.
   *
   */
  get accessToken(): string {
    return this._client.accessToken;
  }

  /**
   * Inject access token for the context.
   *
   * @deprecated No longer recommended.
   */
  useAccessToken(accessToken: string): void {
    warning(false, '`useAccessToken` is deprecated.');
    // @ts-expect-error
    this._client.accessToken = accessToken;
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
  async handlerDidEnd(): Promise<void> {
    if (this._shouldBatch) {
      // After starting this batch, every api should be called out of batch mode
      this._shouldBatch = false;

      if (this._replyMessages.length > 0) {
        const messageChunks = chunk(this._replyMessages, 5);
        warning(
          messageChunks.length === 1,
          'one replyToken can only be used to reply 5 messages'
        );
        if (this._event.replyToken) {
          await this._client.reply(this._event.replyToken, messageChunks[0]);
        }
      }

      if (this._pushMessages.length > 0) {
        if (this._session) {
          const sessionTypeId = this._session[this._session.type].id;

          const messageChunks = chunk(this._pushMessages, 5);

          for (let i = 0; i < messageChunks.length; i++) {
            const messages = messageChunks[i];

            // eslint-disable-next-line no-await-in-loop
            await this._client.push(sessionTypeId, messages);
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

    return this._client.getMessageContent(messageId);
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
        return this._client.leaveRoom(this._session.room.id);
      case 'group':
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
   * Gets the member count in group/room.
   *
   */
  async getMembersCount(): Promise<number | null> {
    if (!this._session) {
      warning(
        false,
        'getMembersCount: should not be called in context without session'
      );
      return null;
    }

    switch (this._session.type) {
      case 'room':
        return this._client.getRoomMembersCount(this._session.room.id);
      case 'group':
        return this._client.getGroupMembersCount(this._session.group.id);
      default:
        return 1;
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
        return this._client.getAllRoomMemberIds(this._session.room.id);
      case 'group':
        return this._client.getAllGroupMemberIds(this._session.group.id);
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

  /**
   * Issues a link token used for the account link feature with current user.
   *
   */
  async issueLinkToken(): Promise<any> {
    if (this._session && this._session.user) {
      return this._client.issueLinkToken(this._session.user.id);
    }
    warning(
      false,
      'issueLinkToken: should not be called in context without session user'
    );
  }

  reply(messages: LineTypes.Message[]) {
    invariant(!this._isReplied, 'Can not reply event multiple times');

    if (this._shouldBatch) {
      this._replyMessages.push(...messages);

      return;
    }

    this._isReplied = true;

    // FIXME: throw or warn for no replyToken
    return this._client.reply(this._event.replyToken as string, messages);
  }

  replyText(
    text: string,
    options?: LineTypes.MessageOptions & { emojis?: LineTypes.Emoji[] }
  ) {
    return this.reply([Line.createText(text, options)]);
  }

  replyImage(
    image: {
      originalContentUrl: string;
      previewImageUrl?: string;
    },
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createImage(image, options)]);
  }

  replyVideo(
    video: {
      originalContentUrl: string;
      previewImageUrl: string;
    },
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createVideo(video, options)]);
  }

  replyAudio(
    audio: {
      originalContentUrl: string;
      duration: number;
    },
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createAudio(audio, options)]);
  }

  replyLocation(
    location: LineTypes.Location,
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createLocation(location, options)]);
  }

  replySticker(
    sticker: Omit<LineTypes.StickerMessage, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createSticker(sticker, options)]);
  }

  replyImagemap(
    altText: string,
    imagemap: Omit<LineTypes.ImagemapMessage, 'type' | 'altText'>,
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createImagemap(altText, imagemap, options)]);
  }

  replyFlex(
    altText: string,
    flex: LineTypes.FlexContainer,
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createFlex(altText, flex, options)]);
  }

  replyTemplate(
    altText: string,
    template: LineTypes.Template,
    options?: LineTypes.MessageOptions
  ) {
    return this.reply([Line.createTemplate(altText, template, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  replyButtonTemplate(
    altText: string,
    buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.replyButtonTemplate()` is deprecated. Use `context.replyButtonsTemplate()` instead.'
    );
    return this.reply([
      Line.createButtonTemplate(altText, buttonTemplate, options),
    ]);
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
    return this.reply([
      Line.createConfirmTemplate(altText, confirmTemplate, options),
    ]);
  }

  replyCarouselTemplate(
    altText: string,
    columns: LineTypes.ColumnObject[],
    options: {
      imageAspectRatio?: 'rectangle' | 'square';
      imageSize?: 'cover' | 'contain';
    } & LineTypes.MessageOptions
  ) {
    return this.reply([Line.createCarouselTemplate(altText, columns, options)]);
  }

  replyImageCarouselTemplate(
    altText: string,
    columns: LineTypes.ImageCarouselColumnObject[],
    options: LineTypes.MessageOptions
  ) {
    return this.reply([
      Line.createImageCarouselTemplate(altText, columns, options),
    ]);
  }

  /**
   * @deprecated No longer recommended.
   */
  push(messages: LineTypes.Message[]) {
    warning(
      false,
      '`context.push()` is deprecated. Use `context.client.push()` instead.'
    );
    if (!this._session) {
      warning(false, `push: should not be called in context without session`);
      return;
    }

    if (this._shouldBatch) {
      this._pushMessages.push(...messages);
      return;
    }

    const sessionType = this._session.type;
    return this._client.push(this._session[sessionType].id, messages);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushText(
    text: string,
    options?: LineTypes.MessageOptions & { emojis?: LineTypes.Emoji[] }
  ) {
    warning(
      false,
      '`context.pushText()` is deprecated. Use `context.client.pushText()` instead.'
    );
    return this.push([Line.createText(text, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushImage(
    image: {
      originalContentUrl: string;
      previewImageUrl?: string;
    },
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushImage()` is deprecated. Use `context.client.pushImage()` instead.'
    );
    return this.push([Line.createImage(image, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushVideo(
    video: {
      originalContentUrl: string;
      previewImageUrl: string;
    },
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushVideo()` is deprecated. Use `context.client.pushVideo()` instead.'
    );
    return this.push([Line.createVideo(video, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushAudio(
    audio: {
      originalContentUrl: string;
      duration: number;
    },
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushAudio()` is deprecated. Use `context.client.pushAudio()` instead.'
    );
    return this.push([Line.createAudio(audio, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushLocation(
    location: LineTypes.Location,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushLocation()` is deprecated. Use `context.client.pushLocation()` instead.'
    );
    return this.push([Line.createLocation(location, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushSticker(
    sticker: Omit<LineTypes.StickerMessage, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushSticker()` is deprecated. Use `context.client.pushSticker()` instead.'
    );
    return this.push([Line.createSticker(sticker, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushImagemap(
    altText: string,
    imagemap: Omit<LineTypes.ImagemapMessage, 'type' | 'altText'>,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushImagemap()` is deprecated. Use `context.client.pushImagemap()` instead.'
    );
    return this.push([Line.createImagemap(altText, imagemap, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushFlex(
    altText: string,
    flex: LineTypes.FlexContainer,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushFlex()` is deprecated. Use `context.client.pushFlex()` instead.'
    );
    return this.push([Line.createFlex(altText, flex, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushTemplate(
    altText: string,
    template: LineTypes.Template,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushTemplate()` is deprecated. Use `context.client.pushTemplate()` instead.'
    );
    return this.push([Line.createTemplate(altText, template, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushButtonTemplate(
    altText: string,
    buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushButtonTemplate()` is deprecated. Use `context.client.pushButtonTemplate()` instead.'
    );
    return this.push([
      Line.createButtonTemplate(altText, buttonTemplate, options),
    ]);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushButtonsTemplate(
    altText: string,
    buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushButtonsTemplate()` is deprecated. Use `context.client.pushButtonsTemplate()` instead.'
    );
    return this.pushButtonTemplate(altText, buttonTemplate, options);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushConfirmTemplate(
    altText: string,
    confirmTemplate: Omit<LineTypes.ConfirmTemplate, 'type'>,
    options: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushConfirmTemplate()` is deprecated. Use `context.client.pushConfirmTemplate()` instead.'
    );
    return this.push([
      Line.createConfirmTemplate(altText, confirmTemplate, options),
    ]);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushCarouselTemplate(
    altText: string,
    columns: LineTypes.ColumnObject[],
    options: {
      imageAspectRatio?: 'rectangle' | 'square';
      imageSize?: 'cover' | 'contain';
    } & LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushCarouselTemplate()` is deprecated. Use `context.client.pushCarouselTemplate()` instead.'
    );
    return this.push([Line.createCarouselTemplate(altText, columns, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  pushImageCarouselTemplate(
    altText: string,
    columns: LineTypes.ImageCarouselColumnObject[],
    options: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.pushImageCarouselTemplate()` is deprecated. Use `context.client.pushImageCarouselTemplate()` instead.'
    );
    return this.push([
      Line.createImageCarouselTemplate(altText, columns, options),
    ]);
  }

  /**
   * @deprecated No longer recommended.
   */
  send(messages: LineTypes.Message[]) {
    warning(
      false,
      '`context.send()` is deprecated. Use `context.reply()` instead.'
    );
    if (this._sendMethod === 'push') {
      return this.push(messages);
    }
    return this.reply(messages);
  }

  sendText(
    text: string,
    options?: LineTypes.MessageOptions & { emojis?: LineTypes.Emoji[] }
  ) {
    return this.send([Line.createText(text, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendImage(
    image: {
      originalContentUrl: string;
      previewImageUrl?: string;
    },
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendImage()` is deprecated. Use `context.replyImage()` instead.'
    );
    return this.send([Line.createImage(image, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendVideo(
    video: {
      originalContentUrl: string;
      previewImageUrl: string;
    },
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendVideo()` is deprecated. Use `context.replyVideo()` instead.'
    );
    return this.send([Line.createVideo(video, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendAudio(
    audio: {
      originalContentUrl: string;
      duration: number;
    },
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendAudio()` is deprecated. Use `context.replyAudio()` instead.'
    );
    return this.send([Line.createAudio(audio, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendLocation(
    location: LineTypes.Location,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendLocation()` is deprecated. Use `context.replyLocation()` instead.'
    );
    return this.send([Line.createLocation(location, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendSticker(
    sticker: Omit<LineTypes.StickerMessage, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendSticker()` is deprecated. Use `context.replySticker()` instead.'
    );
    return this.send([Line.createSticker(sticker, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendImagemap(
    altText: string,
    imagemap: Omit<LineTypes.ImagemapMessage, 'type' | 'altText'>,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendImagemap()` is deprecated. Use `context.replyImagemap()` instead.'
    );
    return this.send([Line.createImagemap(altText, imagemap, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendFlex(
    altText: string,
    flex: LineTypes.FlexContainer,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendFlex()` is deprecated. Use `context.replyFlex()` instead.'
    );
    return this.send([Line.createFlex(altText, flex, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendTemplate(
    altText: string,
    template: LineTypes.Template,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendTemplate()` is deprecated. Use `context.replyTemplate()` instead.'
    );
    return this.send([Line.createTemplate(altText, template, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendButtonTemplate(
    altText: string,
    buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendButtonTemplate()` is deprecated. Use `context.replyButtonsTemplate()` instead.'
    );
    return this.send([
      Line.createButtonTemplate(altText, buttonTemplate, options),
    ]);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendButtonsTemplate(
    altText: string,
    buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendButtonsTemplate()` is deprecated. Use `context.replyButtonsTemplate()` instead.'
    );
    return this.sendButtonTemplate(altText, buttonTemplate, options);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendConfirmTemplate(
    altText: string,
    confirmTemplate: Omit<LineTypes.ConfirmTemplate, 'type'>,
    options?: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendConfirmTemplate()` is deprecated. Use `context.replyConfirmTemplate()` instead.'
    );
    return this.send([
      Line.createConfirmTemplate(altText, confirmTemplate, options),
    ]);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendCarouselTemplate(
    altText: string,
    columns: LineTypes.ColumnObject[],
    options?: {
      imageAspectRatio?: 'rectangle' | 'square';
      imageSize?: 'cover' | 'contain';
    } & LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendCarouselTemplate()` is deprecated. Use `context.replyCarouselTemplate()` instead.'
    );
    return this.send([Line.createCarouselTemplate(altText, columns, options)]);
  }

  /**
   * @deprecated No longer recommended.
   */
  sendImageCarouselTemplate(
    altText: string,
    columns: LineTypes.ImageCarouselColumnObject[],
    options: LineTypes.MessageOptions
  ) {
    warning(
      false,
      '`context.sendImageCarouselTemplate()` is deprecated. Use `context.replyImageCarouselTemplate()` instead.'
    );
    return this.send([
      Line.createImageCarouselTemplate(altText, columns, options),
    ]);
  }
}

export default LineContext;
