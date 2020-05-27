import { JsonObject } from 'type-fest';

export interface Event<RE extends object = JsonObject> {
  readonly rawEvent: RE;
  readonly isMessage: boolean;
  readonly isText: boolean;
  readonly message?: JsonObject | null;
}
