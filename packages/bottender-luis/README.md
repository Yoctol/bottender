# @bottender/luis

[LUIS](https://www.luis.ai/) integration for Bottender.

## Installation

You can install it with npm:

```sh
npm install @bottender/luis
```

or Yarn:

```sh
yarn add @bottender/luis
```

## Usage

```js
const { chain } = require('bottender');
const luis = require('@bottender/luis');

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function Unknown(context) {
  await context.sendText('Sorry, I don’t know what you say.');
}

const Luis = luis({
  appId: 'LUIS_APP_ID',
  appKey: 'LUIS_APP_KEY',
  endpoint: 'https://westus.api.cognitive.microsoft.com',
  actions: {
    greeting: SayHello,
  },
  scoreThreshold: 0.7,
});

module.exports = async function App() {
  return chain([
    Luis, //
    Unknown,
  ]);
};
```

## Reference

### appId

The LUIS application ID (Guid).

Type: `string`.
Required.

### appKey

The LUIS application key.

Type: `string`.
Required.

### endpoint

Supported Cognitive Services endpoints (protocol and hostname, for example: https://westus.api.cognitive.microsoft.com).

Type: `string`.
Required.

### actions

Actions to be executed when the event matches corresponding intent.

Type: `Record<string, Action>`.
Required.

### scoreThreshold

Threshold of the answer score. The action only be executed when score is over this threshold.

Type: `number`.
Required.

### verbose

If true, return all intents instead of just the top scoring intent.

Type: `boolean`.
Optional.

### timezoneOffset

The timezone offset for the location of the request.

Type: `number`.
Optional.

### staging

Use the staging endpoint slot.

Type: `boolean`.
Optional.

### spellCheck

Enable spell checking.

Type: `boolean`.
Optional.

### bingSpellCheckSubscriptionKey

The subscription key to use when enabling Bing spell check.

Type: `string`.
Optional.

### log

Log query (default is true).

Type: `boolean`.
Optional.

## License

MIT © [Yoctol](https://github.com/Yoctol/bottender)
