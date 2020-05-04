import { MessengerEvent } from 'bottender';
import { MessengerRawEvent } from 'bottender/dist/messenger/MessengerEvent';

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

export type Comment = {
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
  canReplyPrivately?: boolean;
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

export interface FacebookFeedRawEvent extends MessengerRawEvent {
  field: string;
  value: Status | Post | Comment | Like | Reaction;
}

export default class FacebookEvent extends MessengerEvent {
  _rawEvent: FacebookFeedRawEvent;

  constructor(
    rawEvent: FacebookFeedRawEvent,
    options: Record<string, any> = {}
  ) {
    super(rawEvent, options);
    this._rawEvent = rawEvent;
    this._pageId = options.pageId;
  }

  get rawEvent(): FacebookFeedRawEvent {
    return this._rawEvent;
  }

  get isConversation(): boolean {
    return this.rawEvent.field === 'conversation';
  }

  get isFeed(): boolean {
    return this.rawEvent.field === 'feed';
  }

  get isStatus(): boolean {
    return Boolean(
      this.isFeed &&
        this.rawEvent.value &&
        this.rawEvent.value.item === 'status'
    );
  }

  get isStatusAdd(): boolean {
    return Boolean(
      this.isStatus && this.rawEvent.value && this.rawEvent.value.verb === 'add'
    );
  }

  get isStatusEdited(): boolean {
    return Boolean(
      this.isStatus &&
        this.rawEvent.value &&
        this.rawEvent.value.verb === 'edited'
    );
  }

  get status(): Status | null {
    if (this.isStatus) {
      return this.rawEvent.value as any;
    }
    return null;
  }

  get isPost(): boolean {
    return Boolean(
      this.isFeed && this.rawEvent.value && this.rawEvent.value.item === 'post'
    );
  }

  get isPostRemove(): boolean {
    return Boolean(
      this.isPost &&
        this.rawEvent.value &&
        this.rawEvent.value.verb === 'remove'
    );
  }

  get post(): Post | null {
    if (this.isPost) {
      return this.rawEvent.value as any;
    }
    return null;
  }

  get isComment(): boolean {
    return Boolean(
      this.isFeed &&
        this.rawEvent.value &&
        this.rawEvent.value.item === 'comment'
    );
  }

  get isCommentAdd(): boolean {
    return Boolean(
      this.isComment &&
        this.rawEvent.value &&
        this.rawEvent.value.verb === 'add'
    );
  }

  get isCommentEdited(): boolean {
    return Boolean(
      this.isComment &&
        this.rawEvent.value &&
        this.rawEvent.value.verb === 'edited'
    );
  }

  get isCommentRemove(): boolean {
    return Boolean(
      this.isComment &&
        this.rawEvent.value &&
        this.rawEvent.value.verb === 'remove'
    );
  }

  get isFirstLayerComment(): boolean {
    if (!this.isComment) return false;

    const comment = this.comment as Comment;

    return comment.parentId === comment.postId;
  }

  get comment(): Comment | null {
    if (this.isComment) {
      return this.rawEvent.value as any;
    }
    return null;
  }

  get isLike(): boolean {
    return Boolean(
      this.isFeed && this.rawEvent.value && this.rawEvent.value.item === 'like'
    );
  }

  get isLikeAdd(): boolean {
    return Boolean(
      this.isLike && this.rawEvent.value && this.rawEvent.value.verb === 'add'
    );
  }

  get isLikeRemove(): boolean {
    return Boolean(
      this.isLike &&
        this.rawEvent.value &&
        this.rawEvent.value.verb === 'remove'
    );
  }

  get like(): Like | null {
    if (this.isLike) {
      return this.rawEvent.value as any;
    }
    return null;
  }

  get isReaction(): boolean {
    return Boolean(
      this.isFeed &&
        this.rawEvent.value &&
        this.rawEvent.value.item === 'reaction'
    );
  }

  get isReactionAdd(): boolean {
    return Boolean(
      this.isReaction &&
        this.rawEvent.value &&
        this.rawEvent.value.verb === 'add'
    );
  }

  get isReactionEdit(): boolean {
    return Boolean(
      this.isReaction &&
        this.rawEvent.value &&
        this.rawEvent.value.verb === 'edit'
    );
  }

  get isReactionRemove(): boolean {
    return Boolean(
      this.isReaction &&
        this.rawEvent.value &&
        this.rawEvent.value.verb === 'remove'
    );
  }

  get reaction(): Reaction | null {
    if (this.isReaction) {
      return this.rawEvent.value as any;
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
      this.rawEvent.value &&
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

    if (!(this.rawEvent.value && this.rawEvent.value.from)) {
      return true;
    }

    return false;
  }
}
