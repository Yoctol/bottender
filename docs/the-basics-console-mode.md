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

## Sending Message or Payload

text message event

```
MY_TEXT
```

`/payload` payload event

```
/payload THIS_IS_MY_COOL_PAYLOAD
```

## Receiving Response

## Exiting Console Mode
