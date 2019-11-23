const axios = require('axios');

const { LUIS_APP_KEY, LUIS_APP_ENDPOINT, LUIS_APP_ID } = process.env;

module.exports = async function App(context) {
  if (context.event.isText) {
    const queryParams = {
      verbose: true,
      q: context.event.text,
      'subscription-key': LUIS_APP_KEY,
    };

    const { data } = await axios.get(
      `${LUIS_APP_ENDPOINT}luis/v2.0/apps/${LUIS_APP_ID}`,
      {
        params: queryParams,
      }
    );

    const { topScoringIntent } = data;

    if (topScoringIntent.intent === 'greeting') {
      await context.sendText('Hello!');
    }
  }
};
