import axios from 'axios';
import { Action, Context, withProps } from 'bottender';
import { get } from 'lodash';

import { ParsedResult } from './types';

/**
 * const Rasa = rasa({
 *   origin: 'http://localhost:5005',
 *   actions: {
 *     greeting: async function SayHello(context) {
 *       await context.sendText('Hello!');
 *     },
 *   },
 *   confidenceThreshold: 0.7
 * });
 */
module.exports = function rasa({
  origin = 'http://localhost:5005',
  actions,
  confidenceThreshold,
  emulationMode,
  jwt,
}: {
  origin: string;
  actions: Record<string, Action<Context<any, any>, any>>;
  confidenceThreshold: number;
  emulationMode?: 'WIT' | 'LUIS' | 'DIALOGFLOW';
  jwt?: string;
}) {
  return async function Rasa(
    context: Context<any, any>,
    { next }: { next?: Action<Context<any, any>, any> }
  ) {
    if (!context.event.isText) {
      return next;
    }

    // API Reference: https://rasa.com/docs/rasa/api/http-api/#operation/parseModelMessage
    const { data } = await axios.post<ParsedResult>(
      `${origin}/model/parse`,
      {
        text: context.event.text,
        message_id: get(context, 'event.message.id'),
      },
      {
        params: {
          emulation_mode: emulationMode,
        },
        headers: jwt ? { Authorization: `bearer ${jwt}` } : undefined,
      }
    );

    const { intent, entities } = data;

    if (intent && intent.confidence > confidenceThreshold) {
      context.setIntent(intent.name);
      context.setAsHandled();

      const TargetAction = actions[intent.name];
      if (TargetAction) {
        return withProps(TargetAction, { intent, entities });
      }
    } else {
      context.setAsNotHandled();
    }

    return next;
  };
};
