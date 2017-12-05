0.14.8 / 2017-12-05
===================
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

0.14.7 / 2017-11-30
===================
### messenger
- [new] Add `mapPageToAccessToken` to support multiple pages (Experimental) [#47](https://github.com/Yoctol/bottender/pull/47)

```js
new MessengerBot({
  appSecret:  '__FILL_YOUR_SECRET_HERE__',
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

0.14.6 / 2017-11-27
===================
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


0.14.5 / 2017-11-21
===================
### messenger
- [new] Add `--skip-validate` cli option to skip `Joi` schema validation [#31](https://github.com/Yoctol/bottender/pull/31)
- [fix] Allow unknow keys in config and fix schema rules [#29](https://github.com/Yoctol/bottender/pull/29)

### slack
- [new] Add options for `postMessage` [#25](https://github.com/Yoctol/bottender/pull/25)

You can use it to send additional attachments, like below:

```js
context.postMessage('I am a test message', {
  attachments: [
    {
      text: "And here's an attachment!"
    },
  ],
});
```

See [official docs](https://api.slack.com/methods/chat.postMessage) for more available options.

0.14.4 / 2017-11-15
===================
### line
- [new] Implement richmenu api methods on context [#23](https://github.com/Yoctol/bottender/pull/23)
  + `context.getLinkedRichMenu()`
  + `context.linkRichMenu(richMenuId)`
  + `context.getLinkedRichMenu()`

0.14.3 / 2017-11-14
===================
### messenger
- [new] Add new send methods [#19](https://github.com/Yoctol/bottender/pull/19)
  + `context.sendMessage`
  + `context.sendTemplate`
  + `context.sendOpenGraphTemplate`
  + `context.sendMediaTemplate`
- [new] Implement label api methods for targeting broadcast messages [#18](https://github.com/Yoctol/bottender/pull/18)
  + `context.associateLabel(labelId)`
  + `context.dissociateLabel(labelId)`
  + `context.getAssociatedLabels()`
- [new] Implement thread control methods [#15](https://github.com/Yoctol/bottender/pull/15)
  + `context.passThreadControl(targetAppId, metadata)`
  + `context.passThreadControlToPageInbox`
  + `context.takeThreadControl`
- [new] Send `messaging_type` as `RESPONSE` when reply anything in the context. [#12](https://github.com/Yoctol/bottender/pull/12)
- [deps] Upgrade [Messaging APIs](https://github.com/Yoctol/messaging-apis) clients to latest.

0.14.2 / 2017-11-07
===================
### slack
- [fix] Slack `url_verification` fails with restify [#4](https://github.com/Yoctol/bottender/issues/4)
- [fix] Send direct messages on Slack [#8](https://github.com/Yoctol/bottender/issues/8)

0.14.0 / 2017-11-02
===================
First public release.
