/* @flow */

import pascalCase from 'pascal-case';

import type { Event } from './Event';

export type Message = {
  type: string,
  channel: string,
  user: string,
  text: string,
  ts: string,
};

type EventCallback = {
  type: 'event_callback',
  event: {
    type:
      | 'grid_migration_finished'
      | 'grid_migration_started'
      | 'link_shared'
      | 'tokens_revoked',
  },
};

export type SlackRawEvent =
  | {
      type: string,
    }
  | Message
  | EventCallback;

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

  get isGridMigrationFinished(): boolean {
    return (
      this._rawEvent.type === 'event_callback' &&
      ((this._rawEvent: any): EventCallback).event.type ===
        'grid_migration_finished'
    );
  }

  get isGridMigrationStarted(): boolean {
    return (
      this._rawEvent.type === 'event_callback' &&
      ((this._rawEvent: any): EventCallback).event.type ===
        'grid_migration_started'
    );
  }

  get isLinkShared(): boolean {
    return (
      this._rawEvent.type === 'event_callback' &&
      ((this._rawEvent: any): EventCallback).event.type === 'link_shared'
    );
  }

  get isTokensRevoked(): boolean {
    return (
      this._rawEvent.type === 'event_callback' &&
      ((this._rawEvent: any): EventCallback).event.type === 'tokens_revoked'
    );
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
