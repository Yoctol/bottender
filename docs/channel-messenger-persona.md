---
id: channel-messenger-persona
title: Using Persona
---

https://developers.facebook.com/docs/messenger-platform/send-messages/personas/

create persona

```sh
npx bottender messenger persona create --name="John Mathew" --pic="https://facebook.com/john_image.jpg"
```

messages

```js
async function App(context) {
  await context.sendText('hi', { personaId: '<PERSONA_ID>' });
}
```

sender actions

```js
async function App(context) {
  await context.sendSenderAction('typing_on');
  await context.markSeen({ personaId: '<PERSONA_ID>' });
  await context.typingOn({ personaId: '<PERSONA_ID>' });
  await context.typingOff({ personaId: '<PERSONA_ID>' });
}
```

https://github.com/Yoctol/bottender/tree/master/examples/messenger-persona

## Sharing Persona in Whole Context

`context.usePersona()`

```js
async function App(context) {
  context.usePersona('<PERSONA_ID>');
  await context.sendText('hi');
}
```

## Creating Persona on the Fly

A persona can be created on the fly. It is not necessary to sync one's entire database of agents to Messenger Platform in advance.

```js
async function App(context) {
  const { id: personaId } = await context.client.createPersona({
    name: 'John Mathew',
    profilePictureUrl: 'https://facebook.com/john_image.jpg',
  });

  await context.sendText('hi', { personaId });

  await context.client.deletePersona(personaId);
}
```
