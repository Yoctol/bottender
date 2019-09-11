export interface Event {
  +rawEvent: ?{};
  +isMessage: boolean;
  +isText: boolean;
  +message: ?{};
}
