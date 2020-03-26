---
id: channel-line-routing
title: LINE Routing
---

Bottender offers a bunch of helpers to route within your LINE or multi-platform app. For example, you may use LINE particular routes within your [`router`](the-basics-routing.md):

```js
const { router, line } = require('bottender/router');

function App() {
  return router([
    line.message(HandleMessage),
    line.follow(HandleFollow),
    line.unfollow(HandleUnfollow),
    line.join(HandleJoin),
    line.leave(HandleLeave),
    line.memberJoined(HandleMemberJoined),
    line.memberLeft(HandleMemberLeft),
    line.postback(HandlePostback),
    line.beacon.enter(HandleBeaconEnter),
    line.beacon.banner(HandleBeaconBanner),
    line.beacon.stay(HandleBeaconStay),
    line.accountLink(HandleAccountLink),
    line.things.link(HandleThingsLink),
    line.things.unlink(HandleThingsUnlink),
    line.things.scenarioResult(HandleThingsScenarioResult),
    line(HandleLine),
  ]);
}

/* Note: You need to implement those functions */
async function HandleMessage(context) {}
async function HandleFollow(context) {}
async function HandleUnfollow(context) {}
async function HandleJoin(context) {}
async function HandleLeave(context) {}
async function HandleMemberJoined(context) {}
async function HandleMemberLeft(context) {}
async function HandlePostback(context) {}
async function HandleBeaconEnter(context) {}
async function HandleBeaconBanner(context) {}
async function HandleBeaconStay(context) {}
async function HandleAccountLink(context) {}
async function HandleThingsLink(context) {}
async function HandleThingsUnlink(context) {}
async function HandleThingsScenarioResult(context) {}
async function HandleLine(context) {}
```

All available routes in `line` that recognize different kind of events:

- `line` - triggers the action when receiving any LINE events.
- `line.message` - triggers the action when receiving LINE `message` events.
- `line.follow` - triggers the action when receiving LINE `follow` events.
- `line.unfollow` - triggers the action when receiving LINE `unfollow` events.
- `line.join` - triggers the action when receiving LINE `join` events.
- `line.leave` - triggers the action when receiving LINE `leave` events.
- `line.memberJoined` - triggers the action when receiving LINE `memberJoined` events.
- `line.memberLeft` - triggers the action when receiving LINE `memberLeft` events.
- `line.postback` - triggers the action when receiving LINE `postback` events.
- `line.beacon.enter` - triggers the action when receiving LINE `beacon` events with type `enter`.
- `line.beacon.banner` - triggers the action when receiving LINE `beacon` events with type `banner`.
- `line.beacon.stay` - triggers the action when receiving LINE `beacon` events with type `stay`.
- `line.beacon` - triggers the action when receiving LINE `beacon` events.
- `line.accountLink` - triggers the action when receiving LINE `accountLink` events.
- `line.things.link` - triggers the action when receiving LINE `things` events with type `link`.
- `line.things.unlink` - triggers the action when receiving LINE `things` events with type `unlink`.
- `line.things.scenarioResult` - triggers the action when receiving LINE `things` events with type `scenarioResult`.
- `line.things` - triggers the action when receiving LINE `things` events.
