---
id: the-basics-chain
title: Chain of Responsibility
---

Another way to organize your actions is using the ["Chain of Responsibility"](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern) pattern. In this way, you can prioritize your actions explicitly by specifying the order of the actions.

Consider we have an app that has three very different layers: `RuleBased` layer, `MachineLearning` layer and `HumanAgent` layer. It depends, but you may want to put the cheapest layer on the top of the chain:

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

If it receives `hi` as input in the `RuleBased` layer, it returns `SayHi` and exits this chain. Otherwise, it continues the chain and goes to the `MachineLearningBased` layer.

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
