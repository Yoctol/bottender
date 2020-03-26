---
id: version-1.3.1-channel-messenger-profile
title: Messenger Profile
original_id: channel-messenger-profile
---

## Introduction

The [Messenger Profile](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/) for your Page is where you set properties that define various aspects of the following Messenger Platform features:

- [Get Started Button](channel-messenger-profile.md#setting-get-started-button)
- [Persistent Menu](channel-messenger-profile.md#setting-persistent-menu)
- [Greeting Text](channel-messenger-profile.md#setting-greeting-text)
- [Ice Breakers](channel-messenger-profile.md#setting-ice-breakers)
- [Domain Whitelist](channel-messenger-profile.md#setting-domain-whitelist)
- Account Linking

All of those settings can be put into `channels.messenger.profile` fields in `bottender.config.js`:

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
      profile: {
        // ...put your messenger profile setting here
      },
    },
  },
};
```

After setting environment variables correctly (if not, please check [this](channel-messenger-setup.md) out first), you may call the `messenger profile set` command to set the profile:

```sh
npx bottender messenger profile set
```

> **Note:** Calls to the Messenger Profile API are limited to **10 API calls per 10 minute** interval. This rate limit is enforced per Page. You could retry it a few minutes later if the rate limit exceeded.

To view all set messenger profile, you may use the `messenger profile get` command:

```sh
npx bottender messenger profile get
```

## Setting Get Started Button

A Page Messenger welcome screen can display a [Get Started button](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/get-started-button). When this button is tapped, the Messenger Platform will send a `messaging_postbacks` event to your webhook.

![](https://user-images.githubusercontent.com/3382565/68738725-058cf500-0622-11ea-9096-beb372d22f8e.png)

This can be set by using `channels.messenger.profile.getStarted` fields in `bottender.config.js`:

```js
// bottender.config.js
module.exports = {
  channels: {
    messenger: {
      // Omission here...
      profile: {
        getStarted: {
          payload: 'GET_STARTED',
        },
      },
    },
  },
};
```

## Setting Persistent Menu

The [persistent menu](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu) can be set for your bot to help people discover and more easily access your functionality throughout the conversation.

![](https://user-images.githubusercontent.com/3382565/68738777-22292d00-0622-11ea-833d-5e873cfd1f46.png)

This can be set by using `channels.messenger.profile.persistentMenu` fields in `bottender.config.js`:

```js
// bottender.config.js
module.exports = {
  channels: {
    messenger: {
      // Omission here...
      profile: {
        getStarted: {
          payload: 'GET_STARTED',
        },
        persistentMenu: [
          {
            locale: 'default',
            composerInputDisabled: false,
            callToActions: [
              {
                type: 'postback',
                title: 'Talk to an agent',
                payload: 'CARE_HELP',
              },
              {
                type: 'postback',
                title: 'Outfit suggestions',
                payload: 'CURATION',
              },
              {
                type: 'web_url',
                title: 'Shop now',
                url: 'https://www.originalcoastclothing.com/',
                webviewHeightRatio: 'full',
              },
            ],
          },
        ],
      },
    },
  },
};
```

> **Note:** If you use any `web_url` buttons with `messengerExtensions` to `true`, you must set the domain of the URL as a [whitelisted domain](channel-messenger-profile.md#setting-domain-whitelist).

### Disabling User Input

To disable user input, you may set the `composerInputDisabled` property to `true`:

```js
{
  locale: 'default',
  composerInputDisabled: true,
  callToActions: [
    // Omission here...
  ],
}
```

This means your bot can only be interacted with via the persistent menu, postbacks, buttons, and webviews.

## Setting Greeting Text

The [greeting](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/greeting) of your bot's Messenger profile lets you specify the greeting message people will see on the welcome screen of your bot. The welcome screen is displayed for people interacting with your bot for the first time.

![](https://user-images.githubusercontent.com/3382565/68740031-273bab80-0625-11ea-806b-b22cfa464d5d.png)

This can be set by using `channels.messenger.profile.greeting` fields in `bottender.config.js`:

```js
// bottender.config.js
module.exports = {
  channels: {
    messenger: {
      // Omission here...
      profile: {
        greeting: [
          {
            locale: 'default',
            text: 'Hello! Welcome to my bot~ ?',
          },
        ],
      },
    },
  },
};
```

### Greeting Personalization

You can personalize the greeting text using the person's name. You can use the following template strings:

- `{{user_first_name}}`
- `{{user_last_name}}`
- `{{user_full_name}}`

For example:

```js
[
  {
    locale: 'default',
    text: 'Hello {{user_first_name}}! Welcome to my bot~ ?',
  },
];
```

## Setting Ice Breakers

[Ice Breakers](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/ice-breakers) provide a way for users to start a conversation with a business with a list of frequently asked questions.

![](https://user-images.githubusercontent.com/3382565/68740032-273bab80-0625-11ea-8341-aaaf95202efb.png)

This can be set by using `channels.messenger.profile.iceBreakers` fields in `bottender.config.js`:

```js
// bottender.config.js
module.exports = {
  channels: {
    messenger: {
      // Omission here...
      profile: {
        iceBreakers: [
          {
            question: '<QUESTION>',
            payload: '<PAYLOAD>',
          },
          {
            question: '<QUESTION>',
            payload: '<PAYLOAD>',
          },
        ],
      },
    },
  },
};
```

`question` will be posted on the thread as the user asking the question and `payload` will be returned as a postback webhook event.

> **Note:** Some of the profile elements like Ice Breakers and Get Started button are incompatible with each other. So when both are set, one will take precedence over the other. Here is the priority from highest to lowest:
>
> - API Ice Breakers
> - Get Started button
> - Custom Questions set via the Page Inbox UI

## Setting Domain Whitelist

The [whitelisted domains](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/domain-whitelisting) of your bot's Messenger profile specifies a list of third-party domains that are accessible in the Messenger webview for use with the **Messenger Extensions SDK**, the **Checkbox Plugin**, and the **Customer Chat Plugin**.

This can be set by using `channels.messenger.profile.whitelistedDomains` fields in `bottender.config.js`:

```js
// bottender.config.js
module.exports = {
  channels: {
    messenger: {
      // Omission here...
      profile: {
        whitelistedDomains: ['<WHITELISTED_DOMAIN>', '<WHITELISTED_DOMAIN>'],
      },
    },
  },
};
```

> **Note:** Domains must meet the following requirements to be whitelisted:
>
> - Served over **HTTPS**
> - Use a fully qualified domain name, such as https://www.messenger.com/. IP addresses and localhost are not supported for whitelisting.
