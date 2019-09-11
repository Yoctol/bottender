import EventEmitter from 'events';

import { Session } from '../session/Session';

export interface Connector<B> {
  +platform: string;
  getUniqueSessionKey(body: B, requestContext?: ?Object): ?string;
  updateSession(session: Session, body: B): Promise<void>;
  mapRequestToEvents(body: B): Array<any>;
  createContext(params: {
    event: any,
    session: ?Session,
    initialState: ?Object,
    requestContext: ?Object,
    emitter?: ?EventEmitter,
  }): any;
}
