/* @flow */

import warning from 'warning';

type Options = {|
  client: any,
  event: any,
  session: ?any,
  initialState: ?Object,
|};

type Response = {
  status: number,
  headers: { [key: string]: string },
  body: any,
};

export default class Context {
  _handled = false;

  _client: Object;
  _event: Object;
  _session: ?Object;
  _initialState: ?Object;

  response: Response;

  constructor({ client, event, session, initialState }: Options) {
    this._client = client;
    this._event = event;
    this._session = session;
    this._initialState = initialState || {};

    if (this._session && !this._session._state) {
      this._session._state = this._initialState;
    }

    this.response = {
      status: 200,
      headers: {},
      body: null,
    };
  }

  /**
   * The client instance.
   *
   */
  get client(): Object {
    return this._client;
  }

  /**
   * The event instance.
   *
   */
  get event(): Object {
    return this._event;
  }

  /**
   * The session state of the context.
   *
   */
  get session(): ?Object {
    return this._session;
  }

  get handled(): boolean {
    return this._handled;
  }

  /**
   * The state in the conversation context.
   *
   */
  get state(): Object {
    if (this._session) {
      return this._session._state;
    }
    warning(
      false,
      'state: is not accessible in context without session. Falling back to an empty object.'
    );
    return {};
  }

  /**
   * Shallow merge changes to the state.
   *
   */
  setState(state: Object): void {
    if (this._session) {
      this._session._state = {
        ...this._session._state,
        ...state,
      };
    } else {
      warning(
        false,
        'setState: should not be called in context without session'
      );
    }
  }

  /**
   * Reset the state to the initial state.
   *
   */
  resetState(): void {
    if (this._session) {
      this._session._state = this._initialState;
    } else {
      warning(
        false,
        'resetState: should not be called in context without session'
      );
    }
  }
}
