/* @flow */

type Options = {|
  client: any,
  event: any,
  session: ?any,
|};

export default class Context {
  _handled = false;

  _client: Object;
  _event: Object;
  _session: ?Object;

  _messageDelay: number = 0;

  constructor({ client, event, session }: Options) {
    this._client = client;
    this._event = event;
    this._session = session;
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

  get isHandled(): boolean {
    return this._handled;
  }

  markHandled(): void {
    this._handled = true;
  }

  /**
   * Set delay before sending every messages.
   *
   */
  setMessageDelay(milliseconds: number): void {
    this._messageDelay = milliseconds;
  }
}
