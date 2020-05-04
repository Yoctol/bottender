const { router, telegram, text } = require('bottender/router');

async function DefaultAction(context) {
  await context.sendText('Please type "show keyboard" to show the keyboard.');
}

async function ShowKeyboard(context) {
  const replyMarkup = {
    keyboard: [
      [
        {
          text: '🍔',
        },
        {
          text: '🍕',
        },
      ],
      [
        {
          text: '🌮',
        },
        {
          text: '🍱',
        },
      ],
    ],
    oneTimeKeyboard: true,
  };
  await context.sendText('Which one is your favorite food?', { replyMarkup });
}

async function AnswerKeyboard(context) {
  const replyMarkup = {
    removeKeyboard: true,
  };
  await context.sendText(`Your favorite food is ${context.event.text}.`, {
    replyMarkup,
  });
}

module.exports = async function App(context) {
  return router([
    text('show keyboard', ShowKeyboard),
    text(/[🍔🍕🌮🍱]/u, AnswerKeyboard),
    telegram.any(DefaultAction),
  ]);
};
