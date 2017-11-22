# With Ngrok

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-ngrok
cd with-ngrok
npm install
npm run dev
```

## Idea of this example

When you are developing bot, it is very convenient to expose your local server
and get a webhook url by using
[ngrok](https://github.com/inconshreveable/ngrok). This example shows that you
just add an optional object `{ ngrok: true }` to `createServer`. Then Bottender
will start using [ngrok](https://github.com/inconshreveable/ngrok) to serve your
server and log webhook url on terminal automatically. By this way, you no longer
to worry about finding a public url for your server.

## Related examples

* [server-express](../server-express)
* [server-koa](../server-koa)
* [server-restify](../server-restify)
* [messenger-hello-world](../messenger-hello-world)
