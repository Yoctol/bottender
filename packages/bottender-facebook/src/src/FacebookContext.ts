import warning from 'warning';
import { MessengerContext } from 'bottender';

import { Options } from 'bottender/dist/messenger/MessengerContext';

import FacebookBatch from './FacebookBatch';

import  FacebookEvent, { Comment } from './FacebookEvent';

export default class FacebookContext extends MessengerContext {
  _event: FacebookEvent;

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
    super({
      appId,
      client,
      event,
      session,
      initialState,
      requestContext,
      customAccessToken,
      batchQueue,
      emitter,
    });
    this._event = event as FacebookEvent;
  }

  _callFacebookClientMethod(method: string, args: any[]) {
    if (this._batchQueue) {
      return this._batchQueue.push((FacebookBatch as any)[method] (...args));
    }
    return (this._client as any)[method] (...args);
  }

  // https://developers.facebook.com/docs/graph-api/reference/v3.1/object/private_replies
  async sendPrivateReply(message: string): Promise<any> {
    const objectId = (this._event.rawEvent.value as Comment).commentId; // FIXME: postId

    if (this._event.isSentByPage) {
      warning(false, 'Could not sendPrivateReply to page itself.');
      return;
    }

    const args = [
      objectId,
      message,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callFacebookClientMethod('sendPrivateReply', args);
  }

  // https://developers.facebook.com/docs/graph-api/reference/v3.1/object/comments/
  async sendComment(
    message:
      | string
      | {
          attachment_id?: string;
          attachment_share_url?: string;
          attachment_url?: string;
          message?: string;
        }
  ): Promise<{ id: string }> {
    const objectId = this._event.isFirstLayerComment
      ? (this._event.rawEvent.value as Comment).commentId
      : (this._event.rawEvent.value as Comment).parentId; // FIXME: postId

    if (this._event.isSentByPage) {
      warning(false, 'Could not sendComment to page itself.');
      return;
    }

    const args = [
      objectId,
      message,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callFacebookClientMethod('sendComment', args);
  }

  // https://developers.facebook.com/docs/graph-api/reference/v3.1/object/likes
  sendLike(): Promise<{ success: boolean }> {
    const objectId = (this._event.rawEvent.value as Comment).commentId; // FIXME: postId

    const args = [
      objectId,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callFacebookClientMethod('sendLike', args);
  }

  // https://developers.facebook.com/docs/graph-api/reference/v3.1/comment
  async getComment(options: Record<string, any>): Promise<Comment | null> {
    const commentId = (this._event.rawEvent.value as Comment).commentId;

    if (!commentId) {
      warning(false, 'Could not getComment if there is no comment.');
      return null;
    }

    const args = [
      commentId,
      {
        access_token: this._customAccessToken,
        ...options,
      },
    ];

    return this._callFacebookClientMethod('getComment', args);
  }

  // https://developers.facebook.com/docs/graph-api/reference/v2.12/object/likes
  getLikes(options: Record<string, any>) {
    const objectId = (this._event.rawEvent.value as Comment).commentId; // FIXME: postId

    const args = [
      objectId,
      {
        access_token: this._customAccessToken,
        ...options,
      },
    ];

    return this._callFacebookClientMethod('getLikes', args);
  }

  async canReplyPrivately(): Promise<boolean> {
    const comment = await this.getComment({ fields: ['canReplyPrivately'] });

    if (!comment) return false;

    return Boolean(comment.canReplyPrivately);
  }
}
