import axios from 'axios';
import invariant from 'invariant';
import { Action, Context, withProps } from 'bottender';

import { EntityModel, IntentModel, LuisResult, Sentiment } from './types';

/**
 * const Luis = luis({
 *   appId: 'APP_ID',
 *   appKey: 'APP_KEY',
 *   endpoint: 'https://westus.api.cognitive.microsoft.com',
 *   scoreThreshold: 0.7,
 *   actions: {
 *     greeting: async function SayHello(context) {
 *       await context.sendText('Hello!');
 *     },
 *   },
 * });
 *
 */
module.exports = function luis({
  appId,
  appKey,
  endpoint,
  scoreThreshold,
  actions,
  verbose = true,
  timezoneOffset,
  spellCheck,
  staging,
  bingSpellCheckSubscriptionKey,
  log,
}: {
  appId: string;
  appKey: string;
  endpoint: string;
  scoreThreshold: number;
  actions: Record<
    string,
    Action<
      Context,
      {
        topScoringIntent: IntentModel;
        entities: EntityModel[];
        sentimentAnalysis: Sentiment;
      }
    >
  >;
  verbose?: boolean;
  timezoneOffset?: number;
  spellCheck?: boolean;
  staging?: boolean;
  bingSpellCheckSubscriptionKey?: string;
  log?: boolean;
}): Action<Context> {
  invariant(
    typeof appId === 'string' && appId.length > 0,
    'luis: `appId` is a required parameter.'
  );

  invariant(
    typeof appKey === 'string' && appKey.length > 0,
    'luis: `appKey` is a required parameter.'
  );

  invariant(
    typeof endpoint === 'string' && endpoint.length > 0,
    'luis: `endpoint` is a required parameter.'
  );

  return async function Luis(
    context: Context,
    { next }: { next?: Action<Context> }
  ): Promise<Action<Context> | void> {
    if (!context.event.isText) {
      return next;
    }

    const params = {
      timezoneOffset,
      verbose,
      spellCheck,
      staging,
      'bing-spell-check-subscription-key': bingSpellCheckSubscriptionKey,
      log,
      q: context.event.text,
    };

    // API Reference: https://docs.microsoft.com/en-us/rest/api/cognitiveservices/luis-runtime/prediction/resolve
    const { data } = await axios.get<LuisResult>(
      `${endpoint}/luis/v2.0/apps/${appId}`,
      {
        params,
        headers: {
          'Ocp-Apim-Subscription-Key': appKey,
        },
      }
    );

    const { topScoringIntent, entities, sentimentAnalysis } = data;

    if (topScoringIntent && topScoringIntent.score > scoreThreshold) {
      context.setIntent(topScoringIntent.intent);
      context.setAsHandled();

      const TargetAction = actions[topScoringIntent.intent];

      if (TargetAction) {
        return withProps(TargetAction, {
          topScoringIntent,
          entities,
          sentimentAnalysis,
        });
      }
    } else {
      context.setAsNotHandled();
    }

    return next;
  };
};
