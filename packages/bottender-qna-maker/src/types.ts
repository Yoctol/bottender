export type QnaContext = {
  isContextOnly: boolean;
  prompts: PromptDTO[];
};

export type MetadataDTO = {
  name: string;
  value: string;
};

export type PromptDTO = {
  displayOrder: number;
  displayText: string;
  qna: Qna;
  qnaId: number;
};

export type Qna = {
  answer: string;
  context: QnaContext;
  id: number;
  metadata: MetadataDTO[];
  questions: string[];
  source: string;
};

export type QnaSearchResult = Qna & { score: number };

export type QnaSearchResultList = {
  answers: QnaSearchResult[];
};

export type QueryDTO = {
  context?: QnaContext;
  isTest?: boolean;
  qnaId?: string;
  question: string;
  rankerType?: string;
  scoreThreshold?: number;
  strictFilters?: MetadataDTO[];
  top?: number;
  userId?: string;
};
