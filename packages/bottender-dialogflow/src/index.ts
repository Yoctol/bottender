import dialogflowSdk, { protos } from '@google-cloud/dialogflow';
import invariant from 'invariant';
import { Action, Context, withProps } from 'bottender';

function getFulfillments(
  messages?: protos.google.cloud.dialogflow.v2.Intent.IMessage[] | null
): string[] {
  if (!messages) {
    return [];
  }

  return messages
    .filter((message) => message.platform === 'PLATFORM_UNSPECIFIED')
    .map((message) => message.text)
    .filter(
      (text): text is protos.google.cloud.dialogflow.v2.Intent.Message.IText =>
        Boolean(text)
    )
    .map((text) => text.text)
    .filter((text): text is string[] => Boolean(text))
    .map((texts) => {
      const index = Math.floor(Math.random() * texts.length);
      return texts[index];
    });
}

function getTargetAction(
  actions: Record<
    string,
    Action<Context, protos.google.cloud.dialogflow.v2.IQueryResult>
  >,
  intent: protos.google.cloud.dialogflow.v2.IIntent
): Action<Context, protos.google.cloud.dialogflow.v2.IQueryResult> | void {
  if (intent.name && actions[intent.name]) {
    return actions[intent.name];
  }

  if (intent.displayName && actions[intent.displayName]) {
    return actions[intent.displayName];
  }
}

/**
 * @example
 * ```
 * const Dialogflow = dialogflow({
 *   projectId: 'PROJECT_ID',
 *   actions: {
 *     greeting: async function SayHello(context) {
 *       await context.sendText('Hello!');
 *     },
 *   },
 * });
 * ```
 */
export = function dialogflow({
  projectId,
  languageCode = 'en',
  actions = {},
  timeZone,
}: {
  projectId: string;
  languageCode: string;
  actions: Record<
    string,
    Action<Context, protos.google.cloud.dialogflow.v2.IQueryResult>
  >;
  timeZone?: string;
}): Action<Context> {
  invariant(
    typeof projectId === 'string' && projectId.length > 0,
    'dialogflow: `projectId` is a required parameter.'
  );

  const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  invariant(
    typeof credentials === 'string' && credentials.length > 0,
    'dialogflow: `GOOGLE_APPLICATION_CREDENTIALS` is required. Please make sure you have filled it correctly in `.env` file.'
  );

  const sessionsClient = new dialogflowSdk.SessionsClient();

  return async function Dialogflow(
    context: Context,
    { next }: { next?: Action<Context> }
  ): Promise<Action<Context> | void> {
    if (!context.event.isText || !context.session) {
      return next;
    }

    const sessionPath = sessionsClient.projectAgentSessionPath(
      projectId,
      context.session.id
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: context.event.text,
          languageCode,
        },
      },
      queryParams: {
        timeZone,
      },
    };

    // API Reference: https://cloud.google.com/dialogflow/docs/reference/rest/v2/projects.agent.sessions/detectIntent
    const [response] = await sessionsClient.detectIntent(request);
    const queryResult = response.queryResult;

    if (!queryResult) {
      context.setAsNotHandled();
      return next;
    }

    const { intent, fulfillmentMessages } = queryResult;

    if (!intent) {
      context.setAsNotHandled();
      return next;
    }

    if (intent.displayName) {
      context.setIntent(intent.displayName);
    }
    context.setAsHandled();

    // fulfillment by Bottender
    const TargetAction = getTargetAction(actions, intent);
    if (TargetAction) {
      return withProps(TargetAction, { ...queryResult });
    }

    // fulfillment by Dialogflow
    const fulfillments = getFulfillments(fulfillmentMessages);
    if (fulfillments.length > 0) {
      for (const fulfillment of fulfillments) {
        // eslint-disable-next-line no-await-in-loop
        await context.sendText(fulfillment);
      }
      return;
    }

    return next;
  };
};
