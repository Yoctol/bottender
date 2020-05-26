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
   *
   * @see https://developers.facebook.com/docs/graph-api/reference/v6.0/object/comments
   *
   * @param objectId ID of the object.
   * @param comment A comment text or a comment object.
   * @param options
   */
  sendComment(
    objectId: string,
    comment: string | Types.InputComment
  ): Promise<{ id: string }> {
    const body = typeof comment === 'string' ? { message: comment } : comment;

    return this._axios
      .post<{ id: string }>(`/${objectId}/comments`, body, {
        params: {
          access_token: this._accessToken,
        },
      })
      .then(res => res.data, handleError);
  }

  /**
   * Add new likes to any object.
   *
   * @see https://developers.facebook.com/docs/graph-api/reference/v6.0/object/likes
   *
   * @param objectId ID of the object.
   * @param options
   */
  sendLike(objectId: string): Promise<{ success: true }> {
    return this._axios
      .post<{ success: true }>(`/${objectId}/likes`, undefined, {
        params: {
          access_token: this._accessToken,
        },
      })
      .then(res => res.data, handleError);
  }

  /**
   * Get the data of the comment.
   *
   * @see https://developers.facebook.com/docs/graph-api/reference/v6.0/comment
   *
   * @param commentId ID of the comment.
   * @param options
   */
  getComment(
    commentId: string,
    {
      summary,
      filter,
      fields,
    }: {
      summary?: boolean;
      filter?: 'toplevel' | 'stream';
      fields?: string | Types.CommentField[];
    } = {}
  ): Promise<Types.Comment> {
    const conjunctFields = Array.isArray(fields) ? fields.join(',') : fields;

    return this._axios
      .get<Types.Comment>(`/${commentId}`, {
        params: {
          summary: summary ? 'true' : undefined,
          filter,
          fields: conjunctFields,
          access_token: this._accessToken,
        },
      })
      .then(res => res.data, handleError);
  }

  /**
   * Get the data of likes on the object.
   *
   * @see https://developers.facebook.com/docs/graph-api/reference/v6.0/object/likes
   *
   * @param objectId ID of the comment.
   * @param options
   */
  getLikes(
    objectId: string,
    { summary }: { summary?: boolean } = {}
  ): Promise<Types.Likes> {
    return this._axios
      .get<{
        id: string;
        likes: Types.Likes;
      }>(`/${objectId}/likes`, {
        params: {
          summary: summary ? 'true' : undefined,
          access_token: this._accessToken,
        },
      })
      .then(res => res.data.likes, handleError);
  }
}
