import EventEmitter from 'events';

import Session from '../session/Session';
import { RequestContext } from '../types';

export interface Connector<B, C> {
  client: C;
  platform: string;
  getUniqueSessionKey(body: B, requestContext?: RequestContext): string | null;
  updateSession(session: Session, body: B): Promise<void>;
  mapRequestToEvents(body: B): any[];
  createContext(params: {
    event: any;
    session?: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: RequestContext;
    emitter?: EventEmitter | null;
  }): any;
}
