---
id: channel-messenger-persona
title: Using Messenger Persona
---

## Messenger Persona Practical Guide

### Persona: Who is behind the Business Page?

The most suitable scenario for `Persona` is customer care.

Before introducing Messenger Bot, Facebook created a thriving ecosystem of Business Pages with useful CRM (Customer Relationship Management). That is, customers got used to message business and get replies from a human agent.

Today, the response from the Business Page could be a bot. To give the customer a clear understanding of whether a human agent or a bot representing the Business Page, the `Persona` API allows a business to introduce a virtual persona into the thread. A virtual persona shows a unique icon and sends messages with annotation of the name of the sender's persona and its belonged Page.

![39993793_311437072745802_2909561891720265728_n](https://user-images.githubusercontent.com/662387/69112041-4e2d2e00-0aba-11ea-8e44-02aaaf804b5d.png)

> **Note:**
> If you are interested in Facebook's official document, you may refer to [Using Personas](https://developers.facebook.com/docs/messenger-platform/send-messages/personas/)

## Basic Usage of the Persona API

In the following section, you can see the beginning usage of `Persona.`

> **Note**
> If you prefer to understand `Persona` by an example, please refer to the Bottender example, [Messenger Persona](https://github.com/Yoctol/bottender/tree/master/examples/messenger-persona)

### Create a Persona and Get Persona ID

The basic idea behind creating a persona is sending a request to Page's `/persona` endpoint. Hence, please remember to finish relevant Facebook Page Token settings in your `bottender.config.js`.

You can create a persona with the following commands. The property should include `name` and `profile picture URL` for the persona.

#### Request

```sh
npx bottender messenger persona create --name="John Mathew" --pic="https://facebook.com/john_image.jpg"
```

#### Response

```sh
Successfully create persona <PERSONA_ID>
```

The response contains a Persona ID that can be used to send future messages. Please note that this ID is private, and it is unique to a Page.

> **Note:**
> If you are not familiar with settings of `bottender.config.js`, please refer to [Setup Messenger](./channel-messenger-setup.md)

### Sending Messages as a Persona

Once you have defined the persona, you can invoke it at any time. Once invoked, a virtual persona shows with its icon and sends messages with annotation of the name of the persona and its belonged Page.

In the following code, you can see how to send a message as a specific `Persona`.

```js
async function App(context) {
  await context.sendText('hi', { personaId: '<PERSONA_ID>' });
}
```

> **Note:**
> If you haven't created a persona, please refer to the above section [Create a Persona and Get Persona ID](#create-a-persona-and-get-persona-id)

### Using Sender Actions

When a `Persona` begins processing a message, you might set the typing indicator with `Persona Id` to show them that a response is in-progress from a `Persona`. The example code is as follows.

```js
async function App(context) {
  await context.sendSenderAction('typing_on');
  await context.typingOn({ personaId: '<PERSONA_ID>' });
  await context.typingOff({ personaId: '<PERSONA_ID>' });
}
```

## Different Life Span of Personas

In the above section, we have introduced a long term and global `Persona`. If you need a different life span persona, please refer to the following examples.

### Sharing Persona in Whole Context

In the code below, you can indicate whether `Persona` responds to which context.

```js
async function App(context) {
  context.usePersona('<PERSONA_ID>');
  await context.sendText('hi');
}
```

### Creating Persona on the Fly

You can create a persona on the fly. It is handy when you don't want to sync your entire database of agents to the Messenger Platform in advance.

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
