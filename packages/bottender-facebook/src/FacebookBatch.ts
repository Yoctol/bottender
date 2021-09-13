import querystring from 'querystring';

import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import { MergeExclusive } from 'type-fest';
import { MessengerTypes } from 'bottender';

import * as Types from './FacebookTypes';

function formatDate(date: Date | string | undefined) {
  if (date instanceof Date) {
    return date.toISOString();
  }
  return date;
}

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

/**
 * Get metrics for pages.
 *
 * @see https://developers.facebook.com/docs/graph-api/reference/v7.0/insights
 *
 * @param options -
 */
function getPageInsights<P extends 'day' | 'week' | 'days_28'>(
  options: {
    accessToken?: string;
    metric: P extends 'day'
      ? Types.PageInsightsMetricDay[]
      : P extends 'week'
      ? Types.PageInsightsMetricWeek[]
      : P extends 'days_28'
      ? Types.PageInsightsMetricDays28[]
      : never;
    period: P;
  } & MergeExclusive<
    { datePreset?: Types.DatePreset },
    {
      since?: string | Date;
      until?: string | Date;
    }
  >
): MessengerTypes.BatchItem {
  const query = omitBy(
    {
      access_token: options.accessToken,
      period: options.period,
      metric: options.metric.join(','),
      date_preset: 'datePreset' in options ? options.datePreset : undefined,
      since: 'since' in options ? formatDate(options.since) : undefined,
      until: 'until' in options ? formatDate(options.until) : undefined,
    },
    isNil
  );

  return {
    method: 'GET',
    relativeUrl: `/me/insights?${querystring.stringify(query)}`,
  };
}

/**
 * Get metrics for page posts.
 *
 * @see https://developers.facebook.com/docs/graph-api/reference/v7.0/insights
 *
 * @param postId - ID of the post.
 * @param options -
 */
function getPostInsights<P extends 'day' | 'lifetime'>(
  postId: string,
  options: {
    accessToken?: string;
    metric: P extends 'day'
      ? Types.PostInsightsMetricDay[]
      : P extends 'lifetime'
      ? Types.PostInsightsMetricLifetime[]
      : never;
    period?: P;
  } & MergeExclusive<
    {
      datePreset?: Types.DatePreset;
    },
    {
      since?: string | Date;
      until?: string | Date;
    }
  >
): MessengerTypes.BatchItem {
  const query = omitBy(
    {
      access_token: options.accessToken,
      period: options.period,
      metric: options.metric.join(','),
      date_preset: 'datePreset' in options ? options.datePreset : undefined,
      since: 'since' in options ? formatDate(options.since) : undefined,
      until: 'until' in options ? formatDate(options.until) : undefined,
    },
    isNil
  );

  return {
    method: 'GET',
    relativeUrl: `/${postId}/insights?${querystring.stringify(query)}`,
  };
}

const FacebookBatch = {
  sendComment,
  sendLike,
  getComment,
  getLikes,

  getPageInsights,
  getPostInsights,
};

export default FacebookBatch;
