# Error Handling

## Introduction

async/await

```js
bot.onEvent(async context => {
  try {
    await fetch('');
    await context.sendText('');
  } catch (err) {
    // handle errors here...
  }
});
```

`builder.onError`

```js
const handler = builder
  .onEvent(handleEvent)
  .onError(handleError)
  .build();

bot.onEvent(handler);
```
