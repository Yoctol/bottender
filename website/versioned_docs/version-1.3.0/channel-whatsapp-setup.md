---
id: version-1.3.0-channel-whatsapp-setup
title: Setup WhatsApp
original_id: channel-whatsapp-setup
---

## Introduction

[Twilio API for WhatsApp](https://www.twilio.com/whatsapp) is one of the most popular ways to send and receive messages programmatically in WhatsApp. It hosts and manages WhatsApp containers in a highly available and geographically redundant infrastructure, providing us a straightforward REST API to integrate with our Bottender applications.

To move into production using the Twilio API for WhatsApp, you need a WhatsApp Business Profile. WhatsApp is currently limiting access to profiles during their API's limited availability stage. Business Profiles must be associated with a Twilio number. [Request to enable your Twilio numbers for WhatsApp here](https://www.twilio.com/whatsapp/request-access).

However, it doesn't mean you have to wait to start building your application. With developer tools like the [Twilio Sandbox for WhatsApp](https://www.twilio.com/console/sms/whatsapp/sandbox), you can test your app in a development environment without the approval from WhatsApp.

## Requirements

A Twilio account is required to set up the WhatsApp channel. Make sure to [sign up](https://www.twilio.com/try-twilio) to get an account if you don't have one.

Once signed up, you could find your Account SID and Auth Token in the Dashboard. Just a quick note to let you know you will need them later on.

![](https://user-images.githubusercontent.com/3382565/75419061-f41cee00-596f-11ea-88a0-0586a2c082e3.png)

## Enabling the WhatsApp Channel

To enable the WhatsApp Channel, you could start either from a new or an existing Bottender application.

### Using a New Application

`Create Bottender App` is the best way to start building a new application with Bottender.

To create a new app, use the following command:

```sh
npx create-bottender-app my-app
```

Make sure to check the `whatsapp` option:

![](https://user-images.githubusercontent.com/3382565/75420500-1a905880-5973-11ea-80ed-623807855b70.png)

Once the process is completed, `bottender.config.js` and `.env` are generated automatically for further channel settings.

### Using an Existing Application

First, you have to add the following `whatsapp` settings into your `bottender.config.js` file:

```js
module.exports = {
  // other settings...
  channels: {
    // other channels...
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

By default, the server listens to WhatsApp requests on the path - `/webhooks/whatsapp`. However, you could overwrite it by assigning the preferred webhook path in the `path` field.

It's highly recommended to set your sensitive config using `process.env`, so you could avoid any credentials get exposed.

## Environment Configuration

It is often helpful to have different configuration values based on the environment where the application is running.

Bottender utilizes the [dotenv](https://www.npmjs.com/package/dotenv) library to load your environment variables when developing your application.

So, to make a WhatsApp Bot works, you have to fill the below environment variables in your `.env` file:

```
# .env

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
