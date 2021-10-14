import { JsonObject, JsonValue } from 'type-fest';

type Session<T = unknown> = Record<string, JsonValue | null | undefined> & {
  _state: JsonObject;
  lastActivity?: number;
} & T;

export default Session;
