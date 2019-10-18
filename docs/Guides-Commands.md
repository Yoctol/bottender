---
id: commands
title: Commands
---

The following introduction shows the Bottender command-line interface usage.

## Setup

To use Bottender CLI tools, you need to install `bottender` globally:

```sh
npm install -g bottender
```

Or use [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)(already installed in `npm@5.2.0` or greater) to get local `bottender` installation:

```sh
npx bottender
```

Some commands will need a `bottender.config.js` file to be properly configured.

## Usage

The command-line interface included within bottender provides a number of helpful commands.

```sh
bottender
```

Or use `btd` shorthand:

```sh
btd
```

To see all of the available commands, simply use the `--help` option:

```sh
bottender --help
```

Every command has a "help" screen which displays and describes the command's available arguments and options. To view them, simply precede the name of the command with `--help`:

```sh
bottender init --help
```

## Create Bot

You can use interactive CLI to create your bots:

```sh
bottender init
```

After answer a few questions, a new bot will be ready for you.

## Platform Specific Commands

To use platform specific commands, just type name of platform behind the `bottender` command.

For example, to set Messenger profile for your bots:

```sh
bottender messenger profile set
```

Or to get Telegram webhook information:

```sh
bottender telegram webhook get
```

Provide `--help` to see the details.
