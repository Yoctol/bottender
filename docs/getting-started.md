---
id: getting-started
title: Getting Started
---

## Create a New Bottender App

Create Bottender App is the best way to start building a new application in Bottender.

It sets up your development environment so that you can use the latest Bottender features, provides a great experience when developing on multiple channels, and optimizes your app for deploying to production. To create a project, run:

```sh
npx create-bottender-app my-app
```

> Note: `npx` comes with npm 5.2+ and higher, see [introduction blog post for npx command](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

After you go through the interactive creation steps by steps, it will create a directory named `my-app` containing a fresh Bottender installation with all of Bottender's dependencies already installed:

![](https://user-images.githubusercontent.com/3382565/67745483-5667ef80-fa5f-11e9-8bae-39489b8544e7.png)
![](https://user-images.githubusercontent.com/3382565/67745485-57008600-fa5f-11e9-8fed-8d97d600a760.png)

The easiest way to test it is running the bot in ["Console Mode"](the-basics-console-mode.md). To do this, pass `--console` option to the command:

```sh
cd my-app
npm run dev -- --console
```

![](https://user-images.githubusercontent.com/3382565/67745487-57991c80-fa5f-11e9-8eb7-9e4144df9e73.png)

As you can see, we just got a bot that always replies "Welcome to Bottender" in the console.

## Teach Your Bot to Echo

What we did in the previous section is just a "Hello World" example. Let's see how it works and try to make some changes to it.

`src/index.js` is the entry point of the app created by Create Bottender App. There are only few lines of code in this file:

```js
module.exports = async function App(context) {
  await context.sendText('Welcome to Bottender');
};
```

It's very intuitive that it just sends back "Welcome to Bottender" whenever it is called.

The next step is teaching your bot to send back what it receives, so let's open the `src/index.js` file on the editor and apply following changes to the code:

```diff
module.exports = async function App(context) {
- await context.sendText('Welcome to Bottender');
+ if (context.event.isText) {
+   await context.sendText(context.event.text);
+ }
});
```

And the application will be restarted automatically.

![](https://user-images.githubusercontent.com/3382565/67745488-57991c80-fa5f-11e9-91d2-659b65df2c58.png)

That's it!

You can learn more about Create Bottender App [from its README](https://github.com/Yoctol/bottender/tree/master/packages/create-bottender-app/README.md).
