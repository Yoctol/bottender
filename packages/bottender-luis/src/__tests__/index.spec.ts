import nock from 'nock';
import { Context, chain } from 'bottender';
// FIXME: export public API for testing
import { run } from 'bottender/dist/bot/Bot';

import luis from '..';

// FIXME: export public test-utils for testing
class TestContext extends Context {
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

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function Unknown(context) {
  await context.sendText('Sorry, I don’t know what you say.');
}

it('should resolve corresponding action if intent score > scoreThreshold', async () => {
  const { context } = setup();

  let requestQuery;
  let requestHeaders;
  nock('https://westus.api.cognitive.microsoft.com')
    .get('/luis/v2.0/apps/APP_ID')
    .query((query) => {
      requestQuery = query;
      return true;
    })
    .reply(200, function () {
      requestHeaders = this.req.headers;
      return {
        query: 'forward to frank 30 dollars through HSBC',
        topScoringIntent: {
          intent: 'greeting',
          score: 0.3964121,
        },
        entities: [
          {
            entity: '30',
            type: 'builtin.number',
            startIndex: 17,
            endIndex: 18,
            resolution: {
              value: '30',
            },
          },
          {
            entity: 'frank',
            type: 'frank',
            startIndex: 11,
            endIndex: 15,
            score: 0.935219169,
          },
          {
            entity: '30 dollars',
            type: 'builtin.currency',
            startIndex: 17,
            endIndex: 26,
            resolution: {
              unit: 'Dollar',
              value: '30',
            },
          },
          {
            entity: 'hsbc',
            type: 'Bank',
            startIndex: 36,
            endIndex: 39,
            resolution: {
              values: ['BankeName'],
            },
          },
        ],
        sentimentAnalysis: {
          label: 'positive',
          score: 0.9163064,
        },
      };
    });

  const app = run(
    chain([
      luis({
        appId: 'APP_ID',
        appKey: 'APP_KEY',
        endpoint: 'https://westus.api.cognitive.microsoft.com',
        actions: {
          greeting: SayHello,
        },
        scoreThreshold: 0.3,
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Hello!');
  expect(context.intent).toEqual('greeting');
  expect(context.isHandled).toEqual(true);

  expect(requestHeaders['ocp-apim-subscription-key']).toEqual('APP_KEY');
  expect(requestQuery).toEqual({
    q: 'text',
    verbose: 'true',
  });
});

it('should go next if intent confidence < confidenceThreshold', async () => {
  const { context } = setup();

  nock('https://westus.api.cognitive.microsoft.com')
    .get('/luis/v2.0/apps/APP_ID')
    .query(true)
    .reply(200, {
      query: 'forward to frank 30 dollars through HSBC',
      topScoringIntent: {
        intent: 'greeting',
        score: 0.3964121,
      },
      entities: [
        {
          entity: '30',
          type: 'builtin.number',
          startIndex: 17,
          endIndex: 18,
          resolution: {
            value: '30',
          },
        },
        {
          entity: 'frank',
          type: 'frank',
          startIndex: 11,
          endIndex: 15,
          score: 0.935219169,
        },
        {
          entity: '30 dollars',
          type: 'builtin.currency',
          startIndex: 17,
          endIndex: 26,
          resolution: {
            unit: 'Dollar',
            value: '30',
          },
        },
        {
          entity: 'hsbc',
          type: 'Bank',
          startIndex: 36,
          endIndex: 39,
          resolution: {
            values: ['BankeName'],
          },
        },
      ],
      sentimentAnalysis: {
        label: 'positive',
        score: 0.9163064,
      },
    });

  const app = run(
    chain([
      luis({
        appId: 'APP_ID',
        appKey: 'APP_KEY',
        endpoint: 'https://westus.api.cognitive.microsoft.com',
        actions: {
          greeting: SayHello,
        },
        scoreThreshold: 0.4,
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Sorry, I don’t know what you say.');
  expect(context.intent).toBeNull();
  expect(context.isHandled).toEqual(false);
});

it('should support parameters of luis', async () => {
  const { context } = setup();

  let requestQuery;
  nock('https://westus.api.cognitive.microsoft.com')
    .get('/luis/v2.0/apps/APP_ID')
    .query((query) => {
      requestQuery = query;
      return true;
    })
    .reply(200, {
      query: 'forward to frank 30 dollars through HSBC',
      topScoringIntent: {
        intent: 'greeting',
        score: 0.3964121,
      },
      entities: [
        {
          entity: '30',
          type: 'builtin.number',
          startIndex: 17,
          endIndex: 18,
          resolution: {
            value: '30',
          },
        },
        {
          entity: 'frank',
          type: 'frank',
          startIndex: 11,
          endIndex: 15,
          score: 0.935219169,
        },
        {
          entity: '30 dollars',
          type: 'builtin.currency',
          startIndex: 17,
          endIndex: 26,
          resolution: {
            unit: 'Dollar',
            value: '30',
          },
        },
        {
          entity: 'hsbc',
          type: 'Bank',
          startIndex: 36,
          endIndex: 39,
          resolution: {
            values: ['BankeName'],
          },
        },
      ],
      sentimentAnalysis: {
        label: 'positive',
        score: 0.9163064,
      },
    });

  const app = run(
    chain([
      luis({
        appId: 'APP_ID',
        appKey: 'APP_KEY',
        endpoint: 'https://westus.api.cognitive.microsoft.com',
        actions: {
          greeting: SayHello,
        },
        scoreThreshold: 0.3,
        verbose: false,
        timezoneOffset: 'Asia/Taipei',
        spellCheck: true,
        staging: true,
        bingSpellCheckSubscriptionKey: 'BING_SPELL_CHECK_SUBSCRIPTION_KEY',
        log: true,
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Hello!');

  expect(requestQuery).toEqual({
    'bing-spell-check-subscription-key': 'BING_SPELL_CHECK_SUBSCRIPTION_KEY',
    log: 'true',
    q: 'text',
    spellCheck: 'true',
    staging: 'true',
    timezoneOffset: 'Asia/Taipei',
    verbose: 'false',
  });
});
