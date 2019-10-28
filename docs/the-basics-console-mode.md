---
id: the-basics-console-mode
title: Console Mode
---

## Introduction

Console Mode is a powerful feature included with Bottender. It can run your bot
in the console, which helps you develop and test your bot in a short period of time and iterating quickly. It's the cheapest way to develop your bot.

## Running in Console Mode

In Bottender apps that created by Create Bottender App, you can pass `--console` option from npm scripts to underlying start/dev commands:

```sh
npm start -- --console
npm run dev -- --console
```

With this option,

<!--Image-->

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

Every responses received from Bot are following by `Bot >` prefix, for example:

```
Bot > Hi!
```

// ...

## Exiting Console Mode

To exit the console mode, you can press `ctrl + c` twice or enter the following command:

```
/exit
```
