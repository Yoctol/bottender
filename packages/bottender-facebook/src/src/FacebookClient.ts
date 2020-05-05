import AxiosError from 'axios-error';
import get from 'lodash/get';
import { MessengerClient, MessengerTypes } from 'messaging-api-messenger';

import * as Types from './FacebookTypes';

function handleError(err: AxiosError): never {
  if (err.response && err.response.data) {
    const error = get(err, 'response.data.error', {});
    const msg = `Facebook API - ${error.code} ${error.type} ${error.message}`;
    throw new AxiosError(msg, err);
  }
  throw new AxiosError(err.message, err);
}

export default class FacebookClient extends MessengerClient {
  static connect(
    accessTokenOrConfig: string | MessengerTypes.ClientConfig,
    version = '6.0'
  ): FacebookClient {
    return new FacebookClient(accessTokenOrConfig, version);
  }

  /**
   * Publish new comments to any object.
   * Reference: https://developers.facebook.com/docs/graph-api/reference/v6.0/object/comments
   *
   * @param objectId ID of the object.
   * @param comment A comment text or a comment object.
   * @param options
   */
  sendComment(
    objectId: string,
    comment: string | Types.InputComment,
    { accessToken: customAccessToken }: { accessToken?: string } = {}
  ): Promise<{ id: string }> {
    const body = typeof comment === 'string' ? { message: comment } : comment;

    return this._axios
      .post<{ id: string }>(`/${objectId}/comments`, body, {
        params: {
          access_token: customAccessToken || this._accessToken,
        },
      })
      .then(res => res.data, handleError);
  }

  /**
   * Add new likes to any object.
   * Reference: https://developers.facebook.com/docs/graph-api/reference/v6.0/object/likes
   *
   * @param objectId ID of the object.
   * @param options
   */
  sendLike(
    objectId: string,
    { accessToken: customAccessToken }: { accessToken?: string } = {}
  ): Promise<{ success: true }> {
    return this._axios
      .post<{ success: true }>(`/${objectId}/likes`, undefined, {
        params: {
          access_token: customAccessToken || this._accessToken,
        },
      })
      .then(res => res.data, handleError);
  }

  /**
   *
   * Reference: https://developers.facebook.com/docs/graph-api/reference/v6.0/comment
   *
   * @param commentId ID of the comment.
   * @param options
   */
  getComment(
    commentId: string,
    {
      fields,
      accessToken: customAccessToken,
    }: {
      fields?: string | Types.CommentField[];
      accessToken?: string;
    } = {}
  ): Promise<Types.Comment> {
    const conjunctFields = Array.isArray(fields) ? fields.join(',') : fields;

    return this._axios
      .get<Types.Comment>(`/${commentId}`, {
        params: {
          fields: conjunctFields || undefined,
          access_token: customAccessToken || this._accessToken,
        },
      })
      .then(res => res.data, handleError);
  }

  /**
   *
   * Reference: https://developers.facebook.com/docs/graph-api/reference/v6.0/object/likes
   *
   * @param objectId ID of the comment.
   * @param options
   */
  getLikes(
    objectId: string,
    {
      summary,
      accessToken: customAccessToken,
    }: {
      summary?: boolean;
      accessToken?: string;
    } = {}
  ): Promise<Types.Likes> {
    return this._axios
      .get<{
        id: string;
        likes: Types.Likes;
      }>(`/${objectId}/likes`, {
        params: {
          summary: summary ? 'true' : undefined,
          access_token: customAccessToken || this._accessToken,
        },
      })
      .then(res => res.data.likes, handleError);
  }
}
