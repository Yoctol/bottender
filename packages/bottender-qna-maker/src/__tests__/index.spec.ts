import nock from 'nock';
import { Context, chain } from 'bottender';
// FIXME: export public API for testing
import { run } from 'bottender/dist/bot/Bot';

const qnaMaker = require('..'); // eslint-disable-line @typescript-eslint/no-var-requires

// FIXME: export public test-utils for testing
class TestContext extends Context<any, any> {
  get platform() {
    return 'test';
  }

  sendText = jest.fn();
}

function setup({
  event = {
    isMessage: true,
    isText: true,
    text: 'text',
    message: {
      id: '1',
      text: 'text',
    },
    rawEvent: {
      message: {
        id: '1',
        text: 'text',
      },
    },
  },
} = {}) {
  const context = new TestContext({
    client: {},
    event,
    session: {
      id: 'test:1',
      user: {
        id: '1',
      },
    },
  });

  return {
    context,
  };
}

async function Unknown(context) {
  await context.sendText('Sorry, I don’t know what you say.');
}

it('should reply with answer if id of answer is not -1', async () => {
  const { context } = setup();

  let requestBody;
  nock('https://RESOURCE_NAME.azurewebsites.net')
    .post('/qnamaker/knowledgebases/KNOWLEDGE_BASE_ID/generateAnswer')
    .reply(200, (uri, body) => {
      requestBody = body;
      return {
        answers: [
          {
            score: 51,
            id: 20,
            answer:
              'There is no direct integration of LUIS with QnA Maker. But, in your bot code, you can use LUIS and QnA Maker together. [View a sample bot](https://github.com/Microsoft/BotBuilder-CognitiveServices/tree/master/Node/samples/QnAMaker/QnAWithLUIS)',
            source: 'Custom Editorial',
            questions: ['How can I integrate LUIS with QnA Maker?'],
            metadata: [
              {
                name: 'category',
                value: 'api',
              },
            ],
          },
        ],
      };
    });

  const app = run(
    chain([
      qnaMaker({
        resourceName: 'RESOURCE_NAME',
        knowledgeBaseId: 'KNOWLEDGE_BASE_ID',
        endpointKey: 'ENDPOINT_KEY',
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith(
    'There is no direct integration of LUIS with QnA Maker. But, in your bot code, you can use LUIS and QnA Maker together. [View a sample bot](https://github.com/Microsoft/BotBuilder-CognitiveServices/tree/master/Node/samples/QnAMaker/QnAWithLUIS)'
  );

  expect(requestBody).toEqual({
    question: 'text',
    scoreThreshold: 50,
    top: 1,
    userId: '1',
  });
});

it('should go next if id of answer is -1', async () => {
  const { context } = setup();

  nock('https://RESOURCE_NAME.azurewebsites.net')
    .post('/qnamaker/knowledgebases/KNOWLEDGE_BASE_ID/generateAnswer')
    .reply(200, {
      answers: [
        {
          questions: [],
          answer: 'No good match found in KB.',
          score: 0,
          id: -1,
          source: null,
          metadata: [],
        },
      ],
    });

  const app = run(
    chain([
      qnaMaker({
        resourceName: 'RESOURCE_NAME',
        knowledgeBaseId: 'KNOWLEDGE_BASE_ID',
        endpointKey: 'ENDPOINT_KEY',
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Sorry, I don’t know what you say.');
});

it('should reply unknown answer from qna maker if id of answer is -1 and no next in chain', async () => {
  const { context } = setup();

  nock('https://RESOURCE_NAME.azurewebsites.net')
    .post('/qnamaker/knowledgebases/KNOWLEDGE_BASE_ID/generateAnswer')
    .reply(200, {
      answers: [
        {
          questions: [],
          answer: 'No good match found in KB.',
          score: 0,
          id: -1,
          source: null,
          metadata: [],
        },
      ],
    });

  const app = run(
    chain([
      qnaMaker({
        resourceName: 'RESOURCE_NAME',
        knowledgeBaseId: 'KNOWLEDGE_BASE_ID',
        endpointKey: 'ENDPOINT_KEY',
      }),
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('No good match found in KB.');
});

it('should go next when receiving a non-text event', async () => {
  const { context } = setup({
    event: {
      isMessage: false,
      isText: false,
      rawEvent: {},
    },
  });

  const app = run(
    chain([
      qnaMaker({
        resourceName: 'RESOURCE_NAME',
        knowledgeBaseId: 'KNOWLEDGE_BASE_ID',
        endpointKey: 'ENDPOINT_KEY',
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Sorry, I don’t know what you say.');
});

it('should support parameters of qna maker', async () => {
  const { context } = setup();

  let requestBody;
  nock('https://RESOURCE_NAME.azurewebsites.net')
    .post('/qnamaker/knowledgebases/KNOWLEDGE_BASE_ID/generateAnswer')
    .reply(200, (uri, body) => {
      requestBody = body;
      return {
        answers: [
          {
            score: 51,
            id: 20,
            answer:
              'There is no direct integration of LUIS with QnA Maker. But, in your bot code, you can use LUIS and QnA Maker together. [View a sample bot](https://github.com/Microsoft/BotBuilder-CognitiveServices/tree/master/Node/samples/QnAMaker/QnAWithLUIS)',
            source: 'Custom Editorial',
            questions: ['How can I integrate LUIS with QnA Maker?'],
            metadata: [
              {
                name: 'category',
                value: 'api',
              },
            ],
          },
        ],
      };
    });

  const app = run(
    chain([
      qnaMaker({
        resourceName: 'RESOURCE_NAME',
        knowledgeBaseId: 'KNOWLEDGE_BASE_ID',
        endpointKey: 'ENDPOINT_KEY',
        isTest: true,
        qnaId: 20,
        scoreThreshold: 70,
        strictFilters: [
          {
            name: 'category',
            value: 'api',
          },
        ],
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith(
    'There is no direct integration of LUIS with QnA Maker. But, in your bot code, you can use LUIS and QnA Maker together. [View a sample bot](https://github.com/Microsoft/BotBuilder-CognitiveServices/tree/master/Node/samples/QnAMaker/QnAWithLUIS)'
  );

  expect(requestBody).toEqual({
    isTest: true,
    qnaId: 20,
    question: 'text',
    scoreThreshold: 70,
    strictFilters: [
      {
        name: 'category',
        value: 'api',
      },
    ],
    top: 1,
    userId: '1',
  });
});
