---
id: version-1.2.0-the-basics-console-mode
title: Console Mode
original_id: the-basics-console-mode
---

## Introduction

Console Mode is a productivity feature shipped with Bottender. It speeds up bot development iteration by running bots in the console. Comparing with testing your bots on existing messaging platform (e.g. Messenger, LINE), it is recommended to build, test, and debug your bot in the console mode.

## Running in Console Mode

In Bottender apps that created by Create Bottender App, you can pass `--console` option from npm scripts to underlying start/dev commands:

```sh
npm start -- --console
npm run dev -- --console
```

With this option, the bot will be started and run in the console:

![](https://user-images.githubusercontent.com/3382565/67745487-57991c80-fa5f-11e9-8eb7-9e4144df9e73.png)

## Sending Text Message and Payload

The most common event types that sent by the end users are text message and payload event.

To send a text message event, enter your text into the console:

```
You > MY_TEXT
```

To send a payload event, enter your payload with `/payload` prefix:

```
You > /payload MY_PAYLOAD
```

## Receiving Response

Every responses you receive from the bot are following by `Bot >` prefix, for example:

```
Bot > Hi!
```

Except text messages, other response types will be displayed as method name and its arguments:

```
Bot > sendSticker with args:
[
  {
    "packageId": "11537",
    "stickerId": "52002744"
  }
]
```

It's a helpful trick that let you test your bots just in the console.

## Exiting Console Mode

To exit the console mode, you can press `ctrl + c` twice or enter the following command:

```
/exit
```
