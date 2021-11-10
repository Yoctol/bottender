---
id: intents
title: Intents
original_id: intents
---

## Events

Every time when there is an incoming request, the [handler](api-handler) will be called and parse out events from the request. Afterwards, the Event instance is attached to [context](api-context) so that you can access it via `context.event`.
Bottender help you recognize what kind of messages or payloads are sent from users. In this way, you are able to handle intents more easily.

Check [Event Reference](api-event) to get more information about event.

## Pattern Matching

### String Comparison

Here's an example handler which only handles specific commands:

```js
bot.onEvent(async (context) => {
  if (context.event.isText) {
    switch (context.event.text) {
      case '/start':
        await context.sendText('Running....');
        break;
      case '/help':
        await context.sendText(`
/start   start to run
/help    quick help on <command>
        `);
        break;
      default:
        await context.sendText(`${context.event.text} is not a valid command.`);
    }
  }
});
```

### Regular Expression

Exactly matching looks a little rigid. Consider using some equality operators to determine whether receiving greeting words or not:

```js
bot.onEvent(async (context) => {
  if (context.event.isText) {
    const { text } = context.event.message;
    if (text === 'hello' || text === 'hi') {
      // ...
    }
  }
});
```

It only matches `hello` and `hi`. Neither `Hello` nor `hi~` would work in the above example.

We can use [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) for more general pattern matching. It will be helpful when building rule-based logic.

```js
bot.onEvent(async (context) => {
  if (context.event.isText) {
    const { text } = context.event.message;
    if (/^h(ello|i)/i.test(text)) {
      // ...
    }
  }
});
```

Now, not only `hello`, `hi` but also `Hello`, `hi~` will be matched.

## Leverage NLU Technologies

If you want to have more general intent recognition, you can leverage modern NLU (Natural Language Understanding) technologies. They can help you recognize the intent of user input sentences. There are several online services you can choose from, for example:

- [LUIS.ai](https://www.luis.ai/) from Microsoft
- [Dialogflow](https://dialogflow.com/) (formerly api.ai) from Google
- [wit.ai](https://wit.ai/) from Facebook
- [Watson](https://www.ibm.com/watson/) from IBM
