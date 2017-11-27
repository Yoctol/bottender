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
