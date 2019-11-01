---
id: the-basics-state
title: State
---

`State` is widely used in flow control of daily mahcines, e.g. traffic light. The change of state is in response to external inputs and/or conditions is satisfied. For example, a green traffic light (a state) changes to yellow traffic light after 60 sec (a satisfied time condition).


## A Counting Bot Example

Considering a couting bot which responds the number of message events it received, for example:

```
You > Hi
Bot > Count: 1
You > Hi
Bot > Count: 2
```

In this section, we will explain how to use state correctly to build a counter. It begins with a count state variable, which will be updated when the bot receives an event.

Let's start with a static action like this:

```js
async function EventCount(context) {
  await context.sendText('Count: 1');
}
```

## Adding State to the Conversation

1. Set initial state in `bottender.config.js` file:

```js
module.exports = {
  initialState: {
    count: 0,
  },
};
```

After adding this, Bottender will set initial state to this object for the new conversation session.

2. Access state value using `context.state`:

```js
async function EventCount(context) {
  const count = context.state.count + 1;
  await context.sendText(`Count: ${count}`);
}
```

Even though we use state variable to render the message content, it always gets `Count: 1` as result. That's why step 3 is necessary.

3. Set state value using `context.setState()`:

```js
async function EventCount(context) {
  const count = context.state.count + 1;

  context.setState({
    count,
  });

  await context.sendText(`Count: ${count}`);
}
```

Then it works as expected.

> Note: don't modify state directly using `this.state.stateKey = stateValue;`, it may cause unexpected behavior in the future.

## State Updates are Merged

When you call `setState()`, Bottender shallow merges the object you provide into the current state.

```js
context.state; // { count: 1 }

context.setState({
  myObject: {},
});

context.state; // { count: 1, myObject: {} }
```

But if you want to do a deeper merge, you need to do it explicitly:

```js
context.setState({
  myObject: {
    ...context.myObject,
    key: value,
  },
});
```

## Debug State in Console Mode

In ["Console Mode"](the-basics-console-mode.md), you can leverage the convenient built-in command - `/state` to help you debugging you state transition:

```
You > /state
```

This commmand formats the state with `JSON.stringify()` and send the result as a bot message to you:

```
Bot > { "count": 1 }
```

## State Storage

The conversation states are stored in the [session storage](the-basics-session.md). You can specify an explicit session expiration time to reset the state. It makes a bot more human-like by forgetting (initializing) the state after conversation has been inactive for a while, see [this section](the-basics-session.md#setting-the-session-expiration-time) for more details.
