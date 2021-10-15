import { EventEmitter } from 'events';

import { Context, RequestContext, Session } from '@bottender/core';
import { JsonObject } from 'type-fest';

import ConsoleEvent from './ConsoleEvent';
import { ConsoleClient } from './ConsoleClient';

type Options = {
  client: ConsoleClient;
  event: ConsoleEvent;
  session: Session | null;
  initialState?: JsonObject | null;
  requestContext?: RequestContext;
  fallbackMethods: boolean;
  mockPlatform: string;
  emitter: EventEmitter | null;
};

const methodBlackList = [
  'inspect', // console
  'then', // promise
  'handlerDidEnd', // context lifecycle
];

export default class ConsoleContext extends Context<
  ConsoleClient,
  ConsoleEvent
> {
  _fallbackMethods = false;

  _mockPlatform = 'console';

  constructor({
    client,
    event,
    session,
    initialState,
    requestContext,
    fallbackMethods,
    mockPlatform,
    emitter,
  }: Options) {
    super({ client, event, session, initialState, requestContext, emitter });
    this._mockPlatform = mockPlatform;
    this._fallbackMethods = fallbackMethods;
    if (fallbackMethods) {
      return new Proxy(this, {
        get(target, key): ((args: any) => Promise<void>) | undefined {
          if (typeof key !== 'string') {
            return;
          }

          if (key in target) {
            return (target as any)[key];
          }

          if (methodBlackList.includes(key)) return;

          return async (...args): Promise<void> => {
            await target._methodMissing(key, args);
          };
        },
      });
    }
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return this._mockPlatform ?? 'console';
  }

  /**
   * Send text to the owner of then session.
   *
   */
  async sendText(text: string, ...args: any[]): Promise<void> {
    if (args.length > 0 && this._fallbackMethods) {
      this.client.sendText(
        `${text}\nwith other args:\n${JSON.stringify(args, null, 2)}`
      );
    } else {
      this.client.sendText(text);
    }
  }

  async _methodMissing(method: string, args: any[]): Promise<void> {
    this.client.sendText(
      `${method} with args:\n${JSON.stringify(args, null, 2)}`
    );
  }
}
