---
id: version-1.0.0-beta-api-console-context
title: ConsoleContext
original_id: api-console-context
---

Extends from [Context](api-context).

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
