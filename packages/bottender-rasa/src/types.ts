export type ParsedResult = {
  entities: Entity[];
  intent: Intent;
  intent_ranking: Intent[];
  text: string;
};

export type Intent = {
  name: string;
  confidence: number;
};

export type Entity = {
  start: number;
  end: number;
  value: string;
  entity: string;
  confidence: number;
};
