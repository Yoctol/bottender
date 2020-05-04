---
id: version-1.0.5-api-slack-event
title: SlackEvent
original_id: api-slack-event
---

#### `rawEvent`

Underlying raw event from Slack.

Example:

```js
event.rawEvent;
// {
//   type: 'message',
//   channel: 'C2147483705',
//   user: 'U2147483697',
//   text: 'Hello world',
//   ts: '1355517523.000005',
// }
```

#### `isMessage`

Determine if the event is a message event.

Example:

```js
event.isMessage; // true
```

#### `isChannelsMessage`

Determine if the event is a message event sent from channels.

Example:

```js
event.isChannelsMessage; // true
```

#### `isGroupsMessage`

Determine if the event is a message event sent from groups.

Example:

```js
event.isGroupsMessage; // true
```

#### `isImMessage`

Determine if the event is a message event sent from instant messaging.

Example:

```js
event.isImMessage; // true
```

#### `isMpimMessage`

Determine if the event is a message event sent from multiple people instant messaging.

Example:

```js
event.isMpimMessage; // true
```

#### `message`

The message object from Slack raw event.

Example:

```js
event.message;
// {
//   type: 'message',
//   channel: 'C2147483705',
//   user: 'U2147483697',
//   text: 'Hello world',
//   ts: '1355517523.000005',
// }
```

#### `isText`

Determine if the event is a message event which includes text.

Example:

```js
event.isText; // true
```

#### `text`

The text string from Slack raw event.

Example:

```js
event.text; // 'Hello world'
```

#### `isInteractiveMessage`

Determine if the event is a interactive message (button/menu) event.

Example:

```js
event.isInteractiveMessage; // true
```

#### `callbackId`

The callbackId from Slack interactive message.

Example:

```js
event.callbackId; // 'wopr_game'
```

#### `action`

The action from Slack interactive message.

Example:

```js
event.action;
// {
//   name: 'game',
//   type: 'button',
//   value: 'chess',
// }
```

#### `isAppUninstalled`

Determine if the event is an app_uninstalled event.

Example:

```js
event.isAppUninstalled; // true
```

#### `isChannelArchive`

Determine if the event is a channel_archive event.

Example:

```js
event.isChannelArchive; // true
```

#### `isChannelCreated`

Determine if the event is a channel_created event.

Example:

```js
event.isChannelCreated; // true
```

#### `isChannelDeleted`

Determine if the event is a channel_deleted event.

Example:

```js
event.isChannelDeleted; // true
```

#### `isChannelHistoryChanged`

Determine if the event is a channel_history_changed event.

Example:

```js
event.isChannelHistoryChanged; // true
```

#### `isChannelRename`

Determine if the event is a channel_rename event.

Example:

```js
event.isChannelRename; // true
```

#### `isChannelUnarchive`

Determine if the event is a channel_unarchive event.

Example:

```js
event.isChannelUnarchive; // true
```

#### `isDndUpdated`

Determine if the event is a dnd_updated event.

Example:

```js
event.isDndUpdated; // true
```

#### `isDndUpdatedUser`

Determine if the event is a dnd_updated_user event.

Example:

```js
event.isDndUpdatedUser; // true
```

#### `isEmailDomainChanged`

Determine if the event is an email_domain_changed event.

Example:

```js
event.isEmailDomainChanged; // true
```

#### `isEmojiChanged`

Determine if the event is an emoji_changed event.

Example:

```js
event.isEmojiChanged; // true
```

#### `isFileChange`

Determine if the event is a file_change event.

Example:

```js
event.isFileChange; // true
```

#### `isFileCommentAdded`

Determine if the event is a file_comment_added event.

Example:

```js
event.isFileCommentAdded; // true
```

#### `isFileCommentDeleted`

Determine if the event is a file_comment_deleted event.

Example:

```js
event.isFileCommentDeleted; // true
```

#### `isFileCommentEdited`

Determine if the event is a file_comment_edited event.

Example:

```js
event.isFileCommentEdited; // true
```

#### `isFileCreated`

Determine if the event is a file_created event.

Example:

```js
event.isFileCreated; // true
```

#### `isFileDeleted`

Determine if the event is a file_deleted event.

Example:

```js
event.isFileDeleted; // true
```

#### `isFilePublic`

Determine if the event is a file_public event.

Example:

```js
event.isFilePublic; // true
```

#### `isFileShared`

