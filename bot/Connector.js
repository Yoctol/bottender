import invariant from 'invariant';

function unimplemented(methodName) {
  invariant(false, `Connecter must implement abstract method: ${methodName}`);
}

export default class Connecter {
  _handler = null;

  get hasHandler(): boolean {
    return !!this._handler;
  }

  setHandler(handler): void {
    this._handler = handler;
  }

  /* eslint-disable class-methods-use-this */
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
