import SlackEvent from '../SlackEvent';

const appUninstalled = {
  type: 'app_uninstalled',
};

const channelArchive = {
  type: 'channel_archive',
  channel: 'C024BE91L',
  user: 'U024BE7LH',
};

const channelCreated = {
  type: 'channel_created',
  channel: {
    id: 'C024BE91L',
    name: 'fun',
    created: 1360782804,
    creator: 'U024BE7LH',
  },
};

const channelDeleted = {
  type: 'channel_deleted',
  channel: 'C024BE91L',
};

const channelHistoryChanged = {
  type: 'channel_history_changed',
  latest: '1358877455.000010',
  ts: '1361482916.000003',
  event_ts: '1361482916.000004',
};

const channelRename = {
  type: 'channel_rename',
  channel: {
    id: 'C02ELGNBH',
    name: 'new_name',
    created: 1360782804,
  },
};

const channelUnarchive = {
  type: 'channel_unarchive',
  channel: 'C024BE91L',
  user: 'U024BE7LH',
};

const dndUpdated = {
  type: 'dnd_updated',
  user: 'U1234',
  dnd_status: {
    dnd_enabled: true,
    next_dnd_start_ts: 1450387800,
    next_dnd_end_ts: 1450423800,
    snooze_enabled: true,
    snooze_endtime: 1450373897,
  },
};

const dndUpdatedUser = {
  type: 'dnd_updated_user',
  user: 'U1234',
  dnd_status: {
    dnd_enabled: true,
    next_dnd_start_ts: 1450387800,
    next_dnd_end_ts: 1450423800,
  },
};

const emailDomainChanged = {
  type: 'email_domain_changed',
  email_domain: 'example.com',
  event_ts: '1360782804.083113',
};

const emojiChanged = {
  type: 'emoji_changed',
  subtype: 'remove',
  names: ['picard_facepalm'],
  event_ts: '1361482916.000004',
};

const fileChange = {
  type: 'file_change',
  file_id: 'F2147483862',
  file: {
    id: 'F2147483862',
  },
};

const fileCommentAdded = {
  type: 'file_comment_added',
  comment: {},
  file_id: 'F2147483862',
  file: {
    id: 'F2147483862',
  },
};

const fileCommentDeleted = {
  type: 'file_comment_deleted',
  comment: 'Fc67890',
  file_id: 'F2147483862',
  file: {
    id: 'F2147483862',
  },
};

const fileCommentEdited = {
  type: 'file_comment_edited',
  comment: {},
  file_id: 'F2147483862',
  file: {
    id: 'F2147483862',
  },
};

const fileCreated = {
  type: 'file_created',
  file_id: 'F2147483862',
  file: {
    id: 'F2147483862',
  },
};

const fileDeleted = {
  type: 'file_deleted',
  file_id: 'F2147483862',
  event_ts: '1361482916.000004',
};

const filePublic = {
  type: 'file_public',
  file_id: 'F2147483862',
  file: {
    id: 'F2147483862',
  },
};

const fileShared = {
  type: 'file_shared',
  file_id: 'F2147483862',
  file: {
    id: 'F2147483862',
  },
};

const fileUnshared = {
  type: 'file_unshared',
  file_id: 'F2147483862',
  file: {
    id: 'F2147483862',
  },
};

const gridMigrationFinished = {
  type: 'grid_migration_finished',
  enterprise_id: 'EXXXXXXXX',
};

const gridMigrationStarted = {
  type: 'grid_migration_started',
  enterprise_id: 'EXXXXXXXX',
};

const groupArchive = {
  type: 'group_archive',
  channel: 'G024BE91L',
};

const groupClose = {
  type: 'group_close',
  user: 'U024BE7LH',
  channel: 'G024BE91L',
};

const groupHistoryChanged = {
  type: 'group_history_changed',
  latest: '1358877455.000010',
  ts: '1361482916.000003',
  event_ts: '1361482916.000004',
};

const groupOpen = {
  type: 'group_open',
  user: 'U024BE7LH',
  channel: 'G024BE91L',
};

const groupRename = {
  type: 'group_rename',
  channel: {
    id: 'G02ELGNBH',
    name: 'new_name',
    created: 1360782804,
  },
};

const groupUnarchive = {
  type: 'group_unarchive',
  channel: 'G024BE91L',
};

const imClose = {
  type: 'im_close',
  user: 'U024BE7LH',
  channel: 'D024BE91L',
};

