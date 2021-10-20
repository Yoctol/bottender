---
id: the-basics-chain
title: Chain of Responsibility
original_id: the-basics-chain
---

Using the [Chain of Responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern) pattern is another way to organize your [Bottender actions](the-basics-actions.md) in your Bottender app. This pattern lets you explicitly prioritize your actions by specifying the order of the actions.

Considering a customer service bot app with three very different layers:

- `RuleBased`: Use JavaScript rules to handle incoming events.
- `MachineLearning`: Use machine learning models to handle incoming events.
- `HumanAgent`: Use human agents to handle incoming events.

In general, you may want to put the cheapest layer at the top of the chain. For example, you may put the `RuleBased` action at the top:

```js
const { chain } = require('bottender');

function RuleBased(context, props) {
  if (context.event.text === 'hi') {
    // discontinue and return the `SayHi` action
    return SayHi;
  }
  // continue to the `next` action
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
    // execute in the following order
    RuleBased,
    MachineLearningBased,
    HumanAgent,
  ]);
}
```

If your bot receives a "hi" text message, the `RuleBased` action returns the `SayHi` action and exits the chain. Otherwise, the `RuleBased` action returns `props.next` and goes down to the `MachineLearningBased` action.

The `chain` function takes an array of actions and returns an action as the return value, so it can work with all patterns that compatible with the Bottender actions.

## Using with Router

You can use the Chain of Responsibility pattern with the [routing mechanism](the-basics-routing.md) that Bottender provides. For example, you may use the `router` function to create a router within the `RuleBased` layer:

```js
function RuleBased(context, { next }) {
  return router([
    // return the `SayHi` action when receiving a "hi" text message
    text('hi', SayHi),
    // return the `next` action
    route('*', next),
  ]);
}

function App() {
  return chain([
    // execute in the following order
    RuleBased,
    MachineLearningBased,
    HumanAgent,
  ]);
}
```
