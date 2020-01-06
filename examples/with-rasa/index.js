const { chain } = require('bottender');

// FIXME: use @bottender/rasa package
const rasa = require('../../packages/bottender-rasa');

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
