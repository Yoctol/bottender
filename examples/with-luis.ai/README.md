# With LUIS.ai

## Install and Run

Download this example or clone [Bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-luis.ai
cd with-luis.ai
npm install
```

Before you run this example, make sure you have got `LUIS_APP_ID`, `LUIS_APP_KEY`, and `LUIS_APP_ENDPOINT` from [LUIS.ai](https://www.luis.ai/) and filled in your `.env` file.

```sh
npm run dev -- --console
```

## Idea of This Example

This example shows how to combine your bot with **semantic analysis tool**. In this case, we take [LUIS.ai](https://www.luis.ai/) as an example.
