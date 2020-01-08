# With LUIS.ai

## Install and Run

Download this example or clone [Bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-luis.ai
cd with-luis.ai
npm install
npm run dev -- --console
```

## Idea of this Example

This example shows how to combine your bot with **semantic analysis tool**. In
this case, we take [LUIS.ai](https://www.luis.ai/) as an example. Before you run
this example, make sure you have got `appId`, `appKey` and `Endpoint Url` from
[LUIS.ai](https://www.luis.ai/) and filled in `.env` file.
