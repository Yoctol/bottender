---
id: advanced-guides-deployment
title: Bot Deployment
---

 <p><img width="500" src="https://user-images.githubusercontent.com/662387/72043275-b7c3fe80-32eb-11ea-9a49-f2d5c073f397.jpg"></p>

Once you finished your bot in development, the next step is to deploy your bot to a hosting.

Deployment of a Bottender app is more complicated than a static website due to the access token and webhook settings.

> **Note:** We aim to offer development guides for every popular modern hosting services. [Tweet us](https://twitter.com/bottenderjs) if you haven't seen your favorite one.

### Before Going Further

We assumed that you already build at least one basic Bottender app in development. If you haven't, you may check [Getting Started](https://bottender.js.org/docs/getting-started) first, then jump to the setup doc of your favorite chat channel:

- [Setup Messenger](https://bottender.js.org/docs/channel-messenger-setup)
- [Setup LINE](https://bottender.js.org/docs/channel-line-setup)
- [Setup Slack](https://bottender.js.org/docs/channel-slack-setup)
- [Setup Telegram](https://bottender.js.org/docs/channel-telegram-setup)
- [Setup Viber](https://bottender.js.org/docs/channel-viber-setup)

## Heroku Deployment

Heroku is one of the most popular hosting services for developers. Not only the clear document, ease of scalability, using Git for deployment, but also the friendly [free pricing plan](https://www.heroku.com/pricing) for experiment purpose.

In the following, you can see the necessary steps of Heroku Deployment:

### Step 1: Create a Heroku Account & Download Heroku CLI

First, [sign up](https://www.heroku.com/) a Heroku account if you haven't, then download and install [Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).

> **Note:** For the full command list, please refer to Heroku's doc, [Heroku CLI Commands](https://devcenter.heroku.com/articles/heroku-cli).

### Step 2: Heroku Login and Create a Heroku App

Before going further, make sure you have login your Heroku account by:

```sh
heroku login
```

Then you can create a Heroku app by the below command. You may see some app name regulation like `Name must start with a letter, end with a letter or digit and can only contain lowercase letters, digits, and dashes` if you don't meet it.

```sh
heroku create <your-heroku-app-name>
```

If you created your Heroku app successfully, you could see a deployment address for your app like `https://<your-heroku-app-name>.herokuapp.com/`. You can note it down for future webhook setting.

### Step 3: Fill in Environment Variables to Heroku

Deployment of Heroku depends on Git, and we usually put `.env` in `.gitignore`. So you have to config in the environment variables of your Heroku app with the following commands: `heroku config:set -a <your-heroku-app-name> <ENV_KEY_01>=<ENV_VALUE_01>`.

For chat channels require multiple environment variables, you may use commands like `heroku config:set -a <your-heroku-app-name> <ENV_KEY_01>=<ENV_VALUE_01> <ENV_KEY_02>=<ENV_VALUE_02>`.

For example:

```sh
heroku config:set -a <your-heroku-app-name> MESSENGER_PAGE_ID=xxxxxx MESSENGER_ACCESS_TOKEN=xxxxxx MESSENGER_APP_ID=xxxxxx MESSENGER_APP_SECRET=xxxxxx MESSENGER_VERIFY_TOKEN=xxxxxx
```

### Step 4: Using Git in Your Bottender App

Since deployment of Heroku depends on Git, make sure you have run `git init` and make the first commit in your Bottender app.

For example:

```sh
git init
git add .
git commit -am "first commit"
```

### Step 5: Deploy Your Bot to Heroku and Webhook Setup

When you set up the webhook, some chat channels (e.g., Messenger) asked for an immediate bot server verification. So, we recommend you to set up the webhook after your Bottender bot server running.

There are two basic types of webhook setup:

1. Set up webhook by UI of Developer Console, e.g., Messenger, LINE, Slack
2. Set up webhook by CLI, e.g., Messenger, Telegram, Viber

#### Step 5a: Set up webhook by UI of Developer Console

You can use Heroku CLI by Git push to complete the deployment.

```sh
heroku git:remote -a <your-heroku-app-name>
git push heroku master
```

Then fill in your webhook URL on the developer console of the chat channel.

**> Note:** If you haven't changed your webhook path in `bottender.config.js`, by default, your Messenger Bot Webhook is `https://<your-heroku-app-name>.herokuapp.com/webhooks/messenger`; your LINE Bot Webhook is `https://<your-heroku-app-name>.herokuapp.com/webhooks/line`, and so on.

#### Step 5b: Set up webhook by CLI

You can benefit from the `Procfile` of Heroku, which specifies the commands that are executed by the app on startup. We are going to use two process types of `Procfile`:

- `web` process type: to tell Heroku to run your bot server
- `release` process type: set up webhook

> **Note:** For more info about `Procfile`, you may refer to Heroku's guide, [The Procfile](https://devcenter.heroku.com/articles/procfile).

Using a Messenger Bot as an example, the `Procfile` looks like the below by default:

```sh
// Procfile

web: npm start
release: echo "Y" | npx bottender messenger webhook set -w https://<your-heroku-app-name>.com/webhooks/messenger

```

> **Note:**
>
> - The `echo "Y"` aims to answer the first interactive CLI prompt
> - If you haven't changed your webhook path in `bottender.config.js`, by default, your Messenger Bot Webhook is `https://<your-heroku-app-name>.herokuapp.com/webhooks/messenger`; your LINE Bot Webhook is `https://<your-heroku-app-name>.herokuapp.com/webhooks/line`, and so on.

Finally, You can use Heroku CLI by Git push to complete the deployment process and let Heroku runs the `Procfile` to help you finish the webhook set up.

```sh
heroku git:remote -a <your-heroku-app-name>
git push heroku master
```

## Zeit Now Deployment

(TBD)
(intro Now)
Elegant

starting point
https://create-react-app.dev/docs/deployment

ref.
https://ithelp.ithome.com.tw/articles/10228055?sc=rss.iron

用 CLI 可能比 UI 更容易
https://devcenter.heroku.com/articles/heroku-cli-commands
https://github.com/Yoctol/bottender/issues/620
