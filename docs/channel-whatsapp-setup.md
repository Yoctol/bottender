---
id: channel-whatsapp-setup
title: WhatsApp Setup
---

## Introduction

[Twilio API for WhatsApp](https://www.twilio.com/whatsapp) is one of the most popular ways to send and receive messages programmatically in WhatsApp. Twilio hosts and manages WhatsApp containers in a highly available and geographically redundant infrastructure, providing us a straightforward REST API to integrate with our Bottender apps.

To move into production using the Twilio API for WhatsApp, you need a WhatsApp Business Profile. WhatsApp is currently limiting access to profiles during their API's limited availability stage. Business Profiles must be associated with a Twilio number. [Request to enable your Twilio numbers for WhatsApp here](https://www.twilio.com/whatsapp/request-access).

However, it doesn't mean you have to wait to start building your app. With developer tools like the [Twilio Sandbox for WhatsApp](https://www.twilio.com/console/sms/whatsapp/sandbox), you can test your app in a development environment without the approval from WhatsApp.

## Requirements

A Twilio account is required to set up the WhatsApp channel. Make sure to [sign up](https://www.twilio.com/try-twilio) to get an account if you don't have one.

Once signed up, you could find your Account SID and Auth Token in the Dashboard. Just a quick note to let you know you will need them later on.

![](https://user-images.githubusercontent.com/3382565/75419061-f41cee00-596f-11ea-88a0-0586a2c082e3.png)

## Enabling WhatsApp Channels

To enable WhatsApp channels, you can start either from new or existing Bottender apps.

### New Bottender Apps

**Create Bottender App** is the best way to start building a new app in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure to select the `whatsapp` option:

![](https://user-images.githubusercontent.com/3382565/75420500-1a905880-5973-11ea-80ed-623807855b70.png)

After you go through the steps, `bottender.config.js` and `.env` are generated automatically for further channel settings.

### Existing Bottender Apps

First, you must have a `bottender.config.js` file includes the following settings:

```js
module.exports = {
  channels: {
    whatsapp: {
      enabled: true,
      path: '/webhooks/whatsapp',
      accountSid: process.env.WHATSAPP_ACCOUNT_SID,
      authToken: process.env.WHATSAPP_AUTH_TOKEN,
      phoneNumber: process.env.WHATSAPP_PHONE_NUMBER,
    },
  },
};
```

Make sure to set the `channels.whatsapp.enabled` field to `true`.

By default, the Bottender server listens to the WhatsApp requests on the `/webhooks/whatsapp` path. However, you can overwrite the path by assigning the preferred webhook path in the `channels.whatsapp.path` field.

We highly recommend setting your sensitive config using `process.env`, so you could avoid any credentials get exposed.

## Environment Configuration

Bottender utilizes the [dotenv](https://www.npmjs.com/package/dotenv) package to load your environment variables when developing your app.

To make a WhatsApp bot work, you must fill the following environment variables in your `.env` file:

```
// .env

WHATSAPP_ACCOUNT_SID=
WHATSAPP_AUTH_TOKEN=
WHATSAPP_PHONE_NUMBER=
```

## Setting Webhooks

After configuring your environment variables, you may start the server using the following command:

```sh
npx bottender dev
```

Then, you could copy the ngork URL and paste it to the Twilio Sandbox Configuration:

![](https://user-images.githubusercontent.com/3382565/75419069-f8490b80-596f-11ea-99d2-2b2bec96ff7a.png)
