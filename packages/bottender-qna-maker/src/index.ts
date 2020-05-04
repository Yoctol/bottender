import axios from 'axios';
import invariant from 'invariant';
import { Action, Context } from 'bottender';

import { MetadataDTO, QnaSearchResultList } from './types';

// https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/concepts/confidence-score#choose-a-score-threshold
// The recommended threshold that should work for most KBs, is 50.
const RECOMMENDED_THRESHOLD = 50;

/**
 * const QnaMaker = qnaMaker({
 *   resourceName: 'RESOURCE_NAME',
 *   knowledgeBaseId: 'KNOWLEDGE_BASE_ID',
 *   endpointKey: 'ENDPOINT_KEY',
 *   scoreThreshold: 70,
 * });
 */
module.exports = function qnaMaker({
  resourceName,
  knowledgeBaseId,
  endpointKey,
  isTest,
  qnaId,
  scoreThreshold = RECOMMENDED_THRESHOLD,
  strictFilters,
}: {
  resourceName: string;
  knowledgeBaseId: string;
  endpointKey: string;
  isTest?: string;
  qnaId?: string;
  scoreThreshold?: number;
  strictFilters?: MetadataDTO[];
}): Action<Context<any, any>> {
  invariant(
    typeof resourceName === 'string' && resourceName.length > 0,
    'qna-maker: `resourceName` is a required parameter.'
  );

  invariant(
    typeof knowledgeBaseId === 'string' && knowledgeBaseId.length > 0,
    'qna-maker: `knowledgeBaseId` is a required parameter.'
  );

  invariant(
    typeof endpointKey === 'string' && endpointKey.length > 0,
    'qna-maker: `endpointKey` is a required parameter.'
  );

  return async function QnaMaker(
    context: Context<any, any>,
    { next }: { next?: Action<Context<any, any>> }
  ): Promise<Action<Context<any, any>> | void> {
    if (!context.event.isText || !context.session) {
      return next;
    }

    // API Reference: https://docs.microsoft.com/en-us/rest/api/cognitiveservices/qnamakerruntime/runtime/generateanswer
    const { data } = await axios.post<QnaSearchResultList>(
      `https://${resourceName}.azurewebsites.net/qnamaker/knowledgebases/${knowledgeBaseId}/generateAnswer`,
      {
        isTest,
        qnaId,
        question: context.event.text,
        scoreThreshold,
        strictFilters,
        top: 1,
        userId: context.session.user ? context.session.user.id : undefined,
      },
      {
        headers: {
          Authorization: `EndpointKey ${endpointKey}`,
        },
      }
    );

    // TODO: implement multiple turns conversation using context and prompt
    // https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/how-to/multiturn-conversation

    const topAnswer = data.answers[0];

    if (!topAnswer || (next && topAnswer.id === -1)) {
      context.setAsNotHandled();
      return next;
    }

    return async function TopAnswer() {
      if (topAnswer.id !== -1) {
        context.setIntent(`qna_${topAnswer.id}`);
        context.setAsHandled();
      } else {
        context.setAsNotHandled();
      }

      await context.sendText(topAnswer.answer);
    };
  };
};
