---
id: getting-started
title: Getting Started
---

## Create a New Bottender App

**Create Bottender App** is the best way to start building a new application in Bottender.

It initializes your development environment for latest Bottender features, provides a great experience for multi-channel development, and optimizes your application for production deployment. To create a project, run:

```sh
npx create-bottender-app my-app
```

> **Note:** `npx` comes with npm 5.2+ and higher, see [npx command introduction](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

After going through the steps, you see a directory named `my-app` containing a new Bottender project with every Bottender's dependency installed:

![](https://user-images.githubusercontent.com/3382565/67745483-5667ef80-fa5f-11e9-8bae-39489b8544e7.png)
![](https://user-images.githubusercontent.com/3382565/67745485-57008600-fa5f-11e9-8fed-8d97d600a760.png)

Running the bot in [Bottender Console Mode](the-basics-console-mode.md) is the easiest way to run the bot. To run in Console Mode, provide the `--console` option to the `npm run dev` command:

```sh
cd my-app
npm run dev -- --console
```

![](https://user-images.githubusercontent.com/3382565/67745487-57991c80-fa5f-11e9-8eb7-9e4144df9e73.png)

As you can see, you get a bot that always replies with the "Welcome to Bottender" to your console.

## Teaching Your Bot to Echo

The next step is teaching your bot to send back what it receives. Let's see how the bot works before making any changes to the bot.

The `src/index.js` file is the entry point of the application created by Create Bottender App. You may find the following few lines of code in the `src/index.js` file:

```js
module.exports = async function App(context) {
  await context.sendText('Welcome to Bottender');
};
```

Whenever Bottender invokes the `App` function, the `App` function always calls `context.sendText()` to reply with the "Welcome to Bottender".

To make the bot send back what it receives, open the `src/index.js` file in your preferred code editor and apply the following changes to the code:

```diff
module.exports = async function App(context) {
- await context.sendText('Welcome to Bottender');
+ if (context.event.isText) {
+   await context.sendText(context.event.text);
+ }
});
```

After applying the changes, Bottender restarts the application automatically.

![](https://user-images.githubusercontent.com/3382565/67745488-57991c80-fa5f-11e9-91d2-659b65df2c58.png)

That's it! Now, you get a bot that can reply with what it receives to your console.

For more information about Create Bottender App, see [the README file of Create Bottender App](https://github.com/Yoctol/bottender/tree/master/packages/create-bottender-app/README.md).