Determine if the event is a file_shared event.

Example:

```js
event.isFileShared; // true
```

#### `isFileUnshared`

Determine if the event is a file_unshared event.

Example:

```js
event.isFileUnshared; // true
```

#### `isGridMigrationFinished`

Determine if the event is a grid_migration_finished event.

Example:

```js
event.isGridMigrationFinished; // true
```

#### `isGridMigrationStarted`

Determine if the event is a grid_migration_started event.

Example:

```js
event.isGridMigrationStarted; // true
```

#### `isGroupArchive`

Determine if the event is a group_archive event.

Example:

```js
event.isGroupArchive; // true
```

#### `isGroupClose`

Determine if the event is a group_close event.

Example:

```js
event.isGroupClose; // true
```

#### `isGroupHistoryChanged`

Determine if the event is a group_history_changed event.

Example:

```js
event.isGroupHistoryChanged; // true
```

#### `isGroupOpen`

Determine if the event is a group_open event.

Example:

```js
event.isGroupOpen; // true
```

#### `isGroupRename`

Determine if the event is a group_rename event.

Example:

```js
event.isGroupRename; // true
```

#### `isGroupUnarchive`

Determine if the event is a group_unarchive event.

Example:

```js
event.isGroupUnarchive; // true
```

#### `isImClose`

Determine if the event is a im_close event.

Example:

```js
event.isImClose; // true
```

#### `isImCreated`

Determine if the event is a im_created event.

Example:

```js
event.isImCreated; // true
```

#### `isImHistoryChanged`

Determine if the event is a im_history_changed event.

Example:

```js
event.isImHistoryChanged; // true
```

#### `isImOpen`

Determine if the event is a im_open event.

Example:

```js
event.isImOpen; // true
```

#### `isLinkShared`

Determine if the event is a link_shared event.

Example:

```js
event.isLinkShared; // true
```

#### `isMemberJoinedChannel`

Determine if the event is a member_joined_channel event.

Example:

```js
event.isMemberJoinedChannel; // true
```

#### `isMemberLeftChannel`

Determine if the event is a member_left_channel event.

Example:

```js
event.isMemberLeftChannel; // true
```

#### `isPinAdded`

Determine if the event is a pin_added event.

Example:

```js
event.isPinAdded; // true
```

#### `isPinRemoved`

Determine if the event is a pin_removed event.

Example:

```js
event.isPinRemoved; // true
```

#### `isReactionAdded`

Determine if the event is a reaction_added event.

Example:

```js
event.isReactionAdded; // true
```

#### `isReactionRemoved`

Determine if the event is a reaction_removed event.

Example:

```js
event.isReactionRemoved; // true
```

#### `isStarAdded`

Determine if the event is a star_added event.

Example:

```js
event.isStarAdded; // true
```

#### `isStarRemoved`

Determine if the event is a star_removed event.

Example:

```js
event.isStarRemoved; // true
```

#### `isSubteamCreated`

Determine if the event is a subteam_created event.

Example:

```js
event.isSubteamCreated; // true
```

#### `isSubteamMembersChanged`

Determine if the event is a subteam_members_changed event.

Example:

```js
event.isSubteamMembersChanged; // true
```

#### `isSubteamSelfAdded`

Determine if the event is a subteam_self_added event.

Example:

```js
event.isSubteamSelfAdded; // true
```

#### `isSubteamSelfRemoved`

Determine if the event is a subteam_self_removed event.

Example:

```js
event.isSubteamSelfRemoved; // true
```

#### `isSubteamUpdated`

Determine if the event is a subteam_updated event.

Example:

```js
event.isSubteamUpdated; // true
```

#### `isTeamDomainChange`

Determine if the event is a team_domain_change event.

Example:

```js
event.isTeamDomainChange; // true
```

#### `isTeamJoin`

Determine if the event is a team_join event.

Example:

```js
event.isTeamJoin; // true
```

#### `isTeamRename`

Determine if the event is a team_rename event.

Example:

```js
event.isTeamRename; // true
```

#### `isTokensRevoked`

Determine if the event is a tokens_revoked event.

Example:

```js
event.isTokensRevoked; // true
```

#### `isUrlVerification`

Determine if the event is an url_verification event.

Example:

```js
event.isUrlVerification; // true
```

#### `isUserChange`

Determine if the event is a user_change event.

Example:

```js
event.isUserChange; // true
```
