import { EventEmitter } from 'events';

import { JsonObject } from 'type-fest';

import Event from './Event';
import Session from './Session';
import { RequestContext } from './types';

export default interface Connector<B, C, E extends Event<any> = any> {
  /**
   * The client instance.
   */
  client?: C;
  /**
   * The name of the platform.
   */
  platform: string;
  /**
   * Get the unique session key from body or event.
   *
   * @param bodyOrEvent - body or event
   * @param requestContext - HTTP request context
   */
  getUniqueSessionKey(
    bodyOrEvent: B | E,
    requestContext?: RequestContext
  ): string | null;
  // TODO: refine signature in v2
  /**
   *
   * @param session -
   * @param bodyOrEvent -
   */
  updateSession(session: Session, bodyOrEvent: B | E): Promise<void>;
  // TODO: rename to initSession or createSession in v2
  /**
   * Retrieve events from the request.
   *
   * @param body - body
   * @returns - event array
   */
  mapRequestToEvents(body: B): E[];
  /**
   * @param params -
   */
  createContext(params: {
    event: E;
    session?: Session | null;
    initialState?: JsonObject | null;
    requestContext?: RequestContext;
    emitter?: EventEmitter | null;
  }): any;
}
