import warning from 'warning';
import { MessengerContext } from 'bottender';

import FacebookBatch from './FacebookBatch';

export default class FacebookContext extends MessengerContext {
  _callFacebookClientMethod(method: string, args: any[]) {
    if (this._batchQueue) {
      return this._batchQueue.push(FacebookBatch[method](...args));
    }
    return this._client[method](...args);
  }

  // https://developers.facebook.com/docs/graph-api/reference/v3.1/object/private_replies
  sendPrivateReply(message: string): Promise<any> {
    const objectId = this._event.rawEvent.value.commentId; // FIXME: postId

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
  sendComment(
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
      ? this._event.rawEvent.value.commentId
      : this._event.rawEvent.value.parentId; // FIXME: postId

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
    const objectId = this._event.rawEvent.value.commentId; // FIXME: postId

    const args = [
      objectId,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callFacebookClientMethod('sendLike', args);
  }

  // https://developers.facebook.com/docs/graph-api/reference/v3.1/comment
  getComment(options: Record<string, any>): Promise<any[]> {
    const commentId = this._event.rawEvent.value.commentId;

    if (!commentId) {
      warning(false, 'Could not getComment if there is no comment.');
      return;
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
    const objectId = this._event.rawEvent.value.commentId; // FIXME: postId

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
    const comment = await this.getComment({ fields: ['can_reply_privately'] });

    if (!comment) return false;

    return comment.canReplyPrivately;
  }
}