const imCreated = {
  type: 'im_created',
  user: 'U024BE7LH',
  channel: {},
};

const imHistoryChanged = {
  type: 'im_history_changed',
  latest: '1358877455.000010',
  ts: '1361482916.000003',
  event_ts: '1361482916.000004',
};

const imOpen = {
  type: 'im_open',
  user: 'U024BE7LH',
  channel: 'D024BE91L',
};

const linkShared = {
  type: 'link_shared',
  channel: 'Cxxxxxx',
  user: 'Uxxxxxxx',
  message_ts: '123456789.9875',
  links: [
    {
      domain: 'example.com',
      url: 'https://example.com/12345',
    },
    {
      domain: 'example.com',
      url: 'https://example.com/67890',
    },
    {
      domain: 'another-example.com',
      url: 'https://yet.another-example.com/v/abcde',
    },
  ],
};

const memberJoinedChannel = {
  type: 'member_joined_channel',
  user: 'W06GH7XHN',
  channel: 'C0698JE0H',
  channel_type: 'C',
  inviter: 'U123456789',
};

const memberLeftChannel = {
  type: 'member_left_channel',
  user: 'W06GH7XHN',
  channel: 'C0698JE0H',
  channel_type: 'C',
};

const message = {
  type: 'message',
  channel: 'C2147483705',
  user: 'U2147483697',
  text: 'Hello world',
  ts: '1355517523.000005',
};

const channelsMessage = {
  type: 'message',
  channel: 'C2147483705',
  user: 'U2147483697',
  text: 'Hello world',
  ts: '1355517523.000005',
};

const groupsMessage = {
  type: 'message',
  channel: 'G024BE91L',
  user: 'U2147483697',
  text: 'Hello world',
  ts: '1355517523.000005',
};

const imMessage = {
  type: 'message',
  channel: 'D024BE91L',
  user: 'U2147483697',
  text: 'Hello world',
  ts: '1355517523.000005',
};

const mpimMessage = {
  type: 'message',
  channel: 'G024BE91L',
  user: 'U2147483697',
  text: 'Hello world',
  ts: '1355517523.000005',
};

const pinAdded = {
  type: 'pin_added',
  user: 'U024BE7LH',
  channel_id: 'C02ELGNBH',
  item: {},
  event_ts: '1360782804.083113',
};

const pinRemoved = {
  type: 'pin_removed',
  user: 'U024BE7LH',
  channel_id: 'C02ELGNBH',
  item: {},
  has_pins: false,
  event_ts: '1360782804.083113',
};

const reactionAdded = {
  type: 'reaction_added',
  user: 'U024BE7LH',
  reaction: 'thumbsup',
  item_user: 'U0G9QF9C6',
  item: {},
  event_ts: '1360782804.083113',
};

const reactionRemoved = {
  type: 'reaction_removed',
  user: 'U024BE7LH',
  reaction: 'thumbsup',
  item_user: 'U0G9QF9C6',
  item: {},
  event_ts: '1360782804.083113',
};

const starAdded = {
  type: 'star_added',
  user: 'U024BE7LH',
  item: {},
  event_ts: '1360782804.083113',
};

const starRemoved = {
  type: 'star_removed',
  user: 'U024BE7LH',
  item: {},
  event_ts: '1360782804.083113',
};

const subteamCreated = {
  type: 'subteam_created',
  subteam: {
    id: 'S0615G0KT',
    team_id: 'T060RNRCH',
    is_usergroup: true,
    name: 'Marketing Team',
    description: 'Marketing gurus, PR experts and product advocates.',
    handle: 'marketing-team',
    is_external: false,
    date_create: 1446746793,
    date_update: 1446746793,
    date_delete: 0,
    auto_type: null,
    created_by: 'U060RNRCZ',
    updated_by: 'U060RNRCZ',
    deleted_by: null,
    prefs: {
      channels: [],
      groups: [],
    },
    user_count: '0',
  },
};

const subteamMembersChanged = {
  type: 'subteam_members_changed',
  subteam_id: 'S0614TZR7',
  team_id: 'T060RNRCH',
  date_previous_update: 1446670362,
  date_update: 1492906952,
  added_users: ['U060RNRCZ', 'U060ULRC0', 'U061309JM'],
  added_users_count: '3',
  removed_users: ['U06129G2V'],
  removed_users_count: '1',
};

const subteamSelfAdded = {
  type: 'subteam_self_added',
  subteam_id: 'S0615G0KT',
};

