import { JsonObject, JsonValue } from 'type-fest';

type Session = Record<string, JsonValue | null | undefined> & {
  _state: JsonObject;
  lastActivity: number;
};

export default Session;
