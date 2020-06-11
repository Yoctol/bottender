import { EventEmitter } from 'events';

import cloneDeep from 'lodash/cloneDeep';
import debug from 'debug';
import delay from 'delay';
import warning from 'warning';
import { JsonObject } from 'type-fest';

import Session from '../session/Session';
import { Client, Event, RequestContext } from '../types';

const debugContext = debug('bottender:context');

type Options<C extends Client, E extends Event> = {
  client: C;
  event: E;
  session?: Session | null;
  initialState?: JsonObject | null;
  requestContext?: RequestContext;
  emitter?: EventEmitter | null;
};

type Response = {
  status: number;
  headers: Record<string, string>;
  body: any;
};

export default abstract class Context<
  C extends Client = any,
  E extends Event = any
> {
  /**
   * The name of the platform.
   *
   */
  abstract get platform(): string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract sendText(text: string, options?: JsonObject): any;

  _isHandled: boolean | null = null;

  _isSessionWritten = false;

  _client: C;

  _event: E;

  _session: Session | null;

  _initialState?: JsonObject | null;

  _requestContext: RequestContext | null;

  _emitter: EventEmitter | null;

  _intent: string | null;

  response: Response;

  constructor({
    client,
    event,
    session,
    initialState,
    requestContext,
    emitter,
  }: Options<C, E>) {
    this._client = client;
    this._event = event;
    this._session = session || null;
    this._initialState = initialState || {};
    this._requestContext = requestContext || null;
    this._emitter = emitter || null;
    this._intent = null;

    debugContext('Context created with rawEvent:');
    debugContext(JSON.stringify(this._event.rawEvent, null, 2));

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
  get client(): C {
    return this._client;
  }

  /**
   * The event instance.
   *
   */
  get event(): Record<string, any> {
    return this._event;
  }

  /**
   * The context of the request.
   *
   */
  get requestContext(): RequestContext | null {
    return this._requestContext;
  }

  /**
   * The session state of the context.
   *
   */
  get session(): Session | null {
    return this._session;
  }

  get isHandled(): boolean | null {
    return this._isHandled;
  }

  get isSessionWritten(): boolean {
    return this._isSessionWritten;
  }

  set isSessionWritten(bool: boolean) {
    this._isSessionWritten = bool;
  }

  /**
   * The state of the conversation context.
   *
   */
  get state(): JsonObject {
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
  setState(state: JsonObject): void {
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

  /**
   * Delay and show indicators for milliseconds.
   *
   */
  async typing(milliseconds: number): Promise<void> {
    if (milliseconds > 0) {
      await delay(milliseconds);
    }
  }

  /**
   * The intent of the conversation context.
   *
   */
  get intent(): string | null {
    return this._intent;
  }

  /**
   * Set intent to the conversation context.
   *
   */
  setIntent(intent: string): void {
    this._intent = intent;
  }

  /**
   * Set the conversation context as handled or not handled by boolean.
   *
   */
  setAsHandled(handled = true) {
    this._isHandled = handled;
  }

  /**
   * Set the conversation context as not handled.
   *
   */
  setAsNotHandled() {
    this.setAsHandled(false);
  }

  emitError(err: Error): void {
    if (this._emitter) {
      this._emitter.emit('error', err, this);
    }
  }

  handlerDidEnd(): any {}
}
