# With config-env

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-config-env
cd with-config-env
cp .env.sample .env
npm install
npm run dev
```

## Idea of this example

This example shows how to use [dotenv](https://github.com/motdotla/dotenv)
package in `bottender.config.js` to prevent from committing sensitive information into source control system.\
You have to put `ACCESS_TOKEN`, `VERIFY_TOKEN`, `APP_SECRET`, and `APP_ID` into `.env` file before running this bot.

## Related examples

- [with-config](../with-config)
- [with-dotenv](../with-dotenv)
