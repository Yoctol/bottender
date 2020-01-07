---
id: channel-slack-routing
title: Slack Routing
---

Bottender offers a bunch of helpers to route within your Slack or multi-platform application. For example, you may use Slack particular routes within your [`router`](the-basics-routing.md):

```js
const { router, slack } = require('bottender/router');

function App() {
  return router([
    slack.message(HandleMessage),
    slack.event('pin_added', HandlePinAdded),
    slack.event('star_added', HandleStarAdded),
    slack(HandleSlack),
  ]);
}

async function HandleMessage(context) {
  /* skip... */
}
async function HandlePinAdded(context) {
  /* skip... */
}
async function HandleStarAdded(context) {
  /* skip... */
}
async function HandleSlack(context) {
  /* skip... */
}
```

All available routes in `slack` that recognize different kind of events:

- `slack` - matches when receiving any slack events.
- `slack.message` - matches when receiving slack message events.
- `slack.event` - matches when receiving particular slack events. See all event types in [slack docs](https://api.slack.com/events).
