const { chain } = require('bottender');
const qnaMaker = require('@bottender/qna-maker');

const { RESOURCE_NAME, KNOWLEDGE_BASE_ID, ENDPOINT_KEY } = process.env;

async function Unknown(context) {
  await context.sendText('Sorry, I don’t know what you say.');
}

const QnaMaker = qnaMaker({
  resourceName: RESOURCE_NAME,
  knowledgeBaseId: KNOWLEDGE_BASE_ID,
  endpointKey: ENDPOINT_KEY,
  scoreThreshold: 70,
});

module.exports = async function App() {
  return chain([
    QnaMaker, //
    Unknown,
  ]);
};
