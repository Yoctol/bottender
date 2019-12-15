---
id: version-1.0.3-the-basics-chain
title: Chain of Responsibility
original_id: the-basics-chain
---

An advanced way to organize your actions is using the ["Chain of Responsibility"](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern). This enables you to prioritize your actions explicitly by the order of the actions.

Considering a customer service bot app with three very different layers: `RuleBased` layer, `MachineLearning` layer and `HumanAgent` layer, generally speaking, you may want to put the cheapest layer on the top of the chain:

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

If the bot receives `hi` as input in the `RuleBased` layer, it returns `SayHi` and exits this chain. Otherwise, it follows the chain and goes to the `MachineLearningBased` layer.

`chain` accepts an array of actions and returns an action as return value, so it's possible to work with any pattern that compatible with actions.

## Using with Router

This pattern can be used with the routing mechanism we provided and mentioned in [previous section](the-basics-routing.md).

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
