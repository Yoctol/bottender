---
id: channel-line-handling-events
title: Handling LINE Events
---

For a LINE bot, the two most frequent LINE events are `Text Event` and `Payload Event.`

- [`Text Event`](#text-events) is triggered when a user inputs text.
- [`Payload Event`](#payload-events) can be triggered by postback buttons on template, imagemap, flex messages and rich menus, or quick replies.

Apart from the above events, LINE also supports advanced events for better user experience. For example, [`Follow Event`](#follow--unfollow-events) offers the best timing to say hello to new users. [`Unfollow Event`](#follow--unfollow-events) allows the bot to clean up previous user data. [`Group/Room Related Events`](#grouproom-events) are necessary for bots served in group chats.

## Text Events

For a bot, the most popular event is `Text Event`. To determine whether the event type is `Text Event`, you may check the boolean value of `context.event.isText`:

```js
async function App(context) {
  if (context.event.isText) {
    // handling the text message event
  }
}
```

You can get the text content from `context.event.text` and use it in the reply. A common usage of repeating user input is for confirmation, e.g., booking a hotel or a flight.

```js
async function App(context) {
  if (context.event.isText) {
    await context.sendText(`received the text message: ${context.event.text}`);
  }
}
```

## Payload Events

`Payload Event` is the second frequent event type, which can be triggered by postback buttons on template, imagemap, flex messages and rich menus, or quick replies. To determine whether the event type is a `Payload Event`, you may use `context.event.isPayload` boolean value:

```js
async function App(context) {
  if (context.event.isPayload) {
    // handling the payload event
  }
}
```

You can get the payload content from `context.event.payload` and use it in the reply:

```js
async function App(context) {
  if (context.event.isPayload) {
    await context.sendText(`received the payload: ${context.event.payload}`);
  }
}
```

## Retrieve Media Content from Message

When you receive a media message, e.g., image, video, or audio message, the message content is not covered in the request.
You can make further responses based on the user's message content, e.g., add a photo frame, convert the audio message into text. You can get message content by `context.getMessageContent()`:

```js
const fileType = require('file-type');
const fs = require('fs');

async function App(context) {
  if (context.event.isImage || context.event.isVideo || context.event.isAudio) {
    const buffer = await context.getMessageContent();
    const { ext } = fileType(buffer);

    const filename = `my-file.${ext}`;

    // You can do whatever you want, for example, write buffer into file system
    await fs.promises.writeFile(filename, buffer);
  }
}
```

## Other Events

### Follow / Unfollow Events

`Follow Event` is the best entry point for bot introduction, e.g., the bot user manual and killer features. It is triggered when a user adds your bot as a friend.

> **Note:**
>
> - Alternative entry point of bot introduction is `Rich Menu.` You can set your `Rich Menu` open as default, to help your users understand and access the major features of your bot.

`Unfollow Event` is triggered when a user blocked your bot, which implies that you can't send more messages to your previous user. The only thing you can do is clean up your previous user data, or think about how to improve bot user experience to keep your users engaged.

```js
async function HandleFollow(context) {
  console.log(context.event.follow);
  // {
  //   type: 'user',
  //   userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  // }
}

async function HandleUnfollow(context) {
  console.log(context.event.unfollow);
  // {
  //   type: 'user',
  //   userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
  // }
}

async function App(context) {
  if (context.event.isFollow) {
    return HandleFollow;
  }
  if (context.event.isUnfollow) {
    return HandleUnfollow;
  }
}
```

### Group/Room Events

A bot inside group/room makes various kinds of group vote possible, e.g., the restaurant for lunch, the destination for the company trip, or gifts for lucky draw. In the following example, you can see how to handle `Join Event` and `Leave Event.`

> **Note:**
> We are preparing an advanced `Group/Room Events` tutorial to illustrate more practical group bot usages. If you are interested in it, please tell us on [Bottender Discord/#LINE](https://discord.gg/BsS9Fwe) to upvote :D

```js
async function HandleJoin(context) {
  console.log(context.event.join);
  // {
  //   type: 'group',
  //   groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  // }
}

async function HandleLeave(context) {
  console.log(context.event.leave);
  // {
  //   type: 'group',
  //   groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  // }
}

async function App(context) {
  if (context.event.isJoin) {
    return HandleJoin;
  }
  if (context.event.isLeave) {
    return HandleLeave;
  }
}
```
