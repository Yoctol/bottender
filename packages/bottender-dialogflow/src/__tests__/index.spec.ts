import dialogflowSdk, { protos } from '@google-cloud/dialogflow';
import { Context, chain } from 'bottender';
// FIXME: export public API for testing
import { mocked } from 'ts-jest/utils';
import { run } from 'bottender/dist/bot/Bot';

import dialogflow from '..';

process.env.GOOGLE_APPLICATION_CREDENTIALS = 'test';

jest.mock('@google-cloud/dialogflow');

// FIXME: export public test-utils for testing
class TestContext extends Context {
  get platform() {
    return 'test';
  }

  sendText = jest.fn();
}

const sessionPath = 'SESSION_PATH';

const defaultDetectIntentRequest = {
  session: sessionPath,
  queryInput: {
    text: {
      languageCode: 'en',
      text: 'text',
    },
  },
  queryParams: { timeZone: undefined },
};

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
  detectIntentRequest = defaultDetectIntentRequest,
  detectIntentResponse,
}: {
  event?: {
    isMessage: boolean;
    isText: boolean;
    text: string;
    message: {
      id: string;
      text: string;
    };
    rawEvent: {
      message: {
        id: string;
        text: string;
      };
    };
  };
  detectIntentRequest?: protos.google.cloud.dialogflow.v2.IDetectIntentRequest;
  detectIntentResponse: protos.google.cloud.dialogflow.v2.IDetectIntentResponse;
}) {
  const detectIntentResolvedValue: [
    protos.google.cloud.dialogflow.v2.IDetectIntentResponse,
    protos.google.cloud.dialogflow.v2.IDetectIntentRequest,
    {} // eslint-disable-line @typescript-eslint/ban-types
  ] = [detectIntentResponse, detectIntentRequest, {}];

  mocked(
    dialogflowSdk.SessionsClient.prototype
  ).projectAgentSessionPath.mockReturnValueOnce(sessionPath);
  mocked(
    dialogflowSdk.SessionsClient.prototype
  ).detectIntent.mockResolvedValueOnce(
    // @ts-ignore: this resolved type should not be hinted to never
    detectIntentResolvedValue
  );

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
    detectIntentRequest,
    detectIntentResponse,
  };
}

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function Unknown(context) {
  await context.sendText('Sorry, I don’t know what you say.');
}

it('should resolve corresponding action if intent match name', async () => {
  const { context, detectIntentRequest } = setup({
    detectIntentResponse: {
      responseId: 'RESPONSE_ID',
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

  await app(context, {});

  expect(context.sendText).toBeCalledWith('Hello!');
  expect(context.intent).toBe('greeting');
  expect(context.isHandled).toBe(true);

  const sessionClient = mocked(dialogflowSdk.SessionsClient).mock.instances[0];

  expect(sessionClient.projectAgentSessionPath).toBeCalledWith(
    'PROJECT_ID',
    'test:1'
  );
  expect(sessionClient.detectIntent).toBeCalledWith(detectIntentRequest);
});

it('should resolve corresponding action if intent match id', async () => {
  const { context } = setup({
    detectIntentResponse: {
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

  await app(context, {});

  expect(context.sendText).toBeCalledWith('Hello!');
  expect(context.intent).toBe('greeting');
  expect(context.isHandled).toBe(true);
});

it('should resolve by fulfillmentMessages if intent match name without actions', async () => {
  const { context } = setup({
    detectIntentResponse: {
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
  });

  const app = run(
    chain([
      dialogflow({
        projectId: 'PROJECT_ID',
      }),
      Unknown,
    ])
  );

  await app(context, {});

  expect(context.sendText).toBeCalledWith('?');
  expect(context.intent).toBe('greeting');
  expect(context.isHandled).toBe(true);
});

it('should go next if intent does not match any name', async () => {
  const { context } = setup({
    detectIntentResponse: {
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

  await app(context, {});

  expect(context.sendText).toBeCalledWith('Sorry, I don’t know what you say.');
  expect(context.intent).toBe('order');
  expect(context.isHandled).toBe(true);
});

it('should go next if no intent', async () => {
  const { context } = setup({
    detectIntentResponse: {
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

  await app(context, {});

  expect(context.sendText).toBeCalledWith('Sorry, I don’t know what you say.');
  expect(context.intent).toBeNull();
  expect(context.isHandled).toBe(false);
});

it('should support parameters of dialogflow', async () => {
  const { context } = setup({
    detectIntentResponse: {
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

  await app(context, {});

  const sessionClient = mocked(dialogflowSdk.SessionsClient).mock.instances[0];

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
