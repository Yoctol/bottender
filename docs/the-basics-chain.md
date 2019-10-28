---
id: the-basics-chain
title: Chain of Responsibility
---

[Chain of Responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern)

```js
const { chain } = require('bottender');

function RuleBased(context, props) {
  if (context.event.text === 'hi') {
    // discontinue and return SayHi
    return SayHi;
  }
  // continue to next
  return props.next;
}

function MachineLearningBased(context, props) {
  /* ...skip */
}

function HumanAgent(context, props) {
  /* ...skip */
}

function App() {
  return chain([
    // will execute in following order
    RuleBased,
    MachineLearningBased,
    HumanAgent,
  ]);
}
```

`chain` accepts an array of actions and returns an action as return value, so it's possible to work with any pattern that compatible with actions.

## Using with Router

This pattern can be used with the routing mechanism we provided and mentioned in [previous section](the-basics-routing).

```js
function RuleBased(context, { next }) {
  return router([
    text('hi', SayHi), // return SayHi when receiving hi text message
    route('*', next), // return next
  ]);
}

function App() {
  return chain([
    // will execute in following order
    RuleBased,
    MachineLearningBased,
    HumanAgent,
  ]);
}
```
