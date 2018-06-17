/* @flow */

import _debug from 'debug';
import warning from 'warning';
import cloneDeep from 'lodash/cloneDeep';

const debug = _debug('bottender/context/Context');

type Options = {|
  client: any,
  event: any,
  session: ?any,
  initialState: ?Object,
  requestContext: ?Object,
|};

type Response = {
  status: number,
  headers: { [key: string]: string },
  body: any,
};

export default class Context {
  _isHandled = false;
  _isSessionWritten = false;

  _client: Object;
  _event: Object;
  _session: ?Object;
  _initialState: ?Object;
  _requestContext: ?Object;

  response: Response;

  constructor({
    client,
    event,
    session,
    initialState,
    requestContext,
  }: Options) {
    this._client = client;
    this._event = event;
    this._session = session;
    this._initialState = initialState || {};
    this._requestContext = requestContext;

    debug('bottender: context created with rawEvent');
    debug(JSON.stringify(this._event.rawEvent, null, 2));

    if (this._session && !this._session._state) {
      const sess = this._session;
      sess._state = cloneDeep(this._initialState);
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
   * The context of request.
   *
   */
  get requestContext(): ?Object {
    return this._requestContext;
  }

  /**
   * The session state of the context.
   *
   */
  get session(): ?Object {
    return this._session;
  }

  get isHandled(): boolean {
    return this._isHandled;
  }

  get isSessionWritten(): boolean {
    return this._isSessionWritten;
  }
  set isSessionWritten(bool: boolean): void {
    this._isSessionWritten = bool;
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
      const sess = this._session;

      warning(
        !this._isSessionWritten,
        'Calling `context.setState` after session has been written. Some changes to state will not be saved.\nDid you forget to await any async function?'
      );
      sess._state = {
        ...sess._state,
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
      const sess = this._session;

      warning(
        !this._isSessionWritten,
        'Calling `context.resetState` after session has been written. Some changes to state will not be saved.\nDid you forget to await any async function?'
      );
      sess._state = cloneDeep(this._initialState);
    } else {
      warning(
        false,
        'resetState: should not be called in context without session'
      );
    }
  }
}
