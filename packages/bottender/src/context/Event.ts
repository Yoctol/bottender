export interface Event<RE extends object> {
  readonly rawEvent: RE;
  readonly isMessage: boolean;
  readonly isText: boolean;
  readonly message?: Record<string, any> | null;
}
