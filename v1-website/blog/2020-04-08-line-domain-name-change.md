---
title: Notice of LINE domain name change for certain endpoints
author: C. T. Lin
authorURL: https://twitter.com/chentsulin
authorTitle: Co-Creator of Bottender
authorTwitter: chentsulin
authorImageURL: https://avatars1.githubusercontent.com/u/3382565?s=460&v=4
---

According to the [Notice of domain name change for certain endpoints](https://developers.line.biz/en/news/2019/11/08/domain-name-change/) post on LINE Developer News, the domain name of the following LINE Messaging API endpoints has been changed from `api.line.me` to `api-data.line.me` during the transition period:

<!--truncate-->

- [Get content](https://developers.line.biz/en/reference/messaging-api/#get-content):

```js
context.getMessageContent();

// or in Bottender v0.15
context.retrieveMessageContent();
```

- [Upload rich menu image](https://developers.line.biz/en/reference/messaging-api/#upload-rich-menu-image):

```js
const { getClient } = require('bottender');

const line = getClient('line');

await line.uploadRichMenuImage(richMenuId, imageBuffer);
```

- [Download rich menu image](https://developers.line.biz/en/reference/messaging-api/#download-rich-menu-image):

```js
const { getClient } = require('bottender');

const line = getClient('line');

const imageBuffer = await line.downloadRichMenuImage(richMenuId);
```

If you are using the above endpoints and methods, please make sure to upgrade Bottender to `v1.3.3+` (or `v0.15.18+` if using `v0.x`) before **April 30, 2020**.
