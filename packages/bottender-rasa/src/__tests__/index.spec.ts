import nock from 'nock';
import { Context, chain } from 'bottender';
// FIXME: export public API for testing
import { run } from 'bottender/dist/bot/Bot';

import rasa from '..';

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

it('should resolve corresponding action if intent confidence > confidenceThreshold', async () => {
  const { context } = setup();

  let requestBody;
  nock('http://localhost:5005')
    .post('/model/parse')
    .reply(200, (uri, body) => {
      requestBody = body;
      return {
        entities: [
          {
            start: 0,
            end: 0,
            value: 'string',
            entity: 'string',
            confidence: 0,
          },
        ],
        intent: {
          confidence: 0.6323,
          name: 'greeting',
        },
        intent_ranking: [
          {
            confidence: 0.6323,
            name: 'greeting',
          },
        ],
        text: 'Hello!',
      };
    });

  const app = run(
    chain([
      rasa({
        origin: 'http://localhost:5005',
        actions: {
          greeting: SayHello,
        },
        confidenceThreshold: 0.6,
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Hello!');
  expect(context.intent).toEqual('greeting');
  expect(context.isHandled).toEqual(true);

  expect(requestBody).toEqual({
    text: 'text',
    message_id: '1',
  });
});

it('should go next if intent confidence < confidenceThreshold', async () => {
  const { context } = setup();

  nock('http://localhost:5005')
    .post('/model/parse')
    .reply(200, {
      entities: [
        {
          start: 0,
          end: 0,
          value: 'string',
          entity: 'string',
          confidence: 0,
        },
      ],
      intent: {
        confidence: 0.6323,
        name: 'greeting',
      },
      intent_ranking: [
        {
          confidence: 0.6323,
          name: 'greeting',
        },
      ],
      text: 'Hello!',
    });

  const app = run(
    chain([
      rasa({
        origin: 'http://localhost:5005',
        actions: {
          greeting: SayHello,
        },
        confidenceThreshold: 0.7,
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Sorry, I don’t know what you say.');
  expect(context.intent).toBeNull();
  expect(context.isHandled).toEqual(false);
});

it('should support JWT', async () => {
  const { context } = setup();

  let requestHeaders;
  nock('http://localhost:5005')
    .post('/model/parse')
    .reply(200, function() {
      requestHeaders = this.req.headers;
      return {
        entities: [
          {
            start: 0,
            end: 0,
            value: 'string',
            entity: 'string',
            confidence: 0,
          },
        ],
        intent: {
          confidence: 0.6323,
          name: 'greeting',
        },
        intent_ranking: [
          {
            confidence: 0.6323,
            name: 'greeting',
          },
        ],
        text: 'Hello!',
      };
    });

  const app = run(
    chain([
      rasa({
        origin: 'http://localhost:5005',
        actions: {
          greeting: SayHello,
        },
        confidenceThreshold: 0.6,
        jwt: 'JWT',
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Hello!');

  expect(requestHeaders.authorization).toEqual('bearer JWT');
});

it('should support parameters of rasa', async () => {
  const { context } = setup();

  let requestQuery;
  nock('http://localhost:5005')
    .post('/model/parse')
    .query(query => {
      requestQuery = query;
      return true;
    })
    .reply(200, {
      entities: [
        {
          start: 0,
          end: 0,
          value: 'string',
          entity: 'string',
          confidence: 0,
        },
      ],
      intent: {
        confidence: 0.6323,
        name: 'greeting',
      },
      intent_ranking: [
        {
          confidence: 0.6323,
          name: 'greeting',
        },
      ],
      text: 'Hello!',
    });

  const app = run(
    chain([
      rasa({
        origin: 'http://localhost:5005',
        actions: {
          greeting: SayHello,
        },
        confidenceThreshold: 0.6,
        emulationMode: 'WIT',
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Hello!');

  expect(requestQuery).toEqual({
    emulation_mode: 'WIT',
  });
});
