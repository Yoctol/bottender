import dialogflowSdk from 'dialogflow';
import { Action, Context, withProps } from 'bottender';

import { QueryResult } from './types';

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
  actions,
  timeZone,
}: {
  projectId: string;
  languageCode: string;
  actions: Record<string, Action<Context<any, any>, any>>;
  timeZone?: string;
}) {
  const sessionsClient = new dialogflowSdk.SessionsClient();

  return async function Dialogflow(
    context: Context<any, any>,
    { next }: { next?: Action<Context<any, any>, any> }
  ) {
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

    const { intent, parameters } = responses[0].queryResult as QueryResult;

    if (intent) {
      context.setIntent(intent.displayName);
      context.setAsHandled();

      const TargetAction = actions[intent.name] || actions[intent.displayName];
      if (TargetAction) {
        return withProps(TargetAction, { intent, parameters });
      }
    } else {
      context.setAsNotHandled();
    }

    return next;
  };
};
