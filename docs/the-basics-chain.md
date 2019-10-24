---
id: the-basics-chain
title: Chain of Responsibility
---

[Chain of Responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern)

```js
const { chain } = require('bottender');

function RuleBased(context, { next }) {
  if (context.event.text === 'hi') {
    // discontinue
    return SayHi;
  }
  return next;
}

function MachineLearningBased(context, { next }) {
  /* ...skip */
}

function HumanAgent(context, { next }) {
  /* ...skip */
}

function App() {
  return chain([
    //
    RuleBased,
    MachineLearningBased,
    HumanAgent,
  ]);
}
```

## Using with Router

This pattern can be used with the routing mechanism we provided and mentioned in [previous section](the-basics-routing).
