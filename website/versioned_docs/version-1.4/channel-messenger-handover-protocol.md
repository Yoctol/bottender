---
id: channel-messenger-handover-protocol
title: Messenger Handover Protocol
original_id: channel-messenger-handover-protocol
---

<p><img width="360" src="https://user-images.githubusercontent.com/662387/71710521-a5534c00-2e37-11ea-8bb4-c3c0ea6656d9.jpg"/></p>

Since Messenger has become a critical customer support channel between brands and customers, the cooperation between Messenger Bots and human agents creates a complete customer journey on messaging business.

Here comes the Messenger handover protocol, which aims to make a smooth transition between Messenger Bots and human agents in the compact Messenger window. Technically speaking, this protocol allows a Facebook Page simultaneously owns multiple Facebook Apps, e.g., a Facebook app for auto-reply, and another Facebook app for human agents support.

> **Note:**
>
> - If you are curious how to change the profile image between Messenger Bot and human agents, please check Bottender's doc, [Using Persona](channel-messenger-persona.md).
> - For more information about handover protocol, please check Facebook's official doc, [Handover Protocol](https://developers.facebook.com/docs/messenger-platform/handover-protocol/)

### `Thread Control`: Who is Answering the Customer

Before going further, you have to know the concept of `Thread Control`. Assume that there are multiple Facebook Apps behind a single Facebook page. Only one Facebook owns the `Thread Control` of a specific customer at a time, which means only one Facebook App can reply to the customer.

### `Primary Receiver`: The Privilege App Role

Among all the apps behind the Facebook Page, only a single app could be `Primary Receiver`, the rest are `Secondary Receivers`.

You may treat `Primary Receiver` as the boss. S/he is the only one who owns the privilege to allow other apps to reply. S/he can also take back `Thread Control` from `Secondary Receivers` at any moment. By default, `Primary Receiver` owns the thread control, i.e., all messages sent to the `Primary Receiver.`

You, or the Facebook Page admin, can change the app role, i,e, which app is the `Primary Receiver` at the Page Settings.

The default setting of App roles is a bit mysterious. It is like no app is `Primary Receiver`. We would suggest you check your app role settings and assign Bottender's app as the `Primary Receiver` to manage the `Thread Control.`

