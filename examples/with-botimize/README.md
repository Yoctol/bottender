# With Botimize

## Install and Run

Download this example or clone [Bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-botimize
cd with-botimize
npm install
npm run dev
```

## Idea of this example

This example shows how to combine your bot with **bot analytics tool**. In this case, we take [Botimize](https://www.getbotimize.com/) as an example.  

The following code is the main part of this example which demonstrates the way to connect your bot with [Botimize](https://www.getbotimize.com/). Furthermore, You have better check [middleware guide](https://bottender.js.org/docs/Guides-Middleware) if you don't understand what is middleware.

```js
const server = createServer(bot, {
  verifyToken: '__FILL_YOUR_VERIFY_TOKEN_HERE__',
  webhookMiddleware: botimizeMiddleware(bot, {
    apiKey: '__FILL_YOUR_BOTIMIZE_KEY_HERE__',
    platform: 'facebook',
  }),
});
```


## Related examples

- [middleware](../middleware)
- [with-express](../with-express)
- [messenger-hello-world](../messenger-hello-world)
