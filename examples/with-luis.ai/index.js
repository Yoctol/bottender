const { chain } = require('bottender');
const luis = require('@bottender/luis');

const { LUIS_APP_KEY, LUIS_APP_ENDPOINT, LUIS_APP_ID } = process.env;

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function Unknown(context) {
  await context.sendText('Sorry, I don’t know what you say.');
}

const Luis = luis({
  appId: LUIS_APP_ID,
  appKey: LUIS_APP_KEY,
  endpoint: LUIS_APP_ENDPOINT,
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
