import {
  FacebookRawEvent,
  FeedComment,
  FeedPost,
  FeedReaction,
  FeedStatus,
} from './FacebookTypes';

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
    return 'field' in this.rawEvent && this.rawEvent.field === 'feed';
  }

  get isStatus(): boolean {
    return Boolean(
      this.isFeed &&
        'value' in this.rawEvent &&
        this.rawEvent.value.item === 'status'
    );
  }

  get isStatusAdd(): boolean {
    return Boolean(
      this.isStatus &&
        'value' in this.rawEvent &&
        this.rawEvent.value.verb === 'add'
    );
  }

  get isStatusEdited(): boolean {
    return Boolean(
      this.isStatus &&
        'value' in this.rawEvent &&
        this.rawEvent.value.verb === 'edited'
    );
  }

  get status(): FeedStatus | null {
    if (
      this.isFeed &&
      'value' in this.rawEvent &&
      this.rawEvent.value.item === 'status'
    ) {
      return this.rawEvent.value;
    }
    return null;
  }

  get isPost(): boolean {
    return Boolean(
      this.isFeed &&
        'value' in this.rawEvent &&
        this.rawEvent.value.item === 'post'
    );
  }

  get isPostRemove(): boolean {
    return Boolean(
      this.isPost &&
        'value' in this.rawEvent &&
        this.rawEvent.value.verb === 'remove'
    );
  }

  get post(): FeedPost | null {
    if (
      this.isFeed &&
      'value' in this.rawEvent &&
      this.rawEvent.value.item === 'post'
    ) {
      return this.rawEvent.value;
    }
    return null;
  }

  get isComment(): boolean {
    return Boolean(
      this.isFeed &&
        'value' in this.rawEvent &&
        this.rawEvent.value.item === 'comment'
    );
  }

  get isCommentAdd(): boolean {
    return Boolean(
      this.isComment &&
        'value' in this.rawEvent &&
        this.rawEvent.value.verb === 'add'
    );
  }

  get isCommentEdited(): boolean {
    return Boolean(
      this.isComment &&
        'value' in this.rawEvent &&
        this.rawEvent.value.verb === 'edited'
    );
  }

  get isCommentRemove(): boolean {
    return Boolean(
      this.isComment &&
        'value' in this.rawEvent &&
        this.rawEvent.value.verb === 'remove'
    );
  }

  get isFirstLayerComment(): boolean {
    if (!this.isComment) return false;

    const comment = this.comment as FeedComment;

    return comment.parentId === comment.postId;
  }

  get comment(): FeedComment | null {
    if (
      this.isFeed &&
      'value' in this.rawEvent &&
      this.rawEvent.value.item === 'comment'
    ) {
      return this.rawEvent.value;
    }
    return null;
  }

  get isReaction(): boolean {
    return Boolean(
      this.isFeed &&
        'value' in this.rawEvent &&
        this.rawEvent.value.item === 'reaction'
    );
  }

  get isReactionAdd(): boolean {
    return Boolean(
      this.isReaction &&
        'value' in this.rawEvent &&
        this.rawEvent.value.verb === 'add'
    );
  }

  get isReactionEdit(): boolean {
    return Boolean(
      this.isReaction &&
        'value' in this.rawEvent &&
        this.rawEvent.value.verb === 'edit'
    );
  }

  get isReactionRemove(): boolean {
    return Boolean(
      this.isReaction &&
        'value' in this.rawEvent &&
        this.rawEvent.value.verb === 'remove'
    );
  }

  get reaction(): FeedReaction | null {
    if (
      this.isFeed &&
      'value' in this.rawEvent &&
      this.rawEvent.value.item === 'reaction'
    ) {
      return this.rawEvent.value;
    }
    return null;
  }

  get isSentByPage(): boolean {
    if (!this.isFeed) {
      return false;
    }

    if (
      'value' in this.rawEvent &&
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

    if (!('value' in this.rawEvent && this.rawEvent.value.from)) {
      return true;
    }

    return false;
  }
}
