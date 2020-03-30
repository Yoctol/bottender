# @bottender/rasa

[Rasa NLU](https://rasa.com/docs/rasa/nlu/about/) integration for Bottender.

## Installation

You can install it with npm:

```sh
npm install @bottender/rasa
```

or Yarn:

```sh
yarn add @bottender/rasa
```

## Usage

```js
const { chain } = require('bottender');
const rasa = require('@bottender/rasa');

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function Unknown(context) {
  await context.sendText('Sorry, I don’t know what you say.');
}

const Rasa = rasa({
  origin: 'http://localhost:5005',
  actions: {
    greeting: SayHello,
  },
  confidenceThreshold: 0.7,
});

module.exports = async function App() {
  return chain([
    Rasa, //
    Unknown,
  ]);
};
```

## Reference

### origin

The origin of the Rasa NLU server.

Type: `string`.
Required.

### actions

Actions to be executed when the event matches corresponding intent.

Type: `Record<string, Action>`.
Required.

### confidenceThreshold

Threshold of the answer confidence. The action only be executed when confidence is over this threshold.

Type: `number`.
Required.

### emulationMode,

The emulation mode to use in the request.

Type: `'WIT' | 'LUIS' | 'DIALOGFLOW'`.
Optional.

### jwt

The JSON Web Token (JWT) to use in the request.

Type: `string`.
Optional.

## License

MIT © [Yoctol](https://github.com/Yoctol/bottender)
