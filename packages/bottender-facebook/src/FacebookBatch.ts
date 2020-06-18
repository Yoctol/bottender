import querystring from 'querystring';

import { MessengerTypes } from 'bottender';

import * as Types from './FacebookTypes';

/**
 * Publish new comments to any object.
 *
 * @see https://developers.facebook.com/docs/graph-api/reference/v6.0/object/comments
 *
 * @param objectId - ID of the object.
 * @param comment - A comment text or a comment object.
 * @param options -
 */
function sendComment(
  objectId: string,
  comment: string | Types.InputComment,
  options?: {
    accessToken?: string;
  }
): MessengerTypes.BatchItem {
  const body = typeof comment === 'string' ? { message: comment } : comment;

  return {
    method: 'POST',
    relativeUrl: `${objectId}/comments`,
    body: {
      ...body,
      ...options,
    },
  };
}

/**
 * Add new likes to any object.
 *
 * @see https://developers.facebook.com/docs/graph-api/reference/v6.0/object/likes
 *
 * @param objectId - ID of the object.
 * @param options -
 */
function sendLike(
  objectId: string,
  options?: {
    accessToken?: string;
  }
): MessengerTypes.BatchItem {
  return {
    method: 'POST',
    relativeUrl: `${objectId}/likes`,
    body: {
      ...options,
    },
  };
}

/**
 * Get the data of the comment.
 *
 * @see https://developers.facebook.com/docs/graph-api/reference/v6.0/comment
 *
 * @param commentId - ID of the comment.
 * @param options -
 */
function getComment(
  commentId: string,
  {
    summary,
    filter,
    fields,
    accessToken,
  }: {
    summary?: boolean;
    filter?: 'toplevel' | 'stream';
    fields?: string | Types.CommentField[];
    accessToken?: string;
  } = {}
): MessengerTypes.BatchItem {
  const conjunctFields = Array.isArray(fields) ? fields.join(',') : fields;

  const query = {
    ...(summary && { summary: 'true' }),
    ...(filter && { filter }),
    ...(conjunctFields && { fields: conjunctFields }),
    ...(accessToken && { access_token: accessToken }),
  };

  return {
    method: 'GET',
    relativeUrl: `${commentId}?${querystring.stringify(query)}`,
  };
}

/**
 * Get the data of likes on the object.
 *
 * @see https://developers.facebook.com/docs/graph-api/reference/v6.0/object/likes
 *
 * @param objectId - ID of the comment.
 * @param options -
 */
function getLikes(
  objectId: string,
  {
    summary,
    accessToken,
  }: {
    summary?: boolean;
    accessToken?: string;
  } = {}
): MessengerTypes.BatchItem {
  const query = {
    ...(summary && { summary: 'true' }),
    ...(accessToken && { access_token: accessToken }),
  };

  return {
    method: 'GET',
    relativeUrl: `${objectId}/likes?${querystring.stringify(query)}`,
  };
}

const FacebookBatch = {
  sendComment,
  sendLike,
  getComment,
  getLikes,
};

export default FacebookBatch;
