# CLI

## Introduction

The command-line interface included with bottender provides a number of helpful commands that can help you while you build your bot.

```sh
bottender
```

Or using `btd` shorthand:

```sh
btd
```

To see all of available commands, just use the `--help` option:

```sh
bottender --help
```

Every command also includes a "help" screen which displays and describes the command's available arguments and options. To view a help screen, simply precede the name of the command with `--help`:

```sh
bottender init --help
```

## Create Bot

```sh
bottender init
```

## Messenger

### Persistent Menu

```sh
bottender persistent-menu:get
```

```sh
bottender persistent-menu:set
```

```sh
bottender persistent-menu:delete
```

### Get Started

```sh
bottender get-started:get
```

```sh
bottender get-started:set
```

```sh
bottender get-started:delete
```

### Greeting Text

```sh
bottender greeting-text:get
```

```sh
bottender greeting-text:set
```

```sh
bottender greeting-text:delete
```

### Domain Whitelist

```sh
bottender domain-whitelist:get
```

```sh
bottender domain-whitelist:set
```

```sh
bottender domain-whitelist:delete
```

### Set Webhook

```sh
bottender set-webhook
```

## Telegram

### Set Webhook

```sh
bottender set-telegram-webhook
```
