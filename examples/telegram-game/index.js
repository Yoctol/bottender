const { router, telegram, text, route } = require('bottender/router');

const { createSession } = require('./gameSession');

async function DefaultAction(context) {
  await context.sendText('please type /game to create a new demo game.');
}

async function SendGame(context) {
  await context.sendGame(process.env.GAME_NAME);
}

async function HandleCallbackQuery(context) {
  const callbackQuery = context.event.callbackQuery;
  const callbackQueryId = callbackQuery.id;
  const userId = callbackQuery.from.id;
  const messageId = callbackQuery.message.messageId;
  const chatId = callbackQuery.message.chat.id;
  const key = createSession({
    userId,
    messageId,
    chatId,
  });
  await context.client.answerCallbackQuery(callbackQueryId, {
    url: `${process.env.ROOT_PATH}/game?key=${key}`,
  });
}

module.exports = async function App(context) {
  return router([
    text(/\/game/, SendGame),
    telegram.callbackQuery(HandleCallbackQuery),
    telegram.any(DefaultAction),
  ]);
};
