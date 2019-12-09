import querystring from 'querystring';

import warning from 'warning';

import * as Types from './FacebookTypes';

function sendPrivateReply(
  objectId: string,
  message: string,
  options?: { accessToken?: string }
) {
  warning(false, '');

  return {
    method: 'POST',
    relativeUrl: `${objectId}/private_replies`,
    body: {
      message,
      ...options,
    },
  };
}

function sendComment(
  objectId: string,
  comment:
    | string
    | {
        attachmentId?: string;
        attachmentShareUrl?: string;
        attachmentUrl?: string;
        message?: string;
      },
  options?: {
    accessToken?: string;
  }
) {
  let body;

  if (typeof comment === 'string') {
    body = {
      message: comment,
    };
  } else {
    body = comment;
  }

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
) {
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
  }: { fields?: string | Types.CommentField[]; accessToken?: string } = {}
) {
  const conjunctFields = Array.isArray(fields) ? fields.join(',') : fields;

  const query = {} as Record<string, string>;

  if (conjunctFields) {
    query.fields = conjunctFields;
  }

  if (accessToken) {
    query.access_token = accessToken;
  }

  return {
    method: 'GET',
    relativeUrl: `${commentId}?${querystring.stringify(query)}`,
  };
}

function getLikes(
  objectId: string,
  { summary, accessToken }: { summary?: boolean; accessToken?: string } = {}
) {
  const query = {} as Record<string, string>;

  if (summary) {
    query.summary = String(summary);
  }

  if (accessToken) {
    query.access_token = accessToken;
  }

  return {
    method: 'GET',
    relativeUrl: `${objectId}/likes?${querystring.stringify(query)}`,
  };
}

const FacebookBatch = {
  sendPrivateReply,
  sendComment,
  sendLike,
  getComment,
  getLikes,
};

export default FacebookBatch;
