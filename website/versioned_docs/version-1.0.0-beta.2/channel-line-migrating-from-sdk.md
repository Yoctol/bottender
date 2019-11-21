---
id: version-1.0.0-beta.2-channel-line-migrating-from-sdk
title: Migrating from LINE SDK for nodejs
original_id: channel-line-migrating-from-sdk
---

## Bottender, the Ultimate Time Saver for LINE Bot Developers

Bottender aims to help LINE developers focus on project-specific business logic. It is carefully crafted to save developers' time based on real project experience.

To feel the magic of Bottender, you can check the section of comparison, [Creating a Bot Project by LINE SDK vs. Bottender.](#create-a-bot-project-by-line-sdk-vs-bottender) If you are keen on migrating your existing project to Bottender, you can jump to the section, [Migrate Your LINE SDK Bot Project to Bottender.](#migrate-your-line-sdk-bot-project-to-bottender-from-scratch)

## Create a Bot Project by LINE SDK vs. Bottender

In the following comparison, you can see a significant difference between creating an echo bot project by LINE SDK or Bottender. Comparing with the code lines of the LINE SDK project, you only need 5% code lines by Bottender.

### Create a Bot Project by LINE SDK

The sample code below is from [LINE](https://github.com/line/line-bot-sdk-nodejs/). It represents a basic bot that echoes the user's input.

```js
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
  channelSecret: 'YOUR_CHANNEL_SECRET',
};

const app = express();
app.post('/webhooks/line', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result =>
    res.json(result)
  );
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text,
  });
}

app.listen(3000);
```

If you have experienced in bot projects, you can figure out that 80% of the above code is duplicated from project to project. That's why we need an excellent bot framework, i.e., Bottender, to save your development time from redundant works.

### Create a Bot Project by Bottender

By Bottender, you can make a simple echo bot in the 3 steps:

First, create a LINE Bot project by one-line command:

```sh
npx create-bottender-app my-app
```

Finish the LINE project environment setup. Please refer to LINE environment [setup guide](./channel-line-setup.md), if you are not familiar with it.

Finally, add Bot echo feature by editing `src/index.js` file and add one line of code.

```js
module.exports = function App(context) {
  await context.sendText(context.event.text);
}
```

## Migrate Your LINE SDK Bot Project to Bottender

In the case that you have an existing bot project, you can follow the below steps to migrate your bot from LINE SDK to Bottender.

To begin with, install Bottender and uninstall LINE Bot SDK.

```sh
// Using npm
npm install bottender@next
npm uninstall @line/bot-sdk

// Using yarn
yarn add bottender@next
yarn remove @line/bot-sdk
```

Then, create your Bottender config file.

Edit your `bottender.config.js` file as:

```js
module.exports = {
  enabled: true,
  path: '/webhooks/line',
  accessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
```

Create the main logic of your bot project by editing your bot logic in `index.js`:

```js
module.exports = function App(context) {
  await context.sendText(context.event.text);
}
```

Create an environment file `.env`, and fill in access token and channel secret:

```
LINE_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=
```

Finally, run your bot by the following command:

```sh
npx bottender start
```
