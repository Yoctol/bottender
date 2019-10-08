---
id: troubleshooting
title: Troubleshooting
---

## General

### I want to know if there're incoming requests to my bot.

To show every incoming request, simply set your `DEBUG` environment variable to `bottender:request` when you start the bot server. You will get something like below when new requests come.

```
$ DEBUG=bottender:request npm start
server is running on 5000 port...

  bottender:request {
  bottender:request   "object": "page",
  bottender:request   "entry": [
  bottender:request     {
  bottender:request       "id": "000000000000000",
  bottender:request       "time": 1516089458463,
  bottender:request       "messaging": [
  bottender:request         {
  bottender:request           "sender": {
  bottender:request             "id": "0000000000000000"
  bottender:request           },
  bottender:request           "recipient": {
  bottender:request             "id": "000000000000000"
  bottender:request           },
  bottender:request           "timestamp": 1516089458006,
  bottender:request           "message": {
  bottender:request             "mid": "mid.$cAALZpXYlSS1nLz6FVlg_00000000",
  bottender:request             "seq": 119080,
  bottender:request             "text": "Hi",
  bottender:request             "nlp": {
  bottender:request               "entities": {}
  bottender:request             }
  bottender:request           }
  bottender:request         }
  bottender:request       ]
  bottender:request     }
  bottender:request   ]
  bottender:request } +0ms
```

### All possible DEBUG keys

- `bottender:request`
- `bottender:session:read`
- `bottender:session:write`
- `bottender:context`

## Messenger

### My bot keeps spamming with no error log until server stops.

It could be that you have subscribed to `message_echoes` events and not filtering them out. Check [this issue](https://github.com/Yoctol/bottender/issues/134) for more information.

### I can't receive persistent menu or get started button events.

#### Make sure you have subscribed to correct events.

You have to check to subscribe `messaging_postbacks` events in the `Messenger` tab, `Webhooks` block of your Facebook App at [Facebook for Developers](https://developers.facebook.com/).

![check messaging_postbacks](https://user-images.githubusercontent.com/1003146/34977945-88a32732-fad7-11e7-8896-70a88cb6dfd1.PNG)

#### Make sure the persistent menu or get started button is created by you current Facebook App.

If your page was previously connected to other bot services and they created persistent menu or get started button for your page, you can not receive the events. You have to recreate new persistent menu or get started button to make them functioning to the new Facebook App.