![](https://user-images.githubusercontent.com/662387/71799800-34a76c00-3091-11ea-9c15-c6ed8069eda2.png)

![](https://user-images.githubusercontent.com/662387/71704543-010cdd80-2e16-11ea-8300-3e2f21291ce3.png)

In the following table, you can see the difference in capability between `Primary Receiver` and `Secondary Receiver`.

![](https://user-images.githubusercontent.com/662387/71662894-0aeafe00-2d8e-11ea-9de8-df807e7cfdd9.png)

> **Note:**
>
> - If you can't wait to begin with an example, you can jump to Bottender's example, [Messenger Handover](https://github.com/Yoctol/bottender/tree/master/examples/messenger-handover).
> - For more information, you can refer to Facebook's official doc, [Assigning App Roles](https://developers.facebook.com/docs/messenger-platform/handover-protocol/assign-app-roles)

## Passing Thread Control

The `Pass Thread Control` API allows one app to pass the control of a conversation to another. The calling app can pass optional metadata to the receiving app in the API request. By the `pass_thread_control` webhook, an app can know if it takes the thread control.

```js
async function App(context) {
  await context.passThreadControl('target-app-id');
}
```

`Page Inbox` is a unique official app of Facebook. It is the default Facebook app for every Facebook Page to reply to messages by human agents.

![](https://user-images.githubusercontent.com/662387/71801051-bc42aa00-3094-11ea-9137-e0cffc2a5bf6.png)

`Page Inbox` has three default folders: `Main`, `Done`, `Spam`. When you set `Page Inbox` as `Secondary Receiver`, all messages sent to your bot appears in the `Done` folder by default.

When the Page inbox has control of the conversation, all messages from the conversation move to the `Inbox` folder and wait for a human agent to respond. When you move a specific customer to the `Done` folder, you indirectly pass the `Thread Control` of the customer to `Primary Receiver`, which is usually the Facebook App of your Bottender project.

![](https://user-images.githubusercontent.com/662387/71801472-ffe9e380-3095-11ea-97d3-1b8f449b0b61.png)

```js
async function App(context) {
  await context.passThreadControlToPageInbox();
}
```

> - For more information, you can refer to Facebook's official doc, [Passing Thread Control](https://developers.facebook.com/docs/messenger-platform/handover-protocol/pass-thread-control)

## Taking Thread Control and Requesting Thread Control

Take Thread Control API allows the `Primary Receiver` to take control of the conversation from `Secondary Receivers`. It is useful when `Secondary Receiver` is not responding. An optional metadata string may also be sent in the request.

The `Secondary Receiver` app receives a `messaging_handovers` webhook event when it loses control of the conversation. The event contains the metadata string.

```js
async function App(context) {
  await context.takeThreadControl();
}
```

> - For more information, you can refer to Facebook's official doc, [Take Thread Control](https://developers.facebook.com/docs/messenger-platform/handover-protocol/take-thread-control)

The Request Thread Control API allows a `Secondary Receiver` to notify the `Primary Receiver` that it wants control of the chat. The `Primary Receiver` can then take control of the chat if necessary, then pass control to the `Secondary Receiver` that sent the request. An optional metadata string may also be sent in the request.

The `Primary Receiver` may also ignore the request and do nothing.

```js
async function App(context) {
  await context.requestThreadControl();
}
```

> - For more information, you can refer to Facebook's official doc, [Request Thread Control](https://developers.facebook.com/docs/messenger-platform/handover-protocol/request-thread-control)

## Getting the Thread Owner

The following function helps you check which Facebook app owns the `Thread Control`. It is useful for bots that have complex implementations of the handover protocol, where an app's actions are dependent on whether it currently has thread control.

The Thread Owner API may be called by `Primary Receiver` and `Secondary Receivers`.

```js
async function App(context) {
  const threadOwner = await context.getThreadOwner();
  console.log(threadOwner); // { appId: "thread-owner-app-id" }
}
```

Bottender offers a handy function, `isThreadOwner`, to check whether the Facebook App of Bottender code owns the thread. This function uses the `appId` in `bottender.config.js` to compare with the current App Id from `getThreadOwner`. So please make sure you have your `appId` appropriately set.

```js
async function App(context) {
  const isThreadOwner = await context.isThreadOwner();
  console.log(isThreadOwner); // true or false
}
```

> - For more information, you can refer to Facebook's official doc, [Get Thread Owner](https://developers.facebook.com/docs/messenger-platform/handover-protocol/get-thread-owner)

## Retrieving the List of Secondary Receivers

This API allows `Primary Receiver` to get the list of `Secondary Receiver` apps for a page.

By default, no app has been set explicitly as a Primary Receiver. We recommend you to config your Bottender app as the `Primary Receiver` to avoid any unexpected situations.

```js
async function App(context) {
  const secondaryReceivers = await context.client.getSecondaryReceivers();
  console.log(secondaryReceivers);
  // [
  //   {
  //     id: "12345678910",
  //     name: "David's Composer"
  //   },
  //   {
  //     id: "23456789101",
  //     name: "Messenger Rocks"
  //   }
  // ]
}
```

> - For more information, you can refer to Facebook's official doc, [Secondary Receivers List API Reference](https://developers.facebook.com/docs/messenger-platform/reference/handover-protocol/secondary-receivers/)

## Webhook Events

In the following section, we would like to highlight a few highly related webhook events. Please make sure you have enable corresponding `Page Subscription Fields` in your Facebook App Settings.

![](https://user-images.githubusercontent.com/662387/71803615-3a567f00-309c-11ea-959f-9c3ba16fae89.png)

### app_role

Once a role is assigned, either `Primary Receiver` or `Secondary Receiver` app gets an `app_role` webhook.

```js
{
  recipient: {
    id: '<PSID>'
  },
  timestamp: 1458692752478,
  appRoles: {
    123456789: ['primary_receiver'],
  },
}
```

> - For more information, you can refer to Facebook's official doc, [Assign App Roles.](https://developers.facebook.com/docs/messenger-platform/handover-protocol/assign-app-roles)

### messaging_handovers

The messaging_handovers webhook event notifies an app's webhook when the following actions happen:

- Thread control is passed to the app
- Thread control is taken from the app
- App role is changed

> - For more information, you can refer to Facebook's official doc, [messaging_handovers](https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_handovers)

### standby

For bots using the handover protocol, this callback occurs when a message has been sent to your page, but your app is not the current thread owner.

> - For more information, you can refer to Facebook's official doc, [standby](https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/standby)

### echo

This callback occurs when a message has been sent by your page.

It is helpful when your `Primary Receiver` app, e.g., Bottender code, has passed `Thread Control` to a `Secondary Receiver app`, e.g., `Page Inbox`. However, you want to make sure your bot takes `Thread Control` back after a certain amount of time.

You can subscribe to this callback by selecting the message_echoes field when setting up your webhook.

> - For more information, you can refer to Facebook's official doc, [echo](https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/message-echoes)
