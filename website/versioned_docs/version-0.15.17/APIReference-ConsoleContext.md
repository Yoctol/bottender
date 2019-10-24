---
id: version-0.15.17-api-consolecontext
title: ConsoleContext
original_id: api-consolecontext
---

Extends from [Context](APIReference-Context.md).

#### `platform`

Example:

```js
context.platform; // 'console'
```

#### `sendText(text)`

Send text to the owner of the session.

Example:

```js
context.sendText('Hello');
```
