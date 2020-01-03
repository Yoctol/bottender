---
id: channel-messenger-handover-protocol
title: Messenger Handover Protocol
---

(A thumbnail image)

For example, this protocol makes it possible for a Page to simultaneously use one Facebook app to build a bot for handling automated responses, and another Facebook app for customer service with live agents.

### Primary Receiver App vs Secondary Receiver App

By default, all messages are sent to the Primary Receiver app. When control of the conversation is passed to another, the Messenger Platform will send messages from the conversation to it instead. Only one app may control the conversation at a time. All apps that do not have control of the conversation, may continue to listen to the conversation by subscribing to the standby webhook event.

(short brief)

### Prerequisites: Pr

bottender
Make sure your app is primary

inbox secondary

### Facebook Inbox

Move to done to...

**> Note:**

> https://developers.facebook.com/docs/messenger-platform/handover-protocol/

https://developers.facebook.com/docs/messenger-platform/handover-protocol/assign-app-roles

### Begin with Bottender Example

(Snapshot)
https://github.com/Yoctol/bottender/tree/master/examples/messenger-handover

/help

/back

## Passing Thread Control

```js
async function App(context) {
  await context.passThreadControl('target-app-id');
}
```

```js
async function App(context) {
  await context.passThreadControlToPageInbox();
}
```

## Requesting Thread Control

```js
async function App(context) {
  await context.takeThreadControl();
}
```

```js
async function App(context) {
  await context.requestThreadControl();
}
```

## Getting the Thread Owner

```js
async function App(context) {
  const threadOwner = await context.getThreadOwner();
  console.log(threadOwner); // { appId: 'thread-owner-app-id' }
}
```

`appId` in `bottender.config.js`

```js
async function App(context) {
  const isThreadOwner = await context.isThreadOwner();
  console.log(isThreadOwner); // true or false
}
```

## Retrieving the List of Secondary Receivers

before not set anything

```js
async function App(context) {
  const secondaryReceivers = await context.client.getSecondaryReceivers();
  console.log(secondaryReceivers);
  // [
  //   {
  //     "id": "12345678910",
  //     "name": "David's Composer"
  //   },
  //   {
  //     "id": "23456789101",
  //     "name": "Messenger Rocks"
  //   }
  // ]
}
```

## Webhook Events

- app_role
- messaging_handovers
- standby
