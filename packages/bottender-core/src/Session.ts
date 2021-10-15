import { JsonObject, JsonValue } from 'type-fest';

type Session<T = unknown> = Record<string, JsonValue | null | undefined> & {
  id: string;
  _state: JsonObject;
  lastActivity?: number;
} & T;

export default Session;
