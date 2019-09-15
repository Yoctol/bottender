export interface Event<T> {
  rawEvent: T;
  isMessage: boolean;
  isText: boolean;
  message?: Record<string, any>;
}
