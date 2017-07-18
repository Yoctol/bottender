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

export type SlackRawEvent =
  | {
      type: string,
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
    return this._rawEvent.type.indexOf('message') > 0;
  }

  get message(): ?Message {
    if (!this.isMessage) return;
    return this._rawEvent;
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
  'message',
  'message.channels',
  'message.groups',
  'message.im',
  'message.mpim',
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

function withMethodName(event) {
  const unified = event.split('.').reverse().join('_');
  return {
    event,
    method: `is${pascalCase(unified)}`,
  };
}

eventTypes.map(withMethodName).forEach(({ event, method }) => {
  Object.defineProperty(SlackEvent.prototype, method, {
    enumerable: false,
    configurable: true,
    get() {
      return this._rawEvent.type === event;
    },
  });
});
