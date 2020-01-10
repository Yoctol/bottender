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
