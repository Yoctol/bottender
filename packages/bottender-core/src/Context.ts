import { EventEmitter } from 'events';

import cloneDeep from 'lodash/cloneDeep';
import debug from 'debug';
import delay from 'delay';
import warning from 'warning';
import { JsonObject } from 'type-fest';

import Event from './Event';
import Session from './Session';
import { Client, RequestContext } from './types';

const debugContext = debug('bottender:context');

type Options<C extends Client, E extends Event> = {
  client: C;
  event: E;
  session?: Session | null;
  initialState?: JsonObject | null;
  requestContext?: RequestContext;
  emitter?: EventEmitter | null;
};

type Response<B = any> = {
  status: number;
  headers: Record<string, string>;
  body: B;
};

export default abstract class Context<
  C extends Client = any, // eslint-disable-line @typescript-eslint/no-explicit-any
  E extends Event = any // eslint-disable-line @typescript-eslint/no-explicit-any
> {
  /**
   * The name of the platform.
   */
  abstract get platform(): string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract sendText(text: string, options?: JsonObject): Promise<any>;

  public isSessionWritten = false;

  public response: Response;

  private _isHandled: boolean | null = null;

  private _client: C;

  private _event: E;

  private _session: Session | null;

  private initialState?: JsonObject | null;

  private _requestContext: RequestContext | null;

  private _emitter: EventEmitter | null;

  private _intent: string | null;

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
    this.initialState = initialState || {};
    this._requestContext = requestContext || null;
    this._emitter = emitter || null;
    this._intent = null;

    debugContext('Context created with rawEvent:');
    debugContext(JSON.stringify(this._event.rawEvent, null, 2));

    if (this._session && !this._session._state) {
      const sess = this._session;
      sess._state = cloneDeep(this.initialState);
    }

    this.response = {
      status: 200,
      headers: {},
      body: null,
    };
  }

  /**
   * The client instance.
   */
  public get client(): C {
    return this._client;
  }

  /**
   * The event instance.
   */
  public get event(): Record<string, any> {
    // FIXME: event should not be any type
    return this._event;
  }

  /**
   * The context of the request.
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
        !this.isSessionWritten,
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
   */
  resetState(): void {
    if (this._session) {
      const sess = this._session;

      warning(
        !this.isSessionWritten,
        'Calling `context.resetState` after session has been written. Some changes to state will not be saved.\nDid you forget to await any async function?'
      );
      sess._state = this.initialState ? cloneDeep(this.initialState) : {};
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
   * @param ms - milliseconds to type
   */
  public async typing(ms: number): Promise<void> {
    if (ms > 0) {
      await delay(ms);
    }
  }

  /**
   * The intent of the conversation context.
   */
  get intent(): string | null {
    return this._intent;
  }

  /**
   * Set intent to the conversation context.
   *
   * @param intent - name of the intent
   */
  public setIntent(intent: string): void {
    this._intent = intent;
  }

  /**
   * Set the conversation context as handled or not handled by boolean.
   */
  public setAsHandled(handled = true): void {
    this._isHandled = handled;
  }

  /**
   * Set the conversation context as not handled.
   */
  public setAsNotHandled(): void {
    this.setAsHandled(false);
  }

  public emitError(err: Error): void {
    if (this._emitter) {
      this._emitter.emit('error', err, this);
    }
  }

  public handlerDidEnd(): void {}
}
