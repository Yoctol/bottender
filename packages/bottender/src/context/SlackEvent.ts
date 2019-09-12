se from 'pascal-case';

import { Event } from './Event';

export type EventAPITypes =
  | 'message'
  | 'app_uninstalled'
  | 'channel_archive'
  | 'channel_created'
  | 'channel_deleted'
  | 'channel_history_changed'
  | 'channel_rename'
  | 'channel_unarchive'
  | 'dnd_updated'
  | 'dnd_updated_user'
  | 'email_domain_changed'
  | 'emoji_changed'
  | 'file_change'
  | 'file_comment_added'
  | 'file_comment_deleted'
  | 'file_comment_edited'
  | 'file_created'
  | 'file_deleted'
  | 'file_public'
  | 'file_shared'
  | 'file_unshared'
  | 'grid_migration_finished'
  | 'grid_migration_started'
  | 'group_archive'
  | 'group_close'
  | 'group_history_changed'
  | 'group_open'
  | 'group_rename'
  | 'group_unarchive'
  | 'im_close'
  | 'im_created'
  | 'im_history_changed'
  | 'im_open'
  | 'link_shared'
  | 'member_joined_channel'
  | 'member_left_channel'
  | 'pin_added'
  | 'pin_removed'
  | 'reaction_added'
  | 'reaction_removed'
  | 'star_added'
  | 'star_removed'
  | 'subteam_created'
  | 'subteam_members_changed'
  | 'subteam_self_added'
  | 'subteam_self_removed'
  | 'subteam_updated'
  | 'team_domain_change'
  | 'team_join'
  | 'team_rename'
  | 'tokens_revoked'
  | 'url_verification'
  | 'user_change';

export type Message = {
  type: EventAPITypes,
  subtype?: string,
  channel: string,
  user: string,
  text: string,
  ts: string,
  thread_ts?: string,
  bot_id?: string,
};

export type InteractiveMessageEvent = {
  type: 'interactive_message',
  actions: Array<{}>,
  callback_id: string,
  team: {
    id: string,
    domain: string,
  },
  channel: {
    id: string,
    name: string,
  },
  user: {
    id: string,
    name: string,
  },
  action_ts: string,
  message_ts: string,
  attachment_id: string,
  token: string,
  original_message: Message,
  response_url: string,
  trigger_id: string,
  thread_ts?: string,
  bot_id?: string,
};

export type SlackRawEvent = Message | InteractiveMessageEvent;

export default class SlackEvent implements Event {
  _rawEvent: SlackRawEvent;

  constructor(rawEvent: SlackRawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from Slack.
   *
   */
  get rawEvent(): SlackRawEvent {
    return this._rawEvent;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage(): boolean {
    return this._rawEvent.type === 'message';
  }

  /**
   * Determine if the event is a message event sent from channels.
   *
   */
  get isChannelsMessage(): boolean {
    if (!this.isMessage || !this.message) return false;

    const message = this.message;

    return message.channel.startsWith('C');
  }

  /**
   * Determine if the event is a message event sent from groups.
   *
   */
  get isGroupsMessage(): boolean {
    if (!this.isMessage || !this.message) return false;

    const message = this.message;

    return message.channel.startsWith('G');
  }

  /**
   * Determine if the event is a message event sent from instant messaging.
   *
   */
  get isImMessage(): boolean {
    if (!this.isMessage || !this.message) return false;

    const message = this.message;

    return message.channel.startsWith('D');
  }

  /**
   * Determine if the event is a message event sent from multiple people instant messaging.
   *
   */
  get isMpimMessage(): boolean {
    if (!this.isMessage || !this.message) return false;

    const message = this.message;

    return message.channel.startsWith('G');
  }

  /**
   * The message object from Slack raw event.
   *
   */
  get message(): ?Message {
    if (!this.isMessage) return;

    const message = ((this._rawEvent as any) as Message);

    return message;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return this.isMessage;
  }

  /**
   * The text string from Slack raw event.
   *
   */
  get text(): ?string {
    if (this.isText) {
      return ((this.message as any) as Message).text;
    }
    return null;
  }

  /**
   * Determine if the event is a interactive message (button/menu) event.
   *
   */
  get isInteractiveMessage(): boolean {
    return this._rawEvent.type === 'interactive_message';
  }

  /**
   * The callback_id from Slack interactive message.
   *
   */
  get callbackId(): ?string {
    if (this.isInteractiveMessage) {
      return ((this._rawEvent as any) as InteractiveMessageEvent).callback_id;
    }
    return null;
  }

  /**
   * The action from Slack interactive message.
   *
   */
  get action(): ?{} {
    if (this.isInteractiveMessage) {
      return ((this._rawEvent as any) as InteractiveMessageEvent).actions[0];
    }
    return null;
  }
}

// https://api.slack.com/events
const eventTypes = [
  'app_uninstalled',
  'channel_archive',
  'channel_created',
  'channel_deleted',
  'channel_history_changed',
  'channel_rename',
  'channel_unarchive',
  'dnd_updated',
  'dnd_updated_user',
  'email_domain_changed',
  'emoji_changed',
  'file_change',
  'file_comment_added',
  'file_comment_deleted',
  'file_comment_edited',
  'file_created',
  'file_deleted',
  'file_public',
  'file_shared',
  'file_unshared',
  'grid_migration_finished',
  'grid_migration_started',
  'group_archive',
  'group_close',
  'group_history_changed',
  'group_open',
  'group_rename',
  'group_unarchive',
  'im_close',
  'im_created',
  'im_history_changed',
  'im_open',
  'link_shared',
  'member_joined_channel',
  'member_left_channel',
  'pin_added',
  'pin_removed',
  'reaction_added',
  'reaction_removed',
  'star_added',
  'star_removed',
  'subteam_created',
  'subteam_members_changed',
  'subteam_self_added',
  'subteam_self_removed',
  'subteam_updated',
  'team_domain_change',
  'team_join',
  'team_rename',
  'tokens_revoked',
  'url_verification',
  'user_change',
];

eventTypes.forEach(event => {
  Object.defineProperty(SlackEvent.prototype, `is${pascalCase(event)}`, {
    enumerable: false,
    configurable: true,
    get() {
      return this._rawEvent.type === event;
    },
  });
});
