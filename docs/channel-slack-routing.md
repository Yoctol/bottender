---
id: channel-slack-routing
title: Slack Routing
---

Bottender offers a bunch of helpers to route within your Slack or multi-platform app. For example, you may use Slack particular routes within your [`router`](the-basics-routing.md):

```js
const { router, slack } = require('bottender/router');

function App() {
  return router([
    slack.message(HandleMessage),
    slack.event('pin_added', HandlePinAdded),
    slack.event('star_added', HandleStarAdded),
    slack.any(HandleSlack),
  ]);
}

/* Note: You need to implement those functions */
async function HandleMessage(context) {}
async function HandlePinAdded(context) {}
async function HandleStarAdded(context) {}
async function HandleSlack(context) {}
```

All available routes in `slack` that recognize different kind of events:

- `slack.any` - triggers the action when receiving any Slack events.
- `slack.message` - triggers the action when receiving Slack message events.
- `slack.event` - triggers the action when receiving particular Slack events. See all event types in [Slack docs](https://api.slack.com/events).
