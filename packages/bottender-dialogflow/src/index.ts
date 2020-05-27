import dialogflowSdk from 'dialogflow';
import invariant from 'invariant';
import { Action, Context, withProps } from 'bottender';

import { Message, QueryResult } from './types';

function getFulfillments(fulfillmentMessages: Message[]): string[] {
  if (!fulfillmentMessages) {
    return [];
  }

  const fulfillmentTexts = fulfillmentMessages.filter(
    m => m.platform === 'PLATFORM_UNSPECIFIED' && m.text !== undefined
  );

  return fulfillmentTexts.map(fulfillmentText => {
    const texts: string[] = fulfillmentText.text.text;
    const index = Math.floor(Math.random() * texts.length);
    return texts[index];
  });
}

/**
 * const Dialogflow = dialogflow({
 *   projectId: 'PROJECT_ID',
 *   actions: {
 *     greeting: async function SayHello(context) {
 *       await context.sendText('Hello!');
 *     },
 *   },
 * });
 */
module.exports = function dialogflow({
  projectId,
  languageCode = 'en',
  actions = {},
  timeZone,
}: {
  projectId: string;
  languageCode: string;
  actions: Record<string, Action<Context, QueryResult>>;
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

    const sessionPath = sessionsClient.sessionPath(
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
    const responses = await sessionsClient.detectIntent(request);
    const queryResult = responses[0].queryResult as QueryResult;
    const { intent, fulfillmentMessages } = queryResult;

    if (intent) {
      context.setIntent(intent.displayName);
      context.setAsHandled();

      // fulfillment by Bottender
      const TargetAction = actions[intent.name] || actions[intent.displayName];
      if (TargetAction) {
        return withProps(TargetAction, { ...queryResult });
      }

      // fulfillment by Dialogflow
      const fulfillments = getFulfillments(fulfillmentMessages);
      if (fulfillments.length > 0) {
        await Promise.all(
          fulfillments.map(fulfillment => context.sendText(fulfillment))
        );
        return;
      }
    } else {
      context.setAsNotHandled();
    }

    return next;
  };
};
