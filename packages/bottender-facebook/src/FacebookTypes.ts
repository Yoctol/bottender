import { MessengerTypes } from 'bottender';

export { FacebookConnectorOptions } from './FacebookConnector';
export { FacebookContextOptions } from './FacebookContext';

export type FeedStatus = {
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

export type FeedPost = {
  recipientId: string;
  from: {
    id: string;
  };
  item: 'post';
  postId: string;
  verb: 'add' | 'edited' | 'remove';
  createdTime: number;
};

export type FeedComment = {
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

export type FeedReaction = {
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

export type FeedEvent = {
  item: 'event';
  [key: string]: any; // FIXME
};

export type FeedPhoto = {
  item: 'photo';
  [key: string]: any; // FIXME
};

export type FeedVideo = {
  item: 'video';
  [key: string]: any; // FIXME
};

export type FeedShare = {
  item: 'share';
  [key: string]: any; // FIXME
};

export type FeedPageLike = {
  item: 'like';
  verb: 'add';
};

export type FacebookRawEvent = {
  field: 'feed';
  value:
    | FeedStatus
    | FeedPost
    | FeedComment
    | FeedReaction
    | FeedEvent
    | FeedPhoto
    | FeedVideo
    | FeedShare
    | FeedPageLike;
};

export type ChangesEntry = {
  id: string;
  time: number;
  changes: FacebookRawEvent[];
};

type FacebookRequestBody = {
  object: 'page';
  entry: ChangesEntry[];
};

export type FacebookWebhookRequestBody =
  | MessengerTypes.MessengerRequestBody
  | FacebookRequestBody;

/**
 * https://developers.facebook.com/docs/graph-api/reference/v6.0/comment
 */
export type CommentField =
  | 'id'
  | 'attachment'
  | 'can_comment'
  | 'can_remove'
  | 'can_hide'
  | 'can_like'
  | 'can_reply_privately'
  | 'comment_count'
  | 'created_time'
  | 'from'
  | 'like_count'
  | 'message'
  | 'message_tags'
  | 'object'
  | 'parent'
  | 'private_reply_conversation'
  | 'user_likes';

export type InputComment =
  | {
      /**
       * An optional ID of a unpublished photo (see no_story field in `/{user-id}/photos`) uploaded to Facebook to include as a photo comment.
       */
      attachmentId?: string;
    }
  | {
      /**
       * The URL of a GIF to include as a animated GIF comment.
       */
      attachmentShareUrl?: string;
    }
  | {
      /**
       * The URL of an image to include as a photo comment.
       */
      attachmentUrl?: string;
    }
  | {
      /**
       * The comment text.
       */
      message?: string;
    };

export type Comment = {
  /**
   * The comment ID
   */
  id: string;
  /**
   * Link, video, sticker, or photo attached to the comment
   */
  attachment?: StoryAttachment;
  /**
   * Whether the viewer can reply to this comment
   */
  canComment?: boolean;
  /**
   * Whether the viewer can remove this comment
   */
  canRemove?: boolean;
  /**
   * Whether the viewer can hide this comment. Only visible to a page admin
   */
  canHide?: boolean;
  /**
   * Whether the viewer can like this comment
   */
  canLike?: boolean;
  /**
   * Whether the viewer can send a private reply to this comment (Page viewers only)
   */
  canReplyPrivately?: boolean;
  /**
   * Number of replies to this comment
   */
  commentCount?: number;
  /**
   * The time this comment was made
   */
  createdTime?: string;
  /**
   * The person that made this comment
   */
  from?: User;
  /**
   * Number of times this comment was liked
   */
  likeCount?: number;
  /**
   * The comment text
   */
  message?: string;
  /**
   * An array of Profiles tagged in message.
   */
  messageTags?: MessageTag[];
  /**
   * For comments on a photo or video, this is that object. Otherwise, this is empty.
   */
  object?: any;
  /**
   * For comment replies, this the comment that this is a reply to.
   */
  parent?: Comment;
  /**
   * For comments with private replies, gets conversation between the Page and author of the comment (Page viewers only)
   */
  privateReplyConversation?: Conversation;
  /**
   * Whether the viewer has liked this comment.
   */
  userLikes?: boolean;
};

/**
 * https://developers.facebook.com/docs/graph-api/reference/v6.0/conversation
 */
export type Conversation = {
  /**
   * The ID of a conversation, in a format similar to t_000000000000000
   */
  id: string;
  /**
   * The url to the thread
   */
  link: string;
  /**
   * The snippet of the most recent message in a conversation
   */
  snippet: string;
  /**
   * Last update time
   */
  updatedTime: string;
  /**
   * An estimate of the number of messages
   */
  messageCount: number;
  /**
   * An estimate of the number of unread messages
   */
  unreadCount: number;
  /**
   * People and Pages who are on this conversation
   */
  participants: {
    name: string;
    email: string;
    id: string;
  }[];
  /**
   * People who have sent a message
   */
  senders: {
    name: string;
    email: string;
    id: string;
  }[];
  /**
   * Whether the Page is able to reply
   */
  canReply: boolean;
  /**
   * Whether the Page is subscribed to the conversation
   */
  isSubscribed: boolean;
};

export type MessageTag = {
  /**
   * ID of the profile that was tagged.
   */
  id: string;
  /**
   * The text used in the tag.
   */
  name: string;
  /**
   * Indicates which type of profile is tagged.
   */
  type: 'user' | 'page' | 'group';
  /**
   * Where the first character of the tagged text is in the message, measured in unicode code points.
   */
  offset: number;
  /**
   * How many unicode code points this tag consists of, after the offset.
   */
  length: number;
};

export type StoryAttachment = {
  /**
   * Text accompanying the attachment
   */
  description: string;
  /**
   * Profiles tagged in the text accompanying the attachment
   */
  descriptionTags: EntityAtTextRange[];
  /**
   * Media object (photo, link etc.) contained in the attachment
   */
  media: StoryAttachmentMedia;
  /**
   * Type of the media such as (photo, video, link etc)
   */
  mediaType?: string;
  /**
   * Object that the attachment links to
   */
  target: StoryAttachmentTarget;
  /**
   * Title of the attachment
   */
  title: string;
  /**
   * Type of the attachment.
   */
  type:
    | 'album'
    | 'animated_image_autoplay'
    | 'checkin'
    | 'cover_photo'
    | 'event'
    | 'link'
    | 'multiple'
    | 'music'
    | 'note'
    | 'offer'
    | 'photo'
    | 'profile_media'
    | 'status'
    | 'video'
    | 'video_autoplay';
  /**
   * Unshimmed URL of the attachment
   */
  unshimmedUrl?: string;
  /**
   * URL of the attachment
   */
  url: string;
};

/**
 * Location and identity of an object in some source text
 *
 * https://developers.facebook.com/docs/graph-api/reference/entity-at-text-range/
 */
type EntityAtTextRange = {
  /**
   * ID of the profile
   */
  id: string;
  /**
   * Number of characters in the text indicating the object
   */
  length: number;
  /**
   * Name of the object
   */
  name: string;
  /**
   * The object itself
   */
  object: any;
  /**
   * The character offset in the source text of the text indicating the object
   */
  offset: number;
} & (
  | {
      /**
       * Type of the object
       */
      type: 'user';
      /**
       * The object itself
       */
      object: User;
    }
  | {
      type: 'page';
      object: Page;
    }
  | {
      type: 'event';
      object: Event;
    }
  | {
      type: 'group';
      object: Group;
    }
  | {
      type: 'application';
      object: Application;
    }
);

/**
 * https://developers.facebook.com/docs/graph-api/reference/user
 */
type User = {
  /**
   * The ID of this person's user account. This ID is unique to each app and cannot be used across different apps.
   */
  id: string;
  /**
   * The User's address.
   */
  address?: Location;
  /**
   * Notes added by viewing page on this User.
   */
  adminNotes?: PageAdminNote[];

  /**
   * The age segment for this person expressed as a minimum and maximum age. For example, more than 18, less than 21.
   */
  ageRange: AgeRange;
  /**
   * The authentication method a Workplace User has configured for their account.
   */
  authMethod?: 'password' | 'sso';
  /**
   * The person's birthday. This is a fixed format string, like MM/DD/YYYY.
   */
  birthday: string;
  /**
   * Can the person review brand polls
   */
  canReviewMeasurementRequest: boolean;
  /**
   * The User's primary email address listed on their profile. This field will not be returned if no valid email address is available.
   */
  email?: string;
  /**
   * Athletes the User likes.
   */
  favoriteAthletes?: Experience[];
  /**
   * Sports teams the User likes.
   */
  favoriteTeams?: Experience[];
  /**
   * The person's first name
   */
  firstName: string;
  /**
   * The gender selected by this person, male or female. If the gender is set to a custom value, this value will be based off of the preferred pronoun; it will be omitted if the preferred pronoun is neutral
   */
  gender: string;
  /**
   * The person's hometown
   */
  hometown: Page;
  /**
   * The person's inspirational people
   */
  inspirationalPeople: Experience[];
  /**
   * Install type
   */
  installType?: string;
  /**
   * Is the app making the request installed
   */
  installed?: boolean;
  /**
   * if the current user is a guest user. should always return false.
   */
  isGuestUser?: false;
  /**
   * Is this a shared login (e.g. a gray user)
   */
  isSharedLogin?: boolean;
  /**
   * Facebook Pages representing the languages this person knows
   */
  languages?: Experience[];
  /**
   * The person's last name
   */
  lastName: string;
  /**
   * A link to the person's Timeline. The link will only resolve if the person clicking the link is logged into Facebook and is a friend of the person whose profile is being viewed.
   */
  link: string;
  /**
   * The person's current location as entered by them on their profile. This field requires the user_location permission.
   */
  location: Page;
  /**
   * What the person is interested in meeting for
   */
  meetingFor?: string[];
  /**
   * The person's middle name
   */
  middleName?: string;
  /**
   * The person's full name
   */
  name: string;
  /**
   * The person's name formatted to correctly handle Chinese, Japanese, or Korean ordering
   */
  nameFormat?: string;
  /**
   * The person's payment pricepoints
   */
  paymentPricepoints?: PaymentPricepoints;
  /**
   * The profile picture URL of the Messenger user. The URL will expire.
   */
  profilePic?: string;
  /**
   * The person's PGP public key
   */
  publicKey?: string;
  /**
   * The person's favorite quotes
   */
  quotes?: string;
  /**
   * Security settings
   */
  securitySettings: SecuritySettings;
  /**
   * The time that the shared login needs to be upgraded to Business Manager by
   */
  sharedLoginUpgradeRequiredBy: string;
  /**
   * Shortened, locale-aware name for the person
   */
  shortName?: string;
  /**
   * The person's significant other
   */
  significantOther?: User;
  /**
   * Sports played by the person
   */
  sports?: Experience[];
  /**
   * Whether the user can add a Donate Button to their Live Videos
   */
  supportsDonateButtonInLiveVideo?: boolean;
  /**
   * Platform test group
   */
  testGroup?: number;
  /**
   * A token that is the same across a business's apps. Access to this token requires that the person be logged into your app or have a role on your app. This token will change if the business owning the app changes
   */
  tokenForBusiness?: string;
  /**
   * Video upload limits
   */
  videoUploadLimits: VideoUploadLimits;
  /**
   * Can the viewer send a gift to this person?
   */
  viewerCanSendGift?: boolean;
};

/**
 * https://developers.facebook.com/docs/graph-api/reference/location/
 */
type Location = {
  city: string;
  cityId?: number;
  country: string;
  countryCode?: string;
  latitude: number;
  locatedIn: string;
  longitude: number;
  name: string;
  region?: string;
  regionId?: number;
  state: string;
  street: string;
  zip: string;
};

type PageAdminNote = any;

/**
 * https://developers.facebook.com/docs/graph-api/reference/age-range/
 */
type AgeRange = {
  /**
   * The upper bounds of the range for this person's age. `enum{17, 20, or empty}`.
   */
  max: number;
  /**
   * The lower bounds of the range for this person's age. `enum{13, 18, 21}`
   */
  min: number;
};

/**
 * https://developers.facebook.com/docs/graph-api/reference/experience/
 */
type Experience = {
  id: string;
  description: string;
  from: User;
  name: string;
  with: User[];
};

/**
 * https://developers.facebook.com/docs/graph-api/reference/payment-pricepoints/
 */
type PaymentPricepoints = {
  mobile: PaymentPricepoint[];
};

/**
 * https://developers.facebook.com/docs/graph-api/reference/payment-pricepoint/
 */
type PaymentPricepoint = {
  credits: number;
  localCurrency: string;
  userPrice: string;
};

/**
 * https://developers.facebook.com/docs/graph-api/reference/security-settings/
 */
type SecuritySettings = {
  secureBrowsing: SecureBrowsing;
};

/**
 * https://developers.facebook.com/docs/graph-api/reference/secure-browsing/
 */
type SecureBrowsing = {
  enabled: boolean;
};

/**
 * https://developers.facebook.com/docs/graph-api/reference/video-upload-limits/
 */
type VideoUploadLimits = {
  length: number;
  size: number;
};

/**
 * https://developers.facebook.com/docs/graph-api/reference/page
 */
type Page = Record<string, any>;

/**
 * https://developers.facebook.com/docs/graph-api/reference/event
 */
type Event = Record<string, any>;

/**
 * https://developers.facebook.com/docs/graph-api/reference/v6.0/group
 */
type Group = {
  /**
   * The Group ID
   */
  id: string;
  /**
   * Information about the Group's cover photo.
   */
  cover: CoverPhoto;
  /**
   * A brief description of the Group.
   */
  description: string;
  /**
   * The email address to upload content to the Group. Only current members of the Group can use this.
   */
  email: string;
  /**
   * The URL for the Group's icon.
   */
  icon: string;
  /**
   * The number of members in the Group.
   */
  memberCount: number;
  /**
   * The number of pending member requests. Requires an access token of an Admin of the Group.we The count is only returned when the number of pending member requests is over 50.
   */
  memberRequestCount: number;
  /**
   * The name of the Group.
   */
  name: string;
  /**
   * The parent of this Group, if it exists.
   */
  parent: Group | Page;
  /**
   * The permissions a User has granted for an app installed in the Group.
   */
  permissions: string;
  /**
   * The privacy setting of the Group. Requires an access token of an Admin of the Group.
   */
  privacy: 'CLOSED' | 'OPEN' | 'SECRET';
  /**
   * The last time the Group was updated (includes changes Group properties, Posts, and Comments). Requires an access token of an Admin of the Group.
   */
  updatedTime: string;
};

type CoverPhoto = {
  /**
   * ID of the Photo that represents this cover photo.
   */
  id: string;
  /**
   * URL to the Photo that represents this cover photo.
   */
  source: string;
  /**
   * The vertical offset in pixels of the photo from the bottom.
   */
  offsetY: number;
  /**
   * The horizontal offset in pixels of the photo from the left.
   */
  offsetX: number;
};

/**
 * https://developers.facebook.com/docs/graph-api/reference/application
 */
type Application = Record<string, any>;

/**
 * https://developers.facebook.com/docs/graph-api/reference/story-attachment-media/
 */
type StoryAttachmentMedia = {
  image: any;
  source: string;
};

/**
 * https://developers.facebook.com/docs/graph-api/reference/story-attachment-target/
 */
type StoryAttachmentTarget = {
  id: string;
  unshimmedUrl?: string;
  url: string;
};

/**
 * https://developers.facebook.com/docs/graph-api/reference/v6.0/object/likes
 */
export type Likes = {
  data: Like[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next: string;
  };
  summary?: {
    totalCount: number;
  };
};

export type Like = {
  name: string;
  id: string;
  createdTime: string;
};

export type GetCommentOptions = {
  summary?: boolean;
  filter?: 'toplevel' | 'stream';
  fields?: string | CommentField[];
};

export type GetLikesOptions = {
  summary?: boolean;
};
