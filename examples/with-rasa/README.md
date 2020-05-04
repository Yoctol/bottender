# With Rasa

## Install and Run

Download this example or clone [Bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-rasa
cd with-rasa
npm install
```

Before you run this example, make sure you have start the Rasa server locally on port 5005 with your NLU model following [The official Guide](https://rasa.com/docs/rasa/nlu/using-nlu-only/).

```sh
npm run dev -- --console
```

## Idea of This Example

This example shows how to combine your bot with [Rasa NLU](https://rasa.com/docs/rasa/nlu/about/).
