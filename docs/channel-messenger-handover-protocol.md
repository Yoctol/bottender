---
id: channel-messenger-handover-protocol
title: Handover Protocol
---

https://developers.facebook.com/docs/messenger-platform/handover-protocol/

https://developers.facebook.com/docs/messenger-platform/handover-protocol/assign-app-roles

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
