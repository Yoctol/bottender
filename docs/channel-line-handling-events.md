---
id: channel-line-handling-events
title: Handling LINE Events
---

## Handling Text Events

The most common event that your bot would ever receive is text message. To determine whether the event is a text message event, you may use `context.event.isText` boolean value to do that:

```js
async function App(context) {
  if (context.event.isText) {
    // handling the text message event
  }
}
```

You can get the text content using `context.event.text` and use it in the reply:

```js
async function App(context) {
  if (context.event.isText) {
    await context.sendText(`received the text message: ${context.event.text}`);
  }
}
```

## Handling Payload Events

Payload events can be triggered by postback buttons on template, imagemap, flex messages and richmenus, or message quick replies. To determine whether the event is a payload event, you may use `context.event.isPayload` boolean value to do that:

```js
async function App(context) {
  if (context.event.isPayload) {
    // handling the payload event
  }
}
```

You can get the payload content using `context.event.payload` and use it in the reply:

```js
async function App(context) {
  if (context.event.isPayload) {
    await context.sendText(`received the payload: ${context.event.payload}`);
  }
}
```

## Other Events

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

group, room (maybe we should put this into another group chat topic?)

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
