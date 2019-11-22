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

To build a bot integrated with [Dialogflow](https://dialogflow.com/), you have to setup Dialogflow following the [Official Setup Guide](https://cloud.google.com/dialogflow/docs/quick/setup) and fill the two values: `GOOGLE_APPLICATION_CREDENTIALS` (the file path of the JSON file that contains your service account key) and `GOOGLE_APPLICATION_PROJECT_ID` (the GCP project ID) into the `.env` file.

`.env`

```
GOOGLE_APPLICATION_CREDENTIALS=
GOOGLE_APPLICATION_PROJECT_ID=
```

Next, you can build an agent following the [official document](https://cloud.google.com/dialogflow/docs/quick/build-agent). In this example, we build an agent and create a simple intent with display name `greeting`. You can set your own training phrases on the Dialogflow console for this intent.

After you finish the settings of the agent, you can then call Dialogflow's API to detect the intention of the message the bot receives. We use [Dialogflow Node SDK](https://github.com/googleapis/nodejs-dialogflow) to integrate our bot with Dialogflow.

```js
const dialogflow = require('dialogflow');

const PROJECT_ID = process.env.GOOGLE_APPLICATION_PROJECT_ID;

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
          languageCode: 'en',
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

You can check out the full example [Here](https://github.com/Yoctol/bottender/tree/master/examples/with-dialogflow).

For more information about how to use Dialogflow with Node.js, you can check [Dialogflow: Node.js Client Document](https://googleapis.dev/nodejs/dialogflow/latest/index.html).

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
