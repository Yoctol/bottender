# 0.14.29 / 2018-03-21

### telegram

* [new] Add new Get APIs to `TelegramContext`:

- [`context.getUserProfilePhotos`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textgetuserprofilephotosoptionscode---official-docs)

```js
context.getUserProfilePhotos({ limit: 1 }).then(result => {
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

* [`context.getChat`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textgetchatcode---official-docs)

```js
context.getChat().then(result => {
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

* [`context.getChatAdministrators`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textgetchatadministratorscode---official-docs)

```js
context.getChatAdministrators().then(result => {
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

* [`context.getChatMembersCount`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textgetchatmemberscountcode---official-docs)

```js
context.getChatMembersCount().then(result => {
  console.log(result);
  // '6'
});
```

* [`context.getChatMember`](https://bottender.js.org/docs/APIReference-TelegramContext#code-classlanguage-textgetchatmemberuseridcode---official-docs)

```js
context.getChatMember().then(result => {
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

* [new] Add new Group APIs to `TelegramContext`:

- [`context.kickChatMember`](https://bottender.js.org/docs/APIReference-TelegramContext#kickchatmemberuserid--options---official-docs)
- [`context.unbanChatMember`](https://bottender.js.org/docs/APIReference-TelegramContext#unbanchatmemberuserid---official-docs)
- [`context.restrictChatMember`](https://bottender.js.org/docs/APIReference-TelegramContext#restrictchatmemberuserid--options---official-docs)
- [`context.promoteChatMember`](https://bottender.js.org/docs/APIReference-TelegramContext#promotechatmemberuserid--options---official-docs)
- [`context.exportChatInviteLink`](https://bottender.js.org/docs/APIReference-TelegramContext#exportchatinvitelink---official-docs)
- [`context.setChatPhoto`](https://bottender.js.org/docs/APIReference-TelegramContext#setchatphotophoto---official-docs)
- [`context.deleteChatPhoto`](https://bottender.js.org/docs/APIReference-TelegramContext#deletechatphoto---official-docs)
- [`context.setChatTitle`](https://bottender.js.org/docs/APIReference-TelegramContext#setchattitletitle---official-docs)
- [`context.setChatDescription`](https://bottender.js.org/docs/APIReference-TelegramContext#setchatdescriptiondescription---official-docs)
- [`context.setChatStickerSet`](https://bottender.js.org/docs/APIReference-TelegramContext#setchatstickersetstickersetname---official-docs)
- [`context.deleteChatStickerSet`](https://bottender.js.org/docs/APIReference-TelegramContext#deletechatstickersetchatid---official-docs)
- [`context.pinChatMessage`](https://bottender.js.org/docs/APIReference-TelegramContext#pinchatmessagemessageid--options---official-docs)
- [`context.unpinChatMessage`](https://bottender.js.org/docs/APIReference-TelegramContext#unpinchatmessage---official-docs)
- [`context.leaveChat`](https://bottender.js.org/docs/APIReference-TelegramContext#leavechat---official-docs)

* [new] Add new Payment APIs to `TelegramContext`:

- [`context.answerShippingQuery`](https://bottender.js.org/docs/APIReference-TelegramContext#answershippingqueryok--options---official-docs)
- [`context.answerPreCheckoutQuery`](https://bottender.js.org/docs/APIReference-TelegramContext#answerprecheckoutqueryok--options---official-docs)

# 0.14.27 / 2018-03-19

### line

* [new] Add new `LineContext` methods:

- [`context.getUserProfile`](https://bottender.js.org/docs/APIReference-LineContext#getuserprofile):

```js
context.getUserProfile().then(profile => {
  console.log(profile);
  // {
  //   displayName: 'LINE taro',
  //   userId: USER_ID,
  //   pictureUrl: 'http://obs.line-apps.com/...',
  //   statusMessage: 'Hello, LINE!',
  // }
});
```

* [`context.getMemberProfile`](https://bottender.js.org/docs/APIReference-LineContext#getmemberprofileuserid):

```js
context.getMemberProfile(USER_ID).then(member => {
  console.log(member);
  // {
  //   "displayName":"LINE taro",
  //   "userId":"Uxxxxxxxxxxxxxx...",
  //   "pictureUrl":"http://obs.line-apps.com/..."
  // }
});
```

* [`context.getMemberIds`](https://bottender.js.org/docs/APIReference-LineContext#getmemberidsstart):

```js
context.getMemberIds(CURSOR).then(res => {
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

* [`context.getAllMemberIds`](https://bottender.js.org/docs/APIReference-LineContext#getallmemberids):

```js
context.getAllMemberIds().then(ids => {
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

* [new] Implement `context.getUserProfile`:

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

* [new] Implement `context.sendSenderAction`:

```js
context.sendSenderAction('typing_on');
// same as
context.typingOn();
```

* [fix] Fix metadata argument in handover methods (#208)

### viber

* [new] Implement `context.getUserDetails`:

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

* [new] Implement `context.getOnlineStatus`:

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

* [new] Support using `/exit` to exit

### messenger

* [new] Support passing `verifyToken` to `MessengerBot` or `MessengerConnector` (#204)

Support both:

* pass verifyToken in server config

```js
const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
});

const server = createServer(bot, { verifyToken: config.verifyToken });
```

* pass verifyToken in bot config

```js
const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
  verifyToken: config.verifyToken,
});

const server = createServer(bot);
```

### line

* [fix] Fix LINE join, leave events which do not have userId will fail get profile (#206)

# 0.14.24 / 2018-03-11

* [fix] Upgrade `@slack/client` deps to fix security vulnerability

# 0.14.23 / 2018-02-27

* [fix] fix context simulator initialState (#198)

### messenger

* [new] Support request thread control:

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

* [fix] fix error on verifying facebook signature.

# 0.14.22 / 2018-02-12

* [deps] bump messaging-apis to v0.6.13

### console

* [new] Support trigger payload in `ConsoleBot`

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

* [new] Support all of methods on `ConsoleContext` with `fallbackMethods: true` [#184](https://github.com/Yoctol/bottender/pull/184), for example:

```js
const bot = new ConsoleBot({ fallbackMethods: true });

bot.onEvent(async context => {
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

* [fix] Catch write session error in async mode [#185](https://github.com/Yoctol/bottender/pull/185)
* [improve] Show warning when calling `setState` or `resetState` after session have been written [#186](https://github.com/Yoctol/bottender/pull/186)

# 0.14.20 / 2018-01-30

* [fix] Use sync mode in `ConsoleBot` to fix some format issue.

# 0.14.19 / 2018-01-25

* [new] Support `--ngrok-port` when setting webhook [#171](https://github.com/Yoctol/bottender/pull/171). For example:

```
bottender messenger webhook set --ngrok-port 1234
bottender telegram webhook set --ngrok-port 1234
bottender viber webhook set --ngrok-port 1234
```

* [deps] Update part of dependencies.

### viber

* [new] Implement signature verify for viber

# 0.14.18 / 2018-01-18

* [fix] Prevent applying any mutations to `initialState` [#164](https://github.com/Yoctol/bottender/pull/164)

### telegram

* [new] Added `context.answerInlineQuery` for Telegram [#165](https://github.com/Yoctol/bottender/pull/165):

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

* [changed] Improve config schema validation.

### slack

* [experimental] add Slack RTM API support:

```js
const { SlackBot } = require('bottender');

const bot = new SlackBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRtmRuntime();
```

### telegram

* [new] Handle all of telegram event types includes:
  * `message`
  * `edited_message`
  * `channel_post`
  * `edited_channel_post`
  * `inline_query`
  * `chosen_inline_result`
  * `callback_query`
  * `shipping_query`
  * `pre_checkout_query`
* [new] Support group chat events.

# 0.14.16 / 2018-01-16

### messenger

* [new] Better handle Messenger getUserProfile failure [#155](https://github.com/Yoctol/bottender/pull/155)

If `getUserProfile` throw error, `session.user` will fallback to have only `id` and `_updatedAt` keys.

### telegram

* [new] Added more event parser and getter to telegram event [#150](https://github.com/Yoctol/bottender/pull/150)

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

* [new] Add `context.postEphemeral`:

```js
context.postEphemeral({ text: 'hello' });
```

* [fix] Reply to thread instead of channel when receiving events in thread [#145](https://github.com/Yoctol/bottender/pull/145)

### telegram

* [fix] Use `message.chat.id` to reply [#148](https://github.com/Yoctol/bottender/pull/148)

# 0.14.14 / 2018-01-08

* [fix] Improve error handling in express middleware [#142](https://github.com/Yoctol/bottender/pull/142)

# 0.14.13 / 2018-01-03

### messenger

* [new] Add optional `--yes` for Messenger force upload attachment [#127](https://github.com/Yoctol/bottender/pull/127)
* [new] Initial State in test-utils [#126](https://github.com/Yoctol/bottender/pull/126)
* [fix] Improve context simulator and add some tests [#131](https://github.com/Yoctol/bottender/pull/131)
* [fix] Support Messenger webhook test requests [#139](https://github.com/Yoctol/bottender/pull/139)

# 0.14.12 / 2017-12-25

### telegram

* [new] Support running Telegram bots with long polling [#117](https://github.com/Yoctol/bottender/pull/117)

```js
const { TelegramBot } = require('bottender');

const bot = new TelegramBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createLongPollingRuntime({
  limit: 100,
  timeout: 60,
  allowed_updates: ['message', 'callback_query'],
});
```

See more details in [examples/telegram-long-polling](https://github.com/Yoctol/bottender/tree/master/examples/telegram-long-polling)

* [fix] Result destructing bugs in Telegram webhook commands

# 0.14.11 / 2017-12-20

* [fix] ContextSimulator: sendState to setState [#108](https://github.com/Yoctol/bottender/pull/108)
* [deprecated] `sendXXXWithDelay` is deprecated. Use `sendXXX` with `options.delay` instead.

### messenger

* [fix] update messaging-api-messenger to fix empty array quick_replies bug

### line

* [new] Add LINE `context.leave()` function for group and room [#107](https://github.com/Yoctol/bottender/pull/107)

### telegram

* [fix] Fix `context.sendVideoNote` using `messaging-api-telegram` v0.6.5
* [new] Add context.methods:

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
context.getGameHighScores().then(result => {
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

bot.onEvent(async context => {
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

* [new] Add `update-notifier` in CLI [#99](https://github.com/Yoctol/bottender/pull/99)
* [deps] Update messaging API clients to `v0.6.x`.

### messenger

* [fix] Fix domain whitelisting usage
* [fix] Check messenger menu item length [#71](https://github.com/Yoctol/bottender/pull/71)

### line

* [fix] Handle LINE webhook verify request in LineConnector [#100](https://github.com/Yoctol/bottender/pull/100)

### slack

* [new] Add Slack signature validation [#94](https://github.com/Yoctol/bottender/pull/94)
* [improve] Let slack connector handle promises parallelly [#105](https://github.com/Yoctol/bottender/pull/105)

# 0.14.9 / 2017-12-06

* [new] Add referral getters for `MessengerEvent`:

```js
event.isReferral; // true or false
event.referral; // { source: 'SHORTLINK', type: 'OPEN_THREAD', ref: 'my_ref' }
event.ref; // 'my_ref'
```

* [fix] `bottender init` bug introduced by [#81](https://github.com/Yoctol/bottender/pull/81). Issue: [#86](https://github.com/Yoctol/bottender/issues/86)

# 0.14.8 / 2017-12-05

* [new] Create `README.md` and `.gitignore` when `bottender init`
* [deps] Update messaging-apis to `v0.5.16`

### messenger

* [new] Add `event.isFromCustomerChatPlugin` getter
* [new] Implement CLI attachment force upload [#70](https://github.com/Yoctol/bottender/pull/70)
* [fix] Fix CLI profile bug
* [fix] Add huge like sticker support to isLikeSticker [#67](https://github.com/Yoctol/bottender/pull/67)
* [fix] Use timingSafeEqual to validate signature [#79](https://github.com/Yoctol/bottender/pull/79)

### line

* [fix] Use timingSafeEqual to validate signature [#79](https://github.com/Yoctol/bottender/pull/79)

# 0.14.7 / 2017-11-30

### messenger

* [new] Add `mapPageToAccessToken` to support multiple pages (Experimental) [#47](https://github.com/Yoctol/bottender/pull/47)

```js
new MessengerBot({
  appSecret: '__FILL_YOUR_SECRET_HERE__',
  mapPageToAccessToken: pageId => accessToken,
});
```

> Note: API may changes between any versions.

### line

* [new] Export `context.reply` and `context.push` methods. [#52](https://github.com/Yoctol/bottender/pull/52)
* [new] New CLI commands to sync LINE rich menus: [#50](https://github.com/Yoctol/bottender/pull/50)

```sh
$ bottender line menu get
$ bottender line menu set
$ bottender line menu delete
```

### slack

* [new] Add support to interactive messages, and you can get action from it: [#41](https://github.com/Yoctol/bottender/pull/41)

```js
if (context.event.isInteractiveMessage) {
  console.log(context.event.action);
}
```

# 0.14.6 / 2017-11-27

### messenger

* [new] A new command to upload your messenger attachments from `/assets` directory (in beta):

```sh
$ bottender messenger attachment upload
```

Then, you can import them with `getAttachment` util function:

```js
const { getAttachment } = require('bottender/utils');

console.log(getAttachment('mypic.jpg').id); // '1591074914293017'
```

* [new] Add `--force` option to `bottender messenger profile set` (delete all and set all)
* [fix] Fix file export for `test-utils.js` [#44](https://github.com/Yoctol/bottender/pull/44)
* [fix] Refined affected methods in `withTyping` [#35](https://github.com/Yoctol/bottender/pull/35)

### slack

* [fix] Stop passing `as_user: true` [#33](https://github.com/Yoctol/bottender/pull/33)

# 0.14.5 / 2017-11-21

### messenger

* [new] Add `--skip-validate` cli option to skip `Joi` schema validation [#31](https://github.com/Yoctol/bottender/pull/31)
* [fix] Allow unknown keys in config and fix schema rules [#29](https://github.com/Yoctol/bottender/pull/29)

### slack

* [new] Add options for `postMessage` [#25](https://github.com/Yoctol/bottender/pull/25)

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

* [new] Implement richmenu api methods on context [#23](https://github.com/Yoctol/bottender/pull/23)

  * `context.getLinkedRichMenu()`
  * `context.linkRichMenu(richMenuId)`
  * `context.unlinkRichMenu()`

# 0.14.3 / 2017-11-14

### messenger

* [new] Add new send methods [#19](https://github.com/Yoctol/bottender/pull/19)
  * `context.sendMessage`
  * `context.sendTemplate`
  * `context.sendOpenGraphTemplate`
  * `context.sendMediaTemplate`
* [new] Implement label api methods for targeting broadcast messages [#18](https://github.com/Yoctol/bottender/pull/18)
  * `context.associateLabel(labelId)`
  * `context.dissociateLabel(labelId)`
  * `context.getAssociatedLabels()`
* [new] Implement thread control methods [#15](https://github.com/Yoctol/bottender/pull/15)
  * `context.passThreadControl(targetAppId, metadata)`
  * `context.passThreadControlToPageInbox`
  * `context.takeThreadControl`
* [new] Send `messaging_type` as `RESPONSE` when reply anything in the context. [#12](https://github.com/Yoctol/bottender/pull/12)
* [deps] Upgrade [Messaging APIs](https://github.com/Yoctol/messaging-apis) clients to latest.

# 0.14.2 / 2017-11-07

### slack

* [fix] Slack `url_verification` fails with restify [#4](https://github.com/Yoctol/bottender/issues/4)
* [fix] Send direct messages on Slack [#8](https://github.com/Yoctol/bottender/issues/8)

# 0.14.0 / 2017-11-02

First public release.
