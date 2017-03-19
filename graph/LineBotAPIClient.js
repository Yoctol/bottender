/* @flow */
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

type Message = TextMessage | {};

type MutationSuccessResponse = {};

export default class LineBotAPIClient {
  static factory: LineBotAPIClient = (accessToken: string) =>
    new LineBotAPIClient(accessToken);

  _http: Axios;

  constructor(accessToken: string) {
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
    this._http.post('/message/reply', {
      replyToken,
      messages,
    });

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
    this._http.post('/message/push', {
      to,
      messages,
    });

  pushText = (to: string, text: string): Promise<MutationSuccessResponse> =>
    this.push(to, [{ type: 'text', text }]);

  /**
   * Multicast
   *
   * https://devdocs.line.me/en/#multicast
   */
  multicast = (
    to: Array<string>,
    messages: Array<Message>,
  ): Promise<MutationSuccessResponse> =>
    this._http.post('/message/multicast', {
      to,
      messages,
    });

  /**
   * Leave
   *
   * https://devdocs.line.me/en/#leave
   */
  leaveGroup = (groupId: string): Promise<MutationSuccessResponse> =>
    this._http.post(`/group/${groupId}/leave`);

  leaveRoom = (roomId: string): Promise<MutationSuccessResponse> =>
    this._http.post(`/room/${roomId}/leave`);
}
