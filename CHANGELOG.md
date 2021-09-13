# 1.5.1 / 2020-09-xx

- [new] Server: support experimental custom connectors (#781):

```js
// bottender.config.js

module.exports = {
  channels: {
    mychannel: {
      enabled: true,
      path: '/webhooks/mychannel',
      connector: new MyConnector(/* ... */),
    },
  },
};
```

- [new]: export clients, factories from `messaging-apis` (#806):

```js
const {
  // clients
  MessengerClient,
  LineClient,
  TelegramClient,
  SlackOAuthClient,
  ViberClient,
  TwilioClient,

  // factories
  Messenger,
  Line,
} = require('bottender');
```

- [new] Bot: implement the `onRequest` option (#773):

```js
// bottender.config.js

function onRequest(body, requestContext) {
  console.log({
    body,
    requestContext,
  });
}

module.exports = {
  channels: {
    messenger: {
      // ...
      onRequest,
    },
    whatsapp: {
      // ...
      onRequest,
    },
    line: {
      // ...
      onRequest,
    },
    telegram: {
      // ...
      onRequest,
    },
    slack: {
      // ...
      onRequest,
    },
    viber: {
      // ...
      onRequest,
    },
  },
};
```

- [new] RequestContext: add `id` to `RequestContext` (#774)
- [fix] Server: should await for `connector.preprocess` (#771)
- [deps] upgrade `messaging-apis` to v1.0.0

## messenger

- [new] get/set/delete user level persistent menu for context user (#790):

```js
await context.getUserPersistentMenu();
// [
//   {
//     locale: 'default',
//     composerInputDisabled: false,
//     callToActions: [
//       {
//         type: 'postback',
//         title: 'Restart Conversation',
//         payload: 'RESTART',
//       },
//       {
//         type: 'web_url',
//         title: 'Powered by ALOHA.AI, Yoctol',
//         url: 'https://www.yoctol.com/',
//       },
//     ],
//   },
// ]

await context.setUserPersistentMenu([
  {
    locale: 'default',
    composerInputDisabled: false,
    callToActions: [
      {
        type: 'postback',
        title: 'Restart Conversation',
        payload: 'RESTART',
      },
      {
        type: 'web_url',
        title: 'Powered by ALOHA.AI, Yoctol',
        url: 'https://www.yoctol.com/',
      },
    ],
  },
]);

await context.deleteUserPersistentMenu();
```

## line

- [new] support line multi-channel using `getConfig` (#770):

```js
// bottender.config.js
module.exports = {
  channels: {
    line: {
      enabled: true,
      path: '/webhooks/line/:channelId',
      async getConfig({ params }) {
        console.log(params.channelId);
        // ...get the config from the API, database or wherever you like when every time receiving a new event
        return {
          accessToken,
          channelSecret,
        };
      },
    },
  },
};
```

- [new] add `emojis` on LINE text message event (#793):

```js
if (context.event.isMessage) {
  context.event.message.emojis;
  // [
  //   {
  //     index: 14,
  //     length: 6,
  //     productId: '5ac1bfd5040ab15980c9b435',
  //     emojiId: '001',
  //   },
  // ]
}
```

- [new] add `LineContext.getMembersCount` method (#824):

```js
await context.getMembersCount();
// 10
```

## telegram

- [new] add `TelegramEvent.isPollAnswer` and `TelegramEvent.pollAnswer` (#745):

```js
if (context.event.isPollAnswer) {
  console.log(context.event.pollAnswer);
}
```

- [new] add `pollAnswer` to telegram routes:

```js
const { router, telegram } = require('bottender/router');

async function HandlePollAnswer(context) {
  // ...
}

function App() {
  return router([telegram.pollAnswer(HandlePollAnswer)]);
}
```

- [new] add `TelegramContext.answerCallbackQuery` (#750):

```js
await context.answerCallbackQuery({
  url: 'https://example.com/',
});
```

## slack

- [new] slack route accept any requests by passing `*` (#758):

```js
const { router, slack } = require('bottender/router');

async function HandleAllEvent(context) {
  // ...
}

function App() {
  return router([slack.event('*', HandleAllEvent)]);
}
```

- [fix] fix `context.views.open` in slack home tab (#809)
- [fix] fix route slack event (#841)
- [fix] fix slack session when channel id is null (#802)
- [docs] update slack routes improvement (#759)
- [example] example: slack update and delete (#769)
- [example] slack home tab (#829)
- [example] slack modal on home (#827)
- [example] slack modal update (#825)
- [example] slack modal form (#828)

## dialogflow

- [deps] use `@google-cloud/dialogflow` v4

## create-bottender-app

- [fix] fix context concat and env name (#859)

## bottender-facebook

- [new] add new connector - `FacebookConnector` to experiment using same connector for Messenger and Facebook.

```js
// bottender.config.js
const { FacebookConnector } = require('@bottender/facebook');

module.exports = {
  channels: {
    facebook: {
      enabled: true,
      path: '/webhooks/facebook',
      connector: new FacebookConnector({
        // The top level access token should be provided for the batch requests.
        accessToken: process.env.FACEBOOK_ACCESS_TOKEN,
        appSecret: process.env.FACEBOOK_APP_SECRET,
        verifyToken: process.env.FACEBOOK_VERIFY_TOKEN,
        origin: process.env.FACEBOOK_ORIGIN,
        async mapPageToAccessToken(pageId) {
          console.log(pageId);
          return accessToken;
        },
      }),
      onRequest: onFacebookRequest,
    },
  },
};
```

# 1.4.12 / 2020-08-25

## create-bottender-app

- [fix] fix context concat and env name #859

# 1.4.11 / 2020-07-29

## dialogflow

- [fix] use for await instead of `promise.all` #851

# 1.4.10 / 2020-07-24

- [fix] add Interaction type for route `slack.event` (#842)

# 1.4.9 / 2020-07-07

- [fix] MongoSessionStore: enable `useUnifiedTopology` to avoid warning (#831)

# 1.4.8 / 2020-06-30

- [fix] lock messaging-apis packages on specific version.

# 1.4.7 / 2020-06-23

- [fix] add a workaround to support express behind trust proxies (for example: nginx) with:

```js
server.enable('trust proxy');

// or
server.set('trust proxy', true);
```

# 1.4.6 / 2020-05-22

## messenger

- [fix] cli: remove deprecated properties on messenger profiles (including `home_url`).

# 1.4.5 / 2020-05-11

- [fix] fix issue #618 ngrok undefined error message (#765)

# 1.4.4 / 2020-05-06

## slack

- [fix] convert slack interactive message event to camelcase (#755).

# 1.4.3 / 2020-04-29

- [type] use string instead enum to compare.

# 1.4.2 / 2020-04-24

- [type] improve TS types of the `getClient` function (#744)

# 1.4.1 / 2020-04-17

## line

- [fix] bump messaging-api-line to beta.20 and fix types in text methods (#742)

# 1.4.0 / 2020-04-15

- [new] route: provides `namespace.any` for better readability (#719):

```js
function App() {
  return router([
    messenger.any(HandleMessenger),
    line.any(HandleLine),
    slack.any(HandleSlack),
    telegram.any(HandleTelegram),
    viber.any(HandleViber),
    whatsapp.any(HandleWhatsapp),
  ]);
}
```

- [new] support custom session store (#732):

```js
// bottender.config.js

const { MemorySessionStore } = require('bottender');

module.exports = {
  session: {
    driver: 'memory2',
    stores: {
      memory2: new MemorySessionStore();
    },
  },
};
```

- [fix] context: let getters return literal instead of string type (#724)
- [type] improve types of withProps (#731)

## messenger

- [new] messenger: use v6.0 graph api as default (messaging-apis#556)
- [new] support reaction event and routing (#718):

Support `event.isReaction` & `event.react`:

```js
function App(context) {
  if (context.event.isReaction) {
    console.log(context.event.reaction);
    // {
    //   reaction: 'smile',
    //   emoji: '\u{2764}\u{FE0F}',
    //   action: 'react',
    //   mid: 'mid.$cAAE1UUyiiwthh0NPrVbVf4HFNDGl',
    //  }
  }
}
```

Support detect events in routers:

```js
const { router, messenger } = require('bottender/router');

function App() {
  return router([
    messenger.reaction.react(HandleReactionReact),
    messenger.reaction.unreact(HandleReactionUnreact),
    messenger.reaction(HandleReaction),
  ]);
}

async function HandleReactionReact(context) {}
async function HandleReactionUnreact(context) {}
async function HandleReaction(context) {}
```

- [new] add `context.sendOneTimeNotifReqTemplate` (#722):

```js
context.sendOneTimeNotifReqTemplate({
  title: '<TITLE_TEXT>',
  payload: '<USER_DEFINED_PAYLOAD>',
});
```

- [type] improve types of MessengerContext send methods (#729)

## line

- [new] export `LineNotify` (#721):

```js
const { LineNotify } = require('bottender');
```

- [type] add `language` to `User` (messaging-apis#563)
- [type] add `sticon` to `TextMessage` (messaging-apis#564)
- [type] export LINE flex types (messaging-apis#558)

## bottender-dialogflow

- [new] support text responses filled on Dialogflow.

## create-bottender-app

- [new] add `lib` es2018-es2020 by default.
- [fix] let `App` action accept Action as return value (#734)

# 1.3.5 / 2020-04-04

- [fix] put `router.d.ts` into package files whitelist

# 1.3.4 / 2020-04-04

- [fix] fix `bottender/router` import statement in TypeScript (#715)

# 1.3.3 / 2020-04-01

## line

- [deps] update `messaging-api-line` for [domain name change for certain endpoints](https://developers.line.biz/en/news/2019/11/08/domain-name-change/).

# 1.3.2 / 2020-03-20

- [fix] improve the error message of missing entry action (#705).
- [fix] fix responding with application/json when using custom server (#700).

## line

- [deps] update `messaging-api-line`.

## create-bottender-app

- [fix] rewrite generated README (#708).
- [fix] install `eslint-plugin-import` for `--typescript`.
- [fix] add `dist` to `.gitignore` for TypeScript (#697).

# 1.3.1 / 2020-03-16

- [deps] some packages bump from dependabot.

## line

- [deps] update `messaging-api-line` to fix an issue about narrowcast.

## create-bottender-app

- [fix] hint users to edit the `.env` file (#678)

# 1.3.0 / 2020-03-06

- [type] export types from messaging-apis (#661):

```ts
import {
  MessengerTypes,
  WhatsappTypes,
  LineTypes,
  TelegramTypes,
  SlackTypes,
  ViberTypes,
} from 'bottender';
```

- [deps] update dependencies.

## whatsapp

- [new] add new channel `whatsapp` built on top of [Twilio API for WhatsApp](https://www.twilio.com/whatsapp) (#664):

```js
// bottender.config.js

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

## slack

- [new] support Slack signing secret:

```js
// bottender.config.js

module.exports = {
  channels: {
    slack: {
      enabled: true,
      path: '/webhooks/slack',
      accessToken: process.env.SLACK_ACCESS_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      // verificationToken: process.env.SLACK_VERIFICATION_TOKEN, // deprecated, use signingSecret
    },
  },
};
```

- [new] add support for Slack slash commands (#166):

```js
async function App(context) {
  if (context.event.isCommand) {
    await context.sendText(
      `I received slash command '${context.event.command}' with arguments: '${context.event.text}'`
    );
  }
}
```

## line

- [deps] update `messaging-api-line` to support narrowcast.

## create-bottender-app

- [new] use signing secret in create-bottender-app (#659).
- [new] add TypeScript support to `bottender dev` (#654).

## cli

- [new] support `bottender dev --inspect=HOST:PORT` (#656).

# 1.2.3 / 2020-03-04

## slack

- [fix] fix a typo in Slack error message #671

# 1.2.2 / 2020-02-24

## create-bottender-app

- [fix] Fixed wrong npm scripts in the instruction.

# 1.2.1 / 2020-02-13

- [fix] install @types packages in package dependencies instead of workspace.

# 1.2.0 / 2020-01-22

- [new] Added four NLU packages:

  - [@bottender/dialogflow](https://github.com/Yoctol/bottender/tree/master/packages/bottender-dialogflow)
  - [@bottender/luis](https://github.com/Yoctol/bottender/tree/master/packages/bottender-luis)
  - [@bottender/qna-maker](https://github.com/Yoctol/bottender/tree/master/packages/bottender-qna-maker)
  - [@bottender/rasa](https://github.com/Yoctol/bottender/tree/master/packages/bottender-rasa)

- [new] Added `context.setIntent()` for intent tracking purpose (#617):

```js
context.intent; // null

context.setIntent('greeting');

context.intent; // 'greeting'
```

- [new] Added `context.setAsHandled()` and `context.setAsNotHandled()` for tracking handling status (#624):

```js
context.setAsHandled();

context.isHandled; // true

context.setAsNotHandled();

context.isHandled; // false
```

- [new] Added `getSessionStore` helper function to get the session store that configured by `bottender.config.js` (#633):

```js
const { getSessionStore } = require('bottender');

const sessionStore = getSessionStore();
```

- [new] Added `getClient` helper function to access underlying messaging client configured by `bottender.config.js` (#634):

```js
const { getClient } = require('bottender');

const messenger = getClient('messenger');

messenger.sendText(USER_ID, 'Hello!', { tag: 'CONFIRMED_EVENT_UPDATE' });

const line = getClient('line');

line.pushText(USER_ID, 'Hello!');
```

- [new] Added async plugin support.
- [docs] Updated [Natural Language Understanding Guide](https://bottender.js.org/docs/advanced-guides-nlu) to use NLU packages.
- [example] Using NLU packages in NLU examples.

### slack

- [new] add `includeBotMessages` option for interacting with `bot_message` (#635):

```js
// bottender.config.js

module.exports = {
  // ...
  slack: {
    enabled: true,
    path: '/webhooks/slack',
    accessToken: process.env.SLACK_ACCESS_TOKEN,
    verificationToken: process.env.SLACK_VERIFICATION_TOKEN,
    includeBotMessages: true, // add this line
  },
};
```

Then you can use `context.event.isBotMessage` to determine if the event is a bot message event:

```js
module.exports = function App(context) {
  if (context.event.isBotMessage) {
    console.log(context.event.rawEvent.botId);
  }
};
```

# 1.1.3 / 2020-01-08

- [fix] fix(Bot, LineConnector, MessengerConnector): when receiving multiple events, construct session with event instead of request #621

# 1.1.2 / 2020-01-03

- [fix] fix(DevServer): call `super.prepare()` in `prepare` method to avoid overwriting parent method

# 1.1.1 / 2020-01-02

- [fix] improve error message when there are errors in bottender.config.js (#611)

# 1.1.0 / 2019-12-27

- [new] improve error messages for bots configuration:

```
LINE channel secret is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.
```

Instead of:

```
TypeError [ERR_INVALID_ARG_TYPE]: The "key" argument must be one of type Buffer, TypedArray, DataView, string, or KeyObject. Received type undefined
```

### messenger

- [new] Added Messenger routes:

```js
const { router, messenger } = require('bottender/router');

function Action() {
  // ...
}

function App() {
  return router([
    messenger.message(Action),
    messenger.accountLinking.linked(Action),
    messenger.accountLinking.unlinked(Action),
    messenger.accountLinking(Action),
    messenger.checkoutUpdate(Action),
    messenger.delivery(Action),
    messenger.echo(Action),
    messenger.gamePlay(Action),
    messenger.passThreadControl(Action),
    messenger.takeThreadControl(Action),
    messenger.requestThreadControl(Action),
    messenger.appRoles(Action),
    messenger.optin(Action),
    messenger.payment(Action),
    messenger.policyEnforcement(Action),
    messenger.postback(Action),
    messenger.preCheckout(Action),
    messenger.read(Action),
    messenger.referral(Action),
    messenger.standby(Action),
    messenger(Action),
  ]);
}
```

### line

- [new] Added LINE routes:

```js
const { router, line } = require('bottender/router');

function Action() {
  // ...
}

function App() {
  return router([
    line.message(Action),
    line.follow(Action),
    line.unfollow(Action),
    line.join(Action),
    line.leave(Action),
    line.memberJoined(Action),
    line.memberLeft(Action),
    line.postback(Action),
    line.beacon.enter(Action),
    line.beacon.banner(Action),
    line.beacon.stay(Action),
    line.beacon(Action),
    line.accountLink(Action),
    line.things.link(Action),
    line.things.unlink(Action),
    line.things.scenarioResult(Action),
    line.things(Action),
    line(Action),
  ]);
}
```

### slack

- [new] Implemented native Slack chat APIs, see Slack API Doc for further information.
  e.g.

```js
context.chat.postMessage(...);
context.chat.postEphemeral(...);
context.chat.update(...);
context.chat.delete(...);
context.chat.meMessage(...);
context.chat.getPermalink(...);
context.chat.scheduleMessage(...);
context.chat.deleteScheduledMessage(...);
context.chat.scheduledMessages.list(...);
```

`context.postMessage`and`context.postEphemeral`is now deprecated, use`context.chat.postMessage`and`context.chat.postEphemeral` instead.

- [new] Implemented native Slack views APIs, see [Slack API Doc](https://api.slack.com/methods) for further information.
  e.g.

```js
context.views.open(...);
context.views.publish(...);
context.views.push(...);
context.views.update(...);
```

For views, we keep `channelId` in `privateMetadata` to get session key for upcoming view events. ([ref](https://github.com/Yoctol/bottender/pull/545))

- [new] Added Slack routes:

```js
const { router, slack } = require('bottender/router');

function Action() {
  // ...
}

function App() {
  return router([
    slack.message(Action),
    slack.event('pin_added', Action),
    slack.event('star_added', Action),
    slack(Action),
  ]);
}
```

### telegram

- [new] Added Telegram routes:

```js
const { router, telegram } = require('bottender/router');

function Action() {
  // ...
}

function App() {
  return router([
    telegram.message(Action),
    telegram.editedMessage(Action),
    telegram.channelPost(Action),
    telegram.editedChannelPost(Action),
    telegram.inlineQuery(Action),
    telegram.chosenInlineResult(Action),
    telegram.callbackQuery(Action),
    telegram.shippingQuery(Action),
    telegram.preCheckoutQuery(Action),
    telegram.poll(Action),
    telegram(Action),
  ]);
}
```

### viber

- [new] Added Viber routes:

```js
const { router, viber } = require('bottender/router');

function Action() {
  // ...
}

function App() {
  return router([
    viber.message(Action),
    viber.subscribed(Action),
    viber.unsubscribed(Action),
    viber.conversationStarted(Action),
    viber.delivered(Action),
    viber.seen(Action),
    viber.failed(Action),
    viber(Action),
  ]);
}
```

# 1.0.8 / 2020-01-08

- [fix] fix(Bot, LineConnector, MessengerConnector): when receiving multiple events, construct session with event instead of request #621

# 1.0.7 / 2020-01-03

- [fix] fix(DevServer): call `super.prepare()` in `prepare` method to avoid overwriting parent method

# 1.0.6 / 2019-12-24

- [fix] session should never expire by default #595

# 1.0.5 / 2019-12-19

- [fix] move init session and bots into server prepare step #589

# 1.0.4 / 2019-12-17

- [fix] session: use Windows safe key separator for file session

# 1.0.3 / 2019-12-12

- [fix] server: require Bot using pascal case

# 1.0.2 / 2019-12-12

- [fix] server: add `prepare` support for production mode.

# 1.0.1 / 2019-12-10

### messenger

- feat(messenger): add `fields` support to `context.getUserProfile()`:

```js
const user = await context.getUserProfile({
  fields: [
    'id',
    'name',
    'first_name',
    'last_name',
    'profile_pic',
    'locale',
    'timezone',
    'gender',
  ],
});
```

- fix(example): fix `bottender.config.js` in `messenger-typing` example

### line

- fix(line): set `shouldBatch` to `false` after `handlerDidEnd` has been called. This may be the best way to handle errors in LINE:

```js
module.exports = async function HandleError(context, props) {
  console.error(props.error);
  if (process.env.NODE_ENV === 'development') {
    await context.pushText('There are some unexpected errors happened. Please try again later, sorry for the inconvenience.');
    await context.pushText(props.error.stack);
  } else if (!context.isReplied) {
    await context.replyText('There are some unexpected errors happened. Please try again later, sorry for the inconvenience.'
  }
  if (process.env.NODE_ENV === 'production') {
    // send your error to the error tracker, for example: Sentry
  }
};
```

### telegram

- feat(telegram): add telegram `context.editMessageMedia()`:

```js
await context.editMessageMedia(66, { type: 'photo', media: 'xxx.png' });
```

# 1.0.0 / 2019-12-05

- The whole codebase has been fully rewritten with **TypeScript**.
- The repository becomes a lerna **monorepo**.
- [new] A brand-new project creator - `create-bottender-app`. You can use following command to create your new bot:

```sh
npx create-bottender-app my-app
```

- [new] Implement new runner and `bottender start` cli. It finds `index.js` entry and `bottender.config.js` config file then executes accordingly:

```sh
bottender start
```

To enable console mode:

```sh
bottender start --console
```

- [new] Add new development mode via `bottender dev` cli:

```sh
bottender dev
bottender dev --console
```

The bot server will be restarted after changing the files.

- [new] Add several recommended ways to organize chatbot dialogs and features:

**Action**:

```js
async function SayHi(context) {
  await context.sendText('hi');
}
```

**Pass Props to Action**:

```js
const { withProps } = require('bottender');

async function SayHi(context, { name }) {
  await context.sendText(`hi! ${name}.`);
}

async function App() {
  return withProps(SayHi, { name: 'John' });
}
```

**Router**:

```js
const { router, text } = require('bottender/router');

async function SayHi(context) {
  await context.sendText('Hi!');
}

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function App() {
  return router([
    text('hi', SayHi), // return SayHi when receiving hi text message
    text('hello', SayHello), // return SayHello when receiving hello text message
  ]);
}
```

**Chain**:

```js
const { chain } = require('bottender');

function RuleBased(context, props) {
  if (context.event.text === 'hi') {
    // discontinue and return SayHi
    return SayHi;
  }
  // continue to next
  return props.next;
}

function MachineLearningBased(context, props) {
  /* ...skip */
}

function HumanAgent(context, props) {
  /* ...skip */
}

function App() {
  return chain([
    // will execute in following order
    RuleBased,
    MachineLearningBased,
    HumanAgent,
  ]);
}
```

- [new] Add `_error.js` entry support for error handling:

```js
// _error.js
module.exports = async function HandleError(context, props) {
  await context.sendText(
    'There are some unexpected errors happened. Please try again later, sorry for the inconvenience.'
  );
  console.error(props.error);
  if (process.env.NODE_ENV === 'production') {
    // send your error to the error tracker, for example: Sentry
  }
  if (process.env.NODE_ENV === 'development') {
    await context.sendText(props.error.stack);
  }
};
```

- [new] Add better custom server support
- [breaking] `middleware` and Handlers has been moved to `@bottender/handlers` package. You can install it from registry:

```sh
npm install @bottender/handlers

// or using yarn:
yarn add @bottender/handlers
```

And import them like this:

```js
const {
  middleware,
  Handler,
  MessengerHandler,
  LineHandler,
  SlackHandler,
  TelegramHandler,
  ViberHandler,
} = require('@bottender/handlers');
```

- [breaking] transform all context method parameters to camelcase:

Messenger -

```js
context.sendGenericTemplate([
  {
    title: "Welcome to Peter's Hats",
    imageUrl: 'https://petersfancybrownhats.com/company_image.png',
    subtitle: "We've got the right hat for everyone.",
    defaultAction: {
      type: 'web_url',
      url: 'https://peterssendreceiveapp.ngrok.io/view?item=103',
      messengerExtensions: true,
      webviewHeightRatio: 'tall',
      fallbackUrl: 'https://peterssendreceiveapp.ngrok.io/',
    },
    buttons: [
      {
        type: 'postback',
        title: 'Start Chatting',
        payload: 'DEVELOPER_DEFINED_PAYLOAD',
      },
    ],
  },
]);
```

Slack -

```js
context.postMessage({
  blocks: [
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: 'You updated the modal!',
      },
    },
    {
      type: 'image',
      imageUrl: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
      altText: 'Yay! The modal was updated',
    },
  ],
});
```

Telegram -

```js
context.sendMessage('hi', {
  disableWebPagePreview: true,
  disableNotification: true,
});
```

Viber -

```js
context.sendFile({
  media: 'http://www.images.com/file.doc',
  size: 10000,
  fileName: 'name_of_file.doc',
});
```

- [breaking] transform all event attributes to camelcase:

```js
context.event.rawEvent; // all keys is camelcase in this object
```

- [breaking] rename `skipProfile` to `skipLegacyProfile`, and set to true by default

- [breaking] unify requestContext (#541)
- [deps] update `messaging-apis` to v1
- [examples] Rewrite all examples for Bottender v1
- [docs] A brand-new website with new docs - https://bottender.js.org?new

### messenger

- [new] add `pageId` config to automatically add subscribe app in `bottender messenger webhook set`.
- [removed] `get-started`, `greeting`, `persistent-menu`, `whitelisted-domains` cli subcommands has been removed. Use `profile` instead:

```sh
bottender messenger profile get
bottender messenger profile set
bottender messenger profile delete
```

- [removed] Remove deprecated `context.sendAirlineFlightUpdateTemplate()`.

### line

- [new] Implement `context.getMessageContent()`. You can use it to get received media content:

```js
async function App(context) {
  if (context.event.isImage || context.event.isVideo || context.event.isAudio) {
    const buffer = await context.getMessageContent();
  }
}
```

- [new] LineBot: Set `sendMethod` to `reply` and `shouldBatch` to `true` by default.
- [removed] legacy `menu` cli subcommand has been removed.

### slack

- [new] add block kits support:

```js
context.postMessage({
  blocks: [
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: 'You updated the modal!',
      },
    },
    {
      type: 'image',
      imageUrl: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
      altText: 'Yay! The modal was updated',
    },
  ],
});
```

- [fix] use `token` in payload when received a JSON string payload.

### telegram

- [new] implement `context.sendAnimation()`:

```js
context.sendAnimation('xxx.mp4');
```

- [new] implement `context.sendPoll()`

```js
const options = ['a', 'b'];

context.sendPoll(question, options);
```

- [breaking] add messageId to args for all function need messageId:

```js
context.editMessageText('<MESSAGE_ID>', text);
context.editMessageCaption('<MESSAGE_ID>', caption);
context.editMessageReplyMarkup('<MESSAGE_ID>', replyMarkup);
context.editMessageLiveLocation('<MESSAGE_ID>', location);
context.stopMessageLiveLocation('<MESSAGE_ID>');
```

# 0.15.17 / 2019-02-01

### line

- [new] add member join/leave event to LineEvent

```js
event.isMemberJoined;
event.memberJoined;
event.isMemberLeft;
event.memberLeft;
```

# 0.15.16 / 2019-01-29

- [deps] upgrade messaging-api-messenger to [0.7.16](https://github.com/Yoctol/messaging-apis/releases/tag/v0.7.16)

# 0.15.15 / 2018-12-06

### messenger

- [new] Add `page.id` to Messenger sessions:

```js
session.page.id;
```

### line

- [new] Add `skipProfile` to `LinekBot` and `LinekConnector`.
- [new] Add `destination` to `LineEvent`.

### slack

- [new] Add `skipProfile` to `SlackBot` and `SlackConnector`.

### telegram

- [fix] Add missing cli alias `-w` for `--webhook`.

# 0.15.14 / 2018-11-14

### messenger

- [new] provide useful information when setting webhook

# 0.15.13 / 2018-11-12

- [new] Add `context.usePersona`:

```js
context.usePersona('<PERSONA_ID>');
await context.sendText('Hello');
await context.sendText('World');
```

# 0.15.12 / 2018-11-09

### messenger

- [new] Add `skipProfile` option to `MessengerBot` and `MessengerConnector` to skip auto updating user profile:

```js
const bot = new MessengerBot({
  accessToken: ACCESS_TOKEN,
  appSecret: APP_SECRET,
  skipProfile: true,
});
```

# 0.15.11 / 2018-11-07

### messenger

- [new] Add `skipAppSecretProof` option to `MessengerBot` and `MessengerConnector`:

```js
const bot = new MessengerBot({
  accessToken: ACCESS_TOKEN,
  appSecret: APP_SECRET,
  skipAppSecretProof: true,
});
```

# 0.15.10 / 2018-11-02

- [new] platform bots: add `origin` option for testing purpose:

```js
new MessengerBot({
  // ...
  origin: 'https://mydummytestserver.com',
});
new LineBot({
  // ...
  origin: 'https://mydummytestserver.com',
});
new SlackBot({
  // ...
  origin: 'https://mydummytestserver.com',
});
new ViberBot({
  // ...
  origin: 'https://mydummytestserver.com',
});
new TelegramBot({
  // ...
  origin: 'https://mydummytestserver.com',
});
```

### messenger

- [fix] update Messenger profile_pic check logic
- [fix] fix persona cli error messages

# 0.15.9 / 2018-10-26

### messenger

- [new] Add CLI commands for Messenger persona API:

List all personas:

```sh
$ bottender messenger persona list
```

Create a new persona with name and profile picture url:

```sh
$ bottender messenger persona create --name <PERSONA_NAME> --pic <PROFILE_IMAGE_URL>
```

Get persona by persona ID:

```sh
$ bottender messenger persona get --id <PERSONA_ID>
```

Delete persona by persona ID:

```sh
$ bottender messenger persona delete --id <PERSONA_ID>
```

# 0.15.8 / 2018-10-18

- [new] Add `sessionStore.all()` to fetch all of sessions from the store:

```js
// for those session stores
const sessionStore = new MemorySessionStore(500);
const sessionStore = new MongoSessionStore('mongodb://localhost:27017/');
const sessionStore = new FileSessionStore();
const sessionStore = new RedisSessionStore();
```

```js
const sessions = await sessionStore.all();
```

- [deps] update `messaging-apis` (which support messenger persona api)

# 0.15.7 / 2018-09-19

- [new] upgrade `messaging-apis`, so now we can use `DEBUG` env variable to enable request debugger:

```
DEBUG=messaging-api*
```

- [fix] fix `ConsoleBot` recognize symbol as `_methodMissing` (#333)
- [deps] upgrade dependencies

# 0.15.6 / 2018-08-28

### line

- [new] make sure all of methods support quick reply (#331):

```js
context.sendText('hahaha', {
  quickReply: {
    items: [
      {
        type: 'action',
        action: {
          type: 'cameraRoll',
          label: 'Send photo',
        },
      },
      {
        type: 'action',
        action: {
          type: 'camera',
          label: 'Open camera',
        },
      },
    ],
  },
});
```

### telegram

- [new] add `isReplyToMessage`, `replyToMessage` (#330):

```js
event.isReplyToMessage;
event.replyToMessage;
```

# 0.15.5 / 2018-08-27

### slack

- [fix] get correct channel id from more slack event format

# 0.15.4 / 2018-08-22

- [new] add debugger for sync response

```sh
DEBUG=bottender:response
```

print:

```sh
bottender:response Outgoing response:
bottender:response {
bottender:response   body: {
bottender:response   }
bottender:response }
```

Useful when debugging synchronized connectors.

### console

- [fix] makes `context.platform` consistent with `context.session.platform`

# 0.15.3 / 2018-08-21

### console

- [new] Add `mockPlatform` option:

```js
const bot = new ConsoleBot({
  fallbackMethods: true,
  mockPlatform: 'messenger',
});

bot.connector.platform; // 'messenger'
bot.onEvent((context) => {
  context.platform; // 'messenger'
});
```

# 0.15.2 / 2018-08-16

### messenger

- [new] Add `context.isThreadOwner()`:

```js
await context.isThreadOwner(); // true | false
```

# 0.15.1 / 2018-07-20

- [fix] fix cli hint (#311)
- [fix] not print empty array other args in ConsoleBot fallbackMethods (#314)

# 0.15.0 / 2018-07-18

`v0.15` is the second major version after we open sourced Bottender. In this version, we introduce a lot of helpful, community requested features based on [Messaging APIs v0.7](https://github.com/Yoctol/messaging-apis/releases/tag/v0.7.0).

- [new] add `context.requestContext`:

Express, Micro, Restify:

```js
context.requestContext; // { req, res }
```

Koa:

```js
context.requestContext; // ctx in koa
```

- [new] add more debug logs and key change (#239, #295), so you can run bots with following `DEBUG` env:

```sh
DEBUG=bottender:*
DEBUG=bottender:request
DEBUG=bottender:session:read
DEBUG=bottender:session:write
```

- [new] skip and show warning when calling send API in Messenger echo delivery read event (#306)
- [fix] deepClone when read from `MemoryCacheStore` (#235)
- [deps] Upgrade to Babel 7

### messenger

- [breaking] remove deprecated `MessengerContext` method - `sendQuickReplies`
- [new] support Messenger platform v2.4.
- [new] enable verifying graph API calls with `appsecret_proof` by default.
- [new] `context.getThreadOwner`

```js
const threadOwner = await context.getThreadOwner();
// {
//   app_id: '12345678910'
// }
```

- [new] add `pageId`, `gamePlay`, `brandedCamera`, `isRequestThreadControlFromPageInbox` getters to `MessengerEvent`

```js
context.event.pageId; // "<PAGE_ID>"

context.event.isRequestThreadControlFromPageInbox; // true

context.event.isGamePlay; //
context.event.gamePlay; //

context.event.isBrandedCamera; //
context.event.brandedCamera; //
```

- [new] implement Batch Mode to send multiple requests in one batch (up to 50 messages):

```js
const { isError613 } = require('messenger-batch');

new MessengerBot({
  // ...
  batchConfig: {
    delay: 1000,
    shouldRetry: isError613, // (#613) Calls to this api have exceeded the rate limit.
    retryTimes: 2,
  },
});
```

It will enable [message batching](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#message-batching) functionality via [messaging-api-messenger](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger) under the hood.

- [deprecated] `sendAirlineFlightUpdateTemplate` has been renamed to `sendAirlineUpdateTemplate`.

### line

- [new] support LINE Flex Message with `replyFlex`, `pushFlex`, `sendFlex`:

```js
context.sendFlex('this is a flex', {
  type: 'bubble',
  header: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Header text',
      },
    ],
  },
  hero: {
    type: 'image',
    url: 'https://example.com/flex/images/image.jpg',
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Body text',
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Footer text',
      },
    ],
  },
  styles: {
    comment: 'See the example of a bubble style object',
  },
});
```

- [new] add `issueLinkToken` to `LineContext` (#245):

```js
const result = await context.issueLinkToken();
// {
//   linkToken: 'NMZTNuVrPTqlr2IF8Bnymkb7rXfYv5EY',
// }
```

- [new] add LINE `linkAccount` events support (#243):

```js
context.event.isAccountLink; // true
context.event.linkAccount;
// {
//   result: 'ok',
//   nonce: 'xxxxxxxxxxxxxxx',
// }
```

- [new] add `shouldBatch` option:

```js
new LineBot({
  // ...
  shouldBatch: true, // Default: false
});
```

When batching is enabled,

```js
context.replyText('Hi');
context.replyText('Hi');
context.replyText('Hi');
context.replyText('Hi');
context.replyText('Hi');
```

Those 5 messages will be sent in one API call, just like the below one.

```js
const { Line } = require('messaging-api-line');

context.reply([
  Line.createText('Hi'),
  Line.createText('Hi'),
  Line.createText('Hi'),
  Line.createText('Hi'),
  Line.createText('Hi'),
]);
```

- [new] add `sendMethod` option:

```js
new LineBot({
  // ...
  sendMethod: 'reply', // Default: 'push'
});
```

### telegram

- [breaking] Now context methods throw error when `ok` is `false` in Telegram:

```js
{
  ok: false,
  result: { /* ... */ }
}
```

### custom connector

- [new] pass merged query and body to handler:

```js
{
  ...query,
  ...body,
}
```

It's useful in custom connectors.

- [new] export Context from entry (#250)

```js
const { Context } = require('bottender');

class MyContext extends Context {
  //...
}
```

# 0.14.32 / 2018-04-12

- [fix] MemoryCacheStore: make sure read as different object to prevent reading same key multiple times, causing freezed by other events.

# 0.14.31 / 2018-03-26

### line

- [new] alias LINE ButtonsTemplate to ButtonTemplate to match type name `buttons` #219

Aliases:

- replyButtonsTemplate -> replyButtonTemplate
- pushButtonsTemplate -> pushButtonTemplate
- sendButtonsTemplate -> sendButtonTemplate

# 0.14.30 / 2018-03-22

- [new] Add cli option `-t`, `--token` to overwrite token setting.

### telegram

- [new] Add new Update APIs to `TelegramContext`:

* [`editMessageText(text [, options])`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-texteditmessagetexttext--optionscode---official-docs)
* [`editMessageCaption(caption [, options])`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-texteditmessagecaptioncaption--optionscode---official-docs)
* [`editMessageReplyMarkup(replyMarkup [, options])`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-texteditmessagereplymarkupreplymarkup--optionscode---official-docs)
* [`deleteMessage(messageId)`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textdeletemessagemessageidcode---official-docs)
* [`editMessageLiveLocation(location [, options])`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-texteditmessagelivelocationlocation--optionscode---official-docs)
* [`stopMessageLiveLocation(options)`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textstopmessagelivelocationoptionscode---official-docs)
* [`forwardMessageFrom(fromChatId, messageId [, options])`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textforwardmessagefromfromchatid-messageid--optionscode---official-docs)
* [`forwardMessageTo(toChatId, messageId [, options])`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textforwardmessagetotochatid-messageid--optionscode---official-docs)

# 0.14.29 / 2018-03-21

### telegram

- [new] Add new Get APIs to `TelegramContext`:

* [`context.getUserProfilePhotos`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textgetuserprofilephotosoptionscode---official-docs)

```js
context.getUserProfilePhotos({ limit: 1 }).then((result) => {
  console.log(result);
  // {
  //   total_count: 3,
  //   photos: [
  //     [
  //       {
  //         file_id: 'AgADBAADGTo4Gz8cZAeR-ouu4XBx78EeqRkABHahi76pN-aO0UoDA050',
  //         file_size: 14650,
  //         width: 160,
  //         height: 160,
  //       },
  //       {
  //         file_id: 'AgADBAADGTo4Gz8cZAeR-ouu4XBx78EeqRkABKCfooqTgFUX0EoD5B1C',
  //         file_size: 39019,
  //         width: 320,
  //         height: 320,
  //       },
  //       {
  //         file_id: 'AgADBAADGTo4Gz8cZAeR-ouu4XBx78EeqRkABPL_pC9K3UpI0koD1B1C',
  //         file_size: 132470,
  //         width: 640,
  //         height: 640,
  //       },
  //     ],
  //   ],
  // }
});
```

- [`context.getChat`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textgetchatcode---official-docs)

```js
context.getChat().then((result) => {
  console.log(result);
  // {
  //   id: 313534466,
  //   first_name: 'first',
  //   last_name: 'last',
  //   username: 'username',
  //   type: 'private',
  // }
});
```

- [`context.getChatAdministrators`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textgetchatadministratorscode---official-docs)

```js
context.getChatAdministrators().then((result) => {
  console.log(result);
  // [
  //   {
  //     user: {
  //       id: 313534466,
  //       first_name: 'first',
  //       last_name: 'last',
  //       username: 'username',
  //       languange_code: 'zh-TW',
  //     },
  //     status: 'creator',
  //   },
  // ]
});
```

- [`context.getChatMembersCount`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textgetchatmemberscountcode---official-docs)

```js
context.getChatMembersCount().then((result) => {
  console.log(result);
  // '6'
});
```

- [`context.getChatMember`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textgetchatmemberuseridcode---official-docs)

```js
context.getChatMember().then((result) => {
  console.log(result);
  // {
  //   user: {
  //     id: 313534466,
  //     first_name: 'first',
  //     last_name: 'last',
  //     username: 'username',
  //     languange_code: 'zh-TW',
  //   },
  //   status: 'creator',
  // }
});
```

# 0.14.28 / 2018-03-20

### telegram

- [new] Add new Group APIs to `TelegramContext`:

* [`context.kickChatMember`](https://bottender.js.org/docs/APIReference-TelegramContext#kickchatmemberuserid--options---official-docs)
* [`context.unbanChatMember`](https://bottender.js.org/docs/APIReference-TelegramContext#unbanchatmemberuserid---official-docs)
* [`context.restrictChatMember`](https://bottender.js.org/docs/APIReference-TelegramContext#restrictchatmemberuserid--options---official-docs)
* [`context.promoteChatMember`](https://bottender.js.org/docs/APIReference-TelegramContext#promotechatmemberuserid--options---official-docs)
* [`context.exportChatInviteLink`](https://bottender.js.org/docs/APIReference-TelegramContext#exportchatinvitelink---official-docs)
* [`context.setChatPhoto`](https://bottender.js.org/docs/APIReference-TelegramContext#setchatphotophoto---official-docs)
* [`context.deleteChatPhoto`](https://bottender.js.org/docs/APIReference-TelegramContext#deletechatphoto---official-docs)
* [`context.setChatTitle`](https://bottender.js.org/docs/APIReference-TelegramContext#setchattitletitle---official-docs)
* [`context.setChatDescription`](https://bottender.js.org/docs/APIReference-TelegramContext#setchatdescriptiondescription---official-docs)
* [`context.setChatStickerSet`](https://bottender.js.org/docs/APIReference-TelegramContext#setchatstickersetstickersetname---official-docs)
* [`context.deleteChatStickerSet`](https://bottender.js.org/docs/APIReference-TelegramContext#deletechatstickersetchatid---official-docs)
* [`context.pinChatMessage`](https://bottender.js.org/docs/APIReference-TelegramContext#pinchatmessagemessageid--options---official-docs)
* [`context.unpinChatMessage`](https://bottender.js.org/docs/APIReference-TelegramContext#unpinchatmessage---official-docs)
* [`context.leaveChat`](https://bottender.js.org/docs/APIReference-TelegramContext#leavechat---official-docs)

- [new] Add new Payment APIs to `TelegramContext`:

* [`context.answerShippingQuery`](https://bottender.js.org/docs/APIReference-TelegramContext#answershippingqueryok--options---official-docs)
* [`context.answerPreCheckoutQuery`](https://bottender.js.org/docs/APIReference-TelegramContext#answerprecheckoutqueryok--options---official-docs)

# 0.14.27 / 2018-03-19

### line

- [new] Add new `LineContext` methods:

* [`context.getUserProfile`](https://bottender.js.org/docs/APIReference-LineContext#getuserprofile):

```js
context.getUserProfile().then((profile) => {
  console.log(profile);
  // {
  //   displayName: 'LINE taro',
  //   userId: USER_ID,
  //   pictureUrl: 'http://obs.line-apps.com/...',
  //   statusMessage: 'Hello, LINE!',
  // }
});
```

- [`context.getMemberProfile`](https://bottender.js.org/docs/APIReference-LineContext#getmemberprofileuserid):

```js
context.getMemberProfile(USER_ID).then((member) => {
  console.log(member);
  // {
  //   "displayName":"LINE taro",
  //   "userId":"Uxxxxxxxxxxxxxx...",
  //   "pictureUrl":"http://obs.line-apps.com/..."
  // }
});
```

- [`context.getMemberIds`](https://bottender.js.org/docs/APIReference-LineContext#getmemberidsstart):

```js
context.getMemberIds(CURSOR).then((res) => {
  console.log(res);
  // {
  //   memberIds: [
  //     'Uxxxxxxxxxxxxxx...',
  //     'Uxxxxxxxxxxxxxx...',
  //     'Uxxxxxxxxxxxxxx...'
  //   ],
  //   next: 'jxEWCEEP...'
  // }
});
```

- [`context.getAllMemberIds`](https://bottender.js.org/docs/APIReference-LineContext#getallmemberids):

```js
context.getAllMemberIds().then((ids) => {
  console.log(ids);
  // [
  //   'Uxxxxxxxxxxxxxx..1',
  //   'Uxxxxxxxxxxxxxx..2',
  //   'Uxxxxxxxxxxxxxx..3',
  //   'Uxxxxxxxxxxxxxx..4',
  //   'Uxxxxxxxxxxxxxx..5',
  //   'Uxxxxxxxxxxxxxx..6',
  // ]
});
```

# 0.14.26 / 2018-03-17

### messenger

- [new] Implement `context.getUserProfile`:

```js
const user = await context.getUserProfile();
// {
//   first_name: 'Kevin',
//   last_name: 'Durant',
//   profile_pic: 'https://example.com/pic.png',
//   locale: 'en_US',
//   timezone: 8,
//   gender: 'male',
// };
```

- [new] Implement `context.sendSenderAction`:

```js
context.sendSenderAction('typing_on');
// same as
context.typingOn();
```

- [fix] Fix metadata argument in handover methods (#208)

### viber

- [new] Implement `context.getUserDetails`:

```js
const user = await context.getUserDetails();
// {
//   id: '01234567890A=',
//   name: 'John McClane',
//   avatar: 'http://avatar.example.com',
//   country: 'UK',
//   language: 'en',
//   primary_device_os: 'android 7.1',
//   api_version: 1,
//   viber_version: '6.5.0',
//   mcc: 1,
//   mnc: 1,
//   device_type: 'iPhone9,4',
// };
```

- [new] Implement `context.getOnlineStatus`:

```js
const status = await context.getOnlineStatus();
// {
//   id: '01234567890=',
//   online_status: 0,
//   online_status_message: 'online',
// }
```

# 0.14.25 / 2018-03-13

### console

- [new] Support using `/exit` to exit

### messenger

- [new] Support passing `verifyToken` to `MessengerBot` or `MessengerConnector` (#204)

Support both:

- pass verifyToken in server config

```js
const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
});

const server = createServer(bot, { verifyToken: config.verifyToken });
```

- pass verifyToken in bot config

```js
const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
  verifyToken: config.verifyToken,
});

const server = createServer(bot);
```

### line

- [fix] Fix LINE join, leave events which do not have userId will fail get profile (#206)

# 0.14.24 / 2018-03-11

- [fix] Upgrade `@slack/client` deps to fix security vulnerability

# 0.14.23 / 2018-02-27

- [fix] fix context simulator initialState (#198)

### messenger

- [new] Support request thread control:

```js
context.requestThreadControl();
context.event.isRequestThreadControl; // true or false
context.event.requestThreadControl;
/*
  {
      metadata: 'additional content that the caller wants to set',
      requested_owner_app_id: '123456789',
  }
*/
```

- [fix] fix error on verifying facebook signature.

# 0.14.22 / 2018-02-12

- [deps] bump messaging-apis to v0.6.13

### console

- [new] Support trigger payload in `ConsoleBot`

```
You > /payload PAYLOAD
```

Receive event:

```js
context.event.isMessage; // false
context.event.message; // null
context.event.isText; // false
context.event.text; // null

context.event.isPayload; // true
context.event.payload; // PAYLOAD
```

# 0.14.21 / 2018-02-05

- [new] Support all of methods on `ConsoleContext` with `fallbackMethods: true` [#184](https://github.com/Yoctol/bottender/pull/184), for example:

```js
const bot = new ConsoleBot({ fallbackMethods: true });

bot.onEvent(async (context) => {
  await context.sendText('Hello World');
  await context.sendImage('https://example.com/vr.jpg');
  await context.sendButtonTemplate('What do you want to do next?', [
    {
      type: 'web_url',
      url: 'https://petersapparel.parseapp.com',
      title: 'Show Website',
    },
    {
      type: 'postback',
      title: 'Start Chatting',
      payload: 'USER_DEFINED_PAYLOAD',
    },
  ]);
});
```

Result:

```
Bot > Hello World
Bot > sendImage: ["https://example.com/vr.jpg"]
Bot > sendButtonTemplate: ["What do you want to do next?",[{"type":"web_url","url":"https://petersapparel.parseapp.com","title":"Show Website"},{"type":"postback","title":"Start Chatting","payload":"USER_DEFINED_PAYLOAD"}]]
```

- [fix] Catch write session error in async mode [#185](https://github.com/Yoctol/bottender/pull/185)
- [improve] Show warning when calling `setState` or `resetState` after session have been written [#186](https://github.com/Yoctol/bottender/pull/186)

# 0.14.20 / 2018-01-30

- [fix] Use sync mode in `ConsoleBot` to fix some format issue.

# 0.14.19 / 2018-01-25

- [new] Support `--ngrok-port` when setting webhook [#171](https://github.com/Yoctol/bottender/pull/171). For example:

```
bottender messenger webhook set --ngrok-port 1234
bottender telegram webhook set --ngrok-port 1234
bottender viber webhook set --ngrok-port 1234
```

- [deps] Update part of dependencies.

### viber

- [new] Implement signature verify for viber

# 0.14.18 / 2018-01-18

- [fix] Prevent applying any mutations to `initialState` [#164](https://github.com/Yoctol/bottender/pull/164)

### telegram

- [new] Added `context.answerInlineQuery` for Telegram [#165](https://github.com/Yoctol/bottender/pull/165):

```js
context.answerInlineQuery(
  [
    {
      type: 'photo',
      id: 'UNIQUE_ID',
      photo_file_id: 'FILE_ID',
      title: 'PHOTO_TITLE',
    },
    {
      type: 'audio',
      id: 'UNIQUE_ID',
      audio_file_id: 'FILE_ID',
      caption: 'AUDIO_TITLE',
    },
  ],
  {
    cache_time: 1000,
  }
);
```

# 0.14.17 / 2018-01-17

- [changed] Improve config schema validation.

### slack

- [experimental] add Slack RTM API support:

```js
const { SlackBot } = require('bottender');

const bot = new SlackBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

bot.onEvent(async (context) => {
  await context.sendText('Hello World');
});

bot.createRtmRuntime();
```

### telegram

- [new] Handle all of telegram event types includes:
  - `message`
  - `edited_message`
  - `channel_post`
  - `edited_channel_post`
  - `inline_query`
  - `chosen_inline_result`
  - `callback_query`
  - `shipping_query`
  - `pre_checkout_query`
- [new] Support group chat events.

# 0.14.16 / 2018-01-16

### messenger

- [new] Better handle Messenger getUserProfile failure [#155](https://github.com/Yoctol/bottender/pull/155)

If `getUserProfile` throw error, `session.user` will fallback to have only `id` and `_updatedAt` keys.

### telegram

- [new] Added more event parser and getter to telegram event [#150](https://github.com/Yoctol/bottender/pull/150)

```
event.isEditedMessage
event.editedMessage
event.isChannelPost
event.channelPost
event.isEditedChannelPost
event.editedChannelPost
event.isInlineQuery
event.inlineQuery
event.isChosenInlineResult
event.chosenInlineResult
event.isShippingQuery
event.shippingQuery
event.isPreCheckoutQuery
event.preCheckoutQuery
```

# 0.14.15 / 2018-01-12

### slack

- [new] Add `context.postEphemeral`:

```js
context.postEphemeral({ text: 'hello' });
```

- [fix] Reply to thread instead of channel when receiving events in thread [#145](https://github.com/Yoctol/bottender/pull/145)

### telegram

- [fix] Use `message.chat.id` to reply [#148](https://github.com/Yoctol/bottender/pull/148)

# 0.14.14 / 2018-01-08

- [fix] Improve error handling in express middleware [#142](https://github.com/Yoctol/bottender/pull/142)

# 0.14.13 / 2018-01-03

### messenger

- [new] Add optional `--yes` for Messenger force upload attachment [#127](https://github.com/Yoctol/bottender/pull/127)
- [new] Initial State in test-utils [#126](https://github.com/Yoctol/bottender/pull/126)
- [fix] Improve context simulator and add some tests [#131](https://github.com/Yoctol/bottender/pull/131)
- [fix] Support Messenger webhook test requests [#139](https://github.com/Yoctol/bottender/pull/139)

# 0.14.12 / 2017-12-25

### telegram

- [new] Support running Telegram bots with long polling [#117](https://github.com/Yoctol/bottender/pull/117)

```js
const { TelegramBot } = require('bottender');

const bot = new TelegramBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

bot.onEvent(async (context) => {
  await context.sendText('Hello World');
});

bot.createLongPollingRuntime({
  limit: 100,
  timeout: 60,
  allowed_updates: ['message', 'callback_query'],
});
```

See more details in [examples/telegram-long-polling](https://github.com/Yoctol/bottender/tree/master/examples/telegram-long-polling)

- [fix] Result destructing bugs in Telegram webhook commands

# 0.14.11 / 2017-12-20

- [fix] ContextSimulator: sendState to setState [#108](https://github.com/Yoctol/bottender/pull/108)
- [deprecated] `sendXXXWithDelay` is deprecated. Use `sendXXX` with `options.delay` instead.

### messenger

- [fix] update messaging-api-messenger to fix empty array quick_replies bug

### line

- [new] Add LINE `context.leave()` function for group and room [#107](https://github.com/Yoctol/bottender/pull/107)

### telegram

- [fix] Fix `context.sendVideoNote` using `messaging-api-telegram` v0.6.5
- [new] Add context.methods:

sendMediaGroup:

```js
context.sendMediaGroup([
  { type: 'photo', media: 'BQADBAADApYAAgcZZAfj2-xeidueWwI' },
]);
```

Payment API:

```js
context.sendInvoice({
  title: 'product name',
  description: 'product description',
  payload: 'bot-defined invoice payload',
  provider_token: 'PROVIDER_TOKEN',
  start_parameter: 'pay',
  currency: 'USD',
  prices: [
    { label: 'product', amount: 11000 },
    { label: 'tax', amount: 11000 },
  ],
});
```

Game API:

```js
context.sendGame('Mario Bros.');
context.setGameScore(999);
context.getGameHighScores().then((result) => {
  console.log(result);
  /*
  {
      ok: true,
      result: [
        {
          position: 1,
          user: {
            id: 427770117,
            is_bot: false,
            first_name: 'first',
          },
          score: 999,
        },
      ],
    };
  */
});
```

# 0.14.10 / 2017-12-14

Introducing Viber Support to Bottender!

![](https://user-images.githubusercontent.com/3382565/31753411-0be75dfc-b456-11e7-9eea-b976d21fcc53.png)

```js
const { ViberBot } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new ViberBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

bot.onEvent(async (context) => {
  if (context.event.isMessage) {
    await context.sendText('Hello World');
  }
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
```

See [viber-hello-world](https://github.com/Yoctol/bottender/tree/master/examples/viber-hello-world) for more details.

- [new] Add `update-notifier` in CLI [#99](https://github.com/Yoctol/bottender/pull/99)
- [deps] Update messaging API clients to `v0.6.x`.

### messenger

- [fix] Fix domain whitelisting usage
- [fix] Check messenger menu item length [#71](https://github.com/Yoctol/bottender/pull/71)

### line

- [fix] Handle LINE webhook verify request in LineConnector [#100](https://github.com/Yoctol/bottender/pull/100)

### slack

- [new] Add Slack signature validation [#94](https://github.com/Yoctol/bottender/pull/94)
- [improve] Let slack connector handle promises parallelly [#105](https://github.com/Yoctol/bottender/pull/105)

# 0.14.9 / 2017-12-06

- [new] Add referral getters for `MessengerEvent`:

```js
event.isReferral; // true or false
event.referral; // { source: 'SHORTLINK', type: 'OPEN_THREAD', ref: 'my_ref' }
event.ref; // 'my_ref'
```

- [fix] `bottender init` bug introduced by [#81](https://github.com/Yoctol/bottender/pull/81). Issue: [#86](https://github.com/Yoctol/bottender/issues/86)

# 0.14.8 / 2017-12-05

- [new] Create `README.md` and `.gitignore` when `bottender init`
- [deps] Update messaging-apis to `v0.5.16`

### messenger

- [new] Add `event.isFromCustomerChatPlugin` getter
- [new] Implement CLI attachment force upload [#70](https://github.com/Yoctol/bottender/pull/70)
- [fix] Fix CLI profile bug
- [fix] Add huge like sticker support to isLikeSticker [#67](https://github.com/Yoctol/bottender/pull/67)
- [fix] Use timingSafeEqual to validate signature [#79](https://github.com/Yoctol/bottender/pull/79)

### line

- [fix] Use timingSafeEqual to validate signature [#79](https://github.com/Yoctol/bottender/pull/79)

# 0.14.7 / 2017-11-30

### messenger

- [new] Add `mapPageToAccessToken` to support multiple pages (Experimental) [#47](https://github.com/Yoctol/bottender/pull/47)

```js
new MessengerBot({
  appSecret: '__FILL_YOUR_SECRET_HERE__',
  mapPageToAccessToken: (pageId) => accessToken,
});
```

> Note: API may changes between any versions.

### line

- [new] Export `context.reply` and `context.push` methods. [#52](https://github.com/Yoctol/bottender/pull/52)
- [new] New CLI commands to sync LINE rich menus: [#50](https://github.com/Yoctol/bottender/pull/50)

```sh
$ bottender line menu get
$ bottender line menu set
$ bottender line menu delete
```

### slack

- [new] Add support to interactive messages, and you can get action from it: [#41](https://github.com/Yoctol/bottender/pull/41)

```js
if (context.event.isInteractiveMessage) {
  console.log(context.event.action);
}
```

# 0.14.6 / 2017-11-27

### messenger

- [new] A new command to upload your messenger attachments from `/assets` directory (in beta):

```sh
$ bottender messenger attachment upload
```

Then, you can import them with `getAttachment` util function:

```js
const { getAttachment } = require('bottender/utils');

console.log(getAttachment('mypic.jpg').id); // '1591074914293017'
```

- [new] Add `--force` option to `bottender messenger profile set` (delete all and set all)
- [fix] Fix file export for `test-utils.js` [#44](https://github.com/Yoctol/bottender/pull/44)
- [fix] Refined affected methods in `withTyping` [#35](https://github.com/Yoctol/bottender/pull/35)

### slack

- [fix] Stop passing `as_user: true` [#33](https://github.com/Yoctol/bottender/pull/33)

# 0.14.5 / 2017-11-21

### messenger

- [new] Add `--skip-validate` cli option to skip `Joi` schema validation [#31](https://github.com/Yoctol/bottender/pull/31)
- [fix] Allow unknown keys in config and fix schema rules [#29](https://github.com/Yoctol/bottender/pull/29)

### slack

- [new] Add options for `postMessage` [#25](https://github.com/Yoctol/bottender/pull/25)

You can use it to send additional attachments, like below:

```js
context.postMessage('I am a test message', {
  attachments: [
    {
      text: "And here's an attachment!",
    },
  ],
});
```

See [official docs](https://api.slack.com/methods/chat.postMessage) for more available options.

# 0.14.4 / 2017-11-15

### line

- [new] Implement rich menu api methods on context [#23](https://github.com/Yoctol/bottender/pull/23)

  - `context.getLinkedRichMenu()`
  - `context.linkRichMenu(richMenuId)`
  - `context.unlinkRichMenu()`

# 0.14.3 / 2017-11-14

### messenger

- [new] Add new send methods [#19](https://github.com/Yoctol/bottender/pull/19)
  - `context.sendMessage`
  - `context.sendTemplate`
  - `context.sendOpenGraphTemplate`
  - `context.sendMediaTemplate`
- [new] Implement label api methods for targeting broadcast messages [#18](https://github.com/Yoctol/bottender/pull/18)
  - `context.associateLabel(labelId)`
  - `context.dissociateLabel(labelId)`
  - `context.getAssociatedLabels()`
- [new] Implement thread control methods [#15](https://github.com/Yoctol/bottender/pull/15)
  - `context.passThreadControl(targetAppId, metadata)`
  - `context.passThreadControlToPageInbox`
  - `context.takeThreadControl`
- [new] Send `messaging_type` as `RESPONSE` when reply anything in the context. [#12](https://github.com/Yoctol/bottender/pull/12)
- [deps] Upgrade [Messaging APIs](https://github.com/Yoctol/messaging-apis) clients to latest.

# 0.14.2 / 2017-11-07

### slack

- [fix] Slack `url_verification` fails with restify [#4](https://github.com/Yoctol/bottender/issues/4)
- [fix] Send direct messages on Slack [#8](https://github.com/Yoctol/bottender/issues/8)

# 0.14.0 / 2017-11-02

First public release.
