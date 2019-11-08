const axios = require('axios');

const { RESOURCE_NAME, KNOWLEDGE_BASE_ID, ENDPOINT_KEY } = process.env;

module.exports = async function App(context) {
  if (context.event.isText) {
    const { data } = await axios.post(
      `https://${RESOURCE_NAME}.azurewebsites.net/qnamaker/knowledgebases/${KNOWLEDGE_BASE_ID}/generateAnswer`,
      { question: context.event.text },
      {
        headers: {
          Authorization: `EndpointKey ${ENDPOINT_KEY}`,
        },
      }
    );

    const topAnswer = data.answers[0];

    // You can define your own score threshold here.
    if (topAnswer.score > 70) {
      await context.sendText(topAnswer.answer);
    }
  }
};
