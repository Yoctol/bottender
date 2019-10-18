---
id: state
title: State
---

A state is an object inside [session](Guides-Session.md). You can manipulate the state by the following APIs.

## Usage

### bot.setInitialState(Object)

To set the initial state of the conversation.

### context.state

To get session data.

### context.setState(Object)

To store data into the session which is (generally) serialized as JSON by the store, so nested objects are typically fine.

### context.resetState()

To reset all data in the session to initial state.

For example, we can put the user's nickname in the session and call it later:

```
User > Hi
Bot  > Hi, what's your nickname?
User > Tim
Bot  > Hello Tim
```

```js
// Bot will use memory session store as default if you don't assign a session store.
bot.setInitialState({
  asking: false,
  nickname: null,
});

bot.onEvent(async context => {
  if (context.state.asking) {
    context.setState({ nickname: context.event.text, asking: false });
    await context.sendText(`Hello ${context.state.nickname}`);
  } else {
    context.resetState();
    context.setState({ asking: true });
    await context.sendText("Hi, what's your nickname?");
  }
});
```

See more details at the [with-state example](https://github.com/Yoctol/bottender/tree/v0.15.x/examples/with-state).
