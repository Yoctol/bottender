export type LuisResult = {
  alteredQuery: string;
  compositeEntities: CompositeEntityModel[];
  connectedServiceResult: LuisResult;
  entities: EntityModel[];
  intents: IntentModel[];
  query: string;
  sentimentAnalysis: Sentiment;
  topScoringIntent: IntentModel;
};

export type CompositeEntityModel = {
  children: CompositeChildModel[];
  parentType: string;
  value: string;
};

export type CompositeChildModel = {
  type: string;
  value: string;
};

export type IntentModel = {
  intent: string;
  score: number;
};

export type EntityModel = {
  endIndex: number;
  entity: string;
  startIndex: number;
  type: string;
};

export type Sentiment = {
  label: string;
  score: number;
};
