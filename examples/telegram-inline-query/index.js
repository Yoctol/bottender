const { router, telegram } = require('bottender/router');

const inlineQueryResultArticle = {
  type: 'article',
  id: 'article1',
  title: 'article',
  input_message_content: {
    message_text: 'article_content',
  },
};

const inlineQueryResultPhoto = {
  type: 'photo',
  id: 'photo1',
  photo_url: 'https://picsum.photos/200',
  thumb_url: 'https://picsum.photos/200',
};

async function DefaultAction(context) {
  console.log(context.event.rawEvent);
  await context.sendText('Please mention me to send inline query to me.');
}

async function AnswerInlineQuery(context) {
  const { query } = context.event.inlineQuery;
  await context.sendText(`You are trying to query ${query}.`);
  await context.answerInlineQuery(
    [inlineQueryResultArticle, inlineQueryResultPhoto],
    {
      cacheTime: 0,
    }
  );
}

async function CollectFeedback(context) {
  const { query, resultId } = context.event.chosenInlineResult;
  await context.sendText(
    `Your query is ${query} and the result you picked is ${resultId}.`
  );
}

module.exports = async function App(context) {
  return router([
    telegram.inlineQuery(AnswerInlineQuery),
    telegram.chosenInlineResult(CollectFeedback),
    telegram.any(DefaultAction),
  ]);
};
