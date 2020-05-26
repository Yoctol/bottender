import querystring from 'querystring';

import { MessengerTypes } from 'messaging-api-messenger';

import * as Types from './FacebookTypes';

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

function getComment(
  commentId: string,
  {
    fields,
    accessToken,
  }: {
    fields?: string | Types.CommentField[];
    accessToken?: string;
  } = {}
): MessengerTypes.BatchItem {
  const conjunctFields = Array.isArray(fields) ? fields.join(',') : fields;

  const query = {
    ...(conjunctFields && { fields: conjunctFields }),
    ...(accessToken && { access_token: accessToken }),
  };

  return {
    method: 'GET',
    relativeUrl: `${commentId}?${querystring.stringify(query)}`,
  };
}

function getLikes(
  objectId: string,
  { summary, accessToken }: { summary?: boolean; accessToken?: string } = {}
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
