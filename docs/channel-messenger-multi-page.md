---
id: channel-messenger-multi-page
title: Multi-page Support
---

## Support Multiple Facebook Pages In One App

`bottender.config.js`

`channels.messenger.mapPageToAccessToken`

```js
// bottender.config.js

function mapPageToAccessToken(pageId) {
  // ...
}

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
      mapPageToAccessToken,
    },
  },
};
```

```js
function mapPageToAccessToken(pageId) {
  switch (pageId) {
    case PAGE_1_PAGE_ID:
      return PAGE_1_ACCESS_TOKEN;
    case PAGE_2_PAGE_ID:
    default:
      return PAGE_2_ACCESS_TOKEN;
  }
}
```

check this example: https://github.com/Yoctol/bottender/tree/master/examples/messenger-multi-pages

## Subscribe/Unsubscribe An App for Page

Subscribe An App for Page

```js
const { MessengerClient } = require('messaging-api-messenger');

const config = require('./bottender.config.js');

const messenger = new MessengerClient(config.channels.messenger);

// createSubscribedApp
await messenger.axios.post(
  `/${pageId}/subscribed_apps?access_token=${accessToken}`,
  {
    subscribedFields: fields.join(','),
  }
);
```

Unsubscribe An App for Page

```js
// createSubscribedApp
await messenger.axios.delete(
  `/${pageId}/subscribed_apps?access_token=${accessToken}`
);
```

> **Note:** All operations require a Page access token with either the `publish_pages` or `manage_pages` permission.

## Fetching Token Dynamically

Usually, you don't want to modify `mapPageToAccessToken` function every time you support a new page. In this case, you may dynamically load tokens from SQL Database, MongoDB, Redis, REST API or whatever you want:

```js
async function mapPageToAccessToken(pageId) {
  return fetchTokenFromSomewhere(pageId);
}
```
