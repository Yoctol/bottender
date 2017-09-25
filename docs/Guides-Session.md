# Conversation Session

## Introduction


## Using The Session

### Access Session Data

It can be accessed via `context.session`. For Example, we can put user's nickname in session and call it later:

```
Bot  > What's your nickname?
User > Tim
Bot  > OK. I i will remember it.
User > Hi
Bot  > Hello Tim
```



```js
bot.onEvent(context => {
  if (context.session.nickname) {
    context.sendText(`Hello ${context.session.nickname}`);
  } else if (context.session.asking && context.event.isTextMessage) {
    context.session.nickname = context.event.message.text;
    context.session.asking = false;
    context.sendText('OK. I i will remember it.');
  } else {
    context.session.asking = true;
    context.sendText(`What's your nickname?`);
  }
})
```

## Expire

## Use Different Implementation

- memory - sessions are stored in memory with LRU cache and will not be persisted.
- file - sessions are stored in `.sessions` by default.
- mongo - sessions are stored in a mongo database.
- redis - sessions are stored in redis based stores.

## Adding Custom Session Drivers

Your custom session driver should implement the `SessionStore` interface. This interface contains just a few simple methods we need to implement. A stubbed Store implementation looks something like this:

```js
// @flow

class Store implements SessionStore {
  init(): Promise<SessionStore> { /* */ }
  read(sessionId: string): Promise<Session | null> { /* */ }
  write(sessionId: string, data): Promise<void> { /* */ }
  destroy(sessionId: string): Promise<void> { /* */ }
}
```
