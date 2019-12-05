---
id: version-1.0.0-advanced-guides-nlu
title: Natural Language Understanding
original_id: advanced-guides-nlu
---

## Leverage NLU Technologies

If you want to have more general intent recognition, you can leverage modern NLU (Natural Language Understanding) technologies. They can help you recognize the intent of user input sentences. There are several online services you can choose from, for example:

- [Dialogflow](advanced-guides-nlu.md#building-with-dialogflow)
- [QnA Maker](advanced-guides-nlu.md#building-with-qna-maker)
- [LUIS](advanced-guides-nlu.md#building-with-luis)
- [Rasa](advanced-guides-nlu.md#building-with-rasa-nlu)

## Building with Dialogflow

To build a bot integrated with [Dialogflow](https://dialogflow.com/), you have to setup Dialogflow following the [Official Setup Guide](https://cloud.google.com/dialogflow/docs/quick/setup) and fill the two values: `GOOGLE_APPLICATION_CREDENTIALS` (the file path of the JSON file that contains your service account key) and `GOOGLE_APPLICATION_PROJECT_ID` (the GCP project ID) into the `.env` file.

```
# .env
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

To build a bot integrated with [QnA Maker](https://www.qnamaker.ai/), you have to create the QnA Maker knowledge base and publish it following the [Official Guide](https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/create-publish-knowledge-base).

After you publish your knowledge base, you will get `RESOURCE_NAME`, `KNOWLEDGE_BASE_ID`, and `ENDPOINT_KEY` (See [Here](https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/get-answer-from-knowledge-base-using-url-tool?pivots=url-test-tool-postman) for detailed guide). Make sure you copy them into the `.env` file.

```
# .env
RESOURCE_NAME=
KNOWLEDGE_BASE_ID=
ENDPOINT_KEY=
```

Next, we can get the answer by calling the API endpoint. In the example, we use `axios` as our HTTP client. For other Node HTTP clients like `request-promise`, you can see this [document](https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/get-answer-from-knowledge-base-nodejs). The returned response will contain an array with possible QA pairs and corresponding scores. You can define your own score threshold in the code.

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

You can check out the full example [Here](https://github.com/Yoctol/bottender/tree/master/examples/with-qna-maker).

## Building with LUIS

To build a bot integrated with [LUIS (Language Understanding Intelligent Service)](https://luis.ai/), you have to create a new app in the LUIS portal following the [Official Setup Guide](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/get-started-portal-build-app) and fill the three values: `LUIS_APP_ID`, `LUIS_APP_KEY`, and `LUIS_APP_ENDPOINT` into the `.env` file.

```
# .env
LUIS_APP_ID=
LUIS_APP_KEY=
LUIS_APP_ENDPOINT=
```

Next, you can add a simple intent. In this example, we create a simple intent with the intent name `greeting`. You can set your own training phrases on the LUIS console for this intent. And then you have to train the model and publish it.

After publishing successfully, you can call LUIS's API to detect the intention of the message the bot receives. In this example, we use `axios` as our HTTP client to call the API.

```js
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
```

You can check out the full example [Here](https://github.com/Yoctol/bottender/tree/master/examples/with-luis.ai).

## Building with Rasa NLU

To build a bot integrated with [Rasa NLU](https://rasa.com/docs/rasa/nlu/about/), you have to install Rasa first following the [Official Installation Guide](https://rasa.com/docs/rasa/user-guide/installation/). Next, you can train your NLU model by running:

```sh
rasa train nlu
```

This command will look for the training data files in the data/ directory and saves the model in the models/ directory. For information about how to generate training data, you can see [here](https://rasa.com/docs/rasa/nlu/training-data-format/).

After you get your NLU model ready, you can run the following command:

```sh
rasa run --enable-api -m models/nlu-your-model-id.tar.gz
```

This will start a server with your NLU model locally on port 5005. Next, you can request predictions from your model by calling the `/model/parse` endpoint. You can see [here](https://rasa.com/docs/rasa/api/http-api/#operation/parseModelMessage) for the document of this API.

In this example, we use `axios` as our HTTP client. The returned response will contain an intent with its corresponding confidence. You can define your own confidence threshold in the code.

```js
const axios = require('axios');

module.exports = async function App(context) {
  if (context.event.isText) {
    const { data } = await axios.post(`http://localhost:5005/model/parse`, {
      text: context.event.text,
    });

    const { intent } = data;

    // You can define your own confidence threshold here.
    if (intent.confidence > 0.7) {
      if (intent.name === 'greeting') {
        await context.sendText('Hello!');
      }
    }
  }
};
```

You can check out the full example [Here](https://github.com/Yoctol/bottender/tree/master/examples/with-rasa).
