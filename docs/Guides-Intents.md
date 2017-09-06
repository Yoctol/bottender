# Understand User Intents

## Introduction


## Events


`context.event`


## Pattern Matching

### String Comparison

```js
bot.onEvent(context => {
  if (context.event.isTextMessage) {
    switch (context.event.message.text) {
      case '/start':
        context.sendText('Running....');
        break;
      case '/help':
        context.sendText(`
/start   start to run
/help    quick help on <command>
        `);
        break;
      default:
        context.sendText(`${context.event.message.text} is not a valid command.`);
    }
  }
})
```

### Regular Expression

Coming Soon...

### Builder

Coming Soon...

## Leverage NLU Technologies

[LUIS](https://www.luis.ai/)
