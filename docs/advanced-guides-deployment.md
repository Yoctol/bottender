---
id: advanced-guides-deployment
title: Deployment
---

Once you finished your bot in development, the next step is to deploy your bot to a hosting service!

### Before Going Further

We assumed that you already built at least one basic Bottender app in development. If you haven't, you may check [Getting Started](https://bottender.js.org/docs/getting-started) to create your first Bottender app in a few minutes, then jump to the setup doc of your favorite chat channel:

- [Messenger Setup](https://bottender.js.org/docs/channel-messenger-setup)
- [LINE Setup](https://bottender.js.org/docs/channel-line-setup)
- [Slack Setup](https://bottender.js.org/docs/channel-slack-setup)
- [Telegram Setup](https://bottender.js.org/docs/channel-telegram-setup)
- [Viber Setup](https://bottender.js.org/docs/channel-viber-setup)

## Heroku

<p><img width="300" src="https://user-images.githubusercontent.com/662387/72130857-a8a98300-33b5-11ea-9ec6-10c8aac37230.jpg"></p>

Heroku is one of the most popular hosting services. Not only the clear document, ease of scalability, using Git for deployment, but also the friendly [free pricing plan](https://www.heroku.com/pricing) for experiment purpose.

In the following, you can see the necessary steps of Heroku Deployment:

### Step 1: Create a Heroku Account and Download Heroku CLI

First, [sign up](https://www.heroku.com/) a Heroku account if you haven't, then download and install [Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).

> **Note:** For the full command list, please refer to Heroku's doc, [Heroku CLI Commands](https://devcenter.heroku.com/articles/heroku-cli).

### Step 2: Heroku Login and Create a Heroku App

Before going further, make sure you have login your Heroku account by:

```sh
heroku login
```

Then, you can create a Heroku app by the below command.

```sh
heroku create <your-heroku-app-name>
```

> **Note:** You may see some app name regulation if you don't meet it. For example: `Name must start with a letter, end with a letter or digit and can only contain lowercase letters, digits, and dashes`

Once you created your Heroku app successfully, you could see a deployment address for your app like `https://<your-heroku-app-name>.herokuapp.com/`. You can note it down for the coming webhook setting.

### Step 3: Fill in Environment Variables to Heroku

Config the environment variables of your Heroku app with the following commands: `heroku config:set -a <your-heroku-app-name> <ENV_KEY_01>=<ENV_VALUE_01>`.

For chat channels require multiple environment variables, you may use commands like `heroku config:set -a <your-heroku-app-name> <ENV_KEY_01>=<ENV_VALUE_01> <ENV_KEY_02>=<ENV_VALUE_02>`.

For example:

```sh
heroku config:set -a <your-heroku-app-name> MESSENGER_PAGE_ID=xxxxxx MESSENGER_ACCESS_TOKEN=xxxxxx MESSENGER_APP_ID=xxxxxx MESSENGER_APP_SECRET=xxxxxx MESSENGER_VERIFY_TOKEN=xxxxxx
```

### Step 4: Using Git in Your Bottender App

Deployment of Heroku depends on Git. Make sure you have run `git init` and make the first commit in your Bottender app.

For example:

```sh
git init
git add .
git commit -am "first commit"
```

### Step 5: Deploy Your Bot to Heroku and Set Up Webhook

When you try to set up the webhook, some chat channels (e.g., Messenger) might ask for an immediate bot server verification. So, we recommend you to set up the webhook after your Bottender app server running.

There are two basic types of webhook setup:

1. Set up webhook by Developer Console UI, e.g., Messenger, LINE, Slack
2. Set up webhook by CLI, e.g., Messenger, Telegram, Viber

#### Step 5a: Set up Webhook by UI of Developer Console

Use Heroku CLI by Git push to complete the deployment.

```sh
heroku git:remote -a <your-heroku-app-name>
git push heroku master
```

Then fill in your webhook URL on the developer console of the chat channel.

> **Note:** If you are not familiar with webhook setup, you may refer to Bottender docs, [Messenger Setup](https://bottender.js.org/docs/channel-messenger-setup), [LINE Setup](https://bottender.js.org/docs/channel-line-setup), and [Slack Setup](https://bottender.js.org/docs/channel-slack-setup).

> **Note:** If you haven't changed your webhook path in `bottender.config.js`, by default, your Messenger Bot webhook is `https://<your-heroku-app-name>.herokuapp.com/webhooks/messenger`; your LINE Bot webhook is `https://<your-heroku-app-name>.herokuapp.com/webhooks/line`, etc.

#### Step 5b: Set up Webhook by CLI

You can benefit from the `Procfile` feature of Heroku, which specifies the commands executed by the app on startup. We are going to use two process types of `Procfile`:

- `web` process type: tell Heroku to run your bot server for every `dyno`
- `release` process type: set up webhook before a new release is deployed to production

> **Note:** For more information about `Procfile`, see [The Procfile](https://devcenter.heroku.com/articles/procfile).

Using a Messenger Bot as an example, the `Procfile` looks like the below with default webhook path settings:

```js
// Procfile

web: npm start
release: echo "Y" | npx bottender messenger webhook set -w https://<your-heroku-app-name>.com/webhooks/messenger
```

> **Note:**
>
> - The `echo "Y"` aims to answer the first interactive CLI prompt
> - If you haven't changed your webhook path in `bottender.config.js`, by default, your Messenger Bot webhook is `https://<your-heroku-app-name>.herokuapp.com/webhooks/messenger`; your LINE Bot webhook is `https://<your-heroku-app-name>.herokuapp.com/webhooks/line`, etc.

Finally, You can use Heroku CLI by Git push to complete the deployment and let Heroku runs the `Procfile` to help you finish the webhook setup.

```sh
heroku git:remote -a <your-heroku-app-name>
git push heroku master
```

### Step 6: Completed!

Congratulations! You have made your Bottender bot production-ready. Share your fantastic bot with your friends!

> **Note:** If you would like to share your Bottender Bot with the community, please feel free to add your project to [Bottender Users](https://bottender.js.org/users).

## ZEIT Now 2.0

<p><img width="1000" src="https://user-images.githubusercontent.com/662387/72130872-acd5a080-33b5-11ea-8c6c-ae06dd250be6.png"></p>

ZEIT Now 2.0 is a super developer-friendly hosting service. ZEIT Now is famous for its one-word magic command `now` in the deployment of static web hosting.

However, it needs a bit configuration to deploy a Bottender app and make it works serverless. In the following sections, you can see the necessary steps of ZEIT Now 2.0 deployment:

### Step 1: Create a ZEIT Account

First, [create](https://ZEIT.co/signup) a ZEIT Account if you haven't.

### Step 2: Install ZEIT Now CLI

We love to deploy with CLI! Install ZEIT Now CLI with npm by:

```sh
npm install -g now
```

### Step 3: Create a `server.js`

ZEIT Now 2.0 doesn't support `npm` scripts, so we need a `server.js` as the entry point.

```js
// server.js

const bodyParser = require('body-parser');
const express = require('express');
const { bottender } = require('bottender');

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    bodyParser.json({
      verify: (req, _, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
```

### Step 4: Update Your `now.json`

In the following configuration, you will make a few settings:

- Set ZEIT Now to version 2.0
- Use `@now/node` to bundle `server.js`
- Put `bottender.config.js` and `index.js` into `includeFiles`. ZEIT Now uses `ncc` and `webpack bundler` under the hood, so you need to tell them to put those two files into the bundle)
- Route all (/.\*) to `server.js`
- Add your chat channel specific environment variables from `.env` to env. The number of environment variables various from the chat channel you use.
- (optional) If you are debugging your app, you may set `DEBUG` env to `bottender*,messaging-api*`

Using a Messenger Bot as an example. your `now.json` is like:

```js
// now.json

{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@now/node",
      "config": {
        "includeFiles": [
          "bottender.config.js",
          "index.js"
        ],
        "bundle": true
      }
    }
  ],
  "routes": [
    {
      "src": "/.*",
      "dest": "/server.js"
    }
  ],
  "env": {
    "MESSENGER_PAGE_ID": "xxxxxx",
    "MESSENGER_ACCESS_TOKEN": "xxxxxx",
    "MESSENGER_APP_ID": "xxxxxx",
    "MESSENGER_APP_SECRET": "xxxxxx",
    "MESSENGER_VERIFY_TOKEN": "xxxxxx",
    "DEBUG": "bottender*,messaging-api*"
  }
}
```

### Step 5: Update Your `bottender.config.js`

ZEIT Now 2.0 is a serverless hosting service, and serverless functions terminated right after HTTP response. So you have to make Bottender work synchronously, i.e., respond to chat channel right after received an event.

to make the Bottender app executes in the synchronous mode, you must configure chat channels with `sync: true` in `bottender.config.js`.

```js
// bottender.config.js

module.exports = {
  // ... skip

  channels: {
    messenger: {
      enabled: true,
      sync: true,
      // ...skip
    },
    line: {
      enabled: true,
      sync: true,
      // ...skip
    },
    telegram: {
      enabled: false,
      sync: true,
      // ...skip
    },
    slack: {
      enabled: false,
      sync: true,
      // ...skip
    },
    viber: {
      enabled: false,
      sync: true,
      // ...skip
    },
  },
};
```

### Step 6: Update Your `package.json`

Set up Node.js version to `10.x` or `12.x` in the `engines` env to avoid warnings for deprecated node 8.

```js
// package.json
{
 // ...skip
 "engines": { "node": "12.x" }
}
```

### Step 7: Deploy with `now`

After all the settings, you are ready to use the magic word, `now`, for ZEIT Now 2.0 deployment.

```sh
now
```

Then you see something like the screenshot below.

![](https://user-images.githubusercontent.com/662387/72136431-c382f400-33c3-11ea-9745-839c212c1b2e.png)

> **Note:** Your deployed URL would be like `https://<your-app-name>.<your-user-name>.now.sh`

### Step 8: Webhook Setup

If you haven't changed your webhook path in `bottender.config.js`, by default, your Messenger Bot webhook is `https://<your-app-name>.<your-user-name>.now.sh/webhooks/messenger`; your LINE Bot webhook is `https://<your-app-name>.<your-user-name>.now.sh/webhooks/line`, etc.

There are two basic types of webhook setup:

1. Set up webhook by Developer Console UI, e.g., Messenger, LINE, Slack
2. Set up webhook by CLI, e.g., Messenger, Telegram, Viber

#### Step 8a: Set up Webhook by Developer Console UI

Fill in your webhook URL on the developer console of the chat channel.

> **Note:** If you are not familiar with webhook setup, you may refer to Bottender docs, [Messenger Setup](https://bottender.js.org/docs/channel-messenger-setup), [LINE Setup](https://bottender.js.org/docs/channel-line-setup), [Slack Setup](https://bottender.js.org/docs/channel-slack-setup).

#### Step 8b: Set up Webhook by CLI

Make sure you have the same environment variable settings in your local `.env` file and `now.js`. Then you can use the following command to set up the webhook.

Using a Messenger Bot as an example, your command is like:

```sh
npx bottender messenger webhook set -w https://<your-app-name>.<your-user-name>.now.sh/webhooks/messenger
```

### Step 9: Completed!

Congratulations! You have made your Bottender bot production-ready. Share your fantastic bot with your friends!

> **Note:** If you would like to share your Bottender Bot with the community, please feel free to add your project to [Bottender Users](https://bottender.js.org/users).
