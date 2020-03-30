# With Rasa

## Install and Run

Download this example or clone [Bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-rasa
cd with-rasa
npm install
npm run dev -- --console
```

## Idea of This Example

This example shows how to combine your bot with [Rasa NLU](https://rasa.com/docs/rasa/nlu/about/). Before you run this example, make sure you have start the Rasa Server locally on port 5005 with your NLU model following [The official Guide](https://rasa.com/docs/rasa/nlu/using-nlu-only/).
