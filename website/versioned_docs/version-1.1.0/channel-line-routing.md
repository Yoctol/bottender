---
id: channel-line-routing
title: LINE Routing
original_id: channel-line-routing
---

Bottender offers a bunch of helpers to route within your LINE or multi-platform application. For example, you may use LINE particular routes within your [`router`](the-basics-routing.md):

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
    line.beacon(HandleBeacon),
    line.accountLink(HandleAccountLink),
    line.things.link(HandleThingsLink),
    line.things.unlink(HandleThingsUnlink),
    line.things.scenarioResult(HandleThingsScenarioResult),
    line.things(HandleThings),
    line(HandleLine),
  ]);
}

async function HandleMessage(context) {
  /* skip... */
}
async function HandleFollow(context) {
  /* skip... */
}
async function HandleUnfollow(context) {
  /* skip... */
}
async function HandleJoin(context) {
  /* skip... */
}
async function HandleLeave(context) {
  /* skip... */
}
async function HandleMemberJoined(context) {
  /* skip... */
}
async function HandleMemberLeft(context) {
  /* skip... */
}
async function HandlePostback(context) {
  /* skip... */
}
async function HandleBeaconEnter(context) {
  /* skip... */
}
async function HandleBeaconBanner(context) {
  /* skip... */
}
async function HandleBeaconStay(context) {
  /* skip... */
}
async function HandleBeacon(context) {
  /* skip... */
}
async function HandleAccountLink(context) {
  /* skip... */
}
async function HandleThingsLink(context) {
  /* skip... */
}
async function HandleThingsUnlink(context) {
  /* skip... */
}
async function HandleThingsScenarioResult(context) {
  /* skip... */
}
async function HandleThings(context) {
  /* skip... */
}
async function HandleLine(context) {
  /* skip... */
}
```

All available routes in `line` that recognize different kind of events:

- `line` - matches when receiving any line events.
- `line.message` - matches when receiving line `message` events.
- `line.follow` - matches when receiving line `follow` events.
- `line.unfollow` - matches when receiving line `unfollow` events.
- `line.join` - matches when receiving line `join` events.
- `line.leave` - matches when receiving line `leave` events.
- `line.memberJoined` - matches when receiving line `memberJoined` events.
- `line.memberLeft` - matches when receiving line `memberLeft` events.
- `line.postback` - matches when receiving line `postback` events.
- `line.beacon.enter` - matches when receiving line `beacon` events with type `enter`.
- `line.beacon.banner` - matches when receiving line `beacon` events with type `banner`.
- `line.beacon.stay` - matches when receiving line `beacon` events with type `stay`.
- `line.beacon` - matches when receiving any line `beacon` events.
- `line.accountLink` - matches when receiving line `accountLink` events.
- `line.things.link` - matches when receiving line `things` events with type `link`.
- `line.things.unlink` - matches when receiving line `things` events with type `unlink`.
- `line.things.scenarioResult` - matches when receiving line `things` events with type `scenarioResult`.
- `line.things` - matches when receiving any line `things` events.
