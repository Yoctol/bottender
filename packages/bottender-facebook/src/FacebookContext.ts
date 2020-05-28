import { EventEmitter } from 'events';

import warning from 'warning';
import { Context, MessengerTypes, RequestContext } from 'bottender';
import { MessengerBatch } from 'messaging-api-messenger';
import { MessengerBatchQueue } from 'messenger-batch';

import FacebookBatch from './FacebookBatch';
import FacebookClient from './FacebookClient';
import FacebookEvent, { Comment } from './FacebookEvent';
import * as Types from './FacebookTypes';

// TODO: use exported type
type Session = Record<string, any>;

type Options = {
  appId?: string;
  client: FacebookClient;
  event: FacebookEvent;
  session?: Session;
  initialState?: Record<string, any>;
  requestContext?: RequestContext;
  customAccessToken?: string;
  batchQueue?: MessengerBatchQueue | null;
  emitter?: EventEmitter;
};

export default class FacebookContext extends Context<
  FacebookClient,
  FacebookEvent
> {
  _appId: string | undefined;

  _customAccessToken: string | undefined;

  _batchQueue: MessengerBatchQueue | undefined;

  constructor({
    appId,
    client,
    event,
    session,
    initialState,
    requestContext,
    customAccessToken,
    batchQueue,
    emitter,
  }: Options) {
    super({ client, event, session, initialState, requestContext, emitter });
    this._customAccessToken = customAccessToken;
    this._batchQueue = batchQueue || undefined;
    this._appId = appId;
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): 'facebook' {
    return 'facebook';
  }

  async sendText(
    text: string
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!['comment', 'post'].includes(this._event.rawEvent.value.item)) {
      warning(false, 'sendText: can only work with comment and post events.');
      return;
    }

    if (this._event.rawEvent.value.verb === 'remove') {
      warning(false, "sendText: can't  work with remove verb");
      return;
    }

    let recipient;
    if (this._event.rawEvent.value.item === 'comment') {
      recipient = {
        commentId: this._event.rawEvent.value.commentId,
      };
    } else {
      recipient = {
        postId: this._event.rawEvent.value.postId,
      };
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendText(recipient, text, {
          accessToken: this._customAccessToken,
        })
      );
    }
    return this._client.sendText(recipient, text);
  }

  // https://developers.facebook.com/docs/graph-api/reference/v3.1/object/comments/
  async sendComment(
    comment: string | Types.InputComment
  ): Promise<{ id: string } | undefined> {
    const objectId = this._event.isFirstLayerComment
      ? (this._event.rawEvent.value as Comment).commentId
      : (this._event.rawEvent.value as Comment).parentId; // FIXME: postId

    if (this._event.isSentByPage) {
      warning(false, 'Could not sendComment to page itself.');
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        FacebookBatch.sendComment(objectId, comment, {
          accessToken: this._customAccessToken,
        })
      );
    }
    return this._client.sendComment(objectId, comment);
  }

  // https://developers.facebook.com/docs/graph-api/reference/v3.1/object/likes
  sendLike(): Promise<{ success: boolean }> {
    const objectId = (this._event.rawEvent.value as Comment).commentId; // FIXME: postId

    if (this._batchQueue) {
      return this._batchQueue.push(
        FacebookBatch.sendLike(objectId, {
          accessToken: this._customAccessToken,
        })
      );
    }
    return this._client.sendLike(objectId);
  }

  // https://developers.facebook.com/docs/graph-api/reference/v3.1/comment
  async getComment(
    options: Types.GetCommentOptions
  ): Promise<Types.Comment | null> {
    const commentId = (this._event.rawEvent.value as Comment).commentId;

    if (!commentId) {
      warning(false, 'Could not getComment if there is no comment.');
      return null;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        FacebookBatch.getComment(commentId, {
          accessToken: this._customAccessToken,
          ...options,
        })
      );
    }
    return this._client.getComment(commentId, options);
  }

  // https://developers.facebook.com/docs/graph-api/reference/v2.12/object/likes
  getLikes(options: Types.GetLikesOptions) {
    const objectId = (this._event.rawEvent.value as Comment).commentId; // FIXME: postId

    if (this._batchQueue) {
      return this._batchQueue.push(
        FacebookBatch.getLikes(objectId, {
          accessToken: this._customAccessToken,
          ...options,
        })
      );
    }
    return this._client.getLikes(objectId, options);
  }

  async canReplyPrivately(): Promise<boolean> {
    const comment = await this.getComment({ fields: ['can_reply_privately'] });

    if (!comment) return false;

    return Boolean(comment.canReplyPrivately);
  }
}
