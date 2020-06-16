export type InstagramRawEvent =
  /**
   * Sends a notification to your endpoint when an Instagram user comments on a media object owned by an Instagram Business or Creator Account.
   */
  | {
      field: 'comments';
      value: Record<string, any>; // TODO
    }
  /**
   * Sends a notification to your endpoint when an Instagram user @mentions an Instagram Business or Creator Account in a comment or caption on a media object not owned by the Business or Creator.
   */
  | {
      field: 'mentions';
      value: {
        commentId?: string;
        mediaId: string;
      };
    }
  /**
   * Sends a notification to your endpoint when a story owned by an Instagram Business or Creator Account expires.
   */
  | {
      field: 'story_insights';
      value: {
        mediaId: string;
        exits: number;
        replies: number;
        reach: number;
        tapsForward: number;
        tapsBack: number;
        impressions: number;
      };
    };

export default class InstagramEvent {
  _rawEvent: InstagramRawEvent;

  _businessAccountId: string | undefined;

  constructor(
    rawEvent: InstagramRawEvent,
    options: { businessAccountId?: string } = {}
  ) {
    this._rawEvent = rawEvent;
    this._businessAccountId = options.businessAccountId;
  }

  /**
   * Underlying raw event from Instagram.
   *
   */
  get rawEvent(): InstagramRawEvent {
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
   * The text string from Instagram raw event.
   *
   */
  get text(): string | null {
    return null;
  }

  get isComment(): boolean {
    return this.rawEvent.field === 'comments';
  }

  get isMention(): boolean {
    return this.rawEvent.field === 'mentions';
  }

  get isStoryInsights(): boolean {
    return this.rawEvent.field === 'story_insights';
  }
}
