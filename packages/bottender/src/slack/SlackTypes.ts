export * from 'messaging-api-slack/dist/SlackTypes';
export { SlackConnectorOptions } from './SlackConnector';
export { SlackContextOptions } from './SlackContext';

// https://api.slack.com/events
export type EventTypes =
  | '*'
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

// https://api.slack.com/reference/interaction-payloads
// https://api.slack.com/reference/interaction-payloads/shortcuts
export type InteractionTypes =
  | 'interactive_message'
  | 'block_actions'
  | 'message_actions'
  | 'view_closed'
  | 'view_submission'
  | 'shortcut';

export type Message = {
  type: EventTypes;
  subtype?: string;
  channel: string;
  user: string;
  text: string;
  ts: string;
  threadTs?: string;
  botId?: string;
};

export type UIEvent = {
  actions: {}[];
  callbackId: string;
  team: {
    id: string;
    domain: string;
  };
  channel?: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
  };
  actionTs: string;
  messageTs: string;
  attachmentId: string;
  token: string;
  originalMessage: Message;
  responseUrl: string;
  triggerId: string;
  threadTs?: string;
  botId?: string;
};

export type InteractiveMessageEvent = UIEvent & {
  type: 'interactive_message';
};

export type BlockActionEvent = UIEvent & {
  type: 'block_actions';
};

export type ViewEvent = UIEvent & {
  type: 'view_submission' | 'view_closed';
};

export type CommandEvent = {
  type: string | null;
  token: string;
  teamId: string;
  teamDomain: string;
  channelId: string;
  channelName: string;
  userId: string;
  userName: string;
  command: string;
  text: string;
  responseUrl: string;
  triggerId: string;
};

export type SlackRawEvent =
  | Message
  | InteractiveMessageEvent
  | BlockActionEvent
  | ViewEvent
  | CommandEvent;

type EventsAPIBody = {
  token: string;
  teamId: string;
  apiAppId: string;
  type: EventTypes;
  event: Message;
  authedUsers: string[];
  eventId: string;
  eventTime: number;
};

export type SlackRequestBody = EventsAPIBody | { payload: string };
