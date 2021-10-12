import { JsonObject } from 'type-fest';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default interface Event<RE extends Record<string, any> = JsonObject> {
  readonly rawEvent: RE;
  readonly isMessage: boolean;
  readonly isText: boolean;
  readonly message?: JsonObject;
}
