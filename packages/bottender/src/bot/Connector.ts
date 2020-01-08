import EventEmitter from 'events';

import Session from '../session/Session';
import { Event } from '../context/Event';
import { RequestContext } from '../types';

export interface Connector<B, C> {
  client: C;
  platform: string;
  getUniqueSessionKey(
    bodyOrEvent: B | Event<any>,
    requestContext?: RequestContext
  ): string | null;
  updateSession(session: Session, bodyOrEvent: B | Event<any>): Promise<void>;
  mapRequestToEvents(body: B): Event<any>[];
  createContext(params: {
    event: Event<any>;
    session?: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: RequestContext;
    emitter?: EventEmitter | null;
  }): any;
}
