export interface Event<RE extends object> {
  readonly rawEvent: RE;
  readonly isMessage: boolean;
  readonly isText: boolean;
  readonly isPayload: boolean;
  readonly payload: string | null;
  readonly message?: Record<string, any> | null;
}
