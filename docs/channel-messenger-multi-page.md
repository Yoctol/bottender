---
id: channel-messenger-multi-page
title: Messenger Multi-Page Support
---

![](https://user-images.githubusercontent.com/662387/71957687-66533b00-3229-11ea-9914-7e5919dd9d61.png)

This doc outlines how to build a single Bottender app to serve multiple Facebook Pages. For example, you can create a single Bottender app of dental appointments for multiple clinics with individual clinic info.

In our case, we use Bottender to build our online chatbot builder, [Creator](https://yoctol.ai/creator/). Every user can use [Creator](https://yoctol.ai/creator/) to build his/her bots. Technically speaking, each user's outcome of Creator is `bot configs` followed by a predefined structure. Finally, we use a single Bottender app with different `bot configs` to provider various Messenger Bots for each Facebook Page.

The core concept that makes one Bottender app serves multiple Facebook Pages is `context`. It covers not only the user's message, Page Id, but also the Page token for bot response. For more information, you may check out Bottender's doc, [Handling Messenger Events](channel-messenger-handling-events.md).

In the following sections, you can see three essential steps:

- Enable `mapPageToAccessToken` feature of Bottender
- Prepare `Facebook Page Access Token` for each Facebook Page
- Manage `Facebook Page Subscriptions Fields` your bot needs

> **Note:** If you can't wait to begin with an example code, please visit [Messenger Multi-pages Example](https://github.com/Yoctol/bottender/tree/master/examples/messenger-multi-pages).

## Enable `mapPageToAccessToken` feature of Bottender

You have to tell Bottender you are developing a Bottender app to serve for multiple Facebook Pages by fill `channels.messenger.mapPageToAccessToken` in `bottender.config.js`.

```js
// bottender.config.js
module.exports = {
  channels: {
    messenger: {
      enabled: true,
      path: '/webhooks/messenger',
      pageId: process.env.MESSENGER_PAGE_ID,
      accessToken: process.env.MESSENGER_ACCESS_TOKEN,
      appId: process.env.MESSENGER_APP_ID,
      appSecret: process.env.MESSENGER_APP_SECRET,
      verifyToken: process.env.MESSENGER_VERIFY_TOKEN,
      mapPageToAccessToken: (pageId) => {
        // resolve corresponding access token
      },
    },
  },
};
```

## Prepare `Facebook Page Access Token` for Each Facebook Page

To make your bot to reply to users, you need `Facebook Page Access Token` for each Facebook Page. So, you have to implement your `mapPageToAccessToken` function to tell Bottender how to get the corresponding access token of each Facebook Page.

> **Note:** All operations require a `Facebook Page Access Token` with [`manage_pages`](https://developers.facebook.com/docs/facebook-login/permissions/#reference-manage_pages) permission.

### Fetching Token Statically

If you only need your bot to apply to a fixed set of Facebook Pages, you may check the sample code below.

```js
function mapPageToAccessToken(pageId) {
  switch (pageId) {
    case PAGE_1_PAGE_ID:
      return PAGE_1_ACCESS_TOKEN;
    case PAGE_2_PAGE_ID:
      return PAGE_2_ACCESS_TOKEN;
  }
}
```

For more information, you can check the Bottender example, [Messenger Multi-pages Example](https://github.com/Yoctol/bottender/tree/master/examples/messenger-multi-pages).

### Fetching Token Dynamically

We assume that an advanced developer like you might need to support more Facebook Pages dynamically. Plus, you don't want to modify the `mapPageToAccessToken` function every time you add your bot to a new Page.

In this case, you may dynamically load tokens from SQL Database, MongoDB, Redis, REST API, or whatever you want:

```js
async function mapPageToAccessToken(pageId) {
  return fetchTokenFromSomewhere(pageId);
}
```

## Manage `Facebook Page Subscriptions Fields` Your Bot Needs

Facebook has dedicated permission controls; please remember to subscribe `Facebook Page Subscriptions Fields` you need.

We recommend you at least enable the following fields:

- `messages`
- `messaging_postbacks`
- `messaging_optins`
- `messaging_referrals`
- `messaging_policy_enforcement`

### Subscribe `Facebook Page Subscriptions Fields`

We assume that you might need to add your bot to a Facebook Pages dynamically. In the following code, you can see how to subscribe `Facebook Page Subscriptions Fields` your bot needs.

```js
const { getClient } = require('bottender');

const messenger = getClient('messenger');

// subscribe app for page
await messenger.axios.post(
  `/${pageId}/subscribed_apps?access_token=${accessToken}`,
  {
    subscribedFields: [
      'messages',
      'messaging_postbacks',
      'messaging_optins',
      'messaging_referrals',
      'messaging_policy_enforcement',
    ].join(','),
  }
);
```

### Unsubscribe `Facebook Page Subscriptions Fields`

We assume that you might need to remove your bot from Facebook Pages dynamically. In the following code, you can see how to unsubscribe `Facebook Page Subscriptions Fields` your bot have subscribed.

```js
// unsubscribe app for page
await messenger.axios.delete(
  `/${pageId}/subscribed_apps?access_token=${accessToken}`
);
```
