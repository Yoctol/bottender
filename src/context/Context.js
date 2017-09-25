/* @flow */

export default class Context {
  _handled = false;

  markHandled(): void {
    this._handled = true;
  }

  isHandled(): boolean {
    return this._handled;
  }
}
