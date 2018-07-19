/* @flow */

import { type Session } from '../session/Session';

export interface Connector<B> {
  +platform: string;
  getUniqueSessionKey(body: B): ?string;
  updateSession(session: Session, body: B): Promise<void>;
  mapRequestToEvents(body: B): Array<any>;
  createContext(params: {
    event: any,
    session: ?Session,
    initialState: ?Object,
    requestContext: ?Object,
  }): any;
}
