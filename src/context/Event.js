/* @flow */

export interface Event {
  +rawEvent: ?{},
  +isMessage: boolean,
  +isTextMessage: boolean,
  +message: ?{},
}
