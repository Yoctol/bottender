---
id: version-0.15.17-api-console-event
title: ConsoleEvent
original_id: api-console-event
---

#### `rawEvent`

Underlying raw event from Console.

Example:

```js
event.rawEvent;
// {
//   message: {
//     text: 'Awesome.',
//   },
// }
```

#### `isMessage`

Determine if the event is a message event.

Example:

```js
event.isMessage; // true
```

#### `message`

The message object from Console raw event.

Example:

```js
event.message;
// {
//   text: 'Awesome.',
// }
```

#### `isText`

Determine if the event is a message event which includes text.

Example:

```js
event.isText; // true
```

#### `text`

The text string from Console raw event.

Example:

```js
event.text; // 'Awesome.'
```

#### `isPayload`

Determine if the event is a payload event.

Example:

```js
event.isPayload; // true
```

#### `payload`

The payload string from Console raw event.

Example:

```js
event.payload; // 'MY_PAYLOAD'
```
