import dialogflowSdk from 'dialogflow';
import { Context, chain } from 'bottender';
// FIXME: export public API for testing
import { run } from 'bottender/dist/bot/Bot';

process.env.GOOGLE_APPLICATION_CREDENTIALS = 'test';

const dialogflow = require('..'); // eslint-disable-line @typescript-eslint/no-var-requires

jest.mock('dialogflow');

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

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function Unknown(context) {
  await context.sendText('Sorry, I don’t know what you say.');
}

it('should resolve corresponding action if intent match name', async () => {
  const { context } = setup();

  const sessionPath = {};
  let sessionClient;

  dialogflowSdk.SessionsClient.mockImplementationOnce(() => {
    sessionClient = {
      sessionPath: jest.fn().mockReturnValue(sessionPath),
      detectIntent: jest.fn().mockResolvedValue([
        {
          queryResult: {
            queryText: 'text',
            languageCode: 'en',
            intent: {
              name: 'projects/PROJECT_ID/agent/intents/INTENT_ID',
              displayName: 'greeting',
              isFallback: false,
            },
            parameters: {},
          },
        },
      ]),
    };

    return sessionClient;
  });

  const app = run(
    chain([
      dialogflow({
        projectId: 'PROJECT_ID',
        actions: {
          greeting: SayHello,
        },
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Hello!');
  expect(context.intent).toEqual('greeting');
  expect(context.isHandled).toEqual(true);

  expect(sessionClient.sessionPath).toBeCalledWith('PROJECT_ID', 'test:1');
  expect(sessionClient.detectIntent).toBeCalledWith({
    session: sessionPath,
    queryInput: {
      text: {
        languageCode: 'en',
        text: 'text',
      },
    },
    queryParams: { timeZone: undefined },
  });
});

it('should resolve corresponding action if intent match id', async () => {
  const { context } = setup();

  const sessionPath = {};
  let sessionClient;

  dialogflowSdk.SessionsClient.mockImplementationOnce(() => {
    sessionClient = {
      sessionPath: jest.fn().mockReturnValue(sessionPath),
      detectIntent: jest.fn().mockResolvedValue([
        {
          responseId: 'cb8e7a38-910a-4386-b312-eac8660d66f7-b4ef8d5f',
          queryResult: {
            fulfillmentMessages: [
              {
                platform: 'PLATFORM_UNSPECIFIED',
                text: {
                  text: ['?'],
                },
                message: 'text',
              },
            ],
            outputContexts: [
              {
                name:
                  'projects/PROJECT_ID/agent/sessions/console:1/contexts/__system_counters__',
                lifespanCount: 1,
                parameters: {
                  fields: {
                    'no-match': {
                      numberValue: 5,
                      kind: 'numberValue',
                    },
                    'no-input': {
                      numberValue: 0,
                      kind: 'numberValue',
                    },
                  },
                },
              },
            ],
            queryText: 'hi',
            speechRecognitionConfidence: 0,
            action: 'input.unknown',
            parameters: {
              fields: {},
            },
            allRequiredParamsPresent: true,
            fulfillmentText: '?',
            webhookSource: '',
            webhookPayload: null,
            intent: {
              inputContextNames: [],
              events: [],
              trainingPhrases: [],
              outputContexts: [],
              parameters: [],
              messages: [],
              defaultResponsePlatforms: [],
              followupIntentInfo: [],
              name: 'projects/PROJECT_ID/agent/intents/INTENT_ID',
              displayName: 'greeting',
              priority: 0,
              isFallback: true,
              webhookState: 'WEBHOOK_STATE_UNSPECIFIED',
              action: '',
              resetContexts: false,
              rootFollowupIntentName: '',
              parentFollowupIntentName: '',
              mlDisabled: false,
            },
            intentDetectionConfidence: 1,
            diagnosticInfo: null,
            languageCode: 'zh-tw',
            sentimentAnalysisResult: null,
          },
          webhookStatus: null,
          outputAudio: {
            type: 'Buffer',
            data: [],
          },
          outputAudioConfig: null,
        },
        null,
        null,
      ]),
    };

    return sessionClient;
  });

  const app = run(
    chain([
      dialogflow({
        projectId: 'PROJECT_ID',
        actions: {
          'projects/PROJECT_ID/agent/intents/INTENT_ID': SayHello,
        },
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Hello!');
  expect(context.intent).toEqual('greeting');
  expect(context.isHandled).toEqual(true);
});

it('should resolve by fulfillmentMessages if intent match name without actions', async () => {
  const { context } = setup();

  const sessionPath = {};
  let sessionClient;

  dialogflowSdk.SessionsClient.mockImplementationOnce(() => {
    sessionClient = {
      sessionPath: jest.fn().mockReturnValue(sessionPath),
      detectIntent: jest.fn().mockResolvedValue([
        {
          responseId: 'cb8e7a38-910a-4386-b312-eac8660d66f7-b4ef8d5f',
          queryResult: {
            fulfillmentMessages: [
              {
                platform: 'PLATFORM_UNSPECIFIED',
                text: {
                  text: ['?'],
                },
                message: 'text',
              },
            ],
            outputContexts: [
              {
                name:
                  'projects/PROJECT_ID/agent/sessions/console:1/contexts/__system_counters__',
                lifespanCount: 1,
                parameters: {
                  fields: {
                    'no-match': {
                      numberValue: 5,
                      kind: 'numberValue',
                    },
                    'no-input': {
                      numberValue: 0,
                      kind: 'numberValue',
                    },
                  },
                },
              },
            ],
            queryText: 'hi',
            speechRecognitionConfidence: 0,
            action: 'input.unknown',
            parameters: {
              fields: {},
            },
            allRequiredParamsPresent: true,
            fulfillmentText: '?',
            webhookSource: '',
            webhookPayload: null,
            intent: {
              inputContextNames: [],
              events: [],
              trainingPhrases: [],
              outputContexts: [],
              parameters: [],
              messages: [],
              defaultResponsePlatforms: [],
              followupIntentInfo: [],
              name: 'projects/PROJECT_ID/agent/intents/INTENT_ID',
              displayName: 'greeting',
              priority: 0,
              isFallback: true,
              webhookState: 'WEBHOOK_STATE_UNSPECIFIED',
              action: '',
              resetContexts: false,
              rootFollowupIntentName: '',
              parentFollowupIntentName: '',
              mlDisabled: false,
            },
            intentDetectionConfidence: 1,
            diagnosticInfo: null,
            languageCode: 'zh-tw',
            sentimentAnalysisResult: null,
          },
          webhookStatus: null,
          outputAudio: {
            type: 'Buffer',
            data: [],
          },
          outputAudioConfig: null,
        },
        null,
        null,
      ]),
    };

    return sessionClient;
  });

  const app = run(
    chain([
      dialogflow({
        projectId: 'PROJECT_ID',
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('?');
  expect(context.intent).toEqual('greeting');
  expect(context.isHandled).toEqual(true);
});

it('should go next if intent does not match any name', async () => {
  const { context } = setup();

  const sessionPath = {};
  let sessionClient;

  dialogflowSdk.SessionsClient.mockImplementationOnce(() => {
    sessionClient = {
      sessionPath: jest.fn().mockReturnValue(sessionPath),
      detectIntent: jest.fn().mockResolvedValue([
        {
          responseId: 'cb8e7a38-910a-4386-b312-eac8660d66f7-b4ef8d5f',
          queryResult: {
            fulfillmentMessages: [],
            outputContexts: [
              {
                name:
                  'projects/PROJECT_ID/agent/sessions/console:1/contexts/__system_counters__',
                lifespanCount: 1,
                parameters: {
                  fields: {
                    'no-match': {
                      numberValue: 5,
                      kind: 'numberValue',
                    },
                    'no-input': {
                      numberValue: 0,
                      kind: 'numberValue',
                    },
                  },
                },
              },
            ],
            queryText: 'hi',
            speechRecognitionConfidence: 0,
            action: 'input.unknown',
            parameters: {
              fields: {},
            },
            allRequiredParamsPresent: true,
            fulfillmentText: '?',
            webhookSource: '',
            webhookPayload: null,
            intent: {
              inputContextNames: [],
              events: [],
              trainingPhrases: [],
              outputContexts: [],
              parameters: [],
              messages: [],
              defaultResponsePlatforms: [],
              followupIntentInfo: [],
              name: 'projects/PROJECT_ID/agent/intents/INTENT_ID',
              displayName: 'order',
              priority: 0,
              isFallback: true,
              webhookState: 'WEBHOOK_STATE_UNSPECIFIED',
              action: '',
              resetContexts: false,
              rootFollowupIntentName: '',
              parentFollowupIntentName: '',
              mlDisabled: false,
            },
            intentDetectionConfidence: 1,
            diagnosticInfo: null,
            languageCode: 'zh-tw',
            sentimentAnalysisResult: null,
          },
          webhookStatus: null,
          outputAudio: {
            type: 'Buffer',
            data: [],
          },
          outputAudioConfig: null,
        },
        null,
        null,
      ]),
    };

    return sessionClient;
  });

  const app = run(
    chain([
      dialogflow({
        projectId: 'PROJECT_ID',
        actions: {
          greeting: SayHello,
        },
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Sorry, I don’t know what you say.');
  expect(context.intent).toEqual('order');
  expect(context.isHandled).toEqual(true);
});

it('should go next if no intent', async () => {
  const { context } = setup();

  const sessionPath = {};
  let sessionClient;

  dialogflowSdk.SessionsClient.mockImplementationOnce(() => {
    sessionClient = {
      sessionPath: jest.fn().mockReturnValue(sessionPath),
      detectIntent: jest.fn().mockResolvedValue([
        {
          responseId: 'cb8e7a38-910a-4386-b312-eac8660d66f7-b4ef8d5f',
          queryResult: {
            fulfillmentMessages: [
              {
                platform: 'PLATFORM_UNSPECIFIED',
                text: {
                  text: ['?'],
                },
                message: 'text',
              },
            ],
            outputContexts: [
              {
                name:
                  'projects/PROJECT_ID/agent/sessions/console:1/contexts/__system_counters__',
                lifespanCount: 1,
                parameters: {
                  fields: {
                    'no-match': {
                      numberValue: 5,
                      kind: 'numberValue',
                    },
                    'no-input': {
                      numberValue: 0,
                      kind: 'numberValue',
                    },
                  },
                },
              },
            ],
            queryText: 'hi',
            speechRecognitionConfidence: 0,
            action: 'input.unknown',
            parameters: {
              fields: {},
            },
            allRequiredParamsPresent: true,
            fulfillmentText: '?',
            webhookSource: '',
            webhookPayload: null,
            intent: null,
            intentDetectionConfidence: 1,
            diagnosticInfo: null,
            languageCode: 'zh-tw',
            sentimentAnalysisResult: null,
          },
          webhookStatus: null,
          outputAudio: {
            type: 'Buffer',
            data: [],
          },
          outputAudioConfig: null,
        },
        null,
        null,
      ]),
    };

    return sessionClient;
  });

  const app = run(
    chain([
      dialogflow({
        projectId: 'PROJECT_ID',
        actions: {
          greeting: SayHello,
        },
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Sorry, I don’t know what you say.');
  expect(context.intent).toBeNull();
  expect(context.isHandled).toEqual(false);
});

it('should support parameters of dialogflow', async () => {
  const { context } = setup();

  const sessionPath = {};
  let sessionClient;

  dialogflowSdk.SessionsClient.mockImplementationOnce(() => {
    sessionClient = {
      sessionPath: jest.fn().mockReturnValue(sessionPath),
      detectIntent: jest.fn().mockResolvedValue([
        {
          responseId: 'cb8e7a38-910a-4386-b312-eac8660d66f7-b4ef8d5f',
          queryResult: {
            fulfillmentMessages: [
              {
                platform: 'PLATFORM_UNSPECIFIED',
                text: {
                  text: ['?'],
                },
                message: 'text',
              },
            ],
            outputContexts: [
              {
                name:
                  'projects/PROJECT_ID/agent/sessions/console:1/contexts/__system_counters__',
                lifespanCount: 1,
                parameters: {
                  fields: {
                    'no-match': {
                      numberValue: 5,
                      kind: 'numberValue',
                    },
                    'no-input': {
                      numberValue: 0,
                      kind: 'numberValue',
                    },
                  },
                },
              },
            ],
            queryText: 'hi',
            speechRecognitionConfidence: 0,
            action: 'input.unknown',
            parameters: {
              fields: {},
            },
            allRequiredParamsPresent: true,
            fulfillmentText: '?',
            webhookSource: '',
            webhookPayload: null,
            intent: {
              inputContextNames: [],
              events: [],
              trainingPhrases: [],
              outputContexts: [],
              parameters: [],
              messages: [],
              defaultResponsePlatforms: [],
              followupIntentInfo: [],
              name: 'projects/PROJECT_ID/agent/intents/INTENT_ID',
              displayName: 'greeting',
              priority: 0,
              isFallback: true,
              webhookState: 'WEBHOOK_STATE_UNSPECIFIED',
              action: '',
              resetContexts: false,
              rootFollowupIntentName: '',
              parentFollowupIntentName: '',
              mlDisabled: false,
            },
            intentDetectionConfidence: 1,
            diagnosticInfo: null,
            languageCode: 'zh-tw',
            sentimentAnalysisResult: null,
          },
          webhookStatus: null,
          outputAudio: {
            type: 'Buffer',
            data: [],
          },
          outputAudioConfig: null,
        },
        null,
        null,
      ]),
    };

    return sessionClient;
  });

  const app = run(
    chain([
      dialogflow({
        projectId: 'PROJECT_ID',
        actions: {
          greeting: SayHello,
        },
        languageCode: 'zh-TW',
        timeZone: 'Asia/Taipei',
      }),
      Unknown,
    ])
  );

  await app(context);

  expect(context.sendText).toBeCalledWith('Hello!');

  expect(sessionClient.detectIntent).toBeCalledWith({
    session: sessionPath,
    queryInput: {
      text: {
        languageCode: 'zh-TW',
        text: 'text',
      },
    },
    queryParams: { timeZone: 'Asia/Taipei' },
  });
});
