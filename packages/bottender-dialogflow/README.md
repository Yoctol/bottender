# @bottender/dialogflow

[Dialogflow](https://dialogflow.com/) integration for Bottender.

## Installation

You can install it with npm:

```sh
npm install @bottender/dialogflow
```

or Yarn:

```sh
yarn add @bottender/dialogflow
```

## Usage

```js
const { chain } = require('bottender');
const dialogflow = require('@bottender/dialogflow');

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function Unknown(context) {
  await context.sendText('Sorry, I don’t know what you say.');
}

const Dialogflow = dialogflow({
  projectId: process.env.GOOGLE_APPLICATION_PROJECT_ID,
  actions: {
    greeting: SayHello,
  },
});

module.exports = async function App() {
  return chain([
    Dialogflow, //
    Unknown,
  ]);
};
```

## Reference

### projectId

The ID of your Dialogflow Project.

Type: `string`.
Required.

### languageCode

The language of this conversational query. See [Language Support](https://cloud.google.com/dialogflow/docs/reference/language) for a list of the currently supported language codes. Note that queries in the same session do not necessarily need to specify the same language.

Type: `string`.
Required.

### actions

Actions to be executed when the event matches corresponding intent.

Type: `Record<string, Action>`.
Required.

### timeZone

The time zone of this conversational query from the time zone database, e.g., America/New_York, Europe/Paris. If not provided, the time zone specified in agent settings is used.

Type: `string`.
Optional.

## License

MIT © [Yoctol](https://github.com/Yoctol/bottender)
