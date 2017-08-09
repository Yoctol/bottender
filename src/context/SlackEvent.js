/* @flow */

import pascalCase from 'pascal-case';

import type { Event } from './Event';

export type Message = {
  type: string,
  subtype?: string,
  channel: string,
  user: string,
  text: string,
  ts: string,
};

export type SlackRawEvent =
  | {
      type: string,
      user: string, // FIXME: this is to fix type checking
    }
  | Message;

export default class SlackEvent implements Event {
  _rawEvent: SlackRawEvent;

  constructor(rawEvent: SlackRawEvent) {
    this._rawEvent = rawEvent;
  }

  get rawEvent(): SlackRawEvent {
    return this._rawEvent;
  }

  get isMessage(): boolean {
    return this._rawEvent.type === 'message';
  }

  get isChannelsMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return message.channel.startsWith('C');
  }

  get isGroupsMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return message.channel.startsWith('G');
  }

  get isImMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return message.channel.startsWith('D');
  }

  get isMpimMessage(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return message.channel.startsWith('G');
  }

  get message(): ?Message {
    if (!this.isMessage) return;

    const message: Message = (this._rawEvent: any);

    return message;
  }

  get isTextMessage(): boolean {
    return this.isMessage;
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
