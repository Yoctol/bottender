# Understand User Intents

## Introduction


## Events

// Todo:  
// explain event
// event list links ...Message, Postback

When every time handler be called with incoming request, parsed event instance will be attached to context, so that you can access it via `context.event`.

## Pattern Matching

### String Comparison

Here's an example handler which only handle specific commands:

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

Exactly matching looks a little rigid. Consider using some equality operators to determine whether receiving greeting words or not:

```js
bot.onEvent(context => {
  if (context.event.isTextMessage) {
    const { text } = context.event.message;
    if (text === 'hello' || text === 'hi') {
      // ...
    }
  }
});
```

It only match `hello` and `hi`, but not works for either `Hello` or `hi~` in above example.

We can use [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) for more general pattern matching. It could be helpful when building rule-based logic.

```js
bot.onEvent(context => {
  if (context.event.isTextMessage) {
    if (/^h(ello|i)/i) {
      // ...
    }
  }
});
```

Now, not only `hello`, `hi` but also `Hello`, `hi~` will be matched.

## Leverage NLU Technologies

Microsoft's [LUIS](https://www.luis.ai/)
