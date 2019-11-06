---
id: channel-line-setup
title: Setup LINE
---

## Enable LINE Channel

### Enable LINE Channel for New Bottender App

`Create Bottender App` is the best way to start a new bot application in Bottender. 

To create a new application, run:

```sh
npx create-bottender-app my-app
```

Please make sure the `line` option is enabled:

![](https://user-images.githubusercontent.com/3382565/67851224-f2b7f200-fb44-11e9-9ccb-afd7eee74b00.png)

After finishing `Create Bottender App` process, `bottender.config.js`, a config file, will be generated automatically for furthur LINE channel settings.


### Enable LINE Channel for Existing Apps

Firstly, you need to have a `bottender.config.js` under application root folder, then set `channels.line.enabled` to `true`:

```js
module.exports = {
  channels: {
    line: {
      enabled: true,
      path: '/webhooks/line',
      accessToken: process.env.LINE_ACCESS_TOKEN,
      channelSecret: process.env.LINE_CHANNEL_SECRET,
    },
  },
};
```

The default webhook path is `/webhooks/line`, but you can set your own webhook path in the `path` field. 


## Complete LINE Channel Settings

To make a LINE bot work, you have to setup three values:
- LINE Access Token
- LINE Channel Secret
- Webhook
  


### LINE Access Token & Channel Secret

`bottender.config.js` looks up `.env` for LINE access token and LINE channel secrect. Those two values have to be copied from LINE@ account settings and pasted to the the following fields in `.env`.

```
LINE_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=
```

**Note:** 
- It is recommended to develop your LINE Bot with your developer LINE@ account, furthur information could be found in LINE's official article, [Getting Started](https://developers.line.biz/en/docs/messaging-api/getting-started/). 
- Your LINE@ accounts could be accessed from your [provider list](https://developers.line.biz/console/).
- To get your LINE access token and LINE channel secrect, you may refer to LINE's official article, [Building a Bot](https://developers.line.biz/en/docs/messaging-api/building-bot/).

### Webhook
After finishing above settings, you can start your server with LINE webhook listening using following commands:

```
// in production mode
npm start

// or in development mode
npm run dev
```

Then, you have to manually copy your webhook to LINE@ account's setting page. Finally, you are ready to interact with your bot on LINE :)


**Note:**
- For furthur instruction of webhook setting, please check LINE's official article, [Building a Bot](https://developers.line.biz/en/docs/messaging-api/building-bot/).

