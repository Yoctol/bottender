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

type Reaction = {
  reactionType: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry' | 'care';
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

type Event = {
  item: 'event';
  [key: string]: any; // FIXME
};

type Photo = {
  item: 'photo';
  [key: string]: any; // FIXME
};

type Video = {
  item: 'video';
  [key: string]: any; // FIXME
};

type Share = {
  item: 'share';
  [key: string]: any; // FIXME
};

export type FacebookRawEvent = {
  field: 'feed';
  value: Status | Post | Comment | Reaction | Event | Photo | Video | Share;
};

export default class FacebookEvent {
  _rawEvent: FacebookRawEvent;

  _pageId: string | undefined;

  constructor(rawEvent: FacebookRawEvent, options: { pageId?: string } = {}) {
    this._rawEvent = rawEvent;
    this._pageId = options.pageId;
  }

  get pageId(): string | undefined {
    return this._pageId;
  }

  /**
   * Underlying raw event from Facebook.
   *
   */
  get rawEvent(): FacebookRawEvent {
    return this._rawEvent;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage(): boolean {
    return false;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return false;
  }

  /**
   * The text string from Facebook raw event.
   *
   */
  get text(): string | null {
    return null;
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

  get isSentByPage(): boolean {
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
