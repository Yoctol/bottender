# With dotenv

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-dotenv
cd with-dotenv
cp .env.sample .env
npm install
npm run dev
```

## Idea of this example

This example shows how to use [dotenv](https://github.com/motdotla/dotenv)
package to prevent from committing sensitive information into source control
system. You have to get `accessToken` and `appSecret` into `.env` file before
running this bot.

## Related examples

* [messenger-hello-world](../messenger-hello-world)