const subteamSelfRemoved = {
  type: 'subteam_self_removed',
  subteam_id: 'S0615G0KT',
};

const subteamUpdated = {
  type: 'subteam_updated',
  subteam: {
    id: 'S0614TZR7',
    team_id: 'T060RNRCH',
    is_usergroup: true,
    name: 'Team Admins',
    description: 'A group of all Administrators on your team.',
    handle: 'admins',
    is_external: false,
    date_create: 1446598059,
    date_update: 1446670362,
    date_delete: 0,
    auto_type: 'admin',
    created_by: 'USLACKBOT',
    updated_by: 'U060RNRCZ',
    deleted_by: null,
    prefs: {
      channels: [],
      groups: [],
    },
    users: ['U060RNRCZ', 'U060ULRC0', 'U06129G2V', 'U061309JM'],
    user_count: '4',
  },
};

const teamDomainChange = {
  type: 'team_domain_change',
  url: 'https://my.slack.com',
  domain: 'my',
};

const teamJoin = {
  type: 'team_join',
  user: {},
};

const teamRename = {
  type: 'team_rename',
  name: 'New Team Name Inc.',
};

const tokensRevoked = {
  type: 'tokens_revoked',
  tokens: {
    oauth: ['UXXXXXXXX'],
    bot: ['UXXXXXXXX'],
  },
};

const urlVerification = {
  token: 'Jhj5dZrVaK7ZwHHjRyZWjbDl',
  challenge: '3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P',
  type: 'url_verification',
};

const userChange = {
  type: 'user_change',
  user: {},
};

const interactiveMessageEvent = {
  type: 'interactive_message',
  actions: [
    {
      name: 'game',
      type: 'button',
      value: 'chess',
    },
  ],
  callback_id: 'wopr_game',
  team: {
    id: 'T056K3CM5',
    domain: 'ricebug',
  },
  channel: {
    id: 'D7WTL9ECE',
    name: 'directmessage',
  },
  user: {
    id: 'U056K3CN1',
    name: 'tw0517tw',
  },
  action_ts: '1511153911.446899',
  message_ts: '1511153905.000093',
  attachment_id: '1',
  token: 'n8uIomPoBtc7fSnbHbQcmwdy',
  is_app_unfurl: false,
  original_message: {
    type: 'message',
    user: 'U7W1PH7MY',
    text: 'Would you like to play a game?',
    bot_id: 'B7VUVQTK5',
    attachments: [
      {
        callback_id: 'wopr_game',
        fallback: 'You are unable to choose a game',
        text: 'Choose a game to play',
        id: 1,
        color: '3AA3E3',
        actions: [
          {
            id: '1',
            name: 'game',
            text: 'Chess',
            type: 'button',
            value: 'chess',
            style: '',
          },
          {
            id: '2',
            name: 'game',
            text: "Falken's Maze",
            type: 'button',
            value: 'maze',
            style: '',
          },
          {
            id: '3',
            name: 'game',
            text: 'Thermonuclear War',
            type: 'button',
            value: 'war',
            style: 'danger',
            confirm: {
              text: "Wouldn't you prefer a good game of chess?",
              title: 'Are you sure?',
              ok_text: 'Yes',
              dismiss_text: 'No',
            },
          },
        ],
      },
    ],
    ts: '1511153905.000093',
  },
  response_url:
    'https://hooks.slack.com/actions/T056K3CM5/274366307953/73rSfbP0LcVPWfAYB3GicEdD',
  trigger_id: '274927463524.5223114719.95a5b9f6d3b30dc7e07dec6bfa4610e5',
};

it('#rawEvent', () => {
  expect(new SlackEvent(message).rawEvent).toEqual(message);
});

it('#isAppUninstalled', () => {
  expect(new SlackEvent(appUninstalled).isAppUninstalled).toEqual(true);
  expect(new SlackEvent(message).isAppUninstalled).toEqual(false);
});

it('#isChannelArchive', () => {
  expect(new SlackEvent(channelArchive).isChannelArchive).toEqual(true);
  expect(new SlackEvent(message).isChannelArchive).toEqual(false);
});

it('#isChannelCreated', () => {
  expect(new SlackEvent(channelCreated).isChannelCreated).toEqual(true);
  expect(new SlackEvent(message).isChannelCreated).toEqual(false);
});

it('#isChannelDeleted', () => {
  expect(new SlackEvent(channelDeleted).isChannelDeleted).toEqual(true);
  expect(new SlackEvent(message).isChannelDeleted).toEqual(false);
});

