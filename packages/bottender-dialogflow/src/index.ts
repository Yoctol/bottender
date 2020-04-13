import dialogflowSdk from 'dialogflow';
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
  actions: Record<string, Action<Context<any, any>, QueryResult>>;
  timeZone?: string;
}): Action<Context<any, any>> {
  const sessionsClient = new dialogflowSdk.SessionsClient();

  return async function Dialogflow(
    context: Context<any, any>,
    { next }: { next?: Action<Context<any, any>> }
  ): Promise<Action<Context<any, any>> | void> {
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
