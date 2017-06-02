import invariant from 'invariant';

function unimplemented(methodName) {
  invariant(false, `Connector must implement abstract method: ${methodName}`);
}

export default class Connector {
  _handler = null;

  get hasHandler(): boolean {
    return !!this._handler;
  }

  setHandler(handler): void {
    this._handler = handler;
  }

  /* eslint-disable class-methods-use-this */
  get platform(): string {
    unimplemented('platform getter');
  }

  getSenderIdFromRequest() {
    unimplemented('getSenderIdFromRequest');
  }

  getUserProfile() {
    unimplemented('getUserProfile');
  }

  handleRequest() {
    unimplemented('handleRequest');
  }
  /* eslint-enable class-methods-use-this */
}