it('#isChannelHistoryChanged', () => {
  expect(new SlackEvent(channelHistoryChanged).isChannelHistoryChanged).toEqual(
    true
  );
  expect(new SlackEvent(message).isChannelHistoryChanged).toEqual(false);
});

it('#isChannelRename', () => {
  expect(new SlackEvent(channelRename).isChannelRename).toEqual(true);
  expect(new SlackEvent(message).isChannelRename).toEqual(false);
});

it('#isChannelUnarchive', () => {
  expect(new SlackEvent(channelUnarchive).isChannelUnarchive).toEqual(true);
  expect(new SlackEvent(message).isChannelUnarchive).toEqual(false);
});

it('#isDndUpdated', () => {
  expect(new SlackEvent(dndUpdated).isDndUpdated).toEqual(true);
  expect(new SlackEvent(message).isDndUpdated).toEqual(false);
});

it('#isDndUpdatedUser', () => {
  expect(new SlackEvent(dndUpdatedUser).isDndUpdatedUser).toEqual(true);
  expect(new SlackEvent(message).isDndUpdatedUser).toEqual(false);
});

it('#isEmailDomainChanged', () => {
  expect(new SlackEvent(emailDomainChanged).isEmailDomainChanged).toEqual(true);
  expect(new SlackEvent(message).isEmailDomainChanged).toEqual(false);
});

it('#isEmojiChanged', () => {
  expect(new SlackEvent(emojiChanged).isEmojiChanged).toEqual(true);
  expect(new SlackEvent(message).isEmojiChanged).toEqual(false);
});

it('#isFileChange', () => {
  expect(new SlackEvent(fileChange).isFileChange).toEqual(true);
  expect(new SlackEvent(message).isFileChange).toEqual(false);
});

it('#isFileCommentAdded', () => {
  expect(new SlackEvent(fileCommentAdded).isFileCommentAdded).toEqual(true);
  expect(new SlackEvent(message).isFileCommentAdded).toEqual(false);
});

it('#isFileCommentDeleted', () => {
  expect(new SlackEvent(fileCommentDeleted).isFileCommentDeleted).toEqual(true);
  expect(new SlackEvent(message).isFileCommentDeleted).toEqual(false);
});

it('#isFileCommentEdited', () => {
  expect(new SlackEvent(fileCommentEdited).isFileCommentEdited).toEqual(true);
  expect(new SlackEvent(message).isFileCommentEdited).toEqual(false);
});

it('#isFileCreated', () => {
  expect(new SlackEvent(fileCreated).isFileCreated).toEqual(true);
  expect(new SlackEvent(message).isFileCreated).toEqual(false);
});

it('#isFileDeleted', () => {
  expect(new SlackEvent(fileDeleted).isFileDeleted).toEqual(true);
  expect(new SlackEvent(message).isFileDeleted).toEqual(false);
});

it('#isFilePublic', () => {
  expect(new SlackEvent(filePublic).isFilePublic).toEqual(true);
  expect(new SlackEvent(message).isFilePublic).toEqual(false);
});

it('#isFileShared', () => {
  expect(new SlackEvent(fileShared).isFileShared).toEqual(true);
  expect(new SlackEvent(message).isFileShared).toEqual(false);
});

it('#isFileUnshared', () => {
  expect(new SlackEvent(fileUnshared).isFileUnshared).toEqual(true);
  expect(new SlackEvent(message).isFileUnshared).toEqual(false);
});

it('#isGridMigrationFinished', () => {
  expect(new SlackEvent(gridMigrationFinished).isGridMigrationFinished).toEqual(
    true
  );
  expect(new SlackEvent(message).isGridMigrationFinished).toEqual(false);
});

it('#isGridMigrationStarted', () => {
  expect(new SlackEvent(gridMigrationStarted).isGridMigrationStarted).toEqual(
    true
  );
  expect(new SlackEvent(message).isGridMigrationStarted).toEqual(false);
});

it('#isGroupArchive', () => {
  expect(new SlackEvent(groupArchive).isGroupArchive).toEqual(true);
  expect(new SlackEvent(message).isGroupArchive).toEqual(false);
});

it('#isGroupClose', () => {
  expect(new SlackEvent(groupClose).isGroupClose).toEqual(true);
  expect(new SlackEvent(message).isGroupClose).toEqual(false);
});

