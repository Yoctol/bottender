---
id: channel-messenger-routing
title: Messenger Routing
---

Bottender offers a bunch of helpers to route within your Messenger or multi-platform app. For example, you may use Messenger particular routes within your [`router`](the-basics-routing.md):

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
    messenger.reaction.react(HandleReactionReact),
    messenger.reaction.unreact(HandleReactionUnreact),
    messenger.reaction(HandleReaction),
    messenger.read(HandleRead),
    messenger.referral(HandleReferral),
    messenger.standby(HandleStandby),
    messenger.any(HandleMessenger),
  ]);
}

/* Note: You need to implement those functions */
async function HandleMessage(context) {}
async function HandleAccountLinkingLinked(context) {}
async function HandleAccountLinkingUnlinked(context) {}
async function HandleAccountLinking(context) {}
async function HandleDelivery(context) {}
async function HandleEcho(context) {}
async function HandleGamePlay(context) {}
async function HandlePassThreadControl(context) {}
async function HandleTakeThreadControl(context) {}
async function HandleRequestThreadControl(context) {}
async function HandleAppRoles(context) {}
async function HandleOptin(context) {}
async function HandlePolicyEnforcement(context) {}
async function HandlePostback(context) {}
async function HandleReactionReact(context) {}
async function HandleReactionUnreact(context) {}
async function HandleReaction(context) {}
async function HandleRead(context) {}
async function HandleReferral(context) {}
async function HandleStandby(context) {}
async function HandleMessenger(context) {}
```

All available routes in `messenger` that recognize different kind of events:

- `messenger.any` - triggers the action when receiving any Messenger events.
- `messenger.message` - triggers the action when receiving Messenger `message` events.
- `messenger.accountLinking.linked` - triggers the action when receiving Messenger `account_linking` events with status `linked`.
- `messenger.accountLinking.unlinked` - triggers the action when receiving Messenger `account_linking` events with status `unlinked`.
- `messenger.accountLinking` - triggers the action when receiving Messenger `account_linking` events.
- `messenger.delivery` - triggers the action when receiving Messenger `delivery` events.
- `messenger.echo` - triggers the action when receiving Messenger `echo` events.
- `messenger.gamePlay` - triggers the action when receiving Messenger `game_play` events.
- `messenger.passThreadControl` - triggers the action when receiving Messenger `pass_thread_control` events.
- `messenger.takeThreadControl` - triggers the action when receiving Messenger `take_thread_control` events.
- `messenger.requestThreadControl` - triggers the action when receiving Messenger `request_thread_control` events.
- `messenger.appRoles` - triggers the action when receiving Messenger `app_roles` events.
- `messenger.optin` - triggers the action when receiving Messenger `optin` events.
- `messenger.policyEnforcement` - triggers the action when receiving Messenger `policy_enforcement` events.
- `messenger.postback` - triggers the action when receiving Messenger `postback` events.
- `messenger.preCheckout` - triggers the action when receiving Messenger `pre_checkout` events.
- `messenger.reaction.react` - triggers the action when receiving Messenger `reaction` events with action `react`.
- `messenger.reaction.unreact` - triggers the action when receiving Messenger `reaction` events with action `unreact`.
- `messenger.reaction` - triggers the action when receiving Messenger `reaction` events.
- `messenger.read` - triggers the action when receiving Messenger `read` events.
- `messenger.referral` - triggers the action when receiving Messenger `referral` events.
- `messenger.standby` - triggers the action when receiving Messenger `standby` events.

> **Note:** You must subscribe corresponding events for your page to receive the events.
