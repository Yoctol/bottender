# Cross Platform

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/cross-platform
cd cross-platform
```

Install dependencies:

```
npm install
```

You must put all needed information into `bottender.config.js`.

After that, you can run the bot with this npm script:

```
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

## Set webhook

You must set webhooks correspond to mounted paths properly:

```
<YOUR_BASE_URL>/messenger
<YOUR_BASE_URL>/line
<YOUR_BASE_URL>/slack
<YOUR_BASE_URL>/telegram
<YOUR_BASE_URL>/viber
```

> Note: See related examples to know how to set webhook on each platform

If you want to expose the server on your local development machine and get a secure URL, [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.github.io/www/) may be good tools for you.

## Idea of this example

This example shows the basic idea of building a cross-platform bot. The best
feature of this example is that you can only develop one handler for five
different bots, instead of developing one handler for each platform.

## Related examples

- [messenger-hello-world](../messenger-hello-world)
- [line-hello-world](../line-hello-world)
- [slack-hello-world](../slack-hello-world)
- [telegram-hello-world](../telegram-hello-world)
- [viber-hello-world](../viber-hello-world)
