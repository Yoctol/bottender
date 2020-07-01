import { EventEmitter } from 'events';

import warning from 'warning';
import {
  Context,
  MessengerBatch,
  MessengerTypes,
  RequestContext,
} from 'bottender';
import { FacebookBatchQueue } from 'facebook-batch';

import FacebookBatch from './FacebookBatch';
import FacebookClient from './FacebookClient';
import FacebookEvent from './FacebookEvent';
import * as Types from './FacebookTypes';

// TODO: use exported type
type Session = Record<string, any>;

export type FacebookContextOptions = {
  appId?: string;
  client: FacebookClient;
  event: FacebookEvent;
  session?: Session;
  initialState?: Record<string, any>;
  requestContext?: RequestContext;
  customAccessToken?: string;
  batchQueue?: FacebookBatchQueue | null;
  emitter?: EventEmitter;
};

export default class FacebookContext extends Context<
  FacebookClient,
  FacebookEvent
> {
  _appId: string | undefined;

  _customAccessToken: string | undefined;

  _batchQueue: FacebookBatchQueue | undefined;

  public constructor({
    appId,
    client,
    event,
    session,
    initialState,
    requestContext,
    customAccessToken,
    batchQueue,
    emitter,
  }: FacebookContextOptions) {
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

  /**
   * Send a text private reply to the post or comment.
   *
   * @see https://developers.facebook.com/docs/messenger-platform/discovery/private-replies/
   *
   * @param text - The text to be sent in the reply.
   */
  public async sendText(
    text: string
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!['comment', 'post'].includes(this._event.rawEvent.value.item)) {
      warning(false, 'sendText: can only work with comment and post events.');
      return;
    }

    const value = this._event.rawEvent.value as
      | Types.FeedPost
      | Types.FeedComment;

    if (value.verb === 'remove') {
      warning(false, "sendText: can't  work with remove verb");
      return;
    }

    let recipient;
    if (value.item === 'comment') {
      recipient = {
        commentId: value.commentId,
      };
    } else {
      recipient = {
        postId: value.postId,
      };
    }

    if (this._batchQueue) {
      return this._batchQueue.push<MessengerTypes.SendMessageSuccessResponse>(
        MessengerBatch.sendText(recipient, text, {
          accessToken: this._customAccessToken,
        })
      );
    }
    return this._client.sendText(recipient, text);
  }

  /**
   * Send a private reply to the post or comment.
   *
   * @see https://developers.facebook.com/docs/messenger-platform/discovery/private-replies/
   *
   * @param message - The Messenger message object to be sent in the reply.
   */
  public async sendMessage(
    message: MessengerTypes.Message
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!['comment', 'post'].includes(this._event.rawEvent.value.item)) {
      warning(
        false,
        'sendMessage: can only work with comment and post events.'
      );
      return;
    }

    const value = this._event.rawEvent.value as
      | Types.FeedPost
      | Types.FeedComment;

    if (value.verb === 'remove') {
      warning(false, "sendMessage: can't  work with remove verb");
    }

    let recipient;
    if (value.item === 'comment') {
      recipient = {
        commentId: value.commentId,
      };
    } else {
      recipient = {
        postId: value.postId,
      };
    }

    if (this._batchQueue) {
      return this._batchQueue.push<MessengerTypes.SendMessageSuccessResponse>(
        MessengerBatch.sendMessage(recipient, message, {
          accessToken: this._customAccessToken,
        })
      );
    }
    return this._client.sendMessage(recipient, message);
  }

  // TODO: implement other send methods

  /**
   * Publish new comments to any object.
   *
   * @see https://developers.facebook.com/docs/graph-api/reference/object/comments
   *
   * @param comment - A comment text or a comment object.
   */
  public async sendComment(
    comment: string | Types.InputComment
  ): Promise<{ id: string } | undefined> {
    let objectId;
    if (this._event.isComment) {
      objectId = this._event.isFirstLayerComment
        ? (this._event.rawEvent.value as Types.FeedComment).commentId
        : (this._event.rawEvent.value as Types.FeedComment).parentId;
    } else if (this._event.isPost) {
      objectId = (this._event.rawEvent.value as Types.FeedComment).postId;
    }

    // TODO: support more type: Album, Event, Life Event, Link, Live Video, Note, Photo, Thread, User, Video
    if (!objectId) {
      warning(false, 'sendComment: only support comment and post events now.');
      return;
    }

    if (this._event.isSentByPage) {
      warning(false, "sendComment: can't send to page itself.");
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push<{ id: string }>(
        FacebookBatch.sendComment(objectId, comment, {
          accessToken: this._customAccessToken,
        })
      );
    }
    return this._client.sendComment(objectId, comment);
  }

  /**
   * Add new likes to any object.
   *
   * @see https://developers.facebook.com/docs/graph-api/reference/object/likes
   */
  public async sendLike(): Promise<{ success: boolean }> {
    let objectId;
    if (this._event.isComment) {
      objectId = (this._event.rawEvent.value as Types.FeedComment).commentId;
    } else if (this._event.isPost) {
      objectId = (this._event.rawEvent.value as Types.FeedComment).postId;
    }

    // TODO: support more type: Album, Event, Life Event, Link, Live Video, Note, Photo, Thread, User, Video
    if (!objectId) {
      warning(false, 'sendLike: only support comment and post events now.');
      return { success: false };
    }

    if (this._batchQueue) {
      return this._batchQueue.push<{ success: boolean }>(
        FacebookBatch.sendLike(objectId, {
          accessToken: this._customAccessToken,
        })
      );
    }
    return this._client.sendLike(objectId);
  }

  /**
   * Get the data of the comment.
   *
   * @see https://developers.facebook.com/docs/graph-api/reference/comment
   */
  public async getComment(
    options: Types.GetCommentOptions
  ): Promise<Types.Comment | null> {
    const commentId = (this._event.rawEvent.value as Types.FeedComment)
      .commentId;

    if (!commentId) {
      warning(false, 'Could not getComment if there is no comment.');
      return null;
    }

    if (this._batchQueue) {
      return this._batchQueue.push<Types.Comment>(
        FacebookBatch.getComment(commentId, {
          accessToken: this._customAccessToken,
          ...options,
        })
      );
    }
    return this._client.getComment(commentId, options);
  }

  /**
   * Get the data of likes on the object.
   *
   * @see https://developers.facebook.com/docs/graph-api/reference/object/likes
   *
   * @param options -
   */
  public getLikes(options: Types.GetLikesOptions): Promise<Types.Likes> {
    const objectId = (this._event.rawEvent.value as Types.FeedComment)
      .commentId; // FIXME: postId

    if (this._batchQueue) {
      return this._batchQueue.push<Types.Likes>(
        FacebookBatch.getLikes(objectId, {
          accessToken: this._customAccessToken,
          ...options,
        })
      );
    }
    return this._client.getLikes(objectId, options);
  }

  public async canReplyPrivately(): Promise<boolean> {
    const comment = await this.getComment({ fields: ['can_reply_privately'] });

    if (!comment) return false;

    return Boolean(comment.canReplyPrivately);
  }
}
