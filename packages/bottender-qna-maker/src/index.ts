import axios from 'axios';
import { Context } from 'bottender';

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
}) {
  return async function QnaMaker(
    context: Context<any, any>,
    { next }: { next: Function }
  ) {
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
