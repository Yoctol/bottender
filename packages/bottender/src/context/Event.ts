export interface Event {
  rawEvent: Record<string, any> | null;
  isMessage: boolean;
  isText: boolean;
  message: Record<string, any> | null;
}
