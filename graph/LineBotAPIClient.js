/* @flow */
import crypto from 'crypto';

import axios from 'axios';

import type Axios from './types.flow';

type User = {
  displayName: string,
  userId: string,
  pictureUrl: string,
  statusMessage: string,
};

type TextMessage = {
  type: 'text',
  text: string,
};

type ImageMessage = {
  type: 'image',
  originalContentUrl: string,
  previewImageUrl: string,
};

type VideoMessage = {
  type: 'video',
  originalContentUrl: string,
  previewImageUrl: string,
};

type AudioMessage = {
  type: 'audio',
  originalContentUrl: string,
  duration: number,
};

type Location = {
  title: string,
  address: string,
  latitude: number,
  longitude: number,
};

type LocationMessage = {
  type: 'location',
  title: string,
  address: string,
  latitude: number,
  longitude: number,
};

type StickerMessage = {
  type: 'sticker',
  packageId: string,
  stickerId: string,
};

type Message =
  | TextMessage
  | ImageMessage
  | VideoMessage
  | AudioMessage
  | LocationMessage
  | StickerMessage;

type MutationSuccessResponse = {};

export default class LineBotAPIClient {
  static factory: LineBotAPIClient = (
    accessToken: string,
    channelSecret: string,
  ) => new LineBotAPIClient(accessToken, channelSecret);

  _channelSecret: string;
  _http: Axios;

  constructor(accessToken: string, channelSecret: string) {
    this._channelSecret = channelSecret;
    this._http = axios.create({
      baseURL: 'https://api.line.me/v2/bot/',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  getHTTPClient: () => Axios = () => this._http;

  /**
   * Get User Profile
   *
   * https://devdocs.line.me/en/#bot-api-get-profile
   * displayName, userId, pictureUrl, statusMessage
   */
  getUserProfile = (userId: string): Promise<User> =>
    this._http.get(`/profile/${userId}`);

  /**
   * Reply Message
   *
   * https://devdocs.line.me/en/#reply-message
   */
  reply = (
    replyToken: string,
    messages: Array<Message>,
  ): Promise<MutationSuccessResponse> =>
    this._http.post('/message/reply', { replyToken, messages });

  replyText = (
    replyToken: string,
    text: string,
  ): Promise<MutationSuccessResponse> =>
    this.reply(replyToken, [{ type: 'text', text }]);

  /**
   * Push Message
   *
   * https://devdocs.line.me/en/#push-message
   */
  push = (
    to: string,
    messages: Array<Message>,
  ): Promise<MutationSuccessResponse> =>
    this._http.post('/message/push', { to, messages });

  pushText = (to: string, text: string): Promise<MutationSuccessResponse> =>
    this.push(to, [{ type: 'text', text }]);

  pushImage = (
    to: string,
    contentUrl: string,
    previewUrl: ?string,
  ): Promise<MutationSuccessResponse> =>
    this.push(to, [
      {
        type: 'image',
        originalContentUrl: contentUrl,
        previewImageUrl: previewUrl || contentUrl,
      },
    ]);

  pushVideo = (
    to: string,
    contentUrl: string,
    previewUrl: string,
  ): Promise<MutationSuccessResponse> =>
    this.push(to, [
      {
        type: 'video',
        originalContentUrl: contentUrl,
        previewImageUrl: previewUrl,
      },
    ]);

  pushAudio = (
    to: string,
    contentUrl: string,
    duration: number,
  ): Promise<MutationSuccessResponse> =>
    this.push(to, [
      {
        type: 'audio',
        originalContentUrl: contentUrl,
        duration,
      },
    ]);

  pushLocation = (
    to: string,
    {
      title,
      address,
      latitude,
      longitude,
    }: Location,
  ): Promise<MutationSuccessResponse> =>
    this.push(to, [
      {
        type: 'location',
        title,
        address,
        latitude,
        longitude,
      },
    ]);

  pushSticker = (
    to: string,
    packageId: string,
    stickerId: string,
  ): Promise<MutationSuccessResponse> =>
    this.push(to, [
      {
        type: 'sticker',
        packageId,
        stickerId,
      },
    ]);

  /**
   * Imagemap Message
   *
   * https://devdocs.line.me/en/#imagemap-message
   */
  pushImagemap = (
    to: string,
    altText: string,
    {
      baseUrl,
      baseHeight,
      baseWidth,
      actions,
    },
  ): Promise<MutationSuccessResponse> =>
    this.push(to, [
      {
        type: 'imagemap',
        baseUrl,
        altText,
        baseSize: {
          height: baseHeight,
          width: baseWidth,
        },
        actions,
      },
    ]);

  /**
   * Template Messages
   *
   * https://devdocs.line.me/en/#template-messages
   */
  pushTemplate = (
    to: string,
    altText: string,
    template,
  ): Promise<MutationSuccessResponse> =>
    this.push(to, [
      {
        type: 'template',
        altText,
        template,
      },
    ]);

  pushButtonTemplate = (
    to: string,
    altText: string,
    {
      thumbnailImageUrl,
      title,
      text,
      actions,
    },
  ): Promise<MutationSuccessResponse> =>
    this.pushTemplate(to, altText, {
      type: 'buttons',
      thumbnailImageUrl,
      title,
      text,
      actions,
    });

  pushConfirmTemplate = (
    to: string,
    altText: string,
    {
      text,
      actions,
    },
  ): Promise<MutationSuccessResponse> =>
    this.pushTemplate(to, altText, {
      type: 'confirm',
      text,
      actions,
    });

  pushCarouselTemplate = (
    to: string,
    altText: string,
    columns,
  ): Promise<MutationSuccessResponse> =>
    this.pushTemplate(to, altText, {
      type: 'carousel',
      columns,
    });

  /**
   * Multicast
   *
   * https://devdocs.line.me/en/#multicast
   */
  multicast = (
    to: Array<string>,
    messages: Array<Message>,
  ): Promise<MutationSuccessResponse> =>
    this._http.post('/message/multicast', { to, messages });

  /**
   * Leave
   *
   * https://devdocs.line.me/en/#leave
   */
  leaveGroup = (groupId: string): Promise<MutationSuccessResponse> =>
    this._http.post(`/group/${groupId}/leave`);

  leaveRoom = (roomId: string): Promise<MutationSuccessResponse> =>
    this._http.post(`/room/${roomId}/leave`);

  /**
   * Signature Validation
   *
   * https://devdocs.line.me/en/#webhooks
   */
  isValidSignature = (rawBody, signature: string): boolean =>
    signature ===
    crypto
      .createHmac('sha256', this._channelSecret)
      .update(rawBody, 'utf8')
      .digest('base64');

  /**
   * Content
   *
   * https://devdocs.line.me/en/#content
   */
  retrieveMessageContent = (messageId: string) =>
    this._http.get(`message/${messageId}/content`);
}
