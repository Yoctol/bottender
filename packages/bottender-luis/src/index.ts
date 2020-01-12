import axios from 'axios';
import { Context, withProps } from 'bottender';

import { LuisResult } from './types';

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
  actions: Record<string, Function>;
  verbose?: boolean;
  timezoneOffset?: number;
  spellCheck?: boolean;
  staging?: boolean;
  bingSpellCheckSubscriptionKey?: string;
  log?: boolean;
}) {
  return async function Luis(
    context: Context<any, any>,
    { next }: { next: Function }
  ) {
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

      const Action = actions[topScoringIntent.intent];

      if (Action) {
        return withProps(Action as any, {
          topScoringIntent,
          entities,
          sentimentAnalysis,
        });
      }
    }

    return next;
  };
};
