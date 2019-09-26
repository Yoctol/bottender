import EventEmitter from 'events';

import Session from '../session/Session';

export interface Connector<B, C> {
  client: C;
  platform: string;
  getUniqueSessionKey(
    body: B,
    requestContext?: Record<string, any> | null
  ): string | null;
  updateSession(session: Session, body: B): Promise<void>;
  mapRequestToEvents(body: B): any[];
  createContext(params: {
    event: any;
    session?: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: Record<string, any> | null;
    emitter?: EventEmitter | null;
  }): any;
}
