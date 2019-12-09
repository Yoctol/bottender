import { MessengerEvent } from 'bottender';

type Status = {
  from: {
    id: string;
    name: string;
  };
  item: 'status';
  postId: string;
  verb: 'add' | 'edited';
  published: number;
  createdTime: number;
  message: string;
};

type Post = {
  recipientId: string;
  from: {
    id: string;
  };
  item: 'post';
  postId: string;
  verb: 'remove';
  createdTime: number;
};

type Comment = {
  from: {
    id: string;
    name?: string;
  };
  item: 'comment';
  commentId: string;
  postId: string;
  verb: 'add' | 'edited' | 'remove';
  parentId: string;
  createdTime: number;
  message: string;
};

type Like = {
  from: {
    id: string;
    name?: string;
  };
  parentId: string;
  commentId: string;
  postId: string;
  verb: 'add' | 'remove';
  item: 'like';
  createdTime: number;
};

type Reaction = {
  reactionType: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
  from: {
    id: string;
  };
  parentId: string;
  commentId: string;
  postId: string;
  verb: 'add' | 'edit' | 'remove';
  item: 'reaction';
  createdTime: number;
};

export default class FacebookEvent extends MessengerEvent {
  constructor(
    rawEvent: Record<string, any>,
    options: Record<string, any> = {}
  ) {
    super(rawEvent, options);
    this._pageId = options.pageId;
  }

  get isConversation(): boolean {
    return this.rawEvent.field === 'conversation';
  }

  get isFeed(): boolean {
    return this.rawEvent.field === 'feed';
  }

  get isStatus(): boolean {
    return this.isFeed && this.rawEvent.value.item === 'status';
  }

  get isStatusAdd(): boolean {
    return this.isStatus && this.rawEvent.value.verb === 'add';
  }

  get isStatusEdited(): boolean {
    return this.isStatus && this.rawEvent.value.verb === 'edited';
  }

  get status(): Status | null {
    if (this.isStatus) {
      return this.rawEvent.value;
    }
    return null;
  }

  get isPost(): boolean {
    return this.isFeed && this.rawEvent.value.item === 'post';
  }

  get isPostRemove(): boolean {
    return this.isPost && this.rawEvent.value.verb === 'remove';
  }

  get post(): Post | null {
    if (this.isPost) {
      return this.rawEvent.value;
    }
    return null;
  }

  get isComment(): boolean {
    return this.isFeed && this.rawEvent.value.item === 'comment';
  }

  get isCommentAdd(): boolean {
    return this.isComment && this.rawEvent.value.verb === 'add';
  }

  get isCommentEdited(): boolean {
    return this.isComment && this.rawEvent.value.verb === 'edited';
  }

  get isCommentRemove(): boolean {
    return this.isComment && this.rawEvent.value.verb === 'remove';
  }

  get isFirstLayerComment(): boolean {
    if (!this.isComment) return false;

    const comment = this.comment as Comment;

    return comment.parentId === comment.postId;
  }

  get comment(): Comment | null {
    if (this.isComment) {
      return this.rawEvent.value;
    }
    return null;
  }

  get isLike(): boolean {
    return this.isFeed && this.rawEvent.value.item === 'like';
  }

  get isLikeAdd(): boolean {
    return this.isLike && this.rawEvent.value.verb === 'add';
  }

  get isLikeRemove(): boolean {
    return this.isLike && this.rawEvent.value.verb === 'remove';
  }

  get like(): Like | null {
    if (this.isLike) {
      return this.rawEvent.value;
    }
    return null;
  }

  get isReaction(): boolean {
    return this.isFeed && this.rawEvent.value.item === 'reaction';
  }

  get isReactionAdd(): boolean {
    return this.isReaction && this.rawEvent.value.verb === 'add';
  }

  get isReactionEdit(): boolean {
    return this.isReaction && this.rawEvent.value.verb === 'edit';
  }

  get isReactionRemove(): boolean {
    return this.isReaction && this.rawEvent.value.verb === 'remove';
  }

  get reaction(): Reaction | null {
    if (this.isReaction) {
      return this.rawEvent.value;
    }
    return null;
  }

  get pageId(): string | null {
    return this._pageId || null;
  }

  get isSentByPage(): boolean {
    // TODO: should we treat Messenger echo events as `isSentByPage`?
    if (!this.isFeed) {
      return false;
    }

    if (
      this.rawEvent.value.from &&
      this.rawEvent.value.from.id === this.pageId
    ) {
      return true;
    }

    return false;
  }

  // Notifications for Page likes will only be sent for Pages that have fewer than 10K likes.
  // ref: https://developers.facebook.com/docs/graph-api/webhooks/reference/page/#feed
  get isPageLike(): boolean {
    if (!this.isFeed) {
      return false;
    }

    if (!this.rawEvent.value.from) {
      return true;
    }

    return false;
  }
}
