---
id: the-basics-state
title: State
---

Consider we are trying to implement a bot that responds count of message events it received as following:

```
You > Hi
Bot > Count: 1
You > Hi
Bot > Count: 2
```

In this section, we will learn how to use state correctly to build a counter. It will set up a count state variable and update it when receive every event.

Let's start it off with a static action like this:

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

Even though we use state variable to render the message content, it always get `Count: 1` as result. That's why step 3 come to rescue.

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

Then it starts to work as expected.

> Note: don't not modify state directly using `this.state.stateKey = stateValue;`, it may cause unexpected behavior in the future.

## State Updates are Merged

When you call `setState()`, Bottender shallow merges the object you provide into the current state.

```js
context.state; // { count: 1 }

context.setState({
  myObject: {},
});

context.state; // { count: 1, myObject: {} }
```

But if you want to do a deeper merge, you need to do it yourself:

```js
context.setState({
  myObject: {
    ...context.myObject,
    key: value,
  },
});
```

## Debug State in Console Mode

```
/state
```

## State Storage

Session ...expired
