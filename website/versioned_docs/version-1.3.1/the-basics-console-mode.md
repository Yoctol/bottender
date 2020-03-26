---
id: version-1.3.1-the-basics-console-mode
title: Console Mode
original_id: the-basics-console-mode
---

## Introduction

**Console Mode** is a productivity feature shipped with Bottender. It speeds up bot development iteration by running bots in the console. Comparing with testing your bots fully on existing messaging platforms, we recommend building, testing, and debugging part of your bots in Console Mode.

## Running in Console Mode

In Bottender apps that created by Create Bottender App, you can provide the `--console` option from npm scripts to the underlying start/dev commands:

```sh
npm start -- --console
npm run dev -- --console
```

With the `--console` option, Bottender runs the bot in Console Mode:

![](https://user-images.githubusercontent.com/3382565/67745487-57991c80-fa5f-11e9-8eb7-9e4144df9e73.png)

## Sending Text Messages and Payloads

The most common event types that sent by the end users are text message event type and payload event type.

To send a text message event, enter your message text into your console:

```
You > MY_TEXT
```

To send a payload event, enter your payload with the `/payload` prefix:

```
You > /payload MY_PAYLOAD
```

## Receiving the Responses

Every response you receive from the bot prefixes by the Bot > indicator, for example:

```
Bot > Hi!
```

Bottender displays response types as the name and arguments of the invoked method, except text message responses:

```
Bot > sendSticker with args:
[
  {
    "packageId": "11537",
    "stickerId": "52002744"
  }
]
```

This helpful trick lets you test your bots with many different types of responses in the console.

## Exiting Console Mode

To exit Console Mode, press `ctrl + c` twice or enter the following command:

```
/exit
```
