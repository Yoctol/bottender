---
id: slack
title: Slack
---

This guide will give you some basic concepts of developing a Slack bot. For more detail, check [official docs](https://api.slack.com/).

## Requirements

- Slack App with following features:
  - Event Subscriptions
  - Permissions
  - Bots

First, create an app on [Slack API](https://api.slack.com/apps?new_app=1) site. Then setup its features:

- Event Subscriptions:
  - Subscribe to `message.channels` event, so your bot can receive message events.
  - Setup webhook URL after your bot server is up.
- Permissions:
  - Add **bot** [scope](https://api.slack.com/bot-users#api_usage) to your app
  - Copy **Bot User OAuth Access Token** (access token) for later use.
- Bots:
  - Setup your bot's display name.

## Build Your First Slack Bot

Check out your app's **access token** [Slack API](https://api.slack.com/apps/) then fill them in [slack-hello-world](https://github.com/Yoctol/bottender/blob/master/examples/slack-hello-world/index.js) example:

```js
const { SlackBot } = require('bottender');

const bot = new SlackBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});
```

Then run your server and try it out by invite the **Bot User** to a channel and talk to him/her/it!

## Events

There are many types of events your bot may receive from Slack, but it's up to you whether to subscribe to each of them. In Bottender, you can access them via `context.event`. For more information, check [SlackEvent Reference](APIReference-SlackEvent.md) and [official docs](https://api.slack.com/events).

For the **message** related events, Bottender supports some helpers:

- isMessage
- isChannelsMessage
- isGroupsMessage
- isImMessage
- isMpimMessage
- isText
- message
- text

For example:

```js
bot.onEvent(async context => {
  if (context.event.isChannelsMessage) {
    await context.sendText('Hello, this is a channels message!');
  } else if (context.event.isGroupsMessage) {
    await context.sendText('Hello, this is a groups message!');
  } else if (context.event.isText && context.event.text === 'How are you?') {
    await context.sendText('I am fine.');
  } else {
    await context.sendText('I do not understand.');
  }
});
```

## Slack Specific

### Message Format

In Bottender, you can use function `context.sendText()` to send messages. You can format messages with [Slack message formatting](https://api.slack.com/docs/message-formatting). For more information, check [SlackContext Reference](APIReference-SlackContext.md) and [official docs](https://api.slack.com/methods/chat.postMessage).

### Channel

You can invite your bot account into a channel. By doing so, the events will create **channel sessions**. Send method `context.sendText()` will send to the channel. You can still get the sender's profile with `context.session.user`.

You can access the channel and team members in `context.session.channel` and `context.session.team`.

### Get User Info from ID

If you want to get user info from user ID, you can find it with `session.team` info. For example, getting a user's name can be:

```js
function getNameFromId(id, session) {
  return session.team.members.find(member => member.id === id).name;
}
```

## References

- [official docs](https://api.slack.com/): official docs of Slack API.
- [messaging-api-slack](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-slack)
- [slack-hello-world](https://github.com/Yoctol/bottender/blob/master/examples/slack-hello-world/index.js) example.
