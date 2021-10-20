---
id: version-1.1.0-channel-messenger-routing
title: Messenger Routing
original_id: channel-messenger-routing
---

Bottender offers a bunch of helpers to route within your Messenger or multi-platform application. For example, you may use Messenger particular routes within your [`router`](the-basics-routing.md):

```js
const { router, messenger } = require('bottender/router');

function App() {
  return router([
    messenger.message(HandleMessage),
    messenger.accountLinking.linked(HandleAccountLinkingLinked),
    messenger.accountLinking.unlinked(HandleAccountLinkingUnlinked),
    messenger.accountLinking(HandleAccountLinking),
    messenger.delivery(HandleDelivery),
    messenger.echo(HandleEcho),
    messenger.gamePlay(HandleGamePlay),
    messenger.passThreadControl(HandlePassThreadControl),
    messenger.takeThreadControl(HandleTakeThreadControl),
    messenger.requestThreadControl(HandleRequestThreadControl),
    messenger.appRoles(HandleAppRoles),
    messenger.optin(HandleOptin),
    messenger.policyEnforcement(HandlePolicyEnforcement),
    messenger.postback(HandlePostback),
    messenger.read(HandleRead),
    messenger.referral(HandleReferral),
    messenger.standby(HandleStandby),
    messenger(HandleMessenger),
  ]);
}

async function HandleMessage(context) {
  /* skip... */
}
async function HandleAccountLinkingLinked(context) {
  /* skip... */
}
async function HandleAccountLinkingUnlinked(context) {
  /* skip... */
}
async function HandleAccountLinking(context) {
  /* skip... */
}
async function HandleDelivery(context) {
  /* skip... */
}
async function HandleEcho(context) {
  /* skip... */
}
async function HandleGamePlay(context) {
  /* skip... */
}
async function HandlePassThreadControl(context) {
  /* skip... */
}
async function HandleTakeThreadControl(context) {
  /* skip... */
}
async function HandleRequestThreadControl(context) {
  /* skip... */
}
async function HandleAppRoles(context) {
  /* skip... */
}
async function HandleOptin(context) {
  /* skip... */
}
async function HandlePolicyEnforcement(context) {
  /* skip... */
}
async function HandlePostback(context) {
  /* skip... */
}
async function HandleRead(context) {
  /* skip... */
}
async function HandleReferral(context) {
  /* skip... */
}
async function HandleStandby(context) {
  /* skip... */
}
async function HandleMessenger(context) {
  /* skip... */
}
```

All available routes in `messenger` that recognize different kind of events:

- `messenger` - matches when receiving any messenger events.
- `messenger.message` - matches when receiving messenger `message` events.
- `messenger.accountLinking.linked` - matches when receiving messenger `account_linking` events with status `linked`.
- `messenger.accountLinking.unlinked` - matches when receiving messenger `account_linking` events with status `unlinked`.
- `messenger.accountLinking` - matches when receiving any messenger `account_linking` events.
- `messenger.delivery` - matches when receiving messenger `delivery` events.
- `messenger.echo` - matches when receiving messenger `echo` events.
- `messenger.gamePlay` - matches when receiving messenger `game_play` events.
- `messenger.passThreadControl` - matches when receiving messenger `pass_thread_control` events.
- `messenger.takeThreadControl` - matches when receiving messenger `take_thread_control` events.
- `messenger.requestThreadControl` - matches when receiving messenger `request_thread_control` events.
- `messenger.appRoles` - matches when receiving messenger `app_roles` events.
- `messenger.optin` - matches when receiving messenger `optin` events.
- `messenger.policyEnforcement` - matches when receiving messenger `policy_enforcement` events.
- `messenger.postback` - matches when receiving messenger `postback` events.
- `messenger.preCheckout` - matches when receiving messenger `pre_checkout` events.
- `messenger.read` - matches when receiving messenger `read` events.
- `messenger.referral` - matches when receiving messenger `referral` events.
- `messenger.standby` - matches when receiving messenger `standby` events.

> **Note:** You must subscribe corresponding events for your page to receive the events.
