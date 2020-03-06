---
id: version-1.3.0-channel-slack-slash-command
title: Handling Slack Slash Commands
original_id: channel-slack-slash-command
---

## Handling Slash Commands

[Slack's slash command](https://api.slack.com/interactivity/slash-commands) is a special event which mostly used as certain entry points for your slack app. A typical slash command message looks like: `/todo ask @crushermd to bake a birthday cake for @worf in #d-social`.

To enable this feature, you need to:

1. Configure slash command in your Slack app settings
2. Handle slash command events in your slack bot

### Configuring Slash Command in Your Slack App Settings

- Slack's slash command can be created in [Slack Developer Console](https://api.slack.com/apps) → \${YourApp} → Slash Commands → Create New Command

<p><img width="800" src="https://user-images.githubusercontent.com/4010549/74177974-bdf42480-4c75-11ea-9dc0-ba744ed9e134.png"></p>

- Fill in fields in the form correspondingly and save it.
  - `Command`: Your command text, must start with `/`
  - `Request URL`: The webhook url of your slack bot.
  - `Short Description`: Description to explain what this command does.
  - `Usage Hint`: Hint text for arguments (Optional)

<p><img width="800" src="https://user-images.githubusercontent.com/4010549/74179896-53dd7e80-4c79-11ea-83f8-01f84ca38fae.png"></p>

### Handling Slash Command Events in Your Slack Bot

To determine whether the event is a slash command event, you may check the boolean value: `context.event.isCommand`:

```js
async function App(context) {
  if (context.event.isCommand) {
    // handling the slash command event
  }
}
```

You can get the command from `context.event.command` and its arguments from `context.event.text` and use them in the reply:

```js
async function App(context) {
  if (context.event.isCommand) {
    await context.sendText(
      `I received slash command '${context.event.command}' with arguments: '${context.event.text}'`
    );
  }
}
```
