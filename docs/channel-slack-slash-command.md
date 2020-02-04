---
id: channel-slack-slash-command
title: Handling Slack Slash Commands
---

## Handling Slash Commands

[Slack's slash command](https://api.slack.com/interactivity/slash-commands) is a special event which mostly used as certain entry points for your slack app. A typical slash command message looks like: `/todo ask @crushermd to bake a birthday cake for @worf in #d-social`.

To determine whether the event is a slash command event, you may check the boolean value: `context.event.isSlashCommand`:

```js
async function App(context) {
  if (context.event.isSlashCommand) {
    // handling the slash command event
  }
}
```

You can get the command from `context.event.command` and its arguments from `context.event.text` and use them in the reply:

```js
async function App(context) {
  if (context.event.isSlashCommand) {
    await context.sendText(
      `I received slash command '${context.event.command}' with arguments: '${context.event.text}'`
    );
  }
}
```
