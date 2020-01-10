export type QueryResult = {
  queryText: string;
  languageCode: string;
  speechRecognitionConfidence: number;
  action: string;
  parameters: Record<string, any>;
  allRequiredParamsPresent: boolean;
  fulfillmentText: string;
  fulfillmentMessages: Message[];
  webhookSource: string;
  webhookPayload: Record<string, any>;
  outputContexts: DialogflowContext[];
  intent: Intent;
  intentDetectionConfidence: number;
  diagnosticInfo: Record<string, any>;
  sentimentAnalysisResult: SentimentAnalysisResult;
};

export type Message = {
  platform: Platform;
  text: string[];
};

export type DialogflowContext = {
  name: string;
  lifespanCount?: number;
  parameters?: Record<string, any>;
};

export type Platform =
  | 'PLATFORM_UNSPECIFIED'
  | 'FACEBOOK'
  | 'SLACK'
  | 'TELEGRAM'
  | 'KIK'
  | 'SKYPE'
  | 'LINE'
  | 'VIBER'
  | 'ACTIONS_ON_GOOGLE'
  | 'GOOGLE_HANGOUTS';

export type WebhookState =
  | 'WEBHOOK_STATE_UNSPECIFIED'
  | 'WEBHOOK_STATE_ENABLED'
  | 'WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING';

export type Parameter = {
  name: string;
  displayName: string;
  value?: string;
  defaultValue?: string;
  entityTypeDisplayName?: string;
  mandatory?: boolean;
  prompts?: string[];
  isList?: boolean;
};

export type TrainingPhrase = {
  name: string;
  type: Type;
  parts: Part[];
  timesAddedCount?: number;
};

export type Type = 'TYPE_UNSPECIFIED' | 'EXAMPLE' | 'TEMPLATE';

export type Part = {
  text: string;
  entityType?: string;
  alias?: string;
  userDefined?: boolean;
};

export type FollowupIntentInfo = {
  followupIntentName: string;
  parentFollowupIntentName: string;
};

export type Intent = {
  name: string;
  displayName: string;
  webhookState?: WebhookState;
  priority?: number;
  isFallback?: boolean;
  mlDisabled?: boolean;
  inputContextNames?: string[];
  events?: string[];
  trainingPhrases?: TrainingPhrase[];
  action?: string;
  outputContexts?: DialogflowContext[];
  resetContexts?: boolean;
  parameters?: Parameter[];
  messages?: Message[];
  defaultResponsePlatforms?: Platform[];
  rootFollowupIntentName: string;
  parentFollowupIntentName: string;
  followupIntentInfo: FollowupIntentInfo[];
};

export type SentimentAnalysisResult = {
  queryTextSentiment: Sentiment;
};

export type Sentiment = {
  score: number;
  magnitude: number;
};