it('#isGroupHistoryChanged', () => {
  expect(new SlackEvent(groupHistoryChanged).isGroupHistoryChanged).toEqual(
    true
  );
  expect(new SlackEvent(message).isGroupHistoryChanged).toEqual(false);
});

it('#isGroupOpen', () => {
  expect(new SlackEvent(groupOpen).isGroupOpen).toEqual(true);
  expect(new SlackEvent(message).isGroupOpen).toEqual(false);
});

it('#isGroupRename', () => {
  expect(new SlackEvent(groupRename).isGroupRename).toEqual(true);
  expect(new SlackEvent(message).isGroupRename).toEqual(false);
});

it('#isGroupUnarchive', () => {
  expect(new SlackEvent(groupUnarchive).isGroupUnarchive).toEqual(true);
  expect(new SlackEvent(message).isGroupUnarchive).toEqual(false);
});

it('#isImClose', () => {
  expect(new SlackEvent(imClose).isImClose).toEqual(true);
  expect(new SlackEvent(message).isImClose).toEqual(false);
});

it('#isImCreated', () => {
  expect(new SlackEvent(imCreated).isImCreated).toEqual(true);
  expect(new SlackEvent(message).isImCreated).toEqual(false);
});

it('#isImHistoryChanged', () => {
  expect(new SlackEvent(imHistoryChanged).isImHistoryChanged).toEqual(true);
  expect(new SlackEvent(message).isImHistoryChanged).toEqual(false);
});

it('#isImOpen', () => {
  expect(new SlackEvent(imOpen).isImOpen).toEqual(true);
  expect(new SlackEvent(message).isImOpen).toEqual(false);
});

it('#isLinkShared', () => {
  expect(new SlackEvent(linkShared).isLinkShared).toEqual(true);
  expect(new SlackEvent(message).isLinkShared).toEqual(false);
});

it('#isMemberJoinedChannel', () => {
  expect(new SlackEvent(memberJoinedChannel).isMemberJoinedChannel).toEqual(
    true
  );
  expect(new SlackEvent(message).isMemberJoinedChannel).toEqual(false);
});

it('#isMemberLeftChannel', () => {
  expect(new SlackEvent(memberLeftChannel).isMemberLeftChannel).toEqual(true);
  expect(new SlackEvent(message).isMemberLeftChannel).toEqual(false);
});

it('#isMessage', () => {
  expect(new SlackEvent(gridMigrationStarted).isMessage).toEqual(false);
  expect(new SlackEvent(message).isMessage).toEqual(true);
  expect(new SlackEvent(channelsMessage).isMessage).toEqual(true);
  expect(new SlackEvent(groupsMessage).isMessage).toEqual(true);
  expect(new SlackEvent(imMessage).isMessage).toEqual(true);
  expect(new SlackEvent(mpimMessage).isMessage).toEqual(true);
  expect(new SlackEvent(interactiveMessageEvent).isMessage).toEqual(false);
});

it('#isText', () => {
  const event = new SlackEvent(message);
  expect(event.isText).toEqual(true);
  expect(new SlackEvent(interactiveMessageEvent).isText).toEqual(false);
});

it('#text', () => {
  expect(new SlackEvent(message).text).toEqual('Hello world');
  expect(new SlackEvent(interactiveMessageEvent).text).toEqual(null);
});

it('#message', () => {
  expect(new SlackEvent(message).message).toEqual({
    channel: 'C2147483705',
    text: 'Hello world',
    ts: '1355517523.000005',
    type: 'message',
    user: 'U2147483697',
  });
  expect(new SlackEvent({ type: 'notMessage' }).message).toBeNull();
  expect(new SlackEvent(interactiveMessageEvent).message).toBeNull();
});

it('#isChannelsMessage', () => {
  expect(new SlackEvent(gridMigrationStarted).isChannelsMessage).toEqual(false);
  expect(new SlackEvent(channelsMessage).isChannelsMessage).toEqual(true);
});

it('#isGroupsMessage', () => {
  expect(new SlackEvent(gridMigrationStarted).isGroupsMessage).toEqual(false);
  expect(new SlackEvent(groupsMessage).isGroupsMessage).toEqual(true);
});

it('#isImMessage', () => {
  expect(new SlackEvent(gridMigrationStarted).isImMessage).toEqual(false);
  expect(new SlackEvent(imMessage).isImMessage).toEqual(true);
});

it('#isMpimMessage', () => {
  expect(new SlackEvent(gridMigrationStarted).isMpimMessage).toEqual(false);
  expect(new SlackEvent(mpimMessage).isMpimMessage).toEqual(true);
});

