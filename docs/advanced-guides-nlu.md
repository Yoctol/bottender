---
id: advanced-guides-nlu
title: Natural Language Understanding
---

## Leverage NLU Technologies

If you want to have more general intent recognition, you can leverage modern NLU (Natural Language Understanding) technologies. They can help you recognize the intent of user input sentences. There are several online services you can choose from, for example:

- [Dialogflow](advanced-guides-nlu.md#building-with-dialogflow)
- [QnA Maker](advanced-guides-nlu.md#building-with-qna-maker)
- [LUIS](advanced-guides-nlu.md#building-with-luis)
- [Rasa](advanced-guides-nlu.md#building-with-rasa-nlu)

## Building with Dialogflow

[Dialogflow](https://dialogflow.com/)

```js
const dialogflow = require('dialogflow');

const PROJECT_ID = 'YOUR-PROJECT_ID';

const sessionClient = new dialogflow.SessionsClient();

module.exports = async function App(context) {
  if (context.event.isText) {
    const sessionPath = sessionClient.sessionPath(
      PROJECT_ID,
      context.session.id
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: context.event.text,
          languageCode: '',
        },
      },
      queryParams: {
        timeZone: '',
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const { intent } = responses[0].queryResult;

    if (intent.displayName === 'greeting') {
      await context.sendText('Hello!');
    }
  }
};
```

https://github.com/Yoctol/bottender/tree/master/examples/with-dialogflow

## Building with QnA Maker

[QnA Maker](https://www.qnamaker.ai/)

```js
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
```

`.env`

```
RESOURCE_NAME=
KNOWLEDGE_BASE_ID=
ENDPOINT_KEY=
```

https://github.com/Yoctol/bottender/tree/master/examples/with-qna-maker

## Building with LUIS

[LUIS (Language Understanding Intelligent Service)](https://luis.ai/)

```js
const axios = require('axios');

module.exports = async function App(context) {
  if (context.event.isText) {
    const { data } = await axios.post(``, {});
  }
};
```

https://github.com/Yoctol/bottender/tree/master/examples/with-luis

## Building with Rasa NLU

[Rasa NLU](https://rasa.com/docs/rasa/nlu/about/)

```sh
rasa run --enable-api -m models/nlu-20190515-144445.tar.gz
```

```js
const axios = require('axios');

module.exports = async function App(context) {
  if (context.event.isText) {
    const { data } = await axios.post(`http://localhost:5005/model/parse`, {
      text: context.event.text,
    });

    // You can define your own score threshold here.
    if (intent.confidence > 0.7) {
      if (intent.name === 'greeting') {
        await context.sendText('Hello!');
      }
    }
  }
};
```

https://github.com/Yoctol/bottender/tree/master/examples/with-rasa
