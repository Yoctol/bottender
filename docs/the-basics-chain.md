---
id: the-basics-chain
title: Chain of Responsibility
---

[Chain of Responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern)

```js
const { chain } = require('bottender');
```

If we don't return `next` in `First`, it will not execute the `Second`:

```js
async function SayHi(context) {
  await context.sendText('hi');
}

chain([
  function First(context, { next }) {
    if (context.event.text === 'hi') {
      return SayHi;
    }

    // discontinue
  },
  function Second(context, { next }) {},
]);
```

And if it enters the branch and returns `next`, it will execute the `Second`:

```js
async function SayHi(context) {
  await context.sendText('hi');
}

chain([
  function First(context, { next }) {
    if (context.event.text === 'hi') {
      return SayHi;
    }

    // continue
    return next;
  },
  function Second(context, { next }) {
    // ...
  },
]);
```

## Using with Router

This pattern can be used with the `router` mechanism we provided.
