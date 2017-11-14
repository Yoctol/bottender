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
