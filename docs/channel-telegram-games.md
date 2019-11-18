---
id: channel-telegram-games
title: Gaming Platform
---

https://core.telegram.org/bots/games
https://core.telegram.org/bots/api#games

To get started, send the `/newgame` command to `@BotFather`.

## Sending Games to Chats as Regular Messages

```js
async function App(context) {
  await context.sendGame('your-game');
}
```

game button

```js
async function App(context) {
  await context.sendGame('your-game', {
    replyMarkup: [[{ text: 'Play Now!', callbackGame: {} }]],
  });
}
```

> **Note:** This type of button must always be the first button in the first row.

```js
async function App(context) {
  if (
    context.event.isCallbackQuery &&
    context.event.callbackQuery.gameShortName === 'your-game'
  ) {
    await context.answerCallbackQuery({
      url: 'https://your-game.tld',
    });
  }
}
```