it('#isPinAdded', () => {
  expect(new SlackEvent(pinAdded).isPinAdded).toEqual(true);
  expect(new SlackEvent(message).isPinAdded).toEqual(false);
});

it('#isPinRemoved', () => {
  expect(new SlackEvent(pinRemoved).isPinRemoved).toEqual(true);
  expect(new SlackEvent(message).isPinRemoved).toEqual(false);
});

it('#isReactionAdded', () => {
  expect(new SlackEvent(reactionAdded).isReactionAdded).toEqual(true);
  expect(new SlackEvent(message).isReactionAdded).toEqual(false);
});

it('#isReactionRemoved', () => {
  expect(new SlackEvent(reactionRemoved).isReactionRemoved).toEqual(true);
  expect(new SlackEvent(message).isReactionRemoved).toEqual(false);
});

it('#isStarAdded', () => {
  expect(new SlackEvent(starAdded).isStarAdded).toEqual(true);
  expect(new SlackEvent(message).isStarAdded).toEqual(false);
});

it('#isStarRemoved', () => {
  expect(new SlackEvent(starRemoved).isStarRemoved).toEqual(true);
  expect(new SlackEvent(message).isStarRemoved).toEqual(false);
});

it('#isSubteamCreated', () => {
  expect(new SlackEvent(subteamCreated).isSubteamCreated).toEqual(true);
  expect(new SlackEvent(message).isSubteamCreated).toEqual(false);
});

it('#isSubteamMembersChanged', () => {
  expect(new SlackEvent(subteamMembersChanged).isSubteamMembersChanged).toEqual(
    true
  );
  expect(new SlackEvent(message).isSubteamMembersChanged).toEqual(false);
});

it('#isSubteamSelfAdded', () => {
  expect(new SlackEvent(subteamSelfAdded).isSubteamSelfAdded).toEqual(true);
  expect(new SlackEvent(message).isSubteamSelfAdded).toEqual(false);
});

it('#isSubteamSelfRemoved', () => {
  expect(new SlackEvent(subteamSelfRemoved).isSubteamSelfRemoved).toEqual(true);
  expect(new SlackEvent(message).isSubteamSelfRemoved).toEqual(false);
});

it('#isSubteamUpdated', () => {
  expect(new SlackEvent(subteamUpdated).isSubteamUpdated).toEqual(true);
  expect(new SlackEvent(message).isSubteamUpdated).toEqual(false);
});

it('#isTeamDomainChange', () => {
  expect(new SlackEvent(teamDomainChange).isTeamDomainChange).toEqual(true);
  expect(new SlackEvent(message).isTeamDomainChange).toEqual(false);
});

it('#isTeamJoin', () => {
  expect(new SlackEvent(teamJoin).isTeamJoin).toEqual(true);
  expect(new SlackEvent(message).isTeamJoin).toEqual(false);
});

it('#isTeamRename', () => {
  expect(new SlackEvent(teamRename).isTeamRename).toEqual(true);
  expect(new SlackEvent(message).isTeamRename).toEqual(false);
});

it('#isTokensRevoked', () => {
  expect(new SlackEvent(tokensRevoked).isTokensRevoked).toEqual(true);
  expect(new SlackEvent(message).isTokensRevoked).toEqual(false);
});

it('#isUrlVerification', () => {
  expect(new SlackEvent(urlVerification).isUrlVerification).toEqual(true);
  expect(new SlackEvent(message).isUrlVerification).toEqual(false);
});

it('#isUserChange', () => {
  expect(new SlackEvent(userChange).isUserChange).toEqual(true);
  expect(new SlackEvent(message).isUserChange).toEqual(false);
});

describe('interactive message event', () => {
  it('#isInteractiveMessage', () => {
    expect(
      new SlackEvent(interactiveMessageEvent).isInteractiveMessage
    ).toEqual(true);
    expect(new SlackEvent(message).isInteractiveMessage).toEqual(false);
  });

  it('#callbackId', () => {
    expect(new SlackEvent(interactiveMessageEvent).callbackId).toEqual(
      'wopr_game'
    );
    expect(new SlackEvent(message).callbackId).toEqual(null);
  });

  it('#action', () => {
    expect(new SlackEvent(interactiveMessageEvent).action).toEqual({
      name: 'game',
      type: 'button',
      value: 'chess',
    });
    expect(new SlackEvent(message).action).toEqual(null);
  });
});
